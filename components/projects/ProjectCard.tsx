"use client";

import React from "react";
import Link from "next/link";
import { ProjectItem } from "./projectsData";
import { ProjectPreviewGraphic } from "./ProjectPreviewGraphic";
import { LuArrowUpRight, LuFolderGit2 } from "react-icons/lu";

interface ProjectCardProps {
  project: ProjectItem;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border border-foreground/10 bg-background/50 p-5 sm:p-6 md:p-7 transition-all duration-300 ease-out hover:border-foreground/25 hover:shadow-xs hover:bg-foreground/[0.015] ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="space-y-5">
        {/* Card Header: Metadata + Links */}
        <div className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-muted-foreground">{project.year}</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-foreground/80 font-medium tracking-wide">
              {project.clientOrCompany}
            </span>
            {project.badge && (
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider rounded-full bg-foreground/5 border border-foreground/10 text-muted-foreground">
                {project.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${project.title}`}
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                <LuFolderGit2 className="size-4" />
              </Link>
            )}
            {project.link && (
              <Link
                href={project.link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.link.label} - ${project.title}`}
                className="p-1.5 rounded-full text-muted-foreground group-hover:text-foreground group-hover:bg-foreground/5 transition-colors"
              >
                <LuArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Visual Graphic Preview */}
        <div className="w-full">
          <ProjectPreviewGraphic type={project.previewType} title={project.title} />
        </div>

        {/* Project Title & Description */}
        <div className="space-y-2.5 pt-1">
          <h3 className="font-mono text-2xl sm:text-2xl font-normal tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Key Engineering Highlights (shown if featured or available) */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="pt-2 space-y-1.5">
              {project.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-foreground/75 leading-normal"
                >
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground/50" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Card Footer: Tech Stack Badges + Action */}
      <div className="pt-6 mt-6 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-sans border border-foreground/15 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors bg-background/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.link && (
          <Link
            href={project.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-foreground tracking-wide transition-colors group/link"
          >
            <span>{project.link.label}</span>
            <LuArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
};
