/* ==========================================================================
   MOSS THEME — Product Page JS
   Handles: variant picker, price update, gallery, quantity stepper, ATC
   ========================================================================== */

(function () {
  'use strict';

  // ── Initialise on DOM ready ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const productPage = document.querySelector('[data-product-id]');
    if (!productPage) return;

    const productId   = productPage.dataset.productId;
    const dataScript  = document.getElementById('product-json-' + productId);
    if (!dataScript) return;

    const productData = JSON.parse(dataScript.textContent);

    initVariantPicker(productData);
    initGallery();
    initQuantityStepper();
  });

  /* =========================================================================
     VARIANT PICKER
     Listens to radio changes, finds the matching variant, updates:
       - hidden variant ID input
       - price display
       - ATC button state
       - gallery (switches to variant's featured image)
       - unavailable option styles
     ========================================================================= */

  function initVariantPicker(productData) {
    const picker   = document.querySelector('[data-variant-picker]');
    if (!picker) return;

    const variants     = productData.variants;
    const options      = productData.options;   // e.g. ['Color', 'Size']
    const moneyFormat  = productData.money_format;

    // ── Get currently selected options from checked radios ──────────────────
    function getSelectedOptions() {
      return options.map(function (optionName) {
        const radio = picker.querySelector(
          'input[name="option-' + optionName.toLowerCase().replace(/\s+/g, '-') + '"]:checked'
        );
        return radio ? radio.value : null;
      });
    }

    // ── Find variant matching the selected options ───────────────────────────
    function findVariant(selectedOptions) {
      return variants.find(function (variant) {
        return (
          variant.option1 === (selectedOptions[0] || null) &&
          variant.option2 === (selectedOptions[1] || null) &&
          variant.option3 === (selectedOptions[2] || null)
        );
      });
    }

    // ── Format money using Shopify's money_format string ────────────────────
    function formatMoney(cents) {
      var amount = (cents / 100).toFixed(2);
      // Replace {{amount}} or {{amount_no_decimals}} etc.
      return moneyFormat
        .replace(/\{\{\s*amount\s*\}\}/, amount)
        .replace(/\{\{\s*amount_no_decimals\s*\}\}/, Math.round(cents / 100))
        .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/, amount.replace('.', ','))
        .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/, Math.round(cents / 100));
    }

    // ── Update price display ─────────────────────────────────────────────────
    function updatePrice(variant) {
      const priceEl = document.querySelector('[data-product-price]');
      if (!priceEl) return;

      if (!variant) {
        priceEl.innerHTML = '<span>Unavailable</span>';
        return;
      }

      if (variant.compare_at_price && variant.compare_at_price > variant.price) {
        priceEl.innerHTML =
          '<span class="product-page__price-sale">' + formatMoney(variant.price) + '</span>' +
          '<span class="product-page__price-compare">' + formatMoney(variant.compare_at_price) + '</span>';
      } else {
        priceEl.innerHTML = '<span>' + formatMoney(variant.price) + '</span>';
      }
    }

    // ── Update ATC button ────────────────────────────────────────────────────
    function updateATCButton(variant) {
      const btn       = document.querySelector('[data-atc-btn]');
      const variantId = document.querySelector('[data-variant-id]');
      if (!btn) return;

      if (!variant || !variant.available) {
        btn.disabled   = true;
        btn.textContent = 'Out of Stock';
      } else {
        btn.disabled   = false;
        btn.textContent = 'Add to Basket';
      }

      if (variantId && variant) {
        variantId.value = variant.id;
      }
    }

    // ── Update selected colour label ─────────────────────────────────────────
    function updateColorLabel(selectedOptions) {
      const colorLabel = document.querySelector('[data-selected-color]');
      if (colorLabel && selectedOptions[0]) {
        colorLabel.textContent = selectedOptions[0];
      }
    }

    // ── Update gallery to show variant's featured image ──────────────────────
    function updateGallery(variant) {
      if (!variant || !variant.featured_media_id) return;
      switchGalleryImage(variant.featured_media_id);
    }

    // ── Mark unavailable option values ───────────────────────────────────────
    // For each option position, given the other options are fixed,
    // check which values result in no available variant.
    function updateUnavailableStates(selectedOptions) {
      options.forEach(function (optionName, optionIndex) {
        const radios = picker.querySelectorAll(
          'input[name="option-' + optionName.toLowerCase().replace(/\s+/g, '-') + '"]'
        );

        radios.forEach(function (radio) {
          // Build a test options array with this value substituted in
          var testOptions = selectedOptions.slice();
          testOptions[optionIndex] = radio.value;

          // Fill any null slots with the first available value for that position
          testOptions = testOptions.map(function (val, i) {
            return val !== null ? val : null;
          });

          var hasAvailable = variants.some(function (v) {
            var match = true;
            if (testOptions[0] !== null && v.option1 !== testOptions[0]) match = false;
            if (testOptions[1] !== null && v.option2 !== testOptions[1]) match = false;
            if (testOptions[2] !== null && v.option3 !== testOptions[2]) match = false;
            return match && v.available;
          });

          var label = radio.closest('label');
          if (label) {
            label.classList.toggle('product-page__option-value--unavailable', !hasAvailable);
          }
        });
      });
    }

    // ── Update selected visual state on labels ───────────────────────────────
    function updateSelectedStates() {
      picker.querySelectorAll('input[type="radio"]').forEach(function (radio) {
        var label = radio.closest('label');
        if (label) {
          label.classList.toggle('product-page__option-value--selected', radio.checked);
        }
      });
    }

    // ── Main update function — runs on every option change ───────────────────
    function onOptionChange() {
      var selectedOptions = getSelectedOptions();
      var variant         = findVariant(selectedOptions);

      updateSelectedStates();
      updateColorLabel(selectedOptions);
      updatePrice(variant);
      updateATCButton(variant);
      updateGallery(variant);
      updateUnavailableStates(selectedOptions);
    }

    // ── Attach listeners to all radio inputs ─────────────────────────────────
    picker.querySelectorAll('input[type="radio"]').forEach(function (radio) {
      radio.addEventListener('change', onOptionChange);
    });

    // ── Run once on load to set correct initial state ────────────────────────
    onOptionChange();
  }

  /* =========================================================================
     IMAGE GALLERY
     Thumbnail click → switch main image with fade crossfade.
     ========================================================================= */

  function initGallery() {
    const gallery    = document.querySelector('[data-product-gallery]');
    const thumbsWrap = document.querySelector('.product-page__thumbnails');
    if (!gallery || !thumbsWrap) return;

    thumbsWrap.querySelectorAll('[data-thumbnail]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var mediaId = thumb.dataset.thumbnail;
        switchGalleryImage(mediaId);
      });
    });
  }

  // Shared helper — switches active gallery image by media ID
  function switchGalleryImage(mediaId) {
    var mediaIdStr = String(mediaId);

    // Gallery items
    document.querySelectorAll('[data-media-id]').forEach(function (item) {
      item.classList.toggle(
        'product-page__media-item--active',
        item.dataset.mediaId === mediaIdStr
      );
    });

    // Thumbnails
    document.querySelectorAll('[data-thumbnail]').forEach(function (thumb) {
      thumb.classList.toggle(
        'product-page__thumbnail--active',
        thumb.dataset.thumbnail === mediaIdStr
      );
    });
  }

  /* =========================================================================
     QUANTITY STEPPER
     +/- buttons update the number input, enforcing min: 1.
     ========================================================================= */

  function initQuantityStepper() {
    const minusBtn = document.querySelector('[data-qty-minus]');
    const plusBtn  = document.querySelector('[data-qty-plus]');
    const input    = document.querySelector('[data-qty-input]');
    if (!minusBtn || !plusBtn || !input) return;

    minusBtn.addEventListener('click', function () {
      var current = parseInt(input.value, 10) || 1;
      if (current > 1) {
        input.value = current - 1;
      }
    });

    plusBtn.addEventListener('click', function () {
      var current = parseInt(input.value, 10) || 1;
      input.value = current + 1;
    });

    // Prevent manual entry below 1
    input.addEventListener('change', function () {
      var val = parseInt(input.value, 10);
      if (isNaN(val) || val < 1) {
        input.value = 1;
      }
    });
  }

})();


/* ==========================================================================
   LIGHTBOX ZOOM
   Click any product gallery image → fullscreen overlay with close + Escape
   ========================================================================== */

(function () {
  'use strict';

  var gallery = document.querySelector('[data-product-gallery]');
  if (!gallery) return;

  // Build lightbox DOM once
  var lightbox = document.createElement('div');
  lightbox.className = 'product-lightbox';
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Image zoom');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML =
    '<div class="product-lightbox__overlay" data-lightbox-close></div>' +
    '<div class="product-lightbox__content">' +
      '<img class="product-lightbox__img" src="" alt="" data-lightbox-img>' +
      '<button class="product-lightbox__close" data-lightbox-close aria-label="Close zoom">' +
        '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">' +
          '<line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="1.5"/>' +
          '<line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" stroke-width="1.5"/>' +
        '</svg>' +
      '</button>' +
    '</div>';
  document.body.appendChild(lightbox);

  // Inject styles
  var style = document.createElement('style');
  style.textContent =
    '.product-lightbox{display:none;position:fixed;inset:0;z-index:3000;align-items:center;justify-content:center;}' +
    '.product-lightbox.is-open{display:flex;}' +
    '.product-lightbox__overlay{position:absolute;inset:0;background:rgba(0,0,0,0.9);cursor:zoom-out;}' +
    '.product-lightbox__content{position:relative;z-index:1;max-width:90vw;max-height:90vh;display:flex;align-items:center;justify-content:center;}' +
    '.product-lightbox__img{max-width:90vw;max-height:90vh;object-fit:contain;display:block;}' +
    '.product-lightbox__close{position:absolute;top:-48px;right:0;width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:#fff;background:none;border:none;cursor:pointer;}' +
    '.product-lightbox__close:hover{opacity:0.7;}' +
    '.product-page__image{cursor:zoom-in;}';
  document.head.appendChild(style);

  var lbImg = lightbox.querySelector('[data-lightbox-img]');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
    lightbox.querySelector('[data-lightbox-close]').focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');
  }

  // Click on gallery images
  gallery.addEventListener('click', function (e) {
    var img = e.target.closest('.product-page__image');
    if (!img) return;
    // Use full-size URL (swap width param to 1800)
    var fullSrc = img.src.replace(/width=\d+/, 'width=1800');
    openLightbox(fullSrc, img.alt);
  });

  // Close buttons
  lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (btn) {
    btn.addEventListener('click', closeLightbox);
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
})();

/* ==========================================================================
   ADD TO CART ANIMATION
   ATC button shows "Added ✓" for 1.5s then reverts. Cart count pulses.
   ========================================================================== */

(function () {
  'use strict';

  var form = document.querySelector('[data-product-form]');
  if (!form) return;

  // Inject ATC animation styles
  var style = document.createElement('style');
  style.textContent =
    '@keyframes badge-pulse{0%{transform:scale(1)}50%{transform:scale(1.4)}100%{transform:scale(1)}}' +
    '.cart-badge-pulse{animation:badge-pulse 0.4s ease;}';
  document.head.appendChild(style);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn       = form.querySelector('[data-atc-btn]');
    var variantId = form.querySelector('[data-variant-id]');
    var qtyInput  = form.querySelector('[data-qty-input]');
    if (!btn || !variantId) return;

    var originalText = btn.textContent;
    btn.disabled     = true;
    btn.textContent  = 'Adding...';

    var qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;

    MossCart.addItem(parseInt(variantId.value, 10), qty)
      .then(function () { return MossCart.getCart(); })
      .then(function (cart) {
        dispatchCartUpdate(cart);
        btn.textContent = 'Added ✓';

        // Pulse the cart badge
        document.querySelectorAll('[data-cart-count]').forEach(function (badge) {
          badge.classList.remove('cart-badge-pulse');
          void badge.offsetWidth; // reflow to restart animation
          badge.classList.add('cart-badge-pulse');
          badge.addEventListener('animationend', function () {
            badge.classList.remove('cart-badge-pulse');
          }, { once: true });
        });

        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled    = false;
        }, 1500);
      })
      .catch(function (err) {
        console.error('ATC error:', err);
        btn.textContent = originalText;
        btn.disabled    = false;
      });
  });
})();
