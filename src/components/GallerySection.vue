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
  <section ref="sectionRef" class="relative h-screen overflow-hidden bg-brand-dark">
    <div ref="trackRef" class="flex h-full w-[500vw]">

      <!-- Panel 1: Intro Card -->
      <div class="relative flex h-full w-screen flex-col items-center justify-center bg-brand-black p-10 text-brand-light overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div class="relative z-10 flex flex-col items-center">
          <h3 class="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6">Exclusivity</h3>
          <h2 class="mb-8 text-6xl font-serif md:text-8xl tracking-widest drop-shadow-lg">The Collection</h2>
          <div class="w-16 h-[1px] bg-brand-gold mb-8"></div>
          <p class="max-w-xl text-center text-lg md:text-xl font-light text-brand-muted leading-relaxed">
            Discover our latest arrivals. Each piece is a testament to the enduring allure of fine craftsmanship and design.
          </p>
          <div class="mt-16 flex flex-col items-center animate-bounce">
            <span class="text-xs tracking-[0.3em] uppercase text-brand-gold mb-2">Scroll</span>
            <div class="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent"></div>
          </div>
        </div>
      </div>

      <!-- Panels 2-5: Products -->
      <div v-for="(product, index) in galleryItems" :key="product.id" class="relative flex h-full w-screen items-center justify-center bg-brand-dark p-6 md:p-20">
        <!-- Subtle background numbering -->
        <div class="absolute right-10 bottom-10 md:right-20 md:bottom-20 text-[10rem] md:text-[20rem] font-serif font-bold text-brand-black opacity-40 select-none pointer-events-none z-0">
          0{{ index + 1 }}
        </div>

        <div class="relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-center gap-10 md:gap-20 md:flex-row">
          <div class="h-[45vh] md:h-[65vh] w-full md:w-1/2 overflow-hidden shadow-2xl relative group">
            <div class="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
            <img :src="product.image" :alt="product.name" class="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
          </div>

          <div class="flex w-full flex-col items-center text-center md:items-start md:text-left justify-center md:w-1/2 md:pr-10">
            <span class="mb-4 text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-brand-gold">{{ product.category }}</span>
            <h3 class="mb-6 text-4xl font-serif text-brand-light md:text-6xl tracking-wide leading-tight">{{ product.name }}</h3>
            <div class="w-8 h-[1px] bg-brand-gray mb-6 hidden md:block"></div>
            <p class="mb-8 text-sm md:text-lg font-light text-brand-muted line-clamp-3 md:line-clamp-none leading-relaxed">{{ product.description }}</p>
            <p class="text-2xl md:text-3xl font-serif text-brand-light tracking-wider mb-10">{{ product.price }}</p>

            <button @click="openModal(product)" class="relative group overflow-hidden border border-brand-gray bg-transparent px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-brand-light transition-all hover:border-brand-gold">
              <span class="relative z-10 transition-colors group-hover:text-brand-black">View Details</span>
              <div class="absolute inset-0 h-full w-full translate-y-full bg-brand-gold transition-transform duration-300 ease-out group-hover:translate-y-0 z-0"></div>
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
