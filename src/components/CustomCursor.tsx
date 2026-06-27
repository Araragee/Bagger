import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

/**
 * A two-part custom cursor: a small dot that tracks 1:1 and a ring that lags
 * with easing and grows over interactive targets. Uses mix-blend-mode so it
 * reads against both the light and dark section palettes.
 *
 * Pointer-only and reduced-motion-aware — on touch or reduced motion it renders
 * nothing and the native cursor is left untouched.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [eligible, setEligible] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return
    setEligible(true)
    document.documentElement.classList.add('cursor-custom')
    return () => document.documentElement.classList.remove('cursor-custom')
  }, [])

  useEffect(() => {
    if (!eligible) return
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let raf = 0
    let visible = false

    const move = (e: PointerEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        dot.current?.style.setProperty('opacity', '1')
        ring.current?.style.setProperty('opacity', '1')
      }
      if (dot.current) dot.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      // grow the ring over interactive targets
      const interactive = (e.target as HTMLElement)?.closest('a, button, [data-cursor], input, select, textarea')
      ring.current?.classList.toggle('is-hover', !!interactive)
    }

    const leave = () => {
      visible = false
      dot.current?.style.setProperty('opacity', '0')
      ring.current?.style.setProperty('opacity', '0')
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [eligible])

  if (!eligible) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      <div
        ref={ring}
        className="cursor-ring fixed -ml-4 -mt-4 h-8 w-8 rounded-full border border-cream opacity-0 mix-blend-difference transition-[width,height,margin] duration-300 ease-leather"
      />
      <div
        ref={dot}
        className="fixed -ml-1 -mt-1 h-2 w-2 rounded-full bg-cream opacity-0 mix-blend-difference"
      />
    </div>
  )
}
