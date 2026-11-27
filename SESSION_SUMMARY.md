# Willfow Site — Session Summary
Last updated: 2026-11-25

---

## Project Identity

| Item | Value |
|------|-------|
| GitHub repo | `farzanatoma001-collab/willfow` |
| Vercel team | `willfow` (farzanatoma001-collab) — ISOLATED from other projects |
| Live URL | `willfow.vercel.app` |
| Sanity project ID | `i0l0wd2j` |
| Sanity dataset | `production` |
| Sanity Studio | `willfow.vercel.app/studio` |

**IMPORTANT:** This project uses a completely separate Vercel account (`farzanatoma001-collab`). Do NOT confuse with other Mehedi projects.

---

## Stack

- **Framework:** Next.js 16 App Router, TypeScript, Tailwind CSS v4
- **CMS:** Sanity (next-sanity, @sanity/image-url)
- **Fonts:** Cinzel (serif headings → `font-serif`), Raleway (body → `font-sans`)
- **Deployment:** Vercel (auto-deploy on push to `main`)

### Critical client config
```ts
// sanity/lib/client.ts
useCdn: false           // must stay false — cdn serves stale data
cache: 'no-store'       // on every fetch() call in page.tsx
```

```ts
// app/page.tsx
export const instant = false   // NOT revalidate — this is the correct export
```

---

## Sanity API Token
```
sk7G5VlStngWaZ424K90iLqXAlRsrysXMR64SxkURyGsQNRs4rWDMYS53oqpwogFumN8CG080WG4dfRfgSkBZRMcNgW795XuoxvMDtBU8amyzxu1fMRf29HSTAEKqkQA49VAmO0Bb6RraSXOiJSU8dHpUVrnBcGejZmx68qH8ABYr8GQDuWc
```
Used in scripts with `projectId: 'i0l0wd2j'`, `dataset: 'production'`.

---

## Sanity Content in Production

### Homepage document (`homepage`)
All fields Sanity-editable:
- `heroImage` — hero background photo
- `heroName`, `heroSubtitleItems[]`, `heroQuoteText`, `heroQuoteAuthor`
- `portraitImage` — Will's portrait (About section)
- `taglineLines[]` — PERFORMER. MUSICIAN. CREATIVE.
- `bio`, `aboutLinkLabel`, `aboutLinkHref`
- `selectedWorkTitle`, `workItems[]` (references to work documents)
- `pianoStudio.*` — logo, title, tagline, description, ctaLabel, ctaHref
- `contactCta.*` — heading, subtext, ctaLabel, ctaHref, backgroundImage

### Work item documents
| Sanity doc ID | Title | Image |
|---|---|---|
| `work-choir-of-man` | Choir of Man Maestro | Portrait (978×1321) — `will-choir-of-man-maestro.jpg` |
| `work-siff` | SIFF | Landscape composite (1446×930) |
| `work-greenroom` | Green Room Music Summer Camp | Landscape composite (1446×930) |

### Contact CTA background
Asset: `image-0104b33911d27a7487e4d4f2b328b23417aadb08-1573x1186-jpg`
(Stage performance photo — Will on stage with lights/smoke)

---

## Component State (as of this session)

### `components/HeroSection.tsx`
- Mobile quote moved INSIDE the centered content block (below subtitle), not at the absolute bottom of the flex column.
- Desktop quote: absolute right, vertically centred — unchanged.

### `components/SiteNav.tsx`
- Nav links only. No WF logo (was accidentally added in git commit `9fd6cf8`, removed and re-committed).

### `components/AboutSection.tsx` ← Most recently worked on
- **Portrait:** Fixed-width strip (`w-36` mobile, `sm:w-48`, `lg:w-56`) beside text on ALL screen sizes. `self-stretch` so it fills the row height. `object-cover object-top`.
- **Text:** Compact padding on mobile (`px-5 py-8`), taglines at `clamp(1.05rem, 3vw, 2rem)`.
- **Work grid:** `grid-cols-1 sm:grid-cols-2`
  - Mobile: single column, all cards full width
  - sm+: two columns, left card `row-span-2`
- **Left card (Choir of Man):** `aspect-[4/3]` on mobile, `sm:aspect-auto sm:row-span-2`
- **Right cards (SIFF, Green Room):** `aspect-[3/2]`, `objectPosition="center center"` (shows full composite)

### `components/PianoStudioSection.tsx`
- Mobile: `flex-col` (logo centered above text), all text centered
- md+: `flex-row md:items-center` (logo beside text, left-aligned)
- Logo: `mx-auto md:mx-0`
- Divider: `hidden md:block`
- Text block: `items-center md:items-start`

### `components/ContactCtaSection.tsx`
- `items-start lg:items-center` — text anchored to top on mobile so Will's face in the stage photo is visible below
- `objectPosition: 'center center'` on the background image

### `app/page.tsx`
- Piano Studio + Contact CTA wrapped in `grid grid-cols-1 lg:grid-cols-2`

---

## What Was Done This Session (Mobile Fixes)

1. Hero: Quote moved up into viewport (was cut off at bottom)
2. About: Portrait changed from full-width banner to side-strip design
3. About: Work grid changed to single column on mobile
4. About: Right card objectPosition fixed (was cropping to logo only)
5. Piano Studio: Stacked layout on mobile (logo above text, centered)
6. Contact CTA: Text moved to top so stage photo face is visible

---

## Pending / Not Yet Done

- [ ] Verify About section looks correct on mobile after latest push (commit `032a3b8`)
- [ ] Check Piano Studio mobile layout after push (commit `359b176`)
- [ ] Check hero mobile quote position after push
- [ ] Contact CTA: confirm Will's face is visible below the text on mobile
- [ ] Any other pages beyond homepage (`/profile`, `/work`, `/educator`, `/connect`) — not yet built

---

## Git History (recent)
```
032a3b8  Redesign About section for mobile using proper UI layout
2a5e9b6  Fix work grid overflow on mobile — add symmetric horizontal padding
359b176  Fix mobile layout across all homepage sections
755cec3  (earlier session work)
```

---

## Workflow

```bash
# Make changes locally
# Commit
git add <files>
git commit -m "message"
# Deploy (auto via push)
git push origin main
# Vercel deploys in ~30 seconds
```

**Rule: Never push without the user explicitly saying "push."**

---

## Scripts (in /scripts folder)
Used during setup to upload images to Sanity. Not needed for ongoing edits — use Sanity Studio at willfow.vercel.app/studio instead.
