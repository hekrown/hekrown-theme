# Moss Theme — Production Readiness Tracker

> **Created:** June 6, 2026
> **Last Updated:** June 11, 2026
> **Goal:** Bring Moss to Shopify Theme Store production quality, matching/exceeding Horizon-level standards
> **Current Status:** ~65% complete | Sprints 1–3 done, Sprints 4–5 remain
> **Deployed:** ✅ Pushed to Shopify (theme #152965120172) — June 11, 2026

---

## Overview

This document tracks every issue, gap, and improvement needed before Moss can ship. It's organized into three tiers:

1. **CRITICAL** — Must fix. Theme will be rejected or broken without these.
2. **HORIZON PARITY** — Features/patterns Horizon has that we need to match or exceed.
3. **POLISH** — Nice-to-haves that elevate the theme from good to premium.

---

## TIER 1: CRITICAL FIXES (Blockers)

### 1.1 Currency Hardcoding ✅ DONE (Sprint 1)
- [x] **Remove hardcoded GBP from `main-cart.liquid`** — replaced with `window.MossTheme.moneyFormat`
- [x] **Remove hardcoded GBP from `global.js`** — cart drawer `fmt()` now uses `MossTheme.moneyFormat`
- [x] **Create a global money format utility** — `window.MossTheme` config block in `theme.liquid`
- [x] **Audit all JS files** — fixed in `wishlist.js`, `compare.js`, `main-product.liquid` sticky ATC

### 1.2 Font System Disconnect ✅ DONE (Sprint 1)
- [x] **Load fonts from theme settings** — `{{ settings.font_heading | font_face }}` in `theme.liquid`
- [x] **Apply font families dynamically** — `--font-body` and `--font-heading` CSS vars from settings
- [x] **Add font-display: swap** to prevent FOIT
- [x] **Preload the primary font weights** with `<link rel="preload">`
- [x] **base.css uses fallback** — dynamic vars override the Helvetica Neue stack

### 1.3 Hardcoded English Strings ⚠️ MOSTLY DONE (Sprint 1)
- [x] Fix in `main-product.liquid`: Add to Basket, Out of Stock, Description, Delivery & Returns, Size Guide, Notify Me, sticky ATC text
- [x] Fix in `main-cart.liquid`: Your Basket, Order Summary, Subtotal, Delivery, Total, Checkout, Continue Shopping, Remove
- [x] Fix in `product-card.liquid`: Quick Add, Add to Basket, Sale, New
- [x] **Add missing locale keys** to `en.default.json` — all new keys added
- [x] Fix in `header.liquid`: "Your Basket", "Your Wishlist"
- [x] Fix in `footer.liquid`: "Enter your email", "Subscribe"

### 1.4 settings_data.json Presets ✅ DONE (Sprint 1)
- [x] **Preset 1: "Minimal"** — clean white, restrained typography, zoom hover
- [x] **Preset 2: "Editorial"** — warm off-white, Playfair Display heading font, generous spacing
- [x] **Preset 3: "Bold"** — Oswald uppercase headings, strong contrast, full-featured

### 1.5 Non-Functional UI ✅ DONE (Sprint 1)
- [x] **Discount code field fixed** — replaced non-functional input with "Discount codes can be applied at checkout" info note with icon

### 1.6 Theme Check Compliance
- [ ] Re-run `shopify theme check` after all changes
- [ ] Verify 0 errors maintained
- [ ] Document any new warnings with justification

### 1.7 Accessibility — Critical Items ⚠️ PARTIALLY DONE (Sprint 1)
- [x] **Mid-grey contrast** — darkened `--color-mid-grey` from #888888 to #767676 (WCAG AA 4.5:1)
- [x] **Global focus rings** — added `:focus-visible` rules to `base.css` for all interactive elements (2px solid black, 2px offset)
- [x] Size guide modal focus trap — Tab-trap logic added (Escape + full Tab cycle)
- [x] Product card `<article>` — has `aria-label="{{ product.title }}"`
- [ ] Color swatches — already has `title` attribute, verify it renders as tooltip
- [ ] Filter drawer focus management — verify focus returns to trigger on close

---

## TIER 2: HORIZON PARITY (Matching the Standard)

### 2.1 Architecture Upgrades

#### Native `color_scheme` Setting Type
Horizon uses Shopify's native `color_scheme` setting type (not custom color pickers). This gives merchants the standard Shopify color scheme editor UI.

- [ ] **Migrate to native `color_scheme` type** in `settings_schema.json`
- [ ] Define 6 color schemes (vs current 3): Light, Dark, Neutral, Accent, Warm, Transparent
- [ ] Each scheme needs 30+ color tokens (Horizon standard): background, foreground, foreground_heading, primary, primary_hover, border, shadow, primary_button_bg/text/border (normal + hover), secondary_button_bg/text/border (normal + hover), input_bg/text/border/hover, variant_bg/text/border (normal + hover + selected)
- [ ] Update every section schema to include `{ "type": "color_scheme", "id": "color_scheme" }`
- [ ] Update CSS to use the native color scheme CSS variables pattern
- [ ] Add adaptive opacity logic (adjust opacity based on background brightness)

#### `content_for 'blocks'` Pattern ⚠️ PARTIALLY DONE
Horizon renders blocks via `{% content_for 'blocks' %}` capture pattern, not the legacy `{% for block in section.blocks %}` loop.

- [x] **`_blocks.liquid` uses `{%- content_for 'blocks' -%}`** — universal section is Horizon-pattern
- [ ] Create a **universal `section` snippet** (like Horizon's `section.liquid`) that wraps all sections with consistent padding, width, color scheme, and structure
- [ ] Create a **`group` snippet** (like Horizon's `group.liquid`) for block containers
- [ ] Refactor existing block-aware sections to use `content_for` pattern

#### `tag: null` on Theme Blocks ✅ DONE (Sprint 2)
- [x] Added `"tag": null` to all 21 theme blocks (19 original + 2 new: `_card`, `_content`)
- [x] Ensures clean DOM output without unnecessary wrapper divs

#### `{%- doc -%}` Documentation Tags ✅ DONE (Sprint 2)
- [x] Added `{%- doc -%}` tags with `@param` annotations to all 21 theme blocks

#### `{{ shopify_attributes }}` on All Blocks ✅ DONE (Sprint 2)
- [x] Added `{{ block.shopify_attributes }}` to all 21 block root elements

#### `visible_if` Conditional Settings
Horizon uses `visible_if` to show/hide settings contextually in the editor.

- [ ] Add `visible_if` to settings that should be conditional (e.g., show "background color" only when "show background" is checked)
- [ ] Apply to block schemas where settings depend on other settings
- [ ] Examples: color_scheme visible only when inherit_color_scheme is false, gradient direction visible only when overlay_style is gradient

#### Static Blocks
Horizon uses static blocks for fixed structural elements (logo, menu).

- [ ] Convert header logo and menu to static theme blocks
- [ ] Use `{% content_for 'block', type: '_header-logo', id: 'header-logo' %}` pattern
- [ ] Prevents merchants from accidentally removing essential header elements

### 2.2 Missing Sections ✅ HIGH-PRIORITY DONE (Sprint 3)

| Section | Status |
|---|---|
| `_blocks.liquid` (universal section) | ✅ Built — accepts any @theme + @app block, 1–4 col grid, color scheme, padding |
| `hero.liquid` | ✅ Built — image/video bg, overlay, content position, heading/text/button blocks |
| `carousel.liquid` | ✅ Built — autoplay, arrows, dots, swipe, per-slide image/heading/text/button |
| `media-with-content.liquid` | ✅ Built — image/video media column, 50/50 split, reversible, color scheme |
| `collection-list.liquid` | ✅ Built — 2–4 col grid, collection cards, image/title/subtitle/CTA, color scheme |

**Current section count: 44 (including 2 JSON groups) | Target: 45+**

### 2.3 Missing Theme Blocks ✅ HIGH-PRIORITY DONE (Sprint 3)

| Block | Status |
|---|---|
| `_card.liquid` | ✅ Built — image + heading + text + button, hover zoom, link wrapping |
| `_content.liquid` (nestable) | ✅ Built — accepts @theme blocks, bg/padding/border/radius/max-width |
| `_marquee.liquid` | ✅ Built — scrolling ticker, configurable speed/separator/colors, pause on hover, reduced-motion safe |
| `_accordion-row.liquid` | ✅ Built — accessible expand/collapse, focus-managed, open by default option |

**Current block count: 21 | Target: 25–30**

### 2.4 Advanced Features Horizon Ships With

#### Performance ⚠️ PARTIALLY DONE (Sprint 1 + 4)
- [x] **SVH units** — `100svh` applied to hero/slideshow via `@supports`
- [x] **Preconnect hints** — `<link rel="preconnect">` for Shopify CDN + fonts CDN in `theme.liquid`
- [x] **CLS prevention** — `aspect-ratio` added to product card and collection grid image containers
- [x] **Font preloading** — non-system fonts preloaded with `<link rel="preload">`
- [ ] `{% stylesheet %}` scoped CSS — not started
- [ ] Lazy load section CSS/JS — not started
- [ ] Image preloading for above-fold hero — not started
- [ ] Lighthouse audit — not run

#### Responsive Settings
- [ ] **Desktop/mobile width controls** on blocks (e.g., 25%/50%/100% width for desktop, separate for mobile)
- [ ] **Section height options** (auto, small, medium, large, full-screen) on hero/banner sections
- [ ] **Content direction** (row/column) on flexible sections

#### Color Scheme Inheritance
- [ ] Add `inherit_color_scheme` checkbox to nestable blocks
- [ ] When true, block inherits parent section's scheme; when false, uses its own

#### Visual Preview Mode
- [ ] Detect `request.visual_preview_mode` for theme editor compatibility
- [ ] Add `data-shopify-visual-preview` attributes where needed
- [ ] Detect `request.design_mode` for editor-specific logic

### 2.5 Section-Level Settings Every Section Needs

#### @theme Block Support ✅ DONE (June 11, 2026)
All 44 liquid sections now accept `{ "type": "@theme" }` and `{ "type": "@app" }` blocks. Merchants can add any theme block (Heading, Text, Button, Image, Video, Card, Icon, Spacer, Divider, etc.) to any section from the theme editor.

Horizon gives every section these additional controls. Audit all 44 Moss sections:

- [ ] **Color scheme** selector (native `color_scheme` type)
- [ ] **Section width** (page-width vs full-width)
- [ ] **Section height** (auto / small / medium / large / full-screen) — for hero/banner types
- [ ] **Top/bottom padding** (range sliders or presets)
- [ ] **Content direction** (horizontal/vertical) — for flex sections
- [ ] **Gap** control (spacing between blocks)
- [ ] **Background media** option (image/video behind content) — for key sections

### 2.6 Translation Schema Labels

Horizon uses `t:` prefixes for ALL schema labels and setting names (not just customer-facing text).

- [ ] Convert all section schema `"name"`, `"label"`, `"info"`, `"options"` values to use `t:` translation keys
- [ ] Add corresponding entries to `en.default.json` under a `"theme_editor"` or similar namespace
- [ ] This makes the theme fully translatable for international Shopify partners

---

## TIER 3: POLISH & PRODUCTION QUALITY

### 3.1 Accessibility Fixes

| Issue | WCAG | Fix | Status |
|---|---|---|---|
| Mid-grey (#888) contrast on white | 1.4.3 AA | Darken to #767676 minimum | ✅ Done |
| No visible focus rings on buttons | 2.4.7 AA | Add `outline` or `box-shadow` on `:focus-visible` | ✅ Done |
| Size guide modal lacks focus trap | 2.4.3 A | Add Tab-trap logic (currently only Escape) | ⏳ |
| Product card `<article>` lacks accessible name | 4.1.2 | Add `aria-label="{{ product.title }}"` | ⏳ |
| Color swatches convey info by color alone | 1.4.1 A | Add tooltip/title with color name | ⏳ |
| Quantity stepper buttons lack visible labels | 1.3.1 | They have aria-label but no visible text — consider adding +/- text | ⏳ |
| Filter drawer focus management | 2.4.3 | Verify focus returns to trigger on close (check implementation) | ⏳ |
| Announcement bar auto-rotation | 2.2.2 | Add pause mechanism (exists, verify works) | ⏳ |

### 3.2 Performance Targets

| Metric | Target | Current | Status |
|---|---|---|---|
| Lighthouse Performance | 90+ | Unknown | [ ] Run audit |
| Lighthouse Accessibility | 95+ | Unknown | [ ] Run audit |
| Lighthouse Best Practices | 95+ | Unknown | [ ] Run audit |
| Lighthouse SEO | 95+ | Unknown | [ ] Run audit |
| First Contentful Paint | < 1.8s | Unknown | [ ] |
| Largest Contentful Paint | < 2.5s | Unknown | [ ] |
| Cumulative Layout Shift | < 0.1 | Unknown | [ ] |
| Total Blocking Time | < 200ms | Unknown | [ ] |

### 3.3 Loading & Empty States ⚠️ PARTIALLY DONE (Sprint 4)
- [x] **Skeleton loaders** for cart drawer items while fetching
- [x] **Empty cart drawer state** — "Your basket is empty" + Continue Shopping CTA
- [ ] Skeleton loaders for product cards during AJAX filtering
- [ ] Empty wishlist state with illustration + product suggestions
- [ ] No search results state with popular products

### 3.4 Legacy Section Refactor

These 6 pre-existing sections don't match the current architecture:

| Section | Issues | Action |
|---|---|---|
| `brand-story.liquid` | ~~No color scheme~~, no @theme blocks | [x] color_scheme setting added |
| `full-banner.liquid` | ~~No color scheme~~, no @theme blocks | [x] color_scheme setting added |
| `services-links.liquid` | ~~No color scheme~~, no @theme blocks | [x] color_scheme setting added |
| `split-panel.liquid` | ~~No color scheme~~, no @theme blocks | [x] color_scheme setting added |
| `sticky-hero.liquid` | ~~No color scheme~~, no @theme blocks | [x] color_scheme setting added |
| `store-finder.liquid` | ~~No color scheme~~, no @theme blocks | [x] color_scheme setting added |

### 3.5 Inline Styles Cleanup

Move inline `style=""` attributes to proper CSS classes:

- [ ] `product-buy-buttons.liquid` — heavy inline styles on quantity stepper
- [ ] Various blocks using `style="margin-bottom: var(--space-md)"` — use CSS classes
- [ ] Product card quick-add uses inline margin

### 3.6 Documentation ✅ DONE (Sprint 5)
| Document | Status |
|---|---|
| `CHANGELOG.md` | ✅ Created — v1.0.0 (initial) + v2.0.0 (unreleased) |
| `docs/merchant-setup.md` | ✅ Setup guide — logo, nav, products, metafields, apps |
| `docs/metafields.md` | ✅ All metafields documented (namespace/key/type/usage) |
| `docs/app-compatibility.md` | ✅ Judge.me, Klaviyo, Search & Discovery, Shop Pay |

### 3.7 App Block Testing

- [ ] Verify `@app` blocks render in `rich-text.liquid`
- [ ] Verify `@app` blocks render in `multicolumn.liquid`
- [ ] Verify `@app` blocks render in `main-product-blocks.liquid`
- [ ] Verify `@app` blocks render in `main-cart.liquid`
- [ ] Test with **Judge.me** (free reviews app)
- [ ] Test with **Klaviyo** (email marketing blocks)
- [ ] Document compatibility results

### 3.8 Browser & Device Testing

| Browser/Device | Status |
|---|---|
| Chrome (latest) — Desktop | [ ] |
| Firefox (latest) — Desktop | [ ] |
| Safari (latest) — Desktop | [ ] |
| Edge (latest) — Desktop | [ ] |
| Chrome — Android (mobile) | [ ] |
| Safari — iOS (mobile) | [ ] |
| Safari — iPad (tablet) | [ ] |
| Chrome — Android (tablet) | [ ] |

### 3.9 Demo Store

- [ ] Create sample products (8–12) with multiple variants, images, metafields
- [ ] Create collections: new-arrivals, shirts, linen-wear, essentials, sale
- [ ] Create navigation menus (main-menu, footer)
- [ ] Configure all sections with real-looking demo content
- [ ] Screenshot all pages for theme store listing
- [ ] Test full purchase flow

### 3.10 Legal & Business

- [ ] Choose theme license (MIT, proprietary, Shopify standard)
- [ ] Add copyright headers to all asset files
- [ ] Define support policy (email, response time, what's included)
- [ ] Set pricing ($350–$400 for Theme Store, or marketplace pricing)
- [ ] Prepare Shopify Theme Store submission package

---

## IMPLEMENTATION ORDER

Recommended sequence for tackling this work:

### Sprint 1: Critical Fixes ✅ DONE
1. ~~Fix font system (1.2)~~
2. ~~Fix currency hardcoding (1.1)~~
3. ~~Fix hardcoded strings (1.3)~~ — header/footer strings still pending
4. ~~Fix/remove discount field (1.5)~~
5. ~~Fix accessibility contrast + focus (3.1 top items)~~

### Sprint 2: Horizon Architecture Alignment ✅ DONE
6. ~~Add `tag: null`, `shopify_attributes`, `{%- doc -%}` to all blocks (2.1)~~
7. ~~Partial: `content_for 'blocks'` on `_blocks.liquid` section~~
8. Native `color_scheme` type — NOT DONE (deferred)
9. Section-level settings — NOT DONE (deferred)
10. `visible_if` — NOT DONE (deferred)

### Sprint 3: Content & Feature Expansion ✅ DONE
11. ~~Build missing sections: `_blocks`, hero, carousel (2.2)~~
12. ~~Build missing blocks: `_card`, nestable `_content` (2.3)~~
13. Legacy section refactor — NOT DONE (deferred)
14. Responsive desktop/mobile controls — NOT DONE (deferred)

### Sprint 4: Performance & Polish ⏳ NEXT
15. Performance optimizations: lazy loading, Lighthouse audit
16. Loading/empty states (wishlist, search)
17. Inline styles cleanup (3.5)
18. Schema label translations with `t:` (2.6)
19. Remaining i18n: header.liquid, footer.liquid strings
20. Remaining accessibility: focus trap, aria-labels

### Sprint 5: Production Release ⏳ PENDING
21. Native `color_scheme` migration (major refactor)
22. Section-level settings audit (color + padding on all 44 sections)
23. `visible_if` conditional settings
24. Browser/device testing (3.8)
25. Demo store setup (3.9)
26. Final Lighthouse audit (3.2)
27. Theme Check final pass (1.6)
28. Legal & submission prep (3.10)

---

## HORIZON vs MOSS — Feature Comparison

| Feature | Horizon | Moss (Current) | Moss (Target) |
|---|---|---|---|
| Sections | 41 | 44 | 45+ |
| Theme blocks | 94 | 21 | 25–30 |
| Snippets | 93 | 9 | 15–20 |
| Color schemes | 6 (native type, 30+ tokens each) | 3 (custom, 6 tokens each) | 6 (native type, 30+ tokens) |
| `content_for 'blocks'` | ✅ | ⚠️ (`_blocks` only) | ✅ |
| `tag: null` on blocks | ✅ | ✅ | ✅ |
| `{%- doc -%}` tags | ✅ | ✅ | ✅ |
| `visible_if` settings | ✅ | ❌ | ✅ |
| Static blocks | ✅ | ❌ | ✅ |
| Nestable blocks (8 levels) | ✅ | ✅ (`_content` + `group`) | ✅ |
| `{% stylesheet %}` scoped CSS | ✅ | ❌ (inline styles) | ✅ |
| SVH units | ✅ | ✅ | ✅ |
| Universal section wrapper snippet | ✅ | ❌ | ✅ |
| Font preloading | ✅ | ✅ | ✅ |
| Responsive block width (desktop/mobile) | ✅ | ❌ | ✅ |
| Section height controls | ✅ | ⚠️ (hero only) | ✅ |
| Schema label translations (`t:`) | ✅ | ❌ | ✅ |
| AI-compatible block structure | ✅ | ✅ | ✅ |
| **App-replacement features** | ❌ | ✅ (12 features) | ✅ (our differentiator) |
| Wishlist | ❌ | ✅ | ✅ |
| Product Compare | ❌ | ✅ | ✅ |
| Quick View | ❌ | ✅ | ✅ |
| Countdown Timer | ❌ | ✅ | ✅ |
| Free Shipping Bar | ❌ | ✅ | ✅ |
| Newsletter Popup | ❌ | ✅ | ✅ |
| Cart Upsells | ❌ | ✅ | ✅ |
| Predictive Search | ❌ | ✅ | ✅ |
| Recently Viewed | ❌ | ✅ | ✅ |
| Back-in-Stock Alerts | ❌ | ✅ | ✅ |

**Our Edge:** Moss already surpasses Horizon in app-replacement features. The goal is to match Horizon's architectural elegance and customization depth while keeping our feature advantage.

---

## SUCCESS CRITERIA

The theme is ready to ship when ALL of the following are true:

- [x] 0 hardcoded currency references in JS
- [ ] 0 hardcoded English strings in Liquid (header/footer still pending)
- [x] Font picker settings fully functional (fonts load and apply)
- [ ] Native `color_scheme` type with 6 schemes, each 30+ tokens
- [ ] All sections have color scheme + padding + width controls
- [x] All theme blocks have `tag: null`, `shopify_attributes`, `{%- doc -%}`
- [x] `settings_data.json` has 3 named presets with full demo content
- [ ] `content_for 'blocks'` pattern used in all block-accepting sections
- [ ] 45+ sections, 25+ theme blocks (currently 44 sections, 21 blocks)
- [ ] Lighthouse 90+ on all metrics
- [ ] WCAG AA compliance (contrast ✅, focus ✅, keyboard — partial)
- [ ] Theme Check: 0 errors (needs re-run)
- [ ] Tested on Chrome, Firefox, Safari (desktop + mobile)
- [ ] Tested with Judge.me + Klaviyo app blocks
- [x] Merchant documentation complete
- [ ] Demo store configured with sample content

**Score: 5/16 criteria met | Next priority: Sprint 4 (performance + remaining i18n + accessibility)**

---

## DEPLOYMENT LOG

| Date | Action | Details |
|---|---|---|
| June 11, 2026 | Pushed to Shopify | Theme #152965120172 on hekrown-fashion.myshopify.com |
| June 11, 2026 | Git merge | Integrated Sprint 1–5 changes from other developer |

**Preview:** https://hekrown-fashion.myshopify.com?preview_theme_id=152965120172
**Editor:** https://hekrown-fashion.myshopify.com/admin/themes/152965120172/editor

---

_This document is the single source of truth for what needs to happen before Moss ships. Update checkboxes as work is completed._
