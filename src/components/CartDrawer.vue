<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="isDrawerOpen"
        class="fixed inset-0 z-[65] bg-on-surface/20 backdrop-blur-sm"
        @click="closeDrawer"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="slide">
      <div
        v-if="isDrawerOpen"
        class="fixed inset-y-0 right-0 z-[70] w-full sm:w-80 bg-surface-container-lowest flex flex-col shadow-ambient-lg"
      >
        <!-- Header -->
        <div class="px-6 pt-8 pb-6">
          <div class="flex items-start justify-between mb-1">
            <h2 class="font-headline font-extrabold text-2xl tracking-tighter text-on-surface uppercase">
              Your Archive
            </h2>
            <button
              aria-label="Close cart"
              class="p-1 -mr-1 hover:bg-surface-container transition-colors"
              @click="closeDrawer"
            >
              <span class="material-symbols-outlined text-on-surface-variant text-[20px]">close</span>
            </button>
          </div>
          <p class="font-label text-[10px] tracking-archive text-on-surface-variant uppercase">
            Items ready for curation
          </p>
        </div>

        <!-- Empty State -->
        <div
          v-if="cartItems.length === 0"
          class="flex-1 flex flex-col items-center justify-center px-6 text-center"
        >
          <span class="material-symbols-outlined text-5xl text-on-surface-variant opacity-30 mb-4">
            shopping_bag
          </span>
          <p class="font-headline font-bold text-on-surface text-lg uppercase tracking-tighter mb-1">
            Archive Empty
          </p>
          <p class="font-body text-sm text-on-surface-variant mb-6">
            No pieces selected yet.
          </p>
          <router-link
            to="/bags"
            class="font-label text-[11px] tracking-widest uppercase text-secondary hover:underline"
            @click="closeDrawer"
          >
            Browse the Archive
          </router-link>
        </div>

        <!-- Items -->
        <div v-else class="flex-1 overflow-y-auto px-6 space-y-6">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="group flex items-center gap-4 cursor-pointer transition-transform duration-300 hover:-translate-x-1"
          >
            <!-- Thumbnail -->
            <div class="w-16 h-16 bg-surface-container-high shrink-0 overflow-hidden">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Meta -->
            <div class="flex-1 min-w-0">
              <span class="font-label text-[10px] block tracking-archive text-on-surface-variant uppercase">
                {{ item.subcategory }}
              </span>
              <p class="font-headline font-bold text-on-surface text-sm uppercase tracking-tight leading-tight truncate">
                {{ item.name }}
              </p>
              <p class="font-label text-xs text-on-surface-variant mt-0.5">
                {{ formatPrice(item.price) }}
                <span v-if="item.quantity > 1" class="text-secondary">× {{ item.quantity }}</span>
              </p>
            </div>

            <!-- Remove -->
            <button
              :aria-label="`Remove ${item.name}`"
              class="opacity-0 group-hover:opacity-100 p-1 transition-opacity shrink-0"
              @click.stop="removeFromCart(item.id)"
            >
              <span class="material-symbols-outlined text-on-surface-variant hover:text-secondary text-[18px]">
                close
              </span>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartItems.length > 0" class="px-6 pb-8 pt-6 border-t border-surface-container-high">
          <div class="flex justify-between items-baseline mb-6">
            <span class="font-label text-[11px] tracking-widest uppercase text-on-surface-variant">Subtotal</span>
            <span class="font-headline font-bold text-on-surface text-xl">{{ subtotalFormatted }}</span>
          </div>
          <router-link
            to="/checkout"
            class="block w-full bg-on-surface text-surface text-center py-4 font-label text-xs tracking-archive uppercase hover:bg-secondary transition-colors duration-300"
            @click="closeDrawer"
          >
            Checkout Now
          </router-link>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'
import { formatPrice } from '../data/products'

const { isDrawerOpen, closeDrawer, cartItems, removeFromCart, subtotalFormatted } = useCart()
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0, 0.15, 1);
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
