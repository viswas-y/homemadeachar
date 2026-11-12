/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#146B2E',
          greenGrid: '#0E7124',
          greenCta: '#16692B',
          greenHover: '#115221',
          greenDark: '#0B3D1A',
          lime: '#BEF264',
          sage: '#EDF5EE',
          canvas: '#F7F7F5',
          card: '#ECECE8',
          ink: '#1C1917',
          offwhite: '#F7F7F5',
          yellow: '#146B2E',
          yellowLight: '#EDF5EE',
          dark: '#1C1917',
          darkHover: '#0F0D0C',
          cardOrange: '#ECECE8',
          cardGreen: '#ECECE8',
          cardPink: '#ECECE8',
          cardBlue: '#ECECE8',
          cardYellow: '#ECECE8',
          cardPurple: '#ECECE8',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Noto Sans Malayalam"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Malayalam"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'container': '36px',
        'container-sm': '24px',
      }
    },
  },
  plugins: [],
}
