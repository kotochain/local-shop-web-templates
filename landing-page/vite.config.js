import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base 使用相对路径，保证 dist 目录可以直接双击打开 / 部署到任意子路径
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
