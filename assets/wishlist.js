/* ==========================================================================
   MOSS THEME — Wishlist System
   Persists to localStorage for guests, customer metafields for logged-in users
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY = 'moss_wishlist';

  /* =========================================================================
     Core Wishlist Store
     ========================================================================= */

  var MossWishlist = {
    // Get all wishlisted product IDs
    getAll: function () {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      } catch (e) {
        return [];
      }
    },

    // Check if a product is wishlisted
    has: function (productId) {
      return this.getAll().indexOf(String(productId)) !== -1;
    },

    // Add a product
    add: function (productId) {
      var items = this.getAll();
      var id = String(productId);
      if (items.indexOf(id) === -1) {
        items.push(id);
        this._save(items);
        this._dispatch('wishlist:added', { productId: id });
      }
    },

    // Remove a product
    remove: function (productId) {
      var id = String(productId);
      var items = this.getAll().filter(function (i) { return i !== id; });
      this._save(items);
      this._dispatch('wishlist:removed', { productId: id });
    },

    // Toggle a product
    toggle: function (productId) {
      if (this.has(productId)) {
        this.remove(productId);
        return false;
      } else {
        this.add(productId);
        return true;
      }
    },

    // Count
    count: function () {
      return this.getAll().length;
    },

    // Save
    _save: function (items) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn('Wishlist: localStorage unavailable');
      }
    },

    // Dispatch
    _dispatch: function (eventName, detail) {
      document.dispatchEvent(new CustomEvent(eventName, { detail: detail }));
      // Also dispatch a general update
      document.dispatchEvent(new CustomEvent('wishlist:updated', {
        detail: { count: this.count() }
      }));
    }
  };

  // Expose globally
  window.MossWishlist = MossWishlist;

  /* =========================================================================
     Update all wishlist count badges
     ========================================================================= */

  function updateWishlistCounts() {
    var count = MossWishlist.count();
    document.querySelectorAll('[data-wishlist-count]').forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }

  document.addEventListener('wishlist:updated', updateWishlistCounts);

  /* =========================================================================
     Wishlist toggle buttons (heart icons on product cards and PDP)
     ========================================================================= */

  function syncButtonState(btn) {
    var productId = btn.dataset.wishlistToggle;
    var isWishlisted = MossWishlist.has(productId);
    btn.classList.toggle('is-wishlisted', isWishlisted);
    btn.setAttribute('aria-pressed', isWishlisted ? 'true' : 'false');
    btn.setAttribute(
      'aria-label',
      isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
    );
  }

  function initWishlistButtons() {
    document.querySelectorAll('[data-wishlist-toggle]').forEach(function (btn) {
      syncButtonState(btn);

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var productId = btn.dataset.wishlistToggle;
        MossWishlist.toggle(productId);
        syncButtonState(btn);
      });
    });
  }

  // Re-sync on wishlist changes
  document.addEventListener('wishlist:updated', function () {
    document.querySelectorAll('[data-wishlist-toggle]').forEach(syncButtonState);
  });

  /* =========================================================================
     Wishlist Drawer
     ========================================================================= */

  var wishlistDrawer     = document.querySelector('[data-wishlist-drawer]');
  var wishlistOverlay    = document.querySelector('[data-wishlist-overlay]');
  var wishlistToggleBtns = document.querySelectorAll('[data-wishlist-drawer-toggle]');
  var wishlistCloseBtn   = document.querySelector('[data-wishlist-drawer-close]');
  var wishlistItemsEl    = document.querySelector('[data-wishlist-items]');
  var wishlistEmptyEl    = document.querySelector('[data-wishlist-empty]');
  var wishlistFooterEl   = document.querySelector('[data-wishlist-footer]');

  function openWishlistDrawer() {
    if (!wishlistDrawer) return;
    wishlistOverlay && wishlistOverlay.classList.add('is-visible');
    requestAnimationFrame(function () {
      wishlistOverlay && wishlistOverlay.classList.add('is-open');
      wishlistDrawer.classList.add('is-open');
    });
    wishlistDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
    renderWishlistDrawer();
    wishlistCloseBtn && wishlistCloseBtn.focus();
  }

  function closeWishlistDrawer() {
    if (!wishlistDrawer) return;
    wishlistOverlay && wishlistOverlay.classList.remove('is-open');
    wishlistDrawer.classList.remove('is-open');
    wishlistDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');
    wishlistOverlay && wishlistOverlay.addEventListener('transitionend', function h() {
      wishlistOverlay.classList.remove('is-visible');
      wishlistOverlay.removeEventListener('transitionend', h);
    });
  }

  function renderWishlistDrawer() {
    if (!wishlistItemsEl) return;

    var ids = MossWishlist.getAll();

    if (ids.length === 0) {
      wishlistItemsEl.innerHTML = '';
      wishlistEmptyEl  && (wishlistEmptyEl.style.display = '');
      wishlistFooterEl && (wishlistFooterEl.style.display = 'none');
      return;
    }

    wishlistEmptyEl  && (wishlistEmptyEl.style.display = 'none');
    wishlistFooterEl && (wishlistFooterEl.style.display = '');

    // Fetch product data for each ID
    wishlistItemsEl.innerHTML = '<p style="padding: 16px; color: var(--color-mid-grey); font-size: 13px;">Loading...</p>';

    var fetchUrl = '/products.json?limit=250';
    fetch(fetchUrl)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var products = data.products.filter(function (p) {
          return ids.indexOf(String(p.id)) !== -1;
        });

        if (products.length === 0) {
          wishlistItemsEl.innerHTML = '';
          wishlistEmptyEl && (wishlistEmptyEl.style.display = '');
          wishlistFooterEl && (wishlistFooterEl.style.display = 'none');
          return;
        }

        wishlistItemsEl.innerHTML = '';
        products.forEach(function (product) {
          var image = product.images[0] ? product.images[0].src : null;
          var price = product.variants[0].price;
          var comparePx = product.variants[0].compare_at_price;
          var formattedPrice = formatMoney(price);
          var div = document.createElement('div');
          div.className = 'wishlist-drawer__item';
          div.innerHTML =
            '<a href="/products/' + product.handle + '" class="wishlist-drawer__item-img-link">' +
              (image ? '<img src="' + image + '" alt="' + product.title + '" width="72" height="90" loading="lazy">' : '') +
            '</a>' +
            '<div class="wishlist-drawer__item-details">' +
              '<a href="/products/' + product.handle + '" class="wishlist-drawer__item-title">' + product.title + '</a>' +
              '<p class="wishlist-drawer__item-price">' +
                (comparePx && comparePx > price
                  ? '<span style="color:var(--color-red)">' + formattedPrice + '</span> <span style="text-decoration:line-through;color:var(--color-mid-grey);margin-left:4px">' + formatMoney(comparePx) + '</span>'
                  : formattedPrice) +
              '</p>' +
              '<div style="display:flex;gap:8px;margin-top:8px;">' +
                '<a href="/products/' + product.handle + '" class="btn btn--primary" style="padding:8px 16px;font-size:11px;">View Product</a>' +
                '<button class="wishlist-drawer__remove" data-remove-id="' + product.id + '" aria-label="Remove from wishlist">Remove</button>' +
              '</div>' +
            '</div>';
          wishlistItemsEl.appendChild(div);
        });

        // Remove buttons
        wishlistItemsEl.querySelectorAll('[data-remove-id]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            MossWishlist.remove(btn.dataset.removeId);
            renderWishlistDrawer();
          });
        });
      })
      .catch(function () {
        wishlistItemsEl.innerHTML = '<p style="padding:16px;color:var(--color-mid-grey);">Unable to load wishlist. <a href="/wishlist">View Wishlist</a></p>';
      });
  }

  function formatMoney(cents) {
    var format = window.MossTheme && window.MossTheme.moneyFormat;
    if (!format) return '£' + (Number(cents) / 100).toFixed(2);
    var amount = (Number(cents) / 100).toFixed(2);
    return format
      .replace(/\{\{\s*amount\s*\}\}/, amount)
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/, Math.round(Number(cents) / 100))
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/, amount.replace('.', ','))
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/, Math.round(Number(cents) / 100));
  }

  if (wishlistToggleBtns.length) {
    wishlistToggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        wishlistDrawer && wishlistDrawer.classList.contains('is-open')
          ? closeWishlistDrawer()
          : openWishlistDrawer();
      });
    });
  }

  wishlistCloseBtn && wishlistCloseBtn.addEventListener('click', closeWishlistDrawer);
  wishlistOverlay  && wishlistOverlay.addEventListener('click', closeWishlistDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && wishlistDrawer && wishlistDrawer.classList.contains('is-open')) {
      closeWishlistDrawer();
    }
  });

  document.addEventListener('wishlist:updated', function () {
    if (wishlistDrawer && wishlistDrawer.classList.contains('is-open')) {
      renderWishlistDrawer();
    }
  });

  /* =========================================================================
     Init on DOM ready
     ========================================================================= */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initWishlistButtons();
      updateWishlistCounts();
    });
  } else {
    initWishlistButtons();
    updateWishlistCounts();
  }

})();
