"use client";

import { ACCENT, ArtFrame, Aruco, Chip, Cross, Dim, INK, Note, PAPER, Sphere, useArtIds } from "./primitives";

/* ------------------------------------------------------------------ */
/*  Parallax — phone video → walkable 3D twin with an A* route         */
/* ------------------------------------------------------------------ */

const PX_ROUTE = "M140 200 C 170 182, 196 170, 214 162 S 262 150, 300 132";

export function ParallaxArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Phone video turned into a walkable 3D room with a route">
      <ParallaxScene />
    </ArtFrame>
  );
}

function ParallaxScene() {
  const ids = useArtIds();
  const leftX = (y: number) => 170 - ((y - 120) * 60) / 85;
  const rightX = (y: number) => 330 + ((y - 120) * 60) / 85;
  const splats = [
    [190, 70, 9], [214, 58, 6], [236, 78, 11], [262, 62, 7], [288, 82, 10], [310, 60, 6],
    [200, 98, 5], [252, 100, 6], [300, 104, 5], [226, 92, 4], [276, 92, 4],
  ];
  return (
    <>
      {/* room: back wall + perspective edges */}
      <rect x="170" y="45" width="160" height="75" fill={PAPER} />
      <path d="M170 45 L120 8 M330 45 L380 8 M170 120 L110 205 M330 120 L390 205" />
      <path d="M110 205 L390 205" />
      {/* floor grid */}
      <g strokeOpacity="0.55" strokeWidth="0.9">
        {[0, 1, 2, 3, 4].map((t) => (
          <path key={t} d={`M${170 + 40 * t} 120 L${110 + 70 * t} 205`} />
        ))}
        {[138, 160, 185].map((y) => (
          <path key={y} d={`M${leftX(y)} ${y} H${rightX(y)}`} />
        ))}
      </g>
      {/* gaussian splats on the wall */}
      {splats.map(([x, y, r], i) => (
        <g key={i} className="art-float" style={{ ["--d" as string]: `${-i * 0.4}s` }}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.7} fill={i % 3 === 0 ? INK : PAPER} />
          {i % 3 === 1 && <ellipse cx={x} cy={y} rx={r} ry={r * 0.7} fill={`url(#${ids.dots})`} stroke="none" />}
        </g>
      ))}
      {/* sofa (obstacle) */}
      <path d="M232 178 l40 -8 l18 10 l-40 9 z" fill={`url(#${ids.hatch})`} />
      <path d="M232 178 l40 -8 l18 10 l-40 9 z M232 178 v8 l18 10 v-7 M290 180 v7 l-40 9" />
      {/* route + walker */}
      <path d={PX_ROUTE} stroke={INK} strokeWidth="2.2" pathLength={1} className="art-draw-loop" />
      <circle r="5" fill={PAPER} strokeWidth="2" className="art-path" style={{ offsetPath: `path('${PX_ROUTE}')`, ["--dur" as string]: "6s" }} />
      {/* POI pin */}
      <circle cx="300" cy="132" r="7" fill="none" className="art-pulse" />
      <circle cx="300" cy="132" r="3.5" fill={INK} stroke="none" />
      <Chip x={306} y={112}>meeting room 4</Chip>
      {/* phone + capture path */}
      <rect x="22" y="112" width="34" height="62" rx="5" fill={PAPER} />
      <circle cx="39" cy="122" r="3" fill={INK} stroke="none" />
      <rect x="27" y="130" width="24" height="36" fill={ACCENT} />
      <path d="M33 144 l10 4 -10 4 z" fill={INK} stroke="none" />
      <path d="M58 136 C 92 120, 120 96, 170 82" className="art-dash" />
      <Cross x={170} y={82} />
      <Aruco x={348} y={150} size={22} seed="parallax" />
      <Note x={12} y={18}>fig. 01 — phone video → walkable twin</Note>
      <Dim x1={170} x2={330} y={34} label="metric floor" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  VASIMOV — humanoid digital twin + live telemetry                  */
/* ------------------------------------------------------------------ */

export function VasimovArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Humanoid robot simulation with telemetry traces">
      <VasimovScene />
    </ArtFrame>
  );
}

function VasimovScene() {
  const ids = useArtIds();
  const leg = (x: number, d: string) => (
    <g className="art-sway" style={{ ["--origin" as string]: "50% 0%", ["--d" as string]: d }}>
      <path d={`M${x} 124 L${x - 3} 154 L${x + 1} 184`} strokeWidth="5" stroke={INK} />
      <path d={`M${x} 124 L${x - 3} 154 L${x + 1} 184`} strokeWidth="2.6" stroke={PAPER} />
      <circle cx={x - 3} cy={154} r="3.2" fill={ACCENT} />
      <path d={`M${x - 6} 186 h14`} strokeWidth="3" />
    </g>
  );
  return (
    <>
      {/* checker floor in perspective */}
      <g>
        <path d="M30 210 L90 178 H240 L300 210 Z" fill={PAPER} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${90 + 25 * i} 178 L${30 + 45 * i} 210`} strokeWidth="0.8" />
        ))}
        <path d="M60 194 H270" strokeWidth="0.8" />
        <path d="M30 210 L90 178 H240 L300 210 Z" fill={`url(#${ids.hatch})`} opacity="0.25" stroke="none" />
      </g>
      <ellipse cx="160" cy="188" rx="34" ry="6" fill={`url(#${ids.dots})`} stroke="none" />
      {/* humanoid */}
      <g className="art-float" style={{ ["--d" as string]: "-1s" }}>
        {leg(150, "0s")}
        {leg(170, "-1.5s")}
        <path d="M142 74 H178 L174 126 H146 Z" fill={PAPER} />
        <path d="M148 88 H172 M148 98 H172" strokeWidth="0.9" />
        <rect x="149" y="104" width="22" height="14" fill={`url(#${ids.dots})`} stroke="none" />
        <rect x="150" y="48" width="20" height="22" rx="4" fill={PAPER} />
        <rect x="153" y="55" width="14" height="5" fill={INK} stroke="none" />
        <circle cx="160" cy="57.5" r="1.6" fill={ACCENT} stroke="none" className="art-blink" />
        <path d="M160 70 V74" />
        <g className="art-sway" style={{ ["--origin" as string]: "100% 0%" }}>
          <path d="M142 78 L128 102 L132 126" strokeWidth="4.5" />
          <path d="M142 78 L128 102 L132 126" strokeWidth="2" stroke={PAPER} />
        </g>
        <g className="art-sway" style={{ ["--origin" as string]: "0% 0%", ["--d" as string]: "-1.5s" }}>
          <path d="M178 78 L192 102 L188 126" strokeWidth="4.5" />
          <path d="M178 78 L192 102 L188 126" strokeWidth="2" stroke={PAPER} />
        </g>
        {[[142, 78], [178, 78], [128, 102], [192, 102], [150, 124], [170, 124]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill={ACCENT} />
        ))}
      </g>
      <Chip x={62} y={150}>78 obs → 23 act</Chip>
      {/* telemetry panel */}
      <g>
        <rect x="248" y="40" width="132" height="104" fill={PAPER} />
        <rect x="248" y="40" width="132" height="13" fill={INK} stroke="none" />
        <Note x={253} y={49.5} size={8}>
          <tspan fill={PAPER}>telemetry · 50 Hz</tspan>
        </Note>
        <rect x="248" y="53" width="132" height="91" fill={`url(#${ids.grid})`} stroke="none" />
        <path d="M254 82 C 266 66, 276 66, 288 82 S 310 98, 322 82 S 344 66, 356 82 S 368 94, 374 88" pathLength={1} className="art-draw-loop" />
        <path d="M254 116 C 264 104, 274 128, 286 116 S 306 104, 318 116 S 340 128, 352 116 S 366 106, 374 112" pathLength={1} className="art-draw-loop" strokeDasharray="1" style={{ ["--d" as string]: "-2s", stroke: ACCENT, strokeWidth: 2.4 }} />
        <path d="M254 116 C 264 104, 274 128, 286 116 S 306 104, 318 116 S 340 128, 352 116 S 366 106, 374 112" strokeWidth="0.6" strokeOpacity="0.5" />
        <Note x={254} y={138} size={8}>hip_pitch · knee</Note>
      </g>
      <path d="M248 132 C 222 140, 206 150, 190 160" className="art-dash" />
      <Note x={196} y={176} size={8}>UDP :8850</Note>
      <Aruco x={348} y={160} size={22} seed="vasimov" />
      <Sphere cx={58} cy={70} r={34} opacity={0.6} />
      <Note x={12} y={18}>fig. 02 — MuJoCo twin · Asimov 1</Note>
    </>
  );
}
