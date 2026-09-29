import { testimonials } from '../data/testimonials'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

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

        <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-20 lg:gap-14">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 110}>
              <figure className="flex h-full flex-col border-t border-ink/10 pt-8">
                <span aria-hidden="true" className="font-serif text-6xl leading-none text-clay/40">
                  “
                </span>
                <blockquote className="mt-2 flex-1 font-serif text-xl leading-snug text-ink sm:text-[1.35rem]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8">
                  <span className="block text-sm font-medium text-ink">{t.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {t.project}
                    {t.location && <> · {t.location}</>}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
