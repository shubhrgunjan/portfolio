import { arucoBits } from "@/lib/aruco";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type WindowTone = "paper" | "chrome" | "pink" | "ink" | "sky" | "accent" | "lab";

const TONES: Record<WindowTone, string> = {
  paper: "bg-paper text-ink",
  chrome: "bg-chrome text-ink",
  pink: "bg-pink text-[#16141f]",
  ink: "bg-ink text-paper",
  sky: "bg-sky text-[#16141f]",
  accent: "bg-[var(--a)] text-[#16141f]",
  lab: "bg-lab text-ink",
};

/** ArUco-style fiducial seeded by a string: the Panel's "app icon". */
export function ArucoGlyph({ seed, className }: { seed: string; className?: string }) {
  const bits = arucoBits(seed);
  return (
    <span aria-hidden className={cn("grid size-3.5 shrink-0 grid-cols-6 grid-rows-6 bg-current p-0", className)}>
      {Array.from({ length: 36 }, (_, i) => {
        const r = Math.floor(i / 6);
        const c = i % 6;
        const inner = r > 0 && r < 5 && c > 0 && c < 5;
        const on = inner && bits[(r - 1) * 4 + (c - 1)];
        return <span key={i} className={on ? "bg-paper" : ""} />;
      })}
    </span>
  );
}

/** Registration crosshairs just outside each corner; they spread when the parent group is hovered. */
export function CornerMarks({ className }: { className?: string }) {
  const mark =
    "pointer-events-none absolute size-2.5 transition-transform duration-300 ease-out before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-current after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:-translate-y-1/2 after:bg-current";
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0 text-ink", className)}>
      <span className={cn(mark, "-left-[5px] -top-[5px] group-hover/panel:-translate-x-1 group-hover/panel:-translate-y-1")} />
      <span className={cn(mark, "-right-[5px] -top-[5px] group-hover/panel:translate-x-1 group-hover/panel:-translate-y-1")} />
      <span className={cn(mark, "-bottom-[5px] -left-[5px] group-hover/panel:-translate-x-1 group-hover/panel:translate-y-1")} />
      <span className={cn(mark, "-bottom-[5px] -right-[5px] group-hover/panel:translate-x-1 group-hover/panel:translate-y-1")} />
    </span>
  );
}

/**
 * Panel: the SG//OS container. Hairline ink frame, a header with an ArUco
 * glyph + label + readout, and registration marks outside the corners.
 */
export function Window({
  title,
  tone = "paper",
  meta,
  className,
  bodyClassName,
  children,
  marks = true,
}: {
  title?: ReactNode;
  tone?: WindowTone;
  meta?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children?: ReactNode;
  inset?: boolean;
  marks?: boolean;
}) {
  return (
    <div className={cn("group/panel relative border border-ink bg-paper", className)}>
      {marks && <CornerMarks />}
      {title !== undefined && (
        <div className="flex h-7 items-center justify-between gap-3 border-b border-ink bg-paper px-2 text-ink">
          <span className="flex min-w-0 items-center gap-2">
            <ArucoGlyph seed={typeof title === "string" ? title : "panel"} />
            <span className="mono-xs truncate font-medium">{title}</span>
          </span>
          {meta && <span className="mono-xs shrink-0 text-muted-foreground">{meta}</span>}
        </div>
      )}
      <div className={cn(TONES[tone], bodyClassName)}>{children}</div>
    </div>
  );
}

/** Label chip: ink outline, accent tick. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "mono-xs inline-flex items-center gap-1.5 border border-ink bg-paper px-1.5 py-[1px] text-ink",
        className
      )}
    >
      <span aria-hidden className="size-1.5 bg-[var(--a,var(--uv))]" />
      {children}
    </span>
  );
}
