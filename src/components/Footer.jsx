import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/index.jsx'
import { LINKS } from '../data/catalog.js'
import { Gutter } from './Primitives.jsx'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const cols = [
    {
      title: t('footer.products'),
      items: [
        { label: t('nav.games'), href: '/#titles', route: true },
        { label: t('nav.products'), href: '/tools', route: true },
        { label: 'AI Dev Kit', href: LINKS.aidevkit, external: true },
        { label: t('nav.docs'), href: LINKS.docs, external: true },
        { label: 'Asset Store', href: LINKS.assetStore, external: true },
      ],
    },
    {
      title: t('footer.company'),
      items: [
        { label: t('nav.about'), href: '/studio', route: true },
        { label: t('goods.navLabel'), href: '/goods', route: true },
        { label: t('footer.careers'), href: '/#contact', route: true },
        { label: t('footer.privacy'), href: '/privacy-policy', route: true },
        { label: t('footer.terms'), href: '/terms-of-service', route: true },
      ],
    },
    {
      title: t('footer.connect'),
      items: [
        { label: 'X', href: LINKS.x, external: true },
        { label: 'GitHub', href: LINKS.github, external: true },
        { label: 'Discord', href: LINKS.discord, external: true },
        { label: LINKS.email, href: `mailto:${LINKS.email}` },
      ],
    },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <Gutter>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {t('footer.tagline')}
            </p>
            <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              {t('footer.office')}
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="kicker">{col.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.route ? (
                      <Link
                        to={item.href}
                        className="font-mono text-xs text-muted transition-colors hover:text-cyan"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="font-mono text-xs text-muted transition-colors hover:text-cyan"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* oversized wordmark */}
        <div className="mt-16 -mb-3 overflow-hidden">
          <span className="font-poster block text-[16vw] leading-[0.8] tracking-[0.02em] text-ink/[0.06] select-none">
            BRAINFRAGS
          </span>
        </div>
      </Gutter>

      <div className="border-t border-line">
        <Gutter className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
            © {year} BrainFrags Inc. — {t('footer.rights')}
          </p>
          <p className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
            Munchkin Production
          </p>
        </Gutter>
      </div>
    </footer>
  )
}
