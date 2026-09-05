"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { skillCategories, timelineData } from "./content";
import TrainTrack from "./TrainTrack";
import Image from "next/image";
import { useThemeMode } from "@/hooks/useThemeMode";
import { IoBookSharp } from "react-icons/io5";

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);
  const { isDark } = useThemeMode();
  const { scrollYProgress } = useScroll({
    offset: ["250px", "end end"],
  });
  // Smooth out the value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40,
    restDelta: 0.001,
    mass: 0.6,
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
      console.log(element.offsetHeight);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="space-y-3 text-center w-fit px-10 relative pt-8 ">
        <h2 className="text-2xl font-mono font-semibold">The Journey So Far</h2>
        <p className="font-medium  text-muted-foreground">
          4 years on the frontend track. <br /> Building, experimenting, and
          picking up new skills at every stop.
        </p>
      </div>
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
              // y: useTransform(smoothProgress, [0, 1], ["0%", "-100%"]),
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
          {/* experience */}
          {timelineData.map((item, index) => {
            return (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full  relative">
                    <Image
                      src={item.companyLogo}
                      alt={item.company}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <p className=" font-medium text-muted-foreground">
                    {item.company}
                  </p>
                </div>
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
            <div className="p-2 rounded-2xl bg-gray-200 dark:bg-neutral-800 w-full  inset-shadow-xl">
              <div className="py-2 text-xs md:text-sm px-2 flex items-center justify-end gap-2">
                <IoBookSharp className="size-3" />
                Learning & Exploring
              </div>
              <div className="bg-background w-full h-full rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillCategories.map((category) => {
                    const CategoryIcon = category.icon;
                    return (
                      <div key={category.name} className="p-3 space-y-3.5">
                        <div className="flex items-center gap-2.5 text-foreground">
                          <CategoryIcon className="size-4 text-muted-foreground" />
                          <h3 className="font-mono text-base font-semibold tracking-wider">
                            {category.name}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {category.skills.map((skill, index) => {
                            const SkillIcon = skill.icon;
                            const isBookMark =
                              category.marker.explore &&
                              category.marker.skillIndex?.includes(index);
                            return (
                              <div
                                key={skill.name}
                                className="inline-flex relative items-center gap-2 px-3 py-1.5 rounded-full text-xs border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/20 text-foreground/90 transition-colors"
                              >
                                <div className="absolute -top-1 right-1 z-1">
                                  {isBookMark ? (
                                    <IoBookSharp className="size-3" />
                                  ) : (
                                    <></>
                                  )}
                                </div>

                                <SkillIcon className="size-5 text-foreground/95" />
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
            </div>
          </div>
          {/* education */}
          <div className="space-y-4">
            <h3 className="font-mono text-xl font-semibold tracking-wider">
              Education
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full  relative">
                <Image
                  src={"/images/portfolio/sec-logo.png"}
                  alt={"sec-logo"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className=" font-medium text-muted-foreground">
                Saveetha Engineering College
              </p>
            </div>
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
