import { useSeo } from './seo'

/**
 * Back-compat shim: pages that only need a title still call useTitle, but now
 * get full SEO head management (description, OG, canonical) via useSeo.
 */
export function useTitle(title: string) {
  useSeo({ title })
}
