<template>
  <div class="checkout-view min-h-screen bg-surface pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
    <div class="mb-12">
      <h1 class="font-headline text-5xl md:text-6xl font-bold tracking-editorial mb-4">The Checkout</h1>
      <p class="font-body text-xl text-on-surface-variant">Complete your archive.</p>
    </div>

    <div v-if="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-24 checkout-grid">
      
      <!-- Order Form -->
      <div class="form-section flex flex-col space-y-10 group-inputs">
        <section>
          <h2 class="font-label uppercase tracking-widest text-sm text-outline mb-6">01. Contact Information</h2>
          <div class="space-y-6">
            <div class="relative">
              <input type="email" id="email" class="w-full bg-surface-container-low border-b border-outline/40 px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="Email Address" />
              <label for="email" class="absolute left-4 top-3 font-body text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">Email Address</label>
            </div>
          </div>
        </section>

        <section>
          <h2 class="font-label uppercase tracking-widest text-sm text-outline mb-6">02. Shipping Address</h2>
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="relative">
                <input type="text" id="fname" class="w-full bg-surface-container-low border-b border-outline/40 px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="First Name" />
                <label for="fname" class="absolute left-4 top-3 font-body text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">First Name</label>
              </div>
              <div class="relative">
                <input type="text" id="lname" class="w-full bg-surface-container-low border-b border-outline/40 px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="Last Name" />
                <label for="lname" class="absolute left-4 top-3 font-body text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">Last Name</label>
              </div>
            </div>
            
            <div class="relative">
              <input type="text" id="address" class="w-full bg-surface-container-low border-b border-outline/40 px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="Address" />
              <label for="address" class="absolute left-4 top-3 font-body text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">Address</label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="relative md:col-span-1">
                <input type="text" id="city" class="w-full bg-surface-container-low border-b border-outline/40 px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="City" />
                <label for="city" class="absolute left-4 top-3 font-body text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">City</label>
              </div>
              <div class="relative md:col-span-1">
                <input type="text" id="state" class="w-full bg-surface-container-low border-b border-outline/40 px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="State/Province" />
                <label for="state" class="absolute left-4 top-3 font-body text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">State/Province</label>
              </div>
              <div class="relative md:col-span-1">
                <input type="text" id="zip" class="w-full bg-surface-container-low border-b border-outline/40 px-4 py-3 font-body text-on-surface focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="Postal Code" />
                <label for="zip" class="absolute left-4 top-3 font-body text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">Postal Code</label>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="font-label uppercase tracking-widest text-sm text-outline mb-6">03. Payment</h2>
          <div class="bg-surface-container-low p-6 ghost-border flex items-center justify-center min-h-[120px]">
            <p class="font-label text-on-surface-variant text-sm border-b-2 border-transparent">Payment gateway integration pending.</p>
          </div>
        </section>
      </div>

      <!-- Order Summary -->
      <div class="summary-section">
        <div class="bg-surface-container-lowest ghost-border p-8 sticky top-32">
          <h2 class="font-label uppercase tracking-widest text-lg mb-8">Order Summary</h2>
          
          <div class="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-4">
              <div class="w-20 h-24 flex-shrink-0 bg-surface-container-low overflow-hidden group">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div class="flex-grow">
                <h3 class="font-headline text-lg line-clamp-1">{{ item.name }}</h3>
                <p class="font-label text-xs text-outline uppercase tracking-wider mb-2">{{ item.subcategory }}</p>
                <div class="flex items-center justify-between">
                  <p class="font-label">{{ formatPrice(item.price) }}</p>
                  <p class="font-body text-sm text-on-surface-variant">Qty: {{ item.quantity }}</p>
                </div>
              </div>
              <button @click="removeFromCart(item.id)" class="text-outline hover:text-secondary p-2 transition-colors" aria-label="Remove item">
                <span class="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          <div class="border-t border-outline/20 pt-6 space-y-4 mb-8">
            <div class="flex justify-between font-body text-on-surface-variant text-sm">
              <span>Subtotal</span>
              <span>{{ subtotalFormatted }}</span>
            </div>
            <div class="flex justify-between font-body text-on-surface-variant text-sm">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div class="flex justify-between font-headline text-xl mt-4 pt-4 border-t border-outline/20">
              <span>Total</span>
              <span>{{ subtotalFormatted }}</span>
            </div>
          </div>

          <button class="w-full bg-primary text-on-primary py-4 font-label uppercase tracking-widest hover:btn-primary-gradient shadow-ambient transition-all hover:scale-[1.02]">
            Complete Archive
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-24 bg-surface-container-low ghost-border max-w-2xl mx-auto mt-12">
      <h2 class="font-headline text-3xl mb-4">Your Archive is Empty</h2>
      <p class="font-body mb-8 text-on-surface-variant">Return to the collection to discover pieces.</p>
      <router-link to="/" class="inline-block bg-primary text-on-primary px-8 py-4 font-label uppercase tracking-widest hover:btn-primary-gradient transition-all">
        Explore Collection
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useCart } from '../composables/useCart'
import { formatPrice } from '../data/products'
import gsap from 'gsap'

const { cartItems, removeFromCart, subtotalFormatted } = useCart()
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // Simple entrance animation
    if (cartItems.value.length > 0) {
      const tl = gsap.timeline()
      tl.fromTo('.checkout-grid', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }
  })
})

onBeforeUnmount(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
/* Scoped styles */
.shadow-ambient {
  box-shadow: 0 10px 32px rgba(93, 92, 91, 0.06);
}

/* Ensure inputs with data show label correctly via float */
input:not(:placeholder-shown) + label {
  top: -1rem;
  font-size: 0.75rem;
  color: var(--tw-prose-body);
}

/* Custom scrollbar for checkout item list */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: theme('colors.outline');
  border-radius: 9999px;
  opacity: 0.5;
}
</style>
