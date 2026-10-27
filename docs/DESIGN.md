# Mono — design system

Black, white and greys only. Hierarchy comes from size, weight and spacing; colour never carries meaning.
The site should feel like a well-set page: one calm reading column, generous whitespace, quiet chrome.

References (principles, not pixels): lookap entries *Minimal Portfolio Refresh* (floating dark pill nav,
greyscale portrait, muted project grid) and *Minimal Portfolio With AI Imagery* (single 600px column,
near-white page, tidy type scale).

Dark is the default theme for new visitors; the toggle in the nav remembers a visitor's choice.

## Tokens (`src/app/globals.css`)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `paper` | `#FDFDFD` | `#0C0C0C` | page background |
| `ink` | `#141414` | `#EDEDED` | headings, primary text, solid buttons |
| `ink-soft` | `#5C5C5C` | `#A3A3A3` | body copy |
| `muted-foreground` | `#8A8A8A` | `#737373` | meta, labels, secondary lines |
| `chrome` | `#F4F4F4` | `#161616` | cards, plates, inputs, code |
| `chrome-2` | `#EBEBEB` | `#1F1F1F` | hover / pressed surfaces |
| `border` | `#E6E6E6` | `#242424` | hairline dividers |

The old accent names (`pink`, `sky`, `lime`…) are kept as a light grey ramp so the project illustrations and
any older component render in greyscale without being forked. Radius is `14px` for plates, `8px` for inner
frames, full for pills.

**Type:** Geist for everything (600 for headings, `-0.035em` tracking), Geist Mono only for code and step
numbers, Instrument Serif *italic* for one accent phrase per view at most.

| Role | Size |
| --- | --- |
| Page title | 40px / 1.1 |
| Lede | 21–22px, muted, with an optional serif-italic phrase in ink |
| Section title | 17px semibold |
| Body | 16px / 1.7 |
| Rows, meta | 15px title, 13–14px muted |

## Layout

- Text sections sit in a 640px column; the work grid widens to 1024px.
- **Nav:** a floating `#161616` pill, fixed top-centre in both themes, with a spring-sliding highlight and a
  lighter inset Contact button. A paper-to-transparent fade sits under it so content never collides with it.
- **Work:** label row (name in ink, tagline in grey, date right) above a `chrome` plate; the illustration is
  framed inside it with a soft shadow, like a print on a mount. Remaining projects are list rows.
- **Toolkit:** monochrome brand glyphs (`simple-icons`, drawn in `currentColor`) on 40px `chrome` tiles,
  grouped by area; the name shows in a tooltip on hover or focus. Wordmark-only logos are left out.
- **Contribution graph:** last year of public GitHub activity on the same `--g0…--g4` grey ramp.
- **Rows:** title + one-line muted summary, meta on the right, an ↗ that appears on hover, grey hover fill.

## Motion

From lookap's presets: enter is fade-up 12px (520ms, `cubic-bezier(.2,.8,.2,1)`, staggered 50–80ms), hover
changes colour or surface only (150ms), press scales to 0.98 (120ms). Project illustrations keep their
ambient loops and pause off-screen. Everything collapses to its end state under `prefers-reduced-motion`.

## Not yet migrated

`/design` (the SG//OS style guide) and `/write` still use the old components; they render in greyscale through
the tokens but keep square frames. The OG images still use the old palette.
