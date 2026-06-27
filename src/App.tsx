import { Routes, Route, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Marquee from './components/Marquee'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'
import SmoothScroll from './components/SmoothScroll'
import Toaster from './components/Toaster'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/Product'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Account from './pages/Account'
import About from './pages/About'
import Content from './pages/Content'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const reduced = useReducedMotion()
  return (
    <LazyMotion features={domAnimation}>
    <div className="relative flex min-h-screen flex-col">
      <SmoothScroll />
      <ScrollToTop />
      <Marquee />
      <Header />
      <main className="relative z-10 flex-1">
        {/* Subtle enter transition on each navigation (reduced-motion safe) */}
        <m.div
          key={location.pathname}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </m.div>
      </main>
      <Footer />
      <CartDrawer />
      <Toaster />
    </div>
    </LazyMotion>
  )
}
