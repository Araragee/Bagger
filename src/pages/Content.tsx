import { useParams } from 'react-router-dom'
import { contentPages } from '../data/pages'
import { useTitle } from '../lib/useTitle'
import NotFound from './NotFound'

export default function Content() {
  const { slug } = useParams()
  const page = slug ? contentPages[slug] : undefined
  useTitle(page?.title ?? 'Not found')

  if (!page) return <NotFound />

  return (
    <div className="container-wide max-w-3xl py-12">
      <header className="border-b border-ink/10 pb-8">
        <span className="eyebrow">Help</span>
        <h1 className="mt-2 font-display text-5xl font-light">{page.title}</h1>
        <p className="mt-3 max-w-lg text-lg text-ink-soft">{page.intro}</p>
      </header>

      <div className="prose-bagger mt-8 space-y-6">
        {page.blocks.map((block, i) => {
          switch (block.type) {
            case 'h':
              return (
                <h2 key={i} className="font-display text-2xl">{block.text}</h2>
              )
            case 'p':
              return (
                <p key={i} className="leading-relaxed text-ink-soft">{block.text}</p>
              )
            case 'list':
              return (
                <ul key={i} className="space-y-2">
                  {block.items.map((it) => (
                    <li key={it} className="flex gap-3 text-ink-soft">
                      <span className="mt-1 text-clay">—</span>
                      {it}
                    </li>
                  ))}
                </ul>
              )
            case 'qa':
              return (
                <div key={i} className="border-t border-ink/10 pt-5">
                  <h3 className="font-display text-lg">{block.q}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{block.a}</p>
                </div>
              )
          }
        })}
      </div>
    </div>
  )
}
