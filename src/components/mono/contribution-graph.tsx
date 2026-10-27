"use client";

import type { Contributions } from "@/lib/github";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 26; // room for weekday labels
const TOP = 16; // room for month labels
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parse = (d: string) => new Date(`${d}T00:00:00Z`);
const label = (d: string) =>
  parse(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** GitHub-style contribution calendar drawn in the site's grey ramp. */
export function ContributionGraph({ data }: { data: Contributions }) {
  const { days, user } = data;
  const [hover, setHover] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), {
      rootMargin: "0px 0px -10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const offset = parse(days[0].date).getUTCDay(); // calendar columns start on Sunday
  const weeks = Math.ceil((days.length + offset) / 7);
  const width = LEFT + weeks * STEP - GAP;
  const height = TOP + 7 * STEP - GAP;

  const months: { x: number; text: string }[] = [];
  days.forEach((d, i) => {
    const date = parse(d.date);
    if (date.getUTCDate() !== 1) return;
    const col = Math.floor((i + offset) / 7);
    if (col > weeks - 2) return; // no label hanging off the right edge
    if (months.length && LEFT + col * STEP - months[months.length - 1].x < 3 * STEP) return; // too close to the last one
    months.push({ x: LEFT + col * STEP, text: MONTHS[date.getUTCMonth()] });
  });

  const h = hover !== null ? days[hover] : null;

  return (
    <div ref={ref}>
      <div className="mb-3 flex items-baseline justify-between gap-4 text-[13px]">
        <span className="text-ink">
          <span className="font-medium tabular-nums">{data.total.toLocaleString("en-US")}</span>{" "}
          <span className="text-muted-foreground">contributions in the last year</span>
        </span>
        <a
          href={`https://github.com/${user}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-0.5 text-muted-foreground transition-colors hover:text-ink"
        >
          @{user} <ArrowUpRight className="size-3" />
        </a>
      </div>

      {/* rtl scroller opens at the newest weeks on narrow screens */}
      <div dir="rtl" className="scrollbar-none -mx-1 overflow-x-auto px-1">
        <div dir="ltr">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="block h-auto w-full min-w-[500px]"
            role="img"
            aria-label={`${data.total} GitHub contributions in the last year`}
            onMouseLeave={() => setHover(null)}
          >
            {months.map((m) => (
              <text key={`${m.text}${m.x}`} x={m.x} y={9} className="fill-muted-foreground text-[9px]">
                {m.text}
              </text>
            ))}
            {["Mon", "Wed", "Fri"].map((d, i) => (
              <text key={d} x={0} y={TOP + (i * 2 + 1) * STEP + CELL - 2} className="fill-muted-foreground text-[9px]">
                {d}
              </text>
            ))}
            {days.map((d, i) => {
              const col = Math.floor((i + offset) / 7);
              const row = (i + offset) % 7;
              return (
                <rect
                  key={d.date}
                  x={LEFT + col * STEP}
                  y={TOP + row * STEP}
                  width={CELL}
                  height={CELL}
                  rx={2.5}
                  onMouseEnter={() => setHover(i)}
                  className={cn(
                    "transition-[opacity,stroke] duration-500",
                    shown ? "opacity-100" : "opacity-0",
                    hover === i ? "stroke-ink" : "stroke-transparent"
                  )}
                  style={{ fill: `var(--g${d.level})`, transitionDelay: shown ? `${col * 12}ms` : "0ms" }}
                >
                  <title>{`${d.count || "No"} contribution${d.count === 1 ? "" : "s"} on ${label(d.date)}`}</title>
                </rect>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 text-[12px] text-muted-foreground">
        <span className="min-h-[1lh] tabular-nums">
          {h ? (
            <>
              <span className="text-ink">{h.count || "No"}</span> contribution{h.count === 1 ? "" : "s"} on {label(h.date)}
            </>
          ) : (
            <>
              {data.activeDays} active days
              <span className="hidden sm:inline">
                <span className="mx-1 opacity-50">/</span> longest streak {data.longestStreak}{" "}
                {data.longestStreak === 1 ? "day" : "days"}
              </span>
            </>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-1">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="size-[10px] rounded-[2.5px]" style={{ background: `var(--g${l})` }} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
