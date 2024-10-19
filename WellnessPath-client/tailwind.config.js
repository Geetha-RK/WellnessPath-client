/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#412234',
        'color1':'#E489BE',
        'fontcolor':'#E11346'
      }
    },
  },
  plugins: [],
}