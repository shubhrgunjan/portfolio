"use client";

import { useEffect, useRef, useState } from "react";
import { Window } from "./window";

export function ClockWidget({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <Window title="Clock Tool 1.1" tone="pink" className={className} bodyClassName="px-2 py-1.5">
      <div className="mono-xs min-h-[2.7em] text-[12px]">
        {now ? (
          <>
            <div>
              {now.toLocaleDateString("en-IN", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div>
              {now.toLocaleTimeString("en-IN", { hour12: false, timeZone: "Asia/Kolkata" })} IST
            </div>
          </>
        ) : (
          <div>--:--:--</div>
        )}
      </div>
    </Window>
  );
}

const CELL = 6;

/** Conway's Game of Life on a tiny canvas, seeded with gliders. */
export function GliderWidget({ className, size = 18 }: { className?: string; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let grid = new Uint8Array(size * size);
    const seed = () => {
      grid = new Uint8Array(size * size);
      const glider = [
        [1, 0],
        [2, 1],
        [0, 2],
        [1, 2],
        [2, 2],
      ];
      for (const [ox, oy] of [
        [1, 1],
        [8, 4],
        [3, 10],
      ]) {
        for (const [x, y] of glider) grid[(oy + y) * size + ox + x] = 1;
      }
    };
    seed();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let generation = 0;

    const draw = () => {
      const ink = getComputedStyle(canvas).color;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ink;
      for (let i = 0; i < grid.length; i++) {
        if (grid[i]) ctx.fillRect((i % size) * CELL + 1, Math.floor(i / size) * CELL + 1, CELL - 2, CELL - 2);
      }
    };

    const step = () => {
      const next = new Uint8Array(size * size);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          let n = 0;
          for (let dy = -1; dy <= 1; dy++)
            for (let dx = -1; dx <= 1; dx++) {
              if (dx || dy) n += grid[((y + dy + size) % size) * size + ((x + dx + size) % size)];
            }
          const alive = grid[y * size + x];
          next[y * size + x] = alive ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0;
        }
      }
      grid = next;
      if (++generation > 240 || !grid.some(Boolean)) {
        generation = 0;
        seed();
      }
      draw();
    };

    draw();
    if (reduced) return;
    const id = setInterval(step, 160);
    return () => clearInterval(id);
  }, [size]);

  return (
    <Window title="Glider 1.1" tone="pink" className={className} bodyClassName="p-1.5">
      <canvas
        ref={ref}
        width={size * CELL}
        height={size * CELL}
        className="block text-[#16141f]"
        aria-label="Conway's Game of Life animation"
      />
      <div className="mono-xs mt-1">Game of Life</div>
    </Window>
  );
}

/** Blinking terminal caret */
export function Caret() {
  return <span aria-hidden className="animate-blink ml-0.5 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-current" />;
}
