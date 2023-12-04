import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.BASE_URL': `"${process.env.VITE_BASE_URL}"`
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@", replacement: path.resolve(__dirname, "src")
      }
    ]
  }
})
