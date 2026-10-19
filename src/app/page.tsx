/* eslint-disable @next/next/no-img-element */
import { ProjectArt } from "@/components/art";
import { CalibrationStrip, DimLine, HalftoneBlobs, PlotField, RiseText, RuleBlock } from "@/components/os/decor";
import { CountUp, Decode, Reveal, Telemetry, WordCycle } from "@/components/os/motion";
import { PostCard } from "@/components/os/post-card";
import { Showcase } from "@/components/os/showcase";
import { TechLogo, techIcon } from "@/components/os/tech-logo";
import { CornerMarks, Tag, Window } from "@/components/os/window";
import { DATA } from "@/data/resume";
import { getPost, getPosts, getRankedPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const projects = [...DATA.projects].sort((a, b) => a.rank - b.rank);

const STACK = [
  "Python", "PyTorch", "NumPy", "ONNX", "TypeScript", "React", "Next.js", "Three.js", "WebGL",
  "Expo", "Node.js", "Rust", "Kotlin", "Android", "C++", "Java", "FastAPI", "Qdrant", "Redis",
  "DuckDB", "PostgreSQL", "Firebase", "Electron", "Docker", "FFmpeg", "OpenCV", "Google Gemini",
  "Cloudflare R2", "Linux Mint", "Git",
];

function SectionHead({
  index,
  label,
  title,
  dark = false,
  aside,
}: {
  index: string;
  label: string;
  title: string;
  dark?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className={cn("mono-xs flex items-center justify-between border-t pt-2", dark ? "border-paper/40" : "border-ink")}>
        <span className="flex items-center gap-3">
          <span className={cn("px-1.5", dark ? "bg-lime text-[#16141f]" : "bg-ink text-paper")}>{index}</span>
          <Decode text={label} />
        </span>
        {aside}
      </div>
      <h2 className="font-display mt-6 max-w-4xl text-balance text-[clamp(2.6rem,6.5vw,5.4rem)]">{title}</h2>
    </Reveal>
  );
}

export default function Page() {
  const posts = getPosts();
  const ranked = getRankedPosts();
  const latest = posts[0];
  const minutes = posts.reduce((n, p) => n + p.readingTime, 0);
  const showcase = ranked.slice(0, 4).map(({ slug, accent, title, kicker, readingTime }) => ({
    slug,
    accent,
    title,
    kicker,
    readingTime,
  }));
  const [lead, ...rest] = projects;
  const leadPost = getPost(lead.post);

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden border-b border-ink/10">
        <PlotField />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-24 sm:px-8 sm:pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14 lg:pb-14">
          <div>
            <Reveal className="flex flex-wrap items-center gap-2">
              <Tag>Systems &amp; Robotics Engineer</Tag>
              {latest && (
                <Link
                  href={`/blog/${latest.slug}`}
                  className="mono-xs group inline-flex items-center gap-1.5 border border-ink/20 bg-paper/70 px-1.5 py-[1px] backdrop-blur hover:border-ink"
                >
                  <span className="bg-lime px-1 text-[#16141f]">new</span>
                  <span className="max-w-[16rem] truncate">{latest.title.split(/[:—]/)[0]}</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </Reveal>

            <h1 className="font-display mt-7 text-[clamp(3rem,7.2vw,6.6rem)]">
              <RiseText text="I build software for machines that" start={80} />
              <span className="rise-word">
                <span style={{ ["--delay" as string]: "520ms" }}>
                  <WordCycle words={["see.", "move.", "walk.", "remember."]} className="relative text-uv" />
                </span>
              </span>
            </h1>

            <Reveal delay={350}>
              <p className="mt-7 max-w-xl text-lg leading-snug text-ink-soft sm:text-xl">
                Humanoid simulation, 3D digital twins from phone video, air-gapped AI memory and zero-lag displays. I
                write every project up from the code.
              </p>
            </Reveal>

            <Reveal delay={450} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 bg-ink px-5 font-semibold text-paper transition-colors hover:bg-uv hover:text-white"
              >
                See the work <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex h-12 items-center gap-2 border border-ink bg-paper/60 px-5 font-semibold backdrop-blur transition-colors hover:bg-lime hover:text-[#16141f]"
              >
                Field notes · {posts.length}
              </Link>
              <Link href="/resume" className="mono-xs link-under ml-1 text-ink-soft hover:text-ink">
                resume.pdf
              </Link>
            </Reveal>

            <Reveal delay={550}>
              <DimLine className="mt-12 max-w-xl" label="Shubhr Gunjan · B.Tech ECE ’28 · Delhi NCR · 28.61°N 77.21°E" />
            </Reveal>
          </div>

          <Reveal delay={250}>
            <Showcase items={showcase} />
          </Reveal>
        </div>

        <div className="relative border-t border-ink/10 bg-paper/70 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-8 md:flex-row md:items-center md:justify-between">
            <Telemetry items={[{ k: "posts", v: String(posts.length) }, { k: "projects", v: String(projects.length) }]} />
            <CalibrationStrip compact className="w-full md:w-64" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- LAB BENCH */}
      <section className="relative overflow-hidden bg-lab text-desk-ink">
        <HalftoneBlobs blobs={[{ x: "78%", y: "-25%", size: "520px", opacity: 0.35 }, { x: "-12%", y: "55%", size: "420px", opacity: 0.25 }]} />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="mono-xs mb-6">
              <Decode text="// thesis" />
            </p>
            <h2 className="font-display max-w-5xl text-balance text-[clamp(2.8rem,8vw,7.5rem)]">
              Most AI lives in a text box. I took the physical route.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            <Reveal delay={0}>
              <RuleBlock label="Obey physics" index="01">
                <span className="text-lg">
                  A humanoid that must not fall, a room that must be walkable, a display that must not stutter. The
                  hard part is always where software meets the world.
                </span>
              </RuleBlock>
            </Reveal>
            <Reveal delay={100}>
              <RuleBlock label="Edge, not cloud" index="02">
                <span className="text-lg">
                  Clinics, labs and classrooms often can&apos;t send data out. Encrypted vector memory, local models
                  and LAN-first sync are defaults, not features.
                </span>
              </RuleBlock>
            </Reveal>
            <Reveal delay={200}>
              <RuleBlock label="Write it down" index="03">
                <span className="text-lg">
                  Every project gets an honest write-up: real code, measured numbers, and what&apos;s still
                  scaffolding. Plus essays on The Artful Eye.
                </span>
              </RuleBlock>
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-1 border-l border-t border-current sm:grid-cols-3">
            {[
              { n: projects.length, label: "projects shipped, ranked best-first" },
              { n: posts.length, label: "deep-dives written from the code" },
              { n: minutes, label: "minutes of field notes to read" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 120} className="border-b border-r border-current p-5 sm:p-7">
                <div className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-none">
                  <CountUp to={s.n} pad={2} />
                </div>
                <div className="mono-xs mt-4">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- PROJECTS */}
      <section id="projects" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 sm:px-8 sm:py-32">
        <SectionHead
          index="01"
          label="selected work"
          title="Things I've built, best first."
          aside={<span className="hidden sm:inline">{projects.length} entries · hover to speed up</span>}
        />

        {/* lead project */}
        <Reveal>
          <article
            data-accent={lead.accent}
            className="group/panel group relative grid border border-ink bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--a)] lg:grid-cols-[1.35fr_1fr]"
          >
            <CornerMarks />
            <Link href={`/blog/${lead.post}`} className="block aspect-[16/9] border-b border-ink lg:aspect-auto lg:border-b-0 lg:border-r">
              <ProjectArt slug={lead.post} accent={lead.accent} />
            </Link>
            <div className="flex flex-col p-5 sm:p-8">
              <div className="mono-xs flex justify-between text-muted-foreground">
                <span>01 — {lead.dates}</span>
                <span className="text-ink">★ featured</span>
              </div>
              <h3 className="font-display mt-6 text-[clamp(2rem,3.6vw,3.2rem)]">{lead.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{lead.description}</p>
              <TechList items={lead.technologies} className="mt-6" />
              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {leadPost && (
                  <Link href={`/blog/${leadPost.slug}`} className="inline-flex h-10 items-center gap-2 bg-ink px-4 text-sm font-semibold text-paper hover:bg-[var(--a)] hover:text-[#16141f]">
                    Read the deep-dive · {leadPost.readingTime} min <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => {
            const post = getPost(p.post);
            return (
              <Reveal key={p.title} delay={(i % 3) * 90} className="flex">
                <article
                  data-accent={p.accent}
                  className="group/panel group relative flex w-full flex-col border border-ink bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--a)]"
                >
                  <CornerMarks />
                  <Link href={post ? `/blog/${post.slug}` : p.href} className="block aspect-[16/9] border-b border-ink">
                    <ProjectArt slug={p.post} accent={p.accent} />
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mono-xs flex justify-between text-muted-foreground">
                      <span>
                        {String(i + 2).padStart(2, "0")} — {p.dates}
                      </span>
                      {post && <span>{post.readingTime} min read</span>}
                    </div>
                    <h3 className="font-display mt-3 text-[1.7rem] leading-[1.02]">{p.title}</h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-snug text-ink-soft">{p.description}</p>
                    <TechList items={p.technologies} className="mt-4" />
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {post && (
                        <Link href={`/blog/${post.slug}`} className="mono-xs inline-flex items-center gap-1 bg-ink px-2 py-1.5 text-paper hover:bg-[var(--a)] hover:text-[#16141f]">
                          deep-dive <ArrowRight className="size-3" />
                        </Link>
                      )}
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono-xs inline-flex items-center gap-1 border border-ink px-2 py-1.5 hover:bg-[var(--a)] hover:text-[#16141f]"
                        >
                          {l.type.toLowerCase()} <ArrowUpRight className="size-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------- EXPERIENCE */}
      <section id="experience" className="scroll-mt-16 bg-ink py-24 text-paper sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHead index="02" label="experience" title="Where I've been building." dark />
          <ol className="relative ml-2 border-l border-paper/30 sm:ml-[200px]">
            {DATA.work.map((w, i) => (
              <Reveal as="li" key={w.company} delay={i * 80} className="group relative pb-14 pl-8 last:pb-0">
                <span aria-hidden className="absolute -left-[7px] top-1 size-3.5 border border-paper bg-ink transition-colors group-hover:bg-lime" />
                <div className="mono-xs text-lime sm:absolute sm:-left-[200px] sm:top-1 sm:w-[170px] sm:text-right">
                  {w.start} — {w.end}
                </div>
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="mt-2 block sm:mt-0">
                  <div className="font-display text-3xl leading-tight group-hover:underline sm:text-4xl">{w.title}</div>
                  <div className="mt-2 flex items-center gap-1 text-sm text-paper/70">
                    {w.company} <ArrowUpRight className="size-3.5" />
                  </div>
                </a>
                <div className="mt-4 max-w-3xl text-[15px] leading-relaxed text-paper/75">
                  <Markdown components={{ p: ({ children }) => <p>{children}</p> }}>{w.description}</Markdown>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.badges.map((b) => (
                    <span key={b} className="mono-xs border border-paper/40 px-1.5 py-[1px]">
                      {b}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------- STACK */}
      <section className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHead index="03" label="toolchain" title="The stack behind it." />
        </div>
        {[STACK, [...STACK].reverse()].map((row, r) => (
          <div key={r} className="group flex overflow-hidden border-b border-ink first:border-t" style={{ ["--duration" as string]: r ? "60s" : "48s" }}>
            {[0, 1].map((dup) => (
              <ul
                key={dup}
                aria-hidden={dup === 1}
                className={`flex shrink-0 animate-marquee group-hover:[animation-play-state:paused] ${r ? "[animation-direction:reverse]" : ""}`}
              >
                {row.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 border-r border-ink px-7 py-5 font-display text-2xl transition-colors hover:bg-lime hover:text-[#16141f]"
                  >
                    <TechLogo name={t} className="size-6" />
                    {t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
        <div className="mx-auto mt-14 grid max-w-7xl gap-10 px-4 sm:grid-cols-3 sm:px-8">
          <RuleBlock label="Robotics & sim" index="A">MuJoCo, mjlab PPO, wire protocols, telemetry, Three.js twins.</RuleBlock>
          <RuleBlock label="AI & data" index="B">Qdrant, DuckDB, local models, Gemini, Gaussian Splatting, VGGT.</RuleBlock>
          <RuleBlock label="Product" index="C">React Native/Expo, Next.js, Electron, Android/Kotlin, Redis Streams, BLE.</RuleBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------- WRITING */}
      <section className="border-y border-ink bg-chrome py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHead
            index="04"
            label="field notes"
            title="Written from the code up."
            aside={
              <Link href="/blog" className="link-under">
                all {posts.length} posts →
              </Link>
            }
          />
          <div className="grid gap-8 md:grid-cols-3">
            {ranked.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 100} className="flex">
                <PostCard post={p} index={i + 1} className="w-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- RECOGNITION */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <SectionHead index="05" label="recognition" title="Hackathons, certificates, school." />
        <div className="grid gap-8 lg:grid-cols-3">
          {DATA.hackathons.map((h, i) => (
            <Reveal key={h.title} delay={i * 100} className="flex">
              <Window title={h.dates} className="w-full" bodyClassName="flex h-full flex-col">
                {h.image && (
                  <div className="aspect-[16/10] overflow-hidden border-b border-ink bg-chrome">
                    <img src={h.image} alt={h.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mono-xs text-muted-foreground">{h.location}</div>
                  <h3 className="font-display mt-2 text-2xl leading-tight">{h.title}</h3>
                  <p className="mt-3 text-sm leading-snug text-ink-soft">{h.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {h.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono-xs inline-flex items-center gap-1 border border-ink px-2 py-1.5 hover:bg-lime hover:text-[#16141f]"
                      >
                        {l.title} <ArrowUpRight className="size-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </Window>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid border-t border-ink md:grid-cols-3">
          {DATA.education.map((e) => (
            <a
              key={e.school}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-b border-ink py-5 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0"
            >
              <div className="mono-xs text-muted-foreground">
                {e.start} — {e.end}
              </div>
              <div className="font-display mt-2 text-2xl leading-tight group-hover:underline">{e.school}</div>
              <p className="mt-2 text-sm text-ink-soft">{e.degree}</p>
            </a>
          ))}
        </div>

        <div className="prose prose-os mt-20 max-w-3xl dark:prose-invert">
          <h2 id="about">About</h2>
          <Markdown>{DATA.summary}</Markdown>
        </div>
      </section>
    </>
  );
}

function TechList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((t) => (
        <li key={t} className="mono-xs inline-flex items-center gap-1 border border-ink/25 px-1.5 py-[2px]">
          {techIcon(t) && <TechLogo name={t} className="size-3" />}
          {t}
        </li>
      ))}
    </ul>
  );
}
