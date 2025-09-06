const mtConfig = require("@material-tailwind/react").mtConfig;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          0: "#FFFFFF",
          100: "#F3F5F7",
          150: "#E1E3E5",
          200: "#CDCFD1",
          250: "#B6B8BA",
          300: "#A1A3A5",
          400: "#8C8E90",
          500: "#7C7C7C",
          600: "#666868",
          700: "#4D5050",
          800: "#2F3232",
          900: "#0E201E",
          // 👆 replace values with your own palette
        },
        info: {
          500: "#2186D7",
        },
        green: {
          400: "#B3E277",
          500: "#90c853",
        },
      },
      fontFamily: {
        sans: [
          "Be Vietnam Pro",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
        vietnam: ["Be Vietnam Pro", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [mtConfig],
};
