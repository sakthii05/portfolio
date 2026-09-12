"use client";
import ProjectSection from "@/components/projects/ProjectSection";
import StampStack from "@/components/projects/StampStack";
import FolderUI from "@/components/projects/FolderUI";

export default function ProjectPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 pt-10 md:pt-20">
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
        <StampStack />
      </ProjectSection>

      <ProjectSection
        title=" Onsite"
        subtext="Engineering scalable systems, design infrastructure, and mission-critical telemetry at Ticvic Technologies."
        numberOfProjects={3}
        sectionId="onsite"
      >
       <FolderUI/>
      </ProjectSection>

   
    </div>
  );
}
