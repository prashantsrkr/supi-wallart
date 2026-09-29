import { ArrowRight } from 'lucide-react'
import { featureImages } from '../data/artworks'
import { useParallax } from '../hooks/useParallax'
import ArtImage from './ArtImage'
import Reveal from './Reveal'

const details = [
  ['Project', 'Sunrise Feature Wall'],
  ['Location', 'Rishikesh, Dehradun'],
  ['Medium', 'Hand-painted acrylic'],
  ['Style', 'Botanical mural'],
]

export default function FeaturedProject() {
  const imageRef = useParallax(0.05)

  return (
    <section
      aria-labelledby="project-title"
      className="relative overflow-clip bg-night py-24 text-ivory sm:py-32 lg:py-40"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Large image */}
          <Reveal className="relative lg:col-span-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[4/3] lg:aspect-[5/4]">
              <div ref={imageRef} className="absolute -inset-y-12 inset-x-0 will-change-transform">
                <ArtImage
                  src={featureImages.project.src}
                  alt={featureImages.project.alt}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="glass-dark absolute top-5 left-5 rounded-full px-4 py-2 text-[0.65rem] font-medium tracking-[0.24em] uppercase">
                The reveal
              </span>
            </div>

            {/* Detail inset */}
            <figure className="absolute -bottom-10 -left-2 hidden w-44 sm:block lg:-left-10 lg:w-52">
              <div className="overflow-hidden rounded-sm border-[6px] border-night">
                <ArtImage
                  src={featureImages.projectDetail.src}
                  alt={featureImages.projectDetail.alt}
                  sizes="220px"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 pl-1 text-xs text-ivory/55 italic">Detail: the banana tree</figcaption>
            </figure>
          </Reveal>

          {/* Story */}
          <div className="flex flex-col justify-center lg:col-span-4 lg:pl-4">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-3 text-ivory/60">
                <span aria-hidden="true" className="h-px w-8 bg-clay-soft" />
                Featured project
              </p>
              <h2 id="project-title" className="font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl">
                From Empty Wall to <span className="italic text-clay-soft">Statement Piece</span>
              </h2>
              <p className="mt-6 leading-relaxed text-ivory/65">
                A plain wall with a single window. Now a golden sun rises around the frame, with
                banana trees growing up either side, so the whole room wakes up to a warm morning
                scene every day.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <dl className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
                {details.map(([dt, dd]) => (
                  <div key={dt} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-xs tracking-[0.2em] text-ivory/50 uppercase">{dt}</dt>
                    <dd className="text-right font-serif text-lg text-ivory">{dd}</dd>
                  </div>
                ))}
              </dl>

              <a
                href="#contact"
                className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-ivory"
              >
                <span className="link-underline">Plan a wall like this</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
