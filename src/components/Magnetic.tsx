import type { ReactNode } from 'react'
import { useMagnetic } from '../lib/useMagnetic'

/**
 * Wraps a CTA so it drifts toward the cursor (pointer-only, reduced-motion safe).
 * Keep the strength gentle on text buttons; the effect should feel like weight.
 */
export default function Magnetic({
  children,
  strength = 0.25,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useMagnetic<HTMLSpanElement>(strength)
  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      {children}
    </span>
  )
}
