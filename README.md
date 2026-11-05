# LYZOO — Premium E-commerce Website Demo

**Tagline:** *YOUR STYLE. YOUR WORLD.*  
**Positioning:** Premium Multi-Category Online Shopping Destination.

---

## 🌟 Live Demo Overview

LYZOO is a complete, visually stunning, fully responsive frontend e-commerce demonstration designed for client presentations. It features an editorial luxury minimalist aesthetic, realistic Pakistani Rupee (PKR) pricing, a slide-over cart drawer, instant search, product quick-view modal, wishlist, and an interactive demo checkout flow with order tracking.

The application is running live at:
**[http://localhost:3000](http://localhost:3000)**

---

## 🎨 Brand Design System

| Element | Specification | Hex / Font |
|---|---|---|
| **Primary** | Warm Ivory | `#F8F6F2` |
| **Secondary** | Soft Beige | `#EAE3D9` |
| **Text** | Deep Charcoal | `#242424` |
| **Accent** | Muted Rose | `#C89F9A` |
| **White** | Pure White | `#FFFFFF` |
| **Serif Headings** | Cormorant Garamond | Editorial Luxury Serif |
| **Sans Body** | Plus Jakarta Sans | Clean Modern Geometry |

---

## 🛍️ Curated Categories & Products

Over 26 realistic luxury products spanning 10 signature departments:
1. **Women's Clothing** — Bias-cut 22mm Mulberry silk dresses, tailored virgin wool blazers, pleated co-ords.
2. **Makeup** — Velvet matte lipsticks with camellia oil, light-refracting skin glow foundations, baked mineral illuminators.
3. **Skincare** — Triple peptide botanical Bakuchiol serums, Rosa Damascena barrier creams, enzyme melt cleansing balms.
4. **Jewellery** — Grade AAA natural baroque pearl necklaces, twisted 18K gold vermeil hoops, baguette emerald bands.
5. **Ornaments** — Hand-fluted brutalist sandstone ceramic vases, travertine catchall trays with brass inlays.
6. **Handbags** — Structured pebbled Italian calfskin satchels, cloud nappa leather clutches, hand-woven totes.
7. **Watches** — Swiss Ronda quartz movements, sapphire crystals, Milanese mesh rose gold timepieces.
8. **Sunglasses** — Mazzucchelli Italian bio-acetate beveled cat-eye frames, lightweight titanium aviators.
9. **Fashion Accessories** — Lake Como hand-rolled 90cm silk twill scarves, reversible French boxcalf leather belts.
10. **Lifestyle Products** — Hand-poured coconut-soy santal candles, stonewashed Belgian linen throws, ultrasonic brass aroma diffusers.

---

## ⚡ Key Interactive Features

- **Rotating Announcement Bar:** Highlights complimentary shipping thresholds and live seasonal promotions.
- **Header & Mega Navigation:** Sticky blur backdrop, search modal trigger (`⌘K`), VIP membership modal, live wishlist badge, and live bag badge.
- **Hero Editorial Slider:** High-resolution lifestyle visuals with smooth cross-fade transitions and quick-action CTAs.
- **Instant Search Modal (`⌘K` / `Ctrl+K`):** Real-time keystroke matching across titles, categories, materials, and tags with quick-add capabilities.
- **Product Quick-View Modal:** Full gallery zoom, color swatch selection, size picker, and instant bag additions.
- **Interactive Bag Drawer & Cart Page:**
  - Real-time quantity adjustments and item removals.
  - Dynamic **Free Shipping Progress Bar** (Qualifies on orders over Rs. 5,000).
  - Working demo voucher system:
    - `LYZOO10` — 10% VIP Courtesy Discount.
    - `FIRST15` — 15% First Order Welcome Voucher.
  - Persisted in browser `localStorage`.
- **Wishlist:** Dedicated `/wishlist` interface with single-click "Move to Bag" or "Add All to Bag".
- **Demo Checkout & Order Confirmation:**
  - Pre-filled with realistic Pakistani shipping details (Karachi, Lahore, Islamabad, etc.).
  - Demo payment options: Cash on Delivery (COD), Card Prototype, and Direct Bank Transfer.
  - Triggers **celebration confetti**, generates a unique order reference (`LYZ-XXXXXX`), and renders an order tracking timeline and printable receipt.

---

## 🚀 Technical Architecture

Built with modern industry-standard frontend architecture:
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **State & Persistence:** React Context API + LocalStorage

```
lyzoo-ecommerce/
├── app/
│   ├── layout.tsx                # Universal root layout
│   ├── page.tsx                  # Luxury editorial homepage
│   ├── globals.css               # Design system & custom scrollbar
│   ├── shop/                     # Full catalog with sorting & filtering
│   ├── category/[slug]/          # 10 dedicated department listing pages
│   ├── product/[id]/             # Product details & specifications page
│   ├── cart/                     # Full shopping bag page
│   ├── checkout/                 # Demo checkout & order confirmation
│   ├── wishlist/                 # Saved creations page
│   ├── about/                    # Atelier manifesto & heritage
│   └── contact/                  # Client concierge & appointment desk
├── components/
│   ├── layout/                   # Header, AnnouncementBar, MobileMenu, SearchModal, Footer
│   ├── ui/                       # ProductCard, QuickViewModal, CartDrawer, Badge, Breadcrumb
│   └── home/                     # Hero, CategoryGrid, NewArrivals, BestSellers, Beauty, Jewellery, etc.
├── context/                      # CartContext, WishlistContext, QuickViewContext
├── data/                         # Products, categories, and testimonials datasets
├── lib/                          # PKR currency formatting & helper utilities
└── types/                        # Full TypeScript interfaces
```

