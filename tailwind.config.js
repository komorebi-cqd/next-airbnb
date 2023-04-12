/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        PHThin: ['PuHuiTi-Thin'],
        PHLight: ['PuHuiTi-Light'],
        PHRegular: ['PuHuiTi-Regular'],
        PHBold: ['PuHuiTi-Bold'],
      }
    },
  },
  plugins: [],
}

