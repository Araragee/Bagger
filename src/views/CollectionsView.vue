<template>
  <div class="pt-32 px-6 min-h-screen pb-20 max-w-7xl mx-auto">
    <!-- Header -->
    <header class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-serif text-stone-900 mb-6">The Collection</h1>
      <p class="text-lg text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
        Explore our curated selection of fine leather goods. Each piece is hand-crafted in Tuscany, designed to age beautifully with you.
      </p>
    </header>

    <!-- Filter / Sort (Placeholder for now) -->
    <div class="flex justify-between items-center mb-12 border-b border-stone-200 pb-4">
      <span class="text-sm font-medium text-stone-500 uppercase tracking-widest">{{ products.length }} Items</span>
      <button class="text-sm font-medium text-stone-900 hover:text-amber-800 transition-colors uppercase tracking-widest">
        Sort by: Featured
      </button>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard.vue';

// Use imported data directly
const products = PRODUCTS;
</script>
