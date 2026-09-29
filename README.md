# Supi Wall Art Portfolio

A modern React + Tailwind CSS portfolio website for Supi Wall Art, showcasing custom wall art,
3D designs, POP art, portraits and paintings. Single-page site for freelance artist **Supi**
([@supi_wallart](https://www.instagram.com/supi_wallart/)), based in Rishikesh, Dehradun.

React 19 · Vite · Tailwind CSS v4 · Lucide icons. No other runtime dependencies.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build locally
```

Live at **https://folioi.in**, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every
push to `main`. DNS for folioi.in is managed at Hostinger: four `A @` records pointing to GitHub
Pages (185.199.108-111.153) and `CNAME www → prashantsrkr.github.io`.

## Updating content

Everything editable lives in `src/data/`. Components never need to change.

| File | What it controls |
| --- | --- |
| `site.js` | Form recipient email, Instagram, WhatsApp / email / location, nav links, process steps |
| `artworks.js` | Gallery items, hero / about / featured-project images, Instagram tiles |
| `services.js` | Service cards (and the form's "Artwork Type" options) |
| `testimonials.js` | Client quotes |

### Artwork
All images are Supi's own work, saved from [@supi_wallart](https://www.instagram.com/supi_wallart/)
into `public/artwork/` (caption text on reel covers was cropped out). Instagram only serves them at
640px, so for sharper results replace each file with the original phone photo **using the same
filename**.

To add a piece: put the photo in `public/artwork/`, then add an entry to `artworks` in
`src/data/artworks.js` with a `category` and an `aspect` (`tall`, `portrait`, `square`, `landscape`,
`wide`). Gallery filters only show categories that have at least one piece.

### Commission form → Gmail
Enquiries are emailed to Supi's inbox without a backend. Settings are in `form` in
`src/data/site.js`; logic is in `src/lib/submitCommission.js`.

- **Web3Forms (preferred):** go to [web3forms.com](https://web3forms.com), enter the inbox
  address, and copy the access key it emails you into `form.web3formsKey`. Free up to 250
  submissions/month. The key is safe to publish.
- **FormSubmit (fallback, used while no key is set):** sends to `form.email`. The first
  submission triggers a one-time activation email; click **Activate**. FormSubmit can be slow or
  briefly unavailable, which browsers report as a CORS error.

If sending fails or takes over 20 seconds, the form keeps what the visitor typed and offers
WhatsApp and email buttons pre-filled with their message. A hidden honeypot field filters basic
spam bots.

### Contact details
Phone, WhatsApp, email and location live in `contact` in `src/data/site.js`. Items without an
`href` render as plain text. The floating WhatsApp button opens a chat with the WhatsApp number.

## Brand
Logo files live in `brand/` (SVG masters plus PNG exports): horizontal, stacked, dark-background,
profile picture (1080×1080, for Google Business Profile / Instagram), app icon and the standalone
mark. On the site, `src/components/LogoMark.jsx` renders the mark in the header and footer, and
`public/favicon.svg`, `apple-touch-icon.png`, `icon-512.png` and `logo.png` (used in structured
data) come from the same design.

## SEO
- `npm run build` pre-renders the page (`scripts/prerender.js` + `src/entry-server.jsx`), so the
  full HTML is in `dist/index.html` for search engines and link previews; React then hydrates it.
- `index.html` holds the title, description, Open Graph tags and LocalBusiness structured data
  (JSON-LD). Keep phone, email and location there in sync with `src/data/site.js`.
- `public/sitemap.xml` (with artwork images) and `public/robots.txt`. Update `<lastmod>` and the
  image list in the sitemap when artwork changes.
- `public/og-image.jpg` is the 1200×630 social share image.

## Structure

```
src/
  components/   Navbar, Hero, About, Services, Gallery, Lightbox, FeaturedProject, Process,
                Instagram, Testimonials, Contact, Footer, WhatsAppButton,
                GlassCard, SectionHeading, Reveal, ArtImage, Icons
  data/         site, artworks, services, testimonials
  hooks/        useScrolled, useActiveSection, useParallax, useReducedMotion
  lib/          submitCommission (form submit + validation)
  entry-server.jsx  server render used by scripts/prerender.js at build time
  index.css     design tokens (@theme), glass/button utilities, reveal + reduced-motion rules
```
