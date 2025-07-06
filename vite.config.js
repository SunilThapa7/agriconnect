import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4600',
      '/authUser': 'http://localhost:4600',
      '/market': 'http://localhost:4600',
    },
  },
})
