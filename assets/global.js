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
