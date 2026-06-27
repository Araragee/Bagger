import type Lenis from 'lenis'

/** Shared handle to the active Lenis instance (null when smooth scroll is off). */
let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}
export const getLenis = () => instance
