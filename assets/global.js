/* ==========================================================================
   MOSS THEME — Global JavaScript
   ========================================================================== */

/**
 * Sticky header — adds shadow class on scroll
 */
(function() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('site-header--scrolled', !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
  );

  // Observe a sentinel element at the top of the page
  const sentinel = document.createElement('div');
  sentinel.style.height = '1px';
  sentinel.style.position = 'absolute';
  sentinel.style.top = '0';
  sentinel.style.left = '0';
  sentinel.style.width = '100%';
  sentinel.style.pointerEvents = 'none';
  document.body.prepend(sentinel);
  observer.observe(sentinel);
})();

/**
 * AJAX Cart API helpers
 */
const MossCart = {
  async getCart() {
    const response = await fetch('/cart.js');
    return response.json();
  },

  async addItem(variantId, quantity = 1) {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity })
    });
    return response.json();
  },

  async updateItem(key, quantity) {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity })
    });
    return response.json();
  },

  async removeItem(key) {
    return this.updateItem(key, 0);
  }
};

/**
 * Dispatch custom event for cart updates
 */
function dispatchCartUpdate(cart) {
  document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
}

/**
 * Update cart count badges
 */
document.addEventListener('cart:updated', (event) => {
  const count = event.detail.cart.item_count;
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = count;
    el.hidden = count === 0;
  });
});


/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */

(function () {
  const toggle   = document.querySelector('[data-menu-toggle]');
  const drawer   = document.querySelector('[data-nav-drawer]');
  const overlay  = document.querySelector('[data-nav-overlay]');
  const closeBtn = document.querySelector('[data-nav-close]');

  if (!toggle || !drawer || !overlay) return;

  // ── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Returns all focusable elements inside the drawer.
   * Used to trap focus while the drawer is open.
   */
  function getFocusableElements() {
    return Array.from(
      drawer.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  // ── Open ─────────────────────────────────────────────────────────────────

  function openDrawer() {
    // Show overlay (display:block first, then opacity transition on next frame)
    overlay.classList.add('is-visible');
    // rAF ensures the display:block has painted before we trigger the transition
    requestAnimationFrame(function () {
      overlay.classList.add('is-open');
      drawer.classList.add('is-open');
    });

    // ARIA
    drawer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');

    // Lock body scroll
    document.body.classList.add('nav-open');

    // Move focus to the close button
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  // ── Close ─────────────────────────────────────────────────────────────────

  function closeDrawer() {
    overlay.classList.remove('is-open');
    drawer.classList.remove('is-open');

    // ARIA
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');

    // Unlock body scroll
    document.body.classList.remove('nav-open');

    // Return focus to the hamburger toggle
    toggle.focus();

    // After the CSS transition ends, hide the overlay from the paint tree
    overlay.addEventListener(
      'transitionend',
      function handler() {
        overlay.classList.remove('is-visible');
        overlay.removeEventListener('transitionend', handler);
      }
    );
  }

  // ── Focus trap ────────────────────────────────────────────────────────────

  function trapFocus(event) {
    if (!drawer.classList.contains('is-open')) return;

    const focusable = getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift+Tab: if focus is on first element, wrap to last
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if focus is on last element, wrap to first
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  }

  // ── Event listeners ───────────────────────────────────────────────────────

  // Hamburger toggle
  toggle.addEventListener('click', function () {
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close button inside drawer
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Overlay click
  overlay.addEventListener('click', closeDrawer);

  // Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Focus trap
  document.addEventListener('keydown', trapFocus);
})();


/* ==========================================================================
   Search Overlay
   ========================================================================== */

(function () {
  var toggleBtn = document.querySelector('[data-search-toggle]');
  var overlay   = document.querySelector('[data-search-overlay]');
  var closeBtn  = document.querySelector('[data-search-close]');
  var input     = document.querySelector('[data-search-input]');

  if (!toggleBtn || !overlay) return;

  function openSearch() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    if (input) {
      setTimeout(function () { input.focus(); }, 50);
    }
  }

  function closeSearch() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', function () {
    if (overlay.classList.contains('is-open')) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearch);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeSearch();
    }
  });
})();


/* ==========================================================================
   Mega Menu (desktop hover dropdowns)
   ========================================================================== */

(function () {
  var items = document.querySelectorAll('[data-mega-item]');
  if (!items.length) return;

  items.forEach(function (item) {
    var btn  = item.querySelector('[data-mega-toggle]');
    var menu = item.querySelector('[data-mega-menu]');
    if (!btn || !menu) return;

    var closeTimer;

    function open() {
      clearTimeout(closeTimer);
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
    }

    function close() {
      closeTimer = setTimeout(function () {
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
      }, 150);
    }

    // Hover
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);

    // Keyboard
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (menu.classList.contains('is-open')) { close(); } else { open(); }
      }
      if (e.key === 'Escape') { close(); btn.focus(); }
    });

    // Close on Escape from within menu
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); btn.focus(); }
    });
  });
})();

/* ==========================================================================
   Cart Drawer
   Only active if cart type is set to drawer
   ========================================================================== */

(function () {
  var toggleBtn = document.querySelector('[data-cart-drawer-toggle]');
  var drawer    = document.querySelector('[data-cart-drawer]');
  var overlay   = document.querySelector('[data-cart-overlay]');
  var closeBtn  = document.querySelector('[data-cart-drawer-close]');
  
  // Exit if cart drawer doesn't exist (cart type = page)
  if (!toggleBtn || !drawer) return;
  
  var drawerItems   = document.querySelector('[data-drawer-items]');
  var drawerEmpty   = document.querySelector('[data-drawer-empty]');
  var drawerFooter  = document.querySelector('[data-drawer-footer]');
  var drawerCount   = document.querySelector('[data-drawer-count]');
  var drawerSubtotal = document.querySelector('[data-drawer-subtotal]');

  // ── Format money ─────────────────────────────────────────────────────────
  function fmt(cents) {
    return window.MossTheme && window.MossTheme.moneyFormat
      ? formatMoneyFromString(cents, window.MossTheme.moneyFormat)
      : '£' + (cents / 100).toFixed(2);
  }

  function formatMoneyFromString(cents, format) {
    var amount = (cents / 100).toFixed(2);
    return format
      .replace(/\{\{\s*amount\s*\}\}/, amount)
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/, Math.round(cents / 100))
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/, amount.replace('.', ','))
      .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/, Math.round(cents / 100));
  }

  // ── Render cart items into drawer ─────────────────────────────────────────
  function renderCart(cart) {
    if (drawerCount)   drawerCount.textContent   = cart.item_count;
    if (drawerSubtotal) drawerSubtotal.textContent = fmt(cart.total_price);

    if (!drawerItems) return;
    drawerItems.innerHTML = '';

    if (cart.item_count === 0) {
      if (drawerEmpty)  drawerEmpty.style.display  = '';
      if (drawerFooter) drawerFooter.style.display = 'none';
      return;
    }

    if (drawerEmpty)  drawerEmpty.style.display  = 'none';
    if (drawerFooter) drawerFooter.style.display = '';

    cart.items.forEach(function (item) {
      var div = document.createElement('div');
      div.className = 'cart-drawer__item';
      div.innerHTML =
        '<img class="cart-drawer__item-img" src="' + item.image + '" alt="' + item.title + '" width="72" height="90" loading="lazy">' +
        '<div class="cart-drawer__item-details">' +
          '<a href="' + item.url + '" class="cart-drawer__item-title">' + item.product_title + '</a>' +
          '<p class="cart-drawer__item-variant">' + item.variant_title + '</p>' +
          '<p class="cart-drawer__item-price">' + fmt(item.final_price) + ' &times; ' + item.quantity + '</p>' +
          '<button class="cart-drawer__item-remove" data-remove-key="' + item.key + '">Remove</button>' +
        '</div>';
      drawerItems.appendChild(div);
    });

    // Remove buttons
    drawerItems.querySelectorAll('[data-remove-key]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        MossCart.removeItem(btn.dataset.removeKey).then(function (cart) {
          renderCart(cart);
          dispatchCartUpdate(cart);
        });
      });
    });
  }

  // ── Open drawer ───────────────────────────────────────────────────────────
  function openDrawer() {
    overlay.classList.add('is-visible');
    requestAnimationFrame(function () {
      overlay.classList.add('is-open');
      drawer.classList.add('is-open');
    });
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');

    // Show skeleton loader while fetching
    if (drawerItems) {
      drawerItems.innerHTML =
        '<div class="skeleton-item"><div class="skeleton skeleton-item__img"></div><div class="skeleton-item__body"><div class="skeleton skeleton-item__line skeleton-item__line--medium"></div><div class="skeleton skeleton-item__line skeleton-item__line--short"></div><div class="skeleton skeleton-item__line skeleton-item__line--long"></div></div></div>'.repeat(2);
    }
    if (drawerEmpty) drawerEmpty.style.display = 'none';

    // Fetch fresh cart data
    MossCart.getCart().then(function (cart) {
      renderCart(cart);
      dispatchCartUpdate(cart);
      if (closeBtn) closeBtn.focus();
    });
  }

  // ── Close drawer ──────────────────────────────────────────────────────────
  function closeDrawer() {
    overlay.classList.remove('is-open');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    toggleBtn.focus();
    overlay.addEventListener('transitionend', function h() {
      overlay.classList.remove('is-visible');
      overlay.removeEventListener('transitionend', h);
    });
  }

  toggleBtn.addEventListener('click', function () {
    drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });

  if (closeBtn)  closeBtn.addEventListener('click', closeDrawer);
  if (overlay)   overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });

  // ── Auto-open drawer when cart:updated fires (e.g. after ATC) ────────────
  document.addEventListener('cart:updated', function (e) {
    var cart = e.detail.cart;
    if (drawer.classList.contains('is-open')) {
      renderCart(cart);
    }
  });
})();
