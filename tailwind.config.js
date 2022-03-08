const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: "#232A3F",
      "blue-light": "rgba(35, 42, 63, 0.14)",
      secondary: "#636877",
      white: "#ffffff",
      light: "#FAFAFA",
      "light-grey": "#EDEDEF",
      green: "#2F9D72",
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        'sans': ['Sofia Pro', ...defaultTheme.fontFamily.sans],
      }, 
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled']
    },
  },
  plugins: [],
}