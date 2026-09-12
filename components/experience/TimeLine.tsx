"use client";
import { useRef} from "react";
import {
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { skillCategories, timelineData } from "./data";
import Image from "next/image";
import { IoBookSharp } from "react-icons/io5";
import SmoothTimeline from "./SmoothTimeline";
import { BsFolder } from "react-icons/bs";
import Link from "next/link";

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // 1. Capture scroll progress relative to the track container
  const { scrollYProgress } = useScroll({
    //  target: trackRef,
    offset: ["start start", "end end"],
  });

  // 2. Ultra-smooth spring physics (Fixed sluggishness/jitter)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45, // Lower stiffness makes it feel like it glides
    damping: 20, // Balances the deceleration so there's no bounce
    restDelta: 0.001,
  });

  // 3. Map progress to top percentage for the moving indicator dot
  const dotY = useTransform(smoothProgress, (value) => `${value * 100}%`);

  return (
    <>
      <div className="space-y-3 text-center w-fit px-10 relative pt-8 ">
        <h2 className="text-2xl font-mono font-semibold">The Journey So Far</h2>
        <p className="font-medium text-sm md:text-base text-foreground/70">
          Four years on the frontend track. <br /> Building, experimenting, and
          picking up new skills at every stop.
        </p>
      </div>
      <div
        ref={timelineRef}
        className="relative grid grid-cols-[auto_1fr] w-full sm:w-[70%] md:w-[65%] lg:w-[55%] px-5 gap-7 md:gap-10 pt-15 pb-25"
      >
        <SmoothTimeline smoothProgress={smoothProgress} dotY={dotY} />

        {/* Content */}
        <div
          ref={trackRef}
          className="w-full flex flex-col gap-10 items-center justify-center"
        >
          {/* experience */}
          {timelineData.map((item, index) => {
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-5">
                  <p className="font-mono text-lg font-semibold tracking-wider">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.timeline}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full  relative">
                    <Image
                      src={item.companyLogo}
                      alt={item.company}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <p className=" font-medium text-foreground/80">
                    {item.company}
                  </p>
                </div>

                <p className=" leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.project.show && (
                  <Link href={item.project.link}>
                    <div className=" relative space-y-1 w-fit text-sm font-medium group">
                      <div className="flex items-center gap-3">
                        <BsFolder className="size-5" />
                        View projects
                      </div>
                      <div className=" w-0  group-hover:w-full transition-all duration-150 h-0.5 bg-foreground" />
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
          {/* skills */}
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-mono text-xl font-semibold tracking-wider">
                Skills
              </h3>
              <div className="flex gap-3 items-center text-xs md:text-sm">
                <IoBookSharp className="size-3" />
                Learning & Exploring
              </div>
            </div>

            <div className="  w-full">
              <div className="grid grid-cols-1 gap-4">
                {skillCategories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <div key={category.name} className="p-2 space-y-3.5">
                      <div className="flex items-center gap-2.5 text-foreground">
                        <CategoryIcon className="size-5 text-muted-foreground" />
                        <h3 className="text-sm text-foreground/80 font-medium">
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
                              className="inline-flex relative items-center gap-2 px-4 py-1.5 rounded-full text-xs border border-foreground/40 hover:bg-foreground/5 hover:border-foreground/20 text-foreground/90 transition-colors"
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
          {/* education */}
          <div className="space-y-4">
            <h3 className="font-mono text-xl font-semibold tracking-wider">
              Education
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full  relative">
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

            <p className="text-muted-foreground">
              Graduated with strong technical grounding in hardware-software
              interfacing, digital electronics, and computer networks.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
