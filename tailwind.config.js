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
          crimson: '#9B0B0B',
          crimsonDark: '#2D0303',
          crimsonCta: '#960202',
          crimsonHover: '#7F0B0B',
          gold: '#F59E0B',
          goldLight: '#FDE047',
          warmCream: '#FDF2F2',
          canvas: '#FAF7F2',
          card: '#FDFBF7',
          // Backward compatibility mappings for any residual brand.* references
          green: '#9B0B0B',
          greenGrid: '#6B0808',
          greenCta: '#960202',
          greenHover: '#7F0B0B',
          greenDark: '#2D0303',
          lime: '#FDE047',
          sage: '#FDF2F2',
          ink: '#1C1917',
          offwhite: '#FAF7F2',
          yellow: '#9B0B0B',
          yellowLight: '#FDF2F2',
          dark: '#1C1917',
          darkHover: '#0F0D0C',
          cardOrange: '#FDFBF7',
          cardGreen: '#FDFBF7',
          cardPink: '#FDFBF7',
          cardBlue: '#FDFBF7',
          cardYellow: '#FDFBF7',
          cardPurple: '#FDFBF7',
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
