import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      { find: "@modules", replacement: resolve(__dirname, "src/modules") },
      { find: "@layouts", replacement: resolve(__dirname, "src/layouts") },
      { find: "@lib", replacement: resolve(__dirname, "src/lib") },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
      { find: "@assets", replacement: resolve(__dirname, "src/assets") },
      { find: "@hooks", replacement: resolve(__dirname, "src/hooks") },
      { find: "@store", replacement: resolve(__dirname, "src/store") },
      { find: "@constant", replacement: resolve(__dirname, "src/constant") },
      { find: "@services", replacement: resolve(__dirname, "src/services") },
      { find: "@", replacement: resolve(__dirname, "src") },
    ],
  },
});
