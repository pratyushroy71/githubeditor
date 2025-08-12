import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  esbuild: {
    target: 'es2020'
  },

  build: {
    target: 'es2020'
  }
});
