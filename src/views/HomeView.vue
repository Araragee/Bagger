<template>
  <div class="relative overflow-x-hidden bg-surface">

    <!-- Grain overlay (fixed, full page) -->
    <div class="grainy-overlay fixed inset-0 z-0 pointer-events-none" />

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex items-center px-6 md:px-12 overflow-hidden bg-surface">
      <!-- Hero editorial text -->
      <div class="relative z-10 max-w-3xl pt-20" ref="heroTextRef">
        <h1 class="font-headline font-extrabold text-[15vw] md:text-[10vw] leading-[0.85] tracking-tighter text-on-surface uppercase">
          The<br />Digital<br />
          <span class="text-secondary italic font-light">Curator</span>
        </h1>

        <div class="mt-10 flex flex-col sm:flex-row items-start sm:items-end gap-8">
          <router-link
            to="/bags"
            class="shrink-0 bg-primary text-on-primary px-10 py-5 font-label text-xs tracking-archive uppercase hover:bg-secondary transition-colors duration-500"
          >
            Explore Collection
          </router-link>
          <p class="max-w-xs font-body text-sm text-on-surface-variant leading-relaxed">
            A strictly edited archive of pre-loved high-fashion. We don't sell clothes — we curate legacies.
          </p>
        </div>
      </div>

      <!-- Hero right: large image -->
      <div class="absolute right-0 top-0 w-2/3 h-full z-0 overflow-hidden hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1400"
          alt="Editorial fashion"
          class="w-full h-full object-cover grayscale opacity-75"
          ref="heroImgRef"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent" />
      </div>

      <!-- Poppy badge -->
      <div
        ref="badgeRef"
        class="absolute bottom-16 right-8 md:right-20 w-40 h-40 rounded-full bg-secondary flex items-center justify-center -rotate-12 shadow-2xl z-20"
      >
        <span class="font-label text-white text-center font-bold tracking-widest text-xs p-4 uppercase leading-snug">
          New Drop<br />Week 42
        </span>
      </div>
    </section>

    <!-- ─── CATEGORY COLLAGE ──────────────────────────────────────── -->
    <section class="px-6 md:px-12 py-24 md:py-40 space-y-24 md:space-y-40 relative z-10">

      <!-- Row 1: Bags (wide) + Silk Archives (narrow) -->
      <div class="grid grid-cols-12 gap-4 md:gap-6 items-end" ref="row1Ref">

        <!-- Bags card — 7 cols -->
        <router-link to="/bags" class="col-span-12 md:col-span-7 group cursor-pointer block">
          <div class="relative overflow-hidden bg-surface-container-low aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200"
              alt="Curated vintage bags"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <!-- Bottom-left white overlay card -->
            <div class="absolute bottom-0 left-0 m-4 md:m-6 p-5 md:p-8 bg-surface-container-lowest/90 backdrop-blur-sm max-w-xs">
              <span class="font-label text-[10px] tracking-archive text-secondary block mb-2 uppercase">Category 01</span>
              <h3 class="font-headline text-2xl md:text-3xl font-bold text-on-surface">Bags</h3>
              <p class="font-body text-xs text-on-surface-variant mt-2 leading-relaxed">
                Sculptural silhouettes and timeless leather from 1970–1995.
              </p>
            </div>
          </div>
        </router-link>

        <!-- Silk Archives typographic card — 5 cols -->
        <div class="col-span-12 md:col-span-5 space-y-4 md:space-y-6">
          <router-link
            to="/shirts"
            class="aspect-square bg-tertiary-fixed flex flex-col justify-center items-center p-10 md:p-12 text-center group cursor-pointer relative overflow-hidden block"
          >
            <span class="font-label text-xs tracking-widest text-tertiary mb-4 uppercase">Archive Spotlight</span>
            <h3 class="font-headline text-5xl md:text-6xl font-extrabold text-tertiary-container uppercase leading-none">
              Silk<br />Archives
            </h3>
            <span
              class="material-symbols-outlined mt-8 text-4xl text-tertiary group-hover:translate-y-2 transition-transform duration-300"
            >auto_awesome</span>
            <div class="absolute top-3 right-3 font-label text-[9px] text-tertiary/40 tracking-widest">COLLECTION_V2</div>
          </router-link>
        </div>
      </div>

      <!-- Row 2: Shoes text + Image stack -->
      <div class="grid grid-cols-12 gap-6 md:gap-12 items-start" ref="row2Ref">

        <!-- Left text block — offset top -->
        <div class="col-span-12 md:col-span-4 md:mt-28">
          <div class="space-y-6 md:space-y-8">
            <h2 class="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter uppercase text-on-surface">
              Shoes
            </h2>
            <p class="font-body text-on-surface-variant leading-relaxed border-l-2 border-surface-container-highest pl-6 text-sm">
              From brutalist boots to elegant loafers, our footwear selection focuses on structural integrity and premium materials.
            </p>
            <router-link
              to="/shoes"
              class="inline-block font-label text-xs tracking-widest uppercase text-on-surface border-b border-on-surface pb-1 hover:text-secondary hover:border-secondary transition-colors duration-200"
            >
              View All Footwear
            </router-link>
          </div>
        </div>

        <!-- Right: stacked image + floating jacket card -->
        <div class="col-span-12 md:col-span-8">
          <div class="relative group">
            <div class="aspect-video bg-surface-container-high overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"
                alt="High-fashion footwear"
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            <!-- Floating jacket card — overlaps top-right -->
            <router-link
              to="/jackets"
              class="absolute -top-10 -right-4 md:-top-12 md:-right-10 w-48 md:w-64 bg-surface-container-lowest shadow-ambient-lg p-4 md:p-6 hidden sm:block hover:shadow-ambient transition-shadow duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=400"
                alt="Tailored jackets"
                class="w-full aspect-[4/3] object-cover mb-4"
              />
              <span class="font-label text-[10px] text-on-surface-variant tracking-widest block uppercase">Recently Added</span>
              <p class="font-headline font-bold text-on-surface text-sm uppercase tracking-tight">Tailored Jackets</p>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Row 3: Sweaters + Accessories (Poppy mode cards) -->
      <div class="grid grid-cols-12 gap-4 md:gap-6 items-stretch" ref="row3Ref">

        <router-link
          to="/sweaters"
          class="col-span-12 sm:col-span-6 group cursor-pointer block"
        >
          <div class="relative overflow-hidden aspect-[3/4] bg-surface-container">
            <img
              src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800"
              alt="Curated sweaters"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <!-- Poppy badge -->
            <div class="absolute top-4 right-4 w-20 h-20 rounded-full bg-secondary flex items-center justify-center rotate-6 shadow-lg">
              <span class="font-label text-white text-center text-[9px] font-bold tracking-widest uppercase leading-tight p-2">
                Knit<br />Drop
              </span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-on-surface/80 to-transparent">
              <h3 class="font-headline font-extrabold text-4xl text-surface uppercase tracking-tighter leading-none">Sweaters</h3>
              <p class="font-body text-xs text-surface/70 mt-2">Cashmere, wool, Fair Isle.</p>
            </div>
          </div>
        </router-link>

        <div class="col-span-12 sm:col-span-6 flex flex-col gap-4 md:gap-6">
          <router-link
            to="/shorts"
            class="group cursor-pointer block flex-1"
          >
            <div class="relative overflow-hidden aspect-video bg-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&q=80&w=800"
                alt="Vintage shorts"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute bottom-0 left-0 p-4 bg-surface-container-lowest/90">
                <span class="font-label text-[10px] tracking-archive text-secondary uppercase">Category 06</span>
                <h3 class="font-headline font-bold text-on-surface uppercase">Shorts</h3>
              </div>
            </div>
          </router-link>

          <router-link
            to="/accessories"
            class="group cursor-pointer block flex-1"
          >
            <div class="relative overflow-hidden aspect-video bg-tertiary-fixed">
              <img
                src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800"
                alt="Vintage accessories"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
              />
              <div class="absolute bottom-0 left-0 p-4 bg-tertiary-fixed/90">
                <span class="font-label text-[10px] tracking-archive text-tertiary uppercase">Category 07</span>
                <h3 class="font-headline font-bold text-tertiary-container uppercase">Accessories</h3>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ─── EDITORIAL QUOTE ──────────────────────────────────────── -->
    <section class="relative py-32 md:py-48 px-6 md:px-12 bg-on-surface text-surface text-center overflow-hidden" ref="quoteRef">
      <!-- Watermark -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span class="watermark text-[25vw] text-surface opacity-[0.04]">THRIFT</span>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto">
        <span class="material-symbols-outlined text-5xl md:text-6xl mb-8 text-secondary block"
          style="font-variation-settings: 'FILL' 1, 'wght' 400"
        >format_quote</span>
        <p class="font-headline text-3xl md:text-5xl lg:text-6xl font-light italic leading-tight">
          "Fashion is temporary. Curation is forever. We find the gems so you can wear the history."
        </p>
        <p class="font-label tracking-archive uppercase text-[10px] mt-12 text-surface/40">
          — The Archive Editorial Board
        </p>
      </div>
    </section>

    <!-- ─── RECENT DROPS GRID ────────────────────────────────────── -->
    <section class="px-6 md:px-12 py-24 md:py-32 bg-surface relative z-10" ref="dropsRef">
      <div class="flex items-end justify-between mb-12 md:mb-16">
        <div>
          <span class="font-label text-[10px] tracking-archive text-on-surface-variant uppercase block mb-2">Latest Additions</span>
          <h2 class="font-headline font-extrabold text-4xl md:text-6xl tracking-tighter uppercase text-on-surface">
            Recent<br />Drops
          </h2>
        </div>
        <router-link
          to="/bags"
          class="hidden sm:inline-block font-label text-xs tracking-widest uppercase text-on-surface border-b border-on-surface pb-1 hover:text-secondary hover:border-secondary transition-colors"
        >
          View All
        </router-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <ProductCard
          v-for="product in recentDrops"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard.vue'
import { PRODUCTS } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const heroTextRef = ref<HTMLElement | null>(null)
const heroImgRef  = ref<HTMLElement | null>(null)
const badgeRef    = ref<HTMLElement | null>(null)
const row1Ref     = ref<HTMLElement | null>(null)
const row2Ref     = ref<HTMLElement | null>(null)
const row3Ref     = ref<HTMLElement | null>(null)
const quoteRef    = ref<HTMLElement | null>(null)
const dropsRef    = ref<HTMLElement | null>(null)

// Last 8 products added (highest IDs)
const recentDrops = computed(() =>
  [...PRODUCTS].sort((a, b) => b.id - a.id).slice(0, 8)
)

onMounted(() => {
  // Hero text reveal
  gsap.from(heroTextRef.value, {
    y: 60,
    opacity: 0,
    duration: 1.4,
    ease: 'power3.out',
    delay: 0.1,
  })

  // Badge spin-in
  gsap.from(badgeRef.value, {
    scale: 0,
    opacity: 0,
    rotation: -45,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.8,
  })

  // Scroll-triggered rows
  const rows = [row1Ref.value, row2Ref.value, row3Ref.value]
  rows.forEach((el) => {
    if (!el) return
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  })

  // Quote section
  gsap.from(quoteRef.value, {
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: quoteRef.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  // Drops grid stagger
  if (dropsRef.value) {
    gsap.from(dropsRef.value.querySelectorAll('article'), {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: dropsRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }
})
</script>
