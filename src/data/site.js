/**
 * Site-wide content & contact details.
 * Update placeholders here. Every component reads from this file.
 */

export const site = {
  name: 'Supi Wall Art',
  artist: 'Supi',
  tagline: 'Art • Walls • Stories',
  instagram: {
    handle: '@supi_wallart',
    url: 'https://www.instagram.com/supi_wallart/',
  },
  /**
   * Commission form delivery (see src/lib/submitCommission.js).
   * - web3formsKey: access key from https://web3forms.com for the inbox below. Preferred; when
   *   set, the form uses Web3Forms.
   * - email: fallback via FormSubmit (https://formsubmit.co), used while no key is set.
   */
  form: {
    web3formsKey: '',
    email: 'supritisarkar18@gmail.com',
  },
  /** Contact details. When `href` is null the item is shown as plain text. */
  contact: {
    phone: { label: 'Phone', value: '+91 74578 13456', href: 'tel:+917457813456' },
    whatsapp: { label: 'WhatsApp', value: '+91 74578 13456', href: 'https://wa.me/917457813456' },
    email: {
      label: 'Email',
      value: 'supritisarkar18@gmail.com',
      href: 'mailto:supritisarkar18@gmail.com',
    },
    location: { label: 'Location', value: 'Rishikesh, Dehradun', href: null },
  },
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export const processSteps = [
  {
    number: '01',
    title: 'Idea',
    text: 'We discuss your vision, wall, space, and requirements.',
  },
  {
    number: '02',
    title: 'Concept',
    text: 'The artwork/design is planned around your space.',
  },
  {
    number: '03',
    title: 'Creation',
    text: 'The artwork is brought to life with painting, texture, and detail.',
  },
  {
    number: '04',
    title: 'Reveal',
    text: 'Your space gets its final artistic transformation.',
  },
]
