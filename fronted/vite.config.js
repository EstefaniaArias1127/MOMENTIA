
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Configuración de Momentia
export default defineConfig({
  plugins: [react()],

  base: '/MOMENTIA/',

  server: {
    port: 5173,
    strictPort: true
  }
})