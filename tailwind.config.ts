import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          berry: '#9E3D52',
          'berry-dark': '#832B3E',
          'berry-light': '#C55A70',
          blush: '#FBECEE',
          'blush-soft': '#FDF5F6',
          'blush-card': '#FFF8F9',
          'rose-bar': '#B86B77',
          charcoal: '#2D2926',
          muted: '#7D6E72',
          'muted-light': '#9B8D91',
          border: '#F0DFE3',
          'border-light': '#F7EBF0',
          ivory: '#FAF6F4',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideUp: 'slideUp 0.4s ease-out forwards',
        slideLeft: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      boxShadow: {
        soft: '0 8px 24px -6px rgba(158, 61, 82, 0.08)',
        card: '0 10px 30px -10px rgba(158, 61, 82, 0.12)',
      },
    },
  },
  plugins: [],
}
export default config
