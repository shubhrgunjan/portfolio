import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type WindowTone = "paper" | "chrome" | "pink" | "ink" | "sky" | "accent";

const TONES: Record<WindowTone, string> = {
  paper: "bg-paper text-ink",
  chrome: "bg-chrome text-ink",
  pink: "bg-pink text-[#1e1e1e]",
  ink: "bg-ink text-paper",
  sky: "bg-sky text-[#1e1e1e]",
  accent: "bg-[var(--a)] text-[#1e1e1e]",
};

/**
 * Retro OS window: black title bar in mono, a hard 1px frame and an inset
 * second frame, like the panels on typesafe.ai's desktop.
 */
export function Window({
  title,
  tone = "paper",
  meta,
  className,
  bodyClassName,
  children,
  inset = true,
}: {
  title?: ReactNode;
  tone?: WindowTone;
  meta?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children?: ReactNode;
  inset?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative border border-ink bg-paper shadow-[4px_4px_0_0_var(--ink)]",
        className
      )}
    >
      {title !== undefined && (
        <div className="flex items-center justify-between gap-3 bg-ink px-1.5 py-[3px] text-paper">
          <span className="mono-xs truncate">{title}</span>
          <span className="flex items-center gap-1.5">
            {meta && <span className="mono-xs opacity-70">{meta}</span>}
            <span aria-hidden className="size-2.5 border border-paper/80" />
          </span>
        </div>
      )}
      <div className={cn(inset && "m-[3px] border border-ink", TONES[tone], bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

/** Small inverted label chip, e.g. "String Tax" on typesafe.ai */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("mono-xs inline-block bg-ink px-1.5 py-[2px] text-paper", className)}>
      {children}
    </span>
  );
}
