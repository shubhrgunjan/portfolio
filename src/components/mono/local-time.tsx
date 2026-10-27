"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

/** Live local time in India; renders nothing until mounted so server and client agree. */
export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  return (
    <time dateTime={now.toISOString()} className="tabular-nums">
      {fmt.format(now)} IST
    </time>
  );
}
