import { DATA } from "@/data/resume";
import Link from "next/link";
import { HalftoneBlobs } from "./decor";
import { Window } from "./window";
import { GliderWidget } from "./widgets";

export function SiteFooter() {
  const socials = Object.values(DATA.contact.social);
  return (
    <footer className="relative overflow-hidden bg-desk text-desk-ink">
      <HalftoneBlobs
        className="text-desk-ink"
        blobs={[
          { x: "-8%", y: "30%", size: "420px", opacity: 0.55 },
          { x: "70%", y: "-30%", size: "520px", opacity: 0.45 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-8">
        <p className="mono-xs mb-4">Let&apos;s build something</p>
        <a
          href={`mailto:${DATA.contact.email}`}
          className="font-display link-under block break-all text-[clamp(2.2rem,8vw,7.5rem)]"
        >
          {DATA.contact.email.replace("@gmail.com", "@")}
          <span className="opacity-50">gmail.com</span>
        </a>

        <div className="mt-16 grid gap-8 md:grid-cols-[1fr_auto]">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="border-l border-current pl-2">
              <div className="mono-xs mb-3">Site</div>
              <ul className="space-y-1 font-semibold">
                <li><Link className="hover:underline" href="/">Home</Link></li>
                <li><Link className="hover:underline" href="/blog">Thoughts</Link></li>
                <li><Link className="hover:underline" href="/resume">Resume</Link></li>
                <li><Link className="hover:underline" href="/write">Write</Link></li>
              </ul>
            </div>
            <div className="border-l border-current pl-2">
              <div className="mono-xs mb-3">Elsewhere</div>
              <ul className="space-y-1 font-semibold">
                {socials
                  .filter((s) => s.url.startsWith("http"))
                  .map((s) => (
                    <li key={s.name}>
                      <a className="hover:underline" href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="border-l border-current pl-2">
              <div className="mono-xs mb-3">Based in</div>
              <p className="font-semibold">{DATA.location}</p>
            </div>
            <div className="border-l border-current pl-2">
              <div className="mono-xs mb-3">Feeds</div>
              <ul className="space-y-1 font-semibold">
                <li><a className="hover:underline" href="/rss.xml">RSS</a></li>
                <li><a className="hover:underline" href="/Shubhr_Gunjan_Resume.pdf">Resume.pdf</a></li>
              </ul>
            </div>
          </div>
          <div className="flex items-end gap-4">
            <Window title="SG.OS" tone="pink" bodyClassName="px-2 py-1.5">
              <div className="mono-xs text-[#1e1e1e]">
                Version 2.0
                <br />©{new Date().getFullYear()} {DATA.name}.
                <br />
                Made in India. With Love.
              </div>
            </Window>
            <GliderWidget className="hidden sm:block" size={12} />
          </div>
        </div>
      </div>
    </footer>
  );
}
