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
The form emails enquiries through [FormSubmit](https://formsubmit.co) (no backend or account needed).

1. `formEmail` in `src/data/site.js` is set to the Gmail inbox that receives enquiries.
2. Deploy, then submit the form once. FormSubmit emails that inbox an activation link. Click
   **Activate** (nothing is delivered until you do).
3. Optional: FormSubmit then shows a random alias string. Put that in `formEmail` instead, so the
   Gmail address isn't visible in the site's code.

Until `formEmail` is set, the form only logs submissions in development and shows a friendly
"message me on Instagram" error in production. A hidden honeypot field filters basic spam bots.

### Contact details
Phone, WhatsApp, email and location live in `contact` in `src/data/site.js`. Items without an
`href` render as plain text. The floating WhatsApp button opens a chat with the WhatsApp number.

## Structure

```
src/
  components/   Navbar, Hero, About, Services, Gallery, Lightbox, FeaturedProject, Process,
                Instagram, Testimonials, Contact, Footer, WhatsAppButton,
                GlassCard, SectionHeading, Reveal, ArtImage, Icons
  data/         site, artworks, services, testimonials
  hooks/        useScrolled, useActiveSection, useParallax, useReducedMotion
  lib/          submitCommission (form submit + validation)
  index.css     design tokens (@theme), glass/button utilities, reveal + reduced-motion rules
```
