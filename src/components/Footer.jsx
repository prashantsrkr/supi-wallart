import { ArrowUp } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { InstagramIcon, WhatsAppIcon } from './Icons'
import LogoMark from './LogoMark'
import { goHome, homeHref } from '../lib/goHome'

export default function Footer() {
  return (
    <footer className="bg-night text-ivory">
      <div className="container-x py-16 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a
              href={homeHref}
              onClick={goHome}
              aria-label="Supi Wall Art, back to top"
              className="flex w-fit items-center gap-4 font-serif text-4xl tracking-tight transition-opacity hover:opacity-80 sm:text-5xl"
            >
              <LogoMark className="h-14 w-auto shrink-0 text-ivory sm:h-16" petal="#C98A6E" petalSoft="#A65A3F" strokeWidth={5} />
              <span>
                Supi <span className="italic text-clay-soft">Wall Art</span>
              </span>
            </a>
            <p className="mt-3 text-xs tracking-[0.3em] text-ivory/50 uppercase">{site.tagline}</p>
            <p className="mt-4 text-sm text-ivory/60">
              Wall artist in {site.contact.location.value}, Uttarakhand
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-ivory/70">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="link-underline transition-colors hover:text-ivory">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-ivory/10 pt-8 text-sm text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Supi Wall Art. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ivory/80 transition-colors hover:text-ivory"
            >
              <InstagramIcon className="h-4 w-4" /> {site.instagram.handle}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={`${site.contact.whatsapp.href}?text=${encodeURIComponent(
                'Hi Supi, I saw your work on folioi.in and would like to talk about a wall art commission.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ivory/80 transition-colors hover:text-ivory"
            >
              <WhatsAppIcon className="h-4 w-4" /> {site.contact.whatsapp.value}
              <span className="sr-only">on WhatsApp (opens in a new tab)</span>
            </a>
            <a
              href={homeHref}
              onClick={goHome}
              className="inline-flex items-center gap-1.5 text-ivory/80 transition-colors hover:text-ivory"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
