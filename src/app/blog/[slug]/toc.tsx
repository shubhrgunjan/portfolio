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
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div className="h-full origin-left bg-ink" style={{ transform: `scaleX(${progress})` }} />
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
    <nav aria-label="Table of contents">
      <div className="mb-3 text-[13px] text-muted-foreground">On this page</div>
      <ol className="max-h-[65vh] space-y-0.5 overflow-y-auto border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l py-1 pl-3 text-[13px] leading-snug transition-colors duration-150",
                h.depth === 3 && "pl-6",
                active === h.id ? "border-ink text-ink" : "border-transparent text-muted-foreground hover:text-ink"
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
