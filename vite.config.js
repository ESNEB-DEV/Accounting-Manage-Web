import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/accounting-manage-web/',
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'],
  }
})
