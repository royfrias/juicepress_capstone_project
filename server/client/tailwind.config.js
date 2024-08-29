/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'blush': '#efddce',
      'mango-madness': '#fdd211',
      'blue-magic': '#76cadd',
      'clean-green': '#7fd845'
    },
    fontFamily: {
      sans: ['Century-Gothic-Pro', 'sans-serif']
    }
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ['acid']
  },
}


