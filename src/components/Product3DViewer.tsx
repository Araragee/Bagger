import { Suspense, lazy, useEffect, useState } from 'react'
import { hasWebGL } from '../lib/webgl'
import type { Product } from '../data/products'
import ProductArt from './ProductArt'

const ProductViewer = lazy(() => import('../three/ProductViewer'))

/**
 * PDP hero: interactive 3D viewer with a 2D fallback. `colorHex` drives the
 * leather material so the colour picker re-skins the model live.
 */
export default function Product3DViewer({
  product,
  colorHex,
}: {
  product: Product
  colorHex: string
}) {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => setEnabled(hasWebGL()), [])

  const fallback = (
    <ProductArt
      product={{ ...product, art: { ...product.art, base: colorHex } }}
      className="h-full w-full"
      variant="hero"
    />
  )

  return (
    <div className="relative h-full w-full">
      {enabled ? (
        <Suspense fallback={fallback}>
          <ProductViewer color={colorHex} />
        </Suspense>
      ) : (
        fallback
      )}
      {enabled && (
        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-cream backdrop-blur">
          Drag to rotate
        </span>
      )}
    </div>
  )
}
