let cached: boolean | null = null

/** Detect WebGL support once, so 3D scenes can fall back gracefully. */
export function hasWebGL(): boolean {
  if (cached !== null) return cached
  if (typeof window === 'undefined') return (cached = false)
  try {
    const canvas = document.createElement('canvas')
    cached = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    cached = false
  }
  return cached
}
