/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * Generative cover: the post's accent colour as a desktop, with dithered
 * halftone spheres placed deterministically from the slug.
 */
export function PostCover({
  slug,
  accent = "pink",
  image,
  label,
  className,
}: {
  slug: string;
  accent?: string;
  image?: string;
  label?: string;
  className?: string;
}) {
  const rand = hash(slug);
  const blobs = Array.from({ length: 3 }, () => ({
    x: `${Math.round(rand() * 80 - 15)}%`,
    y: `${Math.round(rand() * 80 - 30)}%`,
    size: `${Math.round(45 + rand() * 55)}%`,
  }));
  const gridAngle = Math.round(rand() * 2) * 45;

  return (
    <div
      data-accent={accent}
      className={cn("relative isolate overflow-hidden bg-[var(--a)] text-[#1e1e1e]", className)}
    >
      {image ? (
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : (
        <>
          <div
            aria-hidden
            className="dots absolute inset-0 opacity-25"
            style={{ transform: `rotate(${gridAngle}deg) scale(1.5)` }}
          />
          {blobs.map((b, i) => (
            <div
              key={i}
              aria-hidden
              className="dither absolute aspect-square rounded-full"
              style={{
                left: b.x,
                top: b.y,
                width: b.size,
                background: "radial-gradient(circle, #1e1e1e 0%, #1e1e1e 25%, transparent 70%)",
              }}
            />
          ))}
        </>
      )}
      {label && (
        <span className="mono-xs absolute left-2 top-2 bg-[#1e1e1e] px-1.5 py-[2px] text-[#fefefe]">{label}</span>
      )}
    </div>
  );
}
