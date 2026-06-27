import { useLayoutEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** Imperative check — safe to call outside React (e.g. in the Lenis setup). */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches
}

/** Reactive version that updates if the user changes their OS setting. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotion)
  useLayoutEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
