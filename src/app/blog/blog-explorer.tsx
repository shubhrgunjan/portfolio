"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

type Item = { slug: string; title: string; summary: string; tags: string[]; kicker?: string };

/** Client-side search + tag filter over pre-rendered post rows. */
export function BlogExplorer({
  items,
  tags,
  rows,
}: {
  items: Item[];
  tags: { tag: string; count: number }[];
  rows: Record<string, ReactNode>;
}) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (p) =>
        (!tag || p.tags.includes(tag)) &&
        (!q || [p.title, p.summary, p.kicker ?? "", ...p.tags].join(" ").toLowerCase().includes(q))
    );
  }, [items, query, tag]);

  const chip = (on: boolean) =>
    cn(
      "press shrink-0 rounded-full px-3 py-1 text-[13px] transition-colors duration-150",
      on ? "bg-ink text-paper" : "bg-chrome text-ink-soft hover:bg-chrome-2 hover:text-ink"
    );

  return (
    <div>
      <label className="flex h-10 items-center gap-2 rounded-full bg-chrome px-4 transition-shadow focus-within:ring-1 focus-within:ring-ink/20">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts"
          aria-label="Search posts"
          className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
        />
        <span className="shrink-0 text-[12px] tabular-nums text-muted-foreground">
          {visible.length}/{items.length}
        </span>
      </label>

      <div className="scrollbar-none -mx-6 mt-3 flex gap-1.5 overflow-x-auto px-6">
        <button type="button" onClick={() => setTag(null)} className={chip(!tag)}>
          All
        </button>
        {tags.map((t) => (
          <button key={t.tag} type="button" onClick={() => setTag(tag === t.tag ? null : t.tag)} className={chip(tag === t.tag)}>
            {t.tag}
          </button>
        ))}
      </div>

      {visible.length ? (
        <div className="mt-8 divide-y divide-border">
          {visible.map((p) => (
            <div key={p.slug}>{rows[p.slug]}</div>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-[14px] text-muted-foreground">No posts match that. Try another word.</p>
      )}
    </div>
  );
}
