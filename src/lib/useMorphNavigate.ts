import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { prefersReducedMotion } from './motion'

type Doc = Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } }

/**
 * Navigate with a shared-element morph via the View Transitions API — manually,
 * so it works with the classic <BrowserRouter> (React Router's viewTransition
 * prop / useViewTransitionState require the data router).
 *
 * The source element is tagged with the shared name just before the transition
 * so the browser matches it to the destination's `product-hero` element.
 * Falls back to a normal navigation when VT is unsupported or reduced-motion.
 */
export function useMorphNavigate() {
  const navigate = useNavigate()
  return useCallback(
    (to: string, sourceEl?: HTMLElement | null) => {
      const doc = document as Doc
      if (!doc.startViewTransition || prefersReducedMotion()) {
        navigate(to)
        return
      }
      sourceEl?.style.setProperty('view-transition-name', 'product-hero')
      const vt = doc.startViewTransition(() => {
        // Commit the route change synchronously so the new DOM is captured
        flushSync(() => navigate(to))
      })
      vt.finished.finally(() => sourceEl?.style.removeProperty('view-transition-name'))
    },
    [navigate],
  )
}
