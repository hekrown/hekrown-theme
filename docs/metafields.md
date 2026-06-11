# Moss Theme — Metafields Reference

All metafields used by the theme. Create these in Shopify Admin under
**Settings → Custom data → Products** before they will appear on the storefront.

---

## Product Metafields

| Namespace | Key | Type | Where used |
|---|---|---|---|
| `custom` | `size_guide` | Rich text (`multi_line_text_field`) | Size Guide modal on PDP — overrides default table |
| `custom` | `details` | Rich text (`multi_line_text_field`) | "Product Details" accordion on PDP |
| `reviews` | `rating` | Rating (`rating`) | Star rating display — auto-populated by Judge.me or Shopify Reviews |
| `reviews` | `rating_count` | Integer (`number_integer`) | Review count in star rating — auto-populated |

---

## How to Create Metafields

1. Go to **Shopify Admin → Settings → Custom data**
2. Click **Products**
3. Click **Add definition**
4. Fill in namespace, key, type
5. Click **Save**

Once created, metafield values can be set per-product on the product edit page.

---

## Size Guide Example

For `custom.size_guide`, enter rich text like:

```
| Size | Chest | Waist | Hip |
|------|-------|-------|-----|
| XS   | 34–36 | 28–30 | 34–36 |
| S    | 36–38 | 30–32 | 36–38 |
| M    | 38–40 | 32–34 | 38–40 |
| L    | 40–42 | 34–36 | 40–42 |
| XL   | 42–44 | 36–38 | 42–44 |
```

If `custom.size_guide` is blank, the theme shows a default size table.
