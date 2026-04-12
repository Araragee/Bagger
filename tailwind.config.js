/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Surface hierarchy
        'background':                 '#faf9f6',
        'surface':                    '#faf9f6',
        'surface-bright':             '#faf9f6',
        'surface-dim':                '#dbdad7',
        'surface-container-lowest':   '#ffffff',
        'surface-container-low':      '#f4f3f1',
        'surface-container':          '#efeeeb',
        'surface-container-high':     '#e9e8e5',
        'surface-container-highest':  '#e3e2e0',
        'surface-variant':            '#e3e2e0',
        'surface-tint':               '#5f5e5e',

        // On-surface
        'on-background':              '#1a1c1a',
        'on-surface':                 '#1a1c1a',
        'on-surface-variant':         '#5b403f',

        // Primary (neutral dark)
        'primary':                    '#5d5c5b',
        'primary-container':          '#757474',
        'primary-fixed':              '#e5e2e1',
        'primary-fixed-dim':          '#c8c6c5',
        'on-primary':                 '#ffffff',
        'on-primary-container':       '#f7feff',
        'on-primary-fixed':           '#1c1b1b',
        'on-primary-fixed-variant':   '#474746',
        'inverse-primary':            '#c8c6c5',

        // Secondary (burnt orange — accent)
        'secondary':                  '#aa3000',
        'secondary-container':        '#d43f00',
        'secondary-fixed':            '#ffdbd0',
        'secondary-fixed-dim':        '#ffb59e',
        'on-secondary':               '#ffffff',
        'on-secondary-container':     '#fffbff',
        'on-secondary-fixed':         '#3a0b00',
        'on-secondary-fixed-variant': '#852400',

        // Tertiary (warm brown)
        'tertiary':                   '#655a4c',
        'tertiary-container':         '#7e7363',
        'tertiary-fixed':             '#efe0cd',
        'tertiary-fixed-dim':         '#d2c4b2',
        'on-tertiary':                '#ffffff',
        'on-tertiary-container':      '#fffbff',
        'on-tertiary-fixed':          '#221a0f',
        'on-tertiary-fixed-variant':  '#4f4538',

        // Outline / borders
        'outline':                    '#8f6f6e',
        'outline-variant':            '#e4bebc',

        // Inverse
        'inverse-surface':            '#2f312f',
        'inverse-on-surface':         '#f2f1ee',

        // Error
        'error':                      '#ba1a1a',
        'error-container':            '#ffdad6',
        'on-error':                   '#ffffff',
        'on-error-container':         '#93000a',
      },

      fontFamily: {
        headline: ['Epilogue', 'sans-serif'],
        body:     ['Manrope', 'sans-serif'],
        label:    ['"Space Grotesk"', 'sans-serif'],
      },

      // Roundedness scale — each mode uses a different tier
      borderRadius: {
        DEFAULT: '0px',        // Modern: sharp/architectural
        sm:      '0.125rem',
        md:      '0.375rem',   // Retro: vintage label feel
        lg:      '0.5rem',
        xl:      '0.75rem',
        full:    '9999px',     // Poppy: pill shapes
      },

      boxShadow: {
        // Ambient shadow tinted with on-surface at 6% opacity, 32px blur
        'ambient': '0 8px 32px 0 rgba(26, 28, 26, 0.06)',
        'ambient-lg': '0 16px 48px 0 rgba(26, 28, 26, 0.08)',
      },

      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.02em',
        widest:   '0.4em',
      },
    },
  },
  plugins: [],
}
