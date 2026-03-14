<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '../data/products';
import { useProductModal } from '../composables/useProductModal';

gsap.registerPlugin(ScrollTrigger);

const { openModal } = useProductModal();
const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);

// Intro + 4 products = 5 panels
const galleryItems = PRODUCTS.slice(0, 4);

let ctx: gsap.Context;

onMounted(() => {
  if (!sectionRef.value || !trackRef.value) return;

  const panels = 5; // Intro + 4 products

  ctx = gsap.context(() => {
    gsap.to(trackRef.value, {
      xPercent: -100 * (panels - 1) / panels,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 1,
        // The scroll duration (scrub) should feel like 200vh of effort
        end: "+=2000"
      }
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="relative h-screen overflow-hidden bg-stone-100">
    <div ref="trackRef" class="flex h-full w-[500vw]">

      <!-- Panel 1: Intro Card -->
      <div class="flex h-full w-screen flex-col items-center justify-center bg-stone-900 p-10 text-stone-50">
        <h2 class="mb-6 text-6xl font-serif md:text-8xl">The Collection</h2>
        <p class="max-w-xl text-center text-xl font-light text-stone-300">
          Discover our latest arrivals. Each piece is a testament to the enduring allure of fine leather.
        </p>
        <span class="mt-10 text-sm tracking-[0.2em] uppercase text-amber-500">Scroll to Explore &rarr;</span>
      </div>

      <!-- Panels 2-5: Products -->
      <div v-for="product in galleryItems" :key="product.id" class="relative flex h-full w-screen items-center justify-center bg-stone-50 p-6 md:p-10">
        <div class="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-6 md:gap-10 md:flex-row">
          <div class="h-[40vh] md:h-[50vh] w-full md:w-1/2 overflow-hidden shadow-2xl">
            <img :src="product.image" :alt="product.name" class="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <div class="flex w-full flex-col items-center text-center md:items-start md:text-left justify-center md:w-1/2">
            <span class="mb-2 text-xs md:text-sm font-bold uppercase tracking-widest text-amber-800">{{ product.category }}</span>
            <h3 class="mb-2 md:mb-4 text-3xl font-serif text-stone-900 md:text-5xl">{{ product.name }}</h3>
            <p class="mb-4 md:mb-6 text-sm md:text-lg text-stone-600 line-clamp-3 md:line-clamp-none">{{ product.description }}</p>
            <p class="text-xl md:text-2xl font-medium text-stone-900">{{ product.price }}</p>
            <button @click="openModal(product)" class="mt-4 md:mt-8 rounded-none border border-stone-900 px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm font-medium uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white">
              View Details
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
