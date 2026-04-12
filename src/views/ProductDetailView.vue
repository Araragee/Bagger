<template>
  <div class="product-detail-view min-h-screen relative overflow-hidden" :class="containerClass">
    <!-- Grain overlay for retro -->
    <div v-if="mode === 'retro'" class="grainy-overlay fixed inset-0 pointer-events-none z-0"></div>

    <div class="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start detail-grid">
        
        <!-- Image Section -->
        <div class="relative image-container group">
          <div :class="imageWrapperClass">
            <img :src="product.image" :alt="product.name" class="w-full h-auto object-cover aspect-[4/5]" />
            <!-- Poppy overlay -->
            <div v-if="mode === 'poppy'" class="absolute inset-0 bg-secondary/10 mix-blend-multiply group-hover:bg-secondary/0 transition-colors duration-500"></div>
          </div>
        </div>

        <!-- Detail Section -->
        <div class="flex flex-col justify-center min-h-[50vh] stagger-content">
          <!-- Breadcrumb / Category -->
          <div class="flex items-center space-x-3 mb-6">
             <router-link :to="`/${product.category === 'accessory' ? 'accessories' : product.category + 's'}`" class="font-label text-sm uppercase tracking-archive text-outline hover:text-on-surface transition-colors">
               {{ category?.name }} Archive
             </router-link>
             <span class="text-outline">/</span>
             <span class="font-label text-sm text-on-surface-variant">{{ product.subcategory }}</span>
          </div>

          <h1 class="font-headline mb-4" :class="headlineClass">{{ product.name }}</h1>
          <p class="font-label text-2xl mb-8" :class="priceClass">{{ formatPrice(product.price) }}</p>

          <!-- Badges -->
          <div class="flex flex-wrap gap-4 mb-10">
            <div class="flex flex-col">
              <span class="font-label text-xs tracking-archive text-outline mb-1 uppercase">Era</span>
              <div :class="badgeClass">{{ product.era }}</div>
            </div>
            <div class="flex flex-col">
              <span class="font-label text-xs tracking-archive text-outline mb-1 uppercase">Condition</span>
              <div :class="badgeClass">{{ product.condition }}</div>
            </div>
            <div class="flex flex-col">
              <span class="font-label text-xs tracking-archive text-outline mb-1 uppercase">Size</span>
              <div :class="badgeClass">{{ product.size }}</div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-10 text-on-surface-variant space-y-4">
             <p class="font-body text-base leading-relaxed" :class="descriptionClass">{{ product.description }}</p>
             <div class="pt-4 mt-4 ghost-border border-t border-x-0 border-b-0 flex space-x-2 items-center">
                <span class="material-symbols-outlined text-outline">architecture</span>
                <p class="font-body text-sm font-medium">{{ product.materials }}</p>
             </div>
          </div>

          <!-- CTA -->
          <button @click="handleAddToCart" :class="ctaClass" class="w-full md:w-auto px-10 py-5 font-label uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-3 shadow-ambient group">
             <span>Add to Archive</span>
             <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
          </button>
        </div>

      </div>
      <div v-else class="text-center py-24">
        <h2 class="font-headline text-3xl mb-4">Piece Not Found</h2>
        <router-link to="/" class="underline underline-offset-4 tracking-widest font-label uppercase text-sm">Return to Gallery</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { PRODUCTS, formatPrice } from '../data/products'
import type { Product } from '../data/products'
import { getCategoryBySlug } from '../data/categories'
import { useMode } from '../composables/useMode'
import { useCart } from '../composables/useCart'
import gsap from 'gsap'

const route = useRoute()
const { mode, setMode } = useMode()
const { addToCart } = useCart()

const product = ref<Product | undefined>(undefined)
const category = ref<any>(undefined)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {})
  loadProduct()
})

onBeforeUnmount(() => {
  if (ctx) ctx.revert()
})

watch(() => route.params.id, () => {
  loadProduct()
})

function loadProduct() {
  const id = Number(route.params.id)
  product.value = PRODUCTS.find(p => p.id === id)
  if (product.value) {
    category.value = getCategoryBySlug(product.value.category)
    if (category.value?.defaultMode) {
      setMode(category.value.defaultMode)
    }
    
    // GSAP animations scoped to context safely
    if (ctx) {
      ctx.add(() => {
        gsap.fromTo('.image-container', 
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
        )
        gsap.fromTo('.stagger-content > *',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.3 }
        )
      })
    }
  }
}

function handleAddToCart() {
  if (product.value) {
    addToCart(product.value)
  }
}

// Design System dynamic classes based on mode
const containerClass = computed(() => {
  if (mode.value === 'retro') return 'bg-surface text-on-surface'
  if (mode.value === 'poppy') return 'bg-surface text-on-surface'
  return 'bg-surface text-on-surface' // modern
})

const imageWrapperClass = computed(() => {
  if (mode.value === 'modern') return 'rounded-none overflow-hidden surface-container-lowest'
  if (mode.value === 'poppy') return 'rounded-full overflow-hidden border-8 border-surface-container-low shadow-lg'
  return 'rounded-md overflow-hidden ghost-border p-2 bg-surface-container-lowest' // retro
})

const headlineClass = computed(() => {
  if (mode.value === 'modern') return 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-editorial'
  if (mode.value === 'poppy') return 'text-5xl md:text-6xl font-black text-secondary uppercase'
  return 'text-5xl md:text-6xl italic font-light font-headline text-tertiary' // retro
})

const priceClass = computed(() => {
  if (mode.value === 'poppy') return 'text-primary'
  return 'text-on-surface'
})

const badgeClass = computed(() => {
  const base = 'px-4 py-2 font-label text-sm inline-flex items-center justify-center'
  if (mode.value === 'modern') return `${base} rounded-none bg-surface-container-low text-on-surface font-medium border border-transparent`
  if (mode.value === 'poppy') return `${base} rounded-full bg-secondary/10 text-secondary font-bold`
  return `${base} rounded-md ghost-border bg-surface-container-lowest text-tertiary font-medium shadow-sm` // retro tag feel
})

const descriptionClass = computed(() => {
  if (mode.value === 'modern') return 'text-lg leading-relaxed' 
  if (mode.value === 'poppy') return 'text-lg font-medium tracking-wide'
  return 'text-lg font-body italic opacity-90' // retro
})

const ctaClass = computed(() => {
  if (mode.value === 'modern') return 'rounded-none bg-primary text-on-primary hover:btn-primary-gradient'
  if (mode.value === 'poppy') return 'rounded-full bg-secondary text-white hover:bg-secondary/90 hover:scale-[1.02]'
  return 'rounded-md bg-tertiary text-white ghost-border hover:bg-tertiary/90' // retro
})
</script>

<style scoped>
.shadow-ambient {
  box-shadow: 0 10px 32px rgba(93, 92, 91, 0.06);
}
</style>
