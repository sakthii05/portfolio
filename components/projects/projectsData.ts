export interface ProjectItem {
  id: string;
  title: string;
  category: "freelance" | "onsite";
  role: string;
  clientOrCompany: string;
  year: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: {
    label: string;
    url: string;
  };
  githubUrl?: string;
  badge?: string;
  previewType: "canvas" | "editorial" | "architecture" | "telemetry" | "analytics" | "ecommerce" | "cms";
}

export const freelanceProjects: ProjectItem[] = [
  {
    id: "aura-architecture",
    title: "Aura Architecture Studio",
    category: "freelance",
    role: "Lead Frontend Engineer & Creative Dev",
    clientOrCompany: "Studio Aura",
    year: "2024 — 2025",
    description:
      "A high-fidelity digital portfolio and interactive spatial previewer built for an architectural design studio, focusing on tactile physical transitions, spatial geometry, and editorial typography.",
    highlights: [
      "Custom WebGL interactive project viewport with subtle camera dolly effects",
      "Dynamic project gallery with fluid page transitions and zero layout shifts",
      "99+ Google Lighthouse performance rating across mobile and desktop"
    ],
    technologies: ["Next.js", "Three.js", "GSAP", "Tailwind CSS", "TypeScript"],
    link: {
      label: "Visit Live Project",
      url: "https://github.com/sakthii05",
    },
    githubUrl: "https://github.com/sakthii05",
    badge: "Spatial & WebGL",
    previewType: "architecture",
  },
  {
    id: "kinetik-brand",
    title: "Kinetik Editorial Commerce",
    category: "freelance",
    role: "Full Frontend Architect",
    clientOrCompany: "Kinetik Goods",
    year: "2024",
    description:
      "An editorial apparel showcase and checkout experience designed with minimalist brutalist typography, micro-interactions, responsive sizing guides, and instantaneous cart operations.",
    highlights: [
      "Micro-animated product inspect drawers with haptic-inspired feedback",
      "Optimized headless checkout flow with optimistic state updates",
      "Sub-second page navigation using predictive asset prefetching"
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Framer Motion"],
    link: {
      label: "Explore Showcase",
      url: "https://github.com/sakthii05",
    },
    githubUrl: "https://github.com/sakthii05",
    badge: "Interactive Commerce",
    previewType: "ecommerce",
  },
  {
    id: "pulse-telehealth",
    title: "Pulse Health Systems",
    category: "freelance",
    role: "Frontend Developer",
    clientOrCompany: "Pulse MedTech",
    year: "2024",
    description:
      "A clinical appointment scheduling and real-time consultation coordination dashboard built for private healthcare providers with HIPAA-compliant state workflows.",
    highlights: [
      "Real-time appointment slot synchronization using WebSockets",
      "Accessible multi-step patient intake flows with strict WCAG 2.1 AA compliance",
      "Integrated secure tele-room status indicators and instant alerts"
    ],
    technologies: ["React", "TypeScript", "Socket.io", "TanStack Query", "Tailwind CSS"],
    link: {
      label: "Case Study & Demo",
      url: "https://github.com/sakthii05",
    },
    githubUrl: "https://github.com/sakthii05",
    badge: "Healthcare Platform",
    previewType: "telemetry",
  },
  {
    id: "verve-cms-publisher",
    title: "Verve Editorial Hub",
    category: "freelance",
    role: "Frontend Specialist",
    clientOrCompany: "Verve Publications",
    year: "2023 — 2024",
    description:
      "A modern headless content platform for independent writers, featuring live Markdown previews, dynamic typography sizing, reading rhythm tools, and automated newsletter triggers.",
    highlights: [
      "Distraction-free live editor with instant AST block parsing",
      "Light/dark typography scale tailored for reading comfort",
      "Edge-rendered static articles with sub-50ms TTFB worldwide"
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "MDX"],
    link: {
      label: "View Repository",
      url: "https://github.com/sakthii05",
    },
    githubUrl: "https://github.com/sakthii05",
    badge: "Headless CMS",
    previewType: "cms",
  },
];

export const onsiteProjects: ProjectItem[] = [
  {
    id: "ticvic-telemetry-suite",
    title: "Industrial Operations & Asset Telemetry Suite",
    category: "onsite",
    role: "Front-End Developer",
    clientOrCompany: "Ticvic Technologies",
    year: "2023 — 2025",
    description:
      "Mission-critical operations platform monitoring thousands of deployed IoT hardware nodes, displaying live sensor telemetry, anomaly threshold alerts, and fleet status graphs in real-time.",
    highlights: [
      "High-throughput WebSocket streaming architecture handling 1,000+ telemetry data events per second without UI stutter",
      "Custom virtualized data tables rendering 50,000+ data points with sub-frame render times",
      "Granular role-based access management and responsive touch-friendly control layouts"
    ],
    technologies: ["Next.js", "TypeScript", "Redux Toolkit", "Socket.io", "Tailwind CSS", "Canvas"],
    badge: "Enterprise Production",
    previewType: "telemetry",
  },
  {
    id: "ticvic-design-system",
    title: "Enterprise Core Design System",
    category: "onsite",
    role: "Frontend Developer",
    clientOrCompany: "Ticvic Technologies",
    year: "2023 — 2024",
    description:
      "Designed, documented, and published a unified, multi-product design system and accessible component library adopted across 6 cross-functional engineering teams.",
    highlights: [
      "Standardized 45+ robust UI components with zero external runtime style dependencies",
      "Automated token pipeline synchronizing Figma design tokens to Tailwind CSS variables",
      "Complete test suite with Cypress integration tests and Storybook visual regression checks"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Cypress", "Jest"],
    badge: "Design Infrastructure",
    previewType: "editorial",
  },
  {
    id: "ticvic-analytics-engine",
    title: "High-Throughput Analytics & Reporting Engine",
    category: "onsite",
    role: "Front-End Developer",
    clientOrCompany: "Ticvic Technologies",
    year: "2022 — 2023",
    description:
      "An interactive business intelligence and audit reporting dashboard allowing client teams to run multidimensional aggregate queries, visualize trends, and export compliance audits.",
    highlights: [
      "Reduced report generation latency by 45% using client-side Web Workers for dataset aggregation",
      "Implemented responsive SVG and Canvas chart modules with interactive cross-filtering",
      "Full internationalization support (i18n) and accessibility compliance"
    ],
    technologies: ["Next.js", "TypeScript", "TanStack Query", "D3.js", "Tailwind CSS"],
    badge: "Analytics & Data",
    previewType: "analytics",
  },
];
