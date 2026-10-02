import { useRef, useState } from 'react'
import {
  Mail,
  MessageCircle,
  Github,
  ArrowUpRight,
  Send,
  Check,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../i18n/index.jsx'
import { LINKS } from '../data/catalog.js'
import { EMAILJS, TOPICS } from '../config/contact.js'
import {
  Section,
  SectionMark,
  DisplayHeading,
  Reveal,
} from '../components/Primitives.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// lucide still ships the old bird; draw the current mark instead
function XMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.81-5.96 6.81H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.05 4.13H5.09l11.99 15.64Z" />
    </svg>
  )
}

export default function Contact() {
  const { t, lang } = useLanguage()
  const formRef = useRef(null)
  const [topic, setTopic] = useState(TOPICS[0])
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

  const channels = [
    {
      icon: Mail,
      label: t('contact.emailLabel'),
      value: LINKS.email,
      href: `mailto:${LINKS.email}`,
    },
    {
      icon: MessageCircle,
      label: t('contact.discordLabel'),
      value: t('contact.discordValue'),
      href: LINKS.discord,
      external: true,
    },
    {
      icon: XMark,
      label: t('contact.xLabel'),
      value: LINKS.xHandle,
      href: LINKS.x,
      external: true,
    },
    {
      icon: Github,
      label: t('contact.githubLabel'),
      value: t('contact.githubValue'),
      href: LINKS.github,
      external: true,
    },
  ]

  const validate = (data) => {
    const next = {}
    if (!data.name.trim()) next.name = t('contact.errRequired')
    if (!EMAIL_RE.test(data.email.trim())) next.email = t('contact.errEmail')
    if (data.message.trim().length < 10) next.message = t('contact.errMessage')
    return next
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const form = e.currentTarget
    // Honeypot — real people never fill a hidden field.
    if (form.company.value) {
      setStatus('sent')
      return
    }

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    }
    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length) return

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          reply_to: data.email,
          customer_name: data.name,
          customer_email: data.email,
          provider: `[${t(`contact.topics.${topic}`)}]`,
          subject: `brainfrags.com — ${t(`contact.topics.${topic}`)}`,
          message: `${data.message}\n\n— topic: ${topic} · locale: ${lang} · via brainfrags.com`,
          to_email: EMAILJS.toEmail,
          to_name: EMAILJS.toName,
        },
        EMAILJS.publicKey,
      )
      setStatus('sent')
      form.reset()
      setTopic(TOPICS[0])
    } catch (err) {
      console.error('[contact] send failed', err)
      setStatus('error')
    }
  }

  const field =
    'w-full border bg-void px-4 py-3.5 font-mono text-xs tracking-wide text-ink placeholder:text-faint transition outline-none focus:border-magenta'
  const fieldState = (key) =>
    errors[key] ? 'border-magenta' : 'border-line'

  return (
    <Section
      id="contact"
      className="border-t border-line bg-night/40 py-24 md:py-32"
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionMark number="06" label={t('contact.mark')} />
          <DisplayHeading className="mt-7 max-w-[12ch]">
            {t('contact.headA')}
          </DisplayHeading>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {t('contact.body')}
            </p>
          </Reveal>

          <div className="mt-10 border-t border-line">
            {channels.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.label} delay={i * 0.06}>
                  <a
                    href={c.href}
                    {...(c.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="group flex items-center gap-5 border-b border-line py-4 transition-colors duration-200 hover:bg-magenta/[0.05]"
                  >
                    <Icon className="size-4 shrink-0 text-faint transition-colors group-hover:text-magenta" />
                    <span className="kicker w-20 shrink-0">{c.label}</span>
                    <span className="min-w-0 flex-1 truncate font-mono text-xs text-ink">
                      {c.value}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-magenta" />
                  </a>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal delay={0.1}>
          <form
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            className="brackets border border-line bg-void p-7 md:p-10"
          >
            {/* topic */}
            <fieldset>
              <legend className="kicker">{t('contact.topicLabel')}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOPICS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTopic(key)}
                    aria-pressed={topic === key}
                    className={`border px-3.5 py-2 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${
                      topic === key
                        ? 'border-magenta bg-magenta/10 text-magenta'
                        : 'border-line text-faint hover:border-lilac/50 hover:text-ink'
                    }`}
                  >
                    {t(`contact.topics.${key}`)}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <input
                    name="name"
                    autoComplete="name"
                    className={`${field} ${fieldState('name')}`}
                    placeholder={t('contact.formName')}
                    aria-label={t('contact.formName')}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1.5 font-mono text-[10px] text-magenta">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`${field} ${fieldState('email')}`}
                    placeholder={t('contact.formEmail')}
                    aria-label={t('contact.formEmail')}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1.5 font-mono text-[10px] text-magenta">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  className={`${field} ${fieldState('message')} min-h-40 resize-y`}
                  placeholder={t('contact.formMessage')}
                  aria-label={t('contact.formMessage')}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1.5 font-mono text-[10px] text-magenta">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* honeypot — hidden from people, irresistible to bots */}
              <input
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] size-0 opacity-0"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-5 flex w-full items-center justify-center gap-2 border border-magenta bg-magenta px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] text-void uppercase transition-colors duration-200 hover:border-cyan hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  {t('contact.sending')}
                </>
              ) : (
                <>
                  <Send className="size-3.5" />
                  {t('contact.formSubmit')}
                </>
              )}
            </button>

            {/* status */}
            {status === 'sent' && (
              <div className="mt-4 flex items-start gap-2.5 border border-cyan/40 bg-cyan/[0.06] px-4 py-3">
                <Check className="mt-px size-3.5 shrink-0 text-cyan" />
                <p className="text-xs leading-relaxed text-cyan">
                  {t('contact.sent')}
                </p>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 flex items-start gap-2.5 border border-magenta/50 bg-magenta/[0.06] px-4 py-3">
                <AlertTriangle className="mt-px size-3.5 shrink-0 text-magenta" />
                <p className="text-xs leading-relaxed text-muted">
                  {t('contact.failed')}{' '}
                  <a
                    href={`mailto:${LINKS.email}`}
                    className="text-magenta underline underline-offset-2"
                  >
                    {LINKS.email}
                  </a>
                </p>
              </div>
            )}
            {status === 'idle' && (
              <p className="mt-3 text-center font-mono text-[10px] tracking-wider text-faint">
                {t('contact.formNote')}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
