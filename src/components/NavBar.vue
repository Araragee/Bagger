<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 glass h-20 flex items-center justify-between px-6 md:px-10 transition-all duration-500"
    :class="isScrolled ? 'shadow-ambient' : ''"
  >
    <!-- Left: Logo -->
    <router-link
      to="/"
      class="font-headline font-extrabold text-lg tracking-tighter text-on-surface uppercase shrink-0"
      @click="closeMobileMenu"
    >
      The Curated Archive
    </router-link>

    <!-- Center: Category Links (desktop) -->
    <div class="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
      <router-link
        v-for="cat in CATEGORIES"
        :key="cat.slug"
        :to="`/${cat.slug}s`"
        class="font-headline text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors duration-200"
        active-class="text-on-surface border-b-2 border-secondary font-bold"
      >
        {{ cat.pluralName }}
      </router-link>
    </div>

    <!-- Right: Icons -->
    <div class="flex items-center gap-1">
      <!-- Cart -->
      <button
        aria-label="Open cart"
        class="relative p-2 hover:bg-surface-container transition-colors duration-200"
        @click="toggleDrawer"
      >
        <span class="material-symbols-outlined text-on-surface text-[22px]">shopping_bag</span>
        <span
          v-if="itemCount > 0"
          class="absolute top-1 right-1 w-4 h-4 rounded-full bg-secondary text-white font-label text-[9px] font-bold flex items-center justify-center leading-none"
        >{{ itemCount }}</span>
      </button>

      <!-- Account -->
      <button
        aria-label="Account"
        class="hidden md:flex p-2 hover:bg-surface-container transition-colors duration-200"
      >
        <span class="material-symbols-outlined text-on-surface text-[22px]">person</span>
      </button>

      <!-- Mobile hamburger -->
      <button
        aria-label="Open menu"
        class="lg:hidden p-2 hover:bg-surface-container transition-colors duration-200"
        @click="isMobileMenuOpen = true"
      >
        <span class="material-symbols-outlined text-on-surface text-[22px]">menu</span>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu Overlay -->
  <Teleport to="body">
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-[80] bg-surface-container-lowest flex flex-col lg:hidden"
      >
        <!-- Mobile Header -->
        <div class="flex items-center justify-between px-6 h-20 border-b border-surface-container-high">
          <router-link
            to="/"
            class="font-headline font-extrabold text-lg tracking-tighter text-on-surface uppercase"
            @click="closeMobileMenu"
          >
            The Curated Archive
          </router-link>
          <button
            aria-label="Close menu"
            class="p-2 hover:bg-surface-container transition-colors"
            @click="closeMobileMenu"
          >
            <span class="material-symbols-outlined text-on-surface text-[22px]">close</span>
          </button>
        </div>

        <!-- Mobile Links -->
        <nav class="flex-1 flex flex-col justify-center px-10 gap-2">
          <router-link
            v-for="cat in CATEGORIES"
            :key="cat.slug"
            :to="`/${cat.slug}s`"
            class="font-headline font-bold text-4xl tracking-tighter text-on-surface uppercase py-3 border-b border-surface-container-high hover:text-secondary transition-colors duration-200"
            @click="closeMobileMenu"
          >
            {{ cat.pluralName }}
          </router-link>
        </nav>

        <!-- Mobile Footer -->
        <div class="px-10 pb-12">
          <p class="font-label text-[10px] tracking-archive text-on-surface-variant uppercase">
            Editorial Thrift · Est. 2024
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'
import { CATEGORIES } from '../data/categories'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const { toggleDrawer, itemCount } = useCart()
const route = useRoute()

function handleScroll() {
  isScrolled.value = window.scrollY > 40
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

watch(() => route.path, closeMobileMenu)

watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
