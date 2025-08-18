import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows external connections and shows network URL
    port: 3000,
    open: false, // Don't auto-open browser
    historyApiFallback: true, // Enable client-side routing
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 3000,
    host: true,
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    'process.env': {},
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled'],
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "@/styles/variables.css";`,
      },
    },
  },
  json: {
    stringify: true,
  },
})
