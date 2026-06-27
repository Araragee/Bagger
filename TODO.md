# Bagger — Feature Audit & Roadmap

Status of the demo as of this build, and a detailed, actionable backlog for
turning it into a production storefront. Checked items (`[x]`) ship in the
current demo; unchecked items are the work remaining.

Legend: **P0** = needed for a believable live store · **P1** = expected of a
real e-commerce site · **P2** = nice-to-have / growth.

---

## ✅ Done in this demo

**Storefront & design**
- [x] Project scaffold — Vite + React + TS + Tailwind, typed build passing
- [x] Distinctive design system (palette, type, grain, motion) — not a generic template
- [x] Responsive layout across mobile / tablet / desktop
- [x] Home page (hero, category strip, featured grid, brand editorial, shop teaser)
- [x] Shop/collection page with category filter (URL-synced) + sorting + loading skeletons
- [x] Product detail page (gallery, colour picker, accordions, related products)
- [x] Cart drawer with quantity controls, persistence, free-shipping meter
- [x] About / brand story page · 404 page · marquee bar
- [x] Generative SVG product artwork (no external image hosting needed)
- [x] SPA deploy config (Vercel + Netlify rewrites)

**P0 behaviours (self-contained architecture — see `src/lib/api.ts`)**
- [x] **Swappable data/service layer** (`lib/db.ts` + `lib/api.ts`) — one seam to
      replace with Supabase/Stripe; async API with simulated latency + loading states
- [x] **Inventory & stock states** — per-variant stock, low-stock / sold-out UI,
      add-to-cart clamped to stock, sold-out colourways disabled
- [x] **Authentication** — register / sign in / sign out, session persistence
- [x] **Account dashboard** — order history + saved addresses
- [x] **Guest checkout** preserved, with prompt to sign in
- [x] **Order creation & persistence** — order numbers, retrievable order pages
- [x] **Checkout validation** — field-level errors, card/expiry/CVC formatting
- [x] **Simulated payment** — success + declined-card path (ends in 0002)
- [x] **Promo codes, tax & shipping quote** — WORNIN10 / LEATHER20 / FREESHIP, 8.25% tax
- [x] **Order confirmation page** with full receipt + delivery estimate
- [x] Toast notifications, content/help pages (Shipping, Returns, Care, FAQ,
      Contact, Privacy, Terms) wired into the footer, per-route document titles

---

## 🔴 P0 — Remaining: swap the local layer for real services

> The full P0 *behaviour* now ships, backed by a local persistence layer
> (`src/lib/api.ts`). What remains is replacing that single seam with real
> cloud services — the calling code (stores, pages) won't change.

### Backend & data
- [ ] **Move the catalogue + inventory behind a real API** (Supabase/Postgres, or
      a headless backend like Medusa/Shopify Storefront API). Reimplement
      `api.products.*` and the `INVENTORY` map against it.
- [ ] **Real product photography / media.** The generative SVG is a placeholder;
      swap for a CDN-backed image gallery (multiple angles, zoom, lifestyle shots).
- [ ] **Server-side cart / session.** Cart lives in `localStorage`; persist it
      server-side so it survives devices and feeds analytics.

### Payments & checkout
- [ ] **Real payment processing** — replace the simulated authorisation in
      `api.orders.create` with Stripe (Payment Elements) / PayPal / Apple Pay.
- [ ] **Real tax & shipping** — swap the flat 8.25% / $12 rules for Stripe Tax /
      TaxJar and live carrier rates + address validation.
- [ ] **Transactional email** — order confirmation, shipping notification,
      receipts (Resend/Postmark/SendGrid). Currently only the on-screen receipt.
- [ ] **Order idempotency / webhooks** once a real PSP is wired in.

### Accounts
- [ ] **Real auth** — replace the local user registry with Supabase Auth / Clerk
      (social login, magic link, password reset, email verification).
- [ ] **Secure password handling** — the demo uses a client-side hash; real auth
      must hash server-side and never store credentials in the browser.
- [ ] **Account extras** — payment methods, re-order, returns initiation from
      order history.

---

## 🟠 P1 — Expected of a real e-commerce site

### Discovery
- [ ] **Search** — product search with autocomplete (Algolia/Typesense or DB
      full-text). No search exists yet.
- [ ] **Faceted filtering** — filter by colour, material, price range, size; the
      shop page currently filters by single category + sort only.
- [ ] **Pagination / infinite scroll** for large catalogues.
- [ ] **Collections / curated edits** landing pages (e.g. "Travel", "Gifts").
- [ ] **Breadcrumbs everywhere** + proper category landing pages.

### Product experience
- [ ] **Variant matrix** — size + colour with per-variant price/stock/image
      (currently colour-only, single price).
- [ ] **Image zoom / lightbox / video.**
- [ ] **Size guide / fit / dimensions diagram.**
- [ ] **Reviews & ratings** — real UGC reviews, photos, verified-buyer badges
      (currently static numbers).
- [ ] **Recently viewed** products.
- [ ] **Stock/price-drop "notify me"** when out of stock.

### Conversion / retention
- [ ] **Wishlist / favourites** (persisted to account).
- [ ] **Real newsletter signup** wired to an ESP (Klaviyo/Mailchimp) + double opt-in.
      Footer + drawer forms are UI-only today.
- [ ] **Discount / promo codes** at checkout.
- [ ] **Gift cards & gift wrapping.**
- [ ] **Cross-sell / "complete the look"** powered by real recommendation logic
      (currently same-category fallback).
- [ ] **Abandoned-cart recovery** email flow.

### Content & trust
- [ ] **Real content pages** — Shipping, Returns policy, FAQ, Care guide,
      Privacy, Terms. Footer links currently point to `/about` placeholders.
- [ ] **Journal / blog** (linked in nav but not built).
- [ ] **Contact page / form** + support channel.
- [ ] **Store locator** (if physical presence).

---

## 🟡 P2 — Polish, growth, ops

### SEO & sharing
- [ ] **Per-page meta tags / Open Graph / Twitter cards** (needs SSR or
      react-helmet; SPA currently has one static `<title>`/description).
- [ ] **Structured data** (Product, Offer, BreadcrumbList, Review JSON-LD).
- [ ] **Sitemap.xml + robots.txt.**
- [ ] **SSR / SSG migration** (Next.js / Remix / Astro) for SEO + faster first paint.
- [ ] **Canonical URLs, hreflang** if multi-region.

### Internationalisation
- [ ] **Multi-currency** + geo-pricing.
- [ ] **i18n / translated copy.**
- [ ] **Localised shipping & tax rules.**

### Performance & quality
- [ ] **Image optimization pipeline** (responsive `srcset`, AVIF/WebP, lazy-load).
- [ ] **Code-splitting per route** (lazy-load page bundles).
- [ ] **Lighthouse / Core Web Vitals pass** (perf, a11y, SEO budgets in CI).
- [ ] **Accessibility audit** — focus traps in drawer/menu, ARIA on the custom
      `<select>`/accordions, keyboard nav, colour-contrast verification, skip-link.
- [ ] **Error boundary + offline / failed-fetch states.**

### Analytics & ops
- [ ] **Analytics** (GA4 / Plausible) + e-commerce events (view_item, add_to_cart,
      begin_checkout, purchase).
- [ ] **Consent / cookie banner** (GDPR/CCPA).
- [ ] **Admin / CMS** for merchandising without code.
- [ ] **Testing** — unit (Vitest) for cart logic, E2E (Playwright) for the
      purchase flow, visual regression.
- [ ] **CI/CD** — lint + typecheck + test + preview deploys on PR.
- [ ] **Monitoring / error tracking** (Sentry).

---

## Quick wins to tackle next (suggested order)

1. Wire a real backend for products + inventory (P0) — unblocks everything else.
2. Stripe checkout + order persistence + confirmation email (P0).
3. Auth + account/order history (P0).
4. Search + faceted filtering (P1).
5. Real content/policy pages + reviews (P1).
6. SSR migration for SEO + meta tags (P2 but high leverage).
