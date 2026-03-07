import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import wasm from "vite-plugin-wasm";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(resolve(__dirname, "package.json"), "utf-8"));

export default defineConfig({
  server: {
    port: 5174,
  },
  define: {
    APP_VERSION: JSON.stringify(pkg.version),
  },
  plugins: [
    react(),
    tailwindcss(),
    wasm(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["icon.svg", "icon-192.png", "icon-512.png", "screenshot-1.png", "screenshot-2.png"],
      manifest: {
        name: "GOMOKU — 五子棋",
        short_name: "Gomoku",
        description: "Play Gomoku against an unbeatable AI — offline, free, in 11 languages",
        theme_color: "#F5E6C8",
        background_color: "#F5E6C8",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshot-1.png",
            sizes: "1179x1977",
            type: "image/png",
            form_factor: "narrow",
            label: "Gomoku — start a new game",
          },
          {
            src: "screenshot-2.png",
            sizes: "1179x1977",
            type: "image/png",
            form_factor: "narrow",
            label: "Gomoku — tactical midgame",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,woff2,wasm}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  worker: {
    plugins: () => [wasm()],
  },
});
