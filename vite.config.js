import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ai-academia-hub/', // <-- This tells GitHub Pages where to find your app's files
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
  }
});