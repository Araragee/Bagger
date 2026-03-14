<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out px-6 py-4 md:px-12 md:py-6 flex items-center justify-between',
      isScrolled ? 'bg-stone-50/95 backdrop-blur-md shadow-sm text-stone-900' : 'bg-transparent text-stone-900 md:text-white'
    ]"
  >
    <!-- Left: Navigation Links -->
    <div class="hidden md:flex gap-8 font-sans text-sm tracking-widest uppercase font-medium items-center">
      <router-link to="/" class="hover:opacity-70 transition-opacity">Home</router-link>

      <!-- Shop Dropdown -->
      <div class="relative group" @mouseenter="isShopMenuOpen = true" @mouseleave="isShopMenuOpen = false">
        <button class="flex items-center gap-1 hover:opacity-70 transition-opacity focus:outline-none">
          Shop <ChevronDown class="w-4 h-4" />
        </button>

        <!-- Dropdown Menu -->
        <div
          v-show="isShopMenuOpen"
          class="absolute top-full left-0 mt-2 w-48 bg-stone-50 text-stone-900 shadow-xl border border-stone-100 py-2 rounded-sm origin-top-left transition-all duration-200"
        >
          <router-link to="/collections" class="block px-6 py-3 hover:bg-stone-100 transition-colors">All Products</router-link>
          <router-link to="/collections?type=Bag" class="block px-6 py-3 hover:bg-stone-100 transition-colors">Bags</router-link>
          <router-link to="/collections?type=Shoe" class="block px-6 py-3 hover:bg-stone-100 transition-colors">Shoes</router-link>
        </div>
      </div>

      <router-link to="/about" class="hover:opacity-70 transition-opacity">About</router-link>
    </div>

    <!-- Mobile Menu Button (Left on mobile) -->
    <button @click="isMobileMenuOpen = true" class="md:hidden p-2 hover:opacity-70 transition-opacity" aria-label="Menu">
      <Menu class="w-6 h-6" />
    </button>

    <!-- Center: Logo -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" :class="{'opacity-0 pointer-events-none': isSearchOpen}">
      <router-link to="/" class="font-serif text-2xl md:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity">
        LUSSO
      </router-link>
    </div>

    <!-- Right: Icons -->
    <div class="flex items-center gap-4 md:gap-6">
      <!-- Search Bar -->
      <div class="relative flex items-center">
        <div
          v-if="isSearchOpen"
          class="absolute right-0 flex items-center bg-stone-50 text-stone-900 rounded-full px-4 py-2 shadow-lg border border-stone-200 w-[160px] sm:w-[200px] md:w-[300px] transition-all duration-300"
        >
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            @keyup.enter="performSearch"
            type="text"
            placeholder="Search..."
            class="bg-transparent border-none outline-none text-sm w-full placeholder-stone-400"
          />
          <button @click="closeSearch" class="ml-2 hover:text-amber-800">
            <X class="w-4 h-4" />
          </button>
        </div>

        <button
          v-if="!isSearchOpen"
          @click="openSearch"
          aria-label="Search"
          class="hover:opacity-70 transition-opacity"
        >
          <Search class="w-5 h-5" />
        </button>
      </div>

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

    <!-- Mobile Navigation Overlay -->
    <Teleport to="body">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-[60] bg-stone-900 text-stone-50 flex flex-col md:hidden transition-all duration-300 ease-in-out"
      >
        <div class="flex items-center justify-between p-6 border-b border-stone-800">
          <router-link to="/" @click="isMobileMenuOpen = false" class="font-serif text-2xl font-bold tracking-tight">
            LUSSO
          </router-link>
          <button @click="isMobileMenuOpen = false" class="p-2 hover:opacity-70 transition-opacity" aria-label="Close Menu">
            <X class="w-6 h-6" />
          </button>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center gap-8 text-xl tracking-widest uppercase font-medium">
          <router-link to="/" @click="isMobileMenuOpen = false" class="hover:text-amber-500 transition-colors py-2">Home</router-link>
          <router-link to="/collections" @click="isMobileMenuOpen = false" class="hover:text-amber-500 transition-colors py-2">All Products</router-link>
          <router-link to="/collections?type=Bag" @click="isMobileMenuOpen = false" class="hover:text-amber-500 transition-colors py-2">Bags</router-link>
          <router-link to="/collections?type=Shoe" @click="isMobileMenuOpen = false" class="hover:text-amber-500 transition-colors py-2">Shoes</router-link>
          <router-link to="/about" @click="isMobileMenuOpen = false" class="hover:text-amber-500 transition-colors py-2">About</router-link>
        </div>
      </div>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search, ShoppingBag, Menu, ChevronDown, X } from 'lucide-vue-next';
import { useCart } from '../composables/useCart';

const isScrolled = ref(false);
const isShopMenuOpen = ref(false);
const isSearchOpen = ref(false);
const isMobileMenuOpen = ref(false);
const searchQuery = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);

const { toggleDrawer, cartCount } = useCart();
const route = useRoute();
const router = useRouter();

const handleScroll = () => {
  if (route.path !== '/') {
    isScrolled.value = true;
  } else {
    isScrolled.value = window.scrollY > 50;
  }
};

const openSearch = async () => {
  isSearchOpen.value = true;
  await nextTick();
  searchInputRef.value?.focus();
};

const closeSearch = () => {
  isSearchOpen.value = false;
  searchQuery.value = '';
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/collections', query: { search: searchQuery.value } });
    // Optional: close search or keep it open
    // closeSearch();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(
  () => route.path,
  () => {
    handleScroll();
    isShopMenuOpen.value = false; // Close menu on navigation
    isSearchOpen.value = false; // Close search on navigation
    isMobileMenuOpen.value = false; // Close mobile menu on navigation
  }
);

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>
