import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // <-- Updated to a relative path so it loads correctly on any GitHub repo name
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
  }
});