/**
 * Flattens the Vite build into a single self-contained HTML file.
 *
 * The prototype gets shown on screen shares and shared as a link, so it has
 * to survive being opened from anywhere with no server, no build step and no
 * external asset host. This inlines the CSS and JS bundles into one file.
 *
 *   npm run build && node scripts/bundle-single.mjs
 *
 * Output: dist/body-temple-prototype.html
 *
 * The output is page *content* — no <!doctype>, <html>, <head> or <body>
 * wrapper — because the host that serves it supplies that skeleton. Open it
 * directly in a browser and it still renders: browsers infer the missing
 * wrapper.
 */

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const assetDir = join(root, 'dist', 'assets')

const files = await readdir(assetDir)
const cssFile = files.find((f) => f.endsWith('.css'))
const jsFile = files.find((f) => f.endsWith('.js'))

if (!cssFile || !jsFile) {
  throw new Error('Build output not found — run `npm run build` first.')
}

const css = await readFile(join(assetDir, cssFile), 'utf8')
const js = await readFile(join(assetDir, jsFile), 'utf8')

// A literal </script> inside the bundle would close the tag early.
const safeJs = js.replaceAll('</script', '<\\/script')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>body temple</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#1B0C18" />
<meta name="description" content="Body Temple with Adriana Rizzolo — a daily sacred practice app. Devotional movement, breath, and ritual, honouring the cycle." />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap"
  rel="stylesheet"
/>
<style>
html, body { height: 100%; margin: 0; background: #150A13; }
${css}
</style>
</head>
<body>
<div id="root"></div>
<script type="module">
${safeJs}
</script>
</body>
</html>
`

// Three destinations, all the same bytes:
//
//   index.html                             the repo root IS the published site,
//                                          because Pages deploys from the branch
//                                          root. This file is committed.
//   prototype/body-temple-prototype.html   downloadable, opens offline from disk.
//   dist/body-temple-prototype.html        alongside the normal multi-file build.
const targets = [
  join(root, 'index.html'),
  join(root, 'prototype', 'body-temple-prototype.html'),
  join(root, 'dist', 'body-temple-prototype.html'),
]

await mkdir(join(root, 'prototype'), { recursive: true })

const kb = (Buffer.byteLength(html) / 1024).toFixed(1)
for (const out of targets) {
  await writeFile(out, html, 'utf8')
  console.log(`wrote ${out} (${kb} kB)`)
}
