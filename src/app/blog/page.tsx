import { DimLine, PlotField } from "@/components/os/decor";
import { Decode, Reveal } from "@/components/os/motion";
import { PostCard } from "@/components/os/post-card";
import { PostCover } from "@/components/os/post-cover";
import { Tag } from "@/components/os/window";
import { getAllTags, getRankedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { BlogExplorer } from "./blog-explorer";

const description =
  "Engineering deep-dives on humanoid robotics, 3D vision, edge AI and the tools I build — written from the code up.";

export const metadata: Metadata = {
  title: "Thoughts",
  description,
  openGraph: { title: "Thoughts", description },
  twitter: { card: "summary_large_image", title: "Thoughts", description },
};

export default function BlogPage() {
  const posts = getRankedPosts();
  const [lead, ...rest] = posts;
  const tags = getAllTags(posts);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 pb-16 pt-24 sm:pt-32">
        <PlotField cx={1180} cy={380} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
          <Reveal>
            <p className="mono-xs flex items-center gap-3">
              <span className="bg-ink px-1.5 text-paper">{String(posts.length).padStart(2, "0")}</span>
              <Decode text="field notes · written from the code up" />
            </p>
            <h1 className="font-display mt-6 max-w-4xl text-[clamp(3rem,9vw,8rem)]">Field notes from the build.</h1>
            <p className="mt-6 max-w-xl text-lg leading-snug text-ink-soft">{description}</p>
          </Reveal>
          <DimLine className="mt-12 max-w-3xl" label={`${posts.length} posts · ${tags.length} tags · ${posts.reduce((n, p) => n + p.readingTime, 0)} min`} />
        </div>
      </section>

      <div className="h-12" />

      {lead && (
        <section className="mx-auto max-w-7xl px-4 sm:px-8">
          <Link
            href={`/blog/${lead.slug}`}
            data-accent={lead.accent}
            className="group/panel group relative grid border border-ink bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--a)] md:grid-cols-[1.25fr_1fr]"
          >
            <PostCover
              slug={lead.slug}
              accent={lead.accent}
              image={lead.image}
              label="Featured • 01"
              className="aspect-[16/10] border-b border-ink md:aspect-auto md:min-h-[420px] md:border-b-0 md:border-r"
            />
            <div className="flex flex-col p-5 sm:p-8">
              {lead.kicker && <Tag className="self-start">{lead.kicker}</Tag>}
              <h2 className="font-display mt-6 text-[clamp(2.2rem,4.5vw,3.8rem)]">{lead.title}</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{lead.summary}</p>
              <div className="mono-xs mt-auto flex flex-wrap items-center gap-3 pt-8">
                <span>{formatDate(lead.publishedAt)}</span>
                <span>•</span>
                <span>{lead.readingTime} min read</span>
                <span className="ml-auto bg-ink px-2 py-1 text-paper transition-colors group-hover:bg-[var(--a)] group-hover:text-[#16141f]">
                  Read the post →
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-28 pt-16 sm:px-8">
        <BlogExplorer
          items={rest.map(({ slug, title, summary, tags, kicker }) => ({ slug, title, summary, tags, kicker }))}
          tags={tags}
          cards={Object.fromEntries(
            rest.map((p, i) => [p.slug, <PostCard key={p.slug} post={p} index={i + 2} className="w-full" />])
          )}
        />
      </section>
    </>
  );
}
