import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
    port: process.env.PORT || 3000, 
  },
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ["jwt-decode"]
},
  plugins: [react()],
})
