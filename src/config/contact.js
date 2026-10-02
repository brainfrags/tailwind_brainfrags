// EmailJS configuration.
//
// These are *publishable* client-side identifiers — EmailJS is designed to
// have them in the browser bundle, and the same three values already ship in
// the aidevkit.dev build. They are not secrets. Domain allow-listing in the
// EmailJS dashboard is what actually stops abuse, so make sure brainfrags.com is
// listed there.
//
// Any of them can be overridden at build time with a .env file:
//   VITE_EMAILJS_SERVICE_ID=...
//   VITE_EMAILJS_TEMPLATE_ID=...
//   VITE_EMAILJS_PUBLIC_KEY=...

export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_dq9mkcr',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_c091emu',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Aw8z61Fy19-mAuUUv',
  toEmail: 'munchkin@brainfrags.com',
  toName: 'BrainFrags',
}

export const TOPICS = ['support', 'custom', 'partnership', 'other']
