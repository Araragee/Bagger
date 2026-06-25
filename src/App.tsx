import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Marquee from './components/Marquee'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/Product'
import Checkout from './pages/Checkout'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollToTop />
      <Marquee />
      <Header />
      <main className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
