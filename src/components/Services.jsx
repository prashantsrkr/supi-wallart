import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import GlassCard from './GlassCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative overflow-clip bg-linen py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(201,138,110,0.18),transparent_65%)]"
      />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="services-title"
            eyebrow="What I create"
            title={
              <>
                Every surface is a <span className="italic text-clay">canvas.</span>
              </>
            }
          />
          <Reveal delay={100} className="max-w-sm text-muted lg:pb-2">
            From a single portrait to a full feature wall, each piece is designed for the space it
            lives in.
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map(({ title, description, icon: Icon }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 90}>
              <GlassCard className="group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-500 ease-soft hover:-translate-y-1.5 hover:bg-white/70 hover:shadow-lift sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 text-ink transition-colors duration-500 group-hover:border-clay group-hover:bg-clay group-hover:text-ivory">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-sm text-muted/70 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="mt-10 font-serif text-2xl tracking-tight text-ink">{title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{description}</p>
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-1.5 self-start text-sm font-medium text-ink opacity-80 transition-all duration-300 hover:text-clay group-hover:opacity-100"
                >
                  Commission this
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only">: {title}</span>
                </a>
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
