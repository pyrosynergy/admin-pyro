import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows external connections and shows network URL
    port: 3000,
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
    // Lowered from the 4096 default: once the logos became WebP they all fell
    // under it and were base64-inlined into the entry chunk, doubling it. As
    // separate files they keep their content hash and the immutable
    // Cache-Control set in vercel.json. Only sub-1 kB icons stay inline.
    assetsInlineLimit: 1024,
    // Route chunks are already split via React.lazy in App.jsx. Pulling the
    // framework into its own chunk keeps it cached across deploys that only
    // touch application code.
    rollupOptions: {
      output: {
        // Matched on resolved module path rather than by package name: the app
        // imports "react-dom/client", which a name-keyed manualChunks map does
        // not catch, leaving react-dom stranded in the entry chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
            return 'react-vendor';
          }
        },
      },
    },
  },
})
