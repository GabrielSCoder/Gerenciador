const { violet, blackA, mauve, green, red } = require("@radix-ui/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        'light-white': 'rgba(255,255,255,0.18)',
        'main-green': "#58af9b",
        ...blackA,
        ...violet,
        ...mauve,
        ...green,
        ...red
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0 85%" },
          "50%": { backgroundPosition: "100% 20%" },
          "100%": { backgroundPosition: "0% 85%%" }
        },
      },
      animation: {
        gradient: "gradient 15s linear infinite",
      }
    },
  },
  plugins: [
  ],
}