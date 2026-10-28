import { ArrowRight } from "lucide-react";
import Link from "next/link";

/** Template-style section header: a brand pill on a hairline, a heading, and an optional line of copy. */
export function SectionHeader({ pill, title, children }: { pill: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="flex w-full items-center">
        <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
        <div className="z-10 rounded-full border border-brand/30 bg-brand-soft px-3.5 py-1 text-[13px] font-medium text-brand">
          {pill}
        </div>
        <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
      </div>
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="max-w-xl text-balance text-center text-muted-foreground">{children}</p>}
    </div>
  );
}

/** "View all →" link that sends the reader to the page that holds the rest. */
export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-brand/40 hover:text-brand"
      >
        {children}
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
