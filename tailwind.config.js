/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, leather-shop palette — deliberately not the generic white/gray store
        bone: '#EDE6D6',
        'bone-200': '#E3DAC6',
        ink: '#17130E',
        'ink-soft': '#3A332A',
        clay: '#BE4A24',
        'clay-deep': '#9C3A18',
        moss: '#5A5A36',
        tan: '#C99B6A',
        cream: '#F6F1E7',
        // Dark "craft" palette (Rolex-led) for section-split theming
        espresso: '#19130D',
        char: '#221A12',
        'char-2': '#2C2218',
        brass: '#B08D57',
        'brass-bright': '#C9A86A',
        'bone-dim': '#B9AC96',
        // Semantic, theme-aware (resolve via tokens.css data-theme)
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid scale wired to tokens.css
        'fluid-sm': 'var(--step--1)',
        'fluid-base': 'var(--step-0)',
        'fluid-lg': 'var(--step-1)',
        'fluid-xl': 'var(--step-2)',
        'fluid-2xl': 'var(--step-3)',
        'fluid-3xl': 'var(--step-4)',
        display: ['var(--display)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      },
      transitionTimingFunction: {
        leather: 'cubic-bezier(0.16, 1, 0.3, 1)',
        settle: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      letterSpacing: {
        widest: '0.25em',
      },
      maxWidth: {
        wide: '1440px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'slide-in': 'slide-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
