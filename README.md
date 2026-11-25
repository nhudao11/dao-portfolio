# DAO. — Portfolio of Trần Như Đào

Bilingual (EN / VI) personal portfolio for **Trần Như Đào**, QC Engineer — Manual Testing, Automation Testing (Playwright, TypeScript) and AI-assisted QA.

Design concept: **"The Quality Mindset"** — an editorial, Swiss-inspired page that reads like a well-written test plan. Lime means *passed*, orange means *investigate*.

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide · `next/font/local`
- **Live:** https://nhudao11.github.io/dao-portfolio/ (custom domain can be added later)
- **Content source:** the CV only — no invented metrics, screenshots or achievements.

## Requirements

- Node.js **20.9 or newer** (`node -v`)
- npm 10+

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other commands:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # TypeScript check
```

## Deploy

The site is a **static export** (`next.config.ts` → `output: "export"`): `npm run build` writes plain HTML/CSS/JS to `out/`.

### GitHub Pages (configured)

Live at **https://nhudao11.github.io/dao-portfolio/**. `.github/workflows/deploy.yml` builds and publishes `out/` on every push to `main`.

The workflow sets two variables because the site lives in a sub-folder:

```yaml
PAGES_BASE_PATH: /dao-portfolio
NEXT_PUBLIC_SITE_URL: https://nhudao11.github.io/dao-portfolio
```

Repository settings: public repository; **Settings → Pages → Source: GitHub Actions**; no custom domain.

#### Adding a custom domain later (e.g. daotn14.com)

1. In `deploy.yml` set `PAGES_BASE_PATH: ""` and `NEXT_PUBLIC_SITE_URL: https://daotn14.com`, then push.
2. **Settings → Pages → Custom domain**: enter the domain and save.
3. At the registrar, create DNS records:
   | Type | Name | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | nhudao11.github.io |
4. When the domain loads, tick **Enforce HTTPS**.

### Vercel (alternative, works with private repos for free)

Import the repository at https://vercel.com/new and deploy with the defaults; then add `daotn14.com` under Project → Settings → Domains and create the DNS records Vercel shows. If you use Vercel, delete `.github/workflows/deploy.yml` (Vercel needs no base path).

## Editing content

All text lives in `content/` — no copy is hard-coded in components.

| File | What it holds |
| --- | --- |
| `content/en.ts` | English copy (default) |
| `content/vi.ts` | Vietnamese copy — same shape, TypeScript flags missing keys |
| `content/profile.ts` | Language-independent facts: name, email, site URL, project platforms, team sizes, tools |
| `content/types.ts` | The `SiteContent` type both languages must satisfy |

To add LinkedIn or GitHub later: add the URL to `profile` in `content/profile.ts` and render it in `components/sections/Contact.tsx`.

## Project structure

```
app/
  layout.tsx            fonts, metadata, Open Graph, JSON-LD, <LanguageProvider>
  page.tsx              composes the 7 sections
  globals.css           colour tokens (CSS variables), base styles, patterns
  fonts.ts              self-hosted Space Grotesk, Inter, IBM Plex Mono (Latin + Vietnamese)
  fonts/                .woff2 files + licences (SIL OFL)
  opengraph-image.png   1200×630 social preview
  icon.svg              favicon (DAO. mark)
  robots.ts, sitemap.ts
components/
  layout/               SiteHeader (nav + mobile menu), LangSwitch, Section
  ui/                   Button, SectionHeader, Reveal, Tag, Logo
  sections/             Hero, About, AIWorkflow, Experience, Projects, HowIWork, Contact
  graphics/             TestRunPanel, WorkflowRail, AbstractUI (5 illustrative project visuals)
content/                en.ts, vi.ts, profile.ts, types.ts, index.ts
lib/                    i18n.tsx, useActiveSection.ts, motion.ts, cn.ts
public/                 logo SVGs, .nojekyll
assets/projects/        HouseNow screenshots (agent details blurred)
.github/workflows/      GitHub Pages deployment
tailwind.config.ts      design tokens mapped to Tailwind
```

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Warm Ivory | `#F4F1E9` | page background |
| Charcoal | `#191B19` | text, dark panels |
| Lime | `#D7FF58` | primary action, "passed", highlights — **background only on Ivory** (1.01:1 as text) |
| Orange | `#F2A65A` | "investigate", human review steps — background only on Ivory |
| Soft Gray | `#DAD8D0` | hairlines, grid |

Type: Space Grotesk (display), Inter (body), IBM Plex Mono (labels and metadata). Square corners everywhere; depth comes from hairlines and dark panels, not shadows.

## Accessibility & performance

- Text contrast ≥ 4.5:1 (ink 15.4:1, muted 5.9:1); focus rings on every control; skip link; 44px touch targets.
- `prefers-reduced-motion` disables movement; the hero test run shows its final state.
- EN/VI switch updates content in place without reloading and sets `<html lang>`; choice is remembered in `localStorage`.
- Fully static page; fonts self-hosted with Vietnamese glyphs loaded only when needed.
