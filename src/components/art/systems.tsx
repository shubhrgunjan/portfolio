"use client";

import { ACCENT, ArtFrame, Aruco, Chip, Cross, Dim, INK, MONO, Note, PAPER, Sphere, useArtIds } from "./primitives";

/* ------------------------------------------------------------------ */
/*  Asimov 3D teleop — phone controller streaming to the robot        */
/* ------------------------------------------------------------------ */

const TELEOP_LINK = "M296 112 C 262 96, 222 96, 186 112";

export function AsimovTeleopArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Phone teleoperation controller streaming state packets to a humanoid robot">
      <AsimovTeleopScene />
    </ArtFrame>
  );
}

function AsimovTeleopScene() {
  const ids = useArtIds();
  return (
    <>
      {/* phone (landscape) */}
      <rect x="18" y="62" width="168" height="104" rx="12" fill={PAPER} />
      <rect x="30" y="72" width="144" height="84" fill={`url(#${ids.grid})`} />
      <circle cx="24" cy="114" r="1.8" fill={INK} stroke="none" />
      {/* mini robot in the 3D viewport */}
      <g>
        <path d="M80 140 L102 128 H150 L168 140 Z" fill={`url(#${ids.hatch})`} strokeWidth="0.8" opacity="0.6" />
        <rect x="118" y="80" width="12" height="11" rx="2" fill={PAPER} />
        <path d="M114 93 H134 L132 117 H116 Z" fill={PAPER} />
        <path d="M120 117 L118 136 M128 117 L130 136 M114 96 L106 112 M134 96 L142 112" strokeWidth="2" />
        <circle cx="124" cy="85" r="1.4" fill={ACCENT} stroke="none" className="art-blink" />
      </g>
      {/* joystick */}
      <circle cx="56" cy="128" r="17" fill={PAPER} />
      <circle cx="56" cy="128" r="17" fill={`url(#${ids.dots})`} stroke="none" opacity="0.35" />
      <circle
        r="7"
        fill={ACCENT}
        className="art-path"
        style={{ offsetPath: "path('M56 128 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0')", ["--dur" as string]: "5s" }}
      />
      <Chip x={36} y={78}>expo-gl</Chip>
      <Cross x={164} y={84} r={5} />

      {/* robot */}
      <g className="art-float">
        <rect x="314" y="54" width="22" height="22" rx="4" fill={PAPER} />
        <rect x="317" y="61" width="16" height="5" fill={INK} stroke="none" />
        <path d="M306 80 H344 L340 132 H310 Z" fill={PAPER} />
        <rect x="314" y="100" width="22" height="22" fill={`url(#${ids.dots})`} stroke="none" />
        <g className="art-sway" style={{ ["--origin" as string]: "100% 0%" }}>
          <path d="M306 84 L294 108 L298 130" strokeWidth="4" />
          <path d="M306 84 L294 108 L298 130" strokeWidth="1.8" stroke={PAPER} />
        </g>
        <g className="art-sway" style={{ ["--origin" as string]: "0% 0%", ["--d" as string]: "-1.5s" }}>
          <path d="M344 84 L356 108 L352 130" strokeWidth="4" />
          <path d="M344 84 L356 108 L352 130" strokeWidth="1.8" stroke={PAPER} />
        </g>
        <path d="M316 132 L313 164 L316 190 M334 132 L337 164 L334 190" strokeWidth="4.5" />
        <path d="M316 132 L313 164 L316 190 M334 132 L337 164 L334 190" strokeWidth="2" stroke={PAPER} />
        {[[306, 84], [344, 84], [313, 164], [337, 164]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="2.8" fill={ACCENT} />
        ))}
      </g>
      <ellipse cx="325" cy="196" rx="30" ry="5" fill={`url(#${ids.dots})`} stroke="none" />

      {/* state packets robot → phone */}
      <path d={TELEOP_LINK} className="art-dash" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="-4"
          y="-4"
          width="8"
          height="8"
          fill={INK}
          stroke="none"
          className="art-path"
          style={{ offsetPath: `path('${TELEOP_LINK}')`, ["--dur" as string]: "2.4s", ["--d" as string]: `${-i * 0.8}s` }}
        />
      ))}
      <Note x={241} y={86} anchor="middle" size={8}>
        state 288 B @ 50 Hz
      </Note>
      <Dim x1={18} x2={186} y={182} label="three.js on expo-gl" />
      <Aruco x={364} y={18} size={22} seed="asimov-teleop" />
      <Note x={12} y={18}>fig. 03 — teleop from a phone</Note>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  UIKey — scan a live page into a compact manifest for an LLM       */
/* ------------------------------------------------------------------ */

export function UIKeyArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Browser page scanned into bounding boxes and compiled into a token manifest">
      <UIKeyScene />
    </ArtFrame>
  );
}

function UIKeyScene() {
  const ids = useArtIds();
  const tokens = [
    ["color-1", true],
    ["color-2", true],
    ["size-1", false],
    ["<Header>", false],
    ["<Button>", false],
  ] as const;
  return (
    <>
      {/* browser */}
      <rect x="18" y="32" width="196" height="172" fill={PAPER} />
      <path d="M18 46 H214" />
      {[26, 34, 42].map((x) => (
        <circle key={x} cx={x} cy={39} r="2.2" fill={INK} stroke="none" />
      ))}
      <rect x="52" y="35" width="120" height="8" strokeWidth="0.9" />
      {/* page content */}
      <rect x="28" y="54" width="176" height="14" fill={INK} stroke="none" />
      <rect x="28" y="76" width="110" height="9" fill={`url(#${ids.hatch})`} />
      <path d="M28 94 H150 M28 101 H130" strokeWidth="2.5" />
      <rect x="28" y="110" width="50" height="14" fill={ACCENT} />
      {[28, 88, 148].map((x) => (
        <g key={x}>
          <rect x={x} y="134" width="54" height="58" fill={PAPER} />
          <rect x={x} y="134" width="54" height="26" fill={`url(#${ids.dots})`} stroke="none" opacity="0.5" />
          <path d={`M${x + 6} 168 H${x + 44} M${x + 6} 176 H${x + 34}`} strokeWidth="1.6" />
        </g>
      ))}
      {/* bounding boxes */}
      <g strokeWidth="1" stroke={INK}>
        <rect x="24" y="72" width="118" height="17" className="art-dash" />
        <rect x="24" y="106" width="58" height="22" className="art-dash" />
        <rect x="144" y="130" width="62" height="66" className="art-dash" />
      </g>
      <Note x={88} y={121} size={7}>x:28 y:110 50×14</Note>
      {/* scan line */}
      <g className="art-path" style={{ offsetPath: "path('M18 50 V200')", ["--dur" as string]: "4s" }}>
        <path d="M0 0 H196" stroke={ACCENT} strokeWidth="2.5" />
        <path d="M0 0 H196" strokeWidth="0.8" />
      </g>

      {/* arrow to manifest */}
      <path d="M220 118 H246 M240 112 L246 118 L240 124" />
      <Note x={233} y={108} anchor="middle" size={7}>
        compile
      </Note>

      {/* manifest */}
      <rect x="252" y="44" width="134" height="132" fill={PAPER} />
      <rect x="252" y="44" width="134" height="13" fill={INK} stroke="none" />
      <Note x={257} y={53.5} size={8}>
        <tspan fill={PAPER}>manifest.json</tspan>
      </Note>
      {tokens.map(([t, swatch], i) => (
        <g key={t}>
          {swatch && <rect x="260" y={66 + i * 17} width="9" height="9" fill={i === 0 ? ACCENT : INK} />}
          <text x={swatch ? 275 : 260} y={74 + i * 17} fill={INK} stroke="none" fontFamily={MONO} fontSize={9}>
            {t}
          </text>
          <path d={`M${330} ${70 + i * 17} H${372 - i * 4}`} strokeWidth="1.6" pathLength={1} className="art-draw-loop" style={{ ["--d" as string]: `${-i * 0.5}s` }} />
        </g>
      ))}
      <path d="M270 176 V192 H314" className="art-dash" />
      <Chip x={316} y={186}>→ LLM</Chip>
      <Cross x={232} y={196} r={5} />
      <Dim x1={252} x2={386} y={30} label="compact, no prompt bloat" />
      <Note x={12} y={18}>fig. 04 — page → manifest</Note>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  EdgeMed — air-gapped vault with on-device vector search           */
/* ------------------------------------------------------------------ */

export function EdgeMedArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Encrypted air-gapped vault with vector search, LAN devices and no cloud">
      <EdgeMedScene />
    </ArtFrame>
  );
}

function EdgeMedScene() {
  const ids = useArtIds();
  const clusters = [
    [168, 98], [176, 90], [160, 106], [182, 104], [170, 112],
    [236, 82], [246, 92], [228, 92], [240, 76],
    [222, 150], [232, 158], [214, 158], [226, 166],
  ];
  const q = [196, 124];
  const near = [[182, 104], [170, 112], [214, 158]];
  return (
    <>
      {/* encrypted boundary */}
      <rect x="128" y="44" width="160" height="148" fill={PAPER} />
      <rect x="128" y="44" width="160" height="148" fill={`url(#${ids.grid})`} stroke="none" />
      <rect x="122" y="38" width="172" height="160" className="art-dash" strokeWidth="1.2" />
      {/* lock */}
      <g>
        <path d="M200 30 V24 a8 8 0 0 1 16 0 V30" strokeWidth="2" />
        <rect x="196" y="30" width="24" height="18" fill={INK} stroke="none" />
        <circle cx="208" cy="38" r="2.4" fill={ACCENT} stroke="none" />
      </g>
      {/* embedding axes */}
      <path d="M140 180 H276 M140 180 V72" strokeWidth="0.9" />
      <path d="M272 177 L276 180 L272 183 M137 76 L140 72 L143 76" strokeWidth="0.9" />
      {/* points */}
      {clusters.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.2" fill={i < 5 ? INK : i < 9 ? ACCENT : PAPER} />
      ))}
      {/* query + neighbours */}
      {near.map(([x, y], i) => (
        <path key={i} d={`M${q[0]} ${q[1]} L${x} ${y}`} strokeWidth="1.1" pathLength={1} className="art-draw-loop" style={{ ["--d" as string]: `${-i * 0.3}s` }} />
      ))}
      <circle cx={q[0]} cy={q[1]} r="9" className="art-pulse" />
      <circle cx={q[0]} cy={q[1]} r="4.5" fill={ACCENT} strokeWidth="2" />
      <Chip x={136} y={52}>qdrant-edge</Chip>
      <Chip x={220} y={52}>SQLCipher</Chip>

      {/* crossed-out cloud */}
      <g>
        <path d="M30 78 a14 14 0 0 1 22 -12 a18 18 0 0 1 32 4 a12 12 0 0 1 4 24 H34 a12 12 0 0 1 -4 -16 z" fill={PAPER} />
        <path d="M30 78 a14 14 0 0 1 22 -12 a18 18 0 0 1 32 4 a12 12 0 0 1 4 24 H34 a12 12 0 0 1 -4 -16 z" fill={`url(#${ids.hatch})`} opacity="0.35" />
        <path d="M24 56 L96 108" strokeWidth="3" />
        <Note x={58} y={122} anchor="middle" size={8}>
          0 bytes out
        </Note>
      </g>
      <path d="M100 86 H118" strokeDasharray="2 3" />

      {/* LAN devices */}
      {[[318, 70], [334, 140]].map(([x, y], i) => (
        <g key={i} className="art-float" style={{ ["--d" as string]: `${-i * 1.2}s` }}>
          <rect x={x} y={y} width="48" height="32" rx="3" fill={PAPER} />
          <rect x={x + 5} y={y + 5} width="38" height="18" fill={`url(#${ids.dots})`} stroke="none" opacity="0.6" />
          <path d={`M${x + 18} ${y + 28} H${x + 30}`} strokeWidth="1.2" />
        </g>
      ))}
      <path d="M288 92 L318 86 M288 150 L334 156" className="art-dash" />
      <Note x={306} y={124} size={8}>
        LAN · mTLS
      </Note>
      <Sphere cx={58} cy={176} r={28} opacity={0.5} />
      <Aruco x={364} y={192} size={20} seed="edgemed" />
      <Note x={12} y={18}>fig. 05 — air-gapped memory vault</Note>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  AndroPlay — board with warm standby player, phone over BLE/Redis  */
/* ------------------------------------------------------------------ */

const ANDRO_STREAM = "M70 138 C 100 160, 130 164, 160 150";

export function AndroPlayArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Large display board with active and standby players controlled from a phone">
      <AndroPlayScene />
    </ArtFrame>
  );
}

function AndroPlayScene() {
  const ids = useArtIds();
  return (
    <>
      {/* board + stand */}
      <rect x="160" y="34" width="224" height="140" fill={INK} stroke="none" />
      <rect x="166" y="40" width="212" height="128" fill={PAPER} />
      <path d="M262 174 V196 M282 174 V196 M236 200 H308" strokeWidth="3" />
      {/* standby player (behind) */}
      <g className="art-float" style={{ ["--d" as string]: "-2s" }}>
        <rect x="236" y="52" width="128" height="72" fill={PAPER} />
        <rect x="236" y="52" width="128" height="72" fill={`url(#${ids.hatch})`} opacity="0.35" />
        <Chip x={300} y={56}>standby</Chip>
      </g>
      {/* active player (front) */}
      <rect x="180" y="74" width="140" height="80" fill={ACCENT} />
      <rect x="180" y="74" width="140" height="80" fill={`url(#${ids.dots})`} stroke="none" opacity="0.18" />
      <path d="M240 98 L262 112 L240 126 Z" fill={INK} stroke="none" />
      <path d="M188 144 H312" strokeWidth="0.9" strokeOpacity="0.5" />
      <path d="M188 144 H312" strokeWidth="2.6" pathLength={1} className="art-draw-loop" />
      <Chip x={184} y={78}>active</Chip>
      <Note x={386} y={214} anchor="end" size={8}>
        TR3DK · Android 13
      </Note>

      {/* phone */}
      <rect x="26" y="96" width="40" height="76" rx="6" fill={PAPER} />
      <rect x="31" y="106" width="30" height="50" fill={`url(#${ids.grid})`} />
      {[114, 126, 138].map((y) => (
        <rect key={y} x="35" y={y} width="22" height="7" fill={y === 114 ? INK : PAPER} />
      ))}
      <circle cx="46" cy="164" r="2.6" />
      {/* BLE waves */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="66" cy="104" r="10" className="art-pulse" style={{ ["--d" as string]: `${-i * 0.8}s` }} />
      ))}
      <Note x={22} y={86} size={8}>
        BLE fast path
      </Note>
      <path d="M72 104 C 104 90, 128 84, 160 82" className="art-dash" />
      {/* redis stream */}
      <path d={ANDRO_STREAM} strokeWidth="0.9" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="-5"
          y="-3.5"
          width="10"
          height="7"
          fill={i % 2 ? PAPER : INK}
          className="art-path"
          style={{ offsetPath: `path('${ANDRO_STREAM}')`, ["--dur" as string]: "3s", ["--d" as string]: `${-i * 0.75}s` }}
        />
      ))}
      <Note x={78} y={182} size={8}>
        Redis stream
      </Note>
      <Cross x={124} y={50} r={6} />
      <Dim x1={172} x2={384} y={22} label="LG CreateBoard" />
      <Aruco x={18} y={190} size={20} seed="androplay" />
      <Note x={12} y={18}>fig. 06 — zero-lag playback</Note>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Nyaya Flow — spoken grievance → stepped, cited action path        */
/* ------------------------------------------------------------------ */

const NYAYA_STAIRS = "M150 182 H190 V150 H230 V118 H270 V86 H310 V54 H350";

export function NyayaArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Speech waveform becoming a stepped legal action path with cited sources">
      <NyayaScene />
    </ArtFrame>
  );
}

function NyayaScene() {
  const ids = useArtIds();
  const bars = [8, 14, 22, 30, 18, 36, 24, 12, 28, 40, 20, 10, 26, 16, 8];
  return (
    <>
      {/* mic */}
      <rect x="30" y="56" width="18" height="30" rx="9" fill={PAPER} />
      <path d="M24 76 a15 15 0 0 0 30 0 M39 91 V100 M31 100 H47" />
      {/* waveform */}
      <g>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={24 + i * 7}
            y={140 - h / 2}
            width="4"
            height={h}
            fill={i % 4 === 1 ? ACCENT : INK}
            stroke={INK}
            strokeWidth="0.8"
            className="art-float"
            style={{ ["--d" as string]: `${-i * 0.27}s` }}
          />
        ))}
      </g>
      <Chip x={24} y={170}>hi</Chip>
      <Chip x={44} y={170}>en</Chip>
      <Chip x={64} y={170}>+ more</Chip>
      <path d="M130 140 H148 M142 134 L148 140 L142 146" />

      {/* stepped action path */}
      <path d={NYAYA_STAIRS} strokeWidth="1" strokeOpacity="0.35" />
      <path d={NYAYA_STAIRS} strokeWidth="2.4" pathLength={1} className="art-draw-loop" />
      <circle r="5" fill={PAPER} strokeWidth="2" className="art-path" style={{ offsetPath: `path('${NYAYA_STAIRS}')`, ["--dur" as string]: "6s" }} />
      {[[190, 182], [230, 150], [270, 118], [310, 86]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill={INK} stroke="none" />
          <text x={x} y={y + 3} fill={PAPER} stroke="none" fontFamily={MONO} fontSize={9} textAnchor="middle">
            {i + 1}
          </text>
          {/* document with statute mark */}
          <g className="art-float" style={{ ["--d" as string]: `${-i * 0.6}s` }}>
            <path d={`M${x + 6} ${y - 40} h18 l6 6 v24 h-24 z`} fill={PAPER} />
            <path d={`M${x + 24} ${y - 40} v6 h6`} strokeWidth="0.9" />
            <rect x={x + 9} y={y - 30} width="12" height="10" fill={`url(#${ids.hatch})`} stroke="none" />
            <text x={x + 23} y={y - 19} fill={INK} stroke="none" fontFamily={MONO} fontSize={8}>
              §
            </text>
          </g>
        </g>
      ))}
      <path d="M350 54 l-6 -4 v8 z" fill={INK} stroke="none" />
      <Chip x={290} y={26}>action plan</Chip>
      <Dim x1={150} x2={350} y={204} label="every step cites a source" />
      <Cross x={372} y={150} r={6} />
      <Aruco x={366} y={186} size={20} seed="nyaya" />
      <Note x={12} y={18}>fig. 07 — grievance → steps</Note>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ExelSnap — offline laptop querying a sheet with read-only SQL     */
/* ------------------------------------------------------------------ */

export function ExelSnapArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Offline laptop running read-only SQL over a spreadsheet">
      <ExelSnapScene />
    </ArtFrame>
  );
}

function ExelSnapScene() {
  const ids = useArtIds();
  const cols = 5;
  const rows = 6;
  const cw = 32;
  const rh = 15;
  const x0 = 46;
  const y0 = 50;
  const hot = new Set(["2-1", "2-3", "2-4", "4-3"]);
  return (
    <>
      {/* laptop */}
      <rect x="34" y="34" width="190" height="128" rx="5" fill={PAPER} />
      <path d="M20 170 H238 L226 160 H32 Z" fill={PAPER} />
      <path d="M112 166 H146" strokeWidth="1.2" />
      {/* sheet header */}
      <rect x={x0} y={y0 - 12} width={cols * cw} height="12" fill={INK} stroke="none" />
      {["A", "B", "C", "D", "E"].map((c, i) => (
        <text key={c} x={x0 + i * cw + cw / 2} y={y0 - 3} fill={PAPER} stroke="none" fontFamily={MONO} fontSize={8} textAnchor="middle">
          {c}
        </text>
      ))}
      {/* cells */}
      {Array.from({ length: rows * cols }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const key = `${c}-${r}`;
        return (
          <rect
            key={key}
            x={x0 + c * cw}
            y={y0 + r * rh}
            width={cw}
            height={rh}
            strokeWidth="0.7"
            fill={hot.has(key) ? ACCENT : PAPER}
            className={hot.has(key) ? "art-blink" : undefined}
            style={hot.has(key) ? { ["--d" as string]: `${-(c + r) * 0.3}s` } : undefined}
          />
        );
      })}
      {Array.from({ length: rows }, (_, r) => (
        <path key={r} d={`M${x0 + 5} ${y0 + r * rh + 8} H${x0 + 20}`} strokeWidth="1.3" />
      ))}
      <rect x={x0 + cw * 2} y={y0} width={cw} height={rows * rh} fill={`url(#${ids.dots})`} stroke="none" opacity="0.25" />

      {/* query bubble */}
      <rect x="254" y="58" width="132" height="70" fill={INK} stroke="none" />
      <path d="M254 104 L232 112 L254 116 Z" fill={INK} stroke="none" />
      <text x="262" y="76" fill={PAPER} stroke="none" fontFamily={MONO} fontSize={9}>
        SELECT …
      </text>
      <text x="262" y="90" fill={PAPER} stroke="none" fontFamily={MONO} fontSize={9}>
        FROM sheet
      </text>
      <path d="M262 104 H352" stroke={ACCENT} strokeWidth="2.4" pathLength={1} className="art-draw-loop" />
      <path d="M262 114 H320" stroke={PAPER} strokeWidth="1.4" pathLength={1} className="art-draw-loop" style={{ ["--d" as string]: "-1.2s" }} />
      <Chip x={254} y={44}>read-only</Chip>
      <Chip x={316} y={136}>DuckDB</Chip>
      <path d="M318 142 C 280 150, 240 150, 206 128" className="art-dash" />

      {/* no cloud */}
      <g>
        <path d="M300 182 a10 10 0 0 1 16 -9 a13 13 0 0 1 24 3 a9 9 0 0 1 3 18 H304 a9 9 0 0 1 -4 -12 z" fill={PAPER} />
        <path d="M294 168 L348 204" strokeWidth="2.6" />
        <Note x={350} y={178} size={8}>
          offline
        </Note>
      </g>
      <Dim x1={x0} x2={x0 + cols * cw} y={186} label="local model, local data" />
      <Cross x={372} y={30} r={5} />
      <Aruco x={18} y={196} size={18} seed="exelsnap" />
      <Note x={12} y={18}>fig. 08 — chat with a sheet</Note>
    </>
  );
}
