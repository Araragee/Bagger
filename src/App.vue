<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import CartDrawer from "./components/CartDrawer.vue";
import ProductModal from "./components/ProductModal.vue";
import AppFooter from "./components/AppFooter.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMode } from "./composables/useMode";

gsap.registerPlugin(ScrollTrigger);

// initialise mode — applies CSS class to <html> on mount
useMode();
</script>

<template>
  <NavBar />
  <main class="w-full overflow-x-hidden bg-background text-on-background min-h-screen relative font-body antialiased">
    <router-view />
    <AppFooter />
    <CartDrawer />
    <ProductModal />
  </main>
</template>
