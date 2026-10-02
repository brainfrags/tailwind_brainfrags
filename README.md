# brainfrags.com

BrainFrags Inc. official website — React 19 + Vite + Tailwind v4, deployed to GitHub Pages.

Repo: <https://github.com/brainfrags/tailwind_brainfrags>

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  data/catalog.js        # products, external links (structural data)
  i18n/
    index.jsx            # LanguageProvider, useLanguage, t()
    locales/{en,ko,ja}.js
  components/
    Primitives.jsx       # Reveal, Glitch, SectionMark, DisplayHeading,
                         # ActionLink, ActionRoute, PageMasthead, Section,
                         # Gutter, Marquee
    KeyArt.jsx           # generated SVG key art for titles without illustration
    Navbar.jsx  Footer.jsx  Logo.jsx  SmoothScroll.jsx  ScrollToTop.jsx
  config/contact.js      # EmailJS ids (publishable) + contact topics
  sections/              # Hero, Practice, Tools, Titles, Studio, Log, Contact
  pages/
    Tools.jsx            # /tools — catalog index
    ToolDetail.jsx       # /tools/:slug — one package
    StudioPage.jsx       # /studio
    Goods.jsx            # /goods — coming-soon store
    Legal.jsx            # /terms-of-service, /privacy-policy (lazy-loaded)
  content/legal/         # ported legal text, one module per document
  global.css             # fonts, @theme tokens, textures, per-script type sizing
public/images/           # character key art (webp, 3 widths each)
public/covers/           # Asset Store covers per product (webp, 480 + 1200)
docs/
  PRODUCT-NOTES.md       # what we could and could not verify about the products
  LEGAL-NOTES.md         # provenance of the legal text + open issues
```

## Routes

| Path | Page |
|---|---|
| `/` | Home — hero, practices, toolkit, titles, studio, log, contact |
| `/tools` | Catalog index, grouped, with bundled tools and setup guides |
| `/tools/:slug` | One package: overview, features, spec sheet, siblings |
| `/studio` | Studio — statement, timeline, how we work, values |
| `/goods` | Goods — coming soon, no store |
| `/terms-of-service` · `/privacy-policy` | Ported legal documents |

**Copy lives in `src/i18n/locales/`. Data lives in `src/data/catalog.js`.**
Adding a product = one entry in `catalog.js` plus a `productCopy.<id>` block in
each locale. Adding a language = one locale file plus one line in `LANGUAGES`
inside `src/i18n/index.jsx`.

Product prose is deliberately conservative: if the documentation does not say
something, the site does not claim it. Read `docs/PRODUCT-NOTES.md` before
adding a feature bullet — several store-page claims did not survive checking.

## Design direction

Editorial / poster, not SaaS-landing. The rules that keep it that way:

- **Key art carries the page.** Hero and the ROUTiNA panel are full-bleed
  illustrations with type set over them — not screenshots in rounded cards.
- **Hard edges only.** No `rounded-*` on structural elements. Panels are
  separated by 1px hairlines (`border-line`), never by shadow or radius.
- **Lists and tables, not card grids.** The toolkit is a catalog index; the
  practices and values are numbered rows.
- **Neon is punctuation.** Magenta/cyan/lilac stay under ~5% of any screen —
  rules, markers, one word in a heading. Never a large fill.
- **Texture is constant and quiet.** Film grain over the whole page, scanlines
  and a hairline grid over art.

### Tokens (`@theme` in `global.css`)

| Token | Value | Use |
|---|---|---|
| `void` | `#060616` | page background |
| `night` | `#0D0C24` | alternating section bands |
| `plum` / `slate` | `#1B1240` / `#2A2856` | raised surfaces |
| `line` | `#302E5C` | every hairline and border |
| `ink` / `muted` / `faint` | `#F2F0FF` / `#9C97C4` / `#635E91` | text |
| `magenta` | `#FF3D9A` | primary accent, CTA, section marks |
| `cyan` | `#5FE8FF` | secondary accent, free/positive |
| `lilac` | `#B48CFF` | outline text, tertiary |

Base colours are sampled from the key art so the illustrations sit in the page
rather than on top of it.

### Type

| Role | Family | Notes |
|---|---|---|
| Poster | Bebas Neue | logo, section numerals, marquee. Caps-only — never use for `ROUTiNA` |
| Display | Archivo Variable | all headings, weight 800–900, tight tracking |
| Body | Inter Variable | |
| Mono | JetBrains Mono Variable | kickers, labels, prices, dates |
| KO / JA | Noto Sans KR / JP | Korean + Japanese subsets only |

All fonts are **self-hosted via Fontsource** — no requests to Google at runtime.

CJK needs different sizing from Latin: `global.css` reduces `.hero-title` and
loosens `.display-heading` under `html[lang="ko"]` / `[lang="ja"]`, and sets
`word-break: keep-all` so Korean does not break mid-word.

### Utilities

`.font-poster` `.text-outline` `.text-outline-magenta` `.kicker` `.brackets`
`.grain` `.scanlines` `.bg-grid` `.marquee-track` `.vertical-rail` `.glitch`

## Contact form

`sections/Contact.jsx` sends through **EmailJS** using the same service,
template and public key as aidevkit.dev — see `src/config/contact.js`. Those
three values are publishable by design and already ship in that site's bundle;
they are not secrets. What actually protects the endpoint is the **allowed
domains** list in the EmailJS dashboard, so add `brainfrags.com` there.

Override per environment with a `.env` file if you ever want a separate
template:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

The form validates inline (no `alert()`), carries a honeypot field, disables
itself while sending, and on failure falls back to a `mailto:` link. The topic
chip is passed through as `provider` so it lands in the existing template
without needing a new one.

## Images

**Product covers** — `public/covers/<slug>-{480,1200}.webp`, derived from the
Unity Asset Store artwork in `E:\Projects\Unity.*\asset_store\`. All are
centre-cropped to 3:2 so every card is the same shape. `coverSrc(slug, width)`
in `data/catalog.js` resolves them and returns `null` for a product without
art, so the image just doesn't render.

Lock Task had no cover — only a 160px store icon — so its cover is composited
from that icon over the site's plum field. Replace it if a real one gets made.

**Character key art** — `public/images/`, used full-bleed in the hero (Aimi)
and the ROUTiNA panel (Ivy).

**Generated key art** — `components/KeyArt.jsx` holds a hand-authored SVG
composition for **CityChat**, which has no illustration. It is deterministic
(seeded RNG — stars, windows and rain land identically on every build). To swap
in real art, replace `<Art className=... />` in `sections/Titles.jsx` with an
`<img>` exactly like the ROUTiNA panel above it.

To add another title, add an entry to `PANELS` in `sections/Titles.jsx`, matching
copy under `titles.<id>` in all three locales, and either an `<img>` or a new
art component registered in `TITLE_ART`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

1. GitHub repo → **Settings → Pages → Source: GitHub Actions**
2. `public/CNAME` already contains `brainfrags.com`
3. Point DNS at GitHub Pages (see `DESIGN.md` § 6)

`base` is `/` in `vite.config.js` because the site runs on a custom domain.

`vite.config.js` also copies `index.html` to `404.html` on build. GitHub Pages
has no rewrite rules, so without it a direct hit on `/goods` would 404 instead
of reaching the client router. Keep that plugin as long as any route exists.

## TODO

- [ ] Real logo mark (the wordmark is currently type-only)
- [ ] Real key art for CityChat (generated SVG for now)
- [ ] A real Lock Task cover (currently composited from its store icon)
- [ ] Send a real test through the contact form and confirm it arrives
- [ ] Add brainfrags.com to the EmailJS allowed-domains list
- [ ] Redirect glitch9.dev → brainfrags.com (DNS/host-level redirect for the old domain)
- [ ] Rewrite the legal documents — the ported text is from 2020 and covers a
      game service, not this site. See `docs/LEGAL-NOTES.md`
- [ ] Korean privacy policy (none exists in the source material)
- [ ] Log/News: decide between markdown files vs. external CMS
- [ ] Goods: real product shots + a store when the goods exist. Payment is
      deliberately not built — see `DESIGN.md`
- [ ] `sitemap.xml`, `robots.txt`, per-language OG images
