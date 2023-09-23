import { resolve } from 'path';

import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import inject from '@rollup/plugin-inject';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
    nodePolyfills({
      Buffer: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', '@tanstack/react-query', '@ledgerhq/hw-transport-node-hid'],
      output: {
        format: 'esm',
      },
    },
  },
  resolve: {
    alias: {
      'Buffer': 'buffer',
    },
  }
});
