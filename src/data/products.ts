export type ProductColor = {
  name: string
  hex: string
}

export type Product = {
  id: string
  slug: string
  name: string
  tagline: string
  price: number
  category: 'Totes' | 'Backpacks' | 'Crossbody' | 'Weekenders' | 'Wallets'
  material: string
  colors: ProductColor[]
  // Two-tone swatch used to render the generative product artwork
  art: { base: string; accent: string; strap: string }
  description: string
  details: string[]
  badge?: 'New' | 'Bestseller' | 'Last few'
  rating: number
  reviews: number
}

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'the-workhorse-tote',
    name: 'The Workhorse Tote',
    tagline: 'A bottomless everyday carry',
    price: 248,
    category: 'Totes',
    material: 'Full-grain veg-tanned leather',
    colors: [
      { name: 'Espresso', hex: '#3A2A1C' },
      { name: 'Tan', hex: '#C99B6A' },
      { name: 'Ink', hex: '#17130E' },
    ],
    art: { base: '#7A4B26', accent: '#C99B6A', strap: '#3A2A1C' },
    description:
      'The bag we reach for on the days that ask the most. Roomy enough for a 16" laptop, a change of clothes, and the groceries you grabbed on the way home.',
    details: [
      'Fits a 16" laptop with room to spare',
      'Riveted handles rated to 40 lbs',
      'Waxed canvas lining with two slip pockets',
      'Ages into a one-of-a-kind patina',
    ],
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 412,
  },
  {
    id: 'p2',
    slug: 'field-backpack',
    name: 'Field Backpack',
    tagline: 'Roll-top, weatherproof, unbothered',
    price: 295,
    category: 'Backpacks',
    material: 'Waxed cotton & bridle leather',
    colors: [
      { name: 'Moss', hex: '#5A5A36' },
      { name: 'Charcoal', hex: '#2E2E2E' },
      { name: 'Sand', hex: '#C9B68A' },
    ],
    art: { base: '#5A5A36', accent: '#C9B68A', strap: '#2E2E2E' },
    description:
      'A roll-top that shrugs off a downpour and swallows a weekend. Built for the commute and the trail without pretending to be either.',
    details: [
      '22L roll-top, expands to 28L',
      'Padded laptop sleeve up to 15"',
      'Magnetic side pockets',
      'Seam-sealed waxed cotton shell',
    ],
    badge: 'New',
    rating: 4.8,
    reviews: 188,
  },
  {
    id: 'p3',
    slug: 'sidekick-crossbody',
    name: 'Sidekick Crossbody',
    tagline: 'Hands free, head clear',
    price: 138,
    category: 'Crossbody',
    material: 'Pebbled leather',
    colors: [
      { name: 'Clay', hex: '#BE4A24' },
      { name: 'Black', hex: '#17130E' },
      { name: 'Bone', hex: '#EDE6D6' },
    ],
    art: { base: '#BE4A24', accent: '#EDE6D6', strap: '#9C3A18' },
    description:
      'The little bag that does a lot. Phone, passport, keys, and the one notebook you actually use — slung close and out of the way.',
    details: [
      'Adjustable webbing strap',
      'Hidden back zip pocket',
      'Fits most phones up to 6.9"',
      'YKK hardware throughout',
    ],
    badge: 'Bestseller',
    rating: 4.7,
    reviews: 264,
  },
  {
    id: 'p4',
    slug: 'overnight-weekender',
    name: 'Overnight Weekender',
    tagline: 'Two days, one bag',
    price: 365,
    category: 'Weekenders',
    material: 'Full-grain leather & brass',
    colors: [
      { name: 'Whiskey', hex: '#8A4B2A' },
      { name: 'Ink', hex: '#17130E' },
    ],
    art: { base: '#8A4B2A', accent: '#C99B6A', strap: '#5A3318' },
    description:
      'Everything you need for forty-eight hours away and nothing you don’t. The duffel that earns its spot in the overhead bin.',
    details: [
      'Carry-on compliant 40L',
      'Removable shoe / laundry pouch',
      'Solid brass feet and zips',
      'Trolley sleeve for your roller',
    ],
    badge: 'Last few',
    rating: 4.9,
    reviews: 97,
  },
  {
    id: 'p5',
    slug: 'everyday-bifold',
    name: 'Everyday Bifold',
    tagline: 'Slim where it counts',
    price: 78,
    category: 'Wallets',
    material: 'Shell cordovan',
    colors: [
      { name: 'Oxblood', hex: '#5E1F18' },
      { name: 'Black', hex: '#17130E' },
      { name: 'Tan', hex: '#C99B6A' },
    ],
    art: { base: '#5E1F18', accent: '#C99B6A', strap: '#3A0F0B' },
    description:
      'A bifold that breaks in like a good pair of boots. Six cards, a few bills, and decades of stories.',
    details: [
      'Holds 6–8 cards',
      'Hand-burnished edges',
      'RFID-blocking liner',
      'Cut from a single hide',
    ],
    rating: 4.8,
    reviews: 531,
  },
  {
    id: 'p6',
    slug: 'market-tote-mini',
    name: 'Market Tote Mini',
    tagline: 'Small errands, big character',
    price: 168,
    category: 'Totes',
    material: 'Vegetable-tanned leather',
    colors: [
      { name: 'Tan', hex: '#C99B6A' },
      { name: 'Olive', hex: '#5A5A36' },
    ],
    art: { base: '#C99B6A', accent: '#7A4B26', strap: '#5A3318' },
    description:
      'The scaled-down Workhorse for the days you travel light. Just enough for a book, a baguette, and tomorrow’s plans.',
    details: [
      'Fits an iPad and a paperback',
      'Open-top, easy-in design',
      'Single interior key leash',
      'Patinas beautifully in months',
    ],
    badge: 'New',
    rating: 4.6,
    reviews: 73,
  },
  {
    id: 'p7',
    slug: 'commuter-sling',
    name: 'Commuter Sling',
    tagline: 'The 8am sprint, sorted',
    price: 152,
    category: 'Crossbody',
    material: 'Ballistic nylon & leather',
    colors: [
      { name: 'Black', hex: '#17130E' },
      { name: 'Steel', hex: '#4A4F54' },
    ],
    art: { base: '#4A4F54', accent: '#C99B6A', strap: '#17130E' },
    description:
      'A sling that keeps the essentials front and center for the days the train won’t wait. Swing it around, grab your pass, go.',
    details: [
      'Quick-access magnetic flap',
      'Tablet sleeve up to 11"',
      'Water-resistant ballistic shell',
      'One-pull strap adjuster',
    ],
    rating: 4.7,
    reviews: 142,
  },
  {
    id: 'p8',
    slug: 'atlas-backpack',
    name: 'Atlas Backpack',
    tagline: 'For the long haul',
    price: 268,
    category: 'Backpacks',
    material: 'Full-grain leather',
    colors: [
      { name: 'Ink', hex: '#17130E' },
      { name: 'Whiskey', hex: '#8A4B2A' },
    ],
    art: { base: '#17130E', accent: '#C99B6A', strap: '#3A2A1C' },
    description:
      'A structured leather pack that looks as good in the boardroom as it does on the red-eye. Quietly capable, built to outlast the job.',
    details: [
      '18L structured body',
      'Padded 16" laptop bay',
      'Luggage pass-through',
      'Antique brass hardware',
    ],
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 209,
  },
]

export const categories = [
  'All',
  'Totes',
  'Backpacks',
  'Crossbody',
  'Weekenders',
  'Wallets',
] as const

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function formatPrice(cents: number) {
  return `$${cents.toFixed(0)}`
}

/* ─────────────────────────────────────────────────────────────
 * Inventory
 *
 * Per-variant stock lives here in the data layer rather than being
 * hand-keyed onto every colour. A small override map drives the
 * interesting demo states (low stock, sold out); everything else
 * defaults to a healthy count.
 * ──────────────────────────────────────────────────────────── */

export type StockState = 'in' | 'low' | 'out'

// `${productId}:${colorName}` → units on hand
const INVENTORY: Record<string, number> = {
  // Overnight Weekender — the "Last few" hero of scarcity
  'p4:Whiskey': 3,
  'p4:Ink': 2,
  // Atlas Backpack — one colourway sold out, one healthy
  'p8:Whiskey': 0,
  'p8:Ink': 9,
  // Market Tote Mini — running low on olive
  'p6:Olive': 4,
}

const DEFAULT_STOCK = 12

export function variantStock(productId: string, color: string): number {
  const key = `${productId}:${color}`
  return key in INVENTORY ? INVENTORY[key] : DEFAULT_STOCK
}

export function stockStateOf(units: number): StockState {
  if (units <= 0) return 'out'
  if (units <= 5) return 'low'
  return 'in'
}

/** A product is sold out only when every colourway is out. */
export function productStock(product: Product): number {
  return product.colors.reduce((n, c) => n + variantStock(product.id, c.name), 0)
}

export function firstAvailableColor(product: Product): ProductColor | undefined {
  return (
    product.colors.find((c) => variantStock(product.id, c.name) > 0) ??
    product.colors[0]
  )
}
