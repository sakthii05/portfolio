"use client";

import React from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import {
  freelanceProjects,
  onsiteProjects,
} from "@/components/projects/projectsData";
import ProjectSection from "@/components/projects/ProjectSection";
import Image from "next/image";
import StampStack from "@/components/projects/StampStack";

export default function ProjectPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-15 px-5 sm:px-8 md:px-12 pt-20">
      {/* Hero Section */}
      <header className="space-y-3 w-full sm:w-[70%] md:w-[65%] lg:w-[50%] flex  flex-col items-center justify-center">
        <h2 className="text-2xl font-mono font-semibold ">Selected Projects</h2>
        <p className="font-medium text-center text-sm md:text-base text-foreground/80 leading-relaxed">
          A curated index of production work, creative engineering, and
          architectural interfaces built across client collaborations and onsite
          software roles.
        </p>
      </header>

      {/* Section 1: Freelance Projects */}
      <ProjectSection
        title="Freelance"
        subtext="Websites designed, developed, optimized, and launched as complete digital identities for real businesses."
        numberOfProjects={4}
        sectionId="freelance"
      >
        {/* <div className="relative w-full h-100">
          <button className="absolute w-40 h-55 rotate-12 hover:translate-y-1 transition-all  ">
            <div className="absolute inset-0 border-[0.8px] border-b-border-30 m-3 z-2"></div>
            <Image
              src={"/images/project/stamp-base.webp"}
              fill
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className=" drop-shadow-md"
            />
          </button>
        </div> */}
        <StampStack />
        {/* <StampStackTest/> */}
      </ProjectSection>

      <ProjectSection
        title=" Onsite"
        subtext="Engineering scalable systems, design infrastructure, and mission-critical telemetry at Ticvic Technologies."
        numberOfProjects={4}
        sectionId="onsite"
      >
        <div className="relative w-full h-100">
          <button className="absolute w-40 h-55 rotate-12 hover:translate-y-1 transition-all  ">
            <div className="absolute inset-0 border-[0.8px] border-b-border-30 m-3 z-2"></div>
            <Image
              src={"/images/project/stamp-base.webp"}
              fill
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className=" drop-shadow-md"
            />
          </button>
        </div>
      </ProjectSection>

      {/* Section 2: Onsite Projects */}
    </div>
  );
}
