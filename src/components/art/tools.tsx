"use client";

import { ACCENT, ArtFrame, Aruco, Chip, Cross, Dim, INK, Note, PAPER, Sphere, useArtIds } from "./primitives";

/* ------------------------------------------------------------------ */
/*  TJFLOW — real-time kanban with live presence                       */
/* ------------------------------------------------------------------ */

const TJ_GLIDE = "M0 0 C 30 -18, 70 -18, 100 0";

export function TjflowArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Kanban board with a card moving between columns and live cursors">
      <TjflowScene />
    </ArtFrame>
  );
}

function TjflowScene() {
  const ids = useArtIds();
  const cols = [
    { x: 40, title: "todo", cards: [62, 92, 122] },
    { x: 140, title: "doing", cards: [62, 92] },
    { x: 240, title: "done", cards: [62, 92, 122, 152] },
  ];
  return (
    <>
      {/* board */}
      <rect x="30" y="34" width="306" height="166" fill={PAPER} />
      <rect x="30" y="34" width="306" height="12" fill={INK} stroke="none" />
      <Note x={36} y={43} size={8}>
        <tspan fill={PAPER}>board · onSnapshot()</tspan>
      </Note>
      {cols.map((c) => (
        <g key={c.title}>
          <rect x={c.x} y="52" width="88" height="140" fill={`url(#${ids.grid})`} />
          <Note x={c.x + 4} y={62} size={8}>
            {c.title}
          </Note>
          {c.cards.map((y, i) => (
            <g key={y}>
              <rect x={c.x + 6} y={y + 6} width="76" height="22" fill={PAPER} />
              <path d={`M${c.x + 11} ${y + 14} h${36 + ((i * 13) % 24)} M${c.x + 11} ${y + 21} h22`} strokeWidth="1" />
              {c.title === "done" && <path d={`M${c.x + 68} ${y + 16} l3 3 l6 -6`} strokeWidth="1.4" />}
              {c.title === "doing" && i === 0 && <rect x={c.x + 66} y={y + 12} width="10" height="10" fill={`url(#${ids.hatch})`} />}
            </g>
          ))}
        </g>
      ))}
      {/* card gliding todo → doing */}
      <g className="art-path" style={{ offsetPath: `path('${TJ_GLIDE}')`, ["--dur" as string]: "4.5s" }}>
        <g transform="translate(46 150)">
          <rect x="0" y="-11" width="76" height="22" fill={ACCENT} strokeWidth="2" />
          <path d="M5 -3 h40 M5 4 h24" strokeWidth="1" />
        </g>
      </g>
      {/* presence cursors */}
      <g className="art-float">
        <path d="M200 132 l0 14 l4 -4 l3 6 l2 -1 l-3 -6 l5 0 z" fill={INK} stroke={PAPER} strokeWidth="0.8" />
        <Chip x={210} y={146}>reviewer</Chip>
      </g>
      <g className="art-float" style={{ ["--d" as string]: "-2s" }}>
        <path d="M290 60 l0 14 l4 -4 l3 6 l2 -1 l-3 -6 l5 0 z" fill={PAPER} stroke={INK} strokeWidth="1" />
      </g>
      {/* sync pulse */}
      <g>
        <circle cx="360" cy="70" r="8" className="art-pulse" />
        <circle cx="360" cy="70" r="4" fill={INK} stroke="none" />
        <Note x={360} y={92} anchor="middle" size={8}>
          live
        </Note>
      </g>
      <path d="M336 70 h14" className="art-dash" />
      <Aruco x={350} y={170} size={22} seed="tjflow" />
      <Note x={12} y={18}>fig. 09 — kanban · live sync</Note>
      <Dim x1={30} x2={336} y={214} label="React 19 · Firestore" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ECHO//LOOP — your past runs become coworkers                       */
/* ------------------------------------------------------------------ */

const ECHO_A = "M0 0 H60 V40 H100";
const ECHO_B = "M0 0 V-40 H80";

export function EchoLoopArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Top-down puzzle grid with a player and replaying echoes holding a switch">
      <EchoScene />
    </ArtFrame>
  );
}

function EchoScene() {
  const ids = useArtIds();
  const T = 20;
  const ox = 90;
  const oy = 35;
  const walls = [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
    [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8],
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [10, 1], [10, 2], [10, 3], [10, 5], [10, 6], [10, 7],
    [6, 1], [6, 2], [6, 3], [6, 5], [6, 6], [6, 7],
  ];
  return (
    <>
      {/* floor */}
      <rect x={ox} y={oy} width={11 * T} height={9 * T} fill={PAPER} />
      <rect x={ox} y={oy} width={11 * T} height={9 * T} fill={`url(#${ids.grid})`} stroke="none" />
      {walls.map(([c, r]) => (
        <rect key={`${c}-${r}`} x={ox + c * T} y={oy + r * T} width={T} height={T} fill={`url(#${ids.hatch})`} strokeWidth="0.8" />
      ))}
      {/* door (open, held by echo on switch) */}
      <rect x={ox + 6 * T} y={oy + 4 * T} width={T} height={T} fill="none" strokeDasharray="2 3" />
      <rect x={ox + 6 * T + 2} y={oy + 4 * T + 2} width="4" height={T - 4} fill={INK} stroke="none" />
      <Chip x={ox + 7 * T + 4} y={oy + 5 * T + 4}>open</Chip>
      {/* switch */}
      <rect x={ox + 3 * T + 4} y={oy + 6 * T + 4} width={T - 8} height={T - 8} fill={ACCENT} strokeWidth="2" />
      {/* exit */}
      <rect x={ox + 10 * T} y={oy + 4 * T} width={T} height={T} fill={ACCENT} />
      <path d={`M${ox + 10 * T + 6} ${oy + 4 * T + 10} h8 m-3 -3 l3 3 l-3 3`} />
      {/* echo trails (recorded paths) */}
      <path d={`M${ox + 1.5 * T} ${oy + 2.5 * T} H${ox + 3.5 * T} V${oy + 6.5 * T}`} strokeDasharray="2 4" strokeOpacity="0.6" />
      <path d={`M${ox + 1.5 * T} ${oy + 6.5 * T} V${oy + 4.5 * T} H${ox + 9.5 * T}`} strokeWidth="2" pathLength={1} className="art-draw-loop" />
      {/* echo 1 parked on the switch */}
      <g opacity="0.55">
        <circle cx={ox + 3.5 * T} cy={oy + 6.5 * T} r="6.5" fill={PAPER} strokeDasharray="2 2" />
        <Note x={ox + 3.5 * T} y={oy + 6.5 * T + 3} anchor="middle" size={8}>
          1
        </Note>
      </g>
      {/* echo 2 replaying */}
      <g opacity="0.5" className="art-path" style={{ offsetPath: `path('${ECHO_B}')`, ["--dur" as string]: "5s", ["--d" as string]: "-1.5s" }}>
        <g transform={`translate(${ox + 1.5 * T} ${oy + 6.5 * T})`}>
          <circle r="6.5" fill={PAPER} strokeDasharray="2 2" />
        </g>
      </g>
      {/* player */}
      <g className="art-path" style={{ offsetPath: `path('${ECHO_A}')`, ["--dur" as string]: "5s" }}>
        <g transform={`translate(${ox + 1.5 * T} ${oy + 2.5 * T})`}>
          <circle r="7" fill={INK} stroke="none" />
          <circle r="2.4" fill={ACCENT} stroke="none" />
        </g>
      </g>
      {/* loop arrow */}
      <g className="art-spin">
        <circle cx="48" cy="112" r="24" stroke="none" fill="none" />
        <path d="M48 88 A24 24 0 1 1 26 121" strokeWidth="2" />
        <path d="M21 113 l5 8 l8 -4" strokeWidth="2" />
      </g>
      <Note x={48} y={115} anchor="middle" size={8}>
        rewind
      </Note>
      <Note x={20} y={168} size={8}>
        tick · 60 Hz
      </Note>
      <Cross x={355} y={30} />
      <Aruco x={350} y={182} size={22} seed="echoloop" />
      <Note x={12} y={18}>fig. 10 — past runs become coworkers</Note>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Mint Zoom — trackpad pinch → smooth zoom around the cursor         */
/* ------------------------------------------------------------------ */

export function MintZoomArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Trackpad pinch gesture zooming a page around the cursor">
      <MintZoomScene />
    </ArtFrame>
  );
}

function MintZoomScene() {
  const ids = useArtIds();
  return (
    <>
      {/* browser page */}
      <rect x="150" y="32" width="230" height="150" fill={PAPER} />
      <rect x="150" y="32" width="230" height="13" fill={INK} stroke="none" />
      <circle cx="157" cy="38.5" r="2" fill={ACCENT} stroke="none" />
      <circle cx="164" cy="38.5" r="2" fill={PAPER} stroke="none" />
      <Note x={174} y={41.5} size={8}>
        <tspan fill={PAPER}>chrome · cinnamon</tspan>
      </Note>
      <g strokeWidth="1">
        <path d="M162 58 h80 M162 66 h120 M162 74 h100 M162 82 h112" />
        <rect x="162" y="94" width="60" height="44" fill={`url(#${ids.dots})`} />
        <path d="M232 98 h70 M232 106 h60 M232 114 h76 M232 122 h40 M162 150 h120 M162 158 h90 M162 166 h110" />
      </g>
      {/* zoom rings around cursor */}
      <g>
        {[0, 0.8, 1.6].map((d) => (
          <circle key={d} cx="298" cy="112" r="14" className="art-pulse" style={{ ["--d" as string]: `-${d}s` }} />
        ))}
        <circle cx="298" cy="112" r="30" strokeDasharray="3 4" strokeOpacity="0.7" />
        <path d="M298 112 l0 14 l4 -4 l3 6 l2 -1 l-3 -6 l5 0 z" fill={INK} stroke={PAPER} strokeWidth="0.8" />
      </g>
      <Chip x={312} y={144}>scale 2.0×</Chip>
      {/* trackpad */}
      <g>
        <rect x="24" y="98" width="104" height="72" rx="6" fill={PAPER} />
        <rect x="24" y="98" width="104" height="72" rx="6" fill={`url(#${ids.grid})`} stroke="none" />
        <g className="art-float">
          <circle cx="60" cy="134" r="8" fill={ACCENT} />
          <path d="M52 126 l-10 -10 M42 116 h6 M42 116 v6" />
        </g>
        <g className="art-float" style={{ ["--d" as string]: "-2s" }}>
          <circle cx="92" cy="134" r="8" fill={ACCENT} />
          <path d="M100 142 l10 10 M110 152 h-6 M110 152 v-6" />
        </g>
        <Note x={76} y={186} anchor="middle" size={8}>
          ctrl + two-finger
        </Note>
      </g>
      <path d="M128 120 C 170 120, 240 110, 268 112" className="art-dash" />
      <Note x={150} y={200} size={8}>
        transform: matrix(s, 0, 0, s, tx, ty)
      </Note>
      <Cross x={298} y={112} r={4} />
      <Aruco x={24} y={34} size={22} seed="mintzoom" />
      <Dim x1={150} x2={380} y={24} label="viewport" />
      <Note x={12} y={18}>fig. 11 — pinch-to-zoom on Linux Mint</Note>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  reddit-core — faceted search over a public archive timeline        */
/* ------------------------------------------------------------------ */

export function RedditCoreArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Magnifier scanning a stacked archive timeline of posts with filters">
      <RedditScene />
    </ArtFrame>
  );
}

function RedditScene() {
  const ids = useArtIds();
  const cards = [0, 1, 2, 3, 4];
  return (
    <>
      {/* timeline axis */}
      <path d="M40 196 H360" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <path key={i} d={`M${40 + i * 40} 192 v8`} strokeWidth="0.9" />
      ))}
      <Note x={40} y={212} size={8}>
        2019
      </Note>
      <Note x={360} y={212} anchor="end" size={8}>
        2026
      </Note>
      {/* date-range selection */}
      <rect x="160" y="188" width="120" height="16" fill={ACCENT} fillOpacity="0.0" />
      <rect x="160" y="190" width="120" height="12" fill={`url(#${ids.hatch})`} strokeWidth="1.2" />
      {/* stacked post cards */}
      {cards.map((i) => (
        <g key={i} className="art-float" style={{ ["--d" as string]: `${-i * 0.6}s` }}>
          <rect x={60 + i * 56} y={70 + (i % 2) * 20} width="70" height="70" fill={PAPER} />
          <rect x={64 + i * 56} y={74 + (i % 2) * 20} width="10" height="18" fill={i === 2 ? INK : `url(#${ids.dots})`} />
          <path d={`M${80 + i * 56} ${80 + (i % 2) * 20} h40 M${80 + i * 56} ${88 + (i % 2) * 20} h30 M${66 + i * 56} ${104 + (i % 2) * 20} h56 M${66 + i * 56} ${112 + (i % 2) * 20} h44 M${66 + i * 56} ${120 + (i % 2) * 20} h50`} strokeWidth="0.9" />
          <path d={`M${95 + i * 56} ${140 + (i % 2) * 20} V188`} strokeDasharray="2 3" strokeWidth="0.8" />
        </g>
      ))}
      {/* magnifier sweeping */}
      <g className="art-path" style={{ offsetPath: "path('M0 0 C 40 -10, 80 10, 120 0')", ["--dur" as string]: "6s" }}>
        <g transform="translate(170 100)">
          <circle r="26" fill={ACCENT} fillOpacity="0.35" strokeWidth="2.5" />
          <path d="M18 18 L34 34" strokeWidth="5" />
        </g>
      </g>
      {/* filters */}
      <Chip x={40} y={34}>subreddit: r/india</Chip>
      <Chip x={152} y={34}>score ≥ 100</Chip>
      <Chip x={226} y={34}>size 200</Chip>
      <Note x={40} y={58} size={8}>
        retry 1s → 2s → 4s
      </Note>
      <Aruco x={358} y={30} size={22} seed="redditcore" />
      <Cross x={290} y={196} r={5} />
      <Note x={12} y={18}>fig. 12 — faceted archive search</Note>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  QuoraFormatter — numbered image + caption blocks → long-form post  */
/* ------------------------------------------------------------------ */

export function QuoraFormatterArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Numbered image and caption blocks assembled into a long-form post">
      <QuoraScene />
    </ArtFrame>
  );
}

function QuoraScene() {
  const ids = useArtIds();
  const items = [1, 2, 3];
  return (
    <>
      {/* source list */}
      <g>
        {items.map((n, i) => (
          <g key={n} className="art-float" style={{ ["--d" as string]: `${-i}s` }}>
            <rect x="24" y={40 + i * 54} width="120" height="44" fill={PAPER} />
            <rect x="30" y={46 + i * 54} width="40" height="32" fill={i === 1 ? INK : `url(#${ids.dots})`} />
            <Chip x={30} y={46 + i * 54}>{`0${n}`}</Chip>
            <path d={`M78 ${54 + i * 54} h56 M78 ${62 + i * 54} h44 M78 ${70 + i * 54} h50`} strokeWidth="0.9" />
          </g>
        ))}
      </g>
      {/* assembly arrows */}
      <path d="M144 62 C 180 62, 190 70, 222 70" className="art-dash" />
      <path d="M144 116 C 180 116, 190 112, 222 112" className="art-dash" />
      <path d="M144 170 C 180 170, 190 156, 222 156" className="art-dash" />
      {/* the long-form post */}
      <rect x="222" y="30" width="150" height="180" fill={PAPER} />
      <rect x="222" y="30" width="150" height="13" fill={INK} stroke="none" />
      <Note x={228} y={39.5} size={8}>
        <tspan fill={PAPER}>quill · rich HTML</tspan>
      </Note>
      <path d="M232 54 h96" strokeWidth="2.5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Note x={232} y={72 + i * 44} size={8}>
            {`${i + 1}.`}
          </Note>
          <rect x="244" y={64 + i * 44} width="54" height="30" fill={i === 1 ? INK : `url(#${ids.dots})`} />
          <path d={`M304 ${70 + i * 44} h56 M304 ${78 + i * 44} h44 M304 ${86 + i * 44} h50`} strokeWidth="0.9" pathLength={1} className="art-draw-loop" style={{ ["--d" as string]: `${-i * 0.8}s` }} />
        </g>
      ))}
      {/* copy button */}
      <g>
        <rect x="290" y="188" width="76" height="16" fill={ACCENT} />
        <Note x={328} y={199} anchor="middle" size={8}>
          copy as HTML
        </Note>
        <circle cx="366" cy="188" r="5" className="art-pulse" />
      </g>
      <Dim x1={222} x2={372} y={220} label="one post" />
      <Aruco x={160} y={190} size={22} seed="quoraformatter" />
      <Note x={12} y={18}>fig. 13 — curation post workbench</Note>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  The Artful Eye — light, rhythm and the golden spiral               */
/* ------------------------------------------------------------------ */

export function ArtfulEyeArt({ accent }: { accent?: string }) {
  return (
    <ArtFrame accent={accent} label="Arcade of arches with light rays and a golden spiral overlay">
      <ArtfulScene />
    </ArtFrame>
  );
}

/** Quarter-arc golden spiral inside a W×(W/φ) rectangle at (x0, y0), plus its square subdivisions. */
function goldenSpiral(x0: number, y0: number, W: number, turns = 6) {
  let x = x0;
  let y = y0;
  let w = W;
  let h = W / 1.618;
  const arcs: string[] = [];
  const squares: string[] = [];
  let start = `M${x} ${y + h}`;
  for (let i = 0; i < turns; i++) {
    const dir = i % 4;
    if (dir === 0) {
      // square on the left, arc bottom-left → top-right
      const a = h;
      arcs.push(`A${a} ${a} 0 0 1 ${x + a} ${y}`);
      squares.push(`M${x + a} ${y}V${y + h}`);
      x += a;
      w -= a;
    } else if (dir === 1) {
      // square on top, arc top-left → bottom-right
      const a = w;
      arcs.push(`A${a} ${a} 0 0 1 ${x + a} ${y + a}`);
      squares.push(`M${x} ${y + a}H${x + w}`);
      y += a;
      h -= a;
    } else if (dir === 2) {
      // square on the right, arc top-right → bottom-left
      const a = h;
      arcs.push(`A${a} ${a} 0 0 1 ${x + w - a} ${y + h}`);
      squares.push(`M${x + w - a} ${y}V${y + h}`);
      w -= a;
    } else {
      // square at the bottom, arc bottom-right → top-left
      const a = w;
      arcs.push(`A${a} ${a} 0 0 1 ${x} ${y + h - a}`);
      squares.push(`M${x} ${y + h - a}H${x + w}`);
      h -= a;
    }
  }
  return { spiral: `${start} ${arcs.join(" ")}`, squares: squares.join(" ") };
}

function ArtfulScene() {
  const ids = useArtIds();
  const W = 220;
  const x0 = 120;
  const y0 = 46;
  const H = W / 1.618;
  const { spiral, squares } = goldenSpiral(x0, y0, W);
  const openings = [0, 1, 2, 3, 4];
  return (
    <>
      {/* sun + rays */}
      <Sphere cx={364} cy={40} r={22} opacity={0.9} />
      <g strokeOpacity="0.55" strokeWidth="1">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M352 52 L${70 + i * 62} 200`} className="art-dash" />
        ))}
      </g>
      {/* arcade wall in halftone shade, arches cut out as paper (light) */}
      <rect x="30" y="80" width="300" height="112" fill={PAPER} />
      <rect x="30" y="80" width="300" height="112" fill={`url(#${ids.dots})`} stroke="none" opacity="0.75" />
      {openings.map((i) => {
        const x = 40 + i * 58;
        return (
          <g key={i}>
            <path d={`M${x} 192 V128 A22 22 0 0 1 ${x + 44} 128 V192 Z`} fill={PAPER} />
            {/* cast shadow inside the opening */}
            <path d={`M${x} 192 V128 A22 22 0 0 1 ${x + 14} 108 L${x + 14} 192 Z`} fill={`url(#${ids.hatch})`} stroke="none" opacity="0.6" />
            <path d={`M${x + 22} 106 v-6`} strokeWidth="1" />
          </g>
        );
      })}
      <path d="M24 80 H336 M24 74 H336" strokeWidth="1.6" />
      <rect x="24" y="192" width="312" height="10" fill={`url(#${ids.hatch})`} />
      {/* golden-ratio overlay */}
      <rect x={x0} y={y0} width={W} height={H} fill="none" strokeDasharray="4 3" strokeWidth="1.2" />
      <path d={squares} strokeDasharray="4 3" strokeWidth="1" />
      <path d={spiral} strokeWidth="2.4" pathLength={1} className="art-draw-loop" />
      {/* thirds */}
      <g strokeWidth="0.7" strokeOpacity="0.5" strokeDasharray="2 3">
        <path d="M10 75 H390 M10 150 H390 M133 10 V215 M266 10 V215" />
      </g>
      <Cross x={266} y={150} />
      <Chip x={272} y={156}>φ = 1.618</Chip>
      <g className="art-float">
        <Aruco x={358} y={184} size={22} seed="artfuleye" />
      </g>
      <Dim x1={x0} x2={x0 + W} y={214} label="golden rectangle" />
      <Note x={12} y={18}>fig. 14 — rhythm, light, proportion</Note>
    </>
  );
}
