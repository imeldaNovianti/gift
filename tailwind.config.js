/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'luxury-gray': '#E0E0E0',
        'denim-blue': '#4B6EAF',
        'luxury-silver': '#C0C0C0',
        'luxury-gold': '#FFD700',
        'soft-pink': '#FFB6C1',
        'ivory': '#FFFFF0',
      },
      fontFamily: {
        'greatvibes': ['Great Vibes', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
    },
  },
  plugins: [],
}