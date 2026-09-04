"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { skillCategories } from "./Content";
import TrainTrack from "./TrainTrack";
import Image from "next/image";
import { useThemeMode } from "@/hooks/useThemeMode";

const timelineData = [
  {
    timeline: "2025 Jun - Present",
    title: "Freelancer",
    company: "Self-employed",
    companyLogo: "",
    description:
      "As a self-employed freelancer, I've worked with clients across different industries, developing project proposals tailored to their needs and bringing those ideas into working products. Along the way, I've completed 4-5 projects for different clients while exploring AI tools and building side projects to experiment with new ideas and technologies.",
    projectLink: "",
  },
  {
    timeline: "2022 Nov - 2025 May",
    title: "Front-End Developer",
    company: "Ticvic Technologies",
    companyLogo: "",
    description:
      "Built and optimized production web applications using Next.js, focusing on performance, SEO, and user experience. Developed scalable frontend solutions while solving real-world technical challenges across diverse projects. Continuously explored new technologies and improved development workflows to deliver reliable, high-quality applications.",
    projectLink: "",
  },
  {
    timeline: "2022 Jun - 2022 Oct",
    title: "Trainee",
    company: "Ticvic Technologies",
    companyLogo: "",
    description:
      "Built web projects using HTML, CSS, JavaScript, React, and Tailwind CSS. Gained practical experience with React, including components, hooks, state management, and effects. Created responsive websites with reusable components and cross-browser compatibility.",
    projectLink: "",
  },
];

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);
  const { isDark,resolvedTheme } = useThemeMode();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });
  // Smooth out the value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
    mass: 0.8,
  });

  // Convert 0→1 progress into pixel Y position along the line
  // We use a percentage-based transform so it works regardless of line height
  // Indicator height = 40px (h-10), so max is calc(100% - 40px)
  const indicatorY = useTransform(
    smoothProgress,
    [0, 0.2, 1],
    ["0%", "25%", "100%"],
  );
  useEffect(() => {
    const element = trackRef.current;

    if (!element) return;

    const update = () => {
     setTrackHeight(element.offsetHeight);
     console.log(element.offsetHeight)
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={timelineRef}
        className="grid grid-cols-[auto_1fr] w-full md:w-[80%] lg:w-[55%] px-5 gap-10 md:gap-15 pt-15 pb-25"
      >
        {/* Line */}
        <div className="relative">
          <TrainTrack
            width={25}
            color={isDark ? "#404040" : "#a1a1a1"}
            height={trackHeight}
          />
          {/* Indicator  */}
          <motion.div
            className="absolute"
            style={{
              top: indicatorY,
              // pull it up by its own height as it reaches the bottom
              y: useTransform(smoothProgress, [0, 1], ["0%", "-100%"]),
            }}
          >
            <Image
              src={
                isDark
                  ? "/images/portfolio/train-dark.png"
                  : "/images/portfolio/train.png"
              }
              height={250}
              width={250}
              alt="train"
              className=" scale-x-105 scale-y-85"
            />
          </motion.div>
          <div className="bg-linear-to-b  from-25% from-background  to-transparent h-6 w-10 absolute z-10 top-0 -left-2 "></div>
        </div>

        {/* Content */}
        <div
          ref={trackRef}
          className="w-full  flex flex-col gap-10 items-center justify-center"
        >
          <div className="space-y-3 text-center w-fit relative -left-8">
            <h2 className="text-2xl font-mono font-semibold">
              The Journey So Far
            </h2>
            <p className="font-medium  text-muted-foreground">
              4 years on the frontend track. <br /> Building, experimenting, and
              picking up new skills at every stop.
            </p>
          </div>
          {/* experience */}
          {timelineData.map((item, index) => {
            return (
              <div key={index} className="space-y-4">
                <p>{item.company}</p>
                <div className="flex items-center justify-between flex-wrap gap-5">
                  <p className="font-mono text-lg font-semibold tracking-wider">
                    {item.title}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {item.timeline}
                  </p>
                </div>

                <p>{item.description}</p>
                <p>{item.projectLink}</p>
              </div>
            );
          })}
          {/* skills */}
          <div className="space-y-4">
            <h3 className="font-mono text-xl font-semibold tracking-wider">
              Skills
            </h3>
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
          </div>
          {/* educationa */}
          <div className="space-y-4">
            <h3 className="font-mono text-xl font-semibold tracking-wider">
              Education
            </h3>
            <p>Saveetha Engineering College</p>
            <div className="flex items-center justify-between flex-wrap gap-5">
              <p className="font-mono text-lg font-semibold tracking-wider">
                Bachelor of Engineering (ECE)
              </p>
              <p className="text-sm text-muted-foreground">2018-2022</p>
            </div>

            <p>
              Graduated with strong technical grounding in hardware-software
              interfacing, digital electronics, and computer networks.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
