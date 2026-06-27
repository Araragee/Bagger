import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import ProductArt from '../components/ProductArt'
import { lazy, Suspense } from 'react'
import Hero3D from '../components/Hero3D'
import Lookbook from '../components/Lookbook'
import Reveal from '../components/Reveal'

// Lazy so GSAP (used by the pinned sequence) stays out of the initial bundle
const CraftChapter = lazy(() => import('../components/CraftChapter'))
import { ArrowIcon, StarIcon } from '../components/Icons'
import { useTitle } from '../lib/useTitle'

const hero = products[0]
const editorial = products[3]

const featured = products.filter((p) => p.badge).slice(0, 4)

const categories = [
  { label: 'Totes', to: '/shop?category=Totes', product: products[0] },
  { label: 'Backpacks', to: '/shop?category=Backpacks', product: products[1] },
  { label: 'Crossbody', to: '/shop?category=Crossbody', product: products[2] },
  { label: 'Wallets', to: '/shop?category=Wallets', product: products[4] },
]

export default function Home() {
  useTitle('')
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="container-wide grid items-center gap-8 pb-12 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-12">
        <div className="animate-fade-up">
          <span className="eyebrow">Everyday carry · est. on purpose</span>
          <h1 className="mt-5 font-display text-[clamp(2.75rem,8vw,6rem)] font-light leading-[0.95] tracking-tight">
            Built to be
            <br />
            <span className="italic text-clay">worn in,</span> not
            <br />
            worn out.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Honest leather goods from a small workshop. Bags that start good and
            get better — the kind you hand down, not throw out.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/shop" className="btn-primary">
              Shop the collection
              <ArrowIcon />
            </Link>
            <Link to="/about" className="btn-ghost">
              Our story
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-ink-soft">
            <div className="flex items-center gap-1.5">
              <div className="flex text-clay">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <span>4.8 · 2,300+ reviews</span>
            </div>
            <span className="hidden sm:inline">Lifetime repairs included</span>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-bone-200 to-bone">
            <Hero3D className="absolute inset-0 h-full w-full" />
          </div>
          {/* floating product chip */}
          <Link
            to={`/product/${hero.slug}`}
            className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-cream/90 px-4 py-3 shadow-lg backdrop-blur transition-transform hover:-translate-y-1"
          >
            <div className="h-12 w-12 overflow-hidden rounded-lg bg-bone-200">
              <ProductArt product={hero} className="h-full w-full" />
            </div>
            <div>
              <p className="font-display text-sm leading-tight">{hero.name}</p>
              <p className="text-xs text-ink-soft">${hero.price} · shop now</p>
            </div>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Category strip ───────────────────────────────── */}
      <section className="container-wide py-10">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <Link
                to={c.to}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-bone-200 p-4"
              >
                <ProductArt
                  product={c.product}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110"
                />
                <span className="relative z-10 inline-flex items-center justify-between rounded-full bg-cream/90 px-4 py-2 font-sans text-sm backdrop-blur">
                  {c.label}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured grid ────────────────────────────────── */}
      <section className="container-wide py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">The short list</span>
            <h2 className="mt-2 font-display text-4xl font-light sm:text-5xl">Crowd favourites</h2>
          </div>
          <Link to="/shop" className="link-underline hidden font-sans text-sm sm:inline-flex">
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Craft chapter (pinned, scroll-driven, dark) ──── */}
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <CraftChapter />
      </Suspense>

      {/* ── Lookbook (editorial horizontal scroll) ───────── */}
      <Lookbook />

      {/* ── Editorial split ──────────────────────────────── */}
      <section className="bg-ink py-20 text-cream">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow text-cream/60">The Bagger promise</span>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">
              We’d rather sell you one bag for twenty years than twenty bags for one.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-cream/70">
              Every Bagger is cut from full-grain leather, stitched to take a
              beating, and backed by free repairs for life. If it wears out,
              we’ll fix it. If we can’t fix it, we’ll replace it.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-cream/15 pt-8">
              {[
                ['20yr', 'Average lifespan'],
                ['100d', 'Trial period'],
                ['∞', 'Free repairs'],
              ].map(([big, small]) => (
                <div key={small}>
                  <p className="font-display text-3xl text-tan">{big}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-cream/50">{small}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={120}>
            <div className="overflow-hidden rounded-[2rem] bg-bone-200">
              <ProductArt product={editorial} className="aspect-square w-full" variant="hero" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Full catalogue teaser ────────────────────────── */}
      <section className="container-wide py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl font-light sm:text-5xl">The whole shop</h2>
          <Link to="/shop" className="btn-ghost hidden sm:inline-flex">
            Browse all {products.length}
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center sm:hidden">
          <Link to="/shop" className="btn-primary">
            Browse all {products.length}
          </Link>
        </div>
      </section>
    </div>
  )
}
