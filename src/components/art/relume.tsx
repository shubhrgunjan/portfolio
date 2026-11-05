"use client";

import { ACCENT, ArtFrame, INK, Note, PAPER } from "./primitives";

export function RelumeArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="A website measured into design tokens, motion curves and an agent skill">
      <Note x={16} y={20}>fig. 15 — site → DNA → skill</Note>
      <rect x="24" y="43" width="132" height="144" rx="5" fill={PAPER} />
      <path d="M24 61 H156" />
      {[33, 41, 49].map((x) => <circle key={x} cx={x} cy="52" r="1.5" fill={INK} />)}
      <rect x="36" y="76" width="74" height="8" fill={INK} stroke="none" />
      <path d="M36 95 H133 M36 102 H115" />
      <rect x="36" y="118" width="48" height="52" fill={ACCENT} />
      <rect x="94" y="118" width="48" height="52" fill={PAPER} />
      <path d="M38 110 H142" strokeWidth="3" className="art-pulse" />
      <path d="M164 112 H218 M210 106 L218 112 L210 118" className="art-dash" />
      <Note x={191} y={98} anchor="middle" size={8}>measure</Note>
      <rect x="230" y="43" width="146" height="144" rx="5" fill={PAPER} />
      <Note x={242} y={63}>design-language/</Note>
      {[INK, ACCENT, PAPER].map((fill, i) => (
        <rect key={i} x={242 + i * 24} y="77" width="17" height="17" rx="3" fill={fill} />
      ))}
      <path d="M242 128 C266 128 267 104 290 104 S321 128 342 104" strokeWidth="2" />
      <circle cx="290" cy="104" r="4" fill={ACCENT} className="art-pulse" />
      <path d="M242 142 H363" strokeOpacity="0.25" />
      <Note x={242} y={158} size={9}>SKILL.md + tokens.css</Note>
      <Note x={242} y={174} size={8}>layout · motion · checks</Note>
      <Note x={200} y={211} anchor="middle" size={9}>Playwright → inference → MCP</Note>
    </ArtFrame>
  );
}
