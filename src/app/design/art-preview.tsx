"use client";

import { ART, ProjectArt } from "@/components/art";

const ACCENTS: Record<string, string> = {
  "parallax-phone-video-to-digital-twin": "pink",
  "humanoid-robotics-mujoco-simulation": "sky",
  "asimov-3d-teleoperation-controller": "violet",
  "uikey-ui-extraction-for-ai": "lime",
  "air-gapped-edge-memory-qdrant": "mint",
  "androplay-zero-lag-display-sync": "orange",
  "ai-legal-accessibility-india": "pink",
  "exelsnap-offline-spreadsheet-ai": "orange",
  "tjflow-realtime-visual-workspace": "sky",
  "echo-loop-temporal-puzzle-game": "violet",
  "mint-zoom-smooth-gestures-linux": "mint",
  "reddit-core-archive-search": "orange",
  "quoraformatter-writing-tools": "pink",
  "the-artful-eye-visual-aesthetics": "magenta",
};

export function ArtPreview({ slug }: { slug: string }) {
  return (
    <figure className="border border-ink">
      <div className="aspect-[16/9]">
        <ProjectArt slug={slug} accent={ACCENTS[slug] ?? "pink"} />
      </div>
      <figcaption className="mono-xs border-t border-ink px-2 py-1">{slug}</figcaption>
    </figure>
  );
}

export function ArtGallery() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Object.keys(ART).map((slug) => (
        <ArtPreview key={slug} slug={slug} />
      ))}
    </div>
  );
}
