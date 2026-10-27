"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/resume", label: "Resume" },
];

const useMounted = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = useMounted() && resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="press grid size-8 place-items-center rounded-full text-[#9a9a9a] transition-colors hover:text-white"
    >
      {dark ? <Sun className="size-[15px]" /> : <Moon className="size-[15px]" />}
    </button>
  );
}

/** Floating dark pill, fixed top-centre. Same in both themes so it always reads as chrome. */
export function SiteNav({ email }: { email: string }) {
  const pathname = usePathname();
  const [hover, setHover] = useState<string | null>(null);
  const active = NAV.find((n) => (n.href === "/blog" ? pathname.startsWith("/blog") : n.href === pathname))?.href;
  const indicator = hover ?? active;

  return (
    <>
      {/* content fades out under the pill instead of colliding with it */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-paper to-transparent" />
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          onMouseLeave={() => setHover(null)}
          className="flex items-center gap-0.5 rounded-full bg-[#161616] p-1 text-[13px] font-medium shadow-[0_10px_40px_-12px_rgb(0_0_0/0.45)] ring-1 ring-white/[0.06] dark:bg-[#1a1a1a]"
        >
          <Link
            href="/"
            aria-label="Home"
            className="press grid h-8 place-items-center rounded-full px-3 font-semibold tracking-tight text-white"
          >
            SG
          </Link>
          <span aria-hidden className="mx-0.5 h-4 w-px bg-white/10" />
          <ul className="flex items-center">
            {NAV.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() => setHover(item.href)}
                  className={cn(
                    "press relative z-10 block rounded-full px-3 py-1.5 transition-colors duration-150",
                    indicator === item.href ? "text-white" : "text-[#9a9a9a]"
                  )}
                >
                  {item.label}
                </Link>
                {indicator === item.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-white/[0.09]"
                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                  />
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a
            href={`mailto:${email}`}
            className="press ml-0.5 rounded-full bg-[#3a3a3a] px-3.5 py-1.5 text-white transition-colors duration-150 hover:bg-[#4a4a4a]"
          >
            Contact
          </a>
        </nav>
      </header>
    </>
  );
}
