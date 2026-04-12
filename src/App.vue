<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import CartDrawer from "./components/CartDrawer.vue";
import ProductModal from "./components/ProductModal.vue";
import AppFooter from "./components/AppFooter.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMode } from "./composables/useMode";
import { useCart } from "./composables/useCart";
import { watch } from "vue";
import { useRoute } from "vue-router";

gsap.registerPlugin(ScrollTrigger);

const { mode } = useMode();
const { isDrawerOpen, closeDrawer } = useCart();
const route = useRoute();

watch(mode, (newVal, oldVal) => {
  if (oldVal && oldVal !== newVal) {
    gsap.fromTo(
      "main",
      { opacity: 0.4 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }
});

watch(
  () => route.path,
  () => {
    if (isDrawerOpen.value) {
      closeDrawer();
    }
  }
);
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
