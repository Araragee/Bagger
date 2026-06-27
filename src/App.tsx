import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Marquee from './components/Marquee'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'
import SmoothScroll from './components/SmoothScroll'
import Toaster from './components/Toaster'
import CustomCursor from './components/CustomCursor'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home' // eager: most common entry / LCP
// Eager so the card→PDP view-transition morph lands on the real hero, not a
// Suspense fallback (a lazy PDP would suspend inside startViewTransition).
import ProductPage from './pages/Product'

// Secondary routes are code-split so they don't weigh down first paint
const Shop = lazy(() => import('./pages/Shop'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const Account = lazy(() => import('./pages/Account'))
const About = lazy(() => import('./pages/About'))
const Content = lazy(() => import('./pages/Content'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <div className="container-wide flex min-h-[60vh] items-center justify-center">
      <span className="animate-pulse text-sm uppercase tracking-widest text-ink-soft">Loading…</span>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const reduced = useReducedMotion()
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <ScrollToTop />
        <Marquee />
        <Header />
        <main id="main" className="relative z-10 flex-1">
          <ErrorBoundary>
            <m.div
              key={location.pathname}
              // Skip the fade on PDPs so the card→PDP view-transition morph
              // lands on a fully-opaque hero rather than fighting the fade-in.
              initial={
                reduced || location.pathname.startsWith('/product/')
                  ? false
                  : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Suspense fallback={<RouteFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order/:id" element={<OrderConfirmation />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/pages/:slug" element={<Content />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </m.div>
          </ErrorBoundary>
        </main>
        <Footer />
        <CartDrawer />
        <Toaster />
        <CustomCursor />
      </div>
    </LazyMotion>
  )
}
