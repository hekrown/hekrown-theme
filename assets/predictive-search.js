/* ==========================================================================
   MOSS THEME — Predictive Search
   Fetches live results from Shopify's Predictive Search API as user types.
   Replaces: Search & filter apps ($10-30/mo)
   ========================================================================== */

(function () {
  'use strict';

  var input       = document.querySelector('[data-predictive-input]');
  var resultsEl   = document.querySelector('[data-predictive-results]');
  var loadingEl   = document.querySelector('[data-predictive-loading]');
  var form        = input && input.closest('form');

  if (!input || !resultsEl) return;

  var debounceTimer = null;
  var abortController = null;
  var minChars = 2;

  // ── Debounced input handler ────────────────────────────────────────────────
  input.addEventListener('input', function () {
    var query = input.value.trim();

    clearTimeout(debounceTimer);

    if (query.length < minChars) {
      hideResults();
      return;
    }

    debounceTimer = setTimeout(function () {
      fetchResults(query);
    }, 300);
  });

  // ── Close on click outside ─────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-predictive-search]')) {
      hideResults();
    }
  });

  // ── Close on Escape ────────────────────────────────────────────────────────
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideResults();
      input.blur();
    }
  });

  // ── Fetch results ──────────────────────────────────────────────────────────
  function fetchResults(query) {
    // Abort previous request
    if (abortController) abortController.abort();
    abortController = new AbortController();

    showLoading();

    var url = '/search/suggest.json?q=' + encodeURIComponent(query) +
              '&resources[type]=product,collection,page' +
              '&resources[limit]=6' +
              '&resources[options][fields]=title,body,variants.title,vendor,product_type,tag';

    fetch(url, { signal: abortController.signal })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        renderResults(data, query);
      })
      .catch(function (err) {
        if (err.name !== 'AbortError') {
          hideResults();
        }
      });
  }

  // ── Render results ─────────────────────────────────────────────────────────
  function renderResults(data, query) {
    var resources = data.resources && data.resources.results;
    if (!resources) { hideResults(); return; }

    var products    = resources.products || [];
    var collections = resources.collections || [];
    var pages       = resources.pages || [];
    var total       = products.length + collections.length + pages.length;

    if (total === 0) {
      resultsEl.innerHTML = '<div class="predictive__empty">No results for "' + escapeHtml(query) + '"</div>';
      showResults();
      return;
    }

    var html = '';

    // Products
    if (products.length > 0) {
      html += '<div class="predictive__group">';
      html += '<h3 class="predictive__group-title">Products</h3>';
      products.forEach(function (p) {
        var img = p.image ? p.image : '';
        var price = p.price ? formatMoney(parseFloat(p.price) * 100) : '';
        html += '<a href="' + p.url + '" class="predictive__item predictive__item--product">';
        html += img ? '<img src="' + img + '" alt="" class="predictive__item-img" width="50" height="65" loading="lazy">' : '<div class="predictive__item-img" style="background:var(--color-off-white);"></div>';
        html += '<div class="predictive__item-info">';
        html += '<span class="predictive__item-title">' + p.title + '</span>';
        html += '<span class="predictive__item-price">' + price + '</span>';
        html += '</div></a>';
      });
      html += '</div>';
    }

    // Collections
    if (collections.length > 0) {
      html += '<div class="predictive__group">';
      html += '<h3 class="predictive__group-title">Collections</h3>';
      collections.forEach(function (c) {
        html += '<a href="' + c.url + '" class="predictive__item">';
        html += '<span class="predictive__item-title">' + c.title + '</span>';
        html += '</a>';
      });
      html += '</div>';
    }

    // Pages
    if (pages.length > 0) {
      html += '<div class="predictive__group">';
      html += '<h3 class="predictive__group-title">Pages</h3>';
      pages.forEach(function (pg) {
        html += '<a href="' + pg.url + '" class="predictive__item">';
        html += '<span class="predictive__item-title">' + pg.title + '</span>';
        html += '</a>';
      });
      html += '</div>';
    }

    // View all link
    html += '<a href="/search?q=' + encodeURIComponent(query) + '" class="predictive__view-all">View all results →</a>';

    resultsEl.innerHTML = html;
    showResults();
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  function showResults() {
    resultsEl.style.display = '';
    resultsEl.setAttribute('aria-hidden', 'false');
    if (loadingEl) loadingEl.style.display = 'none';
  }

  function hideResults() {
    resultsEl.style.display = 'none';
    resultsEl.setAttribute('aria-hidden', 'true');
    if (loadingEl) loadingEl.style.display = 'none';
  }

  function showLoading() {
    if (loadingEl) loadingEl.style.display = '';
  }

  function formatMoney(cents) {
    try { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(cents / 100); }
    catch (e) { return '£' + (cents / 100).toFixed(2); }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
