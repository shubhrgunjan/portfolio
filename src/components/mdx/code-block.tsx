"use client";

import { useState, useRef, useEffect, type ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { bundledLanguages, codeToHtml } from "shiki/bundle/web";
import { cn } from "@/lib/utils";

type CodeBlockProps = ComponentProps<"pre">;

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
        light: "github-light",
        dark: "github-dark",
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
    <div className="not-prose group relative my-8 border border-ink bg-paper">
      <div className="flex h-8 items-center justify-between gap-3 border-b border-ink bg-chrome px-2">
        <span className="mono-xs truncate">{title ?? `untitled.${lang === "plaintext" ? "txt" : lang}`}</span>
        <span className="flex items-center gap-2">
          <span className="mono-xs uppercase text-muted-foreground">{lang}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="mono-xs flex items-center gap-1 border border-ink bg-paper px-1.5 text-ink transition-colors hover:bg-lime hover:text-[#16141f]"
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
          "m-0! overflow-x-auto bg-paper! p-0!",
          props.className
        )}
      >
        {html ? (
          <code
            className={`shiki block min-w-max p-4 ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <div className="p-4">{children}</div>
        )}
      </pre>
    </div>
  );
}
