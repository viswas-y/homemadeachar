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
          yellow: '#FAD051',      // Sunny golden-yellow container card background
          yellowLight: '#FDF2D0',
          canvas: '#FBF8F1',      // Warm off-white / light cream main canvas
          dark: '#221610',        // Rich dark espresso text, buttons, and icon circles
          darkHover: '#140C08',
          cardOrange: '#FDBA74',  // Card 1 inner box
          cardGreen: '#86EFAC',   // Card 2 inner box
          cardPink: '#FDA4AF',    // Card 3 inner box
          cardBlue: '#93C5FD',    // Card 4 inner box
          cardYellow: '#FDE047',
          cardPurple: '#D8B4FE',
        }
      },
      fontFamily: {
        display: ['Fredoka', '"Noto Sans Malayalam"', 'sans-serif'],
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
