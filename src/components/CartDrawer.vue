<template>
  <Teleport to="body">
    <transition name="slide">
      <div
        v-if="isDrawerOpen"
        class="fixed inset-y-0 right-0 z-[70] w-full md:w-96 bg-stone-50 shadow-2xl flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-stone-200">
          <h2 class="text-xl font-serif text-stone-900">Your Cart</h2>
          <button @click="toggleDrawer" class="p-2 text-stone-500 hover:text-stone-900 transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="cartItems.length === 0" class="flex-1 flex flex-col items-center justify-center p-8 text-stone-400">
          <ShoppingBag class="w-12 h-12 mb-4 opacity-50" />
          <p class="text-lg font-medium">Your cart is empty.</p>
          <router-link to="/collections" @click="toggleDrawer" class="mt-4 text-amber-800 hover:underline">
            Start Shopping
          </router-link>
        </div>

        <!-- Items List -->
        <div v-else class="flex-1 overflow-y-auto p-6 space-y-6">
          <div v-for="item in cartItems" :key="item.id" class="flex items-start gap-4 pb-6 border-b border-stone-100 last:border-0">
            <div class="w-20 h-24 bg-stone-200 flex-shrink-0 overflow-hidden rounded-sm">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-start mb-1">
                <h3 class="font-serif text-stone-900 line-clamp-2 leading-tight">{{ item.name }}</h3>
                <button @click="removeFromCart(item.id)" class="text-stone-400 hover:text-red-500 transition-colors">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
              <p class="text-stone-500 text-sm mb-2">{{ item.price }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center border border-stone-200 rounded-sm">
                  <span class="px-2 text-sm text-stone-900">Qty: {{ item.quantity }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartItems.length > 0" class="p-6 bg-stone-100 border-t border-stone-200">
          <div class="flex justify-between items-center mb-4">
            <span class="text-stone-600 font-medium">Subtotal</span>
            <span class="text-stone-900 font-bold text-lg">${{ cartTotal }}</span>
          </div>
          <button class="w-full bg-stone-900 text-stone-50 py-3 font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </transition>

    <!-- Backdrop -->
    <transition name="fade">
      <div
        v-if="isDrawerOpen"
        class="fixed inset-0 z-[65] bg-stone-900/50 backdrop-blur-sm"
        @click="toggleDrawer"
      ></div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart';
import { X, ShoppingBag, Trash2 } from 'lucide-vue-next';

const { isDrawerOpen, toggleDrawer, cartItems, removeFromCart, cartTotal } = useCart();
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
