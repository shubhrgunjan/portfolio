import BlurFade from "@/components/magicui/blur-fade";
import { ContributionGraph } from "@/components/mono/contribution-graph";
import { ProjectCard } from "@/components/project-card";
import HackathonsSection from "@/components/section/hackathons-section";
import { MoreLink } from "@/components/section/section-header";
import { DATA } from "@/data/resume";
import { getContributions } from "@/lib/github";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Everything I've built end to end, the hackathons behind some of it, and a year of GitHub activity.",
};

const projects = [...DATA.projects].sort((a, b) => a.rank - b.rank);
const GITHUB_USER = new URL(DATA.contact.social.GitHub.url).pathname.slice(1);

export default async function ProjectsPage() {
  const contributions = await getContributions(GITHUB_USER);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 pt-16 sm:pt-24">
      <header className="flex flex-col gap-3">
        <BlurFade>
          <span className="w-fit rounded-full border border-brand/30 bg-brand-soft px-3.5 py-1 text-[13px] font-medium text-brand">
            {projects.length} projects
          </span>
        </BlurFade>
        <BlurFade delay={0.05}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
        </BlurFade>
        <BlurFade delay={0.1}>
          <p className="max-w-xl text-muted-foreground md:text-lg">
            Things I&apos;ve built end to end. Each card opens a write-up grounded in the actual code.
          </p>
        </BlurFade>
      </header>

      {contributions && (
        <BlurFade delay={0.15}>
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <ContributionGraph data={contributions} />
          </div>
        </BlurFade>
      )}

      <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((p, i) => (
          <BlurFade key={p.title} inView delay={(i % 2) * 0.06} className="h-full">
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

      <HackathonsSection />

      <MoreLink href="/blog">Read the write-ups</MoreLink>
    </div>
  );
}
