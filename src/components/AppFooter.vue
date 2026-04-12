<template>
  <footer class="w-full bg-surface-container-low border-t border-surface-container-high relative z-10">

    <!-- Top grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-6 md:px-12 py-16 md:py-20">

      <!-- Brand -->
      <div class="lg:col-span-1">
        <p class="font-headline font-extrabold text-xl tracking-tighter uppercase text-on-surface mb-4">
          The Curated Archive
        </p>
        <p class="font-body text-sm text-on-surface-variant leading-relaxed max-w-xs">
          Redefining the second-hand experience through high-end editorial curation and archival documentation.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="font-label text-[10px] tracking-archive text-on-surface-variant uppercase mb-6">Quick Links</h4>
        <ul class="space-y-4">
          <li v-for="link in quickLinks" :key="link.label">
            <router-link
              :to="link.to"
              class="font-body text-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Categories -->
      <div>
        <h4 class="font-label text-[10px] tracking-archive text-on-surface-variant uppercase mb-6">Archive</h4>
        <ul class="space-y-4">
          <li v-for="cat in CATEGORIES" :key="cat.slug">
            <router-link
              :to="`/${cat.slug}s`"
              class="font-body text-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              {{ cat.pluralName }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <h4 class="font-label text-[10px] tracking-archive text-on-surface-variant uppercase mb-6">Weekly Drop Alert</h4>
        <p class="font-body text-xs text-on-surface-variant mb-4 italic">
          New pieces drop every week. Be first to know.
        </p>
        <form @submit.prevent="handleSubscribe" class="flex items-end gap-3">
          <div class="flex-1">
            <input
              v-model="email"
              type="email"
              placeholder="YOUR EMAIL"
              class="w-full bg-transparent border-b border-outline/40 py-2 text-on-surface font-label text-[10px] tracking-widest placeholder:text-on-surface-variant/50 focus:outline-none focus:border-on-surface transition-colors"
            />
          </div>
          <button
            type="submit"
            aria-label="Subscribe"
            class="pb-1.5 hover:text-secondary transition-colors"
          >
            <span class="material-symbols-outlined text-on-surface text-[20px]">arrow_forward</span>
          </button>
        </form>
        <p v-if="subscribed" class="font-label text-[10px] tracking-widest text-secondary uppercase mt-3">
          You're on the list.
        </p>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="px-6 md:px-12 py-6 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="font-body text-xs text-on-surface-variant">
        © 2024 The Curated Archive. Editorial Thrift.
      </p>
      <div class="flex items-center gap-6">
        <router-link
          to="/privacy"
          class="font-body text-xs text-on-surface-variant hover:text-on-surface transition-colors"
        >Privacy</router-link>
        <router-link
          to="/terms"
          class="font-body text-xs text-on-surface-variant hover:text-on-surface transition-colors"
        >Terms</router-link>
        <router-link
          to="/sustainability"
          class="font-body text-xs text-on-surface-variant hover:text-on-surface transition-colors"
        >Sustainability</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CATEGORIES } from '../data/categories'

const email = ref('')
const subscribed = ref(false)

const quickLinks = [
  { label: 'About the Archive', to: '/about' },
  { label: 'Shipping & Returns', to: '/contact' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'Contact', to: '/contact' },
]

function handleSubscribe() {
  if (email.value.trim()) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => { subscribed.value = false }, 4000)
  }
}
</script>
