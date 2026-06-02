/* ==========================================================================
   MOSS THEME — Product Compare System
   Compare up to 3 products side-by-side
   ========================================================================== */

(function () {
  'use strict';

  var MAX_COMPARE = 3;
  var STORAGE_KEY = 'moss_compare';

  /* =========================================================================
     Core Compare Store
     ========================================================================= */

  var MossCompare = {
    getAll: function () {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      } catch (e) { return []; }
    },

    has: function (productId) {
      return this.getAll().indexOf(String(productId)) !== -1;
    },

    add: function (productId) {
      var items = this.getAll();
      var id = String(productId);
      if (items.length >= MAX_COMPARE) {
        this._dispatch('compare:limit', { max: MAX_COMPARE });
        return false;
      }
      if (items.indexOf(id) === -1) {
        items.push(id);
        this._save(items);
        this._dispatch('compare:added', { productId: id });
      }
      return true;
    },

    remove: function (productId) {
      var id = String(productId);
      var items = this.getAll().filter(function (i) { return i !== id; });
      this._save(items);
      this._dispatch('compare:removed', { productId: id });
    },

    toggle: function (productId) {
      if (this.has(productId)) {
        this.remove(productId);
        return false;
      }
      return this.add(productId);
    },

    clear: function () {
      this._save([]);
      this._dispatch('compare:cleared', {});
    },

    count: function () { return this.getAll().length; },

    _save: function (items) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) {}
    },

    _dispatch: function (name, detail) {
      document.dispatchEvent(new CustomEvent(name, { detail: detail }));
      document.dispatchEvent(new CustomEvent('compare:updated', {
        detail: { count: this.count(), items: this.getAll() }
      }));
    }
  };

  window.MossCompare = MossCompare;

  /* =========================================================================
     Compare Bar (sticky bottom bar showing selected items)
     ========================================================================= */

  var compareBar = document.querySelector('[data-compare-bar]');

  function updateCompareBar() {
    if (!compareBar) return;
    var ids = MossCompare.getAll();
    var count = ids.length;

    compareBar.style.display = count > 0 ? 'flex' : 'none';

    var countEl = compareBar.querySelector('[data-compare-bar-count]');
    if (countEl) countEl.textContent = count;

    var btnEl = compareBar.querySelector('[data-compare-view]');
    if (btnEl) btnEl.disabled = count < 2;
  }

  document.addEventListener('compare:updated', updateCompareBar);

  /* =========================================================================
     Compare toggle buttons on product cards
     ========================================================================= */

  function syncCompareButton(btn) {
    var productId = btn.dataset.compareToggle;
    var active = MossCompare.has(productId);
    btn.classList.toggle('is-comparing', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.setAttribute('aria-label', active ? 'Remove from compare' : 'Add to compare');
    btn.querySelector('[data-compare-btn-text]') &&
      (btn.querySelector('[data-compare-btn-text]').textContent = active ? 'Remove' : 'Compare');
  }

  function initCompareButtons() {
    document.querySelectorAll('[data-compare-toggle]').forEach(function (btn) {
      syncCompareButton(btn);

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var productId = btn.dataset.compareToggle;
        var result = MossCompare.toggle(productId);
        if (result === false && !MossCompare.has(productId)) {
          showCompareToast('You can compare up to ' + MAX_COMPARE + ' products at a time.');
        }
        syncCompareButton(btn);
      });
    });
  }

  document.addEventListener('compare:updated', function () {
    document.querySelectorAll('[data-compare-toggle]').forEach(syncCompareButton);
  });

  /* =========================================================================
     Compare Modal
     ========================================================================= */

  var compareModal = document.querySelector('[data-compare-modal]');
  var compareViewBtn = compareBar && compareBar.querySelector('[data-compare-view]');
  var compareCloseBtn = compareModal && compareModal.querySelector('[data-compare-modal-close]');
  var compareTableEl = compareModal && compareModal.querySelector('[data-compare-table]');

  function openCompareModal() {
    if (!compareModal) return;
    renderCompareTable();
    compareModal.classList.add('is-open');
    compareModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
  }

  function closeCompareModal() {
    if (!compareModal) return;
    compareModal.classList.remove('is-open');
    compareModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');
  }

  function renderCompareTable() {
    if (!compareTableEl) return;
    var ids = MossCompare.getAll();
    if (ids.length === 0) {
      compareTableEl.innerHTML = '<p style="padding:24px;text-align:center;color:var(--color-mid-grey)">No products selected for comparison.</p>';
      return;
    }

    compareTableEl.innerHTML = '<p style="padding:16px;text-align:center;color:var(--color-mid-grey);font-size:13px">Loading products...</p>';

    var fetchPromises = ids.map(function (id) {
      return fetch('/products.json?limit=250')
        .then(function (r) { return r.json(); })
        .then(function (data) {
          return data.products.find(function (p) { return String(p.id) === String(id); });
        });
    });

    Promise.all(fetchPromises).then(function (results) {
      var products = results.filter(Boolean);
      if (products.length === 0) {
        compareTableEl.innerHTML = '<p style="padding:24px;text-align:center;color:var(--color-mid-grey)">Products not found.</p>';
        return;
      }

      var colWidth = Math.floor(100 / (products.length + 1));

      var rows = [
        { label: 'Image',        fn: function (p) {
          var img = p.images[0] ? p.images[0].src : '';
          return img ? '<a href="/products/' + p.handle + '"><img src="' + img + '" alt="' + p.title + '" style="width:100%;height:180px;object-fit:cover;"></a>' : '—';
        }},
        { label: 'Name',         fn: function (p) { return '<a href="/products/' + p.handle + '" style="font-weight:600;">' + p.title + '</a>'; }},
        { label: 'Price',        fn: function (p) {
          var v = p.variants[0];
          var price = formatMoney(v.price);
          var comp = v.compare_at_price && v.compare_at_price > v.price ? formatMoney(v.compare_at_price) : null;
          return comp ? '<span style="color:var(--color-red)">' + price + '</span> <span style="text-decoration:line-through;color:var(--color-mid-grey);margin-left:4px">' + comp + '</span>' : price;
        }},
        { label: 'Availability', fn: function (p) { return p.available ? '<span style="color:#155724">In Stock</span>' : '<span style="color:#721C24">Out of Stock</span>'; }},
        { label: 'Vendor',       fn: function (p) { return p.vendor || '—'; }},
        { label: 'Type',         fn: function (p) { return p.product_type || '—'; }},
        { label: '',             fn: function (p) {
          return '<a href="/products/' + p.handle + '" class="btn btn--primary" style="font-size:12px;padding:10px 16px;">View Product</a>' +
                 '<button class="btn btn--secondary" style="font-size:12px;padding:9px 16px;margin-left:8px;" onclick="MossCompare.remove(\'' + p.id + '\')">Remove</button>';
        }}
      ];

      var html = '<table class="compare-table" style="width:100%;border-collapse:collapse;">';
      rows.forEach(function (row) {
        html += '<tr>';
        html += '<th style="width:' + colWidth + '%;padding:12px;text-align:left;background:var(--color-off-white);font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;border-bottom:1px solid var(--color-border);">' + row.label + '</th>';
        products.forEach(function (p) {
          html += '<td style="width:' + colWidth + '%;padding:12px;border-bottom:1px solid var(--color-border);vertical-align:top;">' + row.fn(p) + '</td>';
        });
        html += '</tr>';
      });
      html += '</table>';

      compareTableEl.innerHTML = html;
    });
  }

  function formatMoney(cents) {
    try { return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(cents) / 100); }
    catch (e) { return '£' + (Number(cents) / 100).toFixed(2); }
  }

  compareViewBtn && compareViewBtn.addEventListener('click', openCompareModal);
  compareCloseBtn && compareCloseBtn.addEventListener('click', closeCompareModal);
  compareModal && compareModal.querySelector('[data-compare-modal-overlay]') &&
    compareModal.querySelector('[data-compare-modal-overlay]').addEventListener('click', closeCompareModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && compareModal && compareModal.classList.contains('is-open')) closeCompareModal();
  });

  document.addEventListener('compare:updated', function () {
    if (compareModal && compareModal.classList.contains('is-open')) renderCompareTable();
  });

  /* =========================================================================
     Toast notification
     ========================================================================= */

  function showCompareToast(message) {
    var existing = document.getElementById('compare-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'compare-toast';
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:3000;background:var(--color-black);color:var(--color-white);padding:12px 24px;font-size:13px;pointer-events:none;opacity:0;transition:opacity 0.2s ease;';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      setTimeout(function () {
        toast.style.opacity = '0';
        setTimeout(function () { toast.remove(); }, 300);
      }, 2500);
    });
  }

  /* =========================================================================
     Init
     ========================================================================= */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCompareButtons();
      updateCompareBar();
    });
  } else {
    initCompareButtons();
    updateCompareBar();
  }

})();
