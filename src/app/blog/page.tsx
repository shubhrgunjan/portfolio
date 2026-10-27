import { PostRow } from "@/components/mono/blocks";
import { Reveal } from "@/components/os/motion";
import { getAllTags, getRankedPosts } from "@/lib/posts";
import type { Metadata } from "next";
import { BlogExplorer } from "./blog-explorer";

const description =
  "Engineering deep-dives on humanoid robotics, 3D vision, edge AI and the tools I build, written from the code up.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  openGraph: { title: "Writing", description },
  twitter: { card: "summary_large_image", title: "Writing", description },
};

export default function BlogPage() {
  const posts = getRankedPosts();
  const tags = getAllTags(posts);
  const minutes = posts.reduce((n, p) => n + p.readingTime, 0);

  return (
    <div className="mx-auto max-w-[640px] px-6 pt-32 sm:pt-40">
      <Reveal>
        <h1 className="text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.035em]">Writing</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{description}</p>
        <p className="mt-4 text-[13px] text-muted-foreground">
          {posts.length} posts <span className="mx-1.5 opacity-50">/</span> {minutes} minutes of reading
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-12">
        <BlogExplorer
          items={posts.map(({ slug, title, summary, tags, kicker }) => ({ slug, title, summary, tags, kicker }))}
          tags={tags}
          rows={Object.fromEntries(posts.map((p) => [p.slug, <PostRow key={p.slug} post={p} />]))}
        />
      </Reveal>
    </div>
  );
}
