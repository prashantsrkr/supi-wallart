import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Light parallax: translates the element by `speed` × its offset from the viewport centre.
 * Disabled for reduced-motion users and on touch-only devices.
 */
export function useParallax(speed = 0.08) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || window.matchMedia('(hover: none)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.parentElement.getBoundingClientRect()
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      el.style.transform = ''
    }
  }, [speed, reduced])

  return ref
}
