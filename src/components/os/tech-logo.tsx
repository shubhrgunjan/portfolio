import { cn } from "@/lib/utils";
import {
  siAndroid,
  siBluetooth,
  siCloudflare,
  siCplusplus,
  siDocker,
  siDuckdb,
  siElectron,
  siExpo,
  siFastapi,
  siFfmpeg,
  siFirebase,
  siGit,
  siGooglegemini,
  siJavascript,
  siKotlin,
  siLinuxmint,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siNvidia,
  siOnnx,
  siOpencv,
  siOpenjdk,
  siOpengl,
  siPostgresql,
  siPython,
  siPytorch,
  siQdrant,
  siReact,
  siRedis,
  siRust,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siWebassembly,
  siWebgl,
  type SimpleIcon,
} from "simple-icons";

export const TECH: Record<string, SimpleIcon> = {
  python: siPython,
  pytorch: siPytorch,
  numpy: siNumpy,
  onnx: siOnnx,
  opencv: siOpencv,
  nvidia: siNvidia,
  typescript: siTypescript,
  javascript: siJavascript,
  react: siReact,
  "react native": siReact,
  "react native / expo": siReact,
  "next.js": siNextdotjs,
  "node.js": siNodedotjs,
  "three.js": siThreedotjs,
  webgl: siWebgl,
  "three.js / webgl": siThreedotjs,
  opengl: siOpengl,
  "expo-gl": siOpengl,
  expo: siExpo,
  "expo sdk": siExpo,
  tailwindcss: siTailwindcss,
  electron: siElectron,
  duckdb: siDuckdb,
  fastapi: siFastapi,
  qdrant: siQdrant,
  "qdrant vector db": siQdrant,
  redis: siRedis,
  "redis streams": siRedis,
  "redis streams & pub/sub": siRedis,
  postgresql: siPostgresql,
  "postgresql / duckdb": siPostgresql,
  docker: siDocker,
  rust: siRust,
  kotlin: siKotlin,
  "kotlin / java": siKotlin,
  java: siOpenjdk,
  "c++": siCplusplus,
  android: siAndroid,
  "android sdk": siAndroid,
  ble: siBluetooth,
  "cloudflare r2": siCloudflare,
  firebase: siFirebase,
  "firebase firestore": siFirebase,
  "google gemini": siGooglegemini,
  ffmpeg: siFfmpeg,
  git: siGit,
  webassembly: siWebassembly,
  "linux mint": siLinuxmint,
  "linux mint / kernel automation": siLinuxmint,
};

export function techIcon(name: string): SimpleIcon | undefined {
  return TECH[name.toLowerCase()];
}

/** Monochrome brand glyph (inherits currentColor). Use `brand` to show its real colour. */
export function TechLogo({
  name,
  className,
  brand = false,
}: {
  name: string;
  className?: string;
  brand?: boolean;
}) {
  const icon = techIcon(name);
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={cn("size-4 shrink-0", className)}
      fill={brand ? `#${icon.hex}` : "currentColor"}
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
