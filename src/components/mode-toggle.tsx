"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={cn("grid place-items-center", className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="hidden size-full dark:block" />
      <MoonIcon className="size-full dark:hidden" />
    </button>
  );
}
