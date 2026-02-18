<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import HeroSection from './components/HeroSection.vue';
import BrandStory from './components/BrandStory.vue';
import GallerySection from './components/GallerySection.vue';
import StylistChat from './components/StylistChat.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
</script>

<template>
  <NavBar />
  <main class="w-full overflow-x-hidden bg-stone-50">
    <HeroSection id="hero" />
    <BrandStory id="story" />
    <GallerySection id="collection" />
    <StylistChat />
  </main>
</template>
