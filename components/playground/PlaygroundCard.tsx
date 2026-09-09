"use client";

import React from "react";
import { PlaygroundItem } from "./playgroundData";
import { PlaygroundPreview } from "./PlaygroundPreviews";

interface PlaygroundCardProps {
  item: PlaygroundItem;
}

export const PlaygroundCard: React.FC<PlaygroundCardProps> = ({ item }) => {
  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-foreground/10 bg-background/50 p-5 sm:p-6 transition-all duration-300 ease-out hover:border-foreground/25 hover:shadow-xs hover:bg-foreground/[0.015]">
      <div className="space-y-4">
        {/* Card Header: Tag & Year */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-foreground/5 border border-foreground/10 text-muted-foreground">
            <span className="size-1 rounded-full bg-foreground/60" />
            {item.tag}
          </span>
          <span className="text-muted-foreground/70">{item.date}</span>
        </div>

        {/* Live Interactive Preview Box */}
        <div className="w-full pt-1">
          <PlaygroundPreview type={item.interactiveType} />
        </div>

        {/* Title & Description */}
        <div className="space-y-2 pt-1">
          <h3 className="font-mono text-xl sm:text-2xl font-normal tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Footer: Tech Stack Badges */}
      <div className="pt-5 mt-5 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-sans border border-foreground/10 text-muted-foreground/90 bg-background/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
