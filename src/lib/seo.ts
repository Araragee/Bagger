import { useEffect } from 'react'

const SITE = 'Bagger'
const DEFAULT_DESC =
  'Bagger — characterful leather goods and everyday carry. Built to be worn in, not worn out.'

type SeoInput = {
  title?: string
  description?: string
  type?: 'website' | 'product' | 'article'
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Lightweight per-route head manager (no SSR yet). Sets title, description,
 * canonical and Open Graph tags. When the app moves to Next.js/Remix this is
 * replaced by the framework's <head>/metadata API.
 */
export function useSeo({ title, description, type = 'website' }: SeoInput) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE}` : `${SITE} — Everyday carry, built to be worn in`
    const desc = description ?? DEFAULT_DESC
    document.title = fullTitle

    setMeta('meta[name="description"]', 'name', 'description', desc)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname)
  }, [title, description, type])
}

/** Inject a JSON-LD structured-data block; removes it on unmount. */
export function useJsonLd(data: object | null) {
  useEffect(() => {
    if (!data) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [data])
}
