"use client";

import { arucoBits } from "@/lib/aruco";
import { cn } from "@/lib/utils";
import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";

/** Unique pattern ids for the current <ArtFrame>, so many arts can share a page. */
const ArtIds = createContext({ dots: "", grid: "", hatch: "", checker: "" });
export const useArtIds = () => useContext(ArtIds);

export const INK = "var(--art-ink)";
export const PAPER = "var(--art-paper)";
export const ACCENT = "var(--a)";
export const MONO = "var(--font-mono)";

/**
 * 16:9 SVG canvas for project art. Accent background, ink strokes, paper fills.
 * Ambient animations only run while the frame is on screen.
 */
export function ArtFrame({
  children,
  label,
  className,
  accent,
  background = true,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
  accent?: string;
  background?: boolean;
}) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ids = { dots: `d${raw}`, grid: `g${raw}`, hatch: `h${raw}`, checker: `c${raw}` };
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 225"
      data-accent={accent}
      data-inview={inView}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      className={cn("art block h-full w-full [--art-ink:#16141f] [--art-paper:#fafaf7]", className)}
      fill="none"
      stroke={INK}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <pattern id={ids.dots} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.9" fill={INK} stroke="none" />
        </pattern>
        <pattern id={ids.grid} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" stroke={INK} strokeOpacity="0.14" strokeWidth="0.75" />
        </pattern>
        <pattern id={ids.hatch} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V5" stroke={INK} strokeWidth="1" />
        </pattern>
        <pattern id={ids.checker} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill={INK} stroke="none" />
          <rect x="6" y="6" width="6" height="6" fill={INK} stroke="none" />
        </pattern>
      </defs>
      <ArtIds.Provider value={ids}>
        {background && (
          <>
            <rect width="400" height="225" fill={ACCENT} stroke="none" />
            <rect width="400" height="225" fill={`url(#${ids.grid})`} stroke="none" />
          </>
        )}
        {children}
      </ArtIds.Provider>
    </svg>
  );
}

/** Mono annotation, e.g. "fig. 01 — route A*". */
export function Note({ x, y, children, anchor = "start", size = 9 }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; size?: number }) {
  return (
    <text x={x} y={y} fill={INK} stroke="none" fontFamily={MONO} fontSize={size} textAnchor={anchor} letterSpacing="0.02em">
      {children}
    </text>
  );
}

/** Inverted label chip. */
export function Chip({ x, y, children, w }: { x: number; y: number; children: string; w?: number }) {
  const width = w ?? children.length * 5.6 + 8;
  return (
    <g>
      <rect x={x} y={y} width={width} height={12} fill={INK} stroke="none" />
      <text x={x + 4} y={y + 8.8} fill={PAPER} stroke="none" fontFamily={MONO} fontSize={8.5}>
        {children}
      </text>
    </g>
  );
}

/** Engineering dimension line with end ticks and a centered label. */
export function Dim({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  const mid = (x1 + x2) / 2;
  const half = label.length * 2.8 + 4;
  return (
    <g strokeWidth={0.9}>
      <path d={`M${x1} ${y - 4}V${y + 4}M${x2} ${y - 4}V${y + 4}`} />
      <path d={`M${x1} ${y}H${mid - half}M${mid + half} ${y}H${x2}`} />
      <path d={`M${x1 + 5} ${y - 2.5}L${x1} ${y}L${x1 + 5} ${y + 2.5}M${x2 - 5} ${y - 2.5}L${x2} ${y}L${x2 - 5} ${y + 2.5}`} />
      <Note x={mid} y={y + 3} anchor="middle" size={8}>
        {label}
      </Note>
    </g>
  );
}

/** Registration crosshair. */
export function Cross({ x, y, r = 6 }: { x: number; y: number; r?: number }) {
  return (
    <g strokeWidth={0.9}>
      <circle cx={x} cy={y} r={r * 0.55} />
      <path d={`M${x - r} ${y}H${x + r}M${x} ${y - r}V${y + r}`} />
    </g>
  );
}

/** Deterministic ArUco-style fiducial (4x4 inner bits) seeded by a string. */
export function Aruco({ x, y, size = 24, seed }: { x: number; y: number; size?: number; seed: string }) {
  const bits = arucoBits(seed);
  const c = size / 6;
  return (
    <g stroke="none">
      <rect x={x} y={y} width={size} height={size} fill={INK} />
      {bits.map((on, i) =>
        on ? <rect key={i} x={x + c * (1 + (i % 4))} y={y + c * (1 + Math.floor(i / 4))} width={c} height={c} fill={PAPER} /> : null
      )}
    </g>
  );
}

/** Small checkerboard calibration target. */
export function Checker({ x, y, cols = 5, rows = 4, cell = 8 }: { x: number; y: number; cols?: number; rows?: number; cell?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={cols * cell} height={rows * cell} fill={PAPER} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return (c + r) % 2 === 0 ? (
          <rect key={i} x={x + c * cell} y={y + r * cell} width={cell} height={cell} fill={INK} stroke="none" />
        ) : null;
      })}
      <rect x={x} y={y} width={cols * cell} height={rows * cell} />
    </g>
  );
}

/** Halftone-shaded circle (a "sphere") */
export function Sphere({ cx, cy, r, opacity = 1 }: { cx: number; cy: number; r: number; opacity?: number }) {
  const ids = useArtIds();
  const gid = `${ids.dots}-m${Math.round(cx)}${Math.round(cy)}`;
  return (
    <g opacity={opacity}>
      <defs>
        <radialGradient id={`${gid}-g`} cx="0.35" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </radialGradient>
        <mask id={gid}>
          <circle cx={cx} cy={cy} r={r} fill={`url(#${gid}-g)`} />
        </mask>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${ids.dots})`} stroke="none" mask={`url(#${gid})`} />
    </g>
  );
}
