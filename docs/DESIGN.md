# Design system

The site is built on the **Magic UI portfolio template** (the one the portfolio started from on `main`): a single
672px column, a floating dock at the bottom, blur-fade motion and a card grid for projects. On top of it:

## Colour (`src/app/globals.css`)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `background` | `#FBFBFD` | `#0A0B10` | page |
| `card` | `#FFFFFF` | `#10121A` | cards, dock, contact panel |
| `foreground` | `#12131A` | `#ECEEF4` | text |
| `muted-foreground` | `#6B6F80` | `#8A8FA3` | secondary text |
| `border` | `#E3E5EC` | `#20232D` | hairlines |
| `brand` | `#6D4FE0` | `#A593FF` | links, primary buttons, pills, focus, selection, graph |
| `brand-soft` | brand at 10–12% | | pill and hover fills |
| `brand-fg` | `#FFFFFF` | `#0A0B10` | text on a brand button |

Project illustrations sit on pastel plates (`pink`, `sky`, `violet`, `lime`, `orange`, `mint`, `magenta`), slightly
dimmed in dark mode. The GitHub graph ramps `--g0…--g4` through the brand hue.

## Type

- **Bricolage Grotesque** for `h1`/`h2` and card titles (`font-heading`).
- **Plus Jakarta Sans** for everything else.
- **JetBrains Mono** for dates, code and small meta.
- Instrument Serif italic stays available (`font-accent`) for article pull quotes.

## Structure

- **Home is short:** hero with headshot, about, experience, 4 featured projects, 3 latest posts, contact.
  Every section ends with a link to the page that holds the rest (`/projects`, `/blog`, `/resume`).
- **`/projects`:** every project card, the GitHub contribution graph and the hackathon timeline.
- **Dock:** pages, then socials (hidden under `sm`, where they live in the footer), then the theme switch.
- Lab projects (Parallax, VASIMOV, the Asimov teleop suite) are not public yet: their posts are `draft: true`
  and they are left out of `src/data/resume.tsx`.

## Motion

Blur-fade (6px blur, 6px rise, 400ms) on load for the hero and on scroll for later sections, the dock's
magnification, card lift on hover and the illustrations' ambient loops. Under `prefers-reduced-motion` the CSS
loops tone down (no spin, sway or path travel); fades still run.
