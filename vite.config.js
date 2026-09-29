import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from the custom domain https://folioi.in (GitHub Pages).
// To serve from a sub-path instead (e.g. https://<user>.github.io/supi-wallart/), build with
// BASE_PATH=/supi-wallart/.
export default defineConfig(() => ({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
}))
