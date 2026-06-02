# Moss — Premium Shopify Theme

> A custom-built Shopify theme for fashion and apparel brands, inspired by premium menswear aesthetics. Built with vanilla HTML, CSS, and JavaScript — no build step required.

---

## ✨ Features

### Core Functionality
- **Fully responsive** — Mobile-first design optimized for all devices
- **Customer accounts** — Complete registration, login, order history, address management
- **AJAX cart** — Add to cart, update quantities, remove items without page reload
- **Cart drawer** — Slide-out mini cart (optional, can toggle to full cart page)
- **Product variants** — Dynamic price, image, and availability updates
- **Quick add** — Size picker on product cards for fast add-to-cart
- **Image gallery** — Thumbnail switching + lightbox zoom
- **Product recommendations** — "You May Also Like" powered by Shopify
- **Collection filtering** — Advanced filter drawer with sort options
- **Search** — Full-width search overlay with predictive results
- **Gift cards** — Beautiful gift card template with QR code

### Interactive Elements
- **Mobile navigation** — Slide-in drawer with focus trap
- **Mega menu** — Desktop hover dropdowns with keyboard support
- **Slideshow** — Auto-rotating hero with manual controls, touch swipe
- **Announcement bar** — Rotating messages with prev/next buttons
- **Size guide modal** — Popup size chart on product pages
- **Product accordions** — Expandable details, delivery info

### Design System
- **Design tokens** — All colors, spacing, typography in CSS custom properties
- **Monochromatic palette** — Black/white/grey with red accent
- **Square UI** — Zero border radius throughout
- **Minimal typography** — Helvetica Neue stack
- **Subtle transitions** — 0.2–0.4s ease, no bounce effects

### SEO & Performance
- **JSON-LD structured data** — Product, Organization, Breadcrumb schemas
- **Open Graph tags** — Optimized social sharing
- **Semantic HTML** — Proper heading hierarchy, landmarks
- **Accessibility** — WCAG AA compliant, keyboard navigation, ARIA labels
- **Fast loading** — No build step, minimal dependencies

---

## 📦 Installation

### Prerequisites
- Shopify store (any plan)
- Shopify CLI installed ([install guide](https://shopify.dev/docs/themes/tools/cli/install))

### Method 1: Development Mode (Recommended)
```bash
shopify theme dev --store your-store.myshopify.com --path "path/to/moss"
```
This creates a live preview at `http://127.0.0.1:9292` with hot reload.

### Method 2: Upload to Store
```bash
shopify theme push --store your-store.myshopify.com --path "path/to/moss" --unpublished
```
This uploads the theme to your store's theme library (unpublished).

---

## 🎨 Customization

### Theme Settings
Access via **Admin → Online Store → Themes → Customize**

- **Brand** — Upload logo, set logo width, add favicon
- **Colors** — Primary, secondary, accent, background, text
- **Typography** — Choose heading and body fonts
- **Cart** — Toggle between cart drawer and cart page
- **Social media** — Add Instagram, Facebook, Pinterest, TikTok, YouTube links

### Section Settings
Each section has customizable settings in the theme editor:

- **Slideshow** — Height, autoplay speed, slide content
- **Collection grid** — Number of columns, category tiles
- **Featured collection** — Choose collection, products to show
- **Image with text** — Upload image, set position, add text
- **USP bar** — Add trust icons (delivery, returns, etc.)
- **Announcement bar** — Multiple messages with rotation speed

---

## 📁 File Structure

```
moss-theme/
├── assets/
│   ├── base.css                    # Design tokens, reset, utilities
│   ├── component-header.css        # Header, nav, cart drawer
│   ├── component-footer.css        # Footer styles
│   ├── customer-account.css        # Account pages
│   ├── section-main-product.css    # PDP styles
│   ├── section-main-collection.css # Collection page
│   ├── global.js                   # Core interactivity
│   └── section-main-product.js     # Product page JS
├── config/
│   ├── settings_schema.json        # Theme settings
│   └── settings_data.json          # Current values
├── layout/
│   ├── theme.liquid                # Main layout wrapper
│   └── password.liquid             # Password page layout
├── locales/
│   └── en.default.json             # English translations
├── sections/                       # 22 sections
├── snippets/                       # Reusable components
├── templates/                      # 13 templates + customer templates
└── README.md                       # You are here
```

---

## 🚀 Pages & Templates

### Core Pages
- **Homepage** — Slideshow, collection grid, featured products, image-with-text
- **Product page** — Gallery, variant picker, ATC, accordions, size guide
- **Collection page** — Grid, filter drawer, sort, pagination
- **Cart page** — Line items, order summary, discount code
- **Search** — Results grid with product cards
- **Blog** — Post grid + article pages
- **Static pages** — About, Contact, etc.
- **404** — Custom error page

### Customer Account
- **Login** — Email/password with password recovery
- **Register** — Create new account
- **Account dashboard** — Order history, default address
- **Order detail** — Full order view with tracking
- **Addresses** — Add, edit, delete saved addresses
- **Activate account** — First-time setup
- **Reset password** — Password recovery flow

### Specialty
- **Gift cards** — Beautiful redemption page with QR code
- **Collections list** — Browse all collections
- **Password page** — Store password protection

---

## 🛠 Development

### Local Development
```bash
# Start dev server with hot reload
shopify theme dev --store your-store.myshopify.com

# Theme Check (linting)
shopify theme check

# Pull latest from store
shopify theme pull

# Push changes to store
shopify theme push
```

### Technology Stack
- **Liquid** — Shopify's templating language
- **Vanilla CSS** — No preprocessors, just custom properties
- **Vanilla JS** — No frameworks, no build step
- **Shopify Online Store 2.0** — JSON templates, section blocks

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari (iOS 13+)
- Chrome Mobile (latest)

---

## 📚 Documentation

### For Merchants
- [Theme Setup Checklist](./SETUP.md) _(coming soon)_
- [Customization Guide](./CUSTOMIZATION.md) _(coming soon)_
- [Metafields Guide](./METAFIELDS.md) _(coming soon)_

### For Developers
- [Development Status](./DEVELOPMENT-STATUS.md) — Current progress and roadmap
- [Handover Document](./HANDOVER.md) — Complete technical overview
- [Shopify Theme Docs](https://shopify.dev/docs/themes)

---

## 🐛 Known Issues

- ~~Cart drawer shows even when cart type is set to "page"~~ **Fixed in v1.1**
- USP bar needs better icon input method (currently raw HTML)
- Announcement bar needs better mobile responsiveness

See [DEVELOPMENT-STATUS.md](./DEVELOPMENT-STATUS.md) for full list.

---

## 📋 Changelog

### v1.1.0 (Phase 1 Complete) — June 2, 2026
- ✅ Added complete customer account system (8 templates)
- ✅ Added gift card template
- ✅ Added list-collections template
- ✅ Fully populated locales (en.default.json)
- ✅ Added JSON-LD structured data (Product, Organization, Breadcrumbs)
- ✅ Added Open Graph and Twitter Card meta tags
- ✅ Fixed cart type setting (drawer vs page now respected)
- ✅ Added customer account CSS module

### v1.0.0 (Initial Scaffolding) — May 30, 2026
- ✅ All core templates and sections
- ✅ Interactive features (mobile nav, cart drawer, filters)
- ✅ Product page with variants and gallery
- ✅ Collection page with filtering
- ✅ Design system with CSS custom properties

---

## 📞 Support

- **Issues** — [GitHub Issues](https://github.com/hekrown/moss-theme/issues)
- **Documentation** — [Shopify Theme Docs](https://shopify.dev/docs/themes)
- **Shopify Support** — [Help Center](https://help.shopify.com)

---

## 📄 License

© 2026 Hekrown. All rights reserved.

This theme is proprietary software. Unauthorized copying, distribution, or modification is prohibited.

---

## 🙏 Credits

Built by [Hekrown](https://hekrown.com) — Fashion-focused e-commerce solutions.

Design inspired by [Moss Bros](https://moss.co.uk).
