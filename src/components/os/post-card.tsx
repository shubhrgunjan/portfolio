import type { Post } from "@/lib/posts";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
import { PostCover } from "./post-cover";

export function PostCard({ post, className, index }: { post: Post; className?: string; index?: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-accent={post.accent}
      className={cn(
        "group flex flex-col border border-ink bg-paper shadow-[4px_4px_0_0_var(--ink)] transition-all hover:-translate-y-1 hover:shadow-[6px_8px_0_0_var(--a)]",
        className
      )}
    >
      <div className="flex items-center justify-between bg-ink px-1.5 py-[3px] text-paper">
        <span className="mono-xs truncate">{post.slug}.mdx</span>
        <span className="mono-xs opacity-70">{index !== undefined ? String(index).padStart(2, "0") : `${post.readingTime} min`}</span>
      </div>
      <PostCover
        slug={post.slug}
        accent={post.accent}
        image={post.image}
        label={post.kicker}
        className="m-[3px] mb-0 aspect-[16/9] border border-ink"
      />
      <div className="flex flex-1 flex-col gap-3 p-3">
        <h3 className="font-display text-[1.6rem] leading-[1.02]">{post.title}</h3>
        <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">{post.summary}</p>
        <div className="mono-xs mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-muted-foreground">
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.readingTime} min read</span>
          <span className="ml-auto bg-[var(--a)] px-1.5 text-[#1e1e1e] opacity-0 transition-opacity group-hover:opacity-100">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
