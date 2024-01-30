import { defineConfig } from 'vite';
import minifyHTML from 'rollup-plugin-minify-html-literals';

const { resolve } = require('path');

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig(({ command, mode }) => {
  return {
    css: {
      devSourcemap: true,
    },
    build: {
      sourcemap: true,
      minify: true,
      cssMinify: true,
      commonjsOptions: {
        include: ['node_modules/**'],
      },
      emptyOutDir: false,
      rollupOptions: {
        cache: false,
        preserveEntrySignatures: 'strict',
        input: {
          main: resolve(__dirname, 'scripts/main.ts'),
          element: resolve(__dirname, 'blocks/element/element.ts'),
          cards: resolve(__dirname, 'blocks/cards/cards.ts'),
          'lit-counter': resolve(__dirname, 'blocks/lit-counter/lit-counter.ts'),
          'native-counter': resolve(__dirname, 'blocks/native-counter/native-counter.ts'),
        },
        output: {
          dir: 'blocks',
          assetFileNames: () => {
            return '[name]/__compiled__/[name][extname]';
          },
          chunkFileNames: '__compiled__chunks/[name].[hash].js',
          entryFileNames: '[name]/__compiled__/[name].js',
        },
        plugins: [isProd && minifyHTML()],
      },
    },
  };
});
