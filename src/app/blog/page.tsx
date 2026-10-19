import { Base64Rail, CloudSky, Leader } from "@/components/os/decor";
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
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
        <CloudSky palette={["var(--violet)", "var(--sky)", "var(--magenta)", "var(--pink)"]} />
        <Base64Rail text="Field notes from the build. Shubhr Gunjan." className="absolute left-4 top-28 hidden lg:block" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
          <Leader left="Thoughts" right={`${posts.length} deep-dives`} className="mb-8" />
          <h1 className="font-display mx-auto max-w-5xl text-center text-[clamp(3rem,10vw,8.5rem)]">
            Field Notes From The Build.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-center text-lg font-medium leading-snug tracking-tight">
            {description}
          </p>
        </div>
      </section>

      {lead && (
        <section className="mx-auto max-w-7xl px-4 sm:px-8">
          <Link
            href={`/blog/${lead.slug}`}
            data-accent={lead.accent}
            className="group grid border border-ink bg-paper shadow-[6px_6px_0_0_var(--ink)] transition-shadow hover:shadow-[10px_10px_0_0_var(--a)] md:grid-cols-[1.25fr_1fr]"
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
                <span className="ml-auto bg-ink px-2 py-1 text-paper transition-colors group-hover:bg-[var(--a)] group-hover:text-[#1e1e1e]">
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
