/* eslint-disable @next/next/no-img-element */
import { Base64Rail, Brackets, CloudSky, HalftoneBlobs, Leader, RuleBlock } from "@/components/os/decor";
import { PostCard } from "@/components/os/post-card";
import { PostCover } from "@/components/os/post-cover";
import { TechLogo, techIcon } from "@/components/os/tech-logo";
import { ClockWidget, GliderWidget } from "@/components/os/widgets";
import { Tag, Window } from "@/components/os/window";
import { DATA } from "@/data/resume";
import { getPost, getPosts, getRankedPosts } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const projects = [...DATA.projects].sort((a, b) => a.rank - b.rank);

const STACK = [
  "Python", "PyTorch", "NumPy", "ONNX", "TypeScript", "React", "Next.js", "Three.js", "WebGL",
  "Expo", "Node.js", "Rust", "Kotlin", "Android", "C++", "Java", "FastAPI", "Qdrant", "Redis",
  "DuckDB", "PostgreSQL", "Firebase", "Electron", "Docker", "FFmpeg", "OpenCV", "Google Gemini",
  "Cloudflare R2", "Linux Mint", "Git",
];

function SectionHead({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-t border-ink pt-3 sm:mb-14">
      <div className="flex items-center justify-between">
        <Tag>{label}</Tag>
        <span className="mono-xs">{index}</span>
      </div>
      <h2 className="font-display max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)]">{title}</h2>
    </div>
  );
}

export default function Page() {
  const posts = getPosts();
  const ranked = getRankedPosts();
  const latest = posts[0];
  const longest = Math.max(...ranked.map((p) => p.readingTime));

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative min-h-[100svh] overflow-hidden pb-20 pt-24 sm:pt-28">
        <CloudSky />
        <Base64Rail text={`${DATA.name} // ${DATA.description}`} className="absolute left-6 top-[38%] hidden max-h-[55%] overflow-hidden lg:block" />
        <Base64Rail text="robots · digital twins · edge intelligence" className="absolute right-6 top-[38%] hidden max-h-[55%] overflow-hidden lg:block" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-8">
          {latest && (
            <Link href={`/blog/${latest.slug}`} className="group w-full max-w-sm">
              <Window
                title={`${new Date(latest.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })} • SG Thoughts`}
                tone="chrome"
                bodyClassName="px-3 py-2.5 text-center"
              >
                <p className="font-mono text-[13px] leading-snug">New post: {latest.title}</p>
                <span className="mt-2 inline-block font-mono text-[13px] underline underline-offset-2 group-hover:bg-pink">
                  Read it
                </span>
              </Window>
            </Link>
          )}

          <Leader left="Introducing Shubhr" right="Systems & Robotics Engineer" className="mt-16 sm:mt-20" />

          <h1 className="font-display mt-8 max-w-5xl text-center text-[clamp(3.2rem,10.5vw,9.5rem)]">
            I Build Software That Touches The Physical World
          </h1>

          <p className="mt-8 max-w-2xl text-center text-lg font-medium leading-snug tracking-tight sm:text-xl">
            Humanoid simulation, 3D digital twins, air-gapped AI and zero-lag displays. B.Tech ECE &apos;28,
            shipping from {DATA.location.split("/")[0].trim()}.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            <Link href="#projects" className="font-display link-under text-[clamp(1.8rem,4vw,3rem)]">
              See The Work
            </Link>
            <Link href="/blog" className="font-display link-under text-[clamp(1.8rem,4vw,3rem)]">
              Read The Blog
            </Link>
          </div>
        </div>
        <span className="mono-xs absolute bottom-3 left-3">∵ ✕</span>
        <span className="mono-xs absolute bottom-3 right-3">✕ ∵</span>
      </section>

      {/* ---------------------------------------------------------- DESKTOP */}
      <section className="relative bg-desk text-desk-ink">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-8">
          <div className="relative overflow-hidden border border-current">
            <div className="flex items-center justify-between bg-ink px-1.5 py-[2px] text-paper">
              <span className="mono-xs">SG.OS</span>
              <span className="mono-xs opacity-70">~/projects</span>
            </div>
            <div className="relative min-h-[640px] p-3 sm:p-6">
              <div className="dots absolute inset-0 opacity-25" aria-hidden />
              <HalftoneBlobs
                blobs={[
                  { x: "-10%", y: "45%", size: "420px" },
                  { x: "72%", y: "8%", size: "380px" },
                  { x: "35%", y: "70%", size: "460px" },
                ]}
              />

              <div className="relative grid gap-5 lg:grid-cols-[230px_1fr_200px]">
                {/* left column */}
                <div className="flex flex-col gap-5">
                  <Window title="Whoami" tone="chrome" bodyClassName="p-2">
                    <div className="relative aspect-square overflow-hidden border border-ink bg-paper">
                      <img
                        src={DATA.avatarUrl}
                        alt={DATA.name}
                        className="h-full w-full object-cover grayscale contrast-150"
                      />
                      <div aria-hidden className="dots absolute inset-0 text-[#1e1e1e] opacity-40 mix-blend-multiply" />
                    </div>
                    <div className="mono-xs mt-2 text-[#1e1e1e]">
                      {DATA.name}
                      <br />
                      &lt;robotics · edge ai · writing&gt;
                    </div>
                  </Window>
                  <Window title="Now.txt" tone="paper" bodyClassName="px-2 py-2">
                    <ul className="mono-xs space-y-1">
                      <li>▸ digital twins from phone video</li>
                      <li>▸ humanoid sim + teleop for Asimov 1</li>
                      <li>▸ on-device inference @ OpenHorizon</li>
                      <li>▸ writing The Artful Eye on Quora</li>
                    </ul>
                  </Window>
                </div>

                {/* center: project index */}
                <Window title="Project.index" tone="paper" bodyClassName="p-0" className="self-start">
                  <div className="flex items-center gap-3 border-b border-ink p-3">
                    <span className="bg-ink px-2 py-1 font-mono text-2xl text-paper">SG</span>
                    <div className="font-mono text-[12px] leading-tight">
                      ranked by how proud I am
                      <br />
                      bar = depth of the write-up
                    </div>
                  </div>
                  <ol>
                    {ranked.slice(0, 7).map((p, i) => (
                      <li key={p.slug} data-accent={p.accent}>
                        <Link
                          href={`/blog/${p.slug}`}
                          className="group block border-b border-ink/60 px-3 pb-2 pt-2.5 last:border-0 hover:bg-[var(--a)] hover:text-[#1e1e1e]"
                        >
                          <div className="flex items-center gap-3">
                            <span className="mono-xs w-5 opacity-60">{String(i + 1).padStart(2, "0")}</span>
                            <span className="mono-xs max-w-[52%] truncate bg-ink px-1 text-paper">
                              {p.title.split(/[:—]/)[0].trim()}
                            </span>
                            <span className="mono-xs hidden truncate opacity-70 sm:inline">{p.kicker}</span>
                            <span className="mono-xs ml-auto shrink-0">{p.readingTime} min</span>
                          </div>
                          <div className="relative ml-8 mt-2 h-px bg-current opacity-60">
                            <span
                              className="absolute -top-[3px] size-[7px] bg-current"
                              style={{ left: `${(p.readingTime / longest) * 96}%` }}
                            />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ol>
                  <div className="dots h-10 border-t border-ink text-ink opacity-30" />
                </Window>

                {/* right column */}
                <div className="flex flex-row flex-wrap items-start gap-5 lg:flex-col">
                  <ClockWidget className="w-full max-w-[220px]" />
                  <GliderWidget />
                  <Window title="Status" tone="ink" bodyClassName="px-2 py-1.5">
                    <div className="mono-xs flex items-center gap-2">
                      <span className="size-2 animate-pulse bg-signal" /> open to internships
                    </div>
                  </Window>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* statement */}
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
          <Brackets>
            <h2 className="font-display text-center text-[clamp(2.8rem,9vw,8rem)]">I Took The Physical Route</h2>
          </Brackets>

          <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1fr_200px]">
            <RuleBlock label="Not Just Chat">
              <span className="text-lg sm:text-xl">
                Most AI lives in a text box. I&apos;m more interested in software that has to obey physics: a
                humanoid that must not fall, a room that must be walkable, a display that must not stutter.
              </span>
            </RuleBlock>
            <RuleBlock label="Edge, Not Cloud">
              <span className="text-lg sm:text-xl">
                Clinics, labs and classrooms often can&apos;t send data out. So I build things that run
                air-gapped and offline: encrypted vector memory, local models and LAN-first sync.
              </span>
            </RuleBlock>
            <div className="hidden md:block">
              <div className="mono-xs mb-2">[B.64]</div>
              <div className="mono-xs break-all opacity-80">
                {Buffer.from(DATA.summary.slice(0, 260)).toString("base64")}
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <RuleBlock label="Simulate">MuJoCo digital twins and RL policies.</RuleBlock>
            <RuleBlock label="Perceive">3D Gaussian Splatting and pose estimation.</RuleBlock>
            <RuleBlock label="Ship">Mobile, desktop, web and Android signage.</RuleBlock>
            <RuleBlock label="Write">Essays on aesthetics and engineering.</RuleBlock>
          </div>
        </div>

        {/* big stat */}
        <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-8">
          <Brackets className="px-0 sm:px-0">
            <p className="font-display text-[clamp(3rem,10vw,8.5rem)]">
              {projects.length} Projects,
              <br />
              {posts.length} Deep-Dives.
            </p>
            <p className="mono-xs mt-6">
              *Counted from this site&apos;s own data, every one with source you can read (
              <Link href="/blog" className="underline">
                Proof
              </Link>
              )
            </p>
          </Brackets>
        </div>
      </section>

      {/* ---------------------------------------------------------- PROJECTS */}
      <section id="projects" className="mx-auto max-w-7xl scroll-mt-12 px-4 py-24 sm:px-8">
        <SectionHead index="01 / 05" label="Selected Work" title="Things I've Built, Best First." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const post = getPost(p.post);
            const featured = i < 2;
            return (
              <article
                key={p.title}
                data-accent={p.accent}
                className={`group flex flex-col border border-ink bg-paper shadow-[4px_4px_0_0_var(--ink)] transition-all hover:-translate-y-1 hover:shadow-[6px_8px_0_0_var(--a)] ${featured ? "lg:col-span-1 md:col-span-2 lg:row-span-1" : ""}`}
              >
                <div className="flex items-center justify-between bg-ink px-1.5 py-[3px] text-paper">
                  <span className="mono-xs truncate">
                    {String(i + 1).padStart(2, "0")} — {p.dates}
                  </span>
                  {p.active && (
                    <span className="mono-xs flex items-center gap-1">
                      <span className="size-1.5 bg-signal" /> live
                    </span>
                  )}
                </div>
                <Link href={post ? `/blog/${post.slug}` : p.href} className="block">
                  {p.image ? (
                    <div className="relative m-[3px] mb-0 aspect-[16/9] overflow-hidden border border-ink bg-chrome">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div aria-hidden className="absolute inset-0 bg-[var(--a)] opacity-0 mix-blend-multiply transition-opacity group-hover:opacity-40" />
                    </div>
                  ) : (
                    <PostCover
                      slug={p.post}
                      accent={p.accent}
                      label={post?.kicker}
                      className="m-[3px] mb-0 aspect-[16/9] border border-ink"
                    />
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="font-display text-[1.65rem] leading-[1.02]">{p.title}</h3>
                  <p className="mt-3 text-sm leading-snug text-muted-foreground">{p.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.map((t) => (
                      <li
                        key={t}
                        className="mono-xs inline-flex items-center gap-1 border border-ink/30 px-1.5 py-[3px]"
                      >
                        {techIcon(t) && <TechLogo name={t} className="size-3" />}
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {post && (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mono-xs bg-ink px-2 py-1.5 text-paper hover:bg-[var(--a)] hover:text-[#1e1e1e]"
                      >
                        Read deep-dive · {post.readingTime} min
                      </Link>
                    )}
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono-xs inline-flex items-center gap-1 border border-ink px-2 py-1.5 hover:bg-[var(--a)] hover:text-[#1e1e1e]"
                      >
                        {l.type} <ArrowUpRight className="size-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------- EXPERIENCE */}
      <section id="experience" className="scroll-mt-12 bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mb-14 flex flex-col gap-4 border-t border-paper pt-3">
            <div className="flex items-center justify-between">
              <span className="mono-xs bg-paper px-1.5 py-[2px] text-ink">Experience</span>
              <span className="mono-xs">02 / 05</span>
            </div>
            <h2 className="font-display max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)]">Where I&apos;ve Been Building.</h2>
          </div>
          <ol className="border-t border-paper/30">
            {DATA.work.map((w) => (
              <li key={w.company} className="group border-b border-paper/30">
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid gap-3 py-6 transition-colors hover:bg-paper/5 md:grid-cols-[180px_1fr_1.4fr] md:gap-8"
                >
                  <div className="mono-xs pt-1 text-pink">
                    {w.start} — {w.end}
                  </div>
                  <div>
                    <div className="font-display text-2xl leading-tight sm:text-3xl">{w.title}</div>
                    <div className="mt-2 flex items-center gap-1 text-sm text-paper/70">
                      {w.company}
                      <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {w.badges.map((b) => (
                        <span key={b} className="mono-xs border border-paper/40 px-1.5 py-[2px]">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-paper/75">{w.description}</p>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------- STACK */}
      <section className="overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHead index="03 / 05" label="Toolchain" title="The Stack Behind It." />
        </div>
        {[STACK, [...STACK].reverse()].map((row, r) => (
          <div
            key={r}
            className="group flex overflow-hidden border-y border-ink [--gap:0px]"
            style={{ ["--duration" as string]: r ? "55s" : "45s" }}
          >
            {[0, 1].map((dup) => (
              <ul
                key={dup}
                aria-hidden={dup === 1}
                className={`flex shrink-0 animate-marquee group-hover:[animation-play-state:paused] ${r ? "[animation-direction:reverse]" : ""}`}
              >
                {row.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2.5 border-r border-ink px-6 py-5 font-display text-2xl transition-colors hover:bg-pink hover:text-[#1e1e1e]"
                  >
                    <TechLogo name={t} className="size-6" />
                    {t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-8">
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
            <RuleBlock label="Robotics & Sim">MuJoCo, mjlab PPO, wire protocols, telemetry, Three.js twins.</RuleBlock>
            <RuleBlock label="AI & Data">Qdrant, DuckDB, local LLMs, Gemini, Gaussian Splatting, VGGT.</RuleBlock>
            <RuleBlock label="Product">React Native/Expo, Next.js, Electron, Android/Kotlin, Redis Streams, BLE.</RuleBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- WRITING */}
      <section className="relative overflow-hidden bg-desk py-24 text-desk-ink">
        <HalftoneBlobs blobs={[{ x: "80%", y: "-20%", size: "500px", opacity: 0.6 }]} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mb-14 flex flex-col gap-4 border-t border-current pt-3">
            <div className="flex items-center justify-between">
              <Tag>Thoughts</Tag>
              <span className="mono-xs">04 / 05</span>
            </div>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="font-display max-w-3xl text-[clamp(2.5rem,7vw,5.5rem)]">Written From The Code Up.</h2>
              <Link href="/blog" className="font-display link-under shrink-0 text-2xl">
                All {posts.length} posts →
              </Link>
            </div>
          </div>
          <div className="grid gap-6 text-ink md:grid-cols-3">
            {ranked.slice(0, 3).map((p, i) => (
              <PostCard key={p.slug} post={p} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- RECOGNITION */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <SectionHead index="05 / 05" label="Recognition" title="Hackathons, Certificates & School." />
        <div className="grid gap-6 lg:grid-cols-3">
          {DATA.hackathons.map((h) => (
            <Window key={h.title} title={h.dates} tone="paper" bodyClassName="flex h-full flex-col">
              {h.image && (
                <div className="aspect-[16/10] overflow-hidden border-b border-ink bg-chrome">
                  <img src={h.image} alt={h.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-3">
                <div className="mono-xs text-muted-foreground">{h.location}</div>
                <h3 className="font-display mt-2 text-2xl leading-tight">{h.title}</h3>
                <p className="mt-3 text-sm leading-snug text-muted-foreground">{h.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {h.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono-xs inline-flex items-center gap-1 border border-ink px-2 py-1.5 hover:bg-pink hover:text-[#1e1e1e]"
                    >
                      {l.title} <ArrowUpRight className="size-3" />
                    </a>
                  ))}
                </div>
              </div>
            </Window>
          ))}
        </div>

        <div className="mt-16 grid gap-0 border-t border-ink md:grid-cols-3">
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
              <p className="mt-2 text-sm text-muted-foreground">{e.degree}</p>
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
