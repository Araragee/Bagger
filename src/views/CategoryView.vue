<template>
  <div
    class="relative min-h-screen bg-surface"
    :class="{ 'retro-page': category?.defaultMode === 'retro' }"
  >
    <!-- Retro grain -->
    <div v-if="category?.defaultMode === 'retro'" class="grainy-overlay fixed inset-0 z-0 pointer-events-none" />

    <div class="relative z-10 pt-28 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto">

      <!-- ── MODERN HEADER ───────────────────────────────────────── -->
      <header v-if="category?.defaultMode === 'modern'" class="mb-24" ref="headerRef">
        <div class="flex flex-col md:flex-row items-end justify-between pb-8 border-b border-outline-variant/15">
          <div class="max-w-2xl">
            <span class="font-label uppercase tracking-archive text-secondary text-xs mb-4 block">
              {{ collectionLabel }}
            </span>
            <h1 class="font-headline font-extrabold text-7xl md:text-9xl tracking-tighter leading-[0.85] text-on-surface uppercase">
              {{ category.pluralName }}
            </h1>
          </div>
          <div class="max-w-xs text-right mt-8 md:mt-0">
            <p class="font-body text-sm text-on-surface-variant leading-relaxed">
              {{ category.description }}
            </p>
          </div>
        </div>
      </header>

      <!-- ── POPPY HEADER ───────────────────────────────────────── -->
      <header v-else-if="category?.defaultMode === 'poppy'" class="relative mb-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-center" ref="headerRef">
        <div class="md:col-span-7 z-10">
          <div class="inline-block bg-secondary text-white font-label px-4 py-1.5 rounded-full mb-6 -rotate-2 shadow-lg text-[11px] tracking-widest uppercase">
            {{ category.heroTagline.split('.')[0] }}
          </div>
          <h1 class="font-headline font-extrabold text-7xl md:text-9xl tracking-tighter leading-none mb-8 text-on-surface uppercase">
            {{ category.pluralName }}<br />
            <span class="text-secondary italic font-light text-6xl md:text-8xl">Archive</span>
          </h1>
          <p class="text-lg max-w-md text-on-surface-variant font-body mb-10 leading-relaxed">
            {{ category.description }}
          </p>
          <div class="flex flex-wrap gap-4">
            <button
              class="bg-secondary text-on-secondary px-10 py-4 rounded-full font-label text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-lg"
              @click="activeFilter = 'all'"
            >
              Explore All
            </button>
            <button
              class="border-2 border-primary text-primary px-10 py-4 rounded-full font-label text-xs tracking-widest uppercase hover:bg-surface-container-low transition-colors"
            >
              The Story
            </button>
          </div>
        </div>
        <div class="md:col-span-5 relative mt-12 md:mt-0">
          <!-- Poppy blobs -->
          <div class="absolute -top-10 -right-10 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div class="absolute -bottom-10 -left-10 w-72 h-72 bg-tertiary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
          <div class="relative bg-surface-container-lowest p-3 rounded-[3.5rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <img
              :src="category.heroImage"
              :alt="category.pluralName"
              class="w-full h-[420px] md:h-[500px] object-cover rounded-[3rem]"
            />
          </div>
        </div>
      </header>

      <!-- ── RETRO HEADER ───────────────────────────────────────── -->
      <header v-else class="mb-20" ref="headerRef">
        <div class="flex flex-col md:flex-row md:items-baseline gap-4 mb-8">
          <h1 class="font-headline font-light italic tracking-tight text-7xl md:text-9xl text-primary">
            {{ category.pluralName }}
          </h1>
          <span class="font-label text-secondary uppercase tracking-widest text-xs">
            {{ collectionLabel }}
          </span>
        </div>
        <p class="max-w-2xl text-lg text-tertiary font-body leading-relaxed italic">
          {{ category.description }}
        </p>
      </header>

      <!-- ── FILTER BAR ──────────────────────────────────────────── -->

      <!-- Modern filter -->
      <section v-if="category?.defaultMode === 'modern'" class="flex flex-wrap items-center justify-between mb-16 gap-6">
        <div class="flex flex-wrap gap-6 font-label text-xs uppercase tracking-widest overflow-x-auto pb-1">
          <button
            v-for="f in filters"
            :key="f"
            class="transition-colors duration-200 whitespace-nowrap"
            :class="activeFilter === f
              ? 'text-on-surface border-b border-on-surface pb-0.5'
              : 'text-on-surface-variant hover:text-on-surface'"
            @click="activeFilter = f"
          >{{ f }}</button>
        </div>
        <div class="flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">
          <span>{{ filteredProducts.length }} pieces</span>
        </div>
      </section>

      <!-- Poppy filter -->
      <section v-else-if="category?.defaultMode === 'poppy'" class="flex flex-wrap gap-3 mb-16 items-center">
        <span class="font-label text-xs uppercase tracking-widest text-on-surface-variant mr-2">Filter:</span>
        <button
          v-for="f in filters"
          :key="f"
          class="px-5 py-2.5 rounded-full font-label text-xs tracking-widest uppercase transition-all duration-200"
          :class="activeFilter === f
            ? 'bg-secondary text-white'
            : 'bg-surface-container-highest text-on-surface hover:bg-secondary hover:text-white'"
          @click="activeFilter = f"
        >{{ f }}</button>
        <div class="ml-auto flex items-center gap-2">
          <span class="material-symbols-outlined text-on-surface text-[20px] cursor-pointer">grid_view</span>
          <span class="material-symbols-outlined text-on-surface-variant text-[20px] cursor-pointer">view_agenda</span>
        </div>
      </section>

      <!-- Retro filter -->
      <section v-else class="flex flex-wrap items-center gap-4 mb-16 pb-8 border-b border-outline-variant/20">
        <span class="font-label text-xs uppercase tracking-widest text-outline mr-2">Filter By:</span>
        <button
          v-for="f in filters"
          :key="f"
          class="px-5 py-2 rounded-md font-label text-xs uppercase tracking-widest transition-colors duration-200"
          :class="activeFilter === f
            ? 'bg-surface-container-highest text-on-surface'
            : 'bg-surface-container-low text-on-surface hover:bg-tertiary-fixed'"
          @click="activeFilter = f"
        >{{ f }}</button>
      </section>

      <!-- ── PRODUCT GRID ────────────────────────────────────────── -->

      <!-- MODERN GRID -->
      <section v-if="category?.defaultMode === 'modern'" ref="gridRef">
        <!-- Bento top row: featured (8) + sidebar (4) -->
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-12 gap-6 md:gap-8 mb-8">
          <!-- Featured large card -->
          <div
            class="col-span-12 md:col-span-8 group relative aspect-video overflow-hidden bg-surface-container-low cursor-pointer"
            @click="goToProduct(filteredProducts[0])"
          >
            <img
              :src="filteredProducts[0].image"
              :alt="filteredProducts[0].name"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white mix-blend-difference">
              <div>
                <h3 class="font-headline font-bold text-3xl md:text-4xl tracking-tighter uppercase">{{ filteredProducts[0].name }}</h3>
                <p class="font-label uppercase text-[10px] tracking-archive opacity-80">Circa {{ filteredProducts[0].era }} / {{ filteredProducts[0].materials.split(',')[0] }}</p>
              </div>
              <span class="font-headline text-xl font-medium shrink-0 ml-4">{{ formatPrice(filteredProducts[0].price) }}</span>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="col-span-12 md:col-span-4 flex flex-col gap-6">
            <div
              v-if="filteredProducts[1]"
              class="flex-1 bg-surface-container-lowest p-6 md:p-8 flex flex-col justify-between group border-l-4 border-transparent hover:border-secondary transition-all cursor-pointer"
              @click="goToProduct(filteredProducts[1])"
            >
              <div>
                <span class="font-label text-[10px] uppercase tracking-archive text-secondary block mb-4">{{ filteredProducts[1].condition }}</span>
                <h3 class="font-headline font-bold text-xl tracking-tight mb-2 uppercase">{{ filteredProducts[1].name }}</h3>
                <p class="font-body text-on-surface-variant text-sm line-clamp-2">{{ filteredProducts[1].description }}</p>
              </div>
              <div class="flex justify-between items-center mt-8">
                <span class="font-headline font-bold text-lg">{{ formatPrice(filteredProducts[1].price) }}</span>
                <span class="material-symbols-outlined text-on-surface group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>

            <div
              v-if="filteredProducts[2]"
              class="aspect-square bg-surface-container-high overflow-hidden cursor-pointer"
              @click="goToProduct(filteredProducts[2])"
            >
              <img
                :src="filteredProducts[2].image"
                :alt="filteredProducts[2].name"
                class="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        <!-- Regular 3-col grid below -->
        <div v-if="filteredProducts.length > 3" class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-4">
          <ProductCard
            v-for="product in filteredProducts.slice(3)"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>

      <!-- POPPY GRID -->
      <section v-else-if="category?.defaultMode === 'poppy'" ref="gridRef">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <!-- Large feature card (spans 2 cols + 2 rows) -->
          <div
            v-if="filteredProducts[0]"
            class="md:col-span-2 md:row-span-2 group cursor-pointer"
            @click="goToProduct(filteredProducts[0])"
          >
            <div class="bg-surface-container-low p-2 rounded-[2.5rem] overflow-hidden relative h-full min-h-[480px]">
              <img
                :src="filteredProducts[0].image"
                :alt="filteredProducts[0].name"
                class="w-full h-full object-cover rounded-[2rem] group-hover:scale-110 transition-transform duration-700 min-h-[480px]"
              />
              <div class="absolute bottom-4 left-4 right-4 p-6 md:p-8 bg-surface-container-lowest/90 backdrop-blur-md rounded-[1.5rem] shadow-xl">
                <div class="flex justify-between items-end">
                  <div>
                    <h3 class="font-headline font-bold text-2xl mb-1">{{ filteredProducts[0].name }}</h3>
                    <p class="font-label text-[10px] uppercase tracking-widest text-secondary">{{ filteredProducts[0].materials.split(',')[0] }}</p>
                  </div>
                  <div class="text-right shrink-0 ml-4">
                    <span class="font-label font-bold text-xl block">{{ formatPrice(filteredProducts[0].price) }}</span>
                    <button
                      class="block mt-3 bg-on-surface text-surface p-3 rounded-full hover:bg-secondary transition-colors"
                      @click.stop="addToArchive(filteredProducts[0])"
                    >
                      <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Remaining cards -->
          <template v-for="(product, i) in filteredProducts.slice(1)" :key="product.id">
            <div
              class="group cursor-pointer"
              @click="goToProduct(product)"
            >
              <div
                class="bg-surface-container-lowest p-2 overflow-hidden relative aspect-[3/4]"
                :class="i % 3 === 0 ? 'rounded-full' : 'rounded-[2rem]'"
              >
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover transition-transform duration-500"
                  :class="i % 3 === 0 ? 'rounded-full group-hover:rotate-6' : 'rounded-[1.5rem] group-hover:scale-105'"
                />
                <div
                  v-if="i % 3 === 0"
                  class="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  :class="i % 3 === 0 ? 'rounded-full' : 'rounded-[2rem]'"
                >
                  <span class="bg-surface-container-lowest text-on-surface px-5 py-2 rounded-full font-label text-xs tracking-widest uppercase">View Piece</span>
                </div>
                <div v-if="product.condition === 'Excellent'" class="absolute top-3 right-3 bg-secondary text-white rounded-full px-3 py-1">
                  <span class="font-label text-[9px] tracking-widest uppercase">Mint</span>
                </div>
              </div>
              <div class="mt-4 px-2">
                <h3 class="font-headline font-bold text-lg">{{ product.name }}</h3>
                <div class="flex justify-between items-center mt-1">
                  <span class="font-label text-sm text-on-surface-variant">{{ formatPrice(product.price) }}</span>
                  <div
                    class="w-3.5 h-3.5 rounded-full"
                    :class="conditionDot(product.condition)"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- RETRO GRID -->
      <section v-else ref="gridRef">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

          <!-- Featured large card (8 col) -->
          <div
            v-if="filteredProducts[0]"
            class="md:col-span-8 flex flex-col group cursor-pointer"
            @click="goToProduct(filteredProducts[0])"
          >
            <div class="relative aspect-[4/5] bg-surface-container overflow-hidden rounded-md">
              <img
                :src="filteredProducts[0].image"
                :alt="filteredProducts[0].name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute top-6 left-6 bg-secondary text-white px-4 py-1 font-label text-[10px] tracking-widest uppercase">
                Archive Pick
              </div>
            </div>
            <div class="mt-6 flex justify-between items-start">
              <div>
                <h3 class="font-headline italic font-light text-2xl">{{ filteredProducts[0].name }}</h3>
                <p class="font-label text-[10px] text-outline mt-1 uppercase tracking-widest">
                  Circa {{ filteredProducts[0].era }} / {{ filteredProducts[0].condition }} Condition
                </p>
              </div>
              <span class="font-headline text-secondary text-xl shrink-0 ml-4">{{ formatPrice(filteredProducts[0].price) }}</span>
            </div>
          </div>

          <!-- Sidebar (4 col) — 2 square cards -->
          <div class="md:col-span-4 flex flex-col gap-10">
            <div
              v-for="product in filteredProducts.slice(1, 3)"
              :key="product.id"
              class="group cursor-pointer"
              @click="goToProduct(product)"
            >
              <div class="relative aspect-square bg-surface-container overflow-hidden rounded-md">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:grayscale transition-all duration-500"
                />
              </div>
              <div class="mt-4">
                <h3 class="font-headline italic font-light text-lg">{{ product.name }}</h3>
                <span class="font-label text-sm text-secondary">{{ formatPrice(product.price) }}</span>
              </div>
            </div>
          </div>

          <!-- Editorial spotlight row (full 12 col) -->
          <div
            v-if="filteredProducts[3]"
            class="md:col-span-12 mt-4 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <div class="order-2 md:order-1 px-0 md:px-8">
              <span class="font-label text-[10px] uppercase tracking-widest text-outline mb-4 block">Designer Spotlight</span>
              <h2 class="font-headline font-light italic text-4xl md:text-5xl mb-6">{{ filteredProducts[3].name }}</h2>
              <p class="text-tertiary leading-relaxed mb-8 font-body text-sm">
                {{ filteredProducts[3].description }}
              </p>
              <button
                class="border border-outline px-10 py-4 font-label text-xs uppercase tracking-widest hover:bg-on-surface hover:text-surface transition-all"
                @click="goToProduct(filteredProducts[3])"
              >
                Acquire Piece
              </button>
            </div>
            <div
              class="order-1 md:order-2 aspect-video bg-surface-container-high rounded-md overflow-hidden shadow-2xl cursor-pointer"
              @click="goToProduct(filteredProducts[3])"
            >
              <img
                :src="filteredProducts[3].image"
                :alt="filteredProducts[3].name"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Regular 3-up grid -->
          <div v-if="filteredProducts.length > 4" class="md:col-span-12 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-4">
            <ProductCard
              v-for="product in filteredProducts.slice(4)"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </section>

      <!-- Empty state -->
      <div v-if="filteredProducts.length === 0" class="py-32 text-center">
        <p class="font-headline font-light italic text-3xl text-on-surface-variant">No pieces found.</p>
        <button class="mt-6 font-label text-xs tracking-widest uppercase text-on-surface border-b border-on-surface pb-1" @click="activeFilter = 'all'">
          Clear Filter
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard.vue'
import { PRODUCTS, getByCategory, formatPrice } from '../data/products'
import type { ProductCategory } from '../data/products'
import { CATEGORIES, getCategoryBySlug } from '../data/categories'
import { useMode } from '../composables/useMode'
import { useCart } from '../composables/useCart'

gsap.registerPlugin(ScrollTrigger)

const route  = useRoute()
const router = useRouter()
const { setMode } = useMode()
const { addToCart } = useCart()

const headerRef = ref<HTMLElement | null>(null)
const gridRef   = ref<HTMLElement | null>(null)

// Map URL segment → ProductCategory slug
const slugMap: Record<string, ProductCategory> = {
  bags:        'bag',
  shirts:      'shirt',
  jackets:     'jacket',
  sweaters:    'sweater',
  shoes:       'shoe',
  shorts:      'short',
  accessories: 'accessory',
}

const categorySlug = computed(() => {
  const param = route.params.categorySlug as string
  return slugMap[param] ?? null
})

const category = computed(() =>
  categorySlug.value ? getCategoryBySlug(categorySlug.value) : null
)

const allProducts = computed(() =>
  categorySlug.value ? getByCategory(categorySlug.value) : []
)

// Build filter list: "all" + unique subcategories
const filters = computed(() => {
  const subs = [...new Set(allProducts.value.map(p => p.subcategory))]
  return ['all', ...subs]
})

const activeFilter = ref('all')

const filteredProducts = computed(() =>
  activeFilter.value === 'all'
    ? allProducts.value
    : allProducts.value.filter(p => p.subcategory === activeFilter.value)
)

// Collection label helper
const collectionLabel = computed(() => {
  const idx = CATEGORIES.findIndex(c => c.slug === categorySlug.value) + 1
  return `Collection ${String(idx).padStart(2, '0')} / Archival Finds`
})

function conditionDot(condition: string) {
  return {
    'bg-primary':   condition === 'Excellent',
    'bg-tertiary':  condition === 'Good',
    'bg-secondary': condition === 'Fair',
  }
}

function goToProduct(product: { id: number }) {
  router.push(`/product/${product.id}`)
}

function addToArchive(product: any) {
  addToCart(product)
}

// Sync visual mode with category default
watch(category, (cat) => {
  if (cat) setMode(cat.defaultMode)
}, { immediate: true })

// Reset filter when route changes
watch(() => route.params.categorySlug, () => {
  activeFilter.value = 'all'
})

let ctx: gsap.Context
// Entrance animations
onMounted(() => {
  ctx = gsap.context(() => {
    if (headerRef.value) {
      gsap.from(headerRef.value, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
      })
    }
    if (gridRef.value) {
      gsap.from(gridRef.value.querySelectorAll('.group'), {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.3,
      })
    }
  })
})

onBeforeUnmount(() => {
  if (ctx) ctx.revert()
})
</script>
