import { useEffect } from 'react'

/** Set the document title per page (SPA has no per-route <head> otherwise). */
export function useTitle(title: string) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} · Bagger` : 'Bagger — Everyday carry, built to be worn in'
    return () => {
      document.title = prev
    }
  }, [title])
}
