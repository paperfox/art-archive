import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "https://paperfox.github.io/art/",
  server: {
    mimeTypes: {
      "application/json": ["json"],
    },
  },
});
