import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import wasm from "vite-plugin-wasm";
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
  plugins: [react(), tailwindcss(), wasm()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  worker: {
    plugins: () => [wasm()],
  },
});
