import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Where posts are read from and written to.
 * - "github": commits through the GitHub contents API (production; Vercel redeploys on push)
 * - "fs": writes straight into ./content and ./public (local `pnpm dev` only)
 * - "none": not configured; the editor still previews and can download the .mdx
 */
export type StoreMode = "github" | "fs" | "none";

export function storeMode(): StoreMode {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) return "github";
  if (process.env.NODE_ENV === "development") return "fs";
  return "none";
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const ROOT = process.cwd();
const branch = () => process.env.GITHUB_BRANCH || "main";

async function gh(pathname: string, init?: RequestInit) {
  const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${pathname}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
    cache: "no-store",
  });
  return res;
}

export async function listPostFiles(): Promise<string[]> {
  const mode = storeMode();
  if (mode === "github") {
    const res = await gh(`content?ref=${branch()}`);
    if (!res.ok) throw new Error(`GitHub list failed (${res.status})`);
    const items = (await res.json()) as { name: string; type: string }[];
    return items.filter((i) => i.type === "file" && i.name.endsWith(".mdx")).map((i) => i.name.replace(/\.mdx$/, ""));
  }
  if (mode === "fs") {
    const names = await fs.readdir(path.join(ROOT, "content"));
    return names.filter((n) => n.endsWith(".mdx")).map((n) => n.replace(/\.mdx$/, ""));
  }
  return [];
}

export async function readPostFile(slug: string): Promise<{ raw: string; sha?: string } | null> {
  if (!SLUG_RE.test(slug)) throw new Error("Invalid slug");
  const mode = storeMode();
  if (mode === "github") {
    const res = await gh(`content/${slug}.mdx?ref=${branch()}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
    const data = (await res.json()) as { content: string; sha: string };
    return { raw: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
  }
  if (mode === "fs") {
    try {
      return { raw: await fs.readFile(path.join(ROOT, "content", `${slug}.mdx`), "utf8") };
    } catch {
      return null;
    }
  }
  return null;
}

async function writeFile(repoPath: string, base64: string, message: string, sha?: string) {
  const mode = storeMode();
  if (mode === "github") {
    if (sha === undefined) {
      // Look up the current sha so updates to an existing file don't 409
      const head = await gh(`${repoPath}?ref=${branch()}`);
      if (head.ok) sha = ((await head.json()) as { sha: string }).sha;
    }
    const res = await gh(repoPath, {
      method: "PUT",
      body: JSON.stringify({ message, content: base64, branch: branch(), ...(sha && { sha }) }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`GitHub commit failed (${res.status}): ${body.slice(0, 200)}`);
    }
    const data = (await res.json()) as { commit: { html_url: string }; content: { sha: string } };
    return { url: data.commit.html_url, sha: data.content.sha };
  }
  if (mode === "fs") {
    const abs = path.join(ROOT, repoPath);
    if (!abs.startsWith(path.join(ROOT, "content")) && !abs.startsWith(path.join(ROOT, "public", "blog"))) {
      throw new Error("Refusing to write outside content/ and public/blog/");
    }
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, Buffer.from(base64, "base64"));
    return { url: null, sha: undefined };
  }
  throw new Error("Publishing is not configured. Set GITHUB_TOKEN and GITHUB_REPO.");
}

export function savePostFile(slug: string, raw: string, sha?: string, isNew = false) {
  if (!SLUG_RE.test(slug)) throw new Error("Invalid slug");
  return writeFile(
    `content/${slug}.mdx`,
    Buffer.from(raw, "utf8").toString("base64"),
    `${isNew ? "post" : "edit"}: ${slug}`,
    sha
  );
}

export function saveAsset(slug: string, filename: string, base64: string) {
  if (!SLUG_RE.test(slug)) throw new Error("Invalid slug");
  const clean = filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!/\.(png|jpe?g|webp|gif|svg|avif|mp4|webm)$/.test(clean)) throw new Error("Unsupported file type");
  return writeFile(`public/blog/${slug}/${clean}`, base64, `asset: ${slug}/${clean}`).then((r) => ({
    ...r,
    publicPath: `/blog/${slug}/${clean}`,
  }));
}
