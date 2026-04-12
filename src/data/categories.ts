import type { VisualMode } from '../composables/useMode'
import type { ProductCategory } from './products'

export interface Category {
  slug: ProductCategory
  name: string
  pluralName: string
  defaultMode: VisualMode
  heroTagline: string
  description: string
  heroImage: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'bag',
    name: 'Bag',
    pluralName: 'Bags',
    defaultMode: 'modern',
    heroTagline: 'Sculptural. Structural. Enduring.',
    description: 'Sculptural silhouettes and timeless leather craftsmanship from 1970–1995. Each piece is selected for construction integrity and provenance.',
    heroImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1600',
  },
  {
    slug: 'shirt',
    name: 'Shirt',
    pluralName: 'Shirts',
    defaultMode: 'retro',
    heroTagline: 'The Archive of Silk & Cotton.',
    description: 'Single-stitch construction, natural fibres, and graphics that were already vintage when they were new. Shirts from the era before fast fashion.',
    heroImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1600',
  },
  {
    slug: 'jacket',
    name: 'Jacket',
    pluralName: 'Jackets',
    defaultMode: 'modern',
    heroTagline: 'Tailored. Worn-In. Irreplaceable.',
    description: 'From hand-canvassed blazers to broken-in leather motos. Outerwear built with the intention of lasting forever — and then some.',
    heroImage: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=1600',
  },
  {
    slug: 'sweater',
    name: 'Sweater',
    pluralName: 'Sweaters',
    defaultMode: 'poppy',
    heroTagline: 'Knit From Another Era.',
    description: 'Fair Isle patterns, hand-spun wools, and cashmere that has only improved with age. Sweaters as textile art.',
    heroImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1600',
  },
  {
    slug: 'shoe',
    name: 'Shoe',
    pluralName: 'Shoes',
    defaultMode: 'modern',
    heroTagline: 'From Brutalist Boot to Elegant Loafer.',
    description: 'Footwear selected for structural integrity, premium materials, and the kind of sole construction that simply does not exist at scale anymore.',
    heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1600',
  },
  {
    slug: 'short',
    name: 'Short',
    pluralName: 'Shorts',
    defaultMode: 'retro',
    heroTagline: 'Tailored Leisure. Uncompromised.',
    description: 'High-waisted, properly cut, and made in fabrics that drape. Shorts from a time when casual still meant quality.',
    heroImage: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&q=80&w=1600',
  },
  {
    slug: 'accessory',
    name: 'Accessory',
    pluralName: 'Accessories',
    defaultMode: 'poppy',
    heroTagline: 'The Detail That Changes Everything.',
    description: 'Silk scarves, heavy chains, structured hats. The pieces that transform an outfit into a statement.',
    heroImage: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=1600',
  },
]

/** Find category by slug */
export function getCategoryBySlug(slug: ProductCategory): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug)
}
