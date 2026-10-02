import { MessageCircle, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/index.jsx'
import { LINKS, GOODS, goodsSrc } from '../data/catalog.js'
import { Gutter, Reveal, Marquee } from '../components/Primitives.jsx'

export default function Goods() {
  const { t } = useLanguage()
  const slots = t('goods.slots')

  return (
    <>
      {/* ── Masthead ───────────────────────────────── */}
      <section className="relative isolate flex min-h-[78svh] items-center overflow-hidden pt-28 pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_30%_45%,#000_10%,transparent_75%)]" />
        <div className="scanlines pointer-events-none absolute inset-0 -z-10 opacity-50" />
        <div className="pointer-events-none absolute -top-32 -left-24 -z-10 size-[34rem] rounded-full bg-magenta/12 blur-[130px]" />
        <div className="pointer-events-none absolute -right-24 -bottom-40 -z-10 size-[30rem] rounded-full bg-cyan/10 blur-[140px]" />

        {/* ghost wordmark, balances the empty right half */}
        <span
          aria-hidden="true"
          className="font-poster pointer-events-none absolute top-1/2 right-10 -z-10 hidden -translate-y-1/2 text-[11vw] leading-[0.78] tracking-[0.02em] text-ink/[0.05] select-none lg:block xl:right-20"
        >
          SOON
        </span>

        <Gutter className="relative w-full">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-poster text-2xl leading-none text-magenta">
                07
              </span>
              <span className="h-px w-12 bg-magenta/60" />
              <span className="kicker">{t('goods.mark')}</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="hero-title mt-7 max-w-[54rem]">
              <span className="block">{t('goods.headA')}</span>
              <span className="text-outline block">{t('goods.headB')}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="brackets mt-10 inline-flex items-center gap-3 border border-magenta/50 px-5 py-3">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-magenta opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-magenta" />
              </span>
              <span className="font-mono text-[11px] tracking-[0.24em] text-magenta uppercase">
                {t('goods.status')}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-9 max-w-lg text-[0.95rem] leading-relaxed text-muted">
              {t('goods.body')}
            </p>
          </Reveal>
        </Gutter>
      </section>

      <Marquee
        items={Array.from({ length: 8 }, () => t('goods.status'))}
        className="border-y border-line"
      />

      {/* ── Empty product slots ────────────────────── */}
      <section className="py-20 md:py-28">
        <Gutter>
          <Reveal>
            <div className="flex items-center gap-4 border-b border-line pb-3">
              <span className="kicker">{t('goods.slotsTitle')}</span>
              <span className="h-px flex-1 bg-line" />
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px border-line bg-line md:grid-cols-3">
            {(Array.isArray(slots) ? slots : []).map((slot, i) => {
              const item = GOODS[i]
              return (
                <Reveal key={slot.name} delay={i * 0.08}>
                  <article className="group relative flex h-full flex-col bg-void p-7 md:p-9">
                    <div className="brackets relative aspect-square w-full border border-line/70 bg-night/40">
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      {item && (
                        <img
                          src={goodsSrc(item.image)}
                          alt={slot.name}
                          loading="lazy"
                          className="absolute inset-0 size-full object-contain p-4"
                        />
                      )}
                    </div>

                    <div className="mt-6 flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-magenta/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-bold tracking-tight">
                        {slot.name}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                      {slot.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                        {slot.kind}
                      </span>
                      <span className="h-px w-5 bg-line" />
                      <span className="font-mono text-[10px] tracking-[0.16em] text-cyan">
                        {item?.price}
                      </span>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </Gutter>
      </section>

      {/* ── Notify ─────────────────────────────────── */}
      <section className="border-t border-line bg-night/40 py-20 md:py-28">
        <Gutter>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal>
                <h2 className="display-heading max-w-[18ch] text-3xl sm:text-4xl md:text-5xl">
                  {t('goods.notifyTitle')}
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
                  {t('goods.notifyBody')}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.14}>
              <div className="flex flex-wrap gap-3">
                <a
                  href={LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 border border-magenta bg-magenta px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] text-void uppercase transition-colors duration-200 hover:border-cyan hover:bg-cyan"
                >
                  <MessageCircle className="size-3.5" />
                  {t('goods.notifyCta')}
                  <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <Link
                  to="/"
                  className="group inline-flex items-center gap-2.5 border border-line bg-white/[0.015] px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:border-cyan hover:text-cyan"
                >
                  <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                  {t('goods.backHome')}
                </Link>
              </div>
            </Reveal>
          </div>
        </Gutter>
      </section>
    </>
  )
}
