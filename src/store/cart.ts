import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { products, variantStock, type Product } from '../data/products'
import type { OrderItem } from '../lib/api'

export type CartLine = {
  productId: string
  color: string
  qty: number
}

type AddResult = 'added' | 'out-of-stock' | 'max-reached'

type CartState = {
  lines: CartLine[]
  isOpen: boolean
  /** Returns whether the add succeeded so callers can surface feedback. */
  add: (productId: string, color: string, qty?: number) => AddResult
  remove: (productId: string, color: string) => void
  setQty: (productId: string, color: string, qty: number) => void
  clear: () => void
  open: () => void
  close: () => void
  toggle: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      add: (productId, color, qty = 1) => {
        const stock = variantStock(productId, color)
        if (stock <= 0) return 'out-of-stock'
        let result: AddResult = 'added'
        set((s) => {
          const existing = s.lines.find(
            (l) => l.productId === productId && l.color === color,
          )
          const current = existing?.qty ?? 0
          const next = Math.min(current + qty, stock)
          if (next === current) {
            result = 'max-reached'
            return { isOpen: true }
          }
          if (existing) {
            return {
              isOpen: true,
              lines: s.lines.map((l) =>
                l === existing ? { ...l, qty: next } : l,
              ),
            }
          }
          return { isOpen: true, lines: [...s.lines, { productId, color, qty: next }] }
        })
        return result
      },
      remove: (productId, color) =>
        set((s) => ({
          lines: s.lines.filter(
            (l) => !(l.productId === productId && l.color === color),
          ),
        })),
      setQty: (productId, color, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) =>
              l.productId === productId && l.color === color
                ? { ...l, qty: Math.min(Math.max(0, qty), variantStock(productId, color)) }
                : l,
            )
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: 'bagger-cart' },
  ),
)

export function lineProduct(line: CartLine): Product | undefined {
  return products.find((p) => p.id === line.productId)
}

export function useCartCount() {
  return useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0))
}

export function useCartTotal() {
  return useCart((s) =>
    s.lines.reduce((sum, l) => {
      const p = products.find((pp) => pp.id === l.productId)
      return sum + (p ? p.price * l.qty : 0)
    }, 0),
  )
}

/** Build the order payload from current cart lines. */
export function cartToOrderItems(lines: CartLine[]): OrderItem[] {
  return lines.flatMap((l) => {
    const p = products.find((pp) => pp.id === l.productId)
    if (!p) return []
    return [
      {
        productId: p.id,
        slug: p.slug,
        name: p.name,
        color: l.color,
        qty: l.qty,
        price: p.price,
      },
    ]
  })
}
