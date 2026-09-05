"use client";

import {
  LuCode,
  LuSparkles,
  LuLayers,
  LuCpu,
  LuWrench,
  LuGlobe,
  LuCodeXml,
} from "react-icons/lu";
import { FaReact, FaDocker, FaGitAlt, FaJira } from "react-icons/fa6";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiJest,
  SiCypress,
  SiSocketdotio,
  SiFramer,
  SiVite,
  SiAntdesign,
  SiHuggingface,
  SiLangchain,
  SiThreedotjs,
  SiGsap,
  SiTanstack,
} from "react-icons/si";
import { RiSupabaseFill } from "react-icons/ri";




export const timelineData = [
  {
    timeline: "2025 Jun - Present",
    title: "Freelancer",
    company: "Self-employed",
    companyLogo: "/images/portfolio/tt-logo.png",
    description:
      "As a self-employed freelancer, I've worked with clients across different industries, developing project proposals tailored to their needs and bringing those ideas into working products. Along the way, I've completed 4-5 projects for different clients while exploring AI tools and building side projects to experiment with new ideas and technologies.",
    projectLink: "",
  },
  {
    timeline: "2022 Nov - 2025 May",
    title: "Front-End Developer",
    company: "Ticvic Technologies",
    companyLogo: "/images/portfolio/tt-logo.png",
    description:
      "Built and optimized production web applications using Next.js, focusing on performance, SEO, and user experience. Developed scalable frontend solutions while solving real-world technical challenges across diverse projects. Continuously explored new technologies and improved development workflows to deliver reliable, high-quality applications.",
    projectLink: "",
  },
  {
    timeline: "2022 Jun - 2022 Oct",
    title: "Trainee",
    company: "Ticvic Technologies",
    companyLogo: "/images/portfolio/tt-logo.png",
    description:
      "Built web projects using HTML, CSS, JavaScript, React, and Tailwind CSS. Gained practical experience with React, including components, hooks, state management, and effects. Created responsive websites with reusable components and cross-browser compatibility.",
    projectLink: "",
  },
];


export const skillCategories = [
  {
    name: "Languages & Core",
    icon: LuCode,
    marker: { skillIndex: null, explore: false },
    skills: [
      { name: "JavaScript (ES6+)", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "HTML5 & Semantic Web", icon: LuGlobe },
      { name: "CSS3 / Modern Styling", icon: LuSparkles },
    ],
  },
  {
    name: "Frameworks & UI Libraries",
    icon: LuLayers,
    marker: { skillIndex: null, explore: false },
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React.js", icon: FaReact },
      { name: "Vite", icon: SiVite },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn / UI", icon: LuLayers },
      { name: "Hero UI", icon: LuLayers },
      { name: "Ant Design", icon: SiAntdesign },
      { name: "All JS Libs", icon: LuSparkles },
    ],
  },
  {
    name: "State, Realtime & Validation",
    marker: { skillIndex: null, explore: false },
    icon: LuCpu,
    skills: [
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "Socket.io", icon: SiSocketdotio },
      { name: "Zod & Yup", icon: LuCpu },
      { name: "EventSource (SSE)", icon: LuGlobe },
      { name: "Tanstack React-query", icon: SiTanstack },
    ],
  },
  {
    name: "Motion & Graphics",
    marker: { skillIndex: [2], explore: true },
    icon: LuSparkles,
    skills: [
      { name: "Framer Motion", icon: SiFramer },
      { name: "GSAP", icon: SiGsap },
      { name: "Three.js / R3F / WebGL", icon: SiThreedotjs },
    ],
  },
  {
    name: "Testing & DevOps",
    marker: { skillIndex: null, explore: false },
    icon: LuWrench,
    skills: [
      { name: "Jest", icon: SiJest },
      { name: "Cypress", icon: SiCypress },
      { name: "Docker", icon: FaDocker },
      { name: "Jira", icon: FaJira },
      { name: "Git / GitHub", icon: FaGitAlt },
    ],
  },
  {
    name: "Tools",
    marker: { skillIndex: [2, 4, 5, 6], explore: true },
    icon: LuGlobe,
    skills: [
      { name: "Google Search Console", icon: LuGlobe },
      { name: "Bing Webmaster", icon: LuGlobe },
      { name: "Hugging Face", icon: SiHuggingface },
      { name: "Coding Agent", icon: LuCodeXml },
      { name: "Supabase", icon: RiSupabaseFill },
      { name: "Langchain", icon: SiLangchain },
      { name: "AI Tools & Workflows", icon: LuSparkles },
    ],
  },
];



