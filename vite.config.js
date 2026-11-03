import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'gsap-vendor': ['gsap'],
          'lucide-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
  server: {
    port: 3000,
    open: false,
  },
});
