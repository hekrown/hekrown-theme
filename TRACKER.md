# Moss Theme — Progress Tracker

> **Last Updated:** June 5, 2026
> **Theme Version:** 2.0.0
> **Shopify Theme ID:** #152965120172
> **Theme Check:** ✅ 0 errors | 5 warnings (all acceptable)

---

## Quick Status

```
██████████████████░░░░░ 85% Complete

Phases 1–10 DONE | Phases 11–13 remaining
```

| Phase | Name | Status | Date Completed |
|---|---|---|---|
| 1 | Foundation & Standards | ✅ Done | June 2, 2026 |
| 2 | Premium Features | ✅ Done | June 2, 2026 |
| 3–5 | (Legacy website phases — merged into 6+) | ✅ Superseded | — |
| 6 | Theme Blocks Foundation | ✅ Done | June 5, 2026 |
| 7 | Color Schemes & Global Settings | ✅ Done | June 5, 2026 |
| 8 | Core Section Expansion | ✅ Done | June 5, 2026 |
| 9 | PDP Block Refactor | ✅ Done | June 5, 2026 |
| 10 | App-Replacement Features | ✅ Done | June 5, 2026 |
| 11 | App Block Support | ⏳ Next | — |
| 12 | Presets, Demo Content & Polish | ⏳ Pending | — |
| 13 | Performance & Release | ⏳ Pending | — |

---

## Counts at a Glance

| Asset | Count | Target | Status |
|---|---|---|---|
| Sections (`.liquid`) | 41 | 40+ | ✅ Met |
| Theme blocks (`/blocks`) | 19 | 20+ | ⚠️ 1 short |
| Snippets | 9 | — | ✅ |
| Templates (JSON + Liquid) | 18 | — | ✅ |
| Customer templates | 7 | 7 | ✅ |
| CSS files | 7 | — | ✅ |
| JS files | 5 | — | ✅ |
| Theme settings groups | 9 | 8+ | ✅ |
| Color schemes | 3 | 3 | ✅ |
| App features built-in | 12 | 10+ | ✅ |
| Theme check errors | 0 | 0 | ✅ |

---

## App-Replacement Features

| Feature | Status | Replaces (monthly cost) |
|---|---|---|
| Wishlist (localStorage + drawer) | ✅ | $5–15/mo |
| Product compare (modal + bar) | ✅ | $5–10/mo |
| Quick view (AJAX modal) | ✅ | Included in bundles |
| Mega menu (hover dropdowns) | ✅ | $5–15/mo |
| Countdown timer (fixed + evergreen) | ✅ | $10/mo |
| Sticky ATC bar (mobile) | ✅ | $5/mo |
| Back-in-stock alerts (email capture) | ✅ | $10–20/mo |
| Free shipping progress bar | ✅ | $10/mo |
| Recently viewed products | ✅ | $5/mo |
| Predictive search (live results) | ✅ | $10–30/mo |
| Newsletter popup (cookie-gated) | ✅ | $15+/mo |
| Cart upsells (complementary products) | ✅ | $20–30/mo |
| **Estimated total savings** | | **$100–185+/mo** |

---

## Sections Inventory

### Header & Footer
| Section | Blocks? | Color scheme? |
|---|---|---|
| `announcement-bar.liquid` | ✅ message blocks | — |
| `header.liquid` | — | — |
| `footer.liquid` | ✅ link_list + text blocks | — |

### Homepage / Marketing
| Section | Blocks? | Color scheme? |
|---|---|---|
| `slideshow.liquid` | ✅ slide blocks | — |
| `collection-grid.liquid` | ✅ tile blocks | — |
| `featured-collection.liquid` | — | — |
| `image-with-text.liquid` | — | — |
| `usp-bar.liquid` | ✅ usp blocks | — |
| `rich-text.liquid` | ✅ @theme + @app | ✅ |
| `multicolumn.liquid` | ✅ @theme + @app | ✅ |
| `faq.liquid` | ✅ question blocks | ✅ |
| `testimonials.liquid` | ✅ testimonial blocks | ✅ |
| `countdown.liquid` | — | ✅ |
| `newsletter.liquid` | — | ✅ |
| `newsletter-popup.liquid` | — | — |
| `video-hero.liquid` | — | — |
| `logo-list.liquid` | ✅ logo blocks | ✅ |
| `featured-product.liquid` | — | ✅ |
| `contact-form.liquid` | ✅ info_row blocks | ✅ |
| `recently-viewed.liquid` | — | ✅ |

### Product
| Section | Blocks? | Color scheme? |
|---|---|---|
| `main-product.liquid` | — (legacy) | — |
| `main-product-split.liquid` | — (alt layout) | — |
| `main-product-blocks.liquid` | ✅ @theme + @app | ✅ |
| `product-recommendations.liquid` | — | — |

### Collection
| Section | Blocks? | Color scheme? |
|---|---|---|
| `collection-banner.liquid` | — | — |
| `main-collection.liquid` | — | — |
| `main-collection-sidebar.liquid` | — | — |

### Cart
| Section | Blocks? | Color scheme? |
|---|---|---|
| `main-cart.liquid` | — | — |
| `cart-recommendations.liquid` | — | — |

### Other Pages
| Section | Blocks? | Color scheme? |
|---|---|---|
| `main-page.liquid` | — | — |
| `main-blog.liquid` | — | — |
| `main-article.liquid` | — | — |
| `main-search.liquid` | — | — |
| `main-404.liquid` | — | — |
| `main-password.liquid` | — | — |

### From other contributors (pre-existing)
| Section | Notes |
|---|---|
| `brand-story.liquid` | Pre-existing, not refactored |
| `full-banner.liquid` | Pre-existing |
| `services-links.liquid` | Pre-existing |
| `split-panel.liquid` | Pre-existing |
| `sticky-hero.liquid` | Pre-existing |
| `store-finder.liquid` | Pre-existing |

---

## Theme Blocks Inventory (`/blocks`)

### Primitives (10)
| Block | Key settings |
|---|---|
| `text.liquid` | Rich text, size, alignment, max-width, color |
| `heading.liquid` | h1–h6, size, weight, transform, spacing, color |
| `button.liquid` | Label, link, style, size, alignment, full-width |
| `image.liquid` | Picker, aspect ratio, link, max-width, radius |
| `icon.liquid` | 9 presets + custom SVG, size, alignment, color |
| `spacer.liquid` | Height (4–120px) |
| `divider.liquid` | Style, thickness, width, alignment, color |
| `video.liquid` | YouTube/Vimeo/Shopify, autoplay, loop, max-width |
| `group.liquid` | Row/column, gap, alignment, padding, background, **nests @theme blocks** |
| `liquid.liquid` | Custom Liquid code |

### Commerce / PDP (9)
| Block | Key settings |
|---|---|
| `product-title.liquid` | Show vendor, font size |
| `product-price.liquid` | Font size, save badge, tax notice |
| `product-variant-picker.liquid` | Buttons vs dropdown, size guide link |
| `product-buy-buttons.liquid` | Quantity, dynamic checkout, button text |
| `product-rating.liquid` | Auto from metafields |
| `product-description.liquid` | Inline or accordion, open by default |
| `product-inventory.liquid` | Low stock threshold, show count |
| `collapsible-tab.liquid` | Heading, richtext or page, open by default |
| `share-buttons.liquid` | Toggle each platform |

---

## Theme Settings

| Group | Settings | Key capabilities |
|---|---|---|
| Brand | 3 | Logo, width, favicon |
| Color schemes | 18 | 3 schemes × 6 colors (bg, text, heading, btn, btn-text, accent) |
| Typography | 5 | Fonts, body scale, heading scale, transform |
| Layout | 3 | Page width, section spacing, grid gap |
| Buttons | 3 | Radius, border width, hover effect |
| Product cards | 6 | Image ratio, hover, badges, swatches, quick add, alignment |
| Animations | 2 | Scroll reveal toggle, speed |
| Cart | 4 | Type, shipping bar, threshold, order notes |
| Social media | 6 | Instagram, Facebook, Pinterest, TikTok, YouTube, X |
| **Total** | **50** | |

---

## What's Left

### Phase 11 — App Block Support
- [ ] Verify `@app` blocks render in `rich-text`, `multicolumn`, `main-product-blocks`
- [ ] Test with Judge.me app blocks
- [ ] Test with Klaviyo app blocks
- [ ] Add `@app` support to `main-cart.liquid`
- [ ] Document app block compatibility

### Phase 12 — Presets, Demo Content & Polish
- [ ] Multiple homepage presets (Minimal, Editorial, Bold)
- [ ] Default content/images for all sections (no blank installs)
- [ ] Loading skeleton states for AJAX content
- [ ] Empty cart / wishlist / search illustrations
- [ ] Refactor pre-existing sections (brand-story, full-banner, etc.) to use color schemes + @theme blocks
- [ ] Typography scale audit
- [ ] Focus state audit
- [ ] Print stylesheet

### Phase 13 — Performance & Release
- [ ] Lighthouse audit (target 90+ all metrics)
- [ ] CLS prevention (aspect-ratio on all images)
- [ ] Font preloading
- [ ] Lazy load section assets (CSS/JS loaded only when section used)
- [ ] `CHANGELOG.md`
- [ ] Merchant customization guide
- [ ] Metafields documentation
- [ ] Browser/device testing matrix
- [ ] Demo store with sample products
- [ ] Theme Store submission prep (if applicable)

---

## Deployment Info

| Environment | URL |
|---|---|
| **Theme Editor** | https://hekrown-fashion.myshopify.com/admin/themes/152965120172/editor |
| **Preview** | https://hekrown-fashion.myshopify.com?preview_theme_id=152965120172 |
| **Store Admin** | https://hekrown-fashion.myshopify.com/admin |

### Push command
```powershell
shopify theme push --store hekrown-fashion.myshopify.com --theme 152965120172 --path "e:\Hekrown\Templates\Moss"
```

### Dev server
```powershell
shopify theme dev --store hekrown-fashion.myshopify.com --path "e:\Hekrown\Templates\Moss"
```

---

## File Map

```
e:\Hekrown\Templates\Moss\
├── assets/           (7 CSS + 5 JS = 12 files + others)
├── blocks/           (19 theme blocks)
├── config/           (settings_schema + settings_data)
├── layout/           (theme.liquid + password.liquid)
├── locales/          (en.default.json)
├── sections/         (41 sections + 2 JSON groups)
├── snippets/         (9 snippets)
├── templates/        (14 JSON + 4 Liquid + 7 customer = 25 total)
├── DEVELOPMENT-STATUS.md
├── HANDOVER.md
├── PROPOSAL-Moss-Theme.md
├── README.md
├── THEME-PRODUCT-ROADMAP.md
└── TRACKER.md        ← you are here
```
