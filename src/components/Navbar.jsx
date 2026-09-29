import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'
import { useActiveSection } from '../hooks/useActiveSection'
import { InstagramIcon } from './Icons'
import LogoMark from './LogoMark'

const sectionIds = navLinks.map((l) => l.id)

export default function Navbar() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)

  // While open: lock scroll, make the page behind inert, close on Escape.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const background = document.querySelectorAll('main, footer, [data-floating]')
    background.forEach((el) => (el.inert = true))

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      background.forEach((el) => (el.inert = false))
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ease-soft sm:px-6 ${
          scrolled || open
            ? 'border-white/60 bg-ivory/75 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl'
            : 'border-white/40 bg-white/25 backdrop-blur-md'
        }`}
      >
        <a
          href="#home"
          className="flex items-center gap-2.5 font-serif text-lg tracking-tight text-ink sm:text-xl"
          onClick={() => setOpen(false)}
        >
          <LogoMark className="h-7 w-auto shrink-0 sm:h-8" />
          <span>
            Supi <span className="italic text-clay">Wall Art</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`link-underline text-sm transition-colors duration-300 ${
                  active === link.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-ink transition-colors hover:bg-white/60 sm:inline-flex"
          >
            <InstagramIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-[-8deg]" />
            <span>{site.instagram.handle}</span>
            <span className="sr-only">(opens Instagram in a new tab)</span>
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-white/60 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-x-3 top-[4.75rem] bottom-3 overflow-y-auto rounded-3xl border border-white/60 bg-ivory/85 backdrop-blur-2xl transition-all duration-500 ease-soft sm:inset-x-5 lg:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <div className="flex min-h-full flex-col justify-between p-8">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li
                key={link.id}
                className={`transition-all duration-500 ease-soft ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className="group flex items-baseline gap-4 py-2 font-serif text-4xl tracking-tight text-ink"
                >
                  <span className="font-sans text-xs text-muted tabular-nums">0{i + 1}</span>
                  <span className={active === link.id ? 'italic text-clay' : 'group-hover:italic'}>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div
            className={`mt-10 border-t border-ink/10 pt-6 transition-opacity delay-300 duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="eyebrow mb-3">Follow the work</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg text-ink"
            >
              <InstagramIcon /> {site.instagram.handle}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
