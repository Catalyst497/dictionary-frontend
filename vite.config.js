import http from 'https'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:  {
    proxy: {
      '/api': {
          target: 'https://dictionary-backend-ya1b.onrender.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
      },
  },
},
})
