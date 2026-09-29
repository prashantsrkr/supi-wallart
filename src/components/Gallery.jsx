import { useMemo, useState } from 'react'
import { Eye } from 'lucide-react'
import { artworks, categories } from '../data/artworks'
import ArtImage from './ArtImage'
import Lightbox from './Lightbox'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const aspectClass = {
  tall: 'aspect-[3/4]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/10]',
}

const filters = ['All', ...categories.filter((c) => artworks.some((a) => a.category === c))]

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? artworks : artworks.filter((a) => a.category === filter)),
    [filter],
  )

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          id="gallery-title"
          eyebrow="Featured work"
          align="center"
          title={
            <>
              A small <span className="italic text-clay">exhibition</span> of walls that bloom.
            </>
          }
        />

        {/* Filters */}
        <Reveal delay={100} className="mt-12 flex justify-center">
          <div
            role="group"
            aria-label="Filter artwork by category"
            className="no-scrollbar -mx-5 flex max-w-[calc(100%+2.5rem)] gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:max-w-full sm:flex-wrap sm:justify-center sm:px-0"
          >
            {filters.map((f) => {
              const selected = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(f)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                    selected
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-ink/10 text-muted hover:border-ink/30 hover:text-ink'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'artwork' : 'artworks'}
          {filter !== 'All' ? ` in ${filter}` : ''}.
        </p>

        {/* Masonry */}
        <ul key={filter} className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
          {visible.map((art, i) => (
            <li
              key={art.id}
              className="animate-fade-in mb-5 break-inside-avoid lg:mb-6"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`View “${art.title}”, ${art.category}`}
                className="group relative block w-full overflow-hidden rounded-sm bg-sand text-left focus-visible:outline-offset-4"
              >
                <ArtImage
                  src={art.image}
                  alt={`${art.title}: ${art.description}`}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className={`${aspectClass[art.aspect] ?? 'aspect-[4/5]'} w-full object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.06] group-focus-visible:scale-[1.06]`}
                />
                {/* Overlay */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0 sm:group-focus-visible:opacity-100"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 transition-all duration-500 ease-soft sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
                  <span>
                    <span className="block text-[0.65rem] font-medium tracking-[0.24em] text-ivory/75 uppercase">
                      {art.category}
                    </span>
                    <span className="mt-1 block font-serif text-xl text-ivory sm:text-2xl">{art.title}</span>
                  </span>
                  <span className="glass-dark hidden shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-ivory sm:inline-flex">
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" /> View
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openIndex !== null && (
        <Lightbox
          items={visible}
          index={openIndex}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  )
}
