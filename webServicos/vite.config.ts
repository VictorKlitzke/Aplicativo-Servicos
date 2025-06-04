import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', 
      '@hooks': path.resolve(__dirname, 'src/hooks/exports.ts'),
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
