import { site } from '../data/site'

/**
 * Commission form submission.
 *
 * Enquiries are emailed to `site.formEmail` (see src/data/site.js) through FormSubmit's AJAX
 * endpoint. No server or account is needed. The first ever submission triggers a one-time
 * activation email to that inbox; nothing is delivered until "Activate" is clicked.
 *
 * Until an address is set, submissions are only logged in development and show a friendly
 * error in production, so no enquiry is silently lost.
 */
export async function submitCommission(data) {
  const recipient = site.formEmail.trim()

  if (!recipient) {
    if (import.meta.env.DEV) {
      await new Promise((resolve) => setTimeout(resolve, 900))
      console.info('[commission] formEmail not set; would submit:', data)
      return { ok: true }
    }
    throw new Error(
      `The form isn't connected yet. Please message me on Instagram at ${site.instagram.handle}.`,
    )
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      Name: data.name,
      Email: data.email,
      Phone: data.phone || 'Not provided',
      'Artwork Type': data.artworkType,
      Message: data.message,
      _subject: `New commission enquiry from ${data.name}`,
      _replyto: data.email,
      _template: 'table',
      _captcha: 'false',
      _honey: data.honey || '',
    }),
  })

  const result = await res.json().catch(() => ({}))
  if (!res.ok || String(result.success) !== 'true') {
    throw new Error(
      `Sorry, your message couldn't be sent. Please try again, or message me on Instagram at ${site.instagram.handle}.`,
    )
  }
  return { ok: true }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d][\d\s()-]{6,18}$/

/** Returns an object of field → error message. Empty object means valid. */
export function validateCommission(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please share your name.'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number, or leave it blank.'
  if (!values.artworkType) errors.artworkType = 'Choose the kind of artwork you have in mind.'
  if (values.message.trim().length < 15)
    errors.message = 'Tell me a little more, at least a sentence about your space or idea.'
  return errors
}
