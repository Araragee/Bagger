import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart, useCartTotal, lineProduct } from '../store/cart'
import { formatPrice } from '../data/products'
import ProductArt from '../components/ProductArt'

export default function Checkout() {
  const { lines, clear } = useCart()
  const subtotal = useCartTotal()
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12
  const total = subtotal + shipping
  const [placed, setPlaced] = useState(false)
  const navigate = useNavigate()

  if (placed) {
    return (
      <div className="container-wide flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-moss text-cream">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-4xl font-light">Order placed.</h1>
        <p className="mt-3 max-w-sm text-ink-soft">
          This is a demo, so no card was charged — but in the real world your bag
          would already be on its way. A receipt is on its way to your inbox.
        </p>
        <Link to="/shop" className="btn-primary mt-8">
          Keep shopping
        </Link>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="container-wide flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl font-light">Your bag is empty.</h1>
        <p className="mt-3 text-ink-soft">Add something worth checking out for.</p>
        <Link to="/shop" className="btn-primary mt-8">
          Browse the collection
        </Link>
      </div>
    )
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clear()
    setPlaced(true)
    window.scrollTo(0, 0)
  }

  return (
    <div className="container-wide py-10">
      <button onClick={() => navigate(-1)} className="link-underline mb-6 text-sm text-ink-soft">
        ← Back
      </button>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Form */}
        <form onSubmit={onSubmit} className="order-2 lg:order-1">
          <h1 className="font-display text-4xl font-light">Checkout</h1>

          <Fieldset legend="Contact">
            <Input label="Email" type="email" name="email" autoComplete="email" required />
          </Fieldset>

          <Fieldset legend="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First name" name="fname" autoComplete="given-name" required />
              <Input label="Last name" name="lname" autoComplete="family-name" required />
            </div>
            <Input label="Address" name="address" autoComplete="street-address" required />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="City" name="city" autoComplete="address-level2" required />
              <Input label="State" name="state" autoComplete="address-level1" required />
              <Input label="ZIP" name="zip" autoComplete="postal-code" required />
            </div>
          </Fieldset>

          <Fieldset legend="Payment">
            <p className="mb-3 rounded-xl bg-bone-200 px-4 py-3 text-xs text-ink-soft">
              Demo only — no real card is processed. Enter anything.
            </p>
            <Input label="Card number" name="card" placeholder="4242 4242 4242 4242" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Expiry" name="exp" placeholder="MM / YY" required />
              <Input label="CVC" name="cvc" placeholder="123" required />
            </div>
          </Fieldset>

          <button type="submit" className="btn-primary mt-8 w-full">
            Pay {formatPrice(total)}
          </button>
        </form>

        {/* Summary */}
        <aside className="order-1 h-fit rounded-2xl border border-ink/10 bg-cream p-6 lg:order-2 lg:sticky lg:top-24">
          <h2 className="font-display text-xl">Order summary</h2>
          <ul className="mt-5 space-y-4">
            {lines.map((line) => {
              const p = lineProduct(line)
              if (!p) return null
              return (
                <li key={`${line.productId}-${line.color}`} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-bone-200">
                    <ProductArt product={p} className="h-full w-full" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[0.65rem] text-cream">
                      {line.qty}
                    </span>
                  </div>
                  <div className="flex flex-1 justify-between gap-2">
                    <div>
                      <p className="font-display text-sm leading-tight">{p.name}</p>
                      <p className="text-xs text-ink-soft">{line.color}</p>
                    </div>
                    <span className="text-sm tabular-nums">{formatPrice(p.price * line.qty)}</span>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
            <div className="flex items-center justify-between border-t border-ink/10 pt-3">
              <span className="font-sans uppercase tracking-widest">Total</span>
              <span className="font-display text-2xl">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-8 space-y-4">
      <legend className="eyebrow mb-2">{legend}</legend>
      {children}
    </fieldset>
  )
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-ink-soft">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-ink/20 bg-bone/40 px-4 py-3 font-sans text-sm placeholder:text-ink-soft/50 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
      />
    </label>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-ink-soft">
      <span>{label}</span>
      <span className="tabular-nums text-ink">{value}</span>
    </div>
  )
}
