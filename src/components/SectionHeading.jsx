import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', dark = false, id }) {
  const centered = align === 'center'
  return (
    <Reveal className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`eyebrow mb-5 flex items-center gap-3 ${centered ? 'justify-center' : ''} ${dark ? 'text-ivory/60' : ''}`}>
          <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-ivory/40' : 'bg-clay'}`} />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] ${dark ? 'text-ivory' : 'text-ink'}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${centered ? 'mx-auto' : ''} ${dark ? 'text-ivory/65' : 'text-muted'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
