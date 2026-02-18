import { ref } from 'vue';

// Define Product Type (mirroring the one in data/products)
interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

const selectedProduct = ref<Product | null>(null);
const isModalOpen = ref(false);

export function useProductModal() {

  const openModal = (product: any) => {
    selectedProduct.value = product;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    // Optional: delay clearing selectedProduct for fade-out animation
    setTimeout(() => {
      if (!isModalOpen.value) selectedProduct.value = null;
    }, 300);
  };

  return {
    selectedProduct,
    isModalOpen,
    openModal,
    closeModal
  };
}
