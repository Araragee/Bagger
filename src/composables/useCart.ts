import { ref, computed } from 'vue';

// Type definition for Cart Item
export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

// Global State
const cartItems = ref<CartItem[]>([]);
const isDrawerOpen = ref(false);

export function useCart() {

  const addToCart = (product: any) => {
    const existingItem = cartItems.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    isDrawerOpen.value = true;
  };

  const removeFromCart = (id: number) => {
    const index = cartItems.value.findIndex(item => item.id === id);
    if (index > -1) {
      cartItems.value.splice(index, 1);
    }
  };

  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
  };

  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    // Helper to parse price string "$320" -> 320
    const parsePrice = (priceStr: string) => Number(priceStr.replace(/[^0-9.-]+/g,""));

    return cartItems.value.reduce((total, item) => {
      return total + (parsePrice(item.price) * item.quantity);
    }, 0);
  });

  return {
    cartItems,
    isDrawerOpen,
    addToCart,
    removeFromCart,
    toggleDrawer,
    cartCount,
    cartTotal
  };
}
