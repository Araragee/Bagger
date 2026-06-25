# Bagger — Feature Audit & Roadmap

Status of the demo as of this build, and a detailed, actionable backlog for
turning it into a production storefront. Checked items (`[x]`) ship in the
current demo; unchecked items are the work remaining.

Legend: **P0** = needed for a believable live store · **P1** = expected of a
real e-commerce site · **P2** = nice-to-have / growth.

---

## ✅ Done in this demo

- [x] Project scaffold — Vite + React + TS + Tailwind, typed build passing
- [x] Distinctive design system (palette, type, grain, motion) — not a generic template
- [x] Responsive layout across mobile / tablet / desktop
- [x] Home page (hero, category strip, featured grid, brand editorial, shop teaser)
- [x] Shop/collection page with category filter (URL-synced) + sorting
- [x] Product detail page (gallery, colour picker, accordions, related products)
- [x] Cart drawer with quantity controls, persistence, free-shipping meter
- [x] Checkout form (contact/shipping/payment) + order confirmation state
- [x] About / brand story page
- [x] 404 page
- [x] Marquee announcement bar, footer with newsletter capture (UI only)
- [x] Generative SVG product artwork (no external image hosting needed)
- [x] SPA deploy config (Vercel + Netlify rewrites)

---

## 🔴 P0 — Make it a real store

### Backend & data
- [ ] **Replace mock catalogue with a real data source.** Move `src/data/products.ts`
      behind an API (Supabase/Postgres, or a headless commerce backend like
      Medusa/Shopify Storefront API). Define schema: products, variants, inventory,
      prices, media.
- [ ] **Real product photography / media.** The generative SVG is a placeholder;
      swap for a CDN-backed image gallery (multiple angles, zoom, lifestyle shots).
- [ ] **Inventory & stock state.** Real stock counts, "sold out" / "back-order"
      states, disable add-to-cart when unavailable.
- [ ] **Server-side cart / session.** Cart currently lives only in `localStorage`;
      persist server-side so it survives devices and feeds analytics.

### Payments & checkout
- [ ] **Real payment processing** — Stripe (Checkout or Payment Elements) /
      PayPal / Apple Pay / Google Pay. Currently the checkout is simulated.
- [ ] **Tax calculation** (Stripe Tax / TaxJar) — currently flat/none.
- [ ] **Shipping rates & methods** — real carrier rates, delivery estimates,
      address validation. Currently a flat $12 / free-over-$150 rule.
- [ ] **Order creation & persistence** — write orders to the DB, generate order
      numbers, handle idempotency.
- [ ] **Transactional email** — order confirmation, shipping notification,
      receipts (Resend/Postmark/SendGrid).
- [ ] **Checkout validation & error states** — card errors, declined payments,
      field-level validation beyond HTML `required`.

### Accounts
- [ ] **Authentication** — sign up / log in / social auth / magic link.
- [ ] **Account area** — order history, saved addresses, payment methods,
      re-order, returns initiation.
- [ ] **Guest checkout** path (keep it, but link to account creation post-purchase).

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
