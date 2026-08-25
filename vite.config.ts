import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is overridable so the same build can be served from a subpath
// (GitHub Pages) or from a domain root (Vercel/Netlify/custom).
export default defineConfig({
  base: process.env.APP_BASE ?? '/',
  plugins: [react()],
  server: { host: true, port: 5173 },
})
