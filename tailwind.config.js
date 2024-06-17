/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: '"Outfit", sans-serif',
      },
      colors: {
        oxfordBlue: '#14213D',
        oxfordBlueLight: '#1e315b',
        orange: '#FCA311',
        platinum: '#E5E5E5'
      }
    },
  },
  plugins: [],
}