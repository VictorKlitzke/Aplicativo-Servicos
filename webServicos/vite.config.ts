import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', 
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: {
      origin: 'http://192.168.1.3', 
      credentials: true,
    }
  }
})
