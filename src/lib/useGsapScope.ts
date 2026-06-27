import { useLayoutEffect, useRef } from 'react'
import { gsap } from './gsap'
import { prefersReducedMotion } from './motion'

/**
 * Scoped GSAP context with automatic cleanup and a built-in reduced-motion
 * escape hatch. Animations are scoped to `scope.current`, so selector strings
 * inside `build` only match within that subtree, and everything (including
 * ScrollTriggers) is reverted on unmount.
 *
 *   const scope = useGsapScope((ctx, gsap) => {
 *     gsap.from('.reveal', { y: 24, opacity: 0, stagger: 0.08,
 *       scrollTrigger: { trigger: scope.current, start: 'top 80%' } })
 *   })
 *   return <section ref={scope}>…</section>
 *
 * Importing this module pulls in GSAP, so use it only in route/page chunks that
 * actually animate — keep it out of always-mounted shell components.
 */
export function useGsapScope<T extends HTMLElement = HTMLDivElement>(
  build: (ctx: gsap.Context, g: typeof gsap) => void,
  deps: unknown[] = [],
) {
  const scope = useRef<T>(null)
  useLayoutEffect(() => {
    if (!scope.current) return
    if (prefersReducedMotion()) return // honor reduced motion: no animation
    const ctx = gsap.context((self) => build(self, gsap), scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return scope
}
