"use client";

import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

const NAV = [
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Thoughts" },
  { href: "/#experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
];

const tab =
  "inline-flex h-8 items-center bg-paper px-2 text-[15px] font-semibold tracking-[-0.02em] text-ink transition-colors hover:bg-ink hover:text-paper";

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
      className={cn(tab, "w-8 justify-center px-0", className)}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function SiteHeader({ email }: { email: string }) {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  const isActive = (href: string) =>
    href === "/blog" ? pathname.startsWith("/blog") : href === pathname;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-start justify-between gap-2 p-0">
        <Link href="/" className={cn(tab, "gap-1.5")}>
          <span className="font-mono text-[11px] font-medium">SG//</span>
          <span>Shubhr Gunjan</span>
        </Link>

        <nav aria-label="Primary" className="hidden gap-1.5 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(tab, "shadow-[0_0_0_1px_var(--hairline)]", isActive(item.href) && "bg-ink text-paper")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-1.5">
          <ThemeSwitch className="shadow-[0_0_0_1px_var(--hairline)]" />
          <Link href="/write" className={cn(tab, "hidden shadow-[0_0_0_1px_var(--hairline)] sm:inline-flex")}>
            Write
          </Link>
          <a href={`mailto:${email}`} className={cn(tab, "bg-ink text-paper hover:bg-pink hover:text-[#1e1e1e]")}>
            Contact
          </a>
          <button
            type="button"
            className={cn(tab, "w-8 justify-center px-0 md:hidden")}
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="mx-2 mt-2 border border-ink bg-paper shadow-[4px_4px_0_0_var(--ink)] md:hidden">
          <div className="bg-ink px-1.5 py-[3px] mono-xs text-paper">Menu.app</div>
          {[...NAV, { href: "/write", label: "Write" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block border-b border-ink/15 px-3 py-2.5 font-display text-2xl last:border-0 hover:bg-pink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
