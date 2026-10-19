/* eslint-disable @next/next/no-img-element */
import { Window, type WindowTone } from "@/components/os/window";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowUpRight, Info, Lightbulb, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const CALLOUTS = {
  note: { icon: Info, label: "Note", cls: "bg-sky text-[#16141f]" },
  tip: { icon: Lightbulb, label: "Tip", cls: "bg-lime text-[#16141f]" },
  warn: { icon: AlertTriangle, label: "Heads up", cls: "bg-orange text-[#16141f]" },
  insight: { icon: Sparkles, label: "Insight", cls: "bg-pink text-[#16141f]" },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof CALLOUTS;
  title?: string;
  children: ReactNode;
}) {
  const c = CALLOUTS[type] ?? CALLOUTS.note;
  const Icon = c.icon;
  return (
    <aside className="not-prose my-8 border border-ink bg-paper">
      <div className={cn("flex items-center gap-2 border-b border-ink px-3 py-1.5", c.cls)}>
        <Icon className="size-3.5" />
        <span className="mono-xs font-medium uppercase">{c.label}</span>
        {title && <span className="text-sm font-semibold tracking-tight">— {title}</span>}
      </div>
      <div className="prose-os prose max-w-none px-4 py-3 text-[15px] leading-relaxed text-ink-soft dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}

export function MdxWindow({
  title = "untitled.txt",
  tone = "paper",
  children,
}: {
  title?: string;
  tone?: WindowTone;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-8">
      <Window title={title} tone={tone} bodyClassName="px-4 py-3">
        <div className="prose-os prose max-w-none text-[15px] dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_*]:text-inherit">
          {children}
        </div>
      </Window>
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-10 grid grid-cols-2 border-l border-t border-ink sm:grid-cols-3">
      {children}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="group relative border-b border-r border-ink p-4 transition-colors hover:bg-[var(--a,var(--pink))] hover:text-[#16141f]">
      <div className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-none">{value}</div>
      <div className="mono-xs mt-3 opacity-80">{label}</div>
    </div>
  );
}

export function Pipeline({ children }: { children: ReactNode }) {
  return (
    <ol className="not-prose my-10 grid list-none gap-0 p-0 [counter-reset:step] sm:grid-flow-col sm:auto-cols-fr">
      {children}
    </ol>
  );
}

export function Step({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <li className="relative -mb-px border border-ink bg-paper p-3 [counter-increment:step] sm:-mr-px sm:mb-0">
      <div className="mb-6 flex items-center justify-between">
        <span className="mono-xs bg-ink px-1.5 py-[1px] text-paper before:content-['0'_counter(step)]" />
        <span aria-hidden className="mono-xs hidden opacity-50 sm:inline">
          →
        </span>
      </div>
      <div className="font-display text-xl leading-tight">{title}</div>
      {sub && <div className="mono-xs mt-1 text-[var(--a,var(--magenta))] brightness-75 dark:brightness-100">{sub}</div>}
      {children && <div className="mt-2 text-[13.5px] leading-snug text-ink-soft">{children}</div>}
    </li>
  );
}

export function Columns({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 grid gap-4 md:grid-cols-2">{children}</div>;
}

export function Column({
  title,
  tone = "paper",
  children,
}: {
  title: string;
  tone?: WindowTone;
  children: ReactNode;
}) {
  return (
    <Window title={title} tone={tone} bodyClassName="h-full px-4 py-3">
      <div className="prose-os prose max-w-none text-[15px] dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_*]:text-inherit">
        {children}
      </div>
    </Window>
  );
}

export function Figure({ src, alt = "", caption }: { src: string; alt?: string; caption?: string }) {
  return (
    <figure className="not-prose my-10">
      <Window title={caption ? alt || "figure" : alt || "figure"} tone="chrome" bodyClassName="p-0">
        {/\.(mp4|webm|mov)$/i.test(src) ? (
          <video src={src} className="block w-full" controls playsInline muted loop />
        ) : (
          <img src={src} alt={alt} className="block w-full" loading="lazy" />
        )}
      </Window>
      {caption && <figcaption className="mono-xs mt-3 text-muted-foreground">↳ {caption}</figcaption>}
    </figure>
  );
}

export function RepoCard({ repo, description }: { repo: string; description?: string }) {
  const [owner, name] = repo.split("/");
  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose group my-10 block border border-ink bg-ink text-paper shadow-[4px_4px_0_0_var(--a,var(--pink))] transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between border-b border-paper/20 px-3 py-1.5">
        <span className="mono-xs">github.com/{owner}</span>
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div className="px-3 py-4">
        <div className="font-display text-3xl">{name}</div>
        {description && <p className="mt-2 max-w-prose text-sm text-paper/70">{description}</p>}
        <div className="mono-xs mt-4 inline-block bg-[var(--a,var(--pink))] px-1.5 py-[2px] text-[#16141f]">
          $ git clone https://github.com/{repo}
        </div>
      </div>
    </a>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="mx-0.5 inline-block min-w-[1.6em] border border-ink bg-paper px-1.5 py-[1px] text-center font-mono text-[0.8em] font-medium text-ink shadow-[2px_2px_0_0_var(--ink)]">
      {children}
    </kbd>
  );
}

export function Mark({ children }: { children: ReactNode }) {
  return (
    <mark className="bg-[color-mix(in_oklab,var(--a,var(--pink))_55%,transparent)] px-0.5 text-inherit">
      {children}
    </mark>
  );
}
