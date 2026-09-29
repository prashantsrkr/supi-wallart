import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/** Accessible modal viewer: focus trap, Escape to close, ←/→ to navigate, swipe on touch. */
export default function Lightbox({ items, index, onChange, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const art = items[index]
  const count = items.length

  const go = useCallback((dir) => onChange((index + dir + count) % count), [index, count, onChange])

  // Scroll lock + restore focus to the trigger when closing.
  useEffect(() => {
    const trigger = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      trigger?.focus?.({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        const focusables = dialogRef.current.querySelectorAll('button, a[href]')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  // Preload neighbours for instant navigation.
  useEffect(() => {
    ;[1, -1].forEach((d) => {
      const img = new Image()
      img.src = items[(index + d + count) % count].image
    })
  }, [index, items, count])

  if (!art) return null

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-describedby="lightbox-desc"
      className="animate-fade-in fixed inset-0 z-[100] flex flex-col bg-night/95 backdrop-blur-sm [animation-duration:400ms]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-4 text-ivory sm:px-8">
        <p className="text-xs tracking-[0.24em] text-ivory/60 uppercase tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close artwork viewer"
          className="glass-dark grid h-11 w-11 place-items-center rounded-full text-ivory transition-colors hover:bg-white/15"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
        onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        <img
          key={art.id}
          src={art.image.replace(/([?&])w=\d+/, '$1w=1800')}
          alt={`${art.title}: ${art.description}`}
          className="animate-fade-in max-h-full max-w-full rounded-sm object-contain shadow-2xl [animation-duration:500ms]"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous artwork"
              className="glass-dark absolute left-3 grid h-11 w-11 place-items-center rounded-full text-ivory transition-colors hover:bg-white/15 sm:left-6 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next artwork"
              className="glass-dark absolute right-3 grid h-11 w-11 place-items-center rounded-full text-ivory transition-colors hover:bg-white/15 sm:right-6 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="mx-auto w-full max-w-3xl px-6 pt-5 pb-7 text-center sm:pb-9">
        <p className="text-[0.65rem] font-medium tracking-[0.28em] text-clay-soft uppercase">{art.category}</p>
        <h3 id="lightbox-title" className="mt-2 font-serif text-2xl text-ivory sm:text-3xl">
          {art.title}
        </h3>
        <p id="lightbox-desc" className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ivory/65">
          {art.description}
        </p>
        <a
          href="#contact"
          onClick={onClose}
          className="link-underline mt-4 inline-block text-sm text-ivory/85 hover:text-ivory"
        >
          Want something like this? Let’s talk →
        </a>
      </div>
    </div>,
    document.body,
  )
}
