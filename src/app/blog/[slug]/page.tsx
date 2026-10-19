import { Base64Rail, CloudSky } from "@/components/os/decor";
import { PostCard } from "@/components/os/post-card";
import { PostCover } from "@/components/os/post-cover";
import { Tag, Window } from "@/components/os/window";
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

const PALETTES: Record<string, string[]> = {
  pink: ["var(--sky)", "var(--magenta)", "var(--pink)", "var(--violet)"],
  sky: ["var(--sky)", "var(--violet)", "var(--sky)", "var(--mint)"],
  violet: ["var(--violet)", "var(--magenta)", "var(--sky)", "var(--pink)"],
  lime: ["var(--mint)", "var(--lime)", "var(--sky)", "var(--lime)"],
  orange: ["var(--pink)", "var(--orange)", "var(--magenta)", "var(--orange)"],
  mint: ["var(--sky)", "var(--mint)", "var(--lime)", "var(--sky)"],
  magenta: ["var(--violet)", "var(--magenta)", "var(--pink)", "var(--magenta)"],
};

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
      url: `${DATA.url}/blog/${slug}`,
      ...(image && { images: [{ url: `${DATA.url}${image}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [`${DATA.url}${image}`] }),
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
    image: post.image ? `${DATA.url}${post.image}` : `${DATA.url}/blog/${slug}/opengraph-image`,
    url: `${DATA.url}/blog/${slug}`,
    author: { "@type": "Person", name: DATA.name },
  }).replace(/</g, "\\u003c");

  return (
    <div data-accent={post.accent}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLdContent }}
      />
      <ReadingProgress />

      <header className="relative overflow-hidden pb-12 pt-24 sm:pt-32">
        <CloudSky palette={PALETTES[post.accent]} />
        <Base64Rail text={post.title} className="absolute left-4 top-28 hidden max-h-[70%] overflow-hidden xl:block" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
          <Link
            href="/blog"
            className="mono-xs inline-flex items-center gap-1 bg-paper px-2 py-1 shadow-[0_0_0_1px_var(--ink)] hover:bg-ink hover:text-paper"
          >
            <ChevronLeft className="size-3" /> All thoughts
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {post.kicker && <Tag>{post.kicker}</Tag>}
            {post.tags.map((t) => (
              <span key={t} className="mono-xs bg-paper/70 px-1.5 py-[2px] backdrop-blur">
                #{t}
              </span>
            ))}
          </div>
          <h1 className="font-display mt-6 max-w-5xl text-balance text-[clamp(2.6rem,7vw,6rem)]">{post.title}</h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-snug tracking-tight text-ink-soft">{post.summary}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
            <Window title="Post.info" tone="chrome" bodyClassName="px-3 py-2">
              <dl className="mono-xs grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[12px]">
                <dt className="opacity-60">author</dt>
                <dd>{post.author ?? DATA.name}</dd>
                <dt className="opacity-60">published</dt>
                <dd>{formatDate(post.publishedAt)}</dd>
                {post.updatedAt && (
                  <>
                    <dt className="opacity-60">updated</dt>
                    <dd>{formatDate(post.updatedAt)}</dd>
                  </>
                )}
                <dt className="opacity-60">read</dt>
                <dd>{post.readingTime} min</dd>
              </dl>
            </Window>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {post.repo && (
                <a
                  href={post.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-ink px-3 py-2 text-sm font-semibold text-paper hover:bg-[var(--a)] hover:text-[#1e1e1e]"
                >
                  Source <ArrowUpRight className="size-4" />
                </a>
              )}
              {post.demo && (
                <a
                  href={post.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-paper px-3 py-2 text-sm font-semibold shadow-[0_0_0_1px_var(--ink)] hover:bg-[var(--a)] hover:text-[#1e1e1e]"
                >
                  Live demo <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <PostCover
          slug={post.slug}
          accent={post.accent}
          image={post.image}
          className="aspect-[21/7] border border-ink shadow-[6px_6px_0_0_var(--ink)]"
        />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 pt-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article id="article" className="prose prose-os max-w-[46rem] dark:prose-invert">
          <MDXContent code={post.mdx} components={mdxComponents} />
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-16 space-y-6">
            <Toc headings={post.headings} />
            {next && next.slug !== slug && (
              <Link
                href={`/blog/${next.slug}`}
                data-accent={next.accent}
                className="block border border-ink bg-[var(--a)] p-3 text-[#1e1e1e] shadow-[4px_4px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5"
              >
                <div className="mono-xs">Up next →</div>
                <div className="font-display mt-2 text-xl leading-tight">{next.title}</div>
              </Link>
            )}
          </div>
        </aside>
      </div>

      <section className="border-t border-ink bg-desk py-16 text-desk-ink">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <h2 className="font-display mb-10 text-[clamp(2.2rem,5vw,4rem)]">Keep Reading.</h2>
          <div className="grid gap-6 text-ink sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
