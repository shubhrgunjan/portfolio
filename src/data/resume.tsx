import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "Shubhr Gunjan",
  initials: "SG",
  url: "https://github.com/shubhrgunjan",
  location: "Delhi NCR / Bihar, India",
  locationLink: "https://www.google.com/maps/place/India",
  description:
    "Systems & Robotics Software Engineer, AI Researcher, and Writer. Architecting humanoid simulations, edge intelligence engines, and thoughtful digital systems.",
  summary:
    "I am a software engineer and researcher driven by the convergence of **humanoid robotics**, **physics simulation**, and **edge intelligence**. My work spans developing physics-grounded teleoperation and MuJoCo simulation suites for the Menlo Asimov 1 humanoid robot ([VASIMOV](https://github.com/shubhrgunjan/vasimov)), training proprioceptive RL policies (PPO in mjlab), engineering air-gapped synthetic vector memory systems ([EdgeMed](https://github.com/shubhrgunjan/edgemed)), and building civic intelligence platforms like [Nyaya Flow](https://shubhrgunjan.github.io/nyaya-flow/) — an AI legal navigation system shortlisted at the *Build in AI for India* hackathon.\n\nBeyond engineering, I am a curious observer and writer on [Quora](https://www.quora.com/profile/Shubhr-Gunjan) where I curate *The Artful Eye*, writing on visual aesthetics, architectural proportions, photography, and human cognition. I build open-source tools that solve real frictions — from Linux Cinnamon gesture utilities to high-throughput streaming systems.",
  avatarUrl: "/shubhr-avatar.png",
  skills: [
    { name: "Python", icon: Python },
    { name: "Java", icon: Java },
    { name: "TypeScript", icon: Typescript },
    { name: "C++", icon: Csharp },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "React Native / Expo", icon: ReactLight },
    { name: "Node.js", icon: Nodejs },
    { name: "PostgreSQL / DuckDB", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "MuJoCo Simulation", icon: null },
    { name: "Three.js / WebGL", icon: null },
    { name: "Reinforcement Learning (PPO)", icon: null },
    { name: "Qdrant Vector DB", icon: null },
    { name: "Redis Streams & Pub/Sub", icon: null },
    { name: "Linux Mint / Kernel Automation", icon: null },
    { name: "Cedar Policy Engine", icon: null },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Writing" },
  ],
  contact: {
    email: "shubhrrgunjan@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/shubhrgunjan",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/shubhr-gunjan-6748802b0/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Quora: {
        name: "Quora",
        url: "https://www.quora.com/profile/Shubhr-Gunjan",
        icon: Icons.quora,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:shubhrrgunjan@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "OpenHorizon Labs & Autonomous Systems",
      href: "https://github.com/shubhrgunjan/vasimov",
      badges: ["Robotics", "Simulation"],
      location: "Open Source / Remote",
      title: "Humanoid Robotics & Simulation Engineer",
      logoUrl: "",
      start: "Aug 2026",
      end: "Present",
      description:
        "Engineered VASIMOV, a physics-grounded MuJoCo simulation environment for the Menlo Asimov 1 humanoid. Implemented official wire protocol teleoperation, ground-truth telemetry parsing, 78-observation to 23-action locomotion policy inference, and procedural obstacle generation. Developed accompanying 3D Web & React Native teleoperation controllers running on Hermes and native OpenGL ES 3.0 surfaces.",
    },
    {
      company: "EdgeMed Memory Lab (Code Cubicle 6.0)",
      href: "https://github.com/shubhrgunjan/edgemed",
      badges: ["AI / Edge", "Privacy"],
      location: "Virtual / National",
      title: "AI Systems Architect (PS03 Edge Intelligence)",
      logoUrl: "",
      start: "Sep 2026",
      end: "Oct 2026",
      description:
        "Architected an air-gapped, synthetic-data-only clinical observation vault and semantic search system. Implemented local Qdrant vector indexing, AES-encrypted vault storage, multi-tenant LAN authorization, and local LLM query loops with zero cloud egress.",
    },
    {
      company: "AndroPlay Systems",
      href: "https://github.com/shubhrgunjan/androplay",
      badges: ["Distributed Systems", "Android"],
      location: "Remote",
      title: "Distributed Display Systems Engineer",
      logoUrl: "",
      start: "Sep 2026",
      end: "Present",
      description:
        "Engineered zero-lag digital media synchronization for the LG CreateBoard (TR3DK, Android 13). Built dual-role Android application (Board & Admin) utilizing local storage pre-caching, standby video preloading, Redis Streams pub/sub (~20-60ms command dispatch), and BLE direct room control.",
    },
    {
      company: "The Artful Eye & Quora Publication",
      href: "https://www.quora.com/profile/Shubhr-Gunjan",
      badges: ["Writing", "Aesthetics"],
      location: "Online",
      title: "Creator, Curator & Tooling Developer",
      logoUrl: "",
      start: "2023",
      end: "Present",
      description:
        "Curating *The Artful Eye* space and publishing essays on architectural forms, visual aesthetics, photographic composition, and human perception. Built open-source workflow tools including QuoraFormatter and browser extensions to optimize article formatting and markdown typography.",
    },
  ],

  education: [
    {
      school: "Electronics & Communication Engineering",
      href: "https://github.com/shubhrgunjan",
      degree: "Bachelor of Technology (B.Tech) in ECE (2024 - 2028)",
      logoUrl: "",
      start: "2024",
      end: "2028",
    },
    {
      school: "University of Helsinki (MOOC.fi)",
      href: "https://mooc.fi",
      degree: "Java Programming I & II (Certified with Distinction)",
      logoUrl: "",
      start: "2026",
      end: "2026",
    },
    {
      school: "Central Board of Secondary Education (CBSE)",
      href: "https://cbse.gov.in",
      degree: "Senior Secondary (Class XII) — Physics, Chemistry, Mathematics & CS",
      logoUrl: "",
      start: "2022",
      end: "2024",
    },
  ],

  projects: [
    {
      title: "VASIMOV — Virtual Asimov 1 in MuJoCo",
      href: "https://github.com/shubhrgunjan/vasimov",
      dates: "Sep 2026 - Present",
      active: true,
      description:
        "Physics-grounded MuJoCo simulation environment, official wire protocol teleoperation, and ground-truth telemetry dashboard for the Menlo Asimov 1 humanoid. Features policy inference (78 obs → 23 act), manual joint overrides, procedural obstacle insertion, and flight data recording.",
      technologies: [
        "Python",
        "MuJoCo",
        "Three.js",
        "NumPy",
        "Robotics Telemetry",
        "Wire Protocol",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/vasimov",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/vasimov.webp",
      video: "",
    },
    {
      title: "Asimov 3D Web & Mobile Teleoperation Suite",
      href: "https://github.com/shubhrgunjan/asimov-controller-3d",
      dates: "Oct 2026",
      active: true,
      description:
        "High-performance 3D teleoperation controller for Asimov 1. Direct Three.js ownership avoiding React reconciler overhead, Hermes-optimized OpenGL ES 3.0 rendering, sub-16ms telemetry stream, and live joint limit monitoring.",
      technologies: [
        "TypeScript",
        "React Native",
        "Expo SDK",
        "Three.js",
        "expo-gl",
        "WebGL",
      ],
      links: [
        {
          type: "Source (3D Mobile)",
          href: "https://github.com/shubhrgunjan/asimov-controller-3d",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Web Controller",
          href: "https://github.com/shubhrgunjan/asimov-web-controller",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/asimov-controller.webp",
      video: "",
    },
    {
      title: "Nyaya Flow — AI Legal Navigation System",
      href: "https://shubhrgunjan.github.io/nyaya-flow/",
      dates: "Sep 2026",
      active: true,
      description:
        "AI-powered voice and multilingual legal assistance system for India. Converts citizens' real-world grievances into source-backed, structured steps of action in regional languages. Shortlisted at the Build in AI for India Delhi Hackathon.",
      technologies: [
        "TypeScript",
        "React Native / Expo",
        "Google Gemini",
        "Gnani.ai STT",
        "Firebase Firestore",
      ],
      links: [
        {
          type: "Live Demo",
          href: "https://shubhrgunjan.github.io/nyaya-flow/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/nyaya-flow",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/nyaya-flow.webp",
      video: "",
    },
    {
      title: "EdgeMed Memory Lab",
      href: "https://github.com/shubhrgunjan/edgemed",
      dates: "Sep 2026 - Oct 2026",
      active: true,
      description:
        "Synthetic-data-only AI memory and intelligence platform for air-gapped environments. On-device encrypted vault, local Qdrant vector retrieval, multi-tenant LAN demo, and zero data leakage architecture. Built for Code Cubicle 6.0.",
      technologies: [
        "Python",
        "Qdrant Vector DB",
        "FastAPI",
        "React",
        "Local LLM",
        "Cryptography",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/edgemed",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/edgemed.webp",
      video: "",
    },
    {
      title: "TJFLOW — Real-Time Visual Workspace",
      href: "https://github.com/shubhrgunjan/TJ-Tasks-2026-Shubhr_Gunjan",
      dates: "Sep 2026",
      active: true,
      description:
        "Modern real-time visual workspace and collaborative task management platform with spatial boards, reviewer test mode, and persistent multi-user activity sync.",
      technologies: [
        "TypeScript",
        "Next.js",
        "React",
        "TailwindCSS",
        "Real-Time Sync",
        "Canvas",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/TJ-Tasks-2026-Shubhr_Gunjan",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/tjflow.webp",
      video: "",
    },
    {
      title: "UIKey — Universal UI/UX Extraction for AI",
      href: "https://github.com/shubhrgunjan/UIKey",
      dates: "Oct 2026",
      active: true,
      description:
        "The universal UI/UX extraction and ingestion system for AI code generators. Visually extracts computed styles, bounding boxes, and design tokens, compiling them into hyper-compact manifests that LLMs understand without prompt bloat.",
      technologies: [
        "TypeScript",
        "Plasmo Extension",
        "Node.js AST",
        "Design Tokens",
        "Next.js",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/UIKey",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/uikey.webp",
      video: "",
    },
    {
      title: "AndroPlay — Zero-Lag Digital Display Player",
      href: "https://github.com/shubhrgunjan/androplay",
      dates: "Oct 2026",
      active: true,
      description:
        "Zero-lag content playback engine engineered for the LG CreateBoard (TR3DK, Android 13) controlled via phone, Bluetooth, or web. Features dual standby players, Redis pub/sub sync (~20-60ms), and direct BLE fast path.",
      technologies: [
        "Kotlin / Java",
        "Android SDK",
        "Redis Streams",
        "BLE",
        "Cloudflare R2",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/androplay",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/androplay.webp",
      video: "",
    },
    {
      title: "ExelSnap — Offline Spreadsheet AI",
      href: "https://github.com/shubhrgunjan/ExelSnap",
      dates: "Oct 2026",
      active: true,
      description:
        "Chat with your spreadsheets, fully offline. A desktop app (Electron + React) where a local model served by OpenHorizon SAPIENT queries Excel and CSV workbooks sandboxed with DuckDB, keeping data 100% private.",
      technologies: [
        "Electron",
        "React",
        "DuckDB",
        "SheetJS",
        "Local LLM",
        "OpenAI API",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/ExelSnap",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/exelsnap.webp",
      video: "",
    },
    {
      title: "Mint Zoom — Cinnamon Smooth Gestures",
      href: "https://github.com/shubhrgunjan/Mint_Zoom",
      dates: "Jul 2026",
      active: true,
      description:
        "A lightweight utility bringing macOS-grade smooth pinch-to-zoom and fluid trackpad scrolling to Google Chrome and Chromium browsers running on Linux Mint Cinnamon Edition.",
      technologies: [
        "JavaScript",
        "Linux Mint",
        "Cinnamon Desktop",
        "Chromium Gestures",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/Mint_Zoom",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/mintzoom.webp",
      video: "",
    },
    {
      title: "QuoraFormatter & CMS Tools",
      href: "https://github.com/shubhrgunjan/QuoraFormatter",
      dates: "Jun 2026",
      active: true,
      description:
        "A dedicated formatting utility and browser extension suite designed to structure, beautify, and organize long-form essays, typography, and photo layouts for Quora and web publication.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Chrome Extension API"],
      links: [
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/QuoraFormatter",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Quora Profile",
          href: "https://www.quora.com/profile/Shubhr-Gunjan",
          icon: <Icons.quora className="size-3" />,
        },
      ],
      image: "/projects/quoraformatter.webp",
      video: "",
    },
    {
      title: "ECHO//LOOP — Temporal Puzzle Game",
      href: "https://github.com/shubhrgunjan/echo-loop",
      dates: "Sep 2026",
      active: true,
      description:
        "A minimalist top-down temporal puzzle game where your past recordings become your coworkers in the timeline to solve cooperative puzzles.",
      technologies: ["JavaScript", "HTML5 Canvas", "Game Physics", "Web Audio"],
      links: [
        {
          type: "Source",
          href: "https://github.com/shubhrgunjan/echo-loop",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/echoloop.webp",
      video: "",
    },
  ],

  hackathons: [
    {
      title: "Build in AI for India (Delhi Edition)",
      dates: "September 13th, 2026",
      location: "PW IOI, Noida (Delhi NCR)",
      description:
        "Officially Shortlisted Finalist. Built Nyaya Flow — a multi-lingual, voice-first AI legal guidance system designed for Indian citizens to navigate legal processes with source-backed steps using Google Gemini and Gnani.ai STT. Presented by Gnani.ai, PW IOI, and StartupNews.fyi.",
      image: "/certificates/biai-shortlisted.webp",
      links: [
        {
          title: "Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "/certificates/biai-delhi.webp",
        },
        {
          title: "Live Demo",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://shubhrgunjan.github.io/nyaya-flow/",
        },
        {
          title: "GitHub",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/shubhrgunjan/nyaya-flow",
        },
      ],
    },
    {
      title: "Code Cubicle 6.0 Hackathon",
      dates: "September 2026",
      location: "National / Virtual",
      description:
        "Engineered EdgeMed Memory Lab under Problem Statement PS03. Built an on-device encrypted clinical observation vault with local Qdrant vector retrieval, zero-cloud dependency, and multi-tenant LAN synchronization.",
      image: "/projects/edgemed.webp",
      links: [
        {
          title: "GitHub",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/shubhrgunjan/edgemed",
        },
      ],
    },
    {
      title: "University of Helsinki — MOOC.fi Java Certification",
      dates: "July - August 2026",
      location: "University of Helsinki, Finland (Online)",
      description:
        "Completed rigorous curriculum in Java Programming I & II with full distinction. Implemented algorithms, collections, stream processing, recursive paradigms, and modular software design.",
      image: "/certificates/java-mooc-1.webp",
      links: [
        {
          title: "Part I Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "/certificates/java-mooc-1.webp",
        },
        {
          title: "Part II Certificate",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "/certificates/java-mooc-2.webp",
        },
        {
          title: "Solutions Repo",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/shubhrgunjan/java-programming-1",
        },
      ],
    },
  ],
} as const;
