<template>
  <footer class="relative z-10 bg-stone-900 text-stone-50 py-20 px-6 overflow-hidden">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <!-- Brand -->
      <div class="flex flex-col gap-6">
        <h2 class="text-4xl md:text-5xl font-serif tracking-tight">LUSSO</h2>
        <p class="text-stone-400 max-w-sm font-light">
          Defining modern luxury through timeless Italian craftsmanship and sustainable innovation.
        </p>
      </div>

      <!-- Links -->
      <div class="flex gap-12 md:gap-24">
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-bold uppercase tracking-widest text-amber-600">Shop</h3>
          <router-link to="/collections?sort=newest" class="text-stone-300 hover:text-white transition-colors">New Arrivals</router-link>
          <router-link to="/collections?sort=featured" class="text-stone-300 hover:text-white transition-colors">Best Sellers</router-link>
          <router-link to="/collections?type=Bag" class="text-stone-300 hover:text-white transition-colors">Bags</router-link>
          <router-link to="/collections?type=Shoe" class="text-stone-300 hover:text-white transition-colors">Shoes</router-link>
        </div>
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-bold uppercase tracking-widest text-amber-600">Company</h3>
          <router-link to="/about" class="text-stone-300 hover:text-white transition-colors">Our Story</router-link>
          <router-link to="/sustainability" class="text-stone-300 hover:text-white transition-colors">Sustainability</router-link>
          <router-link to="/contact" class="text-stone-300 hover:text-white transition-colors">Contact</router-link>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto mt-20 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
      <p>&copy; 2024 Lusso Leather. All rights reserved.</p>
      <div class="flex gap-6 mt-4 md:mt-0">
        <router-link to="/privacy" class="hover:text-white transition-colors">Privacy</router-link>
        <router-link to="/terms" class="hover:text-white transition-colors">Terms</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Simple static footer
</script>
