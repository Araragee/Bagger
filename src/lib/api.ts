/**
 * Service API — the one seam between the app and its "backend".
 *
 * Today it's backed by localStorage (see db.ts) with simulated latency so the
 * UI exercises real loading/error states. To go live, reimplement these methods
 * against Supabase / Stripe / your API of choice — the calling code (stores,
 * pages) never changes.
 */
import { db, latency, uid } from './db'
import {
  products as catalogue,
  getProduct,
  variantStock,
  type Product,
} from '../data/products'

/* ───────────────────────── Types ───────────────────────── */

export type Address = {
  fname: string
  lname: string
  address: string
  city: string
  state: string
  zip: string
}

export type StoredUser = {
  id: string
  name: string
  email: string
  passwordHash: string
  addresses: Address[]
  createdAt: number
}

export type User = Omit<StoredUser, 'passwordHash'>

export type OrderItem = {
  productId: string
  slug: string
  name: string
  color: string
  qty: number
  price: number
}

export type Order = {
  id: string
  number: string
  userId: string | null
  email: string
  items: OrderItem[]
  address: Address
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  promoCode: string | null
  status: 'paid' | 'fulfilled'
  createdAt: number
}

export type Quote = {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  promoCode: string | null
}

export class ApiError extends Error {}

/* ─────────────────────── Helpers ───────────────────────── */

// Demo-only password obfuscation (djb2). Real auth hashes server-side.
function hash(s: string): string {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i)
  return (h >>> 0).toString(16)
}

function publicUser(u: StoredUser): User {
  const { passwordHash: _pw, ...rest } = u
  return rest
}

const TAX_RATE = 0.0825
const FLAT_SHIPPING = 12
const FREE_SHIP_THRESHOLD = 150

const PROMOS: Record<string, { kind: 'percent' | 'freeship'; value: number; label: string }> = {
  WORNIN10: { kind: 'percent', value: 0.1, label: '10% off' },
  LEATHER20: { kind: 'percent', value: 0.2, label: '20% off' },
  FREESHIP: { kind: 'freeship', value: 0, label: 'Free shipping' },
}

/* ───────────────────────── API ─────────────────────────── */

export const api = {
  products: {
    async list(opts?: { category?: string }): Promise<Product[]> {
      await latency()
      if (!opts?.category || opts.category === 'All') return catalogue
      return catalogue.filter((p) => p.category === opts.category)
    },
    async get(slug: string): Promise<Product | undefined> {
      await latency()
      return getProduct(slug)
    },
  },

  auth: {
    async register(input: {
      name: string
      email: string
      password: string
    }): Promise<User> {
      await latency()
      const email = input.email.trim().toLowerCase()
      const users = db.collection<StoredUser>('users')
      if (Object.values(users).some((u) => u.email === email)) {
        throw new ApiError('An account with that email already exists.')
      }
      if (input.password.length < 6) {
        throw new ApiError('Password must be at least 6 characters.')
      }
      const user: StoredUser = {
        id: uid('U'),
        name: input.name.trim(),
        email,
        passwordHash: hash(input.password),
        addresses: [],
        createdAt: Date.now(),
      }
      db.upsert('users', user.id, user)
      db.write('session', user.id)
      return publicUser(user)
    },

    async login(input: { email: string; password: string }): Promise<User> {
      await latency()
      const email = input.email.trim().toLowerCase()
      const users = db.collection<StoredUser>('users')
      const user = Object.values(users).find((u) => u.email === email)
      if (!user || user.passwordHash !== hash(input.password)) {
        throw new ApiError('Email or password is incorrect.')
      }
      db.write('session', user.id)
      return publicUser(user)
    },

    current(): User | null {
      const id = db.read<string | null>('session', null)
      if (!id) return null
      const user = db.collection<StoredUser>('users')[id]
      return user ? publicUser(user) : null
    },

    logout(): void {
      db.write('session', null)
    },

    async saveAddress(userId: string, address: Address): Promise<User> {
      await latency(120, 280)
      const users = db.collection<StoredUser>('users')
      const user = users[userId]
      if (!user) throw new ApiError('Not signed in.')
      // de-dupe identical addresses
      const exists = user.addresses.some(
        (a) => a.address === address.address && a.zip === address.zip,
      )
      if (!exists) user.addresses = [address, ...user.addresses].slice(0, 4)
      db.upsert('users', userId, user)
      return publicUser(user)
    },
  },

  checkout: {
    /** Validate a promo code without applying it. */
    validatePromo(code: string): { label: string } {
      const promo = PROMOS[code.trim().toUpperCase()]
      if (!promo) throw new ApiError('That code isn’t valid.')
      return { label: promo.label }
    },

    /** Compute discount, shipping, tax and total for a subtotal. */
    quote(input: { subtotal: number; promoCode?: string | null }): Quote {
      const subtotal = input.subtotal
      const code = input.promoCode?.trim().toUpperCase() || null
      const promo = code ? PROMOS[code] : undefined

      let discount = 0
      let freeship = false
      if (promo?.kind === 'percent') discount = Math.round(subtotal * promo.value)
      if (promo?.kind === 'freeship') freeship = true

      const taxable = Math.max(0, subtotal - discount)
      const shipping =
        subtotal === 0 || taxable >= FREE_SHIP_THRESHOLD || freeship
          ? 0
          : FLAT_SHIPPING
      const tax = Math.round(taxable * TAX_RATE)
      const total = taxable + shipping + tax

      return {
        subtotal,
        discount,
        shipping,
        tax,
        total,
        promoCode: promo ? code : null,
      }
    },
  },

  orders: {
    async create(input: {
      userId: string | null
      email: string
      items: OrderItem[]
      address: Address
      promoCode: string | null
      // simulate a payment method — card ending in 0002 is declined
      cardNumber: string
    }): Promise<Order> {
      await latency(400, 900)

      // Inventory guard — refuse if any line exceeds available stock
      for (const item of input.items) {
        if (item.qty > variantStock(item.productId, item.color)) {
          throw new ApiError(`${item.name} (${item.color}) just sold out.`)
        }
      }

      // Simulated payment authorisation
      const digits = input.cardNumber.replace(/\s/g, '')
      if (digits.endsWith('0002')) {
        throw new ApiError('Your card was declined. Please try another card.')
      }

      const subtotal = input.items.reduce((s, i) => s + i.price * i.qty, 0)
      const quote = api.checkout.quote({ subtotal, promoCode: input.promoCode })

      const order: Order = {
        id: uid('O'),
        number: 'BG-' + uid().slice(0, 6),
        userId: input.userId,
        email: input.email.trim().toLowerCase(),
        items: input.items,
        address: input.address,
        subtotal,
        discount: quote.discount,
        shipping: quote.shipping,
        tax: quote.tax,
        total: quote.total,
        promoCode: quote.promoCode,
        status: 'paid',
        createdAt: Date.now(),
      }
      db.upsert('orders', order.id, order)
      return order
    },

    async listForUser(userId: string): Promise<Order[]> {
      await latency(150, 350)
      return Object.values(db.collection<Order>('orders'))
        .filter((o) => o.userId === userId)
        .sort((a, b) => b.createdAt - a.createdAt)
    },

    async get(id: string): Promise<Order | undefined> {
      await latency(120, 260)
      return db.collection<Order>('orders')[id]
    },
  },
}
