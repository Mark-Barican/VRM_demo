import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CSS variable-driven theme tokens
        v: {
          bg: 'var(--v-bg)',
          surface: 'var(--v-surface)',
          card: 'var(--v-card)',
          text: 'var(--v-text)',
          text2: 'var(--v-text2)',
          muted: 'var(--v-muted)',
          accent: 'var(--v-accent)',
          'accent-h': 'var(--v-accent-h)',
          border: 'var(--v-border)',
          divider: 'var(--v-divider)',
          red: 'var(--v-red)',
        },
        // Static palette
        vintage: {
          cream: '#F5EFE0',
          parchment: '#EDE6D4',
          espresso: '#1A0F07',
          brown: '#5C3A1E',
          tan: '#9B7A5A',
          gold: '#C9881A',
          'gold-bright': '#D4A832',
          maroon: '#6B1B1B',
          border: '#C8B090',
        },
        // Keep legacy brand tokens for compatibility
        brand: {
          black: '#0a0a0a',
          gold: '#c9a84c',
          'gold-light': '#e0c070',
          'gold-dark': '#9a7830',
          offwhite: '#f0ede8',
          gray: '#2a2a2a',
          'gray-mid': '#444444',
          'gray-light': '#888888',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #e0c070 50%, #c9a84c 100%)',
        'vintage-gradient': 'linear-gradient(135deg, #C9881A 0%, #E0A830 50%, #C9881A 100%)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
