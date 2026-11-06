/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        logo: {
          blue: '#2576BC',
          red: '#D4252A',
          orange: '#EE7819',
          yellow: '#F9BA06',
          green: '#1D9D53',
          purple: '#533788',
          teal: '#109599',
        },
        brand: {
          50: '#f0f7fc',
          100: '#e1effa',
          200: '#c3dff5',
          300: '#94c8ee',
          400: '#5fabdc',
          500: '#2576BC', // Primary logo blue
          600: '#2065a2',
          700: '#1b5488',
          800: '#174771',
          900: '#153c5e',
          950: '#0e263d',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#0b132b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.06)',
      }
    },
  },
  plugins: [],
}
