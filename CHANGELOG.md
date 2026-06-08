# Changelog — Moss Theme

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] — v2.0.0

### Added
- `sections/_blocks.liquid` — Universal section accepting any @theme or @app block, 1–4 column grid, color scheme, padding controls
- `sections/hero.liquid` — Full-width hero with image/video background, overlay, content position, heading/subheading/button blocks
- `sections/carousel.liquid` — Universal carousel with autoplay, prev/next arrows, dots, touch swipe, per-slide content blocks
- `blocks/_card.liquid` — Generic card block (image + heading + text + CTA button + link)
- `blocks/_content.liquid` — Nestable container block accepting @theme blocks as children
- `{%- doc -%}` tags with `@param` annotations on all 19 theme blocks
- `{{ block.shopify_attributes }}` on all 19 block root elements for theme editor compatibility
- `window.MossTheme` global config in `theme.liquid` — moneyFormat, currency, locale
- `<link rel="preconnect">` hints for Shopify CDN and fonts CDN
- Skeleton loaders for cart drawer while items are loading
- Enhanced empty state for cart drawer with bag icon and CTA

### Changed
- All 19 theme blocks: `"tag": "div"` → `"tag": null` (clean DOM, no wrapper divs)
- `--color-mid-grey` darkened from `#888888` to `#767676` for WCAG AA contrast compliance
- Font system now loads from `settings_schema.json` font_picker settings via `font_face` tag
- Dynamic `--font-heading` and `--font-body` CSS vars injected from theme settings
- `font-display: swap` added to prevent FOIT
- Non-system fonts preloaded with `<link rel="preload">`
- All hardcoded `Intl.NumberFormat('en-GB', GBP)` replaced with `MossTheme.moneyFormat`
- Cart discount code field replaced with "Discount codes applied at checkout" info note
- Global `:focus-visible` rules added for all interactive elements (WCAG 2.4.7)
- SVH units applied to hero/slideshow sections for correct mobile viewport height
- CLS prevention: `aspect-ratio` added to product card and collection grid image containers

### Fixed
- All hardcoded English strings replaced with `{{ 'key' | t }}` translation filter:
  - `main-product.liquid` — Add to Basket, Out of Stock, Size Guide, Description, Delivery & Returns, Notify Me
  - `main-cart.liquid` — Your Basket, Order Summary, Subtotal, Shipping, Total, Checkout, Continue Shopping, Remove
  - `product-card.liquid` — Sale, New, Quick Add, Add to Basket
- `quick-view.liquid` hardcoded GBP currency fixed to use `MossTheme.moneyFormat`
- 12 missing locale keys added to `en.default.json`

---

## [1.0.0] — 2026-06-02

### Added
- Full Shopify OS 2.0 theme scaffold
- Mobile navigation drawer (slide-in, overlay, focus trap, Escape key)
- Slideshow with autoplay, fade transitions, dots, arrows, touch swipe, pause on hover
- Variant picker JS — price, images, stock update on option change
- Cart AJAX — quantity update, remove with animation, subtotal flash
- Product image gallery — thumbnail click switches main image, lightbox zoom
- Search overlay — full-width panel from header icon
- Announcement bar ticker — cycles multiple messages
- Colour swatches on product cards (CSS colour circles)
- Quick Add on product cards — hover button, size picker, AJAX add
- Size guide modal — measurement table overlay
- Add-to-cart animation — "Added ✓" + badge pulse
- Filter drawer — collection page filter panel with sort + native Shopify filters
- Mega menu — desktop hover dropdowns, keyboard accessible
- Cart drawer — slide-out mini cart from header
- Wishlist system — localStorage persistence, drawer, toggle buttons
- Product compare — sticky bar, side-by-side modal, max 3 products
- Quick view modal — AJAX product preview
- Customer account pages — login, register, account, orders, addresses
- SEO — JSON-LD Organization, Product, BreadcrumbList
- Open Graph + Twitter Card meta tags
- Sticky mobile ATC bar on product pages
- Back-in-stock email notification form
- Split panel sections for editorial homepage layout
- Brand story, store finder, services links sections
- Homepage wired to real collections via `templates/index.json`

---

_Maintained by the Hekrown Fashion development team._
