import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 使用相对路径打包，方便直接部署到 Vercel / Netlify / GitHub Pages 等静态托管。
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
