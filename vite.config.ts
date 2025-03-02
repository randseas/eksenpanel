import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router"],
          ui: ["@mui/material", "@emotion/styled", "lucide-react"],
          utils: ["clsx", "nprogress", "react-hot-toast"],
          charts: ["react-apexcharts"],
          network: ["axios", "socket.io-client", "ws"],
          tailwind: ["tailwindcss", "tailwind-merge"],
          syntax: ["react-syntax-highlighter"],
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
});
