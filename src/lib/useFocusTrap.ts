import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Trap focus inside an overlay while it's open. Handles ESC to close, moves
 * focus in on open, and restores focus to the trigger on close — the baseline
 * for an accessible dialog/drawer.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean, onClose: () => void) {
  const ref = useRef<T>(null)
  const restoreTo = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return
    const node = ref.current
    if (!node) return

    restoreTo.current = document.activeElement as HTMLElement

    const focusables = () => Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE))
    // Move focus into the overlay
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      restoreTo.current?.focus?.()
    }
  }, [active, onClose])

  return ref
}
