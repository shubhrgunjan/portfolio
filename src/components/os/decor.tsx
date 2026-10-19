import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

/** Four corner tick marks framing a block, as used around typesafe.ai headlines. */
export function Brackets({ children, className }: { children: ReactNode; className?: string }) {
  const corner = "pointer-events-none absolute size-2 border-current";
  return (
    <div className={cn("relative px-4 py-8 sm:px-8 sm:py-12", className)}>
      <span aria-hidden className={cn(corner, "left-0 top-0 border-l border-t")} />
      <span aria-hidden className={cn(corner, "right-0 top-0 border-r border-t")} />
      <span aria-hidden className={cn(corner, "bottom-0 left-0 border-b border-l")} />
      <span aria-hidden className={cn(corner, "bottom-0 right-0 border-b border-r")} />
      {children}
    </div>
  );
}

/** Mono caption with a vertical rule on the left, followed by body copy. */
export function RuleBlock({
  label,
  children,
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-l border-current pl-2", className)}>
      <div className="mono-xs mb-8 opacity-90">{label}</div>
      <div className="text-[15px] font-medium leading-snug tracking-[-0.01em]">{children}</div>
    </div>
  );
}

/** Vertical column of base64 text running up the page edge. */
export function Base64Rail({ text, className }: { text: string; className?: string }) {
  const encoded = Buffer.from(text).toString("base64");
  return (
    <div
      aria-hidden
      className={cn(
        "mono-xs pointer-events-none select-none whitespace-nowrap opacity-70 [writing-mode:vertical-rl] rotate-180",
        className
      )}
    >
      {encoded}
    </div>
  );
}

type Blob = { x: string; y: string; size: string; color?: string; opacity?: number };

/** Dithered halftone blobs, the big dotted spheres on the pink desktop. */
export function HalftoneBlobs({ blobs, className }: { blobs: Blob[]; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="dither absolute rounded-full"
          style={
            {
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              opacity: b.opacity ?? 1,
              background: `radial-gradient(circle at 50% 50%, ${b.color ?? "var(--dot)"} 0%, ${
                b.color ?? "var(--dot)"
              } 22%, transparent 70%)`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/**
 * The vibrant cloud gradient behind heroes: soft blobs of pink, magenta,
 * sky and violet with film grain, fading into paper at the bottom.
 */
export function CloudSky({
  className,
  palette = ["var(--sky)", "var(--magenta)", "var(--pink)", "var(--violet)"],
}: {
  className?: string;
  palette?: string[];
}) {
  const [a, b, c, d] = palette;
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0" style={{ background: a, opacity: 0.85 }} />
      <div
        className="animate-drift absolute -left-[10%] -top-[30%] h-[90%] w-[55%] rounded-full blur-3xl"
        style={{ background: b }}
      />
      <div
        className="animate-drift absolute -right-[8%] -top-[20%] h-[85%] w-[50%] rounded-full blur-3xl [animation-delay:-8s]"
        style={{ background: c }}
      />
      <div
        className="animate-drift absolute left-[30%] top-[5%] h-[55%] w-[40%] rounded-full opacity-80 blur-3xl [animation-delay:-14s]"
        style={{ background: d }}
      />
      <div className="absolute left-[18%] top-[12%] h-[40%] w-[30%] rounded-full bg-white/70 blur-3xl dark:bg-white/10" />
      {/* grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.35] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-b from-transparent via-paper/85 to-paper" />
    </div>
  );
}

/** "Introducing X ......... Y" dotted leader line */
export function Leader({ left, right, className }: { left: ReactNode; right: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-baseline justify-center gap-1.5 text-sm font-semibold sm:text-base", className)}>
      <span className="shrink-0">{left}</span>
      <span aria-hidden className="w-16 translate-y-[-3px] border-b-2 border-dotted border-current sm:w-24" />
      <span className="shrink-0">{right}</span>
    </div>
  );
}
