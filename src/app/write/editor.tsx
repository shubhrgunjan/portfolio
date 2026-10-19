"use client";

/* eslint-disable @next/next/no-img-element */
import { Figure } from "@/components/mdx/blocks";
import { PostCover } from "@/components/os/post-cover";
import { Tag, Window } from "@/components/os/window";
import { remarkCodeMeta } from "@/lib/remark-code-meta";
import { cn } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
import { evaluate } from "@mdx-js/mdx";
import { Download, Eye, FilePlus2, ImagePlus, LogOut, PenLine, Rocket, Columns2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition, type ComponentType } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import YAML from "yaml";
import { listPosts, loadPost, logout, publishPost, uploadAsset } from "./actions";

const ACCENTS = ["pink", "sky", "violet", "lime", "orange", "mint", "magenta"] as const;
type Accent = (typeof ACCENTS)[number];

type Meta = {
  title: string;
  slug: string;
  summary: string;
  kicker: string;
  tags: string;
  accent: Accent;
  featured: string;
  repo: string;
  demo: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  draft: boolean;
};

const today = () => new Date().toISOString().slice(0, 10);

const EMPTY_META: Meta = {
  title: "",
  slug: "",
  summary: "",
  kicker: "",
  tags: "",
  accent: "pink",
  featured: "",
  repo: "",
  demo: "",
  image: "",
  publishedAt: today(),
  updatedAt: "",
  draft: false,
};

const STARTER = `Open with the problem. What were you trying to build, and why was it hard?

## The shape of the system

<Pipeline>
  <Step title="Capture" sub="input">What comes in.</Step>
  <Step title="Process" sub="the clever bit" />
  <Step title="Ship" sub="output" />
</Pipeline>

<StatGrid>
  <Stat value="60 Hz" label="something you measured" />
  <Stat value="3" label="services" />
</StatGrid>

## The hard part

\`\`\`ts title="src/the-interesting-file.ts"
export function theTrick() {
  return "real code from the repo";
}
\`\`\`

<Callout type="insight" title="What I learned">
  The one thing you'd tell a friend.
</Callout>
`;

const SNIPPETS: { label: string; text: string; block?: boolean }[] = [
  { label: "H2", text: "\n## Heading\n", block: true },
  { label: "B", text: "**bold**" },
  { label: "Link", text: "[text](https://)" },
  { label: "`code`", text: "`code`" },
  { label: "Code", text: '\n```ts title="file.ts"\n\n```\n', block: true },
  { label: "Callout", text: '\n<Callout type="tip" title="Title">\n  Text\n</Callout>\n', block: true },
  { label: "Window", text: '\n<Window title="notes.txt" tone="pink">\n  Text\n</Window>\n', block: true },
  {
    label: "Stats",
    text: '\n<StatGrid>\n  <Stat value="42" label="label" />\n  <Stat value="7 ms" label="label" />\n  <Stat value="3x" label="label" />\n</StatGrid>\n',
    block: true,
  },
  {
    label: "Pipeline",
    text: '\n<Pipeline>\n  <Step title="One" sub="detail" />\n  <Step title="Two" sub="detail" />\n  <Step title="Three" sub="detail" />\n</Pipeline>\n',
    block: true,
  },
  {
    label: "Columns",
    text: '\n<Columns>\n  <Column title="Before" tone="ink">\n    Text\n  </Column>\n  <Column title="After" tone="pink">\n    Text\n  </Column>\n</Columns>\n',
    block: true,
  },
  { label: "Table", text: "\n| Col | Col |\n| --- | --- |\n| a | b |\n", block: true },
  { label: "Quote", text: "\n> A line worth remembering.\n", block: true },
  { label: "Kbd", text: "<Kbd>⌘</Kbd>" },
  { label: "Mark", text: "<Mark>highlight</Mark>" },
  { label: "Repo", text: '\n<RepoCard repo="shubhrgunjan/repo" description="One line." />\n', block: true },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function serialize(meta: Meta, body: string) {
  const lines = [
    `title: ${JSON.stringify(meta.title)}`,
    `publishedAt: ${JSON.stringify(meta.publishedAt || today())}`,
    meta.updatedAt && `updatedAt: ${JSON.stringify(meta.updatedAt)}`,
    `author: "Shubhr Gunjan"`,
    `summary: ${JSON.stringify(meta.summary)}`,
    meta.kicker && `kicker: ${JSON.stringify(meta.kicker)}`,
    `tags: ${JSON.stringify(parseTags(meta.tags))}`,
    `accent: ${JSON.stringify(meta.accent)}`,
    meta.featured && `featured: ${Number(meta.featured)}`,
    meta.repo && `repo: ${JSON.stringify(meta.repo)}`,
    meta.demo && `demo: ${JSON.stringify(meta.demo)}`,
    meta.image && `image: ${JSON.stringify(meta.image)}`,
    meta.draft && `draft: true`,
  ].filter(Boolean);
  return `---\n${lines.join("\n")}\n---\n\n${body.trim()}\n`;
}

function parse(raw: string, slug: string): { meta: Meta; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  const fm = (m ? YAML.parse(m[1]) : {}) ?? {};
  return {
    meta: {
      ...EMPTY_META,
      title: fm.title ?? "",
      slug,
      summary: fm.summary ?? "",
      kicker: fm.kicker ?? "",
      tags: (fm.tags ?? []).join(", "),
      accent: ACCENTS.includes(fm.accent) ? fm.accent : "pink",
      featured: fm.featured != null ? String(fm.featured) : "",
      repo: fm.repo ?? "",
      demo: fm.demo ?? "",
      image: fm.image ?? "",
      publishedAt: fm.publishedAt ?? today(),
      updatedAt: fm.updatedAt ?? "",
      draft: Boolean(fm.draft),
    },
    body: (m ? m[2] : raw).replace(/^\n+/, ""),
  };
}

function parseTags(s: string) {
  return s
    .split(",")
    .map((t) => slugify(t.trim()))
    .filter(Boolean);
}

const draftKey = (slug: string) => `sg-write:${slug || "__new"}`;

function readDraft(slug: string): { meta: Meta; body: string; savedAt: number } | null {
  try {
    const raw = localStorage.getItem(draftKey(slug));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

type View = "write" | "split" | "preview";

export function Editor({ slugs: initialSlugs, mode }: { slugs: string[]; mode: "github" | "fs" | "none" }) {
  const [slugs, setSlugs] = useState(initialSlugs);
  const [current, setCurrent] = useState<string | null>(null); // null = new post
  const [sha, setSha] = useState<string | undefined>();
  const [meta, setMeta] = useState<Meta>(EMPTY_META);
  const [body, setBody] = useState(STARTER);
  const [slugTouched, setSlugTouched] = useState(false);
  const [view, setView] = useState<View>("split");
  const [status, setStatus] = useState<{ tone: "ok" | "err" | "info"; text: string; href?: string } | null>(null);
  const [restorable, setRestorable] = useState<number | null>(null);
  const [localAssets, setLocalAssets] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const loaded = useRef(false);

  const slug = meta.slug;

  // restore an unsaved new-post draft after hydration (localStorage isn't available on the server)
  useEffect(() => {
    const id = setTimeout(() => {
      const d = readDraft("");
      if (d) {
        setMeta(d.meta);
        setBody(d.body);
        setSlugTouched(true);
      }
      loaded.current = true;
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // autosave locally
  useEffect(() => {
    if (!loaded.current) return;
    const id = setTimeout(() => {
      try {
        localStorage.setItem(draftKey(current ?? ""), JSON.stringify({ meta, body, savedAt: Date.now() }));
      } catch {}
    }, 500);
    return () => clearTimeout(id);
  }, [meta, body, current]);

  const set = <K extends keyof Meta>(k: K, v: Meta[K]) =>
    setMeta((m) => {
      const next = { ...m, [k]: v };
      if (k === "title" && !slugTouched && current === null) next.slug = slugify(String(v));
      return next;
    });

  const open = (target: string | null) => {
    setStatus(null);
    setRestorable(null);
    if (target === null) {
      setCurrent(null);
      setSha(undefined);
      const d = readDraft("");
      setMeta(d?.meta ?? { ...EMPTY_META, publishedAt: today() });
      setBody(d?.body ?? STARTER);
      setSlugTouched(Boolean(d));
      return;
    }
    startTransition(async () => {
      const res = await loadPost(target);
      if (!res) {
        setStatus({ tone: "err", text: `Couldn't load ${target}.` });
        return;
      }
      const parsed = parse(res.raw, target);
      setCurrent(target);
      setSha(res.sha);
      setMeta(parsed.meta);
      setBody(parsed.body);
      setSlugTouched(true);
      const d = readDraft(target);
      if (d && serialize(d.meta, d.body) !== serialize(parsed.meta, parsed.body)) setRestorable(d.savedAt);
    });
  };

  const insert = useCallback((text: string, block = false) => {
    const el = textarea.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const selected = value.slice(a, b);
    let snippet = text;
    if (selected && !block) {
      snippet = text
        .replace(/\*\*bold\*\*/, `**${selected}**`)
        .replace(/\[text\]/, `[${selected}]`)
        .replace(/`code`/, `\`${selected}\``)
        .replace(/>highlight</, `>${selected}<`);
    }
    const next = value.slice(0, a) + snippet + value.slice(b);
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = a + snippet.length;
    });
  }, []);

  const onUpload = async (file: File) => {
    if (!slug) {
      setStatus({ tone: "err", text: "Give the post a title/slug before uploading images." });
      return;
    }
    const base64 = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    setStatus({ tone: "info", text: `Uploading ${file.name}…` });
    const res = await uploadAsset({ slug, filename: file.name, base64 });
    if (!res.ok) {
      setStatus({ tone: "err", text: res.error });
      return;
    }
    setLocalAssets((m) => ({ ...m, [res.path]: URL.createObjectURL(file) }));
    insert(`\n<Figure src="${res.path}" alt="${file.name.replace(/\.[^.]+$/, "")}" caption="Caption" />\n`, true);
    setStatus({ tone: "ok", text: `Uploaded ${res.path}` });
  };

  const raw = useMemo(() => serialize(meta, body), [meta, body]);

  const publish = () => {
    if (!meta.title.trim() || !meta.summary.trim()) {
      setStatus({ tone: "err", text: "Title and summary are required." });
      return;
    }
    if (mode === "none") {
      download();
      return;
    }
    startTransition(async () => {
      const res = await publishPost({ slug, raw, sha: current === slug ? sha : undefined, isNew: current !== slug });
      if (!res.ok) {
        setStatus({ tone: "err", text: res.error });
        return;
      }
      try {
        localStorage.removeItem(draftKey(current ?? ""));
      } catch {}
      setSha(res.sha);
      setCurrent(slug);
      setSlugs(await listPosts().catch(() => slugs));
      setStatus({
        tone: "ok",
        text:
          mode === "github"
            ? "Committed. Vercel will redeploy in about a minute."
            : `Saved to content/${slug}.mdx. The dev server picks it up automatically.`,
        href: res.url ?? `/blog/${slug}`,
      });
    });
  };

  const download = () => {
    const blob = new Blob([raw], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${slug || "untitled"}.mdx`;
    a.click();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        publish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const words = body.split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col gap-3">
      {/* ----------------------------------------------------------- toolbar */}
      <Window
        title={`Write.app — ${current ? `${current}.mdx` : "new post"}`}
        meta={mode === "github" ? "→ GitHub" : mode === "fs" ? "→ local files" : "download only"}
        tone="paper"
        bodyClassName="flex flex-wrap items-center gap-2 p-2"
      >
        <select
          value={current ?? ""}
          onChange={(e) => open(e.target.value || null)}
          className="mono-xs h-8 max-w-[220px] border border-ink bg-paper px-1"
          aria-label="Open post"
        >
          <option value="">+ New post</option>
          {slugs.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => open(null)} className={btn} title="New post">
          <FilePlus2 className="size-3.5" /> New
        </button>

        <div className="ml-1 flex border border-ink">
          {(
            [
              ["write", PenLine],
              ["split", Columns2],
              ["preview", Eye],
            ] as const
          ).map(([v, Icon]) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={cn("mono-xs flex h-[30px] items-center gap-1 px-2", view === v && "bg-ink text-paper")}
            >
              <Icon className="size-3.5" /> {v}
            </button>
          ))}
        </div>

        <span className="mono-xs ml-auto hidden text-muted-foreground sm:inline">
          {words} words · ~{Math.max(1, Math.round(words / 230))} min · autosaved locally
        </span>
        <button type="button" onClick={download} className={btn} title="Download .mdx">
          <Download className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={publish}
          disabled={pending}
          className="flex h-8 items-center gap-1.5 bg-ink px-3 text-sm font-semibold text-paper hover:bg-lime hover:text-[#16141f] disabled:opacity-60"
        >
          <Rocket className="size-3.5" />
          {pending ? "Working…" : mode === "none" ? "Download" : current ? "Update" : "Publish"}
        </button>
        <button type="button" onClick={() => logout()} className={btn} title="Sign out">
          <LogOut className="size-3.5" />
        </button>
      </Window>

      {(status || restorable) && (
        <div
          className={cn(
            "mono-xs flex flex-wrap items-center gap-3 border border-ink px-3 py-2",
            status?.tone === "err" ? "bg-orange text-[#16141f]" : status?.tone === "ok" ? "bg-mint text-[#16141f]" : "bg-chrome"
          )}
        >
          {status && <span>{status.text}</span>}
          {status?.href && (
            <a href={status.href} target="_blank" rel="noopener noreferrer" className="underline">
              open →
            </a>
          )}
          {restorable && (
            <>
              <span>You have an unsaved local draft of this post from {new Date(restorable).toLocaleString()}.</span>
              <button
                type="button"
                className="underline"
                onClick={() => {
                  const d = readDraft(current ?? "");
                  if (d) {
                    setMeta(d.meta);
                    setBody(d.body);
                  }
                  setRestorable(null);
                }}
              >
                restore it
              </button>
            </>
          )}
        </div>
      )}

      {/* ----------------------------------------------------------- panes */}
      <div
        className={cn(
          "grid min-h-0 flex-1 gap-3",
          view === "split" && "lg:grid-cols-[280px_minmax(0,1fr)_minmax(0,1fr)]",
          view === "write" && "lg:grid-cols-[280px_minmax(0,1fr)]",
          view === "preview" && "grid-cols-1"
        )}
      >
        {view !== "preview" && (
          <Window title="Post.meta" tone="paper" className="min-h-0 overflow-hidden" bodyClassName="h-full overflow-y-auto p-3">
            <div className="flex flex-col gap-3 pb-6">
              <Field label="title">
                <textarea
                  rows={2}
                  value={meta.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={cn(input, "resize-none py-1.5 font-display text-lg")}
                  placeholder="A title worth clicking"
                />
              </Field>
              <Field label="slug" hint={current ? "renaming creates a new file" : undefined}>
                <input
                  value={meta.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", slugify(e.target.value));
                  }}
                  className={input}
                />
              </Field>
              <Field label="summary">
                <textarea
                  rows={3}
                  value={meta.summary}
                  onChange={(e) => set("summary", e.target.value)}
                  className={cn(input, "resize-none py-1.5")}
                />
              </Field>
              <Field label="kicker">
                <input value={meta.kicker} onChange={(e) => set("kicker", e.target.value)} className={input} placeholder="Robotics / Simulation" />
              </Field>
              <Field label="tags" hint="comma separated">
                <input value={meta.tags} onChange={(e) => set("tags", e.target.value)} className={input} placeholder="mujoco, robotics" />
              </Field>
              <Field label="accent">
                <div className="flex flex-wrap gap-1.5">
                  {ACCENTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      data-accent={a}
                      title={a}
                      onClick={() => set("accent", a)}
                      className={cn(
                        "size-7 border border-ink bg-[var(--a)]",
                        meta.accent === a && "shadow-[2px_2px_0_0_var(--ink)] outline outline-2 outline-offset-1 outline-ink"
                      )}
                    />
                  ))}
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="published">
                  <input type="date" value={meta.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} className={input} />
                </Field>
                <Field label="updated">
                  <input type="date" value={meta.updatedAt} onChange={(e) => set("updatedAt", e.target.value)} className={input} />
                </Field>
              </div>
              <Field label="featured rank" hint="1 = top of the blog; blank = by date">
                <input type="number" min={1} value={meta.featured} onChange={(e) => set("featured", e.target.value)} className={input} />
              </Field>
              <Field label="repo url">
                <input value={meta.repo} onChange={(e) => set("repo", e.target.value)} className={input} placeholder="https://github.com/…" />
              </Field>
              <Field label="demo url">
                <input value={meta.demo} onChange={(e) => set("demo", e.target.value)} className={input} />
              </Field>
              <Field label="cover image" hint="optional; otherwise a generated cover">
                <input value={meta.image} onChange={(e) => set("image", e.target.value)} className={input} placeholder="/blog/slug/cover.webp" />
              </Field>
              <label className="mono-xs flex items-center gap-2">
                <input type="checkbox" checked={meta.draft} onChange={(e) => set("draft", e.target.checked)} />
                draft (hidden from the blog)
              </label>
            </div>
          </Window>
        )}

        {view !== "preview" && (
          <Window title="body.mdx" tone="paper" className="flex min-h-[60vh] flex-col overflow-hidden lg:min-h-0" bodyClassName="flex min-h-0 flex-1 flex-col">
            <div className="scrollbar-none flex shrink-0 gap-1 overflow-x-auto border-b border-ink bg-chrome p-1.5">
              {SNIPPETS.map((s) => (
                <button key={s.label} type="button" onClick={() => insert(s.text, s.block)} className="mono-xs shrink-0 border border-ink bg-paper px-1.5 py-1 hover:bg-lime hover:text-[#16141f]">
                  {s.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="mono-xs flex shrink-0 items-center gap-1 border border-ink bg-ink px-1.5 py-1 text-paper hover:bg-lime hover:text-[#16141f]"
              >
                <ImagePlus className="size-3" /> Image
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="image/*,video/mp4,video/webm"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void onUpload(f);
                  e.target.value = "";
                }}
              />
            </div>
            <textarea
              ref={textarea}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  insert("  ");
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const f = e.dataTransfer.files?.[0];
                if (f) {
                  e.preventDefault();
                  void onUpload(f);
                }
              }}
              onPaste={(e) => {
                const f = e.clipboardData.files?.[0];
                if (f) {
                  e.preventDefault();
                  void onUpload(f);
                }
              }}
              spellCheck
              className="min-h-0 flex-1 resize-none bg-paper p-4 font-mono text-[13.5px] leading-relaxed outline-none"
              placeholder="Write in MDX. Drop or paste images here."
            />
          </Window>
        )}

        {view !== "write" && (
          <Window title="preview" meta={`/blog/${slug || "…"}`} tone="paper" className="min-h-[60vh] overflow-hidden lg:min-h-0" bodyClassName="h-full overflow-y-auto">
            <Preview meta={meta} body={body} assets={localAssets} />
          </Window>
        )}
      </div>
    </div>
  );
}

function Preview({ meta, body, assets }: { meta: Meta; body: string; assets: Record<string, string> }) {
  const [Content, setContent] = useState<ComponentType<{ components: typeof mdxComponents }> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = setTimeout(async () => {
      try {
        const mod = await evaluate(body, {
          ...(runtime as unknown as Parameters<typeof evaluate>[1]),
          remarkPlugins: [remarkGfm, remarkCodeMeta],
        });
        if (!cancelled) {
          setContent(() => mod.default as ComponentType<{ components: typeof mdxComponents }>);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [body]);

  const components = useMemo(
    () => ({
      ...mdxComponents,
      Figure: (p: Parameters<typeof Figure>[0]) => <Figure {...p} src={assets[p.src] ?? p.src} />,
      img: (p: React.ComponentProps<"img">) => (
        <img {...p} src={typeof p.src === "string" ? assets[p.src] ?? p.src : p.src} alt={p.alt ?? ""} />
      ),
    }),
    [assets]
  );

  return (
    <div data-accent={meta.accent}>
      <div className="relative overflow-hidden border-b border-ink px-6 pb-8 pt-8">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {meta.kicker && <Tag>{meta.kicker}</Tag>}
          {parseTags(meta.tags).map((t) => (
            <span key={t} className="mono-xs bg-chrome px-1.5 py-[2px]">
              #{t}
            </span>
          ))}
        </div>
        <h1 className="font-display text-[clamp(2rem,4vw,3.6rem)]">{meta.title || "Untitled post"}</h1>
        {meta.summary && <p className="mt-4 max-w-xl font-medium leading-snug text-ink-soft">{meta.summary}</p>}
      </div>
      <PostCover slug={meta.slug || "untitled"} accent={meta.accent} image={meta.image ? assets[meta.image] ?? meta.image : undefined} className="aspect-[21/7] border-b border-ink" />
      <div className="px-6 py-8">
        {error ? (
          <div className="border border-ink bg-orange p-3 font-mono text-xs text-[#16141f]">
            <div className="mb-1 font-bold">MDX error</div>
            {error}
          </div>
        ) : null}
        <article className={cn("prose prose-os max-w-none dark:prose-invert", error && "opacity-40")}>
          {Content && <Content components={components} />}
        </article>
      </div>
    </div>
  );
}

const btn = "flex h-8 items-center gap-1 border border-ink bg-paper px-2 text-sm hover:bg-lime hover:text-[#16141f]";
const input = "h-8 w-full border border-ink bg-paper px-2 text-sm outline-none focus:shadow-[3px_3px_0_0_var(--uv)]";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="mono-xs flex justify-between">
        <span>{label}</span>
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
