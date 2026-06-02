# Moss Theme — Development Status

> **Last Updated:** June 2, 2026
> **Target:** Premium Shopify Theme (commercial release / Shopify Theme Store)
> **Theme Check:** ✅ Exit code 0 — 0 errors, 4 acceptable warnings

---

## Overall Progress

**~85% complete.** Phase 1 and Phase 2 are fully done. Phase 3, 4, and 5 remain.

| Phase | Scope | Status |
|---|---|---|
| 1 — Foundation & Standards | Templates, accounts, SEO, locales, settings | ✅ Done |
| 2 — Premium Features | Wishlist, compare, quick view, alt templates, mobile ATC | ✅ Done |
| 3 — Design & Polish | Loading states, empty states, enhanced sections | ⏳ Next |
| 4 — Advanced Features | Multi-language, Markets, advanced settings | ⏳ Pending |
| 5 — Performance & Release | Lighthouse, docs, demo store | ⏳ Pending |

---

## Phase 1 — Foundation & Standards ✅

### Templates

| Template | Status |
|---|---|
| `templates/index.json` | ✅ |
| `templates/product.json` | ✅ |
| `templates/collection.json` | ✅ |
| `templates/cart.json` | ✅ |
| `templates/page.json` | ✅ |
| `templates/blog.json` | ✅ |
| `templates/article.json` | ✅ |
| `templates/search.json` | ✅ |
| `templates/404.json` | ✅ |
| `templates/password.json` | ✅ |
| `templates/gift-card.liquid` | ✅ QR code, copy code, print, Apple Wallet link |
| `templates/list-collections.liquid` | ✅ Auto-uses collection or product images |

### Customer Account Templates (8/8)

| Template | Status |
|---|---|
| `customers/login.liquid` | ✅ Email/password + password recovery flow |
| `customers/register.liquid` | ✅ Full form with validation |
| `customers/account.liquid` | ✅ Order history table + default address |
| `customers/order.liquid` | ✅ Line items, totals, fulfillment, tracking links |
| `customers/addresses.liquid` | ✅ Add, edit, delete, set default — all inline |
| `customers/activate_account.liquid` | ✅ |
| `customers/reset_password.liquid` | ✅ |
| `assets/customer-account.css` | ✅ Full responsive CSS module |

### Sections (24 total)

| Section | Status |
|---|---|
| `announcement-bar.liquid` | ✅ Auto-rotating, prev/next controls, configurable speed |
| `header.liquid` | ✅ Logo, desktop nav, mega menu, search overlay, mobile drawer, cart drawer, wishlist drawer |
| `footer.liquid` | ✅ 4-column footer, newsletter, payment icons |
| `slideshow.liquid` | ✅ Autoplay, fade, arrows, dots, touch swipe, keyboard nav, pause on hover |
| `collection-grid.liquid` | ✅ Category tiles, 3/4/5 col, placeholder SVGs |
| `featured-collection.liquid` | ✅ Linked to any collection, view all button |
| `image-with-text.liquid` | ✅ 50/50 split, image left or right, placeholder SVG |
| `usp-bar.liquid` | ✅ Configurable icon/heading/text blocks |
| `collection-banner.liquid` | ✅ Title, description, breadcrumb |
| `main-collection.liquid` | ✅ Grid, filter drawer, sort, pagination, active filter pills |
| `main-collection-sidebar.liquid` | ✅ Permanent left-sidebar filter layout |
| `main-product.liquid` | ✅ Gallery, variants, ATC, size guide modal, sticky mobile ATC, back-in-stock form |
| `main-product-split.liquid` | ✅ Full-width 50/50 split alternative layout |
| `main-cart.liquid` | ✅ AJAX line items, remove animation, loading state, order summary |
| `product-recommendations.liquid` | ✅ Shopify native recommendations API |
| `cart-recommendations.liquid` | ✅ Cart page recommendations |
| `main-page.liquid` | ✅ |
| `main-blog.liquid` | ✅ 3-column grid, pagination |
| `main-article.liquid` | ✅ Full article with image |
| `main-search.liquid` | ✅ Search form + product grid |
| `main-404.liquid` | ✅ |
| `main-password.liquid` | ✅ |

### Snippets (6 total)

| Snippet | Status |
|---|---|
| `product-card.liquid` | ✅ Hover image swap, sale/new badges, colour swatches, quick add, wishlist toggle, compare toggle |
| `compare-ui.liquid` | ✅ Sticky compare bar + comparison modal |
| `quick-view.liquid` | ✅ Quick view modal with AJAX ATC |
| `schema-organization.liquid` | ✅ JSON-LD Organization (homepage) |
| `schema-product.liquid` | ✅ JSON-LD Product with ratings support |
| `schema-breadcrumbs.liquid` | ✅ JSON-LD BreadcrumbList (all pages) |

### Assets

| File | Status |
|---|---|
| `base.css` | ✅ Design tokens, reset, utilities, buttons, forms |
| `component-header.css` | ✅ Header, mobile nav, mega menu, search overlay, cart drawer |
| `component-footer.css` | ✅ |
| `customer-account.css` | ✅ All account page styles |
| `section-main-product.css` | ✅ PDP layout, gallery, variant picker, quantity, accordions |
| `section-main-collection.css` | ✅ Collection grid, filter drawer, sort, pagination |
| `global.js` | ✅ Sticky header, AJAX cart helpers, mobile nav, search overlay, mega menu, cart drawer |
| `section-main-product.js` | ✅ Variant picker, gallery, qty stepper, ATC animation, lightbox zoom |
| `wishlist.js` | ✅ localStorage store, drawer, toggle buttons, badge counts |
| `compare.js` | ✅ localStorage store, sticky bar, comparison modal |

### SEO

- ✅ JSON-LD — Organization, Product, BreadcrumbList
- ✅ Open Graph — site name, URL, title, type, description, image
- ✅ Twitter Card — summary_large_image with title, description, image
- ✅ Canonical URL in `<head>`
- ✅ Hardcoded routes replaced with `{{ routes.* }}` objects throughout

### Localization

- ✅ `en.default.json` — fully populated (200+ strings)
- ✅ Covers: accessibility, products, cart, customer accounts, blog, forms, gift cards, collections, filters

### Settings & Config

- ✅ Brand (logo, logo width, favicon)
- ✅ Colours (primary, secondary, accent, background, text)
- ✅ Typography (heading font, body font — non-deprecated defaults)
- ✅ Cart type (drawer vs page — fully respected in header and global.js)
- ✅ Social media (Instagram, Facebook, Pinterest, TikTok, YouTube)
- ✅ Footer pre-populated with 4 default columns in `footer-group.json`

### Accessibility

- ✅ Skip to content link
- ✅ ARIA labels on all interactive elements
- ✅ Focus trap in all modals and drawers
- ✅ Focus restored on modal/drawer close
- ✅ Keyboard navigation — Escape to close, Tab trap in drawers
- ✅ Semantic HTML throughout
- ✅ `alt`, `width`, `height` on all img tags

---

## Phase 2 — Premium Features ✅

### Wishlist System
- ✅ Heart toggle on every product card
- ✅ Heart toggle on PDP (via `data-wishlist-toggle`)
- ✅ Header icon with live badge count
- ✅ Wishlist drawer — fetches product data via API, shows image/price/title, remove button
- ✅ localStorage persistence (no login required)
- ✅ All state syncs across multiple buttons on the same page
- ⬜ Wishlist page (`/pages/wishlist`) — standalone page template
- ⬜ Sync to customer metafields when logged in
- ⬜ Share wishlist link

### Product Compare
- ✅ Compare checkbox toggle on every product card
- ✅ Sticky bottom bar — count display, "Compare Now" button, "Clear" button
- ✅ Comparison modal — side-by-side table (image, name, price, availability, vendor, type)
- ✅ Max 3 products — toast notification when limit hit
- ✅ ATC from comparison table
- ✅ Remove from comparison via table or card toggle
- ✅ localStorage persistence
- ⬜ Compare page (standalone `/pages/compare` URL)

### Quick View
- ✅ Hover button on product cards
- ✅ Fetches product data via `/products/[handle].js`
- ✅ Variant select syncs price and ATC button state
- ✅ AJAX add to cart — auto-closes modal after success
- ✅ Keyboard accessible (Escape to close)

### Sticky Mobile ATC Bar
- ✅ Appears when main ATC button scrolls out of viewport
- ✅ Syncs price and disabled state on variant change (via `variant:changed` event)
- ✅ Tapping bar triggers the main product form submit

### Back in Stock Notifications
- ✅ Email capture form appears on out-of-stock products
- ✅ Submits via Shopify contact form with product URL in body
- ⬜ Native integration with Klaviyo or Shopify Email for automated send

### Alternative Templates
- ✅ `product.split.json` — Full-width 50/50 split gallery + details
- ✅ `collection.sidebar.json` — Permanent left sidebar filters
- ⬜ `product.fullwidth.json` — Edge-to-edge gallery layout
- ⬜ `collection.no-filters.json` — Simple clean grid, no filter UI
- ⬜ `page.contact.json` — Contact form with map embed

---

## Phase 3 — Design & Polish ⏳

### Loading & Empty States
- ⬜ Skeleton loaders for product cards (during AJAX filtering/loading)
- ⬜ Skeleton loaders for cart drawer items
- ⬜ Empty wishlist state with product suggestions
- ⬜ Empty cart illustration + stronger CTA
- ⬜ No search results state (popular products or suggestions)
- ⬜ Out-of-stock product card styling improvements

### Enhanced Sections
- ⬜ Newsletter popup modal (cookie-gated, configurable delay)
- ⬜ Testimonials slider/grid section
- ⬜ FAQ accordion section
- ⬜ Video hero section (HTML5 background video + image fallback)
- ⬜ Countdown timer section (for launches and sales)
- ⬜ Before/After image slider section
- ⬜ Collection tabs section (multiple collections on one page)

### Design Refinements
- ⬜ WCAG AA colour contrast audit
- ⬜ Focus state review across all interactive elements
- ⬜ Print stylesheet (order confirmation pages)
- ⬜ Form validation error message styling
- ⬜ Micro-interaction polish (hover states, button feedback)

---

## Phase 4 — Advanced Features ⏳

### Multi-language & Markets
- ⬜ `fr.json`, `de.json`, `es.json`, `it.json`, `ja.json` locale files
- ⬜ Currency selector in header
- ⬜ Language selector in header
- ⬜ Shopify Markets support
- ⬜ RTL stylesheet
- ⬜ Update all `{{ money }}` filters to `{{ money_with_currency }}`

### Advanced Collection Features
- ⬜ Visual colour swatch filtering (click swatch to filter)
- ⬜ Availability toggle (in-stock only filter)
- ⬜ Price range slider (visual UI instead of text inputs)
- ⬜ Infinite scroll (alternative to pagination)
- ⬜ Collection tabs (multiple collections in tab UI)
- ⬜ Sort by Trending / Bestsellers via metafields

### Advanced Settings & Controls
- ⬜ Animation speed controls (slow / normal / fast / off)
- ⬜ Layout density (compact / comfortable / spacious)
- ⬜ Product card hover effect options (swap / zoom / none)
- ⬜ Header layout presets (minimal / classic / bold)
- ⬜ Footer layout options (4-col / 5-col / mega)
- ⬜ Button style options (square / rounded)

### Wishlist & Compare Completion
- ⬜ Wishlist standalone page template
- ⬜ Wishlist sync to customer metafields
- ⬜ Compare standalone page

---

## Phase 5 — Performance & Release ⏳

### Performance
- ⬜ Lighthouse audit — target 90+ on all metrics
- ⬜ CLS prevention audit (aspect-ratio boxes on all images)
- ⬜ Font preloading + `font-display: swap`
- ⬜ Resource hints (preconnect Shopify CDN)
- ⬜ Bundle size audit / dead CSS removal
- ⬜ Web vitals tracking

### Documentation & Release
- ⬜ `CHANGELOG.md`
- ⬜ Merchant customisation guide
- ⬜ Metafields documentation (what to create, where used)
- ⬜ App compatibility notes (Judge.me, Klaviyo, Yotpo, ReCharge)
- ⬜ Setup checklist for new store installs
- ⬜ Demo store with sample products and photography

### Legal & Business
- ⬜ Theme licence chosen
- ⬜ Copyright notices in asset headers
- ⬜ Support plan defined
- ⬜ Shopify Theme Store submission prepared (if applicable)

---

## Known Technical Debt

| Item | Priority |
|---|---|
| USP bar icons use raw HTML input — needs better approach (preset SVG options or icon picker) | Medium |
| Announcement bar needs refinement when combined with sticky header on scroll | Low |
| No app compatibility testing done (Judge.me, Klaviyo, etc.) | Medium |
| `money` filters not yet updated to `money_with_currency` throughout | Medium |

---

## Theme Check Status

```
56 files inspected
0 errors
4 warnings (all intentional — do not fix)
Exit code: 0 ✅
```

| Warning | Why it's intentional |
|---|---|
| `RemoteAsset` on blank favicon data URI | False positive — it's a local data URI, not a remote asset |
| `UndefinedObject: recover_success` (×2) | Valid Shopify runtime variable, absent from theme check's registry |
| `DeprecatedFilter: img_url` on gift card QR | `gift_card.qr_identifier` is not a Shopify image object — `image_url` fails here, `img_url` is correct |
