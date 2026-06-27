import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from '../lib/lenis'

/** Reset scroll on every route change (SPA default would keep position). */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}
