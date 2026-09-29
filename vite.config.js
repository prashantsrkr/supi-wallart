import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://prashantsrkr.github.io/supi-wallart/ on GitHub Pages.
// Override with BASE_PATH=/ when deploying to a root domain (custom domain, Netlify, Vercel).
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? (process.env.BASE_PATH ?? '/supi-wallart/') : '/',
  plugins: [react(), tailwindcss()],
}))
