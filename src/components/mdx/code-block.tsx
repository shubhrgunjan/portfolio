"use client";

import { useState, useRef, useEffect, type ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { codeToHtml } from "shiki/bundle/web";
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
      lang: lang as any,
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
    <div className="not-prose group relative my-8 border border-ink bg-paper shadow-[4px_4px_0_0_var(--ink)]">
      <div className="flex items-center justify-between gap-3 bg-ink px-1.5 py-[3px] text-paper">
        <span className="mono-xs truncate">{title ?? `untitled.${lang === "plaintext" ? "txt" : lang}`}</span>
        <span className="flex items-center gap-2">
          <span className="mono-xs uppercase opacity-60">{lang}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="mono-xs flex items-center gap-1 bg-paper px-1.5 text-ink transition-colors hover:bg-pink"
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
          "m-[3px]! overflow-x-auto border border-ink bg-[#fafafa]! p-0! dark:bg-[#0b0b0b]!",
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
