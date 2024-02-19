/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      rotate: {
        30: "30deg",
      },
      fontFamily: {
        light: "GothamLight",
        default: "GothamMedium",
        bold: "GothamBold",
      },
    },
  },
  plugins: [],
};
