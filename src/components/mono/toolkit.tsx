import { TechLogo } from "@/components/os/tech-logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const GROUPS = [
  { label: "AI & data", items: ["Python", "PyTorch", "NumPy", "ONNX", "OpenCV", "Qdrant", "DuckDB", "Google Gemini"] },
  { label: "Robotics & 3D", items: ["Three.js", "C++", "Rust", "FFmpeg", "Linux Mint"] },
  {
    label: "Product",
    items: [
      "TypeScript", "React", "Next.js", "Node.js", "Expo", "Electron", "Kotlin", "Android",
      "FastAPI", "Redis", "PostgreSQL", "Firebase", "Docker", "Cloudflare R2", "Git",
    ],
  },
];

/** Monochrome logo tiles grouped by area; the name appears on hover or focus. */
export function Toolkit() {
  return (
    <div className="space-y-6">
      {GROUPS.map((g) => (
        <div key={g.label} className="grid gap-3 sm:grid-cols-[128px_1fr] sm:gap-6">
          <div className="text-[13px] text-muted-foreground sm:pt-2.5">{g.label}</div>
          <ul className="flex flex-wrap gap-1.5">
            {g.items.map((name) => (
              <li key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      tabIndex={0}
                      className="grid size-10 place-items-center rounded-[10px] bg-chrome text-ink-soft transition-colors duration-150 hover:bg-chrome-2 hover:text-ink focus-visible:text-ink"
                    >
                      <TechLogo name={name} className="size-[18px]" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={6} className="rounded-full px-2.5 py-1 text-[12px]">
                    {name}
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
