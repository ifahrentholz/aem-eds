import { defineConfig } from 'vite';
const { resolve } = require('path');

export default defineConfig(({ command, mode }) => {
  return {
    css: {
      devSourcemap: true,
    },
    build: {
      commonjsOptions: {
        include: ['node_modules/**'],
      },
      emptyOutDir: false,
      rollupOptions: {
        cache: false,
        input: {
          element: resolve(__dirname, 'blocks/element/element.ts'),
          cards: resolve(__dirname, 'blocks/cards/cards.ts'),
        },
        output: {
          sourcemap: true,
          dir: 'blocks',
          assetFileNames: () => {
            return '[name]/__compiled__/[name][extname]';
          },
          chunkFileNames: '__compiled__chunks/[name].[hash].js',
          entryFileNames: '[name]/__compiled__/[name].js',
        },
      },
    },
  };
});
