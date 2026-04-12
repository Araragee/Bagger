<template>
  <!-- MODERN MODE -->
  <article
    v-if="mode === 'modern'"
    class="group relative cursor-pointer"
    @click="handleClick"
  >
    <!-- Image: full-bleed, grayscale → color on hover -->
    <div class="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-high">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
        loading="lazy"
      />

      <!-- Era badge top-left -->
      <div class="absolute top-4 left-4 bg-surface-container-lowest/90 px-3 py-1">
        <span class="font-label text-[10px] tracking-widest text-on-surface uppercase">{{ product.era }}</span>
      </div>

      <!-- Condition badge top-right -->
      <div
        class="absolute top-4 right-4 px-2 py-1"
        :class="conditionBg"
      >
        <span class="font-label text-[9px] tracking-widest uppercase text-white">{{ product.condition }}</span>
      </div>

      <!-- Bottom metadata overlay on hover -->
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-surface-container-lowest/95 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p class="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">{{ product.description }}</p>
        <button
          class="mt-3 w-full bg-on-surface text-surface font-label text-[10px] tracking-archive uppercase py-2.5 hover:bg-secondary transition-colors duration-200"
          @click.stop="addToArchive"
        >
          Add to Archive
        </button>
      </div>
    </div>

    <!-- Product info below image -->
    <div class="pt-4 pb-1">
      <span class="font-label text-[10px] tracking-widest text-on-surface-variant uppercase block mb-1">{{ product.subcategory }}</span>
      <h3 class="font-headline font-bold text-on-surface uppercase tracking-tight leading-tight">{{ product.name }}</h3>
      <p class="font-label text-sm text-on-surface mt-1">{{ formatPrice(product.price) }}</p>
    </div>
  </article>

  <!-- POPPY MODE -->
  <article
    v-else-if="mode === 'poppy'"
    class="group relative cursor-pointer"
    @click="handleClick"
  >
    <!-- Image with vibrant overlay -->
    <div class="relative w-full aspect-[3/4] overflow-hidden bg-secondary/10 rounded-lg">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      <!-- Colourful gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <!-- Era pill -->
      <div class="absolute top-3 left-3 bg-secondary text-white rounded-full px-3 py-1">
        <span class="font-label text-[10px] font-bold tracking-widest uppercase">{{ product.era }}</span>
      </div>

      <!-- Condition circle -->
      <div
        class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
        :class="conditionBg"
      >
        <span class="font-label text-[8px] font-bold text-white uppercase leading-none text-center">{{ product.condition[0] }}</span>
      </div>

      <!-- CTA on hover -->
      <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button
          class="w-full bg-white text-secondary font-label text-[10px] tracking-widest uppercase py-3 rounded-full hover:bg-secondary hover:text-white transition-colors duration-200"
          @click.stop="addToArchive"
        >
          Add to Archive
        </button>
      </div>
    </div>

    <!-- Product info -->
    <div class="pt-4 pb-1">
      <span class="font-label text-[10px] tracking-widest text-secondary uppercase block mb-1 font-bold">{{ product.subcategory }}</span>
      <h3 class="font-headline font-extrabold text-on-surface uppercase text-lg tracking-tighter leading-none">{{ product.name }}</h3>
      <p class="font-label text-sm font-bold text-secondary mt-1.5">{{ formatPrice(product.price) }}</p>
    </div>
  </article>

  <!-- RETRO MODE -->
  <article
    v-else
    class="group relative cursor-pointer"
    @click="handleClick"
  >
    <div class="relative w-full aspect-[3/4] overflow-hidden bg-tertiary-fixed rounded-md">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[0.2] group-hover:sepia-0"
        loading="lazy"
      />

      <!-- Grain overlay -->
      <div class="grainy-overlay rounded-md" />

      <!-- Vintage label tag — top left -->
      <div class="absolute top-3 left-3 bg-tertiary-fixed px-3 py-1.5 rounded-md shadow-sm">
        <span class="font-label text-[10px] tracking-widest text-tertiary uppercase block">{{ product.era }}</span>
        <span class="font-headline font-bold text-tertiary-container text-xs italic">{{ product.condition }}</span>
      </div>

      <!-- Bottom overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-tertiary-fixed/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-b-md">
        <p class="font-body text-xs text-on-tertiary-fixed-variant line-clamp-2 leading-relaxed italic">{{ product.description }}</p>
        <button
          class="mt-3 w-full bg-tertiary text-white font-label text-[10px] tracking-widest uppercase py-2.5 rounded-md hover:bg-tertiary-container transition-colors duration-200"
          @click.stop="addToArchive"
        >
          Add to Archive
        </button>
      </div>
    </div>

    <!-- Product info -->
    <div class="pt-4 pb-1">
      <span class="font-label text-[10px] tracking-widest text-tertiary uppercase block mb-1">{{ product.subcategory }}</span>
      <h3 class="font-headline font-bold text-on-surface italic tracking-tight leading-tight">{{ product.name }}</h3>
      <p class="font-label text-sm text-tertiary mt-1">{{ formatPrice(product.price) }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'
import { useMode } from '../composables/useMode'
import { useCart } from '../composables/useCart'

const props = defineProps<{ product: Product }>()

const { mode } = useMode()
const { addToCart } = useCart()
const router = useRouter()

const conditionBg = computed(() => ({
  'bg-primary':   props.product.condition === 'Excellent',
  'bg-tertiary':  props.product.condition === 'Good',
  'bg-secondary': props.product.condition === 'Fair',
}))

function handleClick() {
  router.push(`/product/${props.product.id}`)
}

function addToArchive() {
  addToCart(props.product)
}
</script>
