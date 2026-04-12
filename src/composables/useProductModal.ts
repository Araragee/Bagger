import { ref } from 'vue'
import type { Product } from '../data/products'

const selectedProduct = ref<Product | null>(null)
const isModalOpen = ref(false)

export function useProductModal() {
  function openModal(product: Product) {
    selectedProduct.value = product
    isModalOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
    setTimeout(() => {
      if (!isModalOpen.value) selectedProduct.value = null
    }, 350)
  }

  return { selectedProduct, isModalOpen, openModal, closeModal }
}
