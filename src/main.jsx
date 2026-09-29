import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is pre-rendered (see scripts/prerender.js), so attach to it; dev renders fresh.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
