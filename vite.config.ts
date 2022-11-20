import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@util": "/src/util",
      "@atomics": "/src/atomics",
      "@features": "/src/features",
      "@hooks": "/src/hooks",
      '@APIs': '/src/APIs'
    },
  },
});
