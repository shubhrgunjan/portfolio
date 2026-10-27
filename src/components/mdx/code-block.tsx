"use client";

import { useState, useRef, useEffect, type ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { bundledLanguages, codeToHtml, type ThemeRegistration } from "shiki/bundle/web";
import { cn } from "@/lib/utils";

type CodeBlockProps = ComponentProps<"pre">;

/** Greyscale syntax themes: structure comes from weight of grey, not hue. */
function monoTheme(name: string, g: { fg: string; dim: string; soft: string; strong: string }): ThemeRegistration {
  return {
    name,
    type: name.endsWith("dark") ? "dark" : "light",
    colors: { "editor.foreground": g.fg, "editor.background": "#00000000" },
    tokenColors: [
      { settings: { foreground: g.fg } },
      { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: g.dim, fontStyle: "italic" } },
      { scope: ["string", "string.quoted", "markup.inline.raw"], settings: { foreground: g.soft } },
      { scope: ["keyword", "storage", "storage.type", "keyword.control", "keyword.operator.new"], settings: { foreground: g.strong, fontStyle: "bold" } },
      { scope: ["constant.numeric", "constant.language", "support.constant"], settings: { foreground: g.soft } },
      { scope: ["entity.name.function", "support.function", "entity.name.type", "entity.name.class"], settings: { foreground: g.strong } },
      { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: g.dim } },
    ],
  };
}
const MONO_LIGHT = monoTheme("mono-light", { fg: "#2b2b2b", dim: "#9a9a9a", soft: "#6b6b6b", strong: "#0a0a0a" });
const MONO_DARK = monoTheme("mono-dark", { fg: "#d4d4d4", dim: "#6b6b6b", soft: "#a3a3a3", strong: "#ffffff" });

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = className.match(/language-([a-z0-9-]+)/i);
  return match ? match[1] : "plaintext";
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [{ html, className, title }, setRenderState] = useState<{
    html: string;
    className: string;
    title: string | null;
  }>({ html: "", className: "", title: null });
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    const codeEl = pre?.querySelector("code");
    if (!pre || !codeEl) return;

    const codeText = codeEl.textContent || "";
    const lang = extractLanguage(codeEl.className);
    const nextTitle = codeEl.getAttribute("data-title");
    const nextClassName = codeEl.className || "";

    void codeToHtml(codeText, {
      lang: lang in bundledLanguages ? lang : "text",
      themes: {
        light: MONO_LIGHT,
        dark: MONO_DARK,
      },
      defaultColor: false,
    })
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        setRenderState({
          html: doc.querySelector("code")?.innerHTML ?? "",
          className: nextClassName,
          title: nextTitle,
        });
      })
      .catch((error) => {
        console.error("Failed to highlight code:", error);
        setRenderState({ html: "", className: nextClassName, title: nextTitle });
      });
  }, [children]);

  const handleCopy = async () => {
    const code = preRef.current?.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const lang = extractLanguage(className);

  return (
    <div className="not-prose group relative my-8 overflow-hidden rounded-[var(--radius)] bg-chrome">
      <div className="flex h-10 items-center justify-between gap-3 px-4">
        <span className="truncate font-mono text-[12px] text-muted-foreground">{title ?? (lang === "plaintext" ? "text" : lang)}</span>
        <span className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="press flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[12px] text-muted-foreground opacity-0 transition-[opacity,color] duration-150 hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
            aria-label="Copy code"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            {copied ? "copied" : "copy"}
          </button>
        </span>
      </div>
      <pre
        ref={preRef}
        {...props}
        className={cn(
          "m-0! overflow-x-auto bg-transparent! p-0!",
          props.className
        )}
      >
        {html ? (
          <code
            className={`shiki block min-w-max px-4 pb-4 pt-0.5 ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <div className="px-4 pb-4 pt-0.5">{children}</div>
        )}
      </pre>
    </div>
  );
}
