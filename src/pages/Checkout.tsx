import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart, useCartTotal, lineProduct, cartToOrderItems } from '../store/cart'
import { useAuth } from '../store/auth'
import { useToast } from '../store/toast'
import { api, ApiError, type Address } from '../lib/api'
import { formatPrice } from '../data/products'
import {
  isEmail,
  required,
  isCardNumber,
  isExpiry,
  isCvc,
  isZip,
  formatCardNumber,
  formatExpiry,
  type Errors,
} from '../lib/validation'
import { useTitle } from '../lib/useTitle'
import ProductArt from '../components/ProductArt'

type Field =
  | 'email' | 'fname' | 'lname' | 'address' | 'city' | 'state' | 'zip'
  | 'card' | 'exp' | 'cvc'

export default function Checkout() {
  useTitle('Checkout')
  const { lines, clear } = useCart()
  const subtotal = useCartTotal()
  const { user, saveAddress } = useAuth()
  const pushToast = useToast((s) => s.push)
  const navigate = useNavigate()

  const prefill = user?.addresses[0]
  const [form, setForm] = useState<Record<Field, string>>({
    email: user?.email ?? '',
    fname: prefill?.fname ?? user?.name.split(' ')[0] ?? '',
    lname: prefill?.lname ?? user?.name.split(' ').slice(1).join(' ') ?? '',
    address: prefill?.address ?? '',
    city: prefill?.city ?? '',
    state: prefill?.state ?? '',
    zip: prefill?.zip ?? '',
    card: '',
    exp: '',
    cvc: '',
  })
  const [errors, setErrors] = useState<Errors<Field>>({})
  const [submitting, setSubmitting] = useState(false)

  // Promo
  const [promoInput, setPromoInput] = useState('')
  const [promoCode, setPromoCode] = useState<string | null>(null)
  const [promoMsg, setPromoMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const quote = useMemo(
    () => api.checkout.quote({ subtotal, promoCode }),
    [subtotal, promoCode],
  )

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

  const set = (field: Field) => (value: string) => {
    let v = value
    if (field === 'card') v = formatCardNumber(value)
    if (field === 'exp') v = formatExpiry(value)
    if (field === 'cvc') v = value.replace(/\D/g, '').slice(0, 4)
    setForm((f) => ({ ...f, [field]: v }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const validate = (): boolean => {
    const e: Errors<Field> = {}
    if (!isEmail(form.email)) e.email = 'Enter a valid email.'
    if (!required(form.fname)) e.fname = 'Required.'
    if (!required(form.lname)) e.lname = 'Required.'
    if (!required(form.address)) e.address = 'Required.'
    if (!required(form.city)) e.city = 'Required.'
    if (!required(form.state)) e.state = 'Required.'
    if (!isZip(form.zip)) e.zip = 'Enter a valid ZIP.'
    if (!isCardNumber(form.card)) e.card = 'Enter a valid card number.'
    if (!isExpiry(form.exp)) e.exp = 'MM/YY.'
    if (!isCvc(form.cvc)) e.cvc = '3–4 digits.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const applyPromo = () => {
    const code = promoInput.trim()
    if (!code) return
    try {
      const { label } = api.checkout.validatePromo(code)
      setPromoCode(code.toUpperCase())
      setPromoMsg({ ok: true, text: `${label} applied` })
    } catch (err) {
      setPromoCode(null)
      setPromoMsg({ ok: false, text: err instanceof ApiError ? err.message : 'Invalid code.' })
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      pushToast('Please fix the highlighted fields.', 'error')
      return
    }
    setSubmitting(true)
    const address: Address = {
      fname: form.fname, lname: form.lname, address: form.address,
      city: form.city, state: form.state, zip: form.zip,
    }
    try {
      const order = await api.orders.create({
        userId: user?.id ?? null,
        email: form.email,
        items: cartToOrderItems(lines),
        address,
        promoCode,
        cardNumber: form.card,
      })
      if (user) await saveAddress(address).catch(() => {})
      clear()
      navigate(`/order/${order.id}`, { replace: true })
    } catch (err) {
      pushToast(err instanceof ApiError ? err.message : 'Could not place order.', 'error')
      setSubmitting(false)
    }
  }

  return (
    <div className="container-wide py-10">
      <button onClick={() => navigate(-1)} className="link-underline mb-6 text-sm text-ink-soft">
        ← Back
      </button>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Form */}
        <form onSubmit={onSubmit} noValidate className="order-2 lg:order-1">
          <h1 className="font-display text-4xl font-light">Checkout</h1>

          {!user && (
            <p className="mt-3 text-sm text-ink-soft">
              Checking out as a guest.{' '}
              <Link to="/account" className="link-underline text-ink">
                Sign in
              </Link>{' '}
              for faster checkout and order history.
            </p>
          )}

          <Fieldset legend="Contact">
            <Input label="Email" type="email" value={form.email} onChange={set('email')}
              error={errors.email} autoComplete="email" />
          </Fieldset>

          <Fieldset legend="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="First name" value={form.fname} onChange={set('fname')} error={errors.fname} autoComplete="given-name" />
              <Input label="Last name" value={form.lname} onChange={set('lname')} error={errors.lname} autoComplete="family-name" />
            </div>
            <Input label="Address" value={form.address} onChange={set('address')} error={errors.address} autoComplete="street-address" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="City" value={form.city} onChange={set('city')} error={errors.city} autoComplete="address-level2" />
              <Input label="State" value={form.state} onChange={set('state')} error={errors.state} autoComplete="address-level1" />
              <Input label="ZIP" value={form.zip} onChange={set('zip')} error={errors.zip} autoComplete="postal-code" inputMode="numeric" />
            </div>
          </Fieldset>

          <Fieldset legend="Payment">
            <p className="mb-3 rounded-xl bg-bone-200 px-4 py-3 text-xs text-ink-soft">
              Demo payments — no real card is charged. Use any number to succeed;
              a card ending in <span className="font-medium text-ink">0002</span> simulates a decline.
            </p>
            <Input label="Card number" value={form.card} onChange={set('card')} error={errors.card}
              placeholder="4242 4242 4242 4242" inputMode="numeric" autoComplete="cc-number" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Expiry" value={form.exp} onChange={set('exp')} error={errors.exp} placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" />
              <Input label="CVC" value={form.cvc} onChange={set('cvc')} error={errors.cvc} placeholder="123" inputMode="numeric" autoComplete="cc-csc" />
            </div>
          </Fieldset>

          <button type="submit" disabled={submitting} className="btn-primary mt-8 w-full disabled:opacity-60">
            {submitting ? 'Processing…' : `Pay ${formatPrice(quote.total)}`}
          </button>
          <p className="mt-3 text-center text-xs text-ink-soft">
            🔒 This is a demo — entered details are never sent anywhere.
          </p>
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

          {/* Promo */}
          <div className="mt-6 border-t border-ink/10 pt-4">
            <div className="flex gap-2">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code"
                className="w-full rounded-full border border-ink/20 bg-bone/40 px-4 py-2.5 text-sm uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal focus:border-ink focus:outline-none"
              />
              <button type="button" onClick={applyPromo} className="shrink-0 rounded-full border border-ink/30 px-5 text-sm uppercase tracking-widest hover:bg-ink hover:text-cream">
                Apply
              </button>
            </div>
            {promoMsg && (
              <p className={`mt-2 text-xs ${promoMsg.ok ? 'text-moss' : 'text-clay'}`}>{promoMsg.text}</p>
            )}
            <p className="mt-2 text-[0.7rem] text-ink-soft">Try <span className="font-medium">WORNIN10</span> or <span className="font-medium">FREESHIP</span>.</p>
          </div>

          <div className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <Row label="Subtotal" value={formatPrice(quote.subtotal)} />
            {quote.discount > 0 && (
              <Row label={`Discount${promoCode ? ` (${promoCode})` : ''}`} value={`−${formatPrice(quote.discount)}`} accent />
            )}
            <Row label="Shipping" value={quote.shipping === 0 ? 'Free' : formatPrice(quote.shipping)} />
            <Row label="Tax" value={formatPrice(quote.tax)} />
            <div className="flex items-center justify-between border-t border-ink/10 pt-3">
              <span className="font-sans uppercase tracking-widest">Total</span>
              <span className="font-display text-2xl">{formatPrice(quote.total)}</span>
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

function Input({
  label, value, onChange, error, ...props
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-ink-soft">{label}</span>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`w-full rounded-xl border bg-bone/40 px-4 py-3 font-sans text-sm placeholder:text-ink-soft/50 focus:outline-none focus:ring-1 ${
          error ? 'border-clay focus:border-clay focus:ring-clay' : 'border-ink/20 focus:border-ink focus:ring-ink'
        }`}
      />
      {error && <span className="mt-1 block text-xs text-clay">{error}</span>}
    </label>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between text-ink-soft">
      <span>{label}</span>
      <span className={`tabular-nums ${accent ? 'text-moss' : 'text-ink'}`}>{value}</span>
    </div>
  )
}
