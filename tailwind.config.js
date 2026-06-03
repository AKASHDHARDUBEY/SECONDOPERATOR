/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        primary: '#FFFFFF',
        secondary: '#A0A0A0',
        accent: '#2F6BFF'
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'Geist', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
