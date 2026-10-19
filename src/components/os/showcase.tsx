"use client";

import { ProjectArt } from "@/components/art";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CornerMarks, ArucoGlyph } from "./window";

type Item = { slug: string; accent: string; title: string; kicker?: string; readingTime: number };

/** Hero panel that cycles through the top projects, crossfading their art. */
export function Showcase({ items, interval = 5200 }: { items: Item[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [paused, items.length, interval]);

  const cur = items[i];
  return (
    <div
      className="group/panel relative border border-ink bg-paper shadow-[8px_8px_0_0_var(--uv)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CornerMarks />
      <div className="flex h-7 items-center justify-between border-b border-ink px-2">
        <span className="flex items-center gap-2">
          <ArucoGlyph seed="now_building" />
          <span className="mono-xs font-medium">now_building.app</span>
        </span>
        <span className="mono-xs tabular-nums text-muted-foreground">
          {String(i + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
        </span>
      </div>
      <Link href={`/blog/${cur.slug}`} className="group relative block aspect-[16/9] overflow-hidden border-b border-ink">
        {items.map((it, j) => (
          <div
            key={it.slug}
            data-accent={it.accent}
            aria-hidden={j !== i}
            className={cn(
              "absolute inset-0 bg-[var(--a)] transition-[opacity,clip-path] duration-700 ease-[cubic-bezier(.2,.7,.1,1)]",
              j === i ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(0_0_0_100%)]"
            )}
          >
            <ProjectArt slug={it.slug} accent={it.accent} />
          </div>
        ))}
      </Link>
      <div className="flex items-end justify-between gap-4 p-3">
        <div className="min-w-0">
          <div className="mono-xs text-muted-foreground">{cur.kicker}</div>
          <Link href={`/blog/${cur.slug}`} className="font-display mt-1 block truncate text-2xl hover:underline">
            {cur.title.split(/[:—]/)[0].trim()}
          </Link>
        </div>
        <div className="flex shrink-0 gap-1" role="tablist" aria-label="Featured projects">
          {items.map((it, j) => (
            <button
              key={it.slug}
              type="button"
              role="tab"
              aria-selected={j === i}
              aria-label={it.title}
              onClick={() => setI(j)}
              className={cn("h-2 border border-ink transition-all", j === i ? "w-8 bg-ink" : "w-2 bg-paper hover:bg-lime")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
