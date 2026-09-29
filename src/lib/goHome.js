/**
 * Click handler for "home" links (logo, back to top). The link's href is the site root, so it
 * still works without JavaScript and in a new tab; on a normal click it smooth-scrolls to the
 * top instead of reloading, and clears any #section from the address bar.
 */
export function goHome(event) {
  // Let modified clicks (new tab / window) behave like a normal link.
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  event.preventDefault()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}

/** The site root, correct whether served from a domain root or a sub-path. */
export const homeHref = import.meta.env.BASE_URL
