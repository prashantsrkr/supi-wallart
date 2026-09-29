import { useRef, useState } from 'react'
import { ArrowRight, Check, LoaderCircle, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../data/site'
import { artworkTypes } from '../data/services'
import { submitCommission, validateCommission } from '../lib/submitCommission'
import GlassCard from './GlassCard'
import { InstagramIcon, WhatsAppIcon } from './Icons'
import Reveal from './Reveal'

// `honey` is a spam trap: hidden from people, but bots tend to fill it in.
const initial = { name: '', email: '', phone: '', artworkType: '', message: '', honey: '' }

const inputBase =
  'peer w-full rounded-xl border bg-white/60 px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-muted/60 transition-colors duration-300 focus:bg-white/90 focus:outline-none focus-visible:outline-none'

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#9b3b24]">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    const fieldError = validateCommission({ ...values })[name]
    // Only surface blur errors once the user has typed something.
    if (values[name]) setErrors((errs) => ({ ...errs, [name]: fieldError }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validateCommission(values)
    setErrors(found)
    if (Object.keys(found).length) {
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    setStatus('submitting')
    setServerError('')
    try {
      await submitCommission({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        artworkType: values.artworkType,
        message: values.message.trim(),
        honey: values.honey,
      })
      setStatus('success')
      setValues(initial)
    } catch (err) {
      setStatus('error')
      setServerError(err?.message || 'Something went wrong. Please try again.')
    }
  }

  // Pre-filled text for the WhatsApp / email fallback, so nothing typed is lost.
  const fallbackText = () =>
    [
      `Hi Supi, I'm ${values.name.trim()}.`,
      values.artworkType && `Artwork type: ${values.artworkType}`,
      values.message.trim(),
      values.phone.trim() && `Phone: ${values.phone.trim()}`,
      values.email.trim() && `Email: ${values.email.trim()}`,
    ]
      .filter(Boolean)
      .join('\n\n')

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: update,
    onBlur: handleBlur,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    className: `${inputBase} ${errors[name] ? 'border-[#9b3b24]/60' : 'border-ink/10 focus:border-clay'}`,
  })

  const contactItems = [
    { icon: InstagramIcon, label: 'Instagram', value: site.instagram.handle, href: site.instagram.url, external: true },
    { icon: Phone, ...site.contact.phone },
    { icon: WhatsAppIcon, ...site.contact.whatsapp, external: true },
    { icon: Mail, ...site.contact.email },
    { icon: MapPin, ...site.contact.location },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-clip py-24 sm:py-32 lg:py-40"
    >
      {/* Warm washes so the glass panel has something to refract */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(201,138,110,0.28),transparent_65%)]" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Pitch + details */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-clay" />
              Commission a piece
            </p>
            <h2 id="contact-title" className="font-serif text-4xl leading-[1.06] tracking-tight text-balance text-ink sm:text-5xl xl:text-[3.75rem]">
              Have a wall waiting for a <span className="italic text-clay">story?</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Tell me about your space, your idea, or the artwork you’ve been imagining.
            </p>
          </Reveal>

          <Reveal as="ul" delay={120} className="mt-12 space-y-1">
            {contactItems.map(({ icon: Icon, label, value, href, external }) => {
              const content = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/10 bg-white/50 text-ink transition-colors duration-300 group-hover:border-clay group-hover:text-clay">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs tracking-[0.18em] text-muted uppercase">{label}</span>
                    <span className="block text-ink">{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                      className="group -mx-3 flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-white/40"
                    >
                      {content}
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  ) : (
                    <div className="group -mx-3 flex items-center gap-4 px-3 py-3">{content}</div>
                  )}
                </li>
              )
            })}
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={100} className="lg:col-span-7">
          <GlassCard className="rounded-3xl p-6 sm:p-10">
            {status === 'success' ? (
              <div role="status" className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-clay text-ivory">
                  <Check className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-serif text-3xl text-ink">Thank you, message received.</h3>
                <p className="mt-3 max-w-sm text-muted">
                  I’ll get back to you within a couple of days to hear more about your space and idea.
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-8">
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={handleSubmit} aria-describedby="form-note">
                <p id="form-note" className="sr-only">
                  Fields marked optional can be left blank. All other fields are required.
                </p>
                <div aria-hidden="true" className="sr-only">
                  <label htmlFor="contact-honey">Leave this field empty</label>
                  <input id="contact-honey" type="text" name="honey" tabIndex={-1} autoComplete="off" value={values.honey} onChange={update} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="contact-name" label="Name" error={errors.name}>
                    <input type="text" autoComplete="name" required placeholder="Your name" {...fieldProps('name')} />
                  </Field>
                  <Field id="contact-email" label="Email" error={errors.email}>
                    <input type="email" autoComplete="email" inputMode="email" required placeholder="you@example.com" {...fieldProps('email')} />
                  </Field>
                  <Field id="contact-phone" label="Phone" optional error={errors.phone}>
                    <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 …" {...fieldProps('phone')} />
                  </Field>
                  <Field id="contact-artworkType" label="Artwork Type" error={errors.artworkType}>
                    <div className="relative">
                      <select required {...fieldProps('artworkType')} className={`${fieldProps('artworkType').className} appearance-none pr-10 ${values.artworkType ? '' : 'text-muted/80'}`}>
                        <option value="" disabled>
                          Select a type
                        </option>
                        {artworkTypes.map((t) => (
                          <option key={t} value={t} className="text-ink">
                            {t}
                          </option>
                        ))}
                      </select>
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id="contact-message" label="Message" error={errors.message}>
                      <textarea
                        rows={5}
                        required
                        placeholder="Tell me about the wall or space, the size, the feeling you're after…"
                        {...fieldProps('message')}
                        className={`${fieldProps('message').className} resize-y`}
                      />
                    </Field>
                  </div>
                </div>

                {status === 'error' && (
                  <div role="alert" className="mt-5 rounded-xl border border-[#9b3b24]/20 bg-[#9b3b24]/5 p-4 text-sm">
                    <p className="font-medium text-[#9b3b24]">{serverError}</p>
                    <p className="mt-1 text-muted">
                      Please try again, or send the same message directly:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={`${site.contact.whatsapp.href}?text=${encodeURIComponent(fallbackText())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#1f7a4d] px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
                      >
                        <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                      <a
                        href={`${site.contact.email.href}?subject=${encodeURIComponent('Commission enquiry')}&body=${encodeURIComponent(fallbackText())}`}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-medium text-ink transition-colors hover:bg-white/60"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" /> Email
                      </a>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted">I usually reply within 48 hours.</p>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary group w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Start a Conversation
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
