<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-on-surface/80 backdrop-blur-md p-4 md:p-10"
        @click.self="closeModal"
      >
        <Transition name="modal-slide">
          <div
            v-if="isModalOpen && selectedProduct"
            class="bg-surface-container-lowest w-full max-w-5xl max-h-[90vh] md:h-[78vh] overflow-y-auto md:overflow-hidden shadow-ambient-lg relative flex flex-col md:flex-row"
          >
            <!-- Close -->
            <button
              aria-label="Close"
              class="absolute top-4 right-4 z-20 p-2 hover:bg-surface-container transition-colors"
              @click="closeModal"
            >
              <span class="material-symbols-outlined text-on-surface text-[20px]">close</span>
            </button>

            <!-- Image -->
            <div class="w-full md:w-[55%] h-64 md:h-full bg-surface-container-high relative overflow-hidden">
              <img
                :src="selectedProduct.image"
                :alt="selectedProduct.name"
                class="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-105"
              />
              <!-- Era overlay -->
              <div class="absolute bottom-4 left-4 bg-surface-container-lowest/90 px-3 py-1.5">
                <span class="font-label text-[10px] tracking-widest text-on-surface uppercase">{{ selectedProduct.era }}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-between">
              <div>
                <span class="font-label text-[10px] tracking-archive text-on-surface-variant uppercase block mb-4">
                  {{ selectedProduct.subcategory }}
                </span>
                <h2 class="font-headline font-extrabold text-3xl md:text-4xl text-on-surface uppercase tracking-tighter leading-none mb-6">
                  {{ selectedProduct.name }}
                </h2>
                <p class="font-headline text-2xl text-on-surface mb-8">
                  {{ formatPrice(selectedProduct.price) }}
                </p>
                <p class="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
                  {{ selectedProduct.description }}
                </p>

                <!-- Details -->
                <div class="space-y-2">
                  <div class="flex justify-between py-2 border-b border-surface-container-high">
                    <span class="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">Condition</span>
                    <span class="font-label text-[11px] font-bold tracking-wide text-on-surface uppercase">{{ selectedProduct.condition }}</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-surface-container-high">
                    <span class="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">Size</span>
                    <span class="font-label text-[11px] font-bold tracking-wide text-on-surface uppercase">{{ selectedProduct.size }}</span>
                  </div>
                  <div class="flex justify-between py-2">
                    <span class="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">Materials</span>
                    <span class="font-label text-[11px] text-on-surface text-right max-w-[60%]">{{ selectedProduct.materials }}</span>
                  </div>
                </div>
              </div>

              <button
                class="mt-8 w-full bg-on-surface text-surface py-4 font-label text-xs tracking-archive uppercase hover:bg-secondary transition-colors duration-300"
                @click="handleAddToCart"
              >
                Add to Archive
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useProductModal } from '../composables/useProductModal'
import { useCart } from '../composables/useCart'
import { formatPrice } from '../data/products'

const { isModalOpen, selectedProduct, closeModal } = useProductModal()
const { addToCart } = useCart()

function handleAddToCart() {
  if (selectedProduct.value) {
    addToCart(selectedProduct.value)
    closeModal()
  }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.35s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}
</style>
