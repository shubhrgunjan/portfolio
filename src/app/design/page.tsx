import { Brackets, CalibrationStrip, DimLine, PlotField, RuleBlock } from "@/components/os/decor";
import { CountUp, Decode, Reveal, WordCycle } from "@/components/os/motion";
import { ArucoGlyph, Tag, Window } from "@/components/os/window";
import type { Metadata } from "next";
import { ArtGallery } from "./art-preview";

export const metadata: Metadata = {
  title: "Design System",
  description: "SG//OS Calibration: the design system behind this site.",
};

const TYPE = [
  { name: "Display / XL", cls: "font-display text-7xl", sample: "Calibrate." },
  { name: "Display / L", cls: "font-display text-5xl", sample: "Machines that see." },
  { name: "Display / M", cls: "font-display text-3xl", sample: "Things I've built, best first." },
  { name: "Body / Geist 18", cls: "text-lg text-ink-soft", sample: "Humanoid simulation, 3D digital twins and air-gapped AI memory." },
  { name: "Mono / Geist Mono 12", cls: "mono-xs", sample: "fig. 01 — phone video → walkable twin" },
];

const FIXES = [
  ["Fragmented nav", "Floating, ungrouped boxes over the hero.", "One docked, blurred bar with a spring-animated active pill and a scroll-progress hairline."],
  ["Headline buries the CTA", "A 6-line centred headline (plus a cookie banner) pushes the call to action below the fold.", "A left-aligned 3-line headline with a rotating verb; CTAs visible at 1440×900."],
  ["Decorative noise", "Base64 gibberish as decoration.", "A live telemetry strip with real values: cursor, scroll, IST clock, post count."],
  ["Tiny low-contrast mono", "11px mono on salmon.", "12px minimum; ink on paper/lime only."],
  ["One flat colour", "Every section the same pink.", "Per-project accents and alternating paper / lab / ink sections."],
  ["Heavy drop shadows", "Hard black shadows on every panel.", "Flat by default; an accent-coloured offset only on hover."],
  ["Screenshots as art", "Raster screenshots that go stale.", "Hand-drawn, animated SVG figures per project that pause off-screen."],
  ["Motion without care", "No focus states, no reduced-motion handling.", "UV focus rings; every animation collapses under prefers-reduced-motion."],
];

export default function DesignPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 pb-16 pt-24 sm:pt-32">
        <PlotField cx={1150} cy={360} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
          <p className="mono-xs flex items-center gap-3">
            <ArucoGlyph seed="Shubhr Gunjan" />
            <Decode text="SG//OS v2 · design system" />
          </p>
          <h1 className="font-display mt-6 text-[clamp(3.4rem,10vw,9rem)]">Calibration.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-snug text-ink-soft">
            My work is software that perceives and moves through the physical world, so the interface borrows that
            work&apos;s visual language: camera-calibration targets, engineering drawings and live telemetry, with
            halftone as the texture. Everything is vector; nothing is a screenshot.
          </p>
          <DimLine className="mt-12 max-w-3xl" label="tokens · type · motifs · motion · art" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-28 px-4 py-24 sm:px-8">
        <section>
          <Head index="01" title="Colour" />
          <CalibrationStrip />
          <p className="mt-6 max-w-2xl text-ink-soft">
            Ultraviolet drives actions and focus. Lime is the &quot;lab bench&quot; surface. Each project gets one
            accent, exposed as <code className="mono-xs border border-ink/20 px-1">var(--a)</code> through{" "}
            <code className="mono-xs border border-ink/20 px-1">data-accent</code>, so its art, card shadow and links
            all match.
          </p>
        </section>

        <section>
          <Head index="02" title="Type" />
          <div className="border-t border-ink">
            {TYPE.map((t) => (
              <div key={t.name} className="grid gap-2 border-b border-ink/15 py-5 md:grid-cols-[220px_1fr] md:items-baseline">
                <span className="mono-xs text-muted-foreground">{t.name}</span>
                <span className={t.cls}>{t.sample}</span>
              </div>
            ))}
          </div>
          <p className="mono-xs mt-4 text-muted-foreground">Bricolage Grotesque · Geist · Geist Mono</p>
        </section>

        <section>
          <Head index="03" title="Motifs" />
          <div className="grid gap-10 md:grid-cols-2">
            <Window title="panel.app" meta="R:02 C:07" bodyClassName="p-4">
              <p className="text-sm text-ink-soft">
                Panels have a hairline frame and an ArUco glyph seeded by their title, so every panel gets its own
                unique, stable icon. Hover to spread the registration marks.
              </p>
            </Window>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Tag>Robotics</Tag>
                <span data-accent="sky"><Tag>3D Vision</Tag></span>
                <span data-accent="orange"><Tag>Edge AI</Tag></span>
              </div>
              <div className="flex gap-3">
                {["parallax", "vasimov", "uikey", "edgemed", "nyaya", "echo"].map((s) => (
                  <ArucoGlyph key={s} seed={s} className="size-10" />
                ))}
              </div>
              <DimLine label="dimension line · 1440 px" />
              <Brackets className="py-6 sm:py-8">
                <span className="font-display text-3xl">Registration brackets</span>
              </Brackets>
            </div>
          </div>
        </section>

        <section>
          <Head index="04" title="Motion" />
          <div className="grid gap-8 md:grid-cols-3">
            <RuleBlock label="Decode" index="hover">
              <Decode text="mono labels resolve from glyphs" className="mono-xs text-base" />
            </RuleBlock>
            <RuleBlock label="Cycle" index="2.2s">
              <span className="font-display text-4xl">
                machines that <WordCycle words={["see.", "move.", "walk."]} className="text-uv" />
              </span>
            </RuleBlock>
            <RuleBlock label="Count" index="1.4s">
              <span className="font-display text-6xl">
                <CountUp to={96} pad={2} />
              </span>
            </RuleBlock>
          </div>
          <p className="mt-8 max-w-2xl text-ink-soft">
            Settle (12px rise, 700ms), Plot (lines draw themselves), Decode and ambient art loops. Art only animates
            while it&apos;s on screen, speeds up on hover, and everything collapses to its end state under{" "}
            <code className="mono-xs border border-ink/20 px-1">prefers-reduced-motion</code>.
          </p>
        </section>

        <section>
          <Head index="05" title="Project art" />
          <p className="max-w-2xl text-ink-soft">
            One animated SVG figure per project, 400×225: accent ground, ink line work, paper fills, halftone shading,
            and a calibration motif in every frame.
          </p>
          <ArtGallery />
        </section>

        <section>
          <Head index="06" title="What I fixed from the reference" />
          <p className="mb-8 max-w-2xl text-ink-soft">
            The starting inspiration was typesafe.ai&apos;s retro-OS look. These are the things I deliberately did
            differently.
          </p>
          <div className="border-t border-ink">
            {FIXES.map(([title, before, after], i) => (
              <Reveal key={title} delay={i * 50} className="grid gap-3 border-b border-ink/15 py-5 md:grid-cols-[60px_220px_1fr_1fr]">
                <span className="mono-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold">{title}</span>
                <span className="text-sm text-muted-foreground line-through decoration-pink/70">{before}</span>
                <span className="text-sm">{after}</span>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function Head({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="mono-xs flex items-center gap-3 border-t border-ink pt-2">
        <span className="bg-ink px-1.5 text-paper">{index}</span>
        <Decode text={title.toLowerCase()} />
      </div>
      <h2 className="font-display mt-4 text-5xl">{title}</h2>
    </div>
  );
}
