import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import { ArrowUpRight, BookOpen, ChevronRight, PenTool } from "lucide-react";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

const BLUR_FADE_DELAY = 0.015;

export default function WritingSection() {
  const sortedPosts = [...allPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  return (
    <section id="writing" className="flex min-h-0 flex-col gap-y-8 w-full">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">Writing & Thoughts</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Essays & Visual Curation
          </h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance max-w-xl">
            Reflections on physics simulation, air-gapped system design, and essays on visual aesthetics from curating <em>The Artful Eye</em> on Quora.
          </p>
        </div>
      </div>

      {/* Quora Feature Spotlight */}
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 shrink-0">
                <Icons.quora className="size-6" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base sm:text-lg">The Artful Eye on Quora</h3>
                  <Badge variant="secondary" className="text-xs font-mono">Curator & Writer</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  Exploring architectural space, light, visual perception, and human behavior. Curating essays and photography for thousands of curious minds.
                </p>
              </div>
            </div>
            <Link
              href="https://www.quora.com/profile/Shubhr-Gunjan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all shrink-0 self-end sm:self-center"
            >
              <span>Explore Quora</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </BlurFade>

      {/* Blog Essays List */}
      <div className="flex flex-col gap-3">
        {sortedPosts.map((post, id) => {
          const slug = post._meta.path.replace(/\.mdx$/, "");
          return (
            <BlurFade key={slug} delay={BLUR_FADE_DELAY * 14 + id * 0.04}>
              <Link
                href={`/blog/${slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/40 transition-all gap-2"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                    {post.title}
                    <ChevronRight className="size-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                  </span>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {post.summary}
                  </p>
                </div>
                <time className="text-xs font-mono text-muted-foreground tabular-nums shrink-0">
                  {post.publishedAt}
                </time>
              </Link>
            </BlurFade>
          );
        })}
      </div>

      <div className="flex justify-center mt-2">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <BookOpen className="size-4" />
          <span>View all articles & publications</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
