import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public', // Explicitly declare public directory
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // Ensure files aren't inlined
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: ({name}) => {
          if (/\.(jpg|jpeg|png|gif|svg|pdf)$/.test(name ?? '')) {
            return 'assets/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  }
});