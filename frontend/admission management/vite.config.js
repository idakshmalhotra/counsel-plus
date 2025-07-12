import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Adjust this if your app is hosted in a subdirectory
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production to reduce bundle size
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          form: ['formik', 'yup'],
          ui: ['react-icons'],
          utils: ['axios', 'xlsx'],
          redux: ['@reduxjs/toolkit', 'react-redux', 'redux-persist']
        }
      }
    },
    // Enable minification and tree shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'formik', 'yup', 'axios']
  }
})
