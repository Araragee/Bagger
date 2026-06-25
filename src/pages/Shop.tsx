import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating'

const sorts: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const active = (params.get('category') as (typeof categories)[number]) || 'All'
  const [sort, setSort] = useState<Sort>('featured')

  const setCategory = (c: string) => {
    if (c === 'All') params.delete('category')
    else params.set('category', c)
    setParams(params, { replace: true })
  }

  const list = useMemo(() => {
    let l = products.filter((p) => active === 'All' || p.category === active)
    switch (sort) {
      case 'price-asc':
        l = [...l].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        l = [...l].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        l = [...l].sort((a, b) => b.rating - a.rating)
        break
    }
    return l
  }, [active, sort])

  return (
    <div className="container-wide py-10">
      <header className="border-b border-ink/10 pb-8">
        <span className="eyebrow">The collection</span>
        <h1 className="mt-2 font-display text-5xl font-light sm:text-6xl">
          {active === 'All' ? 'Every bag we make' : active}
        </h1>
        <p className="mt-3 max-w-lg text-ink-soft">
          Cut, stitched, and burnished by hand. Filter by what you’re carrying.
        </p>
      </header>

      {/* Filter + sort bar */}
      <div className="sticky top-16 z-20 -mx-5 mt-6 flex items-center gap-4 overflow-x-auto bg-bone/85 px-5 py-3 backdrop-blur-md sm:top-20 sm:mx-0 sm:rounded-full sm:border sm:border-ink/10 sm:px-4 no-scrollbar">
        <div className="flex items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 font-sans text-sm transition-colors ${
                active === c ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-bone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2 pl-2">
          <label htmlFor="sort" className="hidden text-xs uppercase tracking-widest text-ink-soft sm:block">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-ink/20 bg-transparent px-3 py-2 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-ink"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft">{list.length} products</p>

      {list.length === 0 ? (
        <p className="py-24 text-center font-display text-2xl">Nothing here yet — check back soon.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
