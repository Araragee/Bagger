<template>
  <div
    class="group relative flex flex-col cursor-pointer"
    @click="openModal"
  >
    <!-- Image Container with Hover Effect -->
    <div class="relative w-full aspect-[3/4] overflow-hidden bg-stone-200">
      <!-- Main Image -->
      <img
        :src="product.image"
        :alt="product.name"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <!-- Overlay / Quick Add (Optional visual cue) -->
      <div class="absolute inset-0 bg-stone-900/0 transition-colors duration-300 group-hover:bg-stone-900/10"></div>

      <!-- Badge (Example: New Arrival) -->
      <div v-if="isNew" class="absolute top-4 left-4 bg-stone-50 px-3 py-1 text-xs font-bold tracking-widest uppercase text-stone-900 shadow-sm">
        New Arrival
      </div>
    </div>

    <!-- Product Info -->
    <div class="mt-4 flex flex-col items-center text-center">
      <span class="text-xs font-bold uppercase tracking-widest text-amber-800 mb-1">{{ product.category }}</span>
      <h3 class="font-serif text-xl text-stone-900 mb-1 group-hover:text-amber-900 transition-colors">{{ product.name }}</h3>
      <p class="font-medium text-stone-600">{{ product.price }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductModal } from '../composables/useProductModal';

const props = defineProps<{
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
    category: string;
    image: string;
  }
}>();

const { openModal: triggerModal } = useProductModal();

const isNew = computed(() => props.product.id % 2 === 0); // Dummy logic for badge

const openModal = () => {
  triggerModal(props.product);
};
</script>
