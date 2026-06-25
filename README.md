# Bagger

A demo storefront for **Bagger** — a fictional small-workshop leather-goods
brand ("built to be worn in, not worn out"). Built to be **demo-ready**:
distinctive editorial design, a full browse → product → cart → checkout flow,
and fully mobile-responsive.

> This is a front-end demo. Product data is mocked, payments are simulated, and
> there is no backend yet. See [`TODO.md`](./TODO.md) for the full audit of
> what's built vs. what's missing and the roadmap to a production store.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** for styling (custom warm "leather-shop" design system)
- **React Router** for client-side routing
- **Zustand** for cart state (persisted to `localStorage`)
- Zero external image dependencies — product imagery is **generative inline
  SVG**, so the demo runs anywhere with no asset hosting.

## Design

Deliberately *not* the generic white-grid Shopify template:

- **Palette** — warm bone/cream backgrounds, ink near-black, a clay/burnt-orange
  accent, olive + tan supporting tones.
- **Type** — `Fraunces` (characterful display serif) paired with `Space Grotesk`.
- Paper-grain texture overlay, marquee ticker, scroll-reveal animations,
  hover-swap product cards, free-shipping progress bar, and custom generative
  product artwork that varies silhouette per category.
- `prefers-reduced-motion` respected; animations degrade gracefully.

## Pages / flow

| Route | Page |
|-------|------|
| `/` | Home — hero, category strip, featured grid, brand editorial, full-shop teaser |
| `/shop` | Collection — category filter (URL-synced) + sorting |
| `/product/:slug` | Product detail — gallery, colour picker, accordions, related products |
| `/checkout` | Checkout — contact/shipping/payment form + order summary + confirmation |
| `/about` | Our Story — brand narrative, values, stats, CTA |
| `*` | 404 |

The cart is a slide-in drawer available from any page, with quantity controls
and a free-shipping progress meter.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Deploy

Static SPA — deploy `dist/` anywhere. SPA fallback rewrites are included for
**Vercel** (`vercel.json`) and **Netlify** (`public/_redirects`).

## Project structure

```
src/
  components/   Header, Footer, CartDrawer, ProductCard, ProductArt, Marquee, Reveal, Icons …
  pages/        Home, Shop, Product, Checkout, About, NotFound
  store/        cart.ts (Zustand + persist)
  data/         products.ts (mock catalogue)
```
