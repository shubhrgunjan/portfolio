# Design system

The site is built on the **Magic UI portfolio template** (the one the portfolio started from on `main`): a single
672px column, a floating dock at the bottom, blur-fade motion and a card grid for projects. On top of it:

## Colour (`src/app/globals.css`)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `background` | `#F5F5F4` | `#151515` | page |
| `card` | `#FFFFFF` | `#1A1A1A` | cards, dock, contact panel |
| `foreground` | `#171717` | `#EDEDED` | text |
| `muted-foreground` | `#737373` | `#8C8C8C` | secondary text |
| `border` | `#E2E2E1` | `#2A2A2A` | hairlines |
| `brand` | `#262626` | `#E8E8E8` | primary buttons, pills, focus, selection (ink, not a hue) |
| `brand-soft` | brand at 10–12% | | pill and hover fills |
| `brand-fg` | `#FAFAFA` | `#151515` | text on a brand button |

Greys only. Project illustrations sit on barely-tinted plates (`pink`, `sky`, `violet`… now near-greys),
dimmed in dark mode. The GitHub graph uses the grey ramp `--g0…--g4`.

## Type

- **Bricolage Grotesque** for `h1`/`h2` and card titles (`font-heading`).
- **Plus Jakarta Sans** for everything else.
- **JetBrains Mono** for dates, code and small meta.
- Instrument Serif italic stays available (`font-accent`) for article pull quotes.

## Structure

- **Home is short:** hero (headshot byline, two-tone headline, intro, actions, GitHub graph), experience,
  4 featured projects and 3 latest posts. Contact lives in the footer on every page.
  Every section ends with a link to the page that holds the rest (`/projects`, `/blog`, `/resume`).
- **`/projects`:** every project card, the GitHub contribution graph and the hackathon timeline.
- **Dock:** pages, then socials (hidden under `sm`, where they live in the footer), then the theme switch.
- Lab projects (Parallax, VASIMOV, the Asimov teleop suite) are not public yet: their posts are `draft: true`
  and they are left out of `src/data/resume.tsx`.

## Motion

Blur-fade (6px blur, 6px rise, 400ms) on load for the hero and on scroll for later sections, the dock's
magnification, card lift on hover and the illustrations' ambient loops. Under `prefers-reduced-motion` the CSS
loops tone down (no spin, sway or path travel); fades still run.
