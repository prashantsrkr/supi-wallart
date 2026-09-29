import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { featureImages } from '../data/artworks'
import { site } from '../data/site'
import { useParallax } from '../hooks/useParallax'
import ArtImage from './ArtImage'
import GlassCard from './GlassCard'
import { PaintStroke } from './Icons'

export default function Hero() {
  const imageRef = useParallax(0.06)

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="grain relative overflow-clip pt-28 pb-20 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-28 lg:pb-16"
    >
      {/* Soft wash of colour behind the artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(201,138,110,0.22),transparent_65%)]"
      />
      <PaintStroke className="animate-float-slow pointer-events-none absolute top-32 left-[-3rem] w-56 rotate-[-8deg] text-clay/10 sm:w-72" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="eyebrow animate-fade-in tracking-[0.18em] sm:tracking-[0.28em]">Freelance Artist • Wall Art • Portraits</p>

          <h1
            id="hero-title"
            className="animate-fade-in mt-6 font-serif text-[2.9rem] leading-[1.02] tracking-tight text-ink [animation-delay:120ms] sm:text-7xl lg:text-[4.1rem] xl:text-[5rem]"
          >
            <span className="sm:block">Turning Blank Walls </span>
            <span className="italic text-clay sm:block">
              Into Works of Art<span className="text-ink not-italic">.</span>
            </span>
          </h1>

          <p className="animate-fade-in mt-7 max-w-md text-base leading-relaxed text-muted [animation-delay:240ms] sm:text-lg">
            Custom wall art, 3D designs, portraits and handcrafted artwork created to make your space
            truly yours.
          </p>

          <div className="animate-fade-in mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3 [animation-delay:360ms]">
            <a href="#gallery" className="btn-primary group px-5 sm:px-6">
              Explore My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-ghost group px-5 sm:px-6">
              Instagram
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <dl className="animate-fade-in mt-14 hidden max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6 [animation-delay:480ms] sm:grid">
            {[
              ['Murals', 'Hand-painted'],
              ['3D & POP', 'Sculpted walls'],
              ['Portraits', 'On commission'],
            ].map(([dt, dd]) => (
              <div key={dt}>
                <dt className="font-serif text-lg text-ink">{dt}</dt>
                <dd className="mt-1 text-xs text-muted">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Artwork */}
        <div className="relative lg:col-span-5">
          <div className="animate-fade-in relative mx-auto max-w-md [animation-delay:200ms] sm:max-w-lg lg:ml-auto lg:max-w-none">
            {/* Offset frame line for depth */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-sm border border-clay/30 sm:translate-x-6 sm:translate-y-6"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-sm bg-sand lg:aspect-[5/6]">
              <div ref={imageRef} className="absolute -inset-y-10 inset-x-0 will-change-transform">
                <ArtImage
                  src={featureImages.hero.src}
                  alt={featureImages.hero.alt}
                  eager
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <GlassCard className="animate-float absolute -bottom-6 -left-3 max-w-[15rem] p-5 sm:-left-10 sm:p-6">
              <p className="eyebrow text-[0.62rem] text-ink/60">Custom Artwork</p>
              <p className="mt-2 font-serif text-xl leading-snug text-ink">
                Made with imagination <span className="italic">&amp; detail</span>
              </p>
            </GlassCard>

            <GlassCard className="absolute top-10 -right-2 hidden items-center gap-3 px-4 py-3 sm:flex lg:-right-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-clay" />
              </span>
              <span className="text-xs font-medium text-ink">Open for commissions</span>
            </GlassCard>
          </div>

          <PaintStroke className="animate-float pointer-events-none absolute -right-10 -bottom-16 w-48 rotate-[168deg] text-ink/[0.06]" />
        </div>
      </div>
    </section>
  )
}
