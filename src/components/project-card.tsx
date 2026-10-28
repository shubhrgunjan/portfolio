import { ProjectArt } from "@/components/art";
import { splitTitle } from "@/components/mono/blocks";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  title: string;
  href: string;
  description: string;
  dates: string;
  tags: readonly string[];
  slug: string;
  accent: string;
  links?: readonly { icon: ReactNode; type: string; href: string }[];
  className?: string;
}

/** Magic UI project card: illustration on top, title, dates, summary and stack below. */
export function ProjectCard({ title, href, description, dates, tags, slug, accent, links, className }: Props) {
  const [name, tagline] = splitTitle(title);
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_12px_40px_-16px] hover:shadow-brand/30",
        className
      )}
    >
      <Link href={href} className="block aspect-[16/9] overflow-hidden border-b border-border" tabIndex={-1} aria-hidden>
        <ProjectArt slug={slug} accent={accent} />
      </Link>
      {links && links.length > 0 && (
        <div className="absolute right-2 top-2 z-10 flex flex-wrap gap-1.5">
          {links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              <Badge className="flex items-center gap-1.5 bg-black/80 text-[11px] text-white backdrop-blur hover:bg-black">
                {link.icon}
                {link.type}
              </Badge>
            </a>
          ))}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-[17px] font-semibold leading-snug">
              <Link href={href} className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand">
                {name}
              </Link>
            </h3>
            {tagline && <p className="text-[13px] text-muted-foreground">{tagline}</p>}
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
        </div>
        <div className="flex-1">
          <p className="line-clamp-4 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="h-6 border-border px-2 text-[11px] font-medium">
                {tag}
              </Badge>
            ))}
          </div>
          <time className="shrink-0 text-[11px] text-muted-foreground">{dates.split(" - ")[0]}</time>
        </div>
      </div>
    </div>
  );
}
