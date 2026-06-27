/**
 * Generate public/sitemap.xml from the static routes + product catalogue.
 * Run: node scripts/gen-sitemap.mjs  (set SITE_URL for the real domain)
 */
import { readFileSync, writeFileSync } from 'node:fs'

const SITE = process.env.SITE_URL || 'https://bagger.example'

// Pull product slugs straight from the data file (no TS build needed)
const data = readFileSync(new URL('../src/data/products.ts', import.meta.url), 'utf8')
const slugs = [...data.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

const staticRoutes = ['/', '/shop', '/about']
const contentRoutes = ['shipping', 'returns', 'care', 'faq', 'contact', 'privacy', 'terms'].map(
  (s) => `/pages/${s}`,
)
const productRoutes = slugs.map((s) => `/product/${s}`)

const urls = [...staticRoutes, ...contentRoutes, ...productRoutes]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml written with ${urls.length} URLs (base ${SITE})`)
