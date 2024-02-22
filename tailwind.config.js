/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./assets/data/*.json",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        light: "GothamLight",
        default: "GothamMedium",
        bold: "GothamBold",
      },
    },
  },
  plugins: [],
};
