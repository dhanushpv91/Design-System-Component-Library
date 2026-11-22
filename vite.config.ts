import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Library mode: `vite build` bundles src/index.ts (ESM + CJS) and extracts all CSS to dist/style.css.
// The demo playground (index.html + src/demo) is only used by `vite dev`.
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'DhanushDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
