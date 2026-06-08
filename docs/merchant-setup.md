# Moss Theme — Merchant Setup Guide

## Getting Started

### 1. Upload & Publish

1. In Shopify Admin → **Online Store → Themes**
2. Click **Add theme → Upload zip file**
3. Upload `moss-theme.zip`
4. Click **Customize** to configure before publishing
5. When ready, click **Publish**

---

### 2. Initial Configuration

Open the **Theme Editor** (Customize button) and configure:

#### Brand
- Upload your **Logo** (SVG or PNG, transparent background, min 240px wide)
- Set **Logo width** (recommended: 100–140px)
- Upload a **Favicon** (32×32px PNG)

#### Typography
- **Heading font** — choose from Shopify's font library (Playfair Display, Oswald, or Assistant recommended)
- **Body font** — Assistant or Helvetica Neue for a clean look

#### Color Schemes
Three schemes are pre-configured. Customize them under **Theme settings → Color schemes**:
- **Scheme 1 (Light)** — main page background
- **Scheme 2 (Dark)** — footer, dark sections
- **Scheme 3 (Neutral)** — off-white sections, testimonials

#### Cart
- Set **Cart type** to "Drawer" (recommended) or "Page"
- Set **Free shipping threshold** (e.g. `200` for £200)

---

### 3. Navigation Setup

Go to **Online Store → Navigation** and create:

| Menu | Handle | Used in |
|---|---|---|
| Main menu | `main-menu` | Header navigation |
| Footer — Help | `footer-help` | Footer column |
| Footer — Account | `footer-account` | Footer column |
| Footer — Services | `footer-services` | Footer column |

---

### 4. Homepage Sections

In the Theme Editor, configure each section:

**Sticky Hero / Slideshow**
- Upload a full-width lifestyle image (min 1920×1080px)
- Add category links: New In, Suits, Shirts, Linen Wear, Essentials

**Featured Collections**
- Select a collection for each shelf (New Arrivals, Shirts, etc.)
- Set products to show: 4–8

**Image with Text**
- Upload a portrait brand/lifestyle image
- Write your brand story (2–3 sentences)

---

### 5. Recommended Apps

| App | Purpose | Free? |
|---|---|---|
| **Shopify Search & Discovery** | Collection filters (colour, size, price) | ✅ Free |
| **Judge.me Product Reviews** | Star ratings on product pages | ✅ Free tier |
| **Klaviyo** | Email marketing, newsletter popups | ✅ Free tier |
| **Shop Pay / Shopify Payments** | Dynamic checkout buttons | Included |

---

### 6. Product Setup

For best results, each product should have:
- **3–5 images** (front, back, detail, lifestyle, alternate)
- **Colour** and **Size** variant options (exact capitalisation matters)
- A product description (shows in the Description accordion)
- Tags: add `new` to show the NEW badge on cards

#### Metafields (optional but recommended)
| Metafield | Namespace | Key | Type | Used for |
|---|---|---|---|---|
| Size guide | `custom` | `size_guide` | Rich text | Per-product size table |
| Product details | `custom` | `details` | Rich text | Details accordion |
| Rating | `reviews` | `rating` | Rating | Star display (Judge.me auto-fills) |

---

### 7. Collections Setup

Create at minimum:
- `new-arrivals` — New In collection
- `shirts` — Shirts
- `linen-wear` — Linen Wear
- `essentials` — Essentials

Add a collection image to each (used in category tiles).

---

### 8. Support

For theme issues: [github.com/hekrown/hekrown-theme/issues](https://github.com/hekrown/hekrown-theme/issues)
