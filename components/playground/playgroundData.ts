export type PlaygroundCategory = "hero" | "component" | "ai";

export interface PlaygroundItem {
  id: string;
  title: string;
  category: PlaygroundCategory;
  tag: string;
  date: string;
  description: string;
  technologies: string[];
  interactiveType:
    | "fluid-distortion"
    | "train-shutter"
    | "led-marquee"
    | "monochrome-hero"
    | "spring-timeline"
    | "magnetic-btn"
    | "floating-dock"
    | "segmented-pill"
    | "svg-sandbox"
    | "token-stream"
    | "terminal-agent"
    | "voice-spectrogram";
}

export const playgroundTabs: { id: PlaygroundCategory; label: string; count: number }[] = [
  { id: "hero", label: "Hero", count: 4 },
  { id: "component", label: "Component", count: 4 },
  { id: "ai", label: "AI Apps", count: 4 },
];

export const playgroundItems: PlaygroundItem[] = [
  // --- HERO TAB ---
  {
    id: "fluid-distortion",
    title: "Fluid Distortion Dual-Layer Canvas",
    category: "hero",
    tag: "WebGL & Shaders",
    date: "2025",
    description:
      "Interactive GLSL cursor displacement mapping and dual-layer image reveal effect running high-performance GPU shaders with zero frame drops.",
    technologies: ["Three.js", "R3F", "GLSL", "WebGL"],
    interactiveType: "fluid-distortion",
  },
  {
    id: "train-shutter",
    title: "Kinetic Window Shutter Experience",
    category: "hero",
    tag: "Tactile Physics",
    date: "2025",
    description:
      "Interactive train window shutter with spring-based drag physics, realistic acoustic sound feedback, and night/day travel ambiance.",
    technologies: ["Framer Motion", "Web Audio API", "React"],
    interactiveType: "train-shutter",
  },
  {
    id: "led-marquee",
    title: "Vintage LED Phosphor Telemetry Board",
    category: "hero",
    tag: "Retro Display",
    date: "2025",
    description:
      "Authentic dot-matrix LED passenger arrival display with simulated phosphor persistence, realtime train clock, and ticker animations.",
    technologies: ["Tailwind CSS", "Canvas", "Typography"],
    interactiveType: "led-marquee",
  },
  {
    id: "monochrome-hero",
    title: "Monochrome Kinetic Typography Canvas",
    category: "hero",
    tag: "Editorial Motion",
    date: "2024",
    description:
      "High-contrast editorial serif typography with layered spatial depth, mouse inertia tracking, and viewport clipping masking.",
    technologies: ["GSAP", "TypeScript", "Tailwind CSS"],
    interactiveType: "monochrome-hero",
  },

  // --- COMPONENT TAB ---
  {
    id: "spring-timeline",
    title: "Smooth Inertia Spring Timeline",
    category: "component",
    tag: "Scroll Interaction",
    date: "2025",
    description:
      "Elastic scroll-progress tracking timeline rail with non-linear spring physics, rest-delta damping, and active marker tracking.",
    technologies: ["Framer Motion", "React", "TypeScript"],
    interactiveType: "spring-timeline",
  },
  {
    id: "magnetic-btn",
    title: "Tactile Magnetic Action Button",
    category: "component",
    tag: "Micro-Interaction",
    date: "2025",
    description:
      "Physics-based magnetic button that gravitationally pulls towards the cursor with micro-displacement and active contact trigger states.",
    technologies: ["Framer Motion", "React", "CSS Variables"],
    interactiveType: "magnetic-btn",
  },
  {
    id: "floating-dock",
    title: "Dynamic Floating Dock Bar",
    category: "component",
    tag: "Navigation UI",
    date: "2025",
    description:
      "Tactile floating navbar featuring blur backdrop filtering, active route indicators, tooltip micro-delays, and dark mode toggling.",
    technologies: ["React", "Tailwind CSS", "A11y"],
    interactiveType: "floating-dock",
  },
  {
    id: "segmented-pill",
    title: "Keyboard-Navigable Segmented Filter",
    category: "component",
    tag: "Accessible Tabs",
    date: "2024",
    description:
      "Accessible segmented control with spring layout physics, keyboard arrow navigation, and zero-layout-shift active pill indicators.",
    technologies: ["Framer Motion", "React", "WCAG 2.1"],
    interactiveType: "segmented-pill",
  },

  // --- AI APPS TAB ---
  {
    id: "svg-sandbox",
    title: "Prompt-to-SVG Architecture Sandbox",
    category: "ai",
    tag: "Generative UI",
    date: "2025",
    description:
      "Interactive SVG canvas visualizing generated vector system diagrams with instant node inspection, coordinate snapping, and code export.",
    technologies: ["React", "SVG", "Web Workers", "LLM Stream"],
    interactiveType: "svg-sandbox",
  },
  {
    id: "token-stream",
    title: "LLM Token Emission & Latency Profiler",
    category: "ai",
    tag: "Streaming Metrics",
    date: "2025",
    description:
      "Chunk-by-chunk token arrival visualizer displaying TTFT (time-to-first-token), output tokens per second, and inference jitter graphs.",
    technologies: ["React", "SSE", "Canvas", "TypeScript"],
    interactiveType: "token-stream",
  },
  {
    id: "terminal-agent",
    title: "Context-Aware Agent Console",
    category: "ai",
    tag: "Agent Tooling",
    date: "2025",
    description:
      "Keyboard-first agent console terminal with multi-step tool call inspection, syntax highlighting, and collapsible reasoning trees.",
    technologies: ["TypeScript", "Terminal UI", "Markdown"],
    interactiveType: "terminal-agent",
  },
  {
    id: "voice-spectrogram",
    title: "Audio Spectrogram & Voice Agent Monitor",
    category: "ai",
    tag: "Audio & WebRTC",
    date: "2024",
    description:
      "Real-time audio frequency visualizer and speech turn-taking monitor built for conversational AI voice agents with Web Audio API.",
    technologies: ["Web Audio API", "HTML5 Canvas", "React"],
    interactiveType: "voice-spectrogram",
  },
];
