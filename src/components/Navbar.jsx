import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage, LANGUAGES } from '../i18n/index.jsx'
import { LINKS } from '../data/catalog.js'
import Logo from './Logo.jsx'

const MotionLink = motion.create(Link)

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Section anchors are always routed through '/' so they work from any page.
  // ScrollToTop lands on the section once it is in the DOM.
  const links = [
    { href: '/#titles', label: t('nav.games'), n: '01', route: true },
    { href: '/tools', label: t('nav.products'), n: '02', route: true },
    { href: '/studio', label: t('nav.about'), n: '03', route: true },
    { href: '/goods', label: t('goods.navLabel'), n: '04', route: true },
    { href: '/#news', label: t('nav.news'), n: '05', route: true },
    { href: LINKS.docs, label: t('nav.docs'), n: '06', external: true },
  ]

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-line bg-void/85 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-6 md:h-18 md:px-10 lg:px-16 xl:px-20">
          {onHome ? (
            <a href="#top" aria-label="BrainFrags home">
              <Logo />
            </a>
          ) : (
            <Link to="/" aria-label="BrainFrags home">
              <Logo />
            </Link>
          )}

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => {
              const cls = `group relative font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
                l.route && !l.href.includes('#') && pathname === l.href
                  ? 'text-magenta'
                  : 'text-muted hover:text-ink'
              }`
              const inner = (
                <>
                  {l.label}
                  {l.external && (
                    <ArrowUpRight className="ml-0.5 inline size-2.5 opacity-60" />
                  )}
                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-magenta transition-all duration-300 group-hover:w-full" />
                </>
              )
              return l.route ? (
                <Link key={l.href} to={l.href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  {...(l.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={cls}
                >
                  {inner}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-2 lg:flex">
              {LANGUAGES.map((l, i) => (
                <span key={l.code} className="flex items-center gap-2">
                  {i > 0 && <span className="text-[10px] text-line">/</span>}
                  <button
                    onClick={() => setLang(l.code)}
                    className={`font-mono text-[11px] tracking-[0.14em] transition-colors ${
                      lang === l.code
                        ? 'text-magenta'
                        : 'text-faint hover:text-ink'
                    }`}
                  >
                    {l.short}
                  </button>
                </span>
              ))}
            </div>

            <Link
              to="/#contact"
              className="hidden border border-line px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:border-magenta hover:text-magenta lg:inline-block"
            >
              {t('nav.contact')}
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="p-1 transition active:scale-90 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 flex flex-col bg-void lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
            <div className="relative flex h-16 items-center justify-between border-b border-line px-6">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="p-1 active:scale-90"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>

            <div className="relative flex flex-1 flex-col justify-center px-6">
              {links.map((l, i) => {
                const Tag = l.external ? motion.a : MotionLink
                const nav = l.external
                  ? { href: l.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { to: l.href }
                return (
                  <Tag
                    key={l.href}
                    {...nav}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                    className="flex items-baseline gap-5 border-b border-line py-4"
                  >
                    <span className="font-mono text-[10px] text-magenta">
                      {l.n}
                    </span>
                    <span className="font-poster text-4xl leading-none">
                      {l.label}
                    </span>
                  </Tag>
                )
              })}

              <div className="mt-10 flex items-center gap-3">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`border px-4 py-2 font-mono text-[11px] tracking-[0.16em] transition ${
                      lang === l.code
                        ? 'border-magenta text-magenta'
                        : 'border-line text-faint'
                    }`}
                  >
                    {l.short}
                  </button>
                ))}
              </div>

              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="mt-5 border border-magenta bg-magenta py-3.5 text-center font-mono text-[11px] tracking-[0.2em] text-void uppercase"
              >
                {t('nav.contact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
