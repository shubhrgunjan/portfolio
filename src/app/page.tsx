/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { shortDate } from "@/components/mono/blocks";
import { ContributionGraph } from "@/components/mono/contribution-graph";
import { ProjectCard } from "@/components/project-card";
import { MoreLink, SectionHeader } from "@/components/section/section-header";
import WorkSection from "@/components/section/work-section";
import { Avatar } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { getContributions } from "@/lib/github";
import { getRankedPosts } from "@/lib/posts";
import { ArrowUpRight, ChevronRight, FileText, MapPin } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.05;
const FEATURED = 4;
const projects = [...DATA.projects].sort((a, b) => a.rank - b.rank);
const GITHUB_USER = new URL(DATA.contact.social.GitHub.url).pathname.slice(1);

export default async function Page() {
  const posts = getRankedPosts();
  const contributions = await getContributions(GITHUB_USER);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-20 px-6 pt-16 sm:pt-24">
      <section id="hero">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex items-center gap-4">
            <Avatar className="size-14 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background">
              <img alt={`Headshot of ${DATA.name}`} src={DATA.avatarUrl} className="size-full rounded-full object-cover" />
            </Avatar>
            <div className="leading-tight">
              <div className="font-medium">{DATA.name}</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" /> {DATA.location}
              </div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h1 className="mt-10 text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-[3.4rem]">
            Software for edge AI and real-time systems,{" "}
            <span className="text-muted-foreground">built to hold up in the real world.</span>
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="prose mt-6 max-w-none text-pretty text-[17px] leading-relaxed text-muted-foreground dark:prose-invert prose-p:my-0 prose-a:font-medium prose-a:text-foreground prose-a:underline-offset-4 prose-a:decoration-border hover:prose-a:decoration-foreground">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand px-5 text-sm font-medium text-brand-fg transition-opacity hover:opacity-85"
            >
              Get in touch <ArrowUpRight className="size-4" />
            </a>
            <Link
              href="/resume"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-brand-soft"
            >
              <FileText className="size-4" /> Resume
            </Link>
            <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
            {[DATA.contact.social.GitHub, DATA.contact.social.LinkedIn].map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="hidden size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground sm:grid transition-colors hover:bg-brand-soft hover:text-foreground"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </BlurFade>
        {contributions && (
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="mt-14 rounded-2xl border border-border bg-card p-5 sm:p-6">
              <ContributionGraph data={contributions} />
            </div>
          </BlurFade>
        )}
      </section>

      <section id="work" className="flex flex-col gap-6">
        <BlurFade inView>
          <h2 className="text-xl font-bold">Experience</h2>
        </BlurFade>
        <BlurFade inView>
          <WorkSection />
        </BlurFade>
        <BlurFade inView>
          <Link href="/resume" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
            Education, skills and the full resume <ChevronRight className="size-4" />
          </Link>
        </BlurFade>
      </section>

      <section id="projects" className="flex flex-col gap-8">
        <BlurFade inView>
          <SectionHeader pill="My projects" title="Selected work">
            Things I&apos;ve built end to end, each with a write-up from the code.
          </SectionHeader>
        </BlurFade>
        <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.slice(0, FEATURED).map((p, i) => (
            <BlurFade key={p.title} inView delay={i * 0.06} className="h-full">
              <ProjectCard
                href={`/blog/${p.post}`}
                title={p.title}
                description={p.description}
                dates={p.dates}
                tags={p.technologies}
                slug={p.post}
                accent={p.accent}
              />
            </BlurFade>
          ))}
        </div>
        <BlurFade inView>
          <MoreLink href="/projects">All {projects.length} projects &amp; hackathons</MoreLink>
        </BlurFade>
      </section>

      <section id="writing" className="flex flex-col gap-8">
        <BlurFade inView>
          <SectionHeader pill="Writing" title="Latest posts">
            Engineering deep-dives on what I build, plus essays from <em>The Artful Eye</em>.
          </SectionHeader>
        </BlurFade>
        <div className="flex flex-col gap-1">
          {posts.slice(0, 3).map((post, i) => (
            <BlurFade key={post.slug} inView delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between gap-1 rounded-xl border border-transparent p-4 transition-colors hover:border-border hover:bg-card sm:flex-row sm:items-baseline sm:gap-6"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-medium transition-colors group-hover:text-brand">{post.title}</span>
                  <span className="line-clamp-1 text-sm text-muted-foreground">{post.summary}</span>
                </div>
                <time className="shrink-0 font-mono text-xs text-muted-foreground">{shortDate(post.publishedAt)}</time>
              </Link>
            </BlurFade>
          ))}
        </div>
        <BlurFade inView>
          <MoreLink href="/blog">All {posts.length} posts</MoreLink>
        </BlurFade>
      </section>

    </div>
  );
}
