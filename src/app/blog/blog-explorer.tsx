"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

type Item = { slug: string; title: string; summary: string; tags: string[]; kicker?: string };

/** Client-side search + tag filter over pre-rendered post cards. */
export function BlogExplorer({
  items,
  tags,
  cards,
}: {
  items: Item[];
  tags: { tag: string; count: number }[];
  cards: Record<string, ReactNode>;
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

  return (
    <div>
      <div className="sticky top-10 z-20 mb-10 border border-ink bg-paper shadow-[4px_4px_0_0_var(--ink)]">
        <div className="flex items-center justify-between bg-ink px-1.5 py-[3px] text-paper">
          <span className="mono-xs">Finder.app</span>
          <span className="mono-xs opacity-70">
            {visible.length}/{items.length} posts
          </span>
        </div>
        <div className="flex flex-col gap-2 p-2 md:flex-row md:items-center">
          <label className="flex flex-1 items-center gap-2 border border-ink bg-paper px-2">
            <Search className="size-4 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search robotics, qdrant, three.js…"
              className="h-9 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="scrollbar-none flex gap-1.5 overflow-x-auto md:max-w-[60%]">
            <button
              type="button"
              onClick={() => setTag(null)}
              className={cn(
                "mono-xs shrink-0 border border-ink px-2 py-1.5",
                !tag ? "bg-ink text-paper" : "hover:bg-pink hover:text-[#1e1e1e]"
              )}
            >
              all
            </button>
            {tags.map((t) => (
              <button
                key={t.tag}
                type="button"
                onClick={() => setTag(tag === t.tag ? null : t.tag)}
                className={cn(
                  "mono-xs shrink-0 border border-ink px-2 py-1.5",
                  tag === t.tag ? "bg-ink text-paper" : "hover:bg-pink hover:text-[#1e1e1e]"
                )}
              >
                #{t.tag} <span className="opacity-60">{t.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {visible.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <div key={p.slug} className="flex">
              {cards[p.slug]}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-ink p-12 text-center font-mono text-sm">
          No posts match. Try another query.
        </div>
      )}
    </div>
  );
}
