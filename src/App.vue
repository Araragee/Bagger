<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import StylistChat from './components/StylistChat.vue';
import CartDrawer from './components/CartDrawer.vue';
import ProductModal from './components/ProductModal.vue';
import AppFooter from './components/AppFooter.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
</script>

<template>
  <NavBar />
  <main class="w-full overflow-x-hidden bg-brand-black text-brand-light min-h-screen relative font-sans antialiased selection:bg-brand-gold selection:text-brand-black">
    <router-view />
    <AppFooter />

    <StylistChat />
    <CartDrawer />
    <ProductModal />
  </main>
</template>
