import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { BagIcon, MenuIcon, CloseIcon, UserIcon } from './Icons'
import { useCart, useCartCount } from '../store/cart'
import { useAuth } from '../store/auth'

const nav = [
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=Totes', label: 'Totes' },
  { to: '/shop?category=Backpacks', label: 'Backpacks' },
  { to: '/about', label: 'Our Story' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const count = useCartCount()
  const openCart = useCart((s) => s.open)
  const user = useAuth((s) => s.user)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet on navigation
  useEffect(() => setMobileOpen(false), [location])

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-ink/10 bg-bone/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-4 sm:h-20">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </button>
          <Logo />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.label}
              to={n.to}
              className={({ isActive }) =>
                `link-underline font-sans text-sm ${isActive ? 'text-clay' : 'text-ink'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="/account"
            aria-label={user ? 'Your account' : 'Sign in'}
            className="flex items-center gap-2 rounded-full border border-ink/20 px-3.5 py-2 transition-colors hover:border-ink"
          >
            <UserIcon className="h-4.5 w-4.5" />
            {user && (
              <span className="hidden font-sans text-sm sm:inline">
                {user.name.split(' ')[0]}
              </span>
            )}
          </NavLink>
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 rounded-full border border-ink/20 px-3.5 py-2 transition-colors hover:border-ink"
            aria-label={`Open cart, ${count} items`}
          >
            <BagIcon className="h-4.5 w-4.5" />
            <span className="font-sans text-sm tabular-nums">{count}</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-clay" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-sm animate-slide-in flex-col bg-cream p-6">
            <div className="flex items-center justify-between">
              <Logo />
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  className="border-b border-ink/10 py-4 font-display text-2xl"
                >
                  {n.label}
                </Link>
              ))}
              <Link to="/account" className="border-b border-ink/10 py-4 font-display text-2xl">
                {user ? 'Your account' : 'Sign in'}
              </Link>
            </nav>
            <p className="mt-auto text-sm text-ink-soft">
              Free shipping over $150 · Lifetime repairs
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
