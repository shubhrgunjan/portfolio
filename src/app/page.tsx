/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { shortDate } from "@/components/mono/blocks";
import { ProjectCard } from "@/components/project-card";
import { MoreLink, SectionHeader } from "@/components/section/section-header";
import WorkSection from "@/components/section/work-section";
import { Avatar } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { getRankedPosts } from "@/lib/posts";
import { ArrowUpRight, ChevronRight, Download, FileText, MapPin } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;
const FEATURED = 4;
const projects = [...DATA.projects].sort((a, b) => a.rank - b.rank);

export default function Page() {
  const posts = getRankedPosts();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-20 px-6 pt-16 sm:pt-24">
      <section id="hero" className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="order-2 flex flex-1 flex-col gap-3 md:order-1">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-signal" />
              </span>
              Edge AI • Real-time systems • Developer tools
            </div>
          </BlurFade>
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl"
            yOffset={8}
            text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
          />
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="max-w-[560px] leading-relaxed text-muted-foreground md:text-lg">{DATA.description}</p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0 text-brand" />
              {DATA.location}
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-brand-fg shadow-[0_6px_20px_-6px] shadow-brand/60 transition-all hover:brightness-110"
              >
                <FileText className="size-4" />
                View resume
              </Link>
              <a
                href="/Shubhr_Gunjan_Resume.pdf"
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
              >
                <Download className="size-4" />
                Download PDF
              </a>
            </div>
          </BlurFade>
        </div>
        <BlurFade delay={BLUR_FADE_DELAY} className="order-1 shrink-0 md:order-2">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-brand via-sky-400 to-emerald-400 opacity-50 blur-md transition duration-500 group-hover:opacity-80" />
            <Avatar className="relative size-28 rounded-full border-2 border-background ring-2 ring-brand/40 md:size-36">
              <img alt={`Headshot of ${DATA.name}`} src={DATA.avatarUrl} className="size-full rounded-full object-cover" />
            </Avatar>
          </div>
        </BlurFade>
      </section>

      <section id="about" className="-mt-6 flex flex-col gap-4">
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="prose max-w-full text-pretty leading-relaxed text-muted-foreground dark:prose-invert prose-a:text-brand prose-a:no-underline hover:prose-a:underline">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
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

      <section id="contact">
        <BlurFade inView>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 text-center">
            <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-brand/20 blur-3xl" />
            <div className="relative flex flex-col items-center gap-4">
              <span className="rounded-full border border-brand/30 bg-brand-soft px-3.5 py-1 text-[13px] font-medium text-brand">
                Contact
              </span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get in touch</h2>
              <p className="max-w-md text-balance text-muted-foreground">
                Building something that has to work in the real world? Send me a message, or find me on{" "}
                <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                  LinkedIn
                </a>
                .
              </p>
              <a
                href={`mailto:${DATA.contact.email}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-fg shadow-[0_6px_20px_-6px] shadow-brand/60 transition-all hover:brightness-110"
              >
                {DATA.contact.email} <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
}
