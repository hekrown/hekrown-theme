/* ==========================================================================
   MOSS THEME — Scroll Reveal Animations
   Adds .is-visible to .reveal elements when they enter viewport.
   Respects settings.enable_scroll_animations and prefers-reduced-motion.
   ========================================================================== */

(function () {
  'use strict';

  // Check if animations are enabled (set in theme.liquid via data attribute)
  var body = document.body;
  if (body.dataset.animations === 'false') return;

  // Respect prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
