import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "shell",
      remotes: {
        receiving: "http://localhost:4173/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    proxy: {
      "/assets": {
        target: "http://localhost:4173",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@remoteModules": path.resolve(__dirname, "./src/remoteModules"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
