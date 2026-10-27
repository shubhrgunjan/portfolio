import {
  Callout,
  Column,
  Columns,
  Figure,
  Kbd,
  Mark,
  MdxWindow,
  Pipeline,
  RepoCard,
  Stat,
  StatGrid,
  Step,
} from "@/components/mdx/blocks";
import { CodeBlock } from "@/components/mdx/code-block";
import { MediaContainer } from "@/components/mdx/media-container";
import type { ComponentProps } from "react";

export const mdxComponents = {
  MediaContainer,
  Callout,
  Window: MdxWindow,
  StatGrid,
  Stat,
  Pipeline,
  Step,
  Columns,
  Column,
  Figure,
  RepoCard,
  Kbd,
  Mark,
  pre: (props: ComponentProps<"pre">) => <CodeBlock {...props} />,
  hr: () => (
    <div aria-hidden className="not-prose my-12 h-px bg-border" />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="not-prose-wrapper my-8 overflow-hidden rounded-[var(--radius)] border border-border">
      <div className="w-full overflow-x-auto">
        <table className="m-0! w-full min-w-full border-collapse" {...props} />
      </div>
    </div>
  ),
} as const;
