import { Link } from 'react-router-dom'
import {
  type Product,
  formatPrice,
  productStock,
  firstAvailableColor,
} from '../data/products'
import ProductArt from './ProductArt'
import { useCart } from '../store/cart'
import { useToast } from '../store/toast'
import { useMorphNavigate } from '../lib/useMorphNavigate'

const badgeStyle: Record<string, string> = {
  New: 'bg-moss text-cream',
  Bestseller: 'bg-ink text-cream',
  'Last few': 'bg-clay text-cream',
}

export default function ProductCard({
  product,
  morph = false,
}: {
  product: Product
  /** Opt into the shared-element morph into the PDP. Only enable where the
   *  product appears once on the page (e.g. the Shop grid) to avoid duplicate
   *  view-transition-name conflicts. */
  morph?: boolean
}) {
  const add = useCart((s) => s.add)
  const pushToast = useToast((s) => s.push)
  const morphNav = useMorphNavigate()
  const to = `/product/${product.slug}`
  const stock = productStock(product)
  const soldOut = stock === 0
  const lowStock = !soldOut && stock <= 5

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    const color = firstAvailableColor(product)
    if (!color) return
    const result = add(product.id, color.name)
    if (result === 'added') pushToast(`${product.name} added to your bag`, 'success')
    else if (result === 'max-reached') pushToast('That’s all we have in stock', 'info')
    else pushToast('Sorry — that just sold out', 'error')
  }

  return (
    <article className="group relative flex flex-col">
      <Link
        to={to}
        onClick={
          morph
            ? (e) => {
                e.preventDefault()
                morphNav(to, e.currentTarget as HTMLElement)
              }
            : undefined
        }
        className="relative block overflow-hidden rounded-2xl bg-bone-200"
      >
        {product.badge && !soldOut && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 font-sans text-[0.65rem] uppercase tracking-widest ${badgeStyle[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-ink/80 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-widest text-cream">
            Sold out
          </span>
        )}
        <ProductArt
          product={product}
          className={`aspect-square w-full transition-transform duration-700 ease-out group-hover:scale-105 ${soldOut ? 'opacity-60 grayscale' : ''}`}
        />

        {!soldOut && (
          <button
            onClick={quickAdd}
            className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-ink/90 py-3 font-sans text-xs uppercase tracking-widest text-cream opacity-0 backdrop-blur transition-all duration-300 hover:bg-clay group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100"
          >
            Quick add
          </button>
        )}
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg leading-tight">
            <Link to={to} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft">{product.tagline}</p>
          {lowStock && (
            <p className="mt-1 text-xs font-medium text-clay">Only {stock} left</p>
          )}
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
