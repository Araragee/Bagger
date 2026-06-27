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
| `/shop` | Collection — category filter (URL-synced) + sorting + loading skeletons |
| `/product/:slug` | Product detail — gallery, colour picker, stock states, accordions, related |
| `/checkout` | Checkout — validated form, promo codes, tax/shipping quote, payment sim |
| `/order/:id` | Order confirmation / receipt (persisted, re-openable) |
| `/account` | Sign in / register, then dashboard with order history + saved addresses |
| `/about` | Our Story — brand narrative, values, stats, CTA |
| `/pages/:slug` | Help & policy content (shipping, returns, care, faq, contact, privacy, terms) |
| `*` | 404 |

The cart is a slide-in drawer available from any page, with quantity controls
(clamped to stock) and a free-shipping progress meter.

## Architecture — the data layer

Everything that looks like a backend goes through one swappable seam:

- **`src/lib/db.ts`** — a tiny `localStorage`-backed persistence layer (users,
  sessions, orders) with simulated network latency.
- **`src/lib/api.ts`** — the typed service API (`products`, `auth`, `checkout`,
  `orders`). This is the *only* file you reimplement to go live against
  Supabase / Stripe / your own API — pages and stores never change.

Implemented end-to-end, all self-contained (no keys or external services):

- **Auth** — register / sign in / sign out, session persistence, account dashboard
- **Inventory** — per-variant stock, low-stock & sold-out states, add-to-cart clamping
- **Orders** — creation, order numbers, persistence, confirmation/receipt, order history
- **Checkout** — field validation, card formatting, promo codes, tax + shipping quote,
  simulated payment with a declined-card path
- **Guest checkout** preserved, with a prompt to sign in

## Demo notes

- **Accounts** are stored locally in your browser only — register any email.
- **Promo codes:** `WORNIN10` (10% off), `LEATHER20` (20% off), `FREESHIP` (free shipping).
- **Payment is simulated** — any card number succeeds; one **ending in `0002`** simulates a decline.
- No real payment is processed and nothing ships.

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
