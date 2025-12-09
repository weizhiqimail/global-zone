import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as singlefile from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    react(),
    singlefile.viteSingleFile(),
  ],
  optimizeDeps: {
    exclude: ["moment/locale/*"]
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.woff2?$|\.ttf$|\.eot$/.test(assetInfo.name || "")) {
            return "ignore/[name].[ext]"; // 或直接丢弃
          }
          return "assets/[name]-[hash][extname]";
        }
      },
      plugins: {
          name: "ignore-moment-locales",
          resolveId(source) {
            if (source.startsWith("moment/locale/")) return source;
          },
          load(id) {
            if (id.startsWith("moment/locale/")) {
              return "export default {};";
            }
          }
        }
    }
  }
});
