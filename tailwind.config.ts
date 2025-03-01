import type { Config } from "tailwindcss";

const config = {
  darkMode: "media",
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        rgb: "rgb 3s linear infinite",
        enter: "enter 0.2s ease-out",
        leave: "leave 0.2s ease-in",
      },
      keyframes: {
        rgb: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        enter: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        leave: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      transitionProperty: {
        height: "height",
      },
      colors: {
        light: "#ffffff",
        dark: "#181818",
        primary: {
          400: "#1C82F4",
          500: "#1473E6",
        },
        "light-border": "#DFDFDFFF",
        "dark-border": "#171718",
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
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config
