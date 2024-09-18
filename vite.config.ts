import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import * as path from "path";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  resolve: {
    // @ts-ignore
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
