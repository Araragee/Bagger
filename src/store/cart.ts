import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { products, type Product } from '../data/products'

export type CartLine = {
  productId: string
  color: string
  qty: number
}

type CartState = {
  lines: CartLine[]
  isOpen: boolean
  add: (productId: string, color: string, qty?: number) => void
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
      add: (productId, color, qty = 1) =>
        set((s) => {
          const existing = s.lines.find(
            (l) => l.productId === productId && l.color === color,
          )
          if (existing) {
            return {
              isOpen: true,
              lines: s.lines.map((l) =>
                l === existing ? { ...l, qty: l.qty + qty } : l,
              ),
            }
          }
          return { isOpen: true, lines: [...s.lines, { productId, color, qty }] }
        }),
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
                ? { ...l, qty: Math.max(0, qty) }
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
