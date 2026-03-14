<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-brand-black/90 backdrop-blur-md p-4 md:p-10"
        @click.self="closeModal"
      >
        <transition name="modal-slide">
          <div
            v-if="isModalOpen"
            class="bg-brand-dark w-full max-w-6xl max-h-[90vh] md:h-[80vh] overflow-y-auto md:overflow-hidden shadow-2xl relative flex flex-col md:flex-row border border-brand-gray"
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-20 p-2 text-brand-light hover:text-brand-gold transition-colors"
            >
              <X class="w-6 h-6" />
            </button>

            <!-- Image (Watch Configurator Style) -->
            <div class="w-full md:w-[55%] h-64 md:h-full bg-brand-black relative flex items-center justify-center overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-tr from-brand-black via-transparent to-brand-black/50 z-10 pointer-events-none"></div>
              <img
                v-if="selectedProduct"
                :src="selectedProduct.image"
                :alt="selectedProduct.name"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
              />
            </div>

            <!-- Content -->
            <div class="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-center bg-brand-dark relative z-10">
              <div v-if="selectedProduct" class="flex flex-col h-full">
                <div class="mb-auto">
                  <span class="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-4 block">
                    {{ selectedProduct.category }}
                  </span>
                  <h2 class="text-3xl md:text-5xl font-serif text-brand-light mb-6 tracking-wide leading-tight">
                    {{ selectedProduct.name }}
                  </h2>
                  <div class="w-12 h-[1px] bg-brand-gray mb-6"></div>
                  <p class="text-xl md:text-2xl font-serif text-brand-light mb-8 tracking-wider">
                    {{ selectedProduct.price }}
                  </p>
                  <p class="text-sm md:text-base text-brand-muted leading-relaxed font-light">
                    {{ selectedProduct.description }}
                  </p>
                </div>

                <div class="mt-12">
                  <button
                    @click="handleAddToCart"
                    class="w-full relative group overflow-hidden border border-brand-gold bg-transparent py-4 text-xs font-medium uppercase tracking-[0.2em] text-brand-gold transition-all"
                  >
                    <span class="relative z-10 transition-colors group-hover:text-brand-black flex items-center justify-center gap-3">
                      Add to Collection <ShoppingBag class="w-4 h-4" />
                    </span>
                    <div class="absolute inset-0 h-full w-full translate-y-full bg-brand-gold transition-transform duration-300 ease-out group-hover:translate-y-0 z-0"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
</style>
