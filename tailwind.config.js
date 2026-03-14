/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          dark: '#141414',
          gray: '#2a2a2a',
          light: '#f4f4f5',
          gold: '#cba052', // elegant metallic accent
          muted: '#8b8b8b',
        },
        stone: {
          50: '#fafaf9',
          900: '#1c1917',
        },
        amber: {
          800: '#92400e',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
