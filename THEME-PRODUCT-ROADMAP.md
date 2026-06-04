# Moss → Commercial Theme Product Roadmap

> **Created:** June 4, 2026
> **Purpose:** Strategic plan to transform Moss from a single-store website into a fully customizable, commercially-sellable Shopify theme that competes with Horizon, Dawn, and premium paid themes — while building in features that merchants normally pay separate apps for.

---

## 1. The Mindset Shift

### What we built so far
A **website** — a theme configured for one fashion store (Hekrown). Sections have hardcoded assumptions, limited settings, and section-only blocks. It looks good for *this* store.

### What we need to build
A **product** — a theme that any merchant can install and bend to their brand without touching code. The merchant is now our user, not the shopper. Every design decision must become a setting. Every layout must become rearrangeable. Every piece of content must be merchant-editable.

### The three principles

| Principle | Means |
|---|---|
| **Everything is a setting** | No hardcoded colors, text, spacing, or layout choices. If a merchant might want it different, it's a setting. |
| **Everything is rearrangeable** | Merchants add/remove/reorder content via blocks — not by editing Liquid. |
| **Pay-once, not pay-monthly** | Build in features merchants normally rent from apps (wishlist ✅, reviews, FAQ, mega menu, countdowns, etc.). |

### Benchmark: Horizon
Shopify's Horizon theme (May 2025) ships **41 sections**, a full **theme blocks** architecture (reusable, nestable up to 8 levels), and AI-generated blocks. We currently have **24 sections, 0 theme blocks**. This roadmap closes that gap and adds app-replacement features as our differentiator.

---

## 2. The Critical Architecture Gap — Theme Blocks

This is the single most important change. Everything else builds on it.

### Current state
- All our blocks are **section-level** — defined inside one section's `{% schema %}`, usable only in that section.
- No `/blocks` folder exists.
- No section accepts `{"type": "@theme"}` or `{"type": "@app"}`.

### Target state
- A `/blocks` directory of **theme blocks** — standalone `.liquid` files reusable across *any* section.
- Sections declare `{"type": "@theme"}` in their block list to accept any theme block.
- Theme blocks **nest** (up to 8 levels) — e.g. a `group` block containing `text`, `button`, and `image` blocks.
- Sections declare `{"type": "@app"}` so merchants can drop in app blocks (reviews, upsells, etc.).

### Why it matters
Without theme blocks, every section needs its own copy of "text", "button", "image", "heading" block definitions. With them, we define each once and reuse everywhere. This is exactly how Horizon achieves its flexibility. **This unlocks true customization.**

### Migration approach
1. Create `/blocks` folder.
2. Build the foundational block library (§4).
3. Refactor existing sections to accept `@theme` blocks where it makes sense.
4. Keep section-specific blocks only where a block genuinely doesn't make sense elsewhere.

---

## 3. New Sections to Build

Goal: reach **40+ sections** with deep settings. Grouped by purpose.

### 3.1 Content & Storytelling
- [ ] **Rich text** — heading + body + buttons, width/alignment controls *(foundational, used everywhere)*
- [ ] **Multicolumn** — N columns of icon/image + text + link (services, features, benefits)
- [ ] **Image with text overlay** — text on top of full-bleed image
- [ ] **Collage / Bento grid** — mixed-size tiles (products, collections, images, video)
- [ ] **Scrolling marquee** — infinite text/logo ticker
- [ ] **Logo list** — "as seen in" / brand partners, grayscale hover
- [ ] **Timeline** — brand history / process steps
- [ ] **Split editorial** — alternating image/text rows (full storytelling page)

### 3.2 Product Merchandising
- [ ] **Featured product** — single product spotlight with full buy form on any page
- [ ] **Product tabs** — multiple collections in tabbed UI
- [ ] **Complete the look / Shop the look** — hotspot image with product pins
- [ ] **Collection list carousel** — horizontally scrollable collection tiles
- [ ] **Recently viewed products** — localStorage-driven
- [ ] **Trending / Bestsellers** — sorted by metafield or sales
- [ ] **Product comparison section** — embedded compare table

### 3.3 Social Proof & Trust
- [ ] **Testimonials** — slider + grid layouts, star ratings, avatars
- [ ] **Reviews showcase** — pull from metafields / review app blocks
- [ ] **Instagram / UGC gallery** — grid of social images with product tags
- [ ] **Trust badges bar** — payment, security, guarantee icons
- [ ] **Stats / counters** — animated number counters (customers, orders, years)

### 3.4 Conversion & Marketing
- [ ] **Countdown timer** — sale/launch urgency, evergreen or fixed date
- [ ] **Newsletter / email capture** — inline + with image
- [ ] **Promo banner** — dismissible, scheduled
- [ ] **FAQ accordion** — schema.org FAQ markup for SEO
- [ ] **Contact form** — with map embed, configurable fields
- [ ] **Store locator** — multi-location with map

### 3.5 Media
- [ ] **Video hero** — HTML5/YouTube/Vimeo background with image fallback
- [ ] **Video with text** — embedded video + copy
- [ ] **Before / After slider** — draggable image comparison
- [ ] **Lookbook** — full-screen scrolling image story
- [ ] **Gallery / Masonry** — image grid with lightbox

### 3.6 Blog & Editorial
- [ ] **Featured blog posts** — curated/recent posts on any page
- [ ] **Blog post carousel** — horizontal scroll

---

## 4. Theme Blocks Library (the `/blocks` folder)

These become the reusable building blocks merchants drag into any `@theme`-enabled section. This is what makes the theme feel limitless.

### 4.1 Primitive Blocks (atoms)
- [ ] `text` — rich text, size/color/alignment/width settings
- [ ] `heading` — h1–h6 selectable, size scale, color
- [ ] `button` — label, link, style (primary/secondary/link), size
- [ ] `image` — with aspect ratio, focal point, link, overlay
- [ ] `icon` — preset icon library picker + custom SVG
- [ ] `spacer` — adjustable vertical space
- [ ] `divider` — line style, thickness, color
- [ ] `video` — file/YouTube/Vimeo with autoplay/loop/mute controls
- [ ] `liquid` — custom Liquid escape hatch for power users

### 4.2 Composite Blocks (molecules)
- [ ] `group` — container holding nested blocks (the key to layout flexibility), with layout direction, gap, padding, background
- [ ] `card` — image + heading + text + button bundle
- [ ] `icon-with-text` — icon + heading + body
- [ ] `accordion-row` — single collapsible row (used in FAQ section)
- [ ] `testimonial` — quote + author + avatar + rating
- [ ] `slide` — used in slideshow/carousel sections

### 4.3 Commerce Blocks (product-context)
- [ ] `product-title`
- [ ] `product-price` (with compare-at, unit price, sale badge)
- [ ] `product-variant-picker` (swatches / dropdowns / buttons)
- [ ] `product-buy-buttons` (ATC + dynamic checkout)
- [ ] `product-quantity`
- [ ] `product-description`
- [ ] `product-rating` (from metafields)
- [ ] `product-inventory` (low-stock urgency)
- [ ] `product-metafield` (display any metafield)
- [ ] `product-badges`
- [ ] `collapsible-tab` (product accordions as blocks)
- [ ] `share-buttons`
- [ ] `payment-icons`

> **Goal:** Refactor `main-product.liquid` so the entire PDP is composed of theme blocks the merchant can reorder — exactly like Horizon's "Product information" section. This is the gold standard for customization.

---

## 5. App-Replacement Features (our differentiator)

Build natively what merchants normally pay monthly for. Each one is a selling point.

| Feature | Replaces apps like | Status | Build approach |
|---|---|---|---|
| **Wishlist** | Wishlist King, Smart Wishlist (~$5–15/mo) | ✅ Done | localStorage + drawer (done); add page + metafield sync |
| **Product compare** | Compare apps (~$5–10/mo) | ✅ Done | localStorage + modal (done) |
| **Quick view** | Quick View apps | ✅ Done | Done |
| **Back-in-stock** | Back in Stock, Restock Rocket (~$10–20/mo) | ⚠️ Partial | Email capture done; add Shopify Email/Klaviyo hook |
| **Mega menu** | Mega Menu apps (~$5–15/mo) | ⚠️ Basic | Upgrade to image/promo mega menu with blocks |
| **Product reviews** | Judge.me, Loox (~$15–40/mo) | ❌ | Metafield-based reviews + `@app` block support |
| **FAQ / accordions** | FAQ apps (~$5/mo) | ❌ | FAQ section with schema markup |
| **Size charts** | Kiwi Size Chart (~$7/mo) | ⚠️ Basic | Metafield-driven, per-product/collection charts |
| **Countdown timers** | Hextom, Essential (~$10/mo) | ❌ | Countdown section + block |
| **Sticky add-to-cart** | Sticky ATC apps (~$5/mo) | ✅ Done | Done (mobile); add desktop variant |
| **Recently viewed** | Recently Viewed apps | ❌ | localStorage section |
| **Upsell / cross-sell** | ReConvert, Bold (~$20–30/mo) | ❌ | Cart drawer recommendations + complementary products |
| **Free shipping bar** | Hextom Free Shipping Bar (~$10/mo) | ❌ | Cart progress bar block |
| **Trust badges** | Trust badge apps | ⚠️ Basic | Configurable badge block |
| **Announcement / promo** | Announcement apps | ✅ Basic | Add scheduling + dismissible |
| **Image hotspots / shop-the-look** | Shoppable image apps (~$10–20/mo) | ❌ | Hotspot section with product pins |
| **Color swatches** | Swatch apps (~$5–10/mo) | ⚠️ Text only | Image/color swatch on cards + PDP |
| **Newsletter popup** | Privy, Justuno (~$15+/mo) | ❌ | Popup with cookie delay + targeting |
| **Cart upsells / gift wrap / notes** | Cart apps | ❌ | Enhanced cart drawer blocks |
| **Currency / language switcher** | Geolocation apps | ❌ | Shopify Markets native |
| **Predictive search** | Search apps (~$10–30/mo) | ⚠️ Basic | Add predictive results dropdown |

> **Estimated value:** A merchant assembling these via apps spends **$120–250+/month**. Building them in is our headline sales argument.

---

## 6. Customization Depth (Settings & Presets)

### 6.1 Global theme settings to add
- [ ] **Layout** — page width, section spacing scale, grid gutter
- [ ] **Typography** — font pairings, base size, scale ratio, heading transform, letter spacing
- [ ] **Color schemes** — multiple named schemes (not just single colors) that sections can reference, like Horizon/Dawn
- [ ] **Buttons** — radius, border, hover style, size
- [ ] **Inputs / forms** — radius, border style
- [ ] **Product cards** — image ratio, hover effect (swap/zoom/none), badge style, quick-add style, text alignment
- [ ] **Animations** — scroll-reveal on/off, speed, style
- [ ] **Cart** — type (drawer/page/popup), free-shipping bar, notes, gift wrap
- [ ] **Badges** — sale/sold-out/custom label styling
- [ ] **Social media** — already done ✅

### 6.2 Color schemes system (high priority)
Move from 5 flat color settings to **named color schemes** (e.g. "Scheme 1: light", "Scheme 2: dark", "Scheme 3: accent"). Each section gets a "Color scheme" dropdown. This is the modern standard (Dawn/Horizon) and dramatically increases design flexibility.

### 6.3 Section-level settings every section needs
- [ ] Color scheme selector
- [ ] Top/bottom padding sliders
- [ ] Full-width vs contained toggle
- [ ] Heading size override
- [ ] Mobile-specific layout options

### 6.4 Preset styles / starter templates
- [ ] Ship **multiple homepage presets** (Minimal, Editorial, Bold) via `settings_data.json` presets
- [ ] Per-section presets in schema so merchants get good defaults
- [ ] Demo content for every section so fresh installs look complete

---

## 7. Execution Plan (Phased)

### Phase 6 — Theme Blocks Foundation ✅ DONE
1. ~~Create `/blocks` folder~~
2. ~~Build primitive blocks (text, heading, button, image, icon, spacer, divider, video, group)~~
3. ~~Convert one section (Rich text + Multicolumn) to `@theme` blocks~~
4. ~~Document the block authoring pattern~~

### Phase 7 — Color Schemes & Global Settings ✅ DONE
1. ~~Implement named color scheme system (3 schemes × 6 colors)~~
2. ~~Refactor CSS to consume scheme variables via theme.liquid~~
3. ~~Add color-scheme selector to all new sections~~
4. ~~Expand typography, button, card, animation, layout, cart global settings (50 settings total)~~

### Phase 8 — Core Section Expansion ✅ DONE
1. ~~Built 8 new sections: FAQ, Testimonials, Countdown, Newsletter, Video Hero, Logo List, Featured Product, Contact Form~~
2. ~~All with `@theme` blocks + full settings + presets~~
3. ~~Total sections now: 41 (matches Horizon)~~

### Phase 9 — PDP Block Refactor ✅ DONE
1. ~~Rebuilt PDP as block-composed section (`main-product-blocks.liquid`)~~
2. ~~Built 9 commerce blocks (title, price, variants, buy buttons, rating, description, inventory, collapsible tab, share buttons)~~
3. ~~Merchant reorders everything via editor — no code~~

### Phase 10 — App-Replacement Features ✅ DONE
1. ~~Free shipping progress bar~~
2. ~~Recently viewed products~~
3. ~~Predictive search (live results from Shopify Suggest API)~~
4. ~~Newsletter popup (cookie-gated, configurable delay/frequency)~~
5. ~~Cart upsells (complementary products via Recommendations API)~~
6. ~~12 app-replacement features total~~

### Phase 11 — App Block Support ⏳ NEXT
1. Verify `@app` blocks render in key sections
2. Test with Judge.me, Klaviyo app blocks
3. Add `@app` to cart section

### Phase 12 — Presets, Demo Content & Polish ⏳ PENDING
1. Multiple homepage presets
2. Demo content for all sections
3. Loading/empty states
4. Refactor pre-existing contributor sections
5. Animation system

### Phase 13 — Performance & Release ⏳ PENDING
1. Lighthouse 90+
2. Lazy loading, CLS audit
3. Full documentation, demo store
4. Theme Store submission prep

---

## 8. Success Criteria

The theme is "product-ready" when:

- [ ] **40+ sections**, each with color scheme + spacing + layout settings
- [ ] **20+ theme blocks** reusable across sections, with nesting
- [ ] **PDP fully block-composed** — merchant reorders everything without code
- [ ] **Named color schemes** instead of flat colors
- [ ] **10+ app-replacement features** built in
- [ ] **`@app` block support** on key sections
- [ ] **Multiple homepage presets** + demo content
- [ ] **Fresh install looks complete** with no configuration
- [ ] **Theme Check passes** (0 errors)
- [ ] **Lighthouse 90+** on all metrics
- [ ] **Documentation** for merchants and developers

---

## 9. Competitive Positioning

| | Dawn (free) | Horizon (free) | Premium ($300–400) | **Moss (target)** |
|---|---|---|---|---|
| Sections | ~25 | 41 | 30–40 | **40+** |
| Theme blocks | Basic | Full + AI | Varies | **Full + nesting** |
| Color schemes | ✅ | ✅ | ✅ | **✅** |
| Wishlist | ❌ | ❌ | Some | **✅ built-in** |
| Compare | ❌ | ❌ | Some | **✅ built-in** |
| Quick view | ❌ | ❌ | Some | **✅ built-in** |
| Reviews | ❌ | ❌ | Rare | **✅ built-in** |
| Shop the look | ❌ | ❌ | Some | **✅ built-in** |
| Mega menu | Basic | ✅ | ✅ | **✅ rich** |
| App savings | — | — | — | **$120–250/mo** |

**Positioning statement:** *"A premium fashion theme with the customization depth of Horizon and the built-in features of $200/month in apps — for a one-time price."*

---

## 10. Risks & Considerations

- **Scope** — this is a large undertaking (8 phases). Prioritize theme blocks + color schemes first; they unblock and uplift everything else.
- **Performance** — more features = more JS/CSS. Must lazy-load section assets and keep the block system lean. Budget Lighthouse checks per phase.
- **Backwards compatibility** — refactoring sections to blocks changes `settings_data.json` structure. Do it before any real store data exists, or provide migration.
- **Theme Store rules** — if targeting the Shopify Theme Store, review their requirements early (performance, accessibility, no external scripts, specific settings conventions). Some "app-replacement" features may have Theme Store restrictions; private/marketplace sale has fewer limits.
- **Maintenance** — more surface area to support. Document the block authoring pattern well (Phase 6 step 4).

---

## 11. Immediate Next Steps

1. **Approve this roadmap** and confirm target (Theme Store vs marketplace like ThemeForest vs private licensing — affects rules).
2. **Start Phase 6** — create `/blocks`, build primitive blocks, convert one section as proof of concept.
3. **Decide color scheme count** — how many named schemes to ship (Dawn ships ~5).
4. **Lock the block naming convention** before building 20+ of them.

---

_This document supersedes the website-focused scope. See `DEVELOPMENT-STATUS.md` for what's already built (Phases 1–2) and `HANDOVER.md` for architecture._
