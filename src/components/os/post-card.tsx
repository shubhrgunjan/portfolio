import type { Post } from "@/lib/posts";
import { cn, formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PostCover } from "./post-cover";
import { ArucoGlyph, CornerMarks } from "./window";

export function PostCard({ post, className, index }: { post: Post; className?: string; index?: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-accent={post.accent}
      className={cn(
        "group/panel group relative flex flex-col border border-ink bg-paper text-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--a)]",
        className
      )}
    >
      <CornerMarks />
      <div className="flex h-7 items-center justify-between gap-2 border-b border-ink px-2">
        <span className="flex min-w-0 items-center gap-2">
          <ArucoGlyph seed={post.slug} />
          <span className="mono-xs truncate">{post.kicker ?? post.slug}</span>
        </span>
        <span className="mono-xs shrink-0 text-muted-foreground">
          {index !== undefined ? `fig. ${String(index).padStart(2, "0")}` : `${post.readingTime} min`}
        </span>
      </div>
      <PostCover slug={post.slug} accent={post.accent} image={post.image} className="aspect-[16/9] border-b border-ink" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-[1.55rem] leading-[1.04]">{post.title}</h3>
        <p className="line-clamp-3 text-sm leading-snug text-ink-soft">{post.summary}</p>
        <div className="mono-xs mt-auto flex items-center gap-3 pt-3 text-muted-foreground">
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{post.readingTime} min</span>
          <ArrowRight className="ml-auto size-4 text-ink transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
