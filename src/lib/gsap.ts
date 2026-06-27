/**
 * Central GSAP entry point. Registers ScrollTrigger once and re-exports both,
 * so feature code imports from here and never double-registers the plugin.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
