<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";

const titleRef = ref(null);
const subtitleRef = ref(null);
const bgRef = ref(null);

onMounted(() => {
  const tl = gsap.timeline();

  // Slow zoom effect on background for watch-like elegance
  gsap.to(bgRef.value, {
    scale: 1.1,
    duration: 20,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });

  tl.from(titleRef.value, {
    y: 50,
    opacity: 0,
    duration: 1.8,
    ease: "power3.out",
  }).from(
    subtitleRef.value,
    {
      y: 30,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    },
    "-=1.2",
  );
});
</script>

<template>
  <section class="relative h-screen w-full overflow-hidden bg-brand-black">
    <!-- Background Image -->
    <div
      ref="bgRef"
      class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=3115&auto=format&fit=crop')] bg-cover bg-center scale-100 origin-center"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/30 to-brand-black"
      ></div>
    </div>

    <!-- Content -->
    <div
      class="relative z-10 flex h-full flex-col items-center justify-center text-center text-brand-light px-4"
    >
      <h1
        ref="titleRef"
        class="mb-6 text-6xl md:text-8xl font-serif tracking-widest text-brand-light drop-shadow-lg"
      >
        LUSSO
      </h1>
      <p
        ref="subtitleRef"
        class="text-sm md:text-lg font-light tracking-[0.3em] uppercase opacity-90 text-brand-gold"
      >
        Timeless Elegance. Italian Craftsmanship.
      </p>
    </div>
  </section>
</template>
