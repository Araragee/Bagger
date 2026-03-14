<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement | null>(null);
const imageContainerRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // Parallax on image wrapper
  gsap.fromTo(imageContainerRef.value,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
      }
    }
  );

  // Deep Parallax on the image inside the wrapper
  gsap.fromTo(imageRef.value,
    { y: "-10%" },
    {
      y: "10%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    }
  );

  // Staggered reveal of text elements
  gsap.fromTo(textRef.value?.children || [],
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 60%",
      }
    }
  );
});
</script>

<template>
  <section ref="sectionRef" class="flex min-h-screen w-full flex-col items-center justify-center bg-brand-black px-6 py-24 md:flex-row md:px-20 relative z-10">
    <div ref="imageContainerRef" class="w-full md:w-1/2 overflow-hidden rounded-sm relative h-[60vh] md:h-[80vh]">
      <img ref="imageRef"
           src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2670&auto=format&fit=crop"
           alt="Craftsman working on leather"
           class="absolute top-0 left-0 w-full h-[120%] object-cover" />
      <div class="absolute inset-0 bg-brand-black/20"></div>
    </div>

    <div ref="textRef" class="mt-16 flex w-full flex-col justify-center md:mt-0 md:w-1/2 md:pl-24">
      <h3 class="text-brand-gold text-xs tracking-[0.4em] uppercase mb-4">Heritage</h3>
      <h2 class="mb-8 text-4xl font-serif text-brand-light md:text-5xl leading-tight">The Art of<br/>Storytelling</h2>

      <div class="w-12 h-[1px] bg-brand-gold mb-8"></div>

      <p class="mb-6 text-lg font-light leading-relaxed text-brand-muted">
        Every piece of Lusso Leather tells a story. Born in the heart of Tuscany, our artisans have been perfecting their craft for generations. We believe in the beauty of imperfection, the scent of genuine leather, and the promise of durability.
      </p>
      <p class="text-lg font-light leading-relaxed text-brand-muted">
        Our commitment to sustainable sourcing and traditional tanning methods ensures that each piece is not just an accessory, but a legacy to be cherished for years to come.
      </p>
    </div>
  </section>
</template>
