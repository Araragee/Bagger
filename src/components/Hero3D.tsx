import { Suspense, lazy, useEffect, useState } from 'react'
import { hasWebGL } from '../lib/webgl'
import { products } from '../data/products'
import ProductArt from './ProductArt'

// three.js is heavy — load the scene only when we actually mount it
const HeroScene = lazy(() => import('../three/HeroScene'))

const heroProduct = products[0]

/**
 * The 3D hero with a graceful 2D fallback. Renders the WebGL bag when supported;
 * otherwise (no WebGL, or SSR) shows the generative SVG so the page never breaks.
 */
export default function Hero3D({ className = '' }: { className?: string }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Decide on the client only, after mount
    setEnabled(hasWebGL())
  }, [])

  return (
    <div className={`relative ${className}`}>
      {enabled ? (
        <Suspense fallback={<Fallback />}>
          <HeroScene color={heroProduct.art.base} />
        </Suspense>
      ) : (
        <Fallback />
      )}
    </div>
  )
}

function Fallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ProductArt product={heroProduct} className="h-full w-full" variant="hero" />
    </div>
  )
}
