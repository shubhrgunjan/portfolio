"use client";

import type { ComponentType } from "react";
import { ParallaxArt, VasimovArt } from "./robotics";
import { AndroPlayArt, AsimovTeleopArt, EdgeMedArt, ExelSnapArt, NyayaArt, UIKeyArt } from "./systems";
import { ArtfulEyeArt, EchoLoopArt, MintZoomArt, QuoraFormatterArt, RedditCoreArt, TjflowArt } from "./tools";

type Art = ComponentType<{ accent?: string }>;

/** Project / post slug → animated vector illustration. */
export const ART: Record<string, Art> = {
  "parallax-phone-video-to-digital-twin": ParallaxArt,
  "humanoid-robotics-mujoco-simulation": VasimovArt,
  "asimov-3d-teleoperation-controller": AsimovTeleopArt,
  "uikey-ui-extraction-for-ai": UIKeyArt,
  "air-gapped-edge-memory-qdrant": EdgeMedArt,
  "androplay-zero-lag-display-sync": AndroPlayArt,
  "ai-legal-accessibility-india": NyayaArt,
  "exelsnap-offline-spreadsheet-ai": ExelSnapArt,
  "tjflow-realtime-visual-workspace": TjflowArt,
  "echo-loop-temporal-puzzle-game": EchoLoopArt,
  "mint-zoom-smooth-gestures-linux": MintZoomArt,
  "reddit-core-archive-search": RedditCoreArt,
  "quoraformatter-writing-tools": QuoraFormatterArt,
  "the-artful-eye-visual-aesthetics": ArtfulEyeArt,
};

export function hasArt(slug: string) {
  return slug in ART;
}

export function ProjectArt({ slug, accent }: { slug: string; accent?: string }) {
  const Art = ART[slug];
  return Art ? <Art accent={accent} /> : null;
}
