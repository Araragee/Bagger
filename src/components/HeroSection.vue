<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const titleRef = ref(null);
const subtitleRef = ref(null);

onMounted(() => {
  const tl = gsap.timeline();
  tl.from(titleRef.value, {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
  })
  .from(subtitleRef.value, {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=1');
});
</script>

<template>
  <section class="relative h-screen w-full overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
      <div class="absolute inset-0 bg-stone-900/40"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex h-full flex-col items-center justify-center text-center text-stone-50 px-4">
      <h1 ref="titleRef" class="mb-4 text-5xl md:text-7xl font-serif tracking-wide">
        Lusso Leather
      </h1>
      <p ref="subtitleRef" class="text-lg md:text-xl font-light tracking-widest uppercase opacity-90">
        Timeless Elegance. Italian Craftsmanship.
      </p>
    </div>
  </section>
</template>
