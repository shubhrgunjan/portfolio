/* eslint-disable @next/next/no-img-element */
import type { WindowTone } from "@/components/os/window";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowUpRight, Info, Lightbulb, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const CALLOUTS = {
  note: { icon: Info, label: "Note" },
  tip: { icon: Lightbulb, label: "Tip" },
  warn: { icon: AlertTriangle, label: "Heads up" },
  insight: { icon: Sparkles, label: "Insight" },
} as const;

const proseInner =
  "prose-os prose max-w-none text-[15px] leading-relaxed dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0";

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
    <aside className="not-prose my-8 rounded-[var(--radius)] bg-chrome px-5 py-4">
      <div className="mb-2 flex items-center gap-2 text-[13px]">
        <Icon className="size-3.5 text-ink" />
        <span className="font-medium text-ink">{c.label}</span>
        {title && <span className="text-muted-foreground">{title}</span>}
      </div>
      <div className={cn(proseInner, "text-ink-soft")}>{children}</div>
    </aside>
  );
}

/** Titled panel. `tone` is accepted for older posts and ignored: every panel is the same quiet grey. */
export function MdxWindow({ title, children }: { title?: string; tone?: WindowTone; children: ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-[var(--radius)] border border-border px-5 py-4">
      {title && <div className="mb-2 font-mono text-[12px] text-muted-foreground">{title}</div>}
      <div className={proseInner}>{children}</div>
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose my-10 grid grid-cols-2 gap-2 sm:grid-cols-3">{children}</div>;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[var(--radius)] bg-chrome p-4">
      <div className="text-[clamp(1.5rem,3.4vw,2rem)] font-semibold leading-none tracking-[-0.035em] text-ink">{value}</div>
      <div className="mt-2.5 text-[13px] leading-snug text-muted-foreground">{label}</div>
    </div>
  );
}

export function Pipeline({ children }: { children: ReactNode }) {
  return (
    <ol className="not-prose my-10 grid list-none grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-2 p-0 [counter-reset:step]">
      {children}
    </ol>
  );
}

export function Step({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <li className="rounded-[var(--radius)] bg-chrome p-4 [counter-increment:step]">
      <span className="font-mono text-[12px] tabular-nums text-muted-foreground before:content-['0'_counter(step)]" />
      <div className="mt-3 text-[15px] font-semibold leading-tight tracking-[-0.01em] text-ink">{title}</div>
      {sub && <div className="mt-1 text-[12.5px] text-muted-foreground">{sub}</div>}
      {children && <div className="mt-2 text-[13px] leading-snug text-ink-soft">{children}</div>}
    </li>
  );
}

export function Columns({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 grid gap-3 md:grid-cols-2">{children}</div>;
}

export function Column({ title, children }: { title: string; tone?: WindowTone; children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius)] border border-border px-5 py-4">
      <div className="mb-2 text-[14px] font-medium text-ink">{title}</div>
      <div className={proseInner}>{children}</div>
    </div>
  );
}

export function Figure({ src, alt = "", caption }: { src: string; alt?: string; caption?: string }) {
  return (
    <figure className="not-prose my-10">
      <div className="overflow-hidden rounded-[var(--radius)] bg-chrome">
        {/\.(mp4|webm|mov)$/i.test(src) ? (
          <video src={src} className="block w-full" controls playsInline muted loop />
        ) : (
          <img src={src} alt={alt} className="block w-full" loading="lazy" />
        )}
      </div>
      {caption && <figcaption className="mt-3 text-[13px] text-muted-foreground">{caption}</figcaption>}
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
      className="not-prose group my-10 block rounded-[var(--radius)] border border-border p-5 transition-colors duration-150 hover:bg-chrome"
    >
      <div className="flex items-center justify-between text-[13px] text-muted-foreground">
        <span>github.com/{owner}</span>
        <ArrowUpRight className="size-4 transition-colors group-hover:text-ink" />
      </div>
      <div className="mt-2 text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">{name}</div>
      {description && <p className="mt-1 max-w-prose text-[14px] text-ink-soft">{description}</p>}
      <code className="mt-4 inline-block rounded-md bg-chrome px-2 py-1 font-mono text-[12px] text-ink-soft group-hover:bg-paper">
        git clone https://github.com/{repo}
      </code>
    </a>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="mx-0.5 inline-block min-w-[1.6em] rounded-md border border-border bg-chrome px-1.5 py-[1px] text-center font-mono text-[0.8em] font-medium text-ink shadow-[0_1px_0_var(--border)]">
      {children}
    </kbd>
  );
}

export function Mark({ children }: { children: ReactNode }) {
  return <mark className="rounded-sm bg-chrome-2 px-0.5 text-inherit">{children}</mark>;
}
