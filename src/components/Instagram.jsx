import { ArrowUpRight } from 'lucide-react'
import { instagramTiles } from '../data/artworks'
import { site } from '../data/site'
import ArtImage from './ArtImage'
import { InstagramIcon } from './Icons'
import Reveal from './Reveal'

export default function Instagram() {
  return (
    <section aria-labelledby="instagram-title" className="overflow-clip bg-linen py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-clay" />
            Follow the journey
          </p>
          <h2 id="instagram-title" className="font-serif text-4xl tracking-tight text-ink sm:text-5xl">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="italic transition-colors hover:text-clay"
            >
              {site.instagram.handle}
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
            More walls. More paintings. More behind-the-scenes moments.
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group mt-10"
          >
            <InstagramIcon className="h-4 w-4" />
            View Instagram
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>

        {/* Curated tiles: each simply links to the profile */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:col-span-8">
          {instagramTiles.map((tile, i) => (
            <Reveal as="li" key={tile.src} delay={i * 70} className={i % 3 === 1 ? 'sm:translate-y-8' : ''}>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${tile.alt}. See more on Instagram`}
                className="group relative block overflow-hidden rounded-sm bg-sand"
              >
                <ArtImage
                  src={tile.src}
                  alt=""
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw"
                  className="aspect-square w-full object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 grid place-items-center bg-night/0 transition-colors duration-500 group-hover:bg-night/35">
                  <InstagramIcon className="h-7 w-7 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
