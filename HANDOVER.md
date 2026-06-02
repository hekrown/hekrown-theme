# HANDOVER — Moss Custom Shopify Theme

> **Purpose:** This document gives an incoming developer full context to continue this project immediately. Read it top to bottom before making changes.

_Last updated: June 2, 2026_

---

## 0. TL;DR — Where We Are

Moss is a **custom Shopify theme built from scratch** for fashion and apparel stores, designed around the aesthetic of [moss.co.uk](https://moss.co.uk). It is a premium theme targeting either commercial sale or private client deployment.

- **Status:** ~85% complete. Phase 1 (foundation) and Phase 2 (premium features) are done. Phase 3 (design polish, loading states, enhanced sections) and Phase 4 (multi-language, advanced settings) remain.
- **Theme Check:** 0 errors, 4 acceptable warnings (see §9).
- **This is NOT a fork of Dawn or any Shopify starter** — clean build.
- **Design spec:** See `moss-shopify-design-spec.docx` in the parent directory for the original reverse-engineering of the Moss website (tokens, layouts, components).

---

## 1. Design Direction

- **Monochromatic** — black/white/grey palette, red (`#C0392B`) for sale items only
- **Square UI** — `border-radius: 0` everywhere — buttons, inputs, cards, modals
- **Minimal typography** — Helvetica Neue stack, restrained sizing, generous whitespace
- **Editorial photography** — hero-scale imagery, hover image swap on product cards
- **Trust-driven** — USP bars, delivery info, accordions for product details
- **Subtle motion** — transitions at 0.2–0.4s ease, no bounce or spring effects

All design tokens live as CSS custom properties in `assets/base.css`. Change a token there, it propagates everywhere.

---

## 2. Tech Stack

| Area | Choice |
|---|---|
| Platform | Shopify Online Store 2.0 (JSON templates) |
| Styling | Vanilla CSS with custom properties — no preprocessor |
| JavaScript | Vanilla JS — no frameworks, no build step |
| Templating | Liquid |
| Bundling | None — files ship directly from `assets/` |

### Key decisions
- **No build step** — author CSS/JS directly in `assets/`, deploy as-is
- **Section-based composition** — every page is a JSON template referencing sections
- **AJAX cart** — uses Shopify Cart API (`/cart/add.js`, `/cart/change.js`, `/cart.js`)
- **Mobile-first** — base styles for mobile, `@media (min-width: ...)` for desktop
- **Breakpoints** — 640px (tablet), 1024px (desktop), 1280px (wide)

---

## 3. Project Structure

```
moss-theme/
├── assets/
│   ├── base.css                      ← Design tokens, reset, utilities, buttons, forms
│   ├── component-header.css          ← Header, mobile nav drawer, mega menu, search overlay, cart drawer
│   ├── component-footer.css          ← Footer styles
│   ├── customer-account.css          ← Customer account pages (login, register, orders, addresses)
│   ├── section-main-product.css      ← PDP layout, gallery, variant picker, accordions
│   ├── section-main-collection.css   ← Collection grid, filter drawer, sort controls
│   ├── global.js                     ← Sticky header, AJAX cart, mobile nav, search, mega menu, cart drawer, wishlist integration
│   ├── section-main-product.js       ← Variant picker, gallery, qty stepper, ATC animation, lightbox
│   ├── wishlist.js                   ← Wishlist store (localStorage), drawer, toggle buttons
│   └── compare.js                    ← Product compare store, sticky bar, comparison modal
│
├── config/
│   ├── settings_schema.json          ← Theme settings (brand, colours, typography, cart, social)
│   └── settings_data.json            ← Current saved values
│
├── layout/
│   ├── theme.liquid                  ← Main HTML shell — loads CSS, schema snippets, feature snippets, JS
│   └── password.liquid               ← Password-protected store layout
│
├── locales/
│   └── en.default.json               ← Full English translations (200+ strings)
│
├── sections/                         ← 24 sections
│   ├── header-group.json             ← Section group: announcement bar + header
│   ├── footer-group.json             ← Section group: footer (pre-populated with 4 columns)
│   ├── announcement-bar.liquid       ← Rotating messages with prev/next controls
│   ├── header.liquid                 ← Logo, desktop nav, mega menu, search overlay, mobile drawer, cart drawer, wishlist drawer
│   ├── footer.liquid                 ← 4-column footer with newsletter + payment icons
│   ├── slideshow.liquid              ← Hero carousel — autoplay, arrows, dots, touch swipe, keyboard nav
│   ├── collection-grid.liquid        ← Category tiles for homepage (3/4/5 col)
│   ├── featured-collection.liquid    ← Product shelf linked to a collection
│   ├── image-with-text.liquid        ← 50/50 editorial split (image left or right)
│   ├── usp-bar.liquid                ← Trust icons bar
│   ├── collection-banner.liquid      ← Collection header with breadcrumb
│   ├── main-collection.liquid        ← Collection grid + filter drawer + sort + pagination
│   ├── main-collection-sidebar.liquid← Collection grid with permanent left-sidebar filters
│   ├── main-product.liquid           ← Full PDP — gallery, variants, ATC, size guide, sticky ATC, back-in-stock form
│   ├── main-product-split.liquid     ← Alternate PDP — full-width 50/50 split layout
│   ├── main-cart.liquid              ← Cart page with AJAX line items + order summary
│   ├── product-recommendations.liquid← "You May Also Like" via Shopify API
│   ├── cart-recommendations.liquid   ← Cart page recommendations
│   ├── main-page.liquid              ← Static page content
│   ├── main-blog.liquid              ← Blog post grid
│   ├── main-article.liquid           ← Article page
│   ├── main-search.liquid            ← Search results
│   ├── main-404.liquid               ← 404 page
│   └── main-password.liquid          ← Password gate
│
├── snippets/
│   ├── product-card.liquid           ← Reusable product card (hover swap, badges, swatches, quick add, wishlist toggle, compare toggle)
│   ├── compare-ui.liquid             ← Compare sticky bar + modal (included once in theme.liquid)
│   ├── quick-view.liquid             ← Quick view modal (included once in theme.liquid)
│   ├── schema-organization.liquid    ← JSON-LD Organization schema (homepage)
│   ├── schema-product.liquid         ← JSON-LD Product schema (product pages)
│   └── schema-breadcrumbs.liquid     ← JSON-LD BreadcrumbList schema (all pages)
│
└── templates/
    ├── index.json                    ← Homepage
    ├── product.json                  ← Standard PDP
    ├── product.split.json            ← Alternative PDP — full-width split layout
    ├── collection.json               ← Collection with filter drawer
    ├── collection.sidebar.json       ← Collection with sidebar filters
    ├── cart.json
    ├── page.json
    ├── blog.json
    ├── article.json
    ├── search.json
    ├── 404.json
    ├── password.json
    ├── gift-card.liquid              ← Gift card redemption page
    ├── list-collections.liquid       ← All collections grid page
    └── customers/
        ├── login.liquid              ← Login + password recovery
        ├── register.liquid           ← New account registration
        ├── account.liquid            ← Dashboard (order history, default address)
        ├── order.liquid              ← Order detail page
        ├── addresses.liquid          ← Address management (add, edit, delete)
        ├── activate_account.liquid   ← Account activation
        └── reset_password.liquid     ← Password reset
```

---

## 4. Pages & Status

| Page | Status | Notes |
|---|---|---|
| Homepage | ✅ Complete | Slideshow, category tiles, featured products, image-with-text, USP bar |
| Collection | ✅ Complete | Filter drawer, sort, pagination, active filter pills |
| Collection (sidebar) | ✅ Complete | Alternative template with permanent sidebar |
| Product (standard) | ✅ Complete | Gallery + sticky details, variants, ATC, size guide, sticky mobile ATC |
| Product (split) | ✅ Complete | Alternative full-width 50/50 layout |
| Cart | ✅ Complete | AJAX qty updates, remove items, order summary |
| Search | ✅ Complete | Search form + product grid |
| Blog / Article | ✅ Complete | Grid listing + single article |
| 404 | ✅ Complete | — |
| Password | ✅ Complete | — |
| Gift Card | ✅ Complete | QR code, copy code, print |
| Collections list | ✅ Complete | Auto-uses collection or product images |
| Login | ✅ Complete | Password recovery flow included |
| Register | ✅ Complete | First/last name, email, password |
| Account dashboard | ✅ Complete | Order history table, default address |
| Order detail | ✅ Complete | Line items, totals, fulfillment, tracking |
| Addresses | ✅ Complete | Add, edit, delete, set default — inline forms |
| Activate account | ✅ Complete | — |
| Reset password | ✅ Complete | — |

---

## 5. Interactive Features Built

Everything in this list is working, tested, and linted clean.

**Navigation & Chrome**
- Sticky header with scroll shadow (IntersectionObserver)
- Mobile nav drawer — slides from left, overlay, focus trap, Escape key
- Mega menu — desktop hover dropdowns with 150ms close delay, keyboard support
- Search overlay — full-width panel, auto-focuses input, Escape to close
- Announcement bar — auto-rotating messages with prev/next, configurable speed

**Cart**
- Cart drawer — slides from right, AJAX content, remove items, subtotal display
- Cart page — AJAX qty updates, remove with fade-out animation, loading state, totals update
- Cart type setting respected — `settings.cart_type` toggles between drawer and page link
- Cart count badge with pulse animation on add

**Product Page**
- Variant picker — updates price, gallery image, ATC state, unavailable option strikethrough
- Image gallery — thumbnail click switching on desktop, horizontal scroll on mobile
- Lightbox zoom — click image for fullscreen overlay
- Quantity stepper — +/- buttons, min 1 enforced
- Add to cart — AJAX with "Added ✓" state for 1.5s, dispatches `cart:updated` event
- Sticky mobile ATC bar — appears when main ATC button scrolls out of view, syncs with variant changes, triggers main form
- Size guide modal — opens on "Size Guide" link, keyboard accessible
- Back in stock form — appears when product is out of stock (email capture via contact form)
- Variant change event — dispatches `variant:changed` custom event for extensibility

**Collection**
- Filter drawer — left slide-in panel, apply/clear, Shopify Search & Discovery app integration
- Sort dropdown — redirects with correct URL param
- Active filter pills — click to remove individual filters
- Sidebar layout — permanent left sidebar alternative template

**Wishlist**
- Heart toggle on every product card and PDP (via `data-wishlist-toggle`)
- Header icon with badge count
- Wishlist drawer — AJAX fetches product data, shows image/title/price, remove button
- localStorage persistence (no login required)
- Full JS module: `wishlist.js`

**Product Compare**
- Checkbox toggle on product cards (via `data-compare-toggle`)
- Sticky bottom bar showing selection count with "Compare Now" button
- Side-by-side modal — image, name, price, availability, vendor, type, ATC
- Max 3 products with toast notification at limit
- localStorage persistence
- Full JS module: `compare.js`

**Quick View**
- "Quick View" button on product cards (hover reveal)
- Modal fetches product data via `/products/[handle].js`
- Variant select, AJAX ATC, closes after successful add

**SEO**
- JSON-LD: Organization (homepage), Product (PDP), BreadcrumbList (all pages)
- Open Graph tags: site name, URL, title, type, description, image
- Twitter Card tags: card type, title, description, image
- Canonical URL in `<head>`

---

## 6. How to Run Locally

### Prerequisites
```
Node.js v18+
Shopify CLI  →  npm install -g @shopify/cli @shopify/theme
```

### Start the dev server
```powershell
shopify theme dev --store hekrown-fashion.myshopify.com --path "e:\Hekrown\Templates\Moss"
```

- First run opens a browser auth URL — approve it, then dev starts
- Live preview at `http://127.0.0.1:9292`
- Theme editor URL is printed in the terminal — use it to configure sections
- File changes hot-reload automatically

### Other useful commands
```powershell
# Lint the theme
shopify theme check

# Push as unpublished theme (safe — won't affect live store)
shopify theme push --unpublished

# Pull latest from store
shopify theme pull
```

---

## 7. Store Requirements

To properly preview and test the theme, the Shopify store needs:

- **Products** with at least two option types (Colour + Size), 3–5 images each
- **Collections:** `new-arrivals`, `shirts`, `linen-wear`, `essentials` (matching handles used in `index.json`)
- **Navigation:** A "Main menu" link list (handle: `main-menu`) pointing to collections
- **Footer menu:** A link list with handle `footer` for footer navigation columns
- **At least one sold-out variant** — to test sold-out UI and back-in-stock form

---

## 8. What Still Needs Doing

### Phase 3 — Design & Polish (Next up)

**Loading & empty states**
- Skeleton loaders on product cards during AJAX loads
- Empty wishlist state with product suggestions
- Better empty cart illustration and CTA
- No search results state with suggested products

**Enhanced sections**
- Newsletter popup (cookie-gated delay)
- Testimonials slider
- FAQ accordion section
- Video hero (HTML5 background video with image fallback)
- Countdown timer section (for launches/sales)

**Design refinements**
- WCAG AA colour contrast audit
- Focus state review across all interactive elements
- Print stylesheet for order confirmation pages
- Form validation error styling

### Phase 4 — Advanced Features

**Multi-language & Markets**
- Add `fr.json`, `de.json`, `es.json`, `it.json`, `ja.json` locale files
- Currency/language selectors in header
- Shopify Markets support
- RTL stylesheet

**Multi-currency**
- Update all `money` filters to `money_with_currency` throughout

**Additional alternative templates**
- `product.fullwidth.json` — edge-to-edge gallery
- `collection.no-filters.json` — clean grid, no filter UI
- `page.contact.json` — contact form with map embed

**Advanced collection features**
- Visual colour swatch filtering
- Availability toggle (in stock only)
- Infinite scroll option
- Collection tabs (multiple collections in tabs on one page)

**Wishlist enhancements**
- Standalone wishlist page (`/pages/wishlist`)
- Sync to customer metafields when logged in

### Phase 5 — Performance & Release

- Lighthouse audit (target 90+ all metrics)
- CLS prevention audit (aspect-ratio boxes on all images)
- Font preloading and `font-display: swap`
- Resource hints (preconnect Shopify CDN)
- `CHANGELOG.md`
- Merchant customisation guide
- Metafields documentation
- Demo store with sample products

---

## 9. Known Warnings (Theme Check)

Theme Check exits with **code 0 (pass)** — 0 errors. The 4 remaining warnings are all intentional:

| Warning | File | Reason |
|---|---|---|
| `RemoteAsset` | `layout/theme.liquid:51` | Blank data URI favicon fallback — not a remote URL, false positive |
| `UndefinedObject: recover_success` | `customers/login.liquid:10,130` | Valid Shopify runtime variable, not in theme check's object registry |
| `DeprecatedFilter: img_url` | `templates/gift-card.liquid:172` | `gift_card.qr_identifier` is not a Shopify image object; `image_url` does not work here, `img_url` is correct |

Do not "fix" these — they will cause actual regressions.

---

## 10. Conventions & Guidelines

**CSS**
- All tokens in `assets/base.css` as custom properties — never hardcode a colour or spacing value
- Mobile-first — base styles for mobile, `@media (min-width: ...)` for larger screens
- BEM-ish naming — `.block__element--modifier`
- Section-specific styles go either inline in a `<style>` block in the section file, or in a dedicated `section-*.css` asset

**JavaScript**
- Vanilla JS only — no jQuery, no frameworks
- No build step — write directly in `assets/`
- Use `data-*` attributes as JS hooks, never class names
- Dispatch custom events (`cart:updated`, `variant:changed`, `wishlist:updated`) rather than coupling modules directly
- Always clean up event listeners on drawers/modals to avoid memory leaks

**Liquid**
- Use `{{ routes.* }}` objects for all URLs — never hardcode `/cart`, `/account`, `/search`, etc.
- Expose all merchant-facing content as section/block settings
- Use `{{ 'key' | t }}` translation filter for all user-facing strings

**Accessibility**
- All interactive elements need `aria-label` or visible label
- Modals and drawers must trap focus and restore it on close
- All images need `alt`, `width`, and `height` attributes

---

## 11. Git Workflow

- `main` = stable, deployable
- Feature branches: `feature/phase-3-loading-states`, `feature/multi-language`, etc.
- One feature or fix per commit
- Run `shopify theme check` before every merge — must exit 0
- Test on `shopify theme dev` before pushing

---

## 12. Reference Links

| Resource | URL |
|---|---|
| Shopify Theme Docs | https://shopify.dev/docs/themes |
| Liquid reference | https://shopify.dev/docs/api/liquid |
| Shopify Cart API | https://shopify.dev/docs/api/ajax/reference/cart |
| Theme Check docs | https://shopify.dev/docs/themes/tools/theme-check |
| Online Store 2.0 | https://shopify.dev/docs/themes/architecture |
| Design spec | `../moss-shopify-design-spec.docx` |
| Development status | `DEVELOPMENT-STATUS.md` |
| README | `README.md` |
