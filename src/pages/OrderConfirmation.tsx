import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, type Order } from '../lib/api'
import { formatPrice, getProduct } from '../data/products'
import { useTitle } from '../lib/useTitle'
import ProductArt from '../components/ProductArt'
import NotFound from './NotFound'

export default function OrderConfirmation() {
  useTitle('Order confirmed')
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null | undefined>(undefined)

  useEffect(() => {
    let alive = true
    if (!id) return setOrder(null)
    api.orders.get(id).then((o) => alive && setOrder(o ?? null))
    return () => {
      alive = false
    }
  }, [id])

  if (order === undefined) {
    return (
      <div className="container-wide flex min-h-[50vh] items-center justify-center">
        <p className="animate-pulse text-ink-soft">Loading your order…</p>
      </div>
    )
  }
  if (order === null) return <NotFound />

  const eta = new Date(order.createdAt + 1000 * 60 * 60 * 24 * 4).toLocaleDateString(
    undefined,
    { weekday: 'long', month: 'long', day: 'numeric' },
  )

  return (
    <div className="container-wide max-w-3xl py-12">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss text-cream">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-4xl font-light">Thank you, {order.address.fname}.</h1>
        <p className="mt-3 text-ink-soft">
          Order <span className="font-medium text-ink">{order.number}</span> is confirmed.
          A receipt is on its way to {order.email}.
        </p>
        <p className="mt-1 text-sm text-ink-soft">Estimated delivery — {eta}</p>
        <p className="mx-auto mt-3 max-w-md text-xs text-ink-soft">
          This is a demo, so no card was charged and nothing will actually ship — but
          your order is saved and viewable in your account.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 p-6">
          <h2 className="eyebrow">Shipping to</h2>
          <address className="mt-3 not-italic text-sm leading-relaxed text-ink-soft">
            {order.address.fname} {order.address.lname}<br />
            {order.address.address}<br />
            {order.address.city}, {order.address.state} {order.address.zip}
          </address>
        </div>
        <div className="rounded-2xl border border-ink/10 p-6">
          <h2 className="eyebrow">Payment</h2>
          <dl className="mt-3 space-y-1.5 text-sm text-ink-soft">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{formatPrice(order.subtotal)}</dd></div>
            {order.discount > 0 && (
              <div className="flex justify-between text-moss"><dt>Discount</dt><dd className="tabular-nums">−{formatPrice(order.discount)}</dd></div>
            )}
            <div className="flex justify-between"><dt>Shipping</dt><dd className="tabular-nums">{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</dd></div>
            <div className="flex justify-between"><dt>Tax</dt><dd className="tabular-nums">{formatPrice(order.tax)}</dd></div>
            <div className="flex justify-between border-t border-ink/10 pt-2 font-medium text-ink"><dt>Total</dt><dd className="tabular-nums">{formatPrice(order.total)}</dd></div>
          </dl>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-ink/10 p-6">
        <h2 className="eyebrow">Your items</h2>
        <ul className="mt-4 space-y-4">
          {order.items.map((item) => {
            const p = getProduct(item.slug)
            return (
              <li key={`${item.productId}-${item.color}`} className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-bone-200">
                  {p && <ProductArt product={p} className="h-full w-full" />}
                </div>
                <div className="flex-1">
                  <p className="font-display">{item.name}</p>
                  <p className="text-xs text-ink-soft">{item.color} · Qty {item.qty}</p>
                </div>
                <span className="text-sm tabular-nums">{formatPrice(item.price * item.qty)}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="btn-primary">Keep shopping</Link>
        <Link to="/account" className="btn-ghost">View in account</Link>
      </div>
    </div>
  )
}
