import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base 使用相对路径，保证 dist 目录双击打开或部署到任意子路径都能正常访问
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
