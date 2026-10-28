import { DATA } from "@/data/resume";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/resume", label: "Resume" },
];

const ELSEWHERE = [
  ...Object.values(DATA.contact.social).filter((s) => s.url.startsWith("http")),
  { name: "RSS", url: "/rss.xml" },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

/** Contact panel, then the site map: name and line, pages, and links elsewhere. */
export function SiteFooter() {
  return (
    <footer className="mx-auto mt-28 w-full max-w-2xl px-6 pb-28">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-10">
        <div className="dots pointer-events-none absolute inset-y-0 right-0 w-1/2 text-foreground/[0.07] [mask-image:linear-gradient(to_left,black,transparent)]" />
        <div className="relative">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Contact</div>
          <p className="mt-3 max-w-md text-balance font-heading text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
            Building something that has to work? <span className="text-muted-foreground">Let&apos;s talk.</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-brand px-5 text-sm font-medium text-brand-fg transition-opacity hover:opacity-85"
            >
              {DATA.contact.email} <ArrowUpRight className="size-4" />
            </a>
            <a
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-brand-soft"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-[1fr_auto_auto] sm:gap-16">
        <div className="col-span-2 sm:col-span-1">
          <div className="font-heading text-lg font-semibold tracking-tight">{DATA.name}</div>
          <p className="mt-1 max-w-[16rem] text-sm text-muted-foreground">
            Software engineer and B.Tech ECE student, {DATA.location.split(" / ")[0]}.
          </p>
        </div>
        <Column title="Pages">
          {PAGES.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="text-foreground/80 transition-colors hover:text-foreground">
                {p.label}
              </Link>
            </li>
          ))}
        </Column>
        <Column title="Elsewhere">
          {ELSEWHERE.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                {...(s.url.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {s.name}
              </a>
            </li>
          ))}
        </Column>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} {DATA.name}
        </span>
        <a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
          Back to top <ArrowUp className="size-3" />
        </a>
      </div>
    </footer>
  );
}
