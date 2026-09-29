/**
 * Bakes the fully rendered page into dist/index.html so search engines, social previews
 * and no-JS visitors get real content instead of an empty <div id="root">.
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = path.join(root, 'dist/index.html')
const serverDir = path.join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
const template = await readFile(indexPath, 'utf8')
const marker = '<div id="root"></div>'

if (!template.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`)

const html = template.replace(marker, `<div id="root">${render()}</div>`)
await writeFile(indexPath, html)
await rm(serverDir, { recursive: true, force: true })

console.log(`prerender: wrote ${(html.length / 1024).toFixed(1)} kB to dist/index.html`)
