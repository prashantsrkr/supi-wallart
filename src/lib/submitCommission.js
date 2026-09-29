import { site } from '../data/site'

/**
 * Commission form submission. Enquiries are emailed to Supi's inbox, with no backend needed.
 *
 * Provider (configured in src/data/site.js → `form`):
 *  1. Web3Forms, when `web3formsKey` is set (preferred: fast and reliable, free up to 250/month).
 *     Get a key at https://web3forms.com by entering the inbox address; the key is emailed there.
 *     The key is safe to publish in front-end code.
 *  2. Otherwise FormSubmit, sending to `email`. The first submission triggers a one-time
 *     activation email to that inbox; nothing is delivered until "Activate" is clicked.
 *
 * Requests time out after 20s so a slow provider never leaves the visitor waiting; the form
 * then offers WhatsApp and email as alternatives.
 */
const TIMEOUT_MS = 20000

export async function submitCommission(data) {
  const { web3formsKey, email } = site.form

  if (!web3formsKey && !email) {
    if (import.meta.env.DEV) {
      await new Promise((resolve) => setTimeout(resolve, 900))
      console.info('[commission] no form provider configured; would submit:', data)
      return { ok: true }
    }
    throw new Error("The form isn't connected yet.")
  }

  const subject = `New commission enquiry from ${data.name}`
  const request = web3formsKey
    ? {
        url: 'https://api.web3forms.com/submit',
        body: {
          access_key: web3formsKey,
          subject,
          from_name: 'Supi Wall Art website',
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          artwork_type: data.artworkType,
          message: data.message,
          botcheck: Boolean(data.honey),
        },
      }
    : {
        url: `https://formsubmit.co/ajax/${email}`,
        body: {
          Name: data.name,
          Email: data.email,
          Phone: data.phone || 'Not provided',
          'Artwork Type': data.artworkType,
          Message: data.message,
          _subject: subject,
          _replyto: data.email,
          _template: 'table',
          _captcha: 'false',
          _honey: data.honey || '',
        },
      }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  let res
  try {
    res = await fetch(request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request.body),
      signal: controller.signal,
    })
  } catch {
    // Network failure, timeout, or a provider error page without CORS headers.
    throw new Error("Sorry, your message couldn't be sent right now.")
  } finally {
    clearTimeout(timer)
  }

  const result = await res.json().catch(() => ({}))
  if (!res.ok || String(result.success) !== 'true') {
    throw new Error("Sorry, your message couldn't be sent right now.")
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
