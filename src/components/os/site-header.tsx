"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ArucoGlyph } from "./window";

const NAV = [
  { href: "/#projects", label: "Work" },
  { href: "/blog", label: "Thoughts" },
  { href: "/#experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/design", label: "Design" },
];

export function ThemeSwitch({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn("grid size-8 place-items-center border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper", className)}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function SiteHeader({ email }: { email: string }) {
  const pathname = usePathname();
  const [hover, setHover] = useState<string | null>(null);
  // The menu belongs to the page it was opened on, so navigating closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const active = NAV.find((n) => (n.href === "/blog" ? pathname.startsWith("/blog") : n.href === pathname))?.href;
  const indicator = hover ?? active;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-3 px-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2 font-semibold tracking-tight">
          <ArucoGlyph seed="Shubhr Gunjan" className="size-5 transition-transform duration-500 group-hover:rotate-90" />
          <span className="font-mono text-[12px] font-medium text-muted-foreground">SG//OS</span>
          <span className="hidden sm:inline">Shubhr Gunjan</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block" onMouseLeave={() => setHover(null)}>
          <ul className="flex items-center">
            {NAV.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() => setHover(item.href)}
                  className={cn(
                    "relative z-10 block px-3 py-1.5 text-sm font-medium transition-colors",
                    indicator === item.href ? "text-paper" : "text-ink-soft hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
                {indicator === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-ink"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Link
            href="/write"
            className="hidden h-8 items-center border border-ink/20 px-2.5 text-sm font-medium transition-colors hover:border-ink sm:flex"
          >
            Write
          </Link>
          <a
            href={`mailto:${email}`}
            className="group flex h-8 items-center gap-1 bg-uv px-3 text-sm font-semibold text-white transition-colors hover:bg-ink hover:text-paper"
          >
            Contact
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            className="grid size-8 place-items-center border border-ink/20 md:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <motion.div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-uv" style={{ scaleX: progress }} />

      {open && (
        <nav aria-label="Mobile" className="border-t border-ink/10 bg-paper md:hidden">
          {[...NAV, { href: "/write", label: "Write" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline justify-between border-b border-ink/10 px-4 py-3 font-display text-3xl hover:bg-lime hover:text-[#16141f]"
            >
              {item.label}
              <span className="mono-xs text-muted-foreground">0{i + 1}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
