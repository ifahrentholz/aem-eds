import { defineConfig } from "vite";
const { resolve } = require("path");

export default defineConfig(({ command, mode }) => {
  return {
    css: {
      devSourcemap: true,
    },
    build: {
      commonjsOptions: {
        include: ["node_modules/**"],
      },
      emptyOutDir: true,
      rollupOptions: {
        cache: false,
        input: {
          element: resolve(__dirname, "blocks/element/element.ts"),
          cards: resolve(__dirname, "blocks/cards/cards.ts"),
        },
        output: {
          sourcemap: true,
          dir: "dist",
          assetFileNames: () => {
            return "assets/[name].[hash][extname]";
          },
          chunkFileNames: "chunks/[name].[hash].js",
          entryFileNames: "[name]/[name].js",
        },
      },
    },
  };
});
