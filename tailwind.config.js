/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
        colors: {
          navy: {
            700: '#1e3a8a',
            800: '#1e40af',
          }
        }
    }
  },
  plugins: [],
}