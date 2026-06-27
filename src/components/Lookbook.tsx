import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductArt from './ProductArt'
import { ArrowIcon } from './Icons'

// Editorial campaign frames — asymmetric, magazine-style (Gucci-led)
const frames = [
  { product: products[0], tag: 'The Commute', span: 'tall' },
  { product: products[3], tag: 'The Getaway', span: 'wide' },
  { product: products[2], tag: 'The Everyday', span: 'std' },
  { product: products[7], tag: 'The Long Haul', span: 'tall' },
  { product: products[5], tag: 'The Errand', span: 'std' },
]

export default function Lookbook() {
  return (
    <section className="py-[var(--section-y)]">
      <div className="container-wide flex items-end justify-between">
        <div>
          <span className="eyebrow">Lookbook · SS26</span>
          <h2 className="mt-2 font-display text-fluid-3xl font-light">Worn into the everyday</h2>
        </div>
        <Link to="/shop" className="link-underline hidden font-sans text-sm sm:inline-flex">
          Shop the edit
        </Link>
      </div>

      {/* Horizontal scroller — drag/swipe on touch, snap on desktop */}
      <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12">
        {frames.map(({ product, tag, span }) => (
          <Link
            key={product.id + tag}
            to={`/product/${product.slug}`}
            className={`group relative shrink-0 snap-start overflow-hidden rounded-[1.5rem] bg-bone-200 ${
              span === 'tall'
                ? 'aspect-[3/4] w-[78vw] sm:w-[34vw] lg:w-[26vw]'
                : span === 'wide'
                  ? 'aspect-[4/3] w-[86vw] sm:w-[46vw] lg:w-[40vw]'
                  : 'aspect-square w-[78vw] sm:w-[34vw] lg:w-[26vw]'
            }`}
          >
            <ProductArt
              product={product}
              variant="hero"
              className="h-full w-full transition-transform duration-700 ease-leather group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-cream">
              <div>
                <span className="font-sans text-[0.7rem] uppercase tracking-widest opacity-80">{tag}</span>
                <p className="font-display text-2xl leading-tight">{product.name}</p>
              </div>
              <ArrowIcon className="h-5 w-5 translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
