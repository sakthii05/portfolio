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
    project:{link:"/", show:true},
  },
  {
    timeline: "2022 Nov - 2025 May",
    title: "Front-End Developer",
    company: "Ticvic Technologies",
    companyLogo: "/images/portfolio/tt-logo.png",
    description:
      "Built and optimized production web applications using Next.js, focusing on performance, SEO, and user experience. Developed scalable frontend solutions while solving real-world technical challenges across diverse projects. Continuously explored new technologies and improved development workflows to deliver reliable, high-quality applications.",
    project:{link:"/", show:true},
  },
  {
    timeline: "2022 Jun - 2022 Oct",
    title: "Trainee (Frontend)",
    company: "Ticvic Technologies",
    companyLogo: "/images/portfolio/tt-logo.png",
    description:
      "Built web projects using HTML, CSS, JavaScript, React, and Tailwind CSS. Gained practical experience with React, including components, hooks, state management, and effects. Created responsive websites with reusable components and cross-browser compatibility.",
   project:{link:"/", show:false},
  },
];


export const skillCategories = [
  {
    name: "Languages & Core",
    icon: LuCode,
    marker: { skillIndex:[10], explore: true },
    skills: [
      // { name: "JavaScript (ES6+)", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Next.js", icon: SiNextdotjs },
       { name: "React.js", icon: FaReact },
       { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "All UI Libs", icon: LuSparkles },
        { name: "Tanstack React-query", icon: SiTanstack },
         { name: "Socket.io", icon: SiSocketdotio },
         { name: "Redux Toolkit", icon: SiRedux },
         { name: "Framer Motion", icon: SiFramer },
         { name: "GSAP", icon: SiGsap },
        { name: "Three.js / R3F / WebGL", icon: SiThreedotjs },
     
    ],
  },
  {
    name: "Others",
   icon: LuWrench,
    marker: { skillIndex: [3,5,6], explore: true },
    skills: [
       { name: "Cypress", icon: SiCypress },
     { name: "Docker", icon: FaDocker },
     { name: "Google Search Console", icon: LuGlobe },
       { name: "Hugging Face", icon: SiHuggingface },
       { name: "Coding Agent", icon: LuCodeXml },
       { name: "Supabase", icon: RiSupabaseFill },
       { name: "Langchain", icon: SiLangchain },
       { name: "AI Tools & Workflows", icon: LuSparkles },
     
    ],
  },


];



