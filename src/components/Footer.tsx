import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { ArrowIcon } from './Icons'

const cols = [
  {
    title: 'Shop',
    links: [
      { label: 'All bags', to: '/shop' },
      { label: 'Totes', to: '/shop?category=Totes' },
      { label: 'Backpacks', to: '/shop?category=Backpacks' },
      { label: 'Wallets', to: '/shop?category=Wallets' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our story', to: '/about' },
      { label: 'Leather care', to: '/pages/care' },
      { label: 'Your account', to: '/account' },
      { label: 'Contact', to: '/pages/contact' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping', to: '/pages/shipping' },
      { label: 'Returns & repairs', to: '/pages/returns' },
      { label: 'FAQ', to: '/pages/faq' },
      { label: 'Contact', to: '/pages/contact' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="relative z-10 mt-24 bg-ink text-cream">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo className="text-cream [&_span:first-child]:text-cream" />
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Honest leather goods, made to be worn in — not worn out. A small
            workshop’s worth of carry, built to outlast the trends.
          </p>

          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault()
              if (email) setSent(true)
            }}
          >
            <label className="eyebrow text-cream/60">Get 10% off your first order</label>
            {sent ? (
              <p className="mt-3 text-sm text-tan">Thanks — check your inbox ✦</p>
            ) : (
              <div className="mt-3 flex items-center gap-2 border-b border-cream/30 pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none"
                />
                <button aria-label="Subscribe" className="text-cream hover:text-clay">
                  <ArrowIcon />
                </button>
              </div>
            )}
          </form>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="eyebrow text-cream/60">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="link-underline text-sm text-cream/85">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cream/15">
        <div className="container-wide flex flex-col gap-3 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bagger. A demo storefront.</p>
          <div className="flex gap-5">
            <Link to="/pages/privacy" className="link-underline">Privacy</Link>
            <Link to="/pages/terms" className="link-underline">Terms</Link>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-underline">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
