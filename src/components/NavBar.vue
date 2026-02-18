<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out px-6 py-4 md:px-12 md:py-6 flex items-center justify-between',
      isScrolled ? 'bg-stone-50/95 backdrop-blur-md shadow-sm text-stone-900' : 'bg-transparent text-stone-900 md:text-white'
    ]"
  >
    <!-- Left: Navigation Links -->
    <div class="hidden md:flex gap-8 font-sans text-sm tracking-widest uppercase font-medium">
      <router-link to="/" class="hover:opacity-70 transition-opacity">Home</router-link>
      <router-link to="/collections" class="hover:opacity-70 transition-opacity">Collection</router-link>
    </div>

    <!-- Mobile Menu Button (Left on mobile) -->
    <button class="md:hidden p-2" aria-label="Menu">
      <Menu class="w-6 h-6" />
    </button>

    <!-- Center: Logo -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <router-link to="/" class="font-serif text-2xl md:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity">
        LUSSO
      </router-link>
    </div>

    <!-- Right: Icons -->
    <div class="flex items-center gap-6">
      <button aria-label="Search" class="hover:opacity-70 transition-opacity">
        <Search class="w-5 h-5" />
      </button>
      <button
        aria-label="Cart"
        class="hover:opacity-70 transition-opacity relative"
        @click="toggleDrawer"
      >
        <ShoppingBag class="w-5 h-5" />
        <span v-if="cartCount > 0" class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-amber-800 text-[10px] font-bold text-white rounded-full">
          {{ cartCount }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Search, ShoppingBag, Menu } from 'lucide-vue-next';
import { useCart } from '../composables/useCart';

const isScrolled = ref(false);
const { toggleDrawer, cartCount } = useCart();
const route = useRoute();

const handleScroll = () => {
  // Always solid on collections page
  // On home page, solid only after scroll
  if (route.path !== '/') {
    isScrolled.value = true;
  } else {
    isScrolled.value = window.scrollY > 50;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(
  () => route.path,
  () => {
    // Reset scroll position is handled by router, but we need to update navbar state
    handleScroll();
  }
);
</script>
