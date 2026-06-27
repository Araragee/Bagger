export type Errors<T extends string> = Partial<Record<T, string>>

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

export const required = (v: string) => v.trim().length > 0

/** Loose card checks — enough to feel real without a real PSP. */
export const isCardNumber = (v: string) => {
  const d = v.replace(/\s/g, '')
  return /^\d{13,19}$/.test(d)
}

export const isExpiry = (v: string) => {
  const m = v.match(/^(\d{2})\s*\/\s*(\d{2})$/)
  if (!m) return false
  const month = Number(m[1])
  return month >= 1 && month <= 12
}

export const isCvc = (v: string) => /^\d{3,4}$/.test(v.trim())

export const isZip = (v: string) => /^\d{4,10}(-\d{4})?$/.test(v.trim())

/** Format a raw card string into groups of four as the user types. */
export const formatCardNumber = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim()

export const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}
