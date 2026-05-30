# HANDOVER — Moss Custom Shopify Theme

> **Purpose:** This document gives a new developer full context to contribute to this project immediately. Read it top to bottom before making changes.

_Last updated: 2026-05-30_

---

## 0. TL;DR — What is this?

We're building a **custom Shopify theme from scratch** based on the design language of [moss.co.uk](https://moss.co.uk) — a premium UK menswear brand. The theme is purpose-built for **fashion/apparel** stores.

- **Status:** Skeleton scaffolded. All required Shopify files in place. Theme is uploadable and renders, but needs content population, interactivity (JS), and visual polish.
- **Design spec:** See `moss-shopify-design-spec.docx` in the parent directory — it's a full reverse-engineering of the Moss website covering design tokens, page layouts, components, and Shopify architecture.
- **This is NOT a fork of Dawn or Horizon** — it's a clean custom build.

---

## 1. Design Direction

The Moss aesthetic is:
- **Monochromatic** — black/white/grey palette, red accent for sale items only
- **Square UI** — border-radius: 0 everywhere (buttons, inputs, cards)
- **Minimal typography** — Helvetica Neue stack, restrained sizing, generous whitespace
- **Editorial photography** — hero-scale imagery, product cards with hover image swap
- **Trust-driven** — USP bars, delivery info, clean accordions for product details
- **No visual noise** — subtle transitions (0.2–0.4s ease), no bounce/spring effects, minimal shadows

All design tokens are defined as CSS custom properties in `assets/base.css`.

---

## 2. Tech Stack & Architecture

| Area | Choice |
|---|---|
| Platform | Shopify (Online Store 2.0, JSON templates) |
| Styling | Vanilla CSS with custom properties (no preprocessor) |
| JavaScript | Vanilla JS (no frameworks, no build step) |
| Template language | Liquid |
| Theme structure | Sections + Blocks + Snippets (OS 2.0 composition) |
| Bundling | None — files ship as-is from `assets/` |

### Key architectural decisions:
- **No build step** — CSS and JS are authored directly in `assets/`
- **Section-based composition** — each page is a JSON template that references sections
- **Reusable snippets** — `product-card.liquid` is used across collection, search, recommendations
- **AJAX cart** — cart operations use Shopify's Cart API (`/cart/add.js`, `/cart/change.js`)
- **Mobile-first responsive** — breakpoints at 640px, 1024px, 1280px

---

## 3. Project Structure

```
moss-theme/
├── assets/
│   ├── base.css                    ← Design tokens, reset, utilities, buttons, forms
│   ├── component-header.css        ← Header + announcement bar styles
│   ├── component-footer.css        ← Footer styles
│   ├── section-main-product.css    ← PDP styles
│   ├── section-main-collection.css ← Collection page styles
│   └── global.js                   ← Sticky header, AJAX cart helpers, cart events
├── config/
│   ├── settings_schema.json        ← Theme settings (brand, colours, typography, cart, social)
│   └── settings_data.json          ← Current setting values
├── layout/
│   ├── theme.liquid                ← Main HTML shell (loads CSS, sections, JS)
│   └── password.liquid             ← Password page layout
├── locales/
│   └── en.default.json             ← English translations
├── sections/
│   ├── header-group.json           ← Section group: announcement bar + header
│   ├── footer-group.json           ← Section group: footer
│   ├── announcement-bar.liquid     ← Top bar with rotating messages
│   ├── header.liquid               ← Logo + nav + icon cluster
│   ├── footer.liquid               ← 4-column footer + newsletter + payment icons
│   ├── slideshow.liquid            ← Hero banner (homepage)
│   ├── collection-grid.liquid      ← Category tiles (homepage)
│   ├── featured-collection.liquid  ← Product shelf (homepage)
│   ├── image-with-text.liquid      ← 50/50 editorial split (homepage)
│   ├── usp-bar.liquid              ← Trust icons bar
│   ├── collection-banner.liquid    ← Collection page header + breadcrumb
│   ├── main-collection.liquid      ← Collection product grid + sort + pagination
│   ├── main-product.liquid         ← Full PDP (gallery, variants, ATC, accordions)
│   ├── main-cart.liquid            ← Cart page (line items + order summary)
│   ├── product-recommendations.liquid
│   ├── cart-recommendations.liquid
│   ├── main-page.liquid            ← Static pages
│   ├── main-blog.liquid            ← Blog listing
│   ├── main-article.liquid         ← Single article
│   ├── main-search.liquid          ← Search results
│   ├── main-404.liquid             ← 404 page
│   └── main-password.liquid        ← Password gate
├── snippets/
│   └── product-card.liquid         ← Reusable product card (image swap, badges, swatches)
├── templates/
│   ├── index.json                  ← Homepage
│   ├── product.json                ← Product page
│   ├── collection.json             ← Collection page
│   ├── cart.json                   ← Cart page
│   ├── page.json                   ← Static pages
│   ├── blog.json                   ← Blog
│   ├── article.json                ← Article
│   ├── search.json                 ← Search
│   ├── 404.json                    ← Not found
│   └── password.json               ← Password
├── .gitignore
└── HANDOVER.md                     ← You are here
```

---

## 4. Pages Covered

| Page | Status | Key features |
|---|---|---|
| **Homepage** | Scaffolded | Slideshow hero, category tiles, featured collection, image-with-text split, USP bar |
| **Collection** | Scaffolded | Banner + breadcrumb, sort dropdown, 4-col product grid, pagination |
| **Product (PDP)** | Scaffolded | 2-col layout (gallery + sticky details), variant picker, quantity stepper, ATC, delivery info, accordions |
| **Cart** | Scaffolded | 2-col layout (line items + sticky summary), quantity controls, discount code, checkout CTA |
| **Blog/Article** | Scaffolded | Grid listing, single article with image |
| **Search** | Scaffolded | Search form + product grid results |
| **404/Password** | Scaffolded | Minimal |

---

## 5. What's Done

- ✅ Full directory structure matching Shopify requirements
- ✅ Design tokens (colours, spacing, typography, transitions) in CSS custom properties
- ✅ Base CSS reset + utility classes (`.container`, `.section-padding`, `.btn`, `.input`, `.visually-hidden`)
- ✅ All JSON templates wired to their sections
- ✅ Section schemas with merchant-editable settings and blocks
- ✅ Product card snippet with hover image swap, sale/new badges, colour swatches, price formatting
- ✅ AJAX cart helper functions in `global.js`
- ✅ Sticky header with scroll detection (IntersectionObserver)
- ✅ Responsive grid layouts for all pages
- ✅ Accessible markup (skip-to-content, aria labels, semantic HTML)

---

## 6. What's NOT Done (TODO)

### High Priority
- [ ] **Mobile navigation drawer** — slide-in menu from left, accordion sub-menus
- [ ] **Slideshow JS** — auto-play carousel with fade transitions
- [ ] **Variant picker JS** — update price, images, and availability on option change
- [ ] **Cart AJAX behaviour** — quantity update, remove item without page reload
- [ ] **Product image gallery JS** — thumbnail click to switch main image, mobile swipe carousel
- [ ] **Mega menu** — desktop hover dropdowns for navigation
- [ ] **Cart drawer** (optional) — slide-out mini cart instead of dedicated page

### Medium Priority
- [ ] **Colour swatches on PDP** — render actual colour circles (not just text buttons)
- [ ] **Size guide modal** — link next to size selector opens overlay
- [ ] **Quick Add on product cards** — hover button with size selector
- [ ] **Wishlist** — heart icon, localStorage for guests, metafields for logged-in
- [ ] **Announcement bar ticker** — scrolling/cycling multiple messages
- [ ] **Search overlay** — full-width search expansion from header icon
- [ ] **Filter drawer** — collection page filter panel (colour, size, price)

### Low Priority / Polish
- [ ] **Lightbox zoom** — product image fullscreen on click
- [ ] **Add-to-cart animation** — button state change ("Added ✓" for 1.5s)
- [ ] **Skeleton loaders** — for AJAX collection filtering
- [ ] **Newsletter integration** — Klaviyo or Shopify Email
- [ ] **Reviews section** — on PDP (Judge.me or similar)
- [ ] **Performance** — lazy loading audit, CLS prevention
- [ ] **Accessibility audit** — keyboard nav, screen reader testing

---

## 7. How to Run Locally

### Prerequisites
- Node.js (v18+)
- Shopify CLI (`npm install -g @shopify/cli`)
- Access to the Shopify store (see below)

### Start the dev server
```powershell
shopify theme dev --store YOUR-STORE.myshopify.com --path "path/to/moss-theme"
```

- First run will prompt for authentication (device-code flow — open the URL it prints and authorize)
- Once running, open `http://127.0.0.1:9292` in your browser
- Changes to files hot-reload automatically

### Useful URLs (once running)
- **Local preview:** http://127.0.0.1:9292
- **Product page:** http://127.0.0.1:9292/products/[handle]
- **Collection:** http://127.0.0.1:9292/collections/[handle]
- **Theme editor:** shown in terminal output (for visual configuration)

---

## 8. Shopify Store Setup

The theme needs a Shopify store with fashion products to preview against. The store should have:

- **Products** with Colour + Size variants and multiple images (3-5 per product)
- **Collections** — at minimum: "New In", "Suits", "Shirts", "Trousers"
- **Navigation** — a "Main menu" link list pointing to collections
- At least one product with a variant set to 0 inventory (to test sold-out UI)

The dev server creates an **ephemeral development theme** — it does NOT affect the live/published theme. Safe to experiment.

---

## 9. Design Reference

The full design specification is in `moss-shopify-design-spec.docx` (parent directory). Key sections:

- §2 — Design tokens (colours, typography, spacing, UI components)
- §3 — Global components (announcement bar, header, footer)
- §4 — Homepage sections
- §5 — Collection page
- §6 — Product detail page
- §7 — Cart page
- §9 — Responsive breakpoints
- §10 — Animations & interactions

---

## 10. Conventions & Guidelines

- **No frameworks** — vanilla CSS + JS only
- **No build step** — author directly in `assets/`
- **Mobile-first** — write base styles for mobile, add `@media (min-width: ...)` for larger screens
- **BEM-ish naming** — `.block__element--modifier` pattern for CSS classes
- **Scoped styles** — section-specific CSS goes in `<style>` tags within the section file OR in a dedicated `section-*.css` asset file
- **Semantic HTML** — use proper elements (`<nav>`, `<main>`, `<article>`, `<details>`)
- **Accessibility** — all interactive elements need focus states, aria labels, keyboard support
- **Theme editor friendly** — expose useful settings in section schemas so merchants can customize without code

---

## 11. Git Workflow

- `main` branch = stable, working theme
- Create feature branches for new work (e.g. `feature/mobile-nav`, `feature/variant-picker`)
- Keep commits focused — one feature/fix per commit
- Test locally with `shopify theme dev` before merging

---

## 12. Questions?

If anything's unclear, check:
1. The design spec (`moss-shopify-design-spec.docx`)
2. Shopify's theme docs: https://shopify.dev/docs/themes
3. The existing section files — they're well-commented

Good luck, and welcome to the project.
