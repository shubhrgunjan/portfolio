# Writing posts

Posts live in `content/<slug>.mdx`. Write them in the in-site editor at `/write`, or by hand.

## Frontmatter

```yaml
---
title: "Parallax: Turning a Phone Video into a Walkable Digital Twin"
publishedAt: "2026-10-15"          # YYYY-MM-DD
updatedAt: "2026-10-17"            # optional
author: "Shubhr Gunjan"
summary: "One or two sentences. Shown on cards and in link previews."
kicker: "3D Vision / Gaussian Splatting"   # short mono label shown above the title
tags: ["3dgs", "computer-vision", "three.js"]  # lowercase, kebab-case
accent: "pink"                     # pink | sky | violet | lime | orange | mint
featured: 1                        # optional. Lower = higher on the blog index. Omit for normal posts.
repo: "https://github.com/shubhrgunjan/parallax"   # optional
demo: "https://..."                # optional
image: "/blog/parallax/cover.webp" # optional cover image (otherwise a generated halftone cover is used)
---
```

## Components

These components are available in every post without imports. Plain Markdown (headings, lists, tables,
blockquotes, fenced code) is styled automatically.

### Fenced code
A fenced block is shown as an OS-style window. `title="..."` sets the window title.

````mdx
```python title="vasimov/core/telemetry.py"
def step(): ...
```
````

### `<Callout>`
```mdx
<Callout type="note" title="Why not video streaming?">
  Body text, **markdown** works.
</Callout>
```
`type`: `note` (default) | `tip` | `warn` | `insight`.

### `<Window>`
A retro window panel with a black title bar, for asides, specs, or "screens".
```mdx
<Window title="Clock Tool 1.1" tone="paper">
  Any markdown.
</Window>
```
`tone`: `paper` (default) | `pink` | `ink` | `sky`.

### `<StatGrid>` + `<Stat>`
Big numbers. Use only real, measured or code-derived numbers.
```mdx
<StatGrid>
  <Stat value="78 → 23" label="obs → action dims" />
  <Stat value="50 Hz" label="policy rate" />
  <Stat value="~20–60 ms" label="Redis command dispatch" />
</StatGrid>
```

### `<Pipeline>` + `<Step>`
A horizontal (wraps on mobile) numbered flow, for architecture or data pipelines.
```mdx
<Pipeline>
  <Step title="FFmpeg" sub="frame extraction">Sharpest frame per window.</Step>
  <Step title="COLMAP" sub="camera poses" />
  <Step title="Splatfacto" sub="3D Gaussian Splatting" />
</Pipeline>
```

### `<Columns>` + `<Column>`
Side-by-side comparison (stacks on mobile).
```mdx
<Columns>
  <Column title="Before" tone="ink">...</Column>
  <Column title="After" tone="pink">...</Column>
</Columns>
```

### `<Figure>`
```mdx
<Figure src="/blog/parallax/walkthrough.webp" alt="..." caption="The web walkthrough." />
```
Put images in `public/blog/<slug>/`.

### `<RepoCard>`
```mdx
<RepoCard repo="shubhrgunjan/vasimov" description="Optional override" />
```

### Inline
- `<Kbd>W</Kbd>` — keyboard key.
- `<Mark>text</Mark>` — highlighter.
