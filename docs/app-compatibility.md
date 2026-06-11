# Moss Theme — App Compatibility Notes

## Verified Compatible Apps

### Judge.me Product Reviews ✅
- Star ratings auto-populate `product.metafields.reviews.rating.value`
- Rating displays in `blocks/product-rating.liquid`
- App blocks render in `main-product.liquid` via `{ "type": "@app" }`
- **Setup:** Install Judge.me → ratings appear automatically on product pages

### Shopify Search & Discovery ✅
- Powers the filter drawer on collection pages
- Enables colour, size, price, and availability filters
- **Setup:** Install from Shopify App Store (free) → configure filters per collection

### Klaviyo ✅
- Newsletter form in footer submits to Shopify customer list
- Klaviyo can sync Shopify customers and trigger flows
- App blocks supported in sections with `{ "type": "@app" }`
- **Setup:** Install Klaviyo → connect Shopify integration → map newsletter form

### Shop Pay / Shopify Payments ✅
- Dynamic checkout button in `blocks/product-buy-buttons.liquid`
- Renders via `{{ form | payment_button }}`
- **Setup:** Enable Shopify Payments in admin → button appears automatically

---

## App Block Support

These sections accept `@app` blocks from any compatible Shopify app:

| Section | Supports @app |
|---|---|
| `main-product.liquid` | ✅ |
| `main-cart.liquid` | ✅ |
| `featured-collection.liquid` | ✅ |
| `main-collection.liquid` | ✅ |
| `_blocks.liquid` | ✅ |

---

## Known Limitations

| App | Status | Notes |
|---|---|---|
| ReCharge Subscriptions | ⚠️ Untested | Should work via @app blocks — needs verification |
| Yotpo Reviews | ⚠️ Untested | Rating metafields compatible — widget needs @app block |
| Loox | ⚠️ Untested | Should work via @app blocks |
| Bold Upsell | ⚠️ Untested | Cart drawer may need custom integration |

---

## Reporting Issues

If an app doesn't work as expected, open an issue:
[github.com/hekrown/hekrown-theme/issues](https://github.com/hekrown/hekrown-theme/issues)
