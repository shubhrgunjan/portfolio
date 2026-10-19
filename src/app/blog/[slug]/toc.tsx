"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Heading = { depth: number; text: string; id: string };

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(total, 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-1">
      <div className="h-full origin-left bg-[var(--a)]" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

export function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents" className="border border-ink bg-paper">
      <div className="flex h-7 items-center justify-between border-b border-ink px-2">
        <span className="mono-xs">Contents.toc</span>
        <span aria-hidden className="mono-xs text-muted-foreground">§</span>
      </div>
      <ol className="max-h-[60vh] overflow-y-auto py-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block border-l-4 px-2 py-1 text-[13px] leading-snug transition-colors hover:bg-chrome",
                h.depth === 3 && "pl-5 text-[12.5px] text-muted-foreground",
                active === h.id ? "border-[var(--a)] bg-chrome font-semibold text-ink" : "border-transparent"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
