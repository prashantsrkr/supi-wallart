import { processSteps } from '../data/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          eyebrow="Creative process"
          title={
            <>
              How a commission <span className="italic text-clay">comes to life.</span>
            </>
          }
          intro="A simple, collaborative journey, from the first conversation to the final reveal."
        />

        <ol className="relative mt-16 grid gap-0 lg:mt-24 lg:grid-cols-4 lg:gap-8">
          {/* Timeline line: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-clay/60 via-ink/15 to-transparent lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full lg:bg-gradient-to-r"
          />
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 120} className="relative pb-12 pl-12 last:pb-0 lg:pb-0 lg:pl-0">
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 grid h-[15px] w-[15px] place-items-center rounded-full border border-clay bg-ivory"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-clay" />
              </span>
              <div className="lg:pt-12">
                <p className="font-serif text-5xl text-ink/15 tabular-nums lg:text-6xl">{step.number}</p>
                <h3 className="mt-3 font-serif text-2xl tracking-tight text-ink">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
