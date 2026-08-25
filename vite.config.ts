import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app source lives in app/, not at the repo root.
//
// GitHub Pages on this repo is configured as "deploy from a branch", which
// serves the repository root. That root therefore has to BE the published
// site — a generated, self-contained index.html (see scripts/bundle-single.mjs).
// Keeping Vite's source template at the root would collide with it, and did:
// Pages served the template, the browser was handed /src/main.tsx as raw TSX,
// and the page rendered white.
export default defineConfig({
  root: 'app',

  // Relative, so assets resolve wherever the site is served from — Pages under
  // any path casing, a subfolder, a custom domain, or a file:// open. Safe
  // because routing is hash-based (see app/src/App.tsx).
  base: process.env.APP_BASE ?? './',

  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: { host: true, port: 5173 },
})
