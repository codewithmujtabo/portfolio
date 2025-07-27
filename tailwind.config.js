/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'animated-gradient': 'linear-gradient(-45deg, #04071D, #000000, #0000FF, #CBACF9)',
      },
      backgroundSize: {
        'gradient-size': '400% 400%',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'border': 'border 4s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'border': {
          to: { '--border-angle': '360deg' },
        },
      },
    },
  },
  plugins: [],
}