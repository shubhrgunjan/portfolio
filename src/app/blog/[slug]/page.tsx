import { SITE_URL } from "@/lib/site";
import { PillLink, PostRow } from "@/components/mono/blocks";
import { Reveal } from "@/components/os/motion";
import { PostCover } from "@/components/os/post-cover";
import { DATA } from "@/data/resume";
import { getPost, getPosts, getRankedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
import { MDXContent } from "@content-collections/mdx/react";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress, Toc } from "./toc";

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return undefined;

  const { title, publishedAt: publishedTime, summary: description, image } = post;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${SITE_URL}/blog/${slug}`,
      ...(image && { images: [{ url: `${SITE_URL}${image}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [`${SITE_URL}${image}`] }),
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.draft) notFound();

  const ranked = getRankedPosts();
  const i = ranked.findIndex((p) => p.slug === slug);
  const related = [
    ...ranked.filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t))),
    ...ranked.filter((p) => p.slug !== slug),
  ]
    .filter((p, idx, arr) => arr.findIndex((q) => q.slug === p.slug) === idx)
    .slice(0, 3);
  const next = ranked[(i + 1) % ranked.length];

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    description: post.summary,
    image: post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/blog/${slug}/opengraph-image`,
    url: `${SITE_URL}/blog/${slug}`,
    author: { "@type": "Person", name: DATA.name },
  }).replace(/</g, "\\u003c");

  return (
    <div data-accent={post.accent} className="pt-32 sm:pt-40">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLdContent }}
      />
      <ReadingProgress />

      <div className="mx-auto grid max-w-[1000px] gap-12 px-6 lg:grid-cols-[minmax(0,680px)_1fr]">
        <header className="lg:col-start-1">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-ink">
              <ChevronLeft className="size-3.5" /> Writing
            </Link>
            <p className="mt-10 text-[13px] text-muted-foreground">
              {[post.kicker, formatDate(post.publishedAt), `${post.readingTime} min read`].filter(Boolean).join("  ·  ")}
            </p>
            <h1 className="mt-3 text-balance text-[clamp(2rem,4.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
              {post.title}
            </h1>
            <p className="mt-4 text-[1.15rem] leading-relaxed text-muted-foreground">{post.summary}</p>
            {(post.repo || post.demo) && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.repo && (
                  <PillLink href={post.repo} external solid>
                    Source <ArrowUpRight className="size-3.5" />
                  </PillLink>
                )}
                {post.demo && (
                  <PillLink href={post.demo} external>
                    Live demo <ArrowUpRight className="size-3.5" />
                  </PillLink>
                )}
              </div>
            )}
          </Reveal>
          <Reveal delay={100} className="mt-10 rounded-[var(--radius)] bg-chrome p-4 sm:p-6">
            <PostCover
              slug={post.slug}
              accent={post.accent}
              image={post.image}
              className="aspect-[16/9] rounded-lg shadow-[0_1px_2px_rgb(0_0_0/0.06),0_8px_24px_-12px_rgb(0_0_0/0.18)] ring-1 ring-black/[0.04]"
            />
          </Reveal>
        </header>

        <article id="article" className="prose prose-os max-w-none dark:prose-invert lg:col-start-1">
          <MDXContent code={post.mdx} components={mdxComponents} />
        </article>
        <aside className="hidden lg:col-start-2 lg:row-start-2 lg:block">
          <div className="sticky top-28">
            <Toc headings={post.headings} />
          </div>
        </aside>
      </div>

      <section className="mx-auto mt-24 max-w-[640px] px-6">
        <div className="border-t border-border pt-10">
          {next && next.slug !== slug && (
            <Link href={`/blog/${next.slug}`} className="group block">
              <div className="text-[13px] text-muted-foreground">Up next</div>
              <div className="mt-1 text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                {next.title}
              </div>
            </Link>
          )}
          <h2 className="mb-2 mt-14 text-[13px] text-muted-foreground">Keep reading</h2>
          <div className="divide-y divide-border">
            {related.map((p) => (
              <PostRow key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
