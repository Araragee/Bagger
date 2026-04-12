import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import SustainabilityView from '../views/SustainabilityView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import TermsView from '../views/TermsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    // ── Category pages ───────────────────────────────────────────
    {
      path: '/:categorySlug(bags|shirts|jackets|sweaters|shoes|shorts|accessories)',
      name: 'category',
      component: CategoryView,
      props: true,
    },

    // Legacy /collections redirect → /bags
    {
      path: '/collections',
      redirect: '/bags',
    },

    // ── Product detail ───────────────────────────────────────────
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/ProductDetailView.vue'),
    },

    // ── Checkout ─────────────────────────────────────────────────
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
    },

    // ── Static pages ─────────────────────────────────────────────
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/sustainability',
      name: 'sustainability',
      component: SustainabilityView,
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView,
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsView,
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
