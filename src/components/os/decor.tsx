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
  const puff = "animate-drift absolute rounded-full blur-[70px]";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0 h-full max-h-[1100px] overflow-hidden", className)}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${a} 0%, ${a} 35%, transparent 75%)`, opacity: 0.75 }} />
      <div className={cn(puff, "-left-[12%] -top-[18%] h-[520px] w-[46vw]")} style={{ background: b }} />
      <div className={cn(puff, "-right-[10%] -top-[12%] h-[560px] w-[44vw] [animation-delay:-8s]")} style={{ background: c }} />
      <div className={cn(puff, "left-[2%] top-[22%] h-[300px] w-[26vw] opacity-80 [animation-delay:-4s]")} style={{ background: c }} />
      <div className={cn(puff, "right-[4%] top-[26%] h-[320px] w-[28vw] opacity-80 [animation-delay:-12s]")} style={{ background: b }} />
      <div className={cn(puff, "left-[34%] top-[2%] h-[260px] w-[30vw] opacity-70 [animation-delay:-14s]")} style={{ background: d }} />
      <div className={cn(puff, "left-[20%] top-[8%] h-[220px] w-[18vw] bg-white/60 dark:bg-white/5")} />
      <div className={cn(puff, "right-[22%] top-[14%] h-[200px] w-[16vw] bg-white/50 dark:bg-white/5 [animation-delay:-6s]")} />
      {/* grain + dither */}
      <svg className="absolute inset-0 h-full w-full opacity-40 mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div className="dots absolute inset-x-0 top-0 h-[55%] text-white opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-b from-transparent via-paper/90 to-paper" />
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
