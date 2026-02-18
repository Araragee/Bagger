<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out px-6 py-4 md:px-12 md:py-6 flex items-center justify-between',
      isScrolled ? 'bg-stone-50/95 backdrop-blur-md shadow-sm text-stone-900' : 'bg-transparent text-white'
    ]"
  >
    <!-- Left: Navigation Links -->
    <div class="hidden md:flex gap-8 font-sans text-sm tracking-widest uppercase font-medium">
      <a href="#hero" class="hover:opacity-70 transition-opacity">Home</a>
      <a href="#story" class="hover:opacity-70 transition-opacity">Our Story</a>
      <a href="#collection" class="hover:opacity-70 transition-opacity">Collection</a>
    </div>

    <!-- Mobile Menu Button (Left on mobile) -->
    <button class="md:hidden p-2" aria-label="Menu">
      <Menu class="w-6 h-6" />
    </button>

    <!-- Center: Logo -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <a href="#hero" class="font-serif text-2xl md:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity">
        LUSSO
      </a>
    </div>

    <!-- Right: Icons -->
    <div class="flex items-center gap-6">
      <button aria-label="Search" class="hover:opacity-70 transition-opacity">
        <Search class="w-5 h-5" />
      </button>
      <button aria-label="Cart" class="hover:opacity-70 transition-opacity relative">
        <ShoppingBag class="w-5 h-5" />
        <span v-if="cartCount > 0" class="absolute -top-1 -right-1 w-3 h-3 bg-amber-800 rounded-full"></span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Search, ShoppingBag, Menu } from 'lucide-vue-next';

const isScrolled = ref(false);
const cartCount = ref(0); // Dummy state for now

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
