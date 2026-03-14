<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="bg-stone-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row rounded-sm"
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-2 bg-white/50 md:bg-transparent rounded-full md:rounded-none text-stone-900 md:text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X class="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <!-- Image -->
          <div class="w-full md:w-1/2 h-64 md:h-auto md:min-h-[500px] bg-stone-200 relative">
            <img
              v-if="selectedProduct"
              :src="selectedProduct.image"
              :alt="selectedProduct.name"
              class="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <!-- Content -->
          <div class="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
            <span v-if="selectedProduct" class="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">
              {{ selectedProduct.category }}
            </span>
            <h2 v-if="selectedProduct" class="text-2xl md:text-4xl font-serif text-stone-900 mb-2 md:mb-4">
              {{ selectedProduct.name }}
            </h2>
            <p v-if="selectedProduct" class="text-lg md:text-xl font-medium text-stone-900 mb-4 md:mb-6">
              {{ selectedProduct.price }}
            </p>
            <p v-if="selectedProduct" class="text-sm md:text-base text-stone-600 leading-relaxed mb-6 md:mb-8">
              {{ selectedProduct.description }}
            </p>

            <button
              @click="handleAddToCart"
              class="w-full bg-stone-900 text-stone-50 py-3 md:py-4 text-sm md:text-base font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 mt-auto md:mt-0"
            >
              <span>Add to Cart</span>
              <ShoppingBag class="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useProductModal } from '../composables/useProductModal';
import { useCart } from '../composables/useCart';
import { X, ShoppingBag } from 'lucide-vue-next';

const { isModalOpen, selectedProduct, closeModal } = useProductModal();
const { addToCart } = useCart();

const handleAddToCart = () => {
  if (selectedProduct.value) {
    addToCart(selectedProduct.value);
    closeModal();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
