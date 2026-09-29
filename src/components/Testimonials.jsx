import { artworks } from '../data/artworks'
import { testimonials } from '../data/testimonials'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const artworkById = Object.fromEntries(artworks.map((a) => [a.id, a]))

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Kind words"
          align="center"
          title={
            <>
              Spaces that now <span className="italic text-clay">feel like home.</span>
            </>
          }
        />

        <ul className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:mt-20">
          {testimonials.map((t, i) => {
            const art = artworkById[t.artworkId]
            // Named clients lead with their name; otherwise the project stands in.
            const primary = t.name || t.project
            const secondary = t.name
              ? [t.project, t.location].filter(Boolean).join(' · ')
              : t.location || 'Client, Supi Wall Art'
            return (
              <Reveal
                as="li"
                key={t.project}
                delay={(i % 2) * 110}
                // An odd one out at the end sits centred rather than hanging on the left.
                className={
                  testimonials.length % 2 === 1 && i === testimonials.length - 1
                    ? 'md:col-span-2 md:mx-auto md:w-full md:max-w-[calc(50%-1.75rem)]'
                    : ''
                }
              >
                <figure className="flex h-full flex-col border-t border-ink/10 pt-8">
                  <span aria-hidden="true" className="font-serif text-6xl leading-none text-clay/40">
                    “
                  </span>
                  <blockquote className="mt-2 flex-1 font-serif text-xl leading-snug text-ink sm:text-[1.4rem]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    {art && (
                      <img
                        src={art.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-ink/10"
                      />
                    )}
                    <span>
                      <span className="block text-sm font-medium text-ink">{primary}</span>
                      <span className="mt-0.5 block text-sm text-muted">{secondary}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
