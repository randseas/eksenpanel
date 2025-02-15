import type { Config } from "tailwindcss";

const config = {
  darkMode: "media",
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./app/layout.tsx",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./node_modules/react-tailwind-tooltip/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        "star-movement-bottom":
          "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
      },
      keyframes: {
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
      },
      transitionProperty: {
        height: "height",
      },
      colors: {
        light: "#ffffff",
        dark: "#090909",
        primary: "#2196f3",
        "light-border": "#DFDFDFFF",
        "light-foreground": "#F4F4F4FF",
        "dark-border": "#171718",
        "dark-foreground": "#161616",
        red: {
          50: "#ffebee",
          100: "#ffcdd2",
          200: "#ef9a9a",
          300: "#e57373",
          400: "#ef5350",
          500: "#f44336",
          600: "#e53935",
          700: "#d32f2f",
          800: "#c62828",
          900: "#b71c1c",
          "accent-100": "#ff8a80",
          "accent-200": "#ff5252",
          "accent-400": "#ff1744",
          "accent-700": "#d50000",
          "text-500": "#ef9a9a",
        },
        blue: {
          50: "#e3f2fd",
          100: "#bbdefb",
          200: "#90caf9",
          300: "#64b5f6",
          400: "#42a5f5",
          500: "#2196f3",
          600: "#1e88e5",
          700: "#1976d2",
          800: "#1565c0",
          900: "#0d47a1",
          "accent-100": "#82b1ff",
          "accent-200": "#448aff",
          "accent-400": "#2979ff",
          "accent-700": "#2962ff",
          primary: "#3773f5",
        },
        green: {
          50: "#e8f5e9",
          100: "#c8e6c9",
          200: "#a5d6a7",
          300: "#81c784",
          400: "#66bb6a",
          500: "#00c278",
          600: "#43a047",
          700: "#388e3c",
          800: "#2e7d32",
          900: "#1b5e20",
          "accent-100": "#b9f6ca",
          "accent-200": "#69f0ae",
          "accent-400": "#00e676",
          "accent-700": "#00c853",
          "text-500": "#a5d6a7",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
