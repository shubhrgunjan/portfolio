import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CalibrationStrip } from "./decor";
import { ArucoGlyph } from "./window";

export function SiteFooter() {
  const socials = Object.values(DATA.contact.social).filter((s) => s.url.startsWith("http"));
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden className="absolute -right-40 -top-40 size-[520px] rounded-full bg-uv opacity-40 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-8">
        <p className="mono-xs mb-6 flex items-center gap-3">
          <span className="bg-lime px-1.5 text-[#16141f]">EOF</span>
          let&apos;s build something that moves
        </p>
        <a
          href={`mailto:${DATA.contact.email}`}
          className="group font-display flex items-start gap-3 break-all text-[clamp(2.2rem,7.5vw,7rem)] hover:text-lime"
        >
          {DATA.contact.email}
          <ArrowUpRight className="mt-[0.15em] size-[0.6em] shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>

        <div className="mt-20 grid gap-10 border-t border-paper/20 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mono-xs mb-3 text-paper/60">site</div>
            <ul className="space-y-1.5 font-medium">
              <li><Link className="hover:text-lime" href="/">Home</Link></li>
              <li><Link className="hover:text-lime" href="/blog">Thoughts</Link></li>
              <li><Link className="hover:text-lime" href="/resume">Resume</Link></li>
              <li><Link className="hover:text-lime" href="/design">Design system</Link></li>
            </ul>
          </div>
          <div>
            <div className="mono-xs mb-3 text-paper/60">elsewhere</div>
            <ul className="space-y-1.5 font-medium">
              {socials.map((s) => (
                <li key={s.name}>
                  <a className="hover:text-lime" href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono-xs mb-3 text-paper/60">feeds</div>
            <ul className="space-y-1.5 font-medium">
              <li><a className="hover:text-lime" href="/rss.xml">RSS</a></li>
              <li><a className="hover:text-lime" href="/Shubhr_Gunjan_Resume.pdf">Resume.pdf</a></li>
              <li><Link className="hover:text-lime" href="/write">Write</Link></li>
            </ul>
          </div>
          <div>
            <div className="mono-xs mb-3 text-paper/60">location</div>
            <p className="font-medium">{DATA.location}</p>
            <p className="mono-xs mt-1 text-paper/60">28.61°N 77.21°E</p>
          </div>
        </div>

        <CalibrationStrip compact className="mt-16 border-paper/30 [&>div]:border-paper/30" />
        <div className="mono-xs mt-4 flex flex-wrap items-center justify-between gap-3 text-paper/60">
          <span className="flex items-center gap-2">
            <ArucoGlyph seed="Shubhr Gunjan" className="text-paper" />
            SG//OS v2 “Calibration” · ©{new Date().getFullYear()} {DATA.name}
          </span>
          <span>designed &amp; built in India · no screenshots were harmed</span>
        </div>
      </div>
    </footer>
  );
}
