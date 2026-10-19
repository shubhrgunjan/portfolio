import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

/** Four corner tick marks framing a block. */
export function Brackets({ children, className }: { children: ReactNode; className?: string }) {
  const corner = "pointer-events-none absolute size-3 border-current";
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

/** Mono caption over a rule, followed by body copy. */
export function RuleBlock({
  label,
  index,
  children,
  className,
}: {
  label: ReactNode;
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-current pt-2", className)}>
      <div className="mono-xs mb-6 flex justify-between opacity-90">
        <span>{label}</span>
        {index && <span>{index}</span>}
      </div>
      <div className="text-[15px] font-medium leading-snug tracking-[-0.01em]">{children}</div>
    </div>
  );
}

type Blob = { x: string; y: string; size: string; color?: string; opacity?: number };

/** Dithered halftone spheres. */
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

function lissajous(a: number, b: number, delta: number, cx: number, cy: number, rx: number, ry: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 720; i++) {
    const t = (i / 720) * Math.PI * 2;
    pts.push(`${(cx + rx * Math.sin(a * t + delta)).toFixed(1)} ${(cy + ry * Math.sin(b * t)).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

/**
 * Hero backdrop: an oscilloscope-style plot. Fine calibration grid, three
 * Lissajous traces that draw themselves in, a probe dot riding one trace,
 * and a soft colour field behind it.
 */
export function PlotField({ className, cx = 1060, cy = 430 }: { className?: string; cx?: number; cy?: number }) {
  const traces = [
    { d: lissajous(3, 2, Math.PI / 2, cx, cy, 300, 250), color: "var(--uv)", w: 1.6, delay: "0s" },
    { d: lissajous(5, 4, Math.PI / 4, cx, cy, 250, 210), color: "var(--pink)", w: 1.2, delay: ".35s" },
    { d: lissajous(1, 2, Math.PI / 3, cx, cy, 340, 280), color: "var(--ink)", w: 0.8, delay: ".7s" },
  ];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute right-[-10%] top-[-10%] h-[85%] w-[65%] rounded-full bg-lime opacity-60 blur-[110px] dark:opacity-25" />
      <div className="absolute right-[10%] top-[30%] h-[55%] w-[35%] rounded-full bg-violet opacity-40 blur-[110px] dark:opacity-30" />
      <div className="absolute right-[38%] top-[-5%] h-[40%] w-[25%] rounded-full bg-pink opacity-35 blur-[100px] dark:opacity-20" />
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMaxYMid slice"
        className="art absolute inset-0 hidden h-full w-full md:block"
        data-inview="true"
        fill="none"
      >
        <defs>
          <pattern id="plot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" stroke="var(--ink)" strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
          <radialGradient id="plot-fade" cx="0.72" cy="0.48" r="0.7">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="plot-mask">
            <rect width="1440" height="900" fill="url(#plot-fade)" />
          </mask>
        </defs>
        <g mask="url(#plot-mask)">
          <rect width="1440" height="900" fill="url(#plot-grid)" />
          <path d={`M${cx} 60V840M${cx - 420} ${cy}H${cx + 420}`} stroke="var(--ink)" strokeOpacity="0.25" strokeDasharray="2 6" />
        </g>
        {traces.map((t, i) => (
          <path
            key={i}
            d={t.d}
            stroke={t.color}
            strokeWidth={t.w}
            pathLength={1}
            className="art-draw"
            style={{ ["--d" as string]: t.delay, animationDuration: "3.2s" }}
            strokeOpacity={i === 2 ? 0.5 : 0.9}
          />
        ))}
        <circle r="6" fill="var(--paper)" stroke="var(--uv)" strokeWidth="2.5" className="art-path" style={{ offsetPath: `path('${traces[0].d}')`, ["--dur" as string]: "18s", animationTimingFunction: "linear" }} />
        <g stroke="var(--ink)" strokeWidth="1">
          <circle cx={cx} cy={cy} r="5" />
          <path d={`M${cx - 12} ${cy}H${cx + 12}M${cx} ${cy - 12}V${cy + 12}`} />
        </g>
        <text x={cx + 14} y={cy - 10} fill="var(--ink)" fontFamily="var(--font-mono)" fontSize="12" opacity="0.7">
          f(t) = (sin 3t, sin 2t)
        </text>
      </svg>
    </div>
  );
}

const SWATCHES = [
  { name: "uv", hex: "#6B4EFF", cls: "bg-uv" },
  { name: "lime", hex: "#C6F24E", cls: "bg-lime" },
  { name: "pink", hex: "#FF5FA2", cls: "bg-pink" },
  { name: "sky", hex: "#4FB3FF", cls: "bg-sky" },
  { name: "orange", hex: "#FF8A3D", cls: "bg-orange" },
  { name: "mint", hex: "#2ED3A0", cls: "bg-mint" },
  { name: "ink", hex: "#16141F", cls: "bg-ink" },
  { name: "paper", hex: "#FAFAF7", cls: "bg-paper" },
];

/** The brand mark: a colour-calibration chart. */
export function CalibrationStrip({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("grid grid-cols-4 border-l border-t border-ink sm:grid-cols-8", className)}>
      {SWATCHES.map((s) => (
        <div key={s.name} className="group border-b border-r border-ink">
          <div
            className={cn(
              s.cls,
              "origin-bottom transition-transform duration-300 group-hover:scale-y-110",
              compact ? "h-4" : "h-10 sm:h-14"
            )}
          />
          {!compact && (
            <div className="mono-xs flex justify-between gap-1 border-t border-ink bg-paper px-1.5 py-1">
              <span>{s.name}</span>
              <span className="hidden text-muted-foreground lg:inline">{s.hex}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Headline whose words rise from behind a mask, staggered. */
export function RiseText({ text, className, start = 0, step = 70 }: { text: string; className?: string; start?: number; step?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="rise-word">
          <span style={{ "--delay": `${start + i * step}ms` } as CSSProperties}>{w}</span>
          {" "}
        </span>
      ))}
    </span>
  );
}

/** HTML dimension line: |←—— label ——→| */
export function DimLine({ label, className }: { label: ReactNode; className?: string }) {
  return (
    <div aria-hidden className={cn("mono-xs flex items-center gap-2 text-muted-foreground", className)}>
      <span className="h-3 w-px bg-current" />
      <span className="-mr-2">←</span>
      <span className="h-px flex-1 bg-current" />
      <span className="shrink-0">{label}</span>
      <span className="h-px flex-1 bg-current" />
      <span className="-ml-2">→</span>
      <span className="h-3 w-px bg-current" />
    </div>
  );
}

/** Section header: index, decoded label, big title. */
export function Leader({ left, right, className }: { left: ReactNode; right: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-baseline gap-1.5 text-sm font-semibold sm:text-base", className)}>
      <span className="shrink-0">{left}</span>
      <span aria-hidden className="w-16 translate-y-[-3px] border-b-2 border-dotted border-current sm:w-24" />
      <span className="shrink-0">{right}</span>
    </div>
  );
}
