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
        cockpit: {
          950: '#080A0D',
          900: '#0D0F13',
          850: '#13171F',
          800: '#181D27',
          750: '#1F2633',
          700: '#2A3344',
          600: '#3D495F',
          500: '#5E6D8A',
          400: '#8E9BB0',
          300: '#BAC4D4',
          200: '#E2E7F0',
          100: '#F4F6F9',
        },
        signal: {
          amber: '#FF9E1B',
          'amber-hover': '#E58A10',
          'amber-dark': '#B86C04',
          'amber-light': '#FFF0DB',
        },
        telemetry: {
          cyan: '#00D2D3',
          'cyan-dark': '#009798',
          'cyan-light': '#E0FBFB',
          emerald: '#00E676',
          'emerald-glow': 'rgba(0, 230, 118, 0.2)',
          crimson: '#FF3B30',
          'crimson-glow': 'rgba(255, 59, 48, 0.2)',
          sky: '#38BDF8',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Space Mono', 'SF Mono', 'Consolas', 'monospace'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'amber-glow': '0 0 15px -3px rgba(255, 158, 27, 0.25)',
        'cyan-glow': '0 0 15px -3px rgba(0, 210, 211, 0.25)',
        'critical-glow': '0 0 15px -3px rgba(255, 59, 48, 0.35)',
        'emerald-glow': '0 0 15px -3px rgba(0, 230, 118, 0.25)',
      },
    },
  },
  plugins: [],
}
