"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

function useInView<T extends Element>(once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return [ref, inView] as const;
}

/** "Settle": fade + rise when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <Tag ref={ref} data-inview={inView} className={cn("reveal", className)} style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

const GLYPHS = "▖▗▘▙▚▛▜▝▞▟░▒▓01<>/\\#*+=";

/** "Decode": mono text resolves from scrambled glyphs when it enters view (and on hover). */
export function Decode({ text, className, duration = 600 }: { text: string; className?: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [out, setOut] = useState(text);
  const frame = useRef(0);

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * text.length);
      setOut(
        text
          .split("")
          .map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(run, 0);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, text]);

  return (
    <span ref={ref} className={cn("inline-block whitespace-pre", className)} onMouseEnter={run} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/** Number that counts up when it scrolls into view. */
export function CountUp({ to, duration = 1400, pad = 0 }: { to: number; duration?: number; pad?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {String(n).padStart(pad, "0")}
    </span>
  );
}

/** Cycles through words with a vertical slot-machine roll. */
export function WordCycle({ words, className, interval = 2200 }: { words: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      <span className="invisible col-start-1 row-start-1">{longest}</span>
      {words.map((w, j) => (
        <span
          key={w}
          aria-hidden={j !== i}
          className="col-start-1 row-start-1 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.1,1)]"
          style={{ transform: `translateY(${j === i ? 0 : j < i ? -110 : 110}%)` }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

/** Live readout strip: real values only (cursor, scroll, IST clock). */
export function Telemetry({ items, className }: { items: { k: string; v: string }[]; className?: string }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const onMove = (e: PointerEvent) => setCursor({ x: e.clientX, y: e.clientY });
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false, timeZone: "Asia/Kolkata" }));
    const first = setTimeout(() => {
      tick();
      onScroll();
    }, 0);
    const id = setInterval(tick, 1000);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(first);
      clearInterval(id);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const live = [
    { k: "x", v: String(cursor.x).padStart(4, "0") },
    { k: "y", v: String(cursor.y).padStart(4, "0") },
    { k: "scroll", v: `${String(scroll).padStart(2, "0")}%` },
    { k: "ist", v: time },
    ...items,
  ];

  return (
    <div className={cn("mono-xs flex flex-wrap items-center gap-x-6 gap-y-1 tabular-nums", className)}>
      <span className="flex items-center gap-1.5">
        <span className="size-1.5 animate-pulse bg-signal" /> live
      </span>
      {live.map((r) => (
        <span key={r.k}>
          <span className="text-muted-foreground">{r.k}</span> {r.v}
        </span>
      ))}
    </div>
  );
}
