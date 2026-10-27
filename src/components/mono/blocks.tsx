import { ProjectArt } from "@/components/art";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/** "VASIMOV — Virtual Asimov 1 in MuJoCo" → ["VASIMOV", "Virtual Asimov 1 in MuJoCo"] */
export function splitTitle(title: string) {
  const [name, ...rest] = title.split(" — ");
  return [name, rest.join(" — ")] as const;
}

export function shortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export function SectionTitle({ title, aside, id }: { title: string; aside?: ReactNode; id?: string }) {
  return (
    <div id={id} className="mb-6 flex scroll-mt-28 items-baseline justify-between gap-4">
      <h2 className="text-[17px] font-semibold tracking-tight">{title}</h2>
      {aside && <div className="text-[13px] text-muted-foreground">{aside}</div>}
    </div>
  );
}

/** Quiet outlined pill used for secondary actions. */
export function PillLink({
  href,
  children,
  external,
  solid,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  solid?: boolean;
  className?: string;
}) {
  const cls = cn(
    "press inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors duration-150",
    solid ? "bg-ink text-paper hover:bg-ink/85" : "border border-border bg-paper hover:border-ink/30 hover:bg-chrome",
    className
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Label above a light grey plate with the project's illustration framed inside it. */
export function ProjectCard({
  title,
  dates,
  slug,
  accent,
  href,
}: {
  title: string;
  dates: string;
  slug: string;
  accent: string;
  href: string;
}) {
  const [name, tagline] = splitTitle(title);
  return (
    <Link href={href} className="group block">
      <div className="mb-3 flex items-baseline justify-between gap-3 text-[14px]">
        <span className="min-w-0 truncate">
          <span className="font-medium text-ink">{name}</span>
          {tagline && <span className="text-muted-foreground"> {tagline}</span>}
        </span>
        <span className="shrink-0 text-[13px] text-muted-foreground">{dates.split(" - ")[0]}</span>
      </div>
      <div className="rounded-[var(--radius)] bg-chrome p-5 transition-colors duration-150 group-hover:bg-chrome-2 sm:p-7">
        <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-[0_1px_2px_rgb(0_0_0/0.06),0_8px_24px_-12px_rgb(0_0_0/0.18)] ring-1 ring-black/[0.04]">
          <ProjectArt slug={slug} accent={accent} />
        </div>
      </div>
    </Link>
  );
}

/** A full-width list row: title on the left, quiet meta on the right. */
export function Row({
  href,
  title,
  sub,
  meta,
  external,
}: {
  href: string;
  title: ReactNode;
  sub?: ReactNode;
  meta?: ReactNode;
  external?: boolean;
}) {
  const body = (
    <>
      <span className="min-w-0">
        <span className="block text-[15px] font-medium text-ink">{title}</span>
        {sub && <span className="mt-0.5 block truncate text-[14px] text-muted-foreground">{sub}</span>}
      </span>
      <span className="flex shrink-0 items-center gap-2 text-[13px] text-muted-foreground">
        {meta}
        <ArrowUpRight className="size-3.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
      </span>
    </>
  );
  const cls =
    "group -mx-3 flex items-center justify-between gap-6 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-chrome";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}

export function PostRow({ post }: { post: Post }) {
  return (
    <Row
      href={`/blog/${post.slug}`}
      title={post.title}
      sub={post.summary}
      meta={<span className="hidden sm:inline">{shortDate(post.publishedAt)}</span>}
    />
  );
}
