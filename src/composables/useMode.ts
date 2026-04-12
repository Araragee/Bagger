import { ref, watch } from 'vue'

export type VisualMode = 'modern' | 'poppy' | 'retro'

const STORAGE_KEY = 'tca-visual-mode'

const stored = (localStorage.getItem(STORAGE_KEY) as VisualMode) || 'modern'
const mode = ref<VisualMode>(stored)

function applyModeClass(m: VisualMode) {
  const html = document.documentElement
  html.classList.remove('mode-modern', 'mode-poppy', 'mode-retro')
  html.classList.add(`mode-${m}`)
}

applyModeClass(mode.value)

watch(mode, (m) => {
  applyModeClass(m)
  localStorage.setItem(STORAGE_KEY, m)
})

export function useMode() {
  function setMode(m: VisualMode) {
    mode.value = m
  }

  return { mode, setMode }
}
