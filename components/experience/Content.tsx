"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  LuBriefcase,
  LuGraduationCap,
  LuCode,
  LuChevronDown,
  LuExternalLink,
  LuCalendar,
  LuMapPin,
  LuSparkles,
  LuLayers,
  LuCpu,
  LuWrench,
  LuGlobe,
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
} from "react-icons/si";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  avatarText: string;
  avatarSrc?: string;
  summary: string;
  achievements: string[];
  techStack: string[];
  projectLinks?: { title: string; href: string }[];
}

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  avatarText: string;
  avatarSrc?: string;
  highlights: string[];
  coursework?: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "freelancer",
    role: "Freelancer",
    company: "Self Employed",
    period: "June 2025 – Present",
    location: "Chennai, India",
    avatarText: "SE",
    summary:
      "Delivering high-performance, tailored frontend solutions and AI-integrated side projects for diverse clients across multiple industries.",
    achievements: [
      "Developed project proposals and dynamic web interfaces tailored to diverse client specifications across various industries.",
      "Built side projects integrating AI tools and modern full-stack workflows for rapid experimentation and delivery.",
      "Successfully delivered 4–5 end-to-end client projects with a strong focus on responsiveness, aesthetics, and user delight.",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "AI Tools",
      "Framer Motion",
    ],
    projectLinks: [
      { title: "Portfolio Projects", href: "/projects" },
      { title: "GitHub Profile", href: "https://github.com/sakthii05" },
    ],
  },
  {
    id: "frontend-dev",
    role: "Front-End Developer",
    company: "Ticvic Technologies",
    period: "November 2022 – May 2025",
    location: "Chennai, India",
    avatarText: "TT",
    summary:
      "Spearheaded core frontend architecture, real-time interactive dashboards, marketing campaign platforms, and web performance optimization.",
    achievements: [
      "Redesigned and engineered the company's flagship website frontend with Next.js, achieving exceptional SEO scores and significantly lowering TTFB & page load times.",
      "Boosted marketing campaign user traffic, retention, and conversion rates through micro-animations and intuitive UI flows.",
      "Architected a comprehensive survey and feedback platform with role-based access control (RBAC) for admins, leads, and staff.",
      "Engineered team-based survey flows, dynamic form builders, and data visualization analytics powered by WebSockets for real-time reporting.",
      "Implemented a real-time ticketing dashboard and user role tracking with Next.js and Socket.io, improving internal testing throughput and product stability.",
      "Designed and launched an interactive cyber threat map landing page leveraging EventSource (SSE) for live global threat coordinates.",
    ],
    techStack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Socket.io",
      "Tailwind CSS",
      "Redux Toolkit",
      "GSAP",
      "Zod",
    ],
    projectLinks: [
      { title: "Ticvic Website", href: "https://www.ticvic.com" },
      { title: "Projects Showcase", href: "/projects" },
    ],
  },
  {
    id: "trainee-frontend",
    role: "Trainee - Front-End Development",
    company: "Ticvic Technologies",
    period: "June 2022 – November 2022",
    location: "Chennai, India",
    avatarText: "TT",
    summary:
      "Solidified foundational frontend development, component modularity, responsive design principles, and state management in React.",
    achievements: [
      "Mastered HTML5, modern semantic CSS, and ES6+ JavaScript from the ground up by building modular, accessible web components.",
      "Adopted clean code architecture, design tokens, and web performance best practices.",
      "Engineered mobile-first responsive web layouts with Tailwind CSS, ensuring pixel-perfect rendering across modern browsers.",
      "Developed interactive single-page applications with React.js, deeply focusing on lifecycle management, custom hooks, and state immutability.",
      "Conducted cross-browser compatibility testing and resolved UI rendering discrepancies across Chromium, Gecko, and WebKit.",
    ],
    techStack: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Git",
    ],
    projectLinks: [
      { title: "GitHub Repositories", href: "https://github.com/sakthii05" },
    ],
  },
];

const skillCategories = [
  {
    name: "Languages & Core",
    icon: LuCode,
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
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React.js", icon: FaReact },
      { name: "Vite", icon: SiVite },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn / UI", icon: LuLayers },
      { name: "Hero UI", icon: LuLayers },
      { name: "Ant Design", icon: SiAntdesign },
    ],
  },
  {
    name: "State, Realtime & Validation",
    icon: LuCpu,
    skills: [
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "Socket.io", icon: SiSocketdotio },
      { name: "Zod", icon: LuCpu },
      { name: "EventSource (SSE)", icon: LuGlobe },
    ],
  },
  {
    name: "Motion & Graphics",
    icon: LuSparkles,
    skills: [
      { name: "Framer Motion", icon: SiFramer },
      { name: "GSAP", icon: LuSparkles },
      { name: "Three.js / WebGL", icon: LuSparkles },
    ],
  },
  {
    name: "Testing & DevOps",
    icon: LuWrench,
    skills: [
      { name: "Jest", icon: SiJest },
      { name: "Cypress", icon: SiCypress },
      { name: "Docker", icon: FaDocker },
      { name: "Git / GitHub", icon: FaGitAlt },
      { name: "Jira", icon: FaJira },
    ],
  },
  {
    name: "SEO & Webmaster",
    icon: LuGlobe,
    skills: [
      { name: "Google Search Console", icon: LuGlobe },
      { name: "Bing Webmaster", icon: LuGlobe },
      { name: "AI Tools & Workflows", icon: LuSparkles },
    ],
  },
];

const educations: EducationItem[] = [
  {
    id: "saveetha-be",
    degree: "Bachelor of Engineering in Electronics and Communication",
    institution: "Saveetha Engineering College",
    period: "2018 – 2022",
    location: "Chennai, India",
    avatarText: "SEC",
    highlights: [
      "Graduated with strong technical grounding in hardware-software interfacing, digital electronics, and computer networks.",
      "Spearheaded technical presentations, web development initiatives, and collaborative project symposiums.",
      "Developed problem-solving rigor, data structures knowledge, and hands-on programming fundamentals.",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Computer Networks",
      "Microprocessors & Microcontrollers",
      "Digital Signal Processing",
    ],
  },
];

const ExperiencePage = () => {
  // Track open accordion IDs (default first experience open for great first impression)
  const [openExperiences, setOpenExperiences] = useState<
    Record<string, boolean>
  >({
    freelancer: true,
    "frontend-dev": false,
    "trainee-frontend": false,
  });

  const [openEducations, setOpenEducations] = useState<Record<string, boolean>>(
    {
      "saveetha-be": true,
    },
  );

  const toggleExperience = (id: string) => {
    setOpenExperiences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleEducation = (id: string) => {
    setOpenEducations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden flex justify-center text-foreground scroll-smooth">
      <div className="w-full max-w-4xl px-4 sm:px-6 md:px-10 pt-16 md:pt-20 pb-36 space-y-16">
        {/* Header Title Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs md:text-sm font-mono border border-foreground/15 bg-foreground/5 text-muted-foreground">
            <LuSparkles className="size-3.5 text-foreground" />
            <span>Curriculum Vitae</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold font-mono tracking-tight text-foreground">
            Experience & Journey
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            A comprehensive overview of my professional experience, core
            technical skills, and educational foundation in engineering.
          </p>
        </div>

        {/* 1. EXPERIENCE SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-foreground/5 text-foreground border border-foreground/10">
                <LuBriefcase className="size-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold font-mono tracking-wide text-foreground">
                Work Experience
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              01 / Experience
            </span>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => {
              const isOpen = !!openExperiences[exp.id];

              return (
                <div
                  key={exp.id}
                  className="group rounded-2xl border border-foreground/10 bg-background/50 hover:border-foreground/25 backdrop-blur-xl transition-all duration-300 shadow-sm overflow-hidden"
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleExperience(exp.id)}
                    className="w-full text-left p-4 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
                      {/* Avatar Space for Company Logo / Monogram */}
                      <div className="relative shrink-0 size-12 sm:size-14 rounded-full overflow-hidden border border-foreground/15 bg-foreground/5 flex items-center justify-center font-mono font-bold text-foreground text-sm sm:text-base shadow-inner group-hover:border-foreground/35 transition-colors">
                        {exp.avatarSrc ? (
                          <Image
                            src={exp.avatarSrc}
                            alt={exp.company}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span>{exp.avatarText}</span>
                        )}
                      </div>

                      {/* Main Info */}
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight group-hover:text-foreground/90 transition-colors truncate">
                            {exp.role}
                          </h3>
                          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground shrink-0">
                            <LuCalendar className="size-3.5" />
                            <span>{exp.period}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                          <span className="font-medium text-foreground/80">
                            {exp.company}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <LuMapPin className="size-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <div
                      className={`p-2 rounded-full border border-foreground/10 bg-foreground/5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 text-foreground bg-foreground/10"
                          : ""
                      }`}
                    >
                      <LuChevronDown className="size-4" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-6 pt-2 space-y-5 border-t border-foreground/5 text-sm sm:text-base">
                          {/* Brief Summary */}
                          <p className="text-muted-foreground leading-relaxed">
                            {exp.summary}
                          </p>

                          {/* Key Highlights Bullet Points */}
                          <div className="space-y-2.5">
                            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-foreground/75">
                              Key Highlights & Responsibilities
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {exp.achievements.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 leading-relaxed"
                                >
                                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Stack Pills */}
                          <div className="space-y-2">
                            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-foreground/75">
                              Technologies & Tools
                            </h4>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {exp.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 rounded-full text-xs font-mono bg-foreground/5 border border-foreground/10 text-foreground/90 hover:bg-foreground/10 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Project Links */}
                          {exp.projectLinks && exp.projectLinks.length > 0 && (
                            <div className="pt-2 flex flex-wrap items-center gap-3">
                              {exp.projectLinks.map((link, idx) => {
                                const isExternal = link.href.startsWith("http");
                                return (
                                  <Link
                                    key={idx}
                                    href={link.href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={
                                      isExternal
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-foreground text-background hover:scale-105 active:scale-95 transition-all duration-200"
                                  >
                                    <span>{link.title}</span>
                                    <LuExternalLink className="size-3.5" />
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. SKILLS SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-foreground/5 text-foreground border border-foreground/10">
                <LuCode className="size-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold font-mono tracking-wide text-foreground">
                Skills & Technologies
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              02 / Skills
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <div
                  key={category.name}
                  className="rounded-2xl border border-foreground/10 bg-background/50 hover:border-foreground/25 backdrop-blur-xl p-5 sm:p-6 space-y-3.5 transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 text-foreground">
                    <CategoryIcon className="size-4 text-muted-foreground" />
                    <h3 className="font-mono text-base font-semibold tracking-wide">
                      {category.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/20 text-foreground/90 transition-colors"
                        >
                          <SkillIcon className="size-3.5 text-foreground/75" />
                          <span>{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. EDUCATION SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-foreground/5 text-foreground border border-foreground/10">
                <LuGraduationCap className="size-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold font-mono tracking-wide text-foreground">
                Education
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              03 / Education
            </span>
          </div>

          <div className="space-y-4">
            {educations.map((edu) => {
              const isOpen = !!openEducations[edu.id];

              return (
                <div
                  key={edu.id}
                  className="group rounded-2xl border border-foreground/10 bg-background/50 hover:border-foreground/25 backdrop-blur-xl transition-all duration-300 shadow-sm overflow-hidden"
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleEducation(edu.id)}
                    className="w-full text-left p-4 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
                      {/* Avatar Space for College Logo / Monogram */}
                      <div className="relative shrink-0 size-12 sm:size-14 rounded-full overflow-hidden border border-foreground/15 bg-foreground/5 flex items-center justify-center font-mono font-bold text-foreground text-sm sm:text-base shadow-inner group-hover:border-foreground/35 transition-colors">
                        {edu.avatarSrc ? (
                          <Image
                            src={edu.avatarSrc}
                            alt={edu.institution}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span>{edu.avatarText}</span>
                        )}
                      </div>

                      {/* Main Info */}
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                          <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight group-hover:text-foreground/90 transition-colors">
                            {edu.degree}
                          </h3>
                          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground shrink-0">
                            <LuCalendar className="size-3.5" />
                            <span>{edu.period}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                          <span className="font-medium text-foreground/80">
                            {edu.institution}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <LuMapPin className="size-3" />
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <div
                      className={`p-2 rounded-full border border-foreground/10 bg-foreground/5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 text-foreground bg-foreground/10"
                          : ""
                      }`}
                    >
                      <LuChevronDown className="size-4" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-6 pt-2 space-y-5 border-t border-foreground/5 text-sm sm:text-base">
                          {/* Highlights */}
                          <div className="space-y-2.5">
                            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-foreground/75">
                              Academic Highlights & Foundations
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {edu.highlights.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 leading-relaxed"
                                >
                                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Key Coursework */}
                          {edu.coursework && (
                            <div className="space-y-2">
                              <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-foreground/75">
                                Key Coursework & Fundamentals
                              </h4>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {edu.coursework.map((course) => (
                                  <span
                                    key={course}
                                    className="px-2.5 py-1 rounded-full text-xs font-mono bg-foreground/5 border border-foreground/10 text-foreground/90"
                                  >
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExperiencePage;
