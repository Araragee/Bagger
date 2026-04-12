import { ref, computed } from 'vue'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'

export interface CartItem {
  id: number
  name: string
  price: number
  category: string
  subcategory: string
  image: string
  quantity: number
}

// Module-level reactive state — shared across all composable calls
const cartItems = ref<CartItem[]>([])
const isDrawerOpen = ref(false)

export function useCart() {

  function addToCart(product: Product) {
    const existing = cartItems.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        subcategory: product.subcategory,
        image: product.image,
        quantity: 1,
      })
    }
    isDrawerOpen.value = true
  }

  function removeFromCart(id: number) {
    const index = cartItems.value.findIndex(item => item.id === id)
    if (index > -1) cartItems.value.splice(index, 1)
  }

  function updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    const item = cartItems.value.find(i => i.id === id)
    if (item) item.quantity = quantity
  }

  function clearCart() {
    cartItems.value = []
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function openDrawer() {
    isDrawerOpen.value = true
  }

  function closeDrawer() {
    isDrawerOpen.value = false
  }

  const itemCount = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )

  const subtotal = computed(() =>
    cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  const subtotalFormatted = computed(() => formatPrice(subtotal.value))

  return {
    cartItems,
    isDrawerOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleDrawer,
    openDrawer,
    closeDrawer,
    itemCount,
    subtotal,
    subtotalFormatted,
  }
}
