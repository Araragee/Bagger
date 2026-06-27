import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { api, type Order } from '../lib/api'
import { formatPrice } from '../data/products'
import { isEmail } from '../lib/validation'
import { useTitle } from '../lib/useTitle'

export default function Account() {
  const { user } = useAuth()
  useTitle(user ? 'Your account' : 'Sign in')
  return (
    <div className="container-wide py-12">
      {user ? <Dashboard /> : <AuthForms />}
    </div>
  )
}

/* ───────────────────────── Auth ───────────────────────── */

function AuthForms() {
  const { login, register, loading, error, clearError } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [localErr, setLocalErr] = useState<string | null>(null)

  const switchMode = (m: 'login' | 'register') => {
    setMode(m)
    setLocalErr(null)
    clearError()
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalErr(null)
    if (!isEmail(form.email)) return setLocalErr('Enter a valid email.')
    if (mode === 'register' && form.name.trim().length < 2)
      return setLocalErr('Tell us your name.')
    if (form.password.length < 6) return setLocalErr('Password must be at least 6 characters.')
    if (mode === 'login') await login({ email: form.email, password: form.password })
    else await register(form)
  }

  return (
    <div className="mx-auto max-w-md">
      <span className="eyebrow">Account</span>
      <h1 className="mt-2 font-display text-4xl font-light">
        {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        {mode === 'login'
          ? 'Sign in to track orders and check out faster.'
          : 'Save your details, track orders, and earn repair credit.'}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-bone-200 p-1 text-sm">
        {(['login', 'register'] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`rounded-full py-2 capitalize transition-colors ${
              mode === m ? 'bg-ink text-cream' : 'text-ink-soft'
            }`}
          >
            {m === 'login' ? 'Sign in' : 'Register'}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        {mode === 'register' && (
          <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} autoComplete="name" />
        )}
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} autoComplete="email" />
        <Field label="Password" type="password" value={form.password} onChange={(v) => setForm((f) => ({ ...f, password: v }))} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />

        {(localErr || error) && (
          <p className="rounded-xl bg-clay/10 px-4 py-3 text-sm text-clay-deep">{localErr || error}</p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? 'One moment…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-ink-soft">
        Demo accounts are stored locally in your browser only.
      </p>
    </div>
  )
}

/* ──────────────────────── Dashboard ───────────────────── */

function Dashboard() {
  const { user, logout } = useAuth()
  const [orders, setOrders] = useState<Order[] | null>(null)

  useEffect(() => {
    if (!user) return
    let alive = true
    api.orders.listForUser(user.id).then((o) => alive && setOrders(o))
    return () => {
      alive = false
    }
  }, [user])

  if (!user) return null

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-6">
        <div>
          <span className="eyebrow">Your account</span>
          <h1 className="mt-2 font-display text-4xl font-light">Hi, {user.name.split(' ')[0]}.</h1>
          <p className="mt-1 text-sm text-ink-soft">{user.email}</p>
        </div>
        <button onClick={logout} className="btn-ghost py-2.5">Sign out</button>
      </div>

      {/* Orders */}
      <section className="mt-8">
        <h2 className="font-display text-2xl">Order history</h2>
        {orders === null ? (
          <p className="mt-4 animate-pulse text-sm text-ink-soft">Loading orders…</p>
        ) : orders.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-ink/20 p-8 text-center">
            <p className="text-ink-soft">No orders yet.</p>
            <Link to="/shop" className="btn-primary mt-4">Start shopping</Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {orders.map((o) => (
              <li key={o.id}>
                <Link
                  to={`/order/${o.id}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-ink/10 p-5 transition-colors hover:border-ink/40"
                >
                  <div>
                    <p className="font-medium">{o.number}</p>
                    <p className="text-xs text-ink-soft">
                      {new Date(o.createdAt).toLocaleDateString()} · {o.items.reduce((n, i) => n + i.qty, 0)} item(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="tabular-nums">{formatPrice(o.total)}</p>
                    <span className="text-xs capitalize text-moss">{o.status}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Addresses */}
      <section className="mt-10">
        <h2 className="font-display text-2xl">Saved addresses</h2>
        {user.addresses.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">
            No saved addresses yet — your shipping address is saved automatically at checkout.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {user.addresses.map((a, i) => (
              <div key={i} className="rounded-2xl border border-ink/10 p-5 text-sm text-ink-soft">
                <p className="font-medium text-ink">{a.fname} {a.lname}</p>
                <p className="mt-1">{a.address}</p>
                <p>{a.city}, {a.state} {a.zip}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

/* ───────────────────────── Field ──────────────────────── */

function Field({
  label, value, onChange, ...props
}: {
  label: string
  value: string
  onChange: (v: string) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-ink-soft">{label}</span>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/20 bg-bone/40 px-4 py-3 font-sans text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
      />
    </label>
  )
}
