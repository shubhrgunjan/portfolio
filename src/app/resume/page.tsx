import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, Download, ExternalLink, FileCode, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Resume | Shubhr Gunjan",
  description:
    "Curriculum Vitae of Shubhr Gunjan — Systems & Robotics Software Engineer, AI Researcher, and Writer.",
};

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-16">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2.5 py-1 inline-flex items-center gap-1.5 group"
        >
          <ChevronLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Portfolio
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/Shubhr_Gunjan_Resume.pdf"
            download="Shubhr_Gunjan_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
          >
            <Download className="size-3.5" />
            <span>Download PDF</span>
          </a>
          <a
            href="https://github.com/shubhrgunjan/portfolio/blob/main/resume/Shubhr_Gunjan_Resume.tex"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <FileCode className="size-3.5" />
            <span>LaTeX Source</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Resume Document Canvas */}
      <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-lg text-card-foreground">
        {/* Header */}
        <header className="text-center pb-5 border-b border-border/60">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-foreground">
            Shubhr Gunjan
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Delhi NCR / Bihar, India •{" "}
            <a href="mailto:shubhrrgunjan@gmail.com" className="text-primary hover:underline">
              shubhrrgunjan@gmail.com
            </a>{" "}
            •{" "}
            <a href="https://github.com/shubhrgunjan" target="_blank" rel="noopener noreferrer" className="hover:underline">
              github.com/shubhrgunjan
            </a>{" "}
            •{" "}
            <a href="https://www.linkedin.com/in/shubhr-gunjan-6748802b0/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              linkedin.com/in/shubhr-gunjan
            </a>{" "}
            •{" "}
            <a href="https://www.quora.com/profile/Shubhr-Gunjan" target="_blank" rel="noopener noreferrer" className="hover:underline">
              quora.com/profile/Shubhr-Gunjan
            </a>
          </p>
        </header>

        {/* Section: Education */}
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-1 mb-3">
            Education
          </h2>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm sm:text-base">
                  Bachelor of Technology (B.Tech) in Electronics & Communication Engineering
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">2024 – 2028</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground">
                <span>Relevant Coursework: DSP, Embedded Systems, Microprocessors, DSA, Computer Architecture</span>
                <span className="shrink-0 italic">India</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm sm:text-base">
                  University of Helsinki (MOOC.fi)
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">2026</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground">
                <span>Java Programming I & II Certification — Passed with Distinction</span>
                <span className="shrink-0 italic">Helsinki, Finland (Remote)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Technical Skills */}
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
            <p>
              <strong className="text-foreground">Languages:</strong>{" "}
              <span className="text-muted-foreground">Python, Java, C++, TypeScript, JavaScript, SQL, Bash</span>
            </p>
            <p>
              <strong className="text-foreground">Robotics & Simulation:</strong>{" "}
              <span className="text-muted-foreground">
                MuJoCo Physics Engine, MJCF Modeling, Three.js / WebGL, Forward/Inverse Kinematics, Teleoperation Protocols, PPO Reinforcement Learning (mjlab)
              </span>
            </p>
            <p>
              <strong className="text-foreground">AI & Edge Systems:</strong>{" "}
              <span className="text-muted-foreground">
                Qdrant Vector Database, FastEmbed, Retrieval-Augmented Generation (RAG), Gemini API, DuckDB, Redis Streams & Pub/Sub, Docker, Linux Mint / Ubuntu
              </span>
            </p>
            <p>
              <strong className="text-foreground">Web & Mobile:</strong>{" "}
              <span className="text-muted-foreground">
                React, Next.js (App Router), React Native / Expo, Node.js, FastAPI, Tailwind CSS, PostgreSQL
              </span>
            </p>
          </div>
        </section>

        {/* Section: Experience & Research */}
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-1 mb-3">
            Experience & Research
          </h2>
          <div className="flex flex-col gap-5">
            {/* Exp 1 */}
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm sm:text-base">
                  OpenHorizon Labs & Autonomous Systems
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">Aug 2026 – Present</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground mb-1.5">
                <span className="italic">Humanoid Robotics & Simulation Software Engineer</span>
                <span className="shrink-0 italic">Open Source / Remote</span>
              </div>
              <ul className="list-disc list-outside ml-4 flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                <li>
                  Architected <strong className="text-foreground">VASIMOV</strong>, an open-source MuJoCo simulation digital twin for the Menlo Asimov 1 humanoid robot, enabling <strong className="text-foreground">60 FPS</strong> browser WebGL visualization with <strong className="text-foreground">&lt;15ms network latency</strong> by streaming binary joint-state transforms over WebSockets.
                </li>
                <li>
                  Engineered a proprioceptive policy inference pipeline converting a <strong className="text-foreground">78-dimensional observation vector</strong> (quaternions, 6-axis IMU, joint encoders) into <strong className="text-foreground">23 joint actuator target angles</strong> at <strong className="text-foreground">50 Hz</strong> using NumPy and Python.
                </li>
                <li>
                  Developed the <strong className="text-foreground">Asimov 3D Web & Mobile Teleoperation Suite</strong> using React Native/Expo and Three.js, bypassing React reconciler overhead to sustain real-time 16ms telemetry stream and live joint-limit monitoring.
                </li>
              </ul>
            </div>

            {/* Exp 2 */}
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm sm:text-base">
                  EdgeMed Memory Lab (Code Cubicle 6.0 Hackathon)
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">Sep 2026 – Oct 2026</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground mb-1.5">
                <span className="italic">AI Systems Architect — Problem Statement PS03 (Edge Intelligence)</span>
                <span className="shrink-0 italic">Hybrid / Virtual</span>
              </div>
              <ul className="list-disc list-outside ml-4 flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                <li>
                  Designed an air-gapped synthetic clinical memory vault executing on-device local semantic vector search with <strong className="text-foreground">zero external cloud API leakage</strong>, delivering <strong className="text-foreground">sub-120ms retrieval latency</strong> on resource-constrained hardware.
                </li>
                <li>
                  Engineered multi-tenant ingestion pipelines embedding synthetic EHR notes into a local <strong className="text-foreground">Qdrant</strong> vector store, implementing AES-256 payload encryption and role-based access verification.
                </li>
              </ul>
            </div>

            {/* Exp 3 */}
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm sm:text-base">
                  AndroPlay Systems
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">Sep 2026 – Present</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground mb-1.5">
                <span className="italic">Distributed Display Systems Engineer</span>
                <span className="shrink-0 italic">Remote</span>
              </div>
              <ul className="list-disc list-outside ml-4 flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                <li>
                  Engineered a zero-lag digital signage engine for the LG CreateBoard (TR3DK, Android 13) using <strong className="text-foreground">Redis Streams</strong> and BLE, achieving <strong className="text-foreground">&lt;20ms dual-standby playback synchronization</strong> from mobile and web controllers.
                </li>
              </ul>
            </div>

            {/* Exp 4 */}
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm sm:text-base">
                  The Artful Eye (Quora Publication)
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">2023 – Present</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground mb-1.5">
                <span className="italic">Creator, Curator & Tooling Developer</span>
                <span className="shrink-0 italic">Quora Publication</span>
              </div>
              <ul className="list-disc list-outside ml-4 flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                <li>
                  Curated and authored essays on architectural geometry, lighting physics, and human spatial cognition, amassing thousands of readers; engineered <strong className="text-foreground">QuoraFormatter</strong> browser extension to automate typography and layout structuring.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Featured Projects */}
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-1 mb-3">
            Featured Projects
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm sm:text-base">
                  Nyaya Flow — AI Legal Navigation System
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">Sep 2026</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground mb-1">
                <span className="italic">TypeScript, React Native / Expo, Google Gemini, Gnani.ai STT, Firebase</span>
                <a href="https://shubhrgunjan.github.io/nyaya-flow/" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                  Live Demo
                </a>
              </div>
              <ul className="list-disc list-outside ml-4 flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                <li>
                  Built a voice-first multilingual civic assistance platform translating citizen grievances into source-backed legal action steps; <strong className="text-foreground">officially shortlisted as a Finalist at the Build in AI for India Delhi Edition hackathon</strong>.
                </li>
                <li>
                  Integrated Google Gemini structured reasoning with Gnani.ai speech recognition models, handling noisy real-world audio inputs with <strong className="text-foreground">94%+ intent classification accuracy</strong> across Indian regional languages.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm sm:text-base">
                  UIKey — Universal UI/UX Extraction & AST Token Compiler
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">Oct 2026</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground mb-1">
                <span className="italic">TypeScript, Plasmo Browser Extension, Node.js AST, Next.js</span>
                <a href="https://github.com/shubhrgunjan/uikey" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                  GitHub
                </a>
              </div>
              <ul className="list-disc list-outside ml-4 flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                <li>
                  Engineered a browser extraction engine and AST compiler that extracts computed styles, bounding boxes, and design tokens into hyper-compact JSON manifests, slashing prompt token overhead for LLM code generators by <strong className="text-foreground">65%</strong>.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-sm sm:text-base">
                  ExelSnap — Offline Desktop Spreadsheet AI
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">Oct 2026</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-muted-foreground mb-1">
                <span className="italic">Electron, React, DuckDB, SheetJS, Local LLM</span>
                <a href="https://github.com/shubhrgunjan/ExelSnap" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                  GitHub
                </a>
              </div>
              <ul className="list-disc list-outside ml-4 flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                <li>
                  Created a desktop application executing natural-language SQL queries over large Excel and CSV workbooks using embedded <strong className="text-foreground">DuckDB</strong>, preserving <strong className="text-foreground">100% offline data privacy</strong> with zero cloud transmission.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Honors & Accolades */}
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-border pb-1 mb-3">
            Honors & Accolades
          </h2>
          <div className="flex flex-col gap-2 text-xs sm:text-sm">
            <div className="flex justify-between items-baseline">
              <span>
                <strong className="text-foreground">Shortlisted Finalist Developer:</strong>{" "}
                <span className="text-muted-foreground">Build in AI for India (Delhi Edition) — Nyaya Flow (Gnani.ai, PW IOI, StartupNews.fyi)</span>
              </span>
              <span className="text-xs font-mono text-muted-foreground shrink-0">Sep 2026</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>
                <strong className="text-foreground">Hackathon Finalist:</strong>{" "}
                <span className="text-muted-foreground">Code Cubicle 6.0 — EdgeMed Memory Lab (Problem Statement PS03 Edge Intelligence)</span>
              </span>
              <span className="text-xs font-mono text-muted-foreground shrink-0">Sep 2026</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>
                <strong className="text-foreground">Certificate of Distinction:</strong>{" "}
                <span className="text-muted-foreground">University of Helsinki — Java Programming I & II (MOOC.fi)</span>
              </span>
              <span className="text-xs font-mono text-muted-foreground shrink-0">2026</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
