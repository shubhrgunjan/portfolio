# SG//OS — "Calibration" design system

Shubhr builds software that perceives and moves through the physical world. The interface borrows the visual
language of that work: **camera-calibration targets** (checkerboards, ArUco fiducials, colour charts),
**engineering drawings** (dimension lines, registration crosshairs, coordinate labels) and **telemetry**
(live readouts, plotted trajectories). Halftone dithering is the texture that ties it together.

The site is light-first, with a matching dark mode. Everything is vector; nothing ships as a screenshot.

## Tokens (`src/app/globals.css`)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `paper` | `#FAFAF7` | `#0E0D14` | page background |
| `ink` | `#16141F` | `#F3F1FA` | text, strokes, borders |
| `ink-soft` | `#4A4658` | `#B9B4C9` | body copy |
| `lab` | `#D4F26A` | `#16132A` | "lab bench" sections (lime / deep violet) |
| `uv` (ultraviolet) | `#6B4EFF` | `#9C86FF` | primary action, links, focus |
| accents | `pink #FF5FA2` `sky #4FB3FF` `lime #C6F24E` `violet #8B6CFF` `orange #FF8A3D` `mint #2ED3A0` | slightly lifted | one per project/post, via `data-accent` → `var(--a)` |

**Typography:** Bricolage Grotesque (display, 600–800, tight tracking), Geist (body), Geist Mono (labels,
readouts; never smaller than 12px).

## Motifs (`src/components/os/`)

- **Panel** (`Window`): 1px ink frame, header with a deterministic ArUco glyph seeded by its title and a
  coordinate readout; registration crosshairs sit just outside the corners and spread on hover.
- **Calibration strip**: the six accents as a labelled swatch bar. It's the brand mark.
- **Checker / ArUco**: decorative fiducials, generated, never images.
- **Dimension line**: `|←— 1440 —→|` annotations on headlines and figures.
- **Telemetry HUD**: real live values (cursor position, scroll, clock, post count). No fake data and no
  decorative gibberish.

## Motion

| Name | What | Spec |
| --- | --- | --- |
| Settle | blocks enter | 12px rise and fade, 700ms `cubic-bezier(.2,.7,.1,1)`, 60ms stagger |
| Plot | lines draw in | `stroke-dashoffset` 1 → 0 on `pathLength=1`, 1.2–2s |
| Decode | mono labels resolve from scrambled glyphs | 400–700ms |
| Ambient | loops inside project art | 4–12s, paused when off-screen |

Everything respects `prefers-reduced-motion` (all of the above collapse to their end state).

## Project art (`src/components/art/`)

One animated SVG illustration per project, `viewBox="0 0 400 225"` (16:9):
accent background, ink strokes (`1.5`), paper fills, halftone or hatch shading, one mono annotation
(`fig. 01 — …`). Animations use the shared classes in `globals.css` (`art-draw`, `art-float`, `art-dash`,
`art-blink`, `art-orbit`, `art-path`).

## Fixes over the reference (typesafe.ai)

1. **Fragmented nav**: floating, ungrouped boxes over the hero. → One docked bar with a sliding active
   indicator and a scroll-progress hairline.
2. **Hero headline takes 6 lines and pushes the CTA below the fold** (plus a cookie banner over it). → Balanced
   3-line headline, CTA visible at 1440×900, nothing covering content.
3. **Decorative base64 noise.** → Replaced with live, meaningful telemetry.
4. **11px low-contrast mono on pink.** → 12px minimum, contrast-checked pairs only.
5. **One flat colour for every section.** → Per-project accents and alternating paper/lab/ink sections.
6. **Heavy black drop shadows on everything.** → Flat by default; offset accent shadow only on interaction.
7. **No visible focus states or reduced-motion handling.** → UV focus rings, reduced-motion support everywhere.
