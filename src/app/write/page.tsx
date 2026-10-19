import { PlotField } from "@/components/os/decor";
import { Window } from "@/components/os/window";
import { authConfigured, isAuthed } from "@/lib/auth";
import { listPostFiles, storeMode } from "@/lib/content-store";
import type { Metadata } from "next";
import { Editor } from "./editor";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Write",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function WritePage() {
  if (!authConfigured()) {
    return (
      <Shell>
        <Window title="Setup.txt" tone="paper" bodyClassName="p-5">
          <h1 className="font-display text-4xl">The editor isn&apos;t set up yet.</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Add these environment variables (in <code>.env.local</code> locally, or in Vercel → Settings →
            Environment Variables) and redeploy:
          </p>
          <pre className="mono-xs mt-4 overflow-x-auto border border-ink bg-chrome p-3 text-[12px]">
{`ADMIN_PASSWORD=choose-a-long-password
AUTH_SECRET=any-random-32+-char-string
# to publish from the live site (commits to your repo, Vercel redeploys):
GITHUB_TOKEN=github_pat_...   # fine-grained, Contents: read & write on this repo only
GITHUB_REPO=shubhrgunjan/portfolio
GITHUB_BRANCH=main`}
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">Full guide: docs/WRITING.md</p>
        </Window>
      </Shell>
    );
  }

  if (!(await isAuthed())) {
    return (
      <Shell>
        <LoginForm />
      </Shell>
    );
  }

  const mode = storeMode();
  const slugs = mode === "none" ? [] : await listPostFiles().catch(() => []);
  return (
    <div className="px-2 pb-6 pt-12 sm:px-4">
      <Editor slugs={slugs.sort()} mode={mode} />
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-32">
      <PlotField />
      <div className="relative w-full max-w-lg">{children}</div>
    </section>
  );
}
