/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F6F0E4',
        sand: '#EFE6D3',
        oxblood: {
          DEFAULT: '#5E1F1C',
          dark: '#4B1714',
          light: '#762723',
        },
        turmeric: {
          DEFAULT: '#C98A22',
          light: '#DE9F35',
          dark: '#B0751A',
        },
        bottlegreen: {
          DEFAULT: '#1F4236',
          dark: '#17332A',
          light: '#285646',
        },
        ink: {
          DEFAULT: '#2A2320',
          muted: 'rgba(42, 35, 32, 0.8)',
          subtle: 'rgba(42, 35, 32, 0.6)',
        },
        line: '#DCCFB6',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Noto Sans"', '"Noto Sans Telugu"', 'system-ui', '-apple-system', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', '"Noto Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(42, 35, 32, 0.06)',
      }
    },
  },
  plugins: [],
}