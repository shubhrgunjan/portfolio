/* eslint-disable @next/next/no-img-element */
import { PillLink, PostRow, ProjectCard, Row, SectionTitle, splitTitle } from "@/components/mono/blocks";
import { ContributionGraph } from "@/components/mono/contribution-graph";
import { LocalTime } from "@/components/mono/local-time";
import { Toolkit } from "@/components/mono/toolkit";
import { Reveal } from "@/components/os/motion";
import { DATA } from "@/data/resume";
import { getContributions } from "@/lib/github";
import { getRankedPosts } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const projects = [...DATA.projects].sort((a, b) => a.rank - b.rank);
const FEATURED = 6;

const GITHUB_USER = new URL(DATA.contact.social.GitHub.url).pathname.slice(1);

const year = (s: string) => s.match(/\d{4}/)?.[0] ?? s;

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-under text-ink">
      {children}
    </a>
  );
}

export default async function Page() {
  const posts = getRankedPosts();
  const contributions = await getContributions(GITHUB_USER);
  const featured = projects.slice(0, FEATURED);
  const more = projects.slice(FEATURED);
  const social = DATA.contact.social;

  return (
    <div className="pt-32 sm:pt-40">
      {/* ---------------------------------------------------------- INTRO */}
      <section className="mx-auto max-w-[640px] px-6">
        <Reveal className="flex items-center justify-between text-[13px] text-muted-foreground">
          <span>
            Delhi NCR, India <span className="mx-1.5 opacity-50">/</span> <LocalTime />
          </span>
          <span className="flex gap-4">
            <a href={social.GitHub.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              GitHub
            </a>
            <a href={social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              LinkedIn
            </a>
          </span>
        </Reveal>

        <Reveal delay={60} className="mt-12 flex items-center gap-3.5">
          <img
            src="/shubhr-mono.jpg"
            alt="Portrait of Shubhr Gunjan"
            width={48}
            height={48}
            className="size-12 rounded-full object-cover ring-1 ring-black/5"
          />
          <div className="leading-tight">
            <div className="text-[15px] font-medium">{DATA.name}</div>
            <div className="text-[14px] text-muted-foreground">Systems &amp; robotics engineer</div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-8 text-balance text-[clamp(2.4rem,7vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            I build software for machines that <span className="font-accent text-[1.08em] tracking-[-0.02em]">see and move.</span>
          </h1>
          <p className="mt-6 text-[17px] leading-[1.65] text-ink-soft">
            Humanoid simulation, walkable 3D twins from phone video, air-gapped AI memory and displays that can&apos;t
            afford to stutter. Every project gets an honest write-up from the code.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <dl className="mt-8 grid grid-cols-[68px_1fr] gap-x-4 sm:grid-cols-[84px_1fr] gap-y-2.5 text-[15px] leading-snug">
            <dt className="text-muted-foreground">Now</dt>
            <dd className="text-ink-soft">
              Building <A href="https://github.com/shubhrgunjan/vasimov">VASIMOV</A>, a MuJoCo twin of the Menlo Asimov 1 humanoid
            </dd>
            <dt className="text-muted-foreground">Before</dt>
            <dd className="text-ink-soft">
              <A href="https://github.com/shubhrgunjan/edgemed">EdgeMed</A> at Code Cubicle 6.0,{" "}
              <A href="https://shubhrgunjan.github.io/nyaya-flow/">Nyaya Flow</A> as a Build in AI for India finalist
            </dd>
            <dt className="text-muted-foreground">Writing</dt>
            <dd className="text-ink-soft">
              <A href={social.Quora.url}>The Artful Eye</A>, essays on visual aesthetics and perception
            </dd>
            <dt className="text-muted-foreground">Studying</dt>
            <dd className="text-ink-soft">B.Tech in Electronics &amp; Communication, class of ’28</dd>
          </dl>
        </Reveal>

        <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-2">
          <PillLink href={`mailto:${DATA.contact.email}`} external solid>
            Send a message <ArrowUpRight className="size-3.5" />
          </PillLink>
          <PillLink href="/resume">Resume</PillLink>
        </Reveal>

        {contributions && (
          <Reveal delay={300} className="mt-16 rounded-[var(--radius)] border border-border p-5 sm:p-6">
            <ContributionGraph data={contributions} />
          </Reveal>
        )}
      </section>

      {/* ---------------------------------------------------------- WORK */}
      <section className="mx-auto mt-32 max-w-5xl px-6">
        <SectionTitle id="work" title="Selected work" aside={`${projects.length} projects`} />
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 80}>
              <ProjectCard title={p.title} dates={p.dates} slug={p.post} accent={p.accent} href={`/blog/${p.post}`} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h3 className="mb-2 text-[13px] text-muted-foreground">More projects</h3>
          <div className="divide-y divide-border">
            {more.map((p) => {
              const [name, tagline] = splitTitle(p.title);
              return (
                <Row key={p.title} href={`/blog/${p.post}`} title={name} sub={tagline || p.description} meta={year(p.dates)} />
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- EXPERIENCE */}
      <section className="mx-auto mt-32 max-w-[640px] px-6">
        <SectionTitle id="experience" title="Experience" />
        <ol className="divide-y divide-border">
          {DATA.work.map((w, i) => (
            <Reveal as="li" key={w.company} delay={i * 50} className="grid gap-1 py-6 first:pt-0 sm:grid-cols-[148px_1fr] sm:gap-6">
              <div className="whitespace-nowrap text-[13px] text-muted-foreground sm:pt-0.5">
                {w.start} — {w.end}
              </div>
              <div>
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1">
                  <span className="text-[15px] font-medium">{w.title}</span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <div className="text-[14px] text-muted-foreground">{w.company}</div>
                <div className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  <Markdown components={{ p: ({ children }) => <p>{children}</p> }}>{w.description}</Markdown>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------- WRITING */}
      <section className="mx-auto mt-28 max-w-[640px] px-6">
        <SectionTitle
          title="Writing"
          aside={
            <Link href="/blog" className="transition-colors hover:text-ink">
              All {posts.length} posts →
            </Link>
          }
        />
        <Reveal className="divide-y divide-border">
          {posts.slice(0, 5).map((p) => (
            <PostRow key={p.slug} post={p} />
          ))}
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- TOOLKIT */}
      <section className="mx-auto mt-28 max-w-[640px] px-6">
        <SectionTitle title="Toolkit" />
        <Reveal>
          <Toolkit />
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- RECOGNITION */}
      <section className="mx-auto mt-28 max-w-[640px] px-6">
        <SectionTitle title="Recognition" />
        <Reveal className="divide-y divide-border">
          {DATA.hackathons.map((h) => (
            <Row key={h.title} href={h.links[0]?.href ?? "#"} external title={h.title} sub={h.location} meta={year(h.dates)} />
          ))}
        </Reveal>

        <h3 className="mb-2 mt-12 text-[13px] text-muted-foreground">Education</h3>
        <Reveal className="divide-y divide-border">
          {DATA.education.map((e) => (
            <Row key={e.school} href={e.href} external title={e.school} sub={e.degree} meta={e.end} />
          ))}
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- CONTACT */}
      <section className="mx-auto mt-32 max-w-[640px] px-6">
        <Reveal>
          <p className="text-[1.6rem] leading-snug tracking-[-0.02em]">
            <span className="font-accent text-[1.15em]">Building something that has to work in the real world?</span>{" "}
            <span className="text-muted-foreground">I&apos;d like to hear about it.</span>
          </p>
          <div className="mt-6">
            <PillLink href={`mailto:${DATA.contact.email}`} external solid>
              {DATA.contact.email} <ArrowUpRight className="size-3.5" />
            </PillLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
