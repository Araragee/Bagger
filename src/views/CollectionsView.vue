<template>
  <div class="pt-32 px-6 min-h-screen pb-20 max-w-7xl mx-auto">
    <!-- Header -->
    <header class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-serif text-stone-900 mb-6">The Collection</h1>
      <p class="text-lg text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
        Explore our curated selection of fine leather goods. Each piece is hand-crafted in Tuscany, designed to age beautifully with you.
      </p>
    </header>

    <!-- Filter / Sort -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-stone-200 pb-4 gap-4">
      <div class="flex items-center gap-4">
        <span class="text-sm font-medium text-stone-500 uppercase tracking-widest">{{ filteredProducts.length }} Items</span>

        <!-- Active Filters Display -->
        <div v-if="activeFilters.length > 0" class="flex flex-wrap gap-2">
          <span v-for="filter in activeFilters" :key="filter" class="px-3 py-1 bg-stone-100 text-xs font-bold text-stone-600 rounded-full uppercase flex items-center">
            {{ filter }}
            <button @click="clearFilter(filter)" class="ml-1 hover:text-red-500">×</button>
          </span>
        </div>
      </div>

      <div class="flex items-center gap-4 w-full md:w-auto justify-end">
        <select :value="sortBy" @change="updateSort" class="bg-transparent text-sm font-medium text-stone-900 uppercase tracking-widest focus:outline-none cursor-pointer w-full md:w-auto text-right md:text-left">
          <option value="featured">Sort by: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>
    </div>

    <!-- Product Grid -->
    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- No Results -->
    <div v-else class="flex flex-col items-center justify-center py-20">
      <p class="text-xl text-stone-500 font-light">No products found matching your criteria.</p>
      <button @click="clearAllFilters" class="mt-4 text-amber-800 underline hover:text-amber-900">Clear all filters</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard.vue';

const route = useRoute();
const router = useRouter();
const sortBy = ref('featured');

watch(
  () => route.query.sort,
  (newSort) => {
    if (newSort) {
      sortBy.value = newSort as string;
    } else {
      sortBy.value = 'featured';
    }
  },
  { immediate: true }
);

const updateSort = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  router.push({ query: { ...route.query, sort: value } });
};

const activeFilters = computed(() => {
  const filters: string[] = [];
  if (route.query.type) filters.push(route.query.type as string);
  if (route.query.search) filters.push(`"${route.query.search}"`);
  return filters;
});

const filteredProducts = computed(() => {
  let result = [...PRODUCTS];

  // Filter by Type (Bag, Shoe)
  if (route.query.type) {
    result = result.filter(p => p.type === route.query.type);
  }

  // Filter by Search
  if (route.query.search) {
    const query = (route.query.search as string).toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  // Sort
  if (sortBy.value === 'price-asc') {
    result.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
  } else if (sortBy.value === 'price-desc') {
    result.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
  } else if (sortBy.value === 'newest') {
    result.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
  }

  return result;
});

const clearFilter = (filter: string) => {
  const query = { ...route.query };
  if (filter.startsWith('"')) {
    delete query.search;
  } else {
    delete query.type;
  }
  router.push({ query });
};

const clearAllFilters = () => {
  router.push({ query: {} });
};
</script>
