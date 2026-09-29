import { Brush, Handshake, Home, Palette } from 'lucide-react'
import { featureImages } from '../data/artworks'
import ArtImage from './ArtImage'
import GlassCard from './GlassCard'
import Reveal from './Reveal'

const highlights = [
  { icon: Brush, title: 'Freelance Artist', text: 'Independent, hands-on, every piece by hand' },
  { icon: Handshake, title: 'Custom Commissions', text: 'Shaped around your idea and your space' },
  { icon: Home, title: 'Wall Art', text: 'Murals, 3D walls and POP detailing' },
  { icon: Palette, title: 'Portraits & Paintings', text: 'Canvas work for homes and gifts' },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32 lg:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Imagery */}
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
            <ArtImage
              src={featureImages.about.src}
              alt={featureImages.about.alt}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="h-full w-full object-cover transition-transform duration-[1.6s] ease-soft hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -right-4 -bottom-10 w-2/5 overflow-hidden rounded-sm border-[6px] border-ivory shadow-lift sm:-right-8">
            <ArtImage
              src={featureImages.aboutDetail.src}
              alt={featureImages.aboutDetail.alt}
              sizes="20vw"
              className="aspect-square w-full object-cover"
            />
          </div>
          <p className="mt-5 font-serif text-sm italic text-muted">In the middle of a calla lily wall.</p>
        </Reveal>

        {/* Story */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-clay" />
              About the artist
            </p>
            <h2 id="about-title" className="font-serif text-4xl leading-[1.1] tracking-tight text-balance text-ink sm:text-5xl">
              Art isn’t just what I create.{' '}
              <span className="italic text-clay">It’s how I transform a space.</span>
            </h2>
          </Reveal>

          <Reveal delay={120} className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Hi, I’m Supi, a wall artist based in Rishikesh. I started out as a freelance artist
              with a brush, a few pots of paint and a belief that no wall should stay ordinary. Since
              then my work has grown across walls, portraits, canvases, 3D designs and custom
              commissions.
            </p>
            <p>
              Every piece begins with listening: to you, to the light in the room, to the story you
              want your space to tell. Then I paint it, layer by layer, until it feels like it always
              belonged there.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={160 + i * 70}>
                <GlassCard className="flex h-full items-start gap-4 p-5 transition-transform duration-500 ease-soft hover:-translate-y-1">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ivory text-clay">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-serif text-lg leading-tight text-ink">{title}</span>
                    <span className="mt-1 block text-sm text-muted">{text}</span>
                  </span>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
