# Bagger — High-End Redesign Plan

> **Goal:** stop looking like a tasteful-but-templated AI default, and become a
> *custom luxury commerce experience* — the kind of site that wins Awwwards SOTD
> and makes the product feel like an object worth owning. Reference the design
> languages of **Apple, Xiaomi, Rolex, and Gucci**, synthesize the best of each,
> and push past them with motion (GSAP/Lenis) and 3D (Three.js/R3F).
>
> This document is the plan + the checklist. Items are tagged **D0**
> (foundation, do first) → **D3** (signature polish).

**Chosen aesthetic:** *section-split light/dark* — bright "clarity" panels
(Apple) alternating with dark "craft" panels (Rolex), driven by the `<Panel>`
primitive + theme-aware tokens.

---

## ⚙️ D0 scaffold — SHIPPED

The foundation is in place (non-breaking; the existing site is unchanged):

- ✅ **Design tokens v2** — `src/styles/tokens.css`: fluid type scale, motion
  easings (`--ease-leather`), rhythm, and **light + dark semantic palettes**
  that flip on `data-theme`. Dark "craft" colours + fluid sizes + leather
  easings also exposed as Tailwind utilities.
- ✅ **`<Panel tone="light|dark">`** primitive (`src/components/Panel.tsx`) — the
  section-split switch; nested components inherit the active theme.
- ✅ **Lenis smooth scroll** (`src/components/SmoothScroll.tsx`) — inertia scroll,
  GSAP-ticker driven, **dynamically imported** so it never blocks first paint.
- ✅ **GSAP + ScrollTrigger** wired (`src/lib/gsap.ts`) + `useGsapScope` hook
  (`src/lib/useGsapScope.ts`) — scoped, auto-cleanup, reduced-motion-aware.
- ✅ **Reduced-motion guardrails** (`src/lib/motion.ts`) — Lenis off + animations
  skipped under `prefers-reduced-motion` (verified).
- ✅ **Perf**: motion libs are async chunks (GSAP 45 KB / Lenis 5.6 KB gzip);
  main bundle stayed ~78 KB gzip.
- ✅ **Asset pipeline starter** (`docs/ASSETS.md`) + `public/{models,img,env}` plan.

**Next (D1):** real photography/`.glb` models, then the cinematic 3D hero and
PDP viewer.

---

## ⚙️ D1–D2 — SHIPPED

Signature moments are live (all verified rendering headless, no console errors):

- ✅ **Scroll-scrubbed 3D hero** — procedural leather bag in react-three-fiber
  (`src/three/BagModel.tsx` + `HeroScene.tsx`), studio lighting, contact shadow,
  in-scene environment (no HDRI fetch), rotates with scroll. *(D1)*
- ✅ **PDP interactive 3D viewer** — drag-to-rotate (`PresentationControls`) with
  **live colour/material swap** driven by the colour picker. *(D1)*
- ✅ **Bento spec grid** on PDP (Xiaomi-led). *(D1)*
- ✅ **Pinned craft chapter** — dark `<Panel>`, GSAP ScrollTrigger pin + scrubbed
  step crossfade, accessible stacked fallback under reduced-motion. *(D1)*
- ✅ **Editorial PLP grid** — 12-col magazine rhythm (5/7, 4/4/4). *(D2)*
- ✅ **Lookbook band** — asymmetric horizontal-scroll campaign frames. *(D2)*
- ✅ **Framer Motion** — animated cart drawer (enter/exit) + per-route page
  transitions, via `LazyMotion`/`m` to keep the bundle lean. *(D2)*
- ✅ **Graceful fallbacks** — every 3D surface falls back to the SVG art when
  WebGL is unavailable or reduced-motion is set.
- ✅ **Perf**: 3D (three/drei) is a lazy ~243 KB-gzip chunk loaded only on pages
  with the bag; GSAP/Lenis async; main bundle ~108 KB gzip.

**Still to do (D2 tail / D3):** real assets (photography + `.glb`), card→PDP
shared-element morph, magnetic cursor, account/content polish, full a11y + perf
hardening pass.

---

## ⚙️ D3 — polish & hardening — SHIPPED

- ✅ **Accessibility**: skip-to-content link, focus-trap + ESC + focus-restore on
  cart drawer & mobile menu (`useFocusTrap`), `role="dialog"`/`aria-modal`,
  global `:focus-visible` ring, `aria-live` toaster.
  - 🐞 Fixed a real regression: the Framer cart drawer couldn't close at all
    (AnimatePresence needs a *keyed motion* direct child) — now X + ESC + backdrop
    all close it.
- ✅ **SEO**: per-route head manager (`lib/seo.ts`) — title, description, Open
  Graph, canonical; **JSON-LD** structured data (Product on PDP, Organization on
  home); `robots.txt` + generated `sitemap.xml` (`scripts/gen-sitemap.mjs`,
  wired into `build`).
- ✅ **Performance**: route-based code-splitting — secondary pages are 3–9 KB
  chunks; main bundle ~100 KB gzip; 3D/GSAP/Lenis all async.
- ✅ **Resilience**: `ErrorBoundary` around routes with a friendly fallback;
  route-level `Suspense` loading state.
- ✅ **Signature micro-interaction**: magnetic CTAs (`useMagnetic` / `<Magnetic>`),
  pointer-only + reduced-motion safe.
- ✅ **Content/account polish**: fluid type, reveals, consistent hairlines.

**Remaining (D3 tail):** card→PDP shared-element morph (View Transitions), a
custom cursor, real assets, and an SSR migration (Next/Remix) for true
server-rendered meta — see infra note.

---

## 1. What to steal from each brand

A teardown of each reference's design language, and the specific move to take.

### Apple — *clarity, choreography, product-as-hero*
- Enormous whitespace; one idea per viewport; the product is always the brightest thing on screen.
- **Scroll-driven storytelling**: pinned sections where the product rotates/zooms/recolours as you scroll (the AirPods/iPhone pages). Copy fades in one line at a time.
- Razor-sharp typography hierarchy (huge headline → tight sub → quiet caption). Generous line-height.
- Restrained, physical motion — eased, never bouncy. Everything feels weighted.
- **Take:** the pinned, scroll-scrubbed product hero and the "one statement per panel" rhythm.

### Xiaomi — *crisp tech-grid, density done cleanly*
- Confident modular grid; bento-box feature tiles; high-contrast spec callouts.
- Big numbers as graphics (battery %, mm, grams). Product shots on seamless gradient backdrops.
- Slightly more color and energy than Apple, but still disciplined.
- **Take:** the **bento grid** for the product-detail spec/feature story and the "spec as hero number" treatment.

### Rolex — *quiet authority, craft, gold-on-green restraint*
- Deep, confident color fields (the green), gold accents used sparingly = signals luxury.
- Slow, deliberate motion; full-bleed cinematic imagery; serif + clean sans pairing.
- Lots of breathing room around a single watch; macro detail shots of craftsmanship.
- Microcopy reads like heritage ("Oyster Perpetual", "Superlative Chronometer").
- **Take:** the **dark, cinematic "craft" chapters**, sparing metallic accent, and slow reveals on real macro detail.

### Gucci — *editorial maximalism, fashion confidence*
- Magazine-style asymmetric layouts; oversized serif display; unexpected crops.
- Mixes campaign imagery with product; playful but premium; strong art direction.
- Hover states and transitions feel curated, not utilitarian.
- **Take:** the **editorial asymmetry**, oversized display serif moments, and campaign/look-book sections that sell a world, not just a SKU.

---

## 2. The synthesized direction — "Worn Heritage, Modern Craft"

Bagger's edge = it's *leather*, which none of the references lean on. We make
**materiality** the whole thing: grain, stitch, patina, weight. The site should
feel like handling the bag in a beautifully lit atelier.

**Concept pillars**
1. **Atelier, not store.** Dark, cinematic "craft" chapters (Rolex) intercut with bright, airy product clarity (Apple).
2. **The bag is the hero, in 3D.** A real, rotatable, scroll-scrubbed leather bag (Three.js) replaces flat cards on the key moments.
3. **Editorial spine.** Oversized serif statements and asymmetric look-book sections (Gucci) carry the brand story between shopping moments.
4. **Engineered detail.** Bento spec grids and big-number callouts (Xiaomi) make "full-grain, 40lb-rated, 22L" feel designed, not listed.
5. **Weighted motion.** Everything eases like leather settling — slow, physical, never springy. Tasteful, reduced-motion-safe.

**Two aesthetic poles to balance (recommended split below):**
- *Light atelier* — warm bone/cream, ink type, clay accent (today's palette, refined).
- *Dark craft* — near-black espresso fields, candlelit product, a single brushed-brass/gold accent (Rolex move).

Recommendation: **dual-mode by section**, not a global dark theme. Home and PDP alternate light "clarity" panels with dark "craft" panels. This is the single biggest lever to escape the templated look.

---

## 3. Design-system overhaul (D0)

- [~] **Type scale rebuild.** Fluid `clamp()` scale (display / h1–h4 / body /
      caption) shipped in `tokens.css` + Tailwind. *Still to do:* swap the UI sans
      for a tighter grotesk (`Söhne`/`Neue Haas` vibe; free stand-in `Geist` /
      `Inter Tight`) and tune per-step tracking. *(D0 partial)*
- [x] **Color tokens v2.** Light + dark palettes as CSS variables: bone/cream/
      ink/clay (light) and espresso/char/bone-dim/**brass** (dark); single
      metallic accent (`brass #B08D57`). *(D0 — `tokens.css`)*
- [ ] **Spacing & grid.** Adopt a 12-col fluid grid with generous gutters; define
      a vertical rhythm scale. Add an asymmetric layout utility set (off-center
      hero, editorial 7/5 splits).
- [x] **Motion tokens.** Easings (`--ease-leather`), durations, and stagger
      steps standardized so every animation feels from one hand. *(D0)*
- [ ] **Elevation & texture.** Replace flat fills with subtle paper/leather grain,
      soft long shadows, and 1px hairline rules (luxury detail).
- [ ] **Cursor & focus states.** Custom cursor on desktop (magnetic on CTAs),
      beautiful focus rings for a11y. Disabled on touch.
- [x] **Design tokens file** (`src/styles/tokens.css` + Tailwind theme) as the
      single source so the whole system is swappable. *(D0)*

---

## 4. Motion & 3D tech stack (D0–D1)

Chosen libraries and the rules around them.

- [x] **Lenis** — smooth/inertia scroll (the backbone of premium scroll feel). *(D0)*
- [x] **GSAP + ScrollTrigger** — pinned sections, scroll-scrubbed timelines,
      reveals, parallax, horizontal scroll galleries. Registered + `useGsapScope`
      helper shipped. *(D0)*
- [ ] **react-three-fiber + drei + three** — the 3D leather bag: load a `.glb`,
      studio lighting/env map, scroll-scrub rotation, drag-to-rotate on PDP,
      live colour/material swatch swap.
- [~] **Framer Motion** — installed; to wire for cart/drawer & modal
      choreography, layout animations, list staggers. *(D2)*
- [ ] **View Transitions API** (where supported) — cinematic page-to-page and
      product-image morphs (card → PDP hero shared-element).
- [ ] **Guardrails (mandatory):**
  - [x] Honor `prefers-reduced-motion` everywhere — static fallbacks for every scroll/3D effect. *(D0: Lenis + useGsapScope gated)*
  - [x] Lazy-load heavy motion (dynamic import); never block first paint. *(D0: GSAP/Lenis async chunks; Three.js to follow same pattern)*
  - [ ] Performance budget: LCP < 2.5s, keep main bundle lean (code-split 3D), 60fps on a mid-tier phone.
  - [ ] Pause off-screen canvases; cap DPR; use compressed `.glb` (Draco/meshopt) + KTX2 textures.
  - [ ] Full keyboard nav + focus management retained through all animated UI.

---

## 5. Page-by-page redesign

### Home (D1) — the showcase
- [ ] **Cinematic hero**: full-bleed, scroll-scrubbed 3D bag that rotates and catches light as you scroll; one-line serif statement fades in; quiet "scroll" cue.
- [ ] **Pinned "craft" chapter (dark)**: scroll-driven sequence — hide → cut → stitch → finish — copy reveals line-by-line (Apple choreography, Rolex tone).
- [ ] **Editorial look-book band (Gucci)**: asymmetric, oversized serif, campaign imagery; horizontal-scroll on desktop, swipe on mobile.
- [ ] **Bento "why it lasts" grid (Xiaomi)**: big-number tiles (20yr lifespan, 40lb handles, ∞ repairs) with micro-interactions.
- [ ] **Curated product rail** with shared-element transition into PDP.
- [ ] **Newsletter/CTA** as a designed moment, not a footer afterthought.

### Shop / PLP (D2)
- [ ] Editorial grid with varied tile sizes (not a uniform 4-col); hover = product rotates / alt angle, weighted ease.
- [ ] Sticky, refined filter rail; animated category transitions; result count morphs.
- [ ] Optional "lookbook vs grid" view toggle.

### Product / PDP (D1) — the conversion centerpiece
- [ ] **Interactive 3D viewer**: drag-to-rotate, pinch-zoom, material/colour swatch swaps the 3D texture live; "view in your space" (AR via `<model-viewer>`) as a stretch.
- [ ] **Bento spec story** (Xiaomi): dimensions, capacity, materials as designed tiles with macro detail shots.
- [ ] Sticky buy panel that docks elegantly on scroll; quantity/colour with weighted motion.
- [ ] Scroll-told "made from" section (where the leather comes from).
- [ ] Reviews as an editorial pull-quote module, not a star dump.

### Cart & Checkout (D2)
- [ ] Drawer re-choreographed with Framer Motion (spring-free, leather ease); line items animate in/out.
- [ ] Checkout: keep it calm and trustworthy — luxury restraint, generous spacing, refined inputs, progress as a quiet stepper. (Don't over-animate money.)

### Account & content (D3)
- [ ] Apply the type/spacing system; subtle reveals; consistent hairlines and brass accents.

---

## 6. Signature "wow" moments (pick 2–3 to nail) — D1/D2
- [ ] **Scroll-scrubbed 3D bag** rotating through the home hero (the headline moment).
- [ ] **Card → PDP shared-element morph** (product image flies into the hero).
- [ ] **Pinned craft sequence** with line-by-line copy reveal.
- [ ] **Magnetic cursor + hairline hover underlines** across CTAs and nav.
- [ ] **Material swatch that visibly re-skins the 3D model** in real time.

> Better to ship **two flawless** signature moments than five janky ones.

---

## 7. Asset pipeline (blocks the 3D work) — D0
- [ ] Source or commission **real product photography** (multi-angle, macro detail, lifestyle) — the generative SVG is a placeholder and caps the ceiling.
- [ ] Produce/acquire **3D bag models** (`.glb`, Draco-compressed) + PBR leather textures, or model 2–3 hero SKUs.
- [ ] Build an **image pipeline**: responsive `srcset`, AVIF/WebP, blur-up placeholders, CDN.
- [ ] Define an **art-direction kit** (lighting, crops, grain) so every asset is consistent.

---

## 8. Phased roadmap (suggested order)

1. **D0 — Foundation:** tokens v2 (type/color/motion/grid), Lenis + GSAP wired, reduced-motion guardrails, asset pipeline started. *No visible redesign yet, but everything after is fast.*
2. **D1 — Hero moments:** Home cinematic hero + 3D bag, PDP 3D viewer + bento specs, pinned craft chapter. *This is where it stops looking templated.*
3. **D2 — Breadth:** PLP editorial grid, look-book band, cart/checkout choreography, page transitions.
4. **D3 — Polish:** account/content pass, micro-interactions, perf hardening, a11y audit, cross-device QA.

---

## 9. Risks & guardrails
- [ ] **Performance vs. spectacle** — 3D/scroll can wreck Core Web Vitals. Budget from day one; code-split; measure on real phones.
- [ ] **Accessibility** — every effect needs a reduced-motion + keyboard path. Luxury ≠ inaccessible.
- [ ] **Scope creep** — lock the 2–3 signature moments; don't gold-plate everything.
- [ ] **Asset dependency** — the 3D/photography work gates the wow factor; start sourcing early.
- [ ] **SSR/SEO** — heavy client motion hurts SEO; plan the Next.js/Remix migration (see infra note) so hero content is server-rendered.

---

## 10. Infrastructure note (for when we wire the backend)
- **Database:** CockroachDB (Postgres-wire compatible) — the existing `src/lib/api.ts` seam stays the swap point; reimplement its methods against Cockroach via a thin server/API layer.
- **Hosting:** Render (web service + static site / managed Postgres-compatible connection).
- **Implication for this redesign:** to get SSR for the motion-heavy pages, plan a move to **Next.js or Remix on Render**; keep the `api.ts` contract identical so the redesign and the backend swap stay independent workstreams.

---

## 11. Inspiration shortlist (study before building)
- Apple product pages (AirPods Pro, iPhone) — scroll choreography.
- Xiaomi flagship phone pages — bento + spec-as-hero.
- Rolex.com — dark cinematic craft, gold restraint, slow reveals.
- Gucci.com / Gucci stories — editorial asymmetry, oversized serif.
- Awwwards "Site of the Day" leather/fashion winners; GSAP + Lenis showcase sites for technique reference.
