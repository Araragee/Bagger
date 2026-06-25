import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, products, formatPrice } from '../data/products'
import ProductArt from '../components/ProductArt'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { StarIcon, ArrowIcon } from '../components/Icons'
import { useCart } from '../store/cart'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug } = useParams()
  const product = slug ? getProduct(slug) : undefined
  const add = useCart((s) => s.add)
  const [color, setColor] = useState(product?.colors[0].name ?? '')
  const [added, setAdded] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>('details')

  if (!product) return <NotFound />

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4)
  const recommend = related.length ? related : fallbackRelated

  const handleAdd = () => {
    add(product.id, color)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
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
          <div className="overflow-hidden rounded-[2rem] bg-bone-200">
            <ProductArt product={product} className="aspect-square w-full" variant="hero" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`overflow-hidden rounded-xl bg-bone-200 ring-2 transition ${
                  color === c.name ? 'ring-ink' : 'ring-transparent hover:ring-ink/30'
                }`}
                aria-label={`View ${c.name}`}
              >
                <ProductArt
                  product={{ ...product, art: { ...product.art, base: c.hex } }}
                  className="aspect-square w-full"
                />
              </button>
            ))}
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
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-bone transition ${
                    color === c.name ? 'ring-ink' : 'ring-transparent hover:ring-ink/30'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button onClick={handleAdd} className="btn-primary flex-1">
              {added ? 'Added ✦' : `Add to bag — ${formatPrice(product.price)}`}
            </button>
            <Link to="/checkout" onClick={handleAdd} className="btn-ghost">
              Buy now
            </Link>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
            <span className="h-2 w-2 rounded-full bg-moss" />
            {product.material} · in stock, ships in 2 days
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
