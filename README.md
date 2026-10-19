# Shubhr Gunjan — Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshubhrgunjan%2Fportfolio)

> Personal portfolio and research publications of **Shubhr Gunjan** — Systems & Robotics Software Engineer, AI Researcher, and Writer. Architecting humanoid simulations, edge intelligence engines, and thoughtful digital systems.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Highlights

- **SG//OS design system:** a light-first, typesafe.ai-inspired look (cloud-gradient heroes, retro OS window chrome, halftone dithering, oversized grotesk headlines, salmon "desktop" sections) with a matching dark mode.
- **13 code-grounded deep-dives:** every project post was written from the actual repository (real excerpts, measured numbers only), ranked best-first: Parallax, VASIMOV, the Asimov 3D teleop suite, UIKey, EdgeMed, AndroPlay, Nyaya Flow and more.
- **In-site blog editor at `/write`:** password-protected, live MDX preview, component toolbar, image drag-and-drop, local autosave, and one-click publish that commits to GitHub so Vercel redeploys. See [docs/WRITING.md](docs/WRITING.md).
- **Blog features:** search and tag filter, featured ranking, generated halftone covers, sticky table of contents, reading progress, related posts and an RSS feed at `/rss.xml`.

---

## 🚀 One-Click Deploy to Vercel

Deploy this portfolio to Vercel with zero extra configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshubhrgunjan%2Fportfolio)

### Vercel Deployment Settings:
- **Framework Preset:** Next.js
- **Build Command:** `next build` (or `pnpm build`)
- **Output Directory:** `.next`
- **Install Command:** `pnpm install`

---

## 💻 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubhrgunjan/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   pnpm build
   pnpm start
   ```

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, server actions)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom SG//OS tokens (`src/app/globals.css`, `src/components/os/`)
- **Type:** Inter Tight (display), Inter (body), JetBrains Mono (labels)
- **Content:** [Content Collections](https://www.content-collections.dev/) + MDX, Shiki highlighting, `@mdx-js/mdx` for live preview
- **Logos:** [Simple Icons](https://simpleicons.org/) and [Lucide](https://lucide.dev/)

---

## 📄 License

Licensed under the [MIT License](LICENSE).
