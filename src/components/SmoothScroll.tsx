import { useEffect } from 'react'
import { prefersReducedMotion } from '../lib/motion'
import { setLenis } from '../lib/lenis'

/**
 * Inertia/smooth scrolling via Lenis, driven by GSAP's ticker and synced to
 * ScrollTrigger. Lenis + GSAP are dynamically imported so they stay out of the
 * initial bundle (no blocking of first paint). Completely disabled under
 * prefers-reduced-motion, where native scrolling takes over.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    let cleanup = () => {}
    let cancelled = false

    ;(async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('../lib/gsap'),
      ])
      if (cancelled) return

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      setLenis(lenis)

      lenis.on('scroll', ScrollTrigger.update)
      const raf = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      cleanup = () => {
        gsap.ticker.remove(raf)
        lenis.destroy()
        setLenis(null)
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return null
}
