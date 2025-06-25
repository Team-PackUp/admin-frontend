import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [mkcert(), react()],
  server: {
    host: "localhost",
    port: 5173,
  },
});
