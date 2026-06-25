import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart, useCartTotal, lineProduct } from '../store/cart'
import { formatPrice } from '../data/products'
import ProductArt from './ProductArt'
import { CloseIcon, MinusIcon, PlusIcon, ArrowIcon } from './Icons'

const FREE_SHIP = 150

export default function CartDrawer() {
  const { isOpen, close, lines, setQty, remove } = useCart()
  const total = useCartTotal()
  const remaining = Math.max(0, FREE_SHIP - total)
  const progress = Math.min(100, (total / FREE_SHIP) * 100)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={close} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-xl">Your bag</h2>
          <button aria-label="Close cart" onClick={close}>
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-2xl">Nothing in here yet.</p>
            <p className="text-sm text-ink-soft">
              Good bags don’t buy themselves.
            </p>
            <button onClick={close} className="btn-primary mt-2">
              Start shopping
            </button>
          </div>
        ) : (
          <>
            {/* Free-shipping progress */}
            <div className="border-b border-ink/10 px-5 py-3">
              <p className="text-xs text-ink-soft">
                {remaining > 0 ? (
                  <>
                    You’re <span className="font-medium text-ink">{formatPrice(remaining)}</span> away
                    from free shipping
                  </>
                ) : (
                  <span className="font-medium text-moss">You’ve unlocked free shipping ✦</span>
                )}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bone-200">
                <div
                  className="h-full rounded-full bg-clay transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-5">
                {lines.map((line) => {
                  const product = lineProduct(line)
                  if (!product) return null
                  return (
                    <li key={`${line.productId}-${line.color}`} className="flex gap-4">
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={close}
                        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-bone-200"
                      >
                        <ProductArt product={product} className="h-full w-full" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <h3 className="font-display text-base leading-tight">{product.name}</h3>
                            <p className="text-xs text-ink-soft">{line.color}</p>
                          </div>
                          <span className="text-sm tabular-nums">
                            {formatPrice(product.price * line.qty)}
                          </span>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-ink/20 px-2 py-1">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => setQty(line.productId, line.color, line.qty - 1)}
                            >
                              <MinusIcon />
                            </button>
                            <span className="w-4 text-center text-sm tabular-nums">{line.qty}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQty(line.productId, line.color, line.qty + 1)}
                            >
                              <PlusIcon />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(line.productId, line.color)}
                            className="link-underline text-xs text-ink-soft"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="border-t border-ink/10 px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm uppercase tracking-widest text-ink-soft">
                  Subtotal
                </span>
                <span className="font-display text-2xl tabular-nums">{formatPrice(total)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">Taxes and shipping calculated at checkout.</p>
              <Link to="/checkout" onClick={close} className="btn-primary mt-4 w-full">
                Checkout
                <ArrowIcon />
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
