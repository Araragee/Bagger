<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const imageRef = ref(null);
const textRef = ref(null);

onMounted(() => {
  gsap.from(imageRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
    },
    y: 100,
    opacity: 0,
    duration: 1
  });

  gsap.from(textRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 70%",
      end: "bottom 40%",
      scrub: 1,
    },
    y: 50,
    opacity: 0,
    duration: 1
  });
});
</script>

<template>
  <section ref="sectionRef" class="flex min-h-screen w-full flex-col items-center justify-center bg-stone-50 px-6 py-20 md:flex-row md:px-20">
    <div class="w-full md:w-1/2">
      <img ref="imageRef"
           src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2670&auto=format&fit=crop"
           alt="Craftsman working on leather"
           class="h-[60vh] w-full object-cover shadow-xl md:h-[70vh]" />
    </div>
    <div ref="textRef" class="mt-10 flex w-full flex-col justify-center md:mt-0 md:w-1/2 md:pl-16">
      <h2 class="mb-6 text-4xl font-serif text-stone-900 md:text-5xl">The Art of Storytelling</h2>
      <p class="mb-6 text-lg font-light leading-relaxed text-stone-700">
        Every piece of Lusso Leather tells a story. Born in the heart of Tuscany, our artisans have been perfecting their craft for generations. We believe in the beauty of imperfection, the scent of genuine leather, and the promise of durability.
      </p>
      <p class="text-lg font-light leading-relaxed text-stone-700">
        Our commitment to sustainable sourcing and traditional tanning methods ensures that each bag is not just an accessory, but a legacy piece to be cherished for years to come.
      </p>
    </div>
  </section>
</template>
