import { DATA } from "@/data/resume";

export function SiteFooter() {
  const socials = Object.values(DATA.contact.social).filter((s) => s.url.startsWith("http"));
  return (
    <footer className="mx-auto mt-32 max-w-5xl px-6">
      <div className="flex flex-col gap-4 border-t border-border py-8 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {DATA.name}
        </span>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                {s.name}
              </a>
            </li>
          ))}
          <li>
            <a href="/rss.xml" className="transition-colors hover:text-ink">
              RSS
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
