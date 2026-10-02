/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#030712',
          900: '#080e1a',
          800: '#0f172a',
          700: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}
