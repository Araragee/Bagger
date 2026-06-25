import { Link } from 'react-router-dom'
import { type Product, formatPrice } from '../data/products'
import ProductArt from './ProductArt'
import { useCart } from '../store/cart'

const badgeStyle: Record<string, string> = {
  New: 'bg-moss text-cream',
  Bestseller: 'bg-ink text-cream',
  'Last few': 'bg-clay text-cream',
}

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add)

  return (
    <article className="group relative flex flex-col">
      <Link
        to={`/product/${product.slug}`}
        className="relative block overflow-hidden rounded-2xl bg-bone-200"
      >
        {product.badge && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 font-sans text-[0.65rem] uppercase tracking-widest ${badgeStyle[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <ProductArt
          product={product}
          className="aspect-square w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick add — appears on hover (desktop) / always tappable (mobile) */}
        <button
          onClick={(e) => {
            e.preventDefault()
            add(product.id, product.colors[0].name)
          }}
          className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-ink/90 py-3 font-sans text-xs uppercase tracking-widest text-cream opacity-0 backdrop-blur transition-all duration-300 hover:bg-clay group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100"
        >
          Quick add
        </button>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg leading-tight">
            <Link to={`/product/${product.slug}`} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft">{product.tagline}</p>
        </div>
        <span className="shrink-0 font-sans text-sm tabular-nums">
          {formatPrice(product.price)}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        {product.colors.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="h-3.5 w-3.5 rounded-full border border-ink/15"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </article>
  )
}
