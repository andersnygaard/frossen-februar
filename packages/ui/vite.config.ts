import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import path from 'node:path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    vue(),
    dts(),
    {
      name: 'copy-styles',
      apply: 'build',
      generateBundle() {
        const stylesDir = resolve(__dirname, 'src/styles');
        const distDir = resolve(__dirname, 'dist/styles');

        if (fs.existsSync(stylesDir)) {
          fs.mkdirSync(distDir, { recursive: true });
          fs.readdirSync(stylesDir).forEach(file => {
            fs.copyFileSync(
              resolve(stylesDir, file),
              resolve(distDir, file)
            );
          });
        }
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FrossenUI',
      fileName: format => `frossen-ui.${format === 'umd' ? 'umd.cjs' : 'js'}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});