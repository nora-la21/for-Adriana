import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base, deliberately.
//
// An absolute base bakes the deploy path into every asset URL, and GitHub
// Pages serves the repo segment lowercased — so a build pinned to
// "/for-Adriana/" 404s its own JS at "/for-adriana/" and renders a white
// screen. "./" resolves against wherever the page actually is: Pages under
// any casing, a project subfolder, a custom domain root, or a file:// open.
//
// This is only safe because routing is hash-based (see App.tsx); path-based
// routing would need a real base.
export default defineConfig({
  base: process.env.APP_BASE ?? './',
  plugins: [react()],
  server: { host: true, port: 5173 },
})
