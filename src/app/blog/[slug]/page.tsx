import { SITE_URL } from "@/lib/site";
import { DimLine } from "@/components/os/decor";
import { Reveal } from "@/components/os/motion";
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
    <div data-accent={post.accent}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLdContent }}
      />
      <ReadingProgress />

      <header className="relative overflow-hidden border-b border-ink/10 pb-14 pt-20 sm:pt-24">
        <div aria-hidden className="absolute right-[-10%] top-[-20%] h-[90%] w-[60%] rounded-full bg-[var(--a)] opacity-40 blur-[120px] dark:opacity-20" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--hairline)_1px,transparent_1px),linear-gradient(to_bottom,var(--hairline)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
          <Link
            href="/blog"
            className="mono-xs inline-flex items-center gap-1 border border-ink/20 bg-paper/70 px-2 py-1 backdrop-blur hover:border-ink"
          >
            <ChevronLeft className="size-3" /> all thoughts
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                {post.kicker && <Tag>{post.kicker}</Tag>}
                {post.tags.map((t) => (
                  <span key={t} className="mono-xs text-muted-foreground">
                    #{t}
                  </span>
                ))}
              </div>
              <h1 className="font-display mt-6 text-balance text-[clamp(2.4rem,5.4vw,4.6rem)]">{post.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-snug text-ink-soft">{post.summary}</p>
              <dl className="mono-xs mt-8 flex flex-wrap gap-x-6 gap-y-1">
                <div><dt className="inline text-muted-foreground">by </dt><dd className="inline">{post.author ?? DATA.name}</dd></div>
                <div><dt className="inline text-muted-foreground">published </dt><dd className="inline">{formatDate(post.publishedAt)}</dd></div>
                {post.updatedAt && (
                  <div><dt className="inline text-muted-foreground">updated </dt><dd className="inline">{formatDate(post.updatedAt)}</dd></div>
                )}
                <div><dt className="inline text-muted-foreground">read </dt><dd className="inline">{post.readingTime} min</dd></div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.repo && (
                  <a
                    href={post.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-1 bg-ink px-4 text-sm font-semibold text-paper hover:bg-[var(--a)] hover:text-[#16141f]"
                  >
                    Source <ArrowUpRight className="size-4" />
                  </a>
                )}
                {post.demo && (
                  <a
                    href={post.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-1 border border-ink px-4 text-sm font-semibold hover:bg-[var(--a)] hover:text-[#16141f]"
                  >
                    Live demo <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <Window title={`${post.slug}.svg`} meta="live figure" className="shadow-[8px_8px_0_0_var(--a)]" bodyClassName="p-0">
                <PostCover slug={post.slug} accent={post.accent} image={post.image} className="aspect-[16/9]" />
              </Window>
            </Reveal>
          </div>
          <DimLine className="mt-12" label={`${post.headings.length} sections · ${post.readingTime} min · ${post.tags.length} tags`} />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 pt-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article id="article" className="prose prose-os max-w-[46rem] dark:prose-invert">
          <MDXContent code={post.mdx} components={mdxComponents} />
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <Toc headings={post.headings} />
            {next && next.slug !== slug && (
              <Link
                href={`/blog/${next.slug}`}
                data-accent={next.accent}
                className="block border border-ink bg-[var(--a)] p-3 text-[#16141f] transition-transform hover:-translate-y-0.5"
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
