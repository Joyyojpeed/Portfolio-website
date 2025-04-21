import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'ResumeJoydeep.pdf') {
            return '[name][extname]'; // Keep original filename
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  }
});