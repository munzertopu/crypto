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
      fontSize: {
        // Body
        sm: ["14px", { lineHeight: "18px", letterSpacing: "0px" }], // Small
        smh: ["14px", { lineHeight: "20px", letterSpacing: "0px" }], // SmallHeight
        base: ["16px", { lineHeight: "20px", letterSpacing: "0.25px" }], // Medium
        lg: ["18px", { lineHeight: "24px", letterSpacing: "0.25px" }], // Large
        caption: ["13px", { lineHeight: "18px", letterSpacing: "0px" }], // Caption

        // Headings
        h6: ["20px", { lineHeight: "24px", letterSpacing: "0px" }],
        h5: ["22px", { lineHeight: "32px", letterSpacing: "0px" }],
        h4: ["24px", { lineHeight: "32px", letterSpacing: "0px" }],
        h3: ["28px", { lineHeight: "36px", letterSpacing: "-0.25px" }],
        h2: ["32px", { lineHeight: "40px", letterSpacing: "-0.25px" }],
        h1: ["36px", { lineHeight: "48px", letterSpacing: "-0.25px" }],
      },
      colors: {
        primary: {
          light: "#0E201E",
          dark: "#0E201E",
        },
        secondary: {
          light: "#4D5050",
          dark: "#4D5050",
        },
        gray: {
          0: "#FFFFFF",
          11: "#191919",
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
        success: {
          500: "#419F45",
        },
        green: {
          200: "#E3F3C7",
          400: "#B3E277",
          500: "#90c853",
          600: "#75AE46",
          700: "#5F9339",
        },
        error: {
          500: "#d8382c",
        },
        default: "#E1E3E5",

        background: "#F7F8F9",
        table: {
          header: "#F3F5F7",
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
