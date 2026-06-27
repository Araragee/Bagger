import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getProduct,
  products,
  formatPrice,
  variantStock,
  stockStateOf,
  firstAvailableColor,
  productStock,
} from '../data/products'
import ProductArt from '../components/ProductArt'
import Product3DViewer from '../components/Product3DViewer'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { StarIcon, ArrowIcon } from '../components/Icons'
import { useCart } from '../store/cart'
import { useToast } from '../store/toast'
import { useSeo, useJsonLd } from '../lib/seo'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const product = slug ? getProduct(slug) : undefined
  const add = useCart((s) => s.add)
  const pushToast = useToast((s) => s.push)
  const [color, setColor] = useState(
    product ? (firstAvailableColor(product)?.name ?? product.colors[0].name) : '',
  )
  const [openSection, setOpenSection] = useState<string | null>('details')

  useSeo({
    title: product?.name ?? 'Not found',
    description: product?.description,
    type: 'product',
  })

  const jsonLd = useMemo(() => {
    if (!product) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      category: product.category,
      material: product.material,
      brand: { '@type': 'Brand', name: 'Bagger' },
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD',
        availability:
          productStock(product) > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews,
      },
    }
  }, [product])
  useJsonLd(jsonLd)

  if (!product) return <NotFound />

  const selectedStock = variantStock(product.id, color)
  const state = stockStateOf(selectedStock)
  const soldOut = state === 'out'

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4)
  const recommend = related.length ? related : fallbackRelated

  const handleAdd = () => {
    if (soldOut) return
    const result = add(product.id, color)
    if (result === 'added') pushToast(`${product.name} added to your bag`, 'success')
    else if (result === 'max-reached') pushToast('That’s all we have in stock', 'info')
    else pushToast('Sorry — that just sold out', 'error')
  }

  const sections = [
    { key: 'details', title: 'Details & specs', body: product.details },
    {
      key: 'shipping',
      title: 'Shipping & returns',
      body: [
        'Free carbon-neutral shipping over $150',
        'Ships within 2 business days',
        '100-day no-questions returns',
        'Lifetime repairs on all hardware and stitching',
      ],
    },
    {
      key: 'care',
      title: 'Care',
      body: [
        'Wipe with a damp cloth; let air dry',
        'Condition every few months with a neutral balm',
        'Embrace the patina — it’s the point',
      ],
    },
  ]

  return (
    <div className="container-wide py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-soft">
        <Link to="/shop" className="link-underline">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="link-underline">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            style={{ viewTransitionName: 'product-hero' }}
            className="aspect-square w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-bone-200 to-bone"
          >
            <Product3DViewer product={product} colorHex={colorHex(product, color)} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.colors.map((c) => {
              const out = variantStock(product.id, c.name) === 0
              return (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`relative overflow-hidden rounded-xl bg-bone-200 ring-2 transition ${
                    color === c.name ? 'ring-ink' : 'ring-transparent hover:ring-ink/30'
                  }`}
                  aria-label={`View ${c.name}${out ? ' (sold out)' : ''}`}
                >
                  <ProductArt
                    product={{ ...product, art: { ...product.art, base: c.hex } }}
                    className={`aspect-square w-full ${out ? 'opacity-50' : ''}`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Info */}
        <div>
          {product.badge && (
            <span className="eyebrow text-clay">{product.badge}</span>
          )}
          <h1 className="mt-1 font-display text-4xl font-light leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-ink-soft">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-4">
            <span className="font-display text-3xl">{formatPrice(product.price)}</span>
            <div className="flex items-center gap-1.5 text-sm text-ink-soft">
              <div className="flex text-clay">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className={i < Math.round(product.rating) ? '' : 'opacity-30'} />
                ))}
              </div>
              <span>
                {product.rating} · {product.reviews} reviews
              </span>
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

          {/* Colour picker */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Colour</span>
              <span className="text-sm text-ink-soft">{color}</span>
            </div>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c) => {
                const out = variantStock(product.id, c.name) === 0
                return (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={`${c.name}${out ? ' (sold out)' : ''}`}
                    aria-pressed={color === c.name}
                    className={`relative h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-bone transition ${
                      color === c.name ? 'ring-ink' : 'ring-transparent hover:ring-ink/30'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {out && (
                      <span className="absolute inset-0 m-auto h-px w-10 -rotate-45 bg-ink/60" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handleAdd}
              disabled={soldOut}
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {soldOut ? 'Sold out' : `Add to bag — ${formatPrice(product.price)}`}
            </button>
            {!soldOut && (
              <Link to="/checkout" onClick={handleAdd} className="btn-ghost">
                Buy now
              </Link>
            )}
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
            <span
              className={`h-2 w-2 rounded-full ${
                state === 'out' ? 'bg-ink/40' : state === 'low' ? 'bg-clay' : 'bg-moss'
              }`}
            />
            {state === 'out'
              ? `Sold out in ${color} — try another colour`
              : state === 'low'
                ? `Only ${selectedStock} left in ${color} · ships in 2 days`
                : `${product.material} · in stock, ships in 2 days`}
          </p>

          {/* Accordions */}
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {sections.map((s) => {
              const open = openSection === s.key
              return (
                <div key={s.key}>
                  <button
                    onClick={() => setOpenSection(open ? null : s.key)}
                    className="flex w-full items-center justify-between py-4 text-left font-sans text-sm uppercase tracking-widest"
                    aria-expanded={open}
                  >
                    {s.title}
                    <span className={`transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {open && (
                    <ul className="space-y-2 pb-5 text-sm text-ink-soft">
                      {s.body.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-clay">—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bento spec story (Xiaomi-led) */}
      <section className="mt-20 sm:mt-28">
        <span className="eyebrow">Engineered to last</span>
        <h2 className="mt-2 max-w-xl font-display text-fluid-2xl font-light">
          Every millimetre considered, every gram earned.
        </h2>
        <div className="mt-8 grid auto-rows-[minmax(9rem,auto)] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {/* Material — wide hero tile */}
          <div className="col-span-2 row-span-2 flex flex-col justify-between rounded-3xl bg-ink p-6 text-cream sm:p-8">
            <span className="eyebrow text-cream/50">Material</span>
            <div>
              <p className="font-display text-fluid-xl leading-tight">{product.material}</p>
              <p className="mt-2 max-w-xs text-sm text-cream/60">
                One hide, full-grain, ageing into a patina that’s yours alone.
              </p>
            </div>
          </div>
          {/* Rating big number */}
          <div className="flex flex-col justify-between rounded-3xl bg-clay p-6 text-cream">
            <span className="eyebrow text-cream/60">Owner rating</span>
            <p className="font-display text-5xl">{product.rating}<span className="text-2xl">/5</span></p>
          </div>
          {/* Warranty */}
          <div className="flex flex-col justify-between rounded-3xl bg-bone-200 p-6">
            <span className="eyebrow">Repairs</span>
            <p className="font-display text-4xl">Lifetime</p>
          </div>
          {/* Detail tiles from product.details */}
          {product.details.slice(0, 2).map((d) => (
            <div key={d} className="flex items-end rounded-3xl border border-ink/10 p-6">
              <p className="text-sm leading-snug text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mt-24">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-light sm:text-4xl">Goes well with</h2>
          <Link to="/shop" className="link-underline hidden font-sans text-sm sm:inline-flex">
            View all <ArrowIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {recommend.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}

function colorHex(product: ReturnType<typeof getProduct>, name: string): string {
  return product?.colors.find((c) => c.name === name)?.hex ?? product?.art.base ?? '#7A4B26'
}
