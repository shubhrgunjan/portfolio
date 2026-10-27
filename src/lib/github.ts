import "server-only";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type Contributions = {
  user: string;
  days: ContributionDay[];
  total: number;
  activeDays: number;
  longestStreak: number;
  currentStreak: number;
};

/**
 * Last year of public contributions, read from GitHub's own calendar fragment
 * (the same HTML the profile page embeds). No token needed; cached for 6 hours.
 * Returns null if GitHub is unreachable or the markup changes, so the page still renders.
 */
export async function getContributions(user: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: { Accept: "text/html" },
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // <td data-date="2026-10-26" id="contribution-day-component-0-52" data-level="2" …>
    const cells = new Map<string, { date: string; level: number }>();
    for (const m of html.matchAll(/<td[^>]*?data-date="(\d{4}-\d{2}-\d{2})"[^>]*?id="([^"]+)"[^>]*?data-level="(\d)"/g)) {
      cells.set(m[2], { date: m[1], level: Number(m[3]) });
    }
    // <tool-tip … for="contribution-day-component-0-52" …>3 contributions on October 26th.</tool-tip>
    const counts = new Map<string, number>();
    for (const m of html.matchAll(/<tool-tip[^>]*?for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      const n = m[2].match(/^(\d[\d,]*) contribution/);
      counts.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0);
    }
    if (!cells.size) return null;

    const days = [...cells.entries()]
      .map(([id, c]) => ({ date: c.date, level: Math.min(4, c.level) as ContributionDay["level"], count: counts.get(id) ?? 0 }))
      .sort((a, b) => a.date.localeCompare(b.date));

    let longest = 0;
    let run = 0;
    for (const d of days) {
      run = d.count > 0 ? run + 1 : 0;
      longest = Math.max(longest, run);
    }
    // today may still be empty; the streak is alive if yesterday counted
    let current = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) current++;
      else if (i === days.length - 1) continue;
      else break;
    }

    return {
      user,
      days,
      total: days.reduce((n, d) => n + d.count, 0),
      activeDays: days.filter((d) => d.count > 0).length,
      longestStreak: longest,
      currentStreak: current,
    };
  } catch {
    return null;
  }
}
