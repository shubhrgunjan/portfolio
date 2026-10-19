import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { remarkCodeMeta } from "./src/lib/remark-code-meta";

const ACCENTS = ["pink", "sky", "violet", "lime", "orange", "mint", "magenta"] as const;

/** Headings for the table of contents, read from the raw MDX (ignoring fenced code). */
function extractHeadings(markdown: string) {
    const slugger = new GithubSlugger();
    const headings: { depth: number; text: string; id: string }[] = [];
    let inFence = false;
    for (const line of markdown.split("\n")) {
        if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
        if (inFence) continue;
        const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
        if (!match) continue;
        const text = match[2]
            .replace(/`([^`]+)`/g, "$1")
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            .replace(/[*_]/g, "");
        headings.push({ depth: match[1].length, text, id: slugger.slug(text) });
    }
    return headings;
}

function readingMinutes(markdown: string) {
    const words = markdown
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/<[^>]+>/g, " ")
        .split(/\s+/)
        .filter(Boolean).length;
    return Math.max(1, Math.round(words / 230));
}

const posts = defineCollection({
    name: "posts",
    directory: "content",
    include: "**/*.mdx",
    schema: z.object({
        title: z.string(),
        publishedAt: z.string(),
        updatedAt: z.string().optional(),
        author: z.string().optional(),
        summary: z.string(),
        kicker: z.string().optional(),
        tags: z.array(z.string()).default([]),
        accent: z.enum(ACCENTS).default("pink"),
        featured: z.number().optional(),
        repo: z.string().optional(),
        demo: z.string().optional(),
        image: z.string().optional(),
        draft: z.boolean().default(false),
        content: z.string(),
    }),
    transform: async (document, context) => {
        const mdx = await compileMDX(context, document, {
            remarkPlugins: [remarkGfm, remarkCodeMeta],
            rehypePlugins: [rehypeHeadingIds],
        });
        return {
            ...document,
            slug: document._meta.path.replace(/\.mdx$/, ""),
            headings: extractHeadings(document.content),
            readingTime: readingMinutes(document.content),
            mdx,
        };
    },
});

/** Adds GitHub-style ids to h2/h3 so the table of contents can link to them. */
function rehypeHeadingIds() {
    return (tree: any) => {
        const slugger = new GithubSlugger();
        const text = (node: any): string =>
            node.type === "text" ? node.value : (node.children ?? []).map(text).join("");
        const walk = (node: any) => {
            if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
                node.properties ||= {};
                node.properties.id ||= slugger.slug(text(node));
            }
            for (const child of node.children ?? []) walk(child);
        };
        walk(tree);
    };
}

export default defineConfig({
    collections: [posts],
});
