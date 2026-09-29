import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'
import { WhatsAppIcon } from './Icons'

/**
 * Unobtrusive floating contact button. Opens WhatsApp when a number is configured in
 * data/site.js, otherwise falls back to the contact form. Hidden near the top of the page
 * and while the contact section itself is on screen.
 */
export default function WhatsAppButton() {
  const scrolled = useScrolled(500)
  const [contactInView, setContactInView] = useState(false)
  const href = site.contact.whatsapp.href
  const external = Boolean(href)
  const visible = scrolled && !contactInView

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return
    const observer = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), {
      threshold: 0.15,
    })
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      href={href || '#contact'}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      aria-label={external ? 'Chat on WhatsApp (opens in a new tab)' : 'Contact Supi'}
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
      data-floating
      className={`glass group fixed right-4 bottom-4 z-40 flex h-13 items-center gap-2 rounded-full px-2.5 text-ink sm:pr-4 sm:pl-3.5 transition-all duration-500 ease-soft hover:bg-white/80 hover:shadow-lift sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1f7a4d] text-white">
        <WhatsAppIcon className="h-[18px] w-[18px]" />
      </span>
      <span className="hidden text-sm font-medium sm:inline">Let’s talk</span>
    </a>
  )
}
