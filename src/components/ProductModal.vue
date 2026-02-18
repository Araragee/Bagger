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
            class="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X class="w-6 h-6" />
          </button>

          <!-- Image -->
          <div class="w-full md:w-1/2 h-64 md:h-auto bg-stone-200">
            <img
              v-if="selectedProduct"
              :src="selectedProduct.image"
              :alt="selectedProduct.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Content -->
          <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span v-if="selectedProduct" class="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">
              {{ selectedProduct.category }}
            </span>
            <h2 v-if="selectedProduct" class="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
              {{ selectedProduct.name }}
            </h2>
            <p v-if="selectedProduct" class="text-xl font-medium text-stone-900 mb-6">
              {{ selectedProduct.price }}
            </p>
            <p v-if="selectedProduct" class="text-stone-600 leading-relaxed mb-8">
              {{ selectedProduct.description }}
            </p>

            <button
              @click="handleAddToCart"
              class="w-full bg-stone-900 text-stone-50 py-4 font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Add to Cart</span>
              <ShoppingBag class="w-4 h-4" />
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
