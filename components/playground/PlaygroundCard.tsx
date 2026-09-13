"use client";

import React from "react";
import { PlaygroundItem } from "./playgroundData";
import { PlaygroundPreview } from "./PlaygroundPreviews";
import Link from "next/link";
import { IoCodeSharp } from "react-icons/io5";

interface PlaygroundCardProps {
  item: PlaygroundItem;
}

export const PlaygroundCard: React.FC<PlaygroundCardProps> = ({ item }) => {
  return (
    <article
      className="group relative rounded-2xl border 
      border-foreground/10  bg-background/50 dark:bg-foreground/5 p-1 transition-all duration-300 ease-out
       hover:border-foreground/25 hover:shadow-xs flex flex-col justify-between gap-2"
    >
      <div>
        <div className="h-60 w-full bg-background inset-shadow-black/50 dark:inset-shadow-white/50 inset-shadow-sm rounded-xl relative"></div>
        <div className=" p-3 space-y-2">
          <div className="flex flex-wrap gap-1.5 pb-1">
            {item.technologies.map((tech, i) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                {i != 0 && (
                  <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                )}{" "}
                {tech}
              </span>
            ))}
          </div>
          <h3 className="font-mono text-xl sm:text-2xl font-normal tracking-tight text-foreground">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
      {/* Footer: Tech Stack Badges */}
      <div className=" perspective-midrange p-3 mt-5 flex justify-end gap-2"> 
        <Link
          href={"/"}
          className=" transform-3d px-3 py-1 rounded-3xl inline-flex items-center gap-2 hover:bg-foreground/5 active:-translate-z-3 transition-all duration-200  dark:hover:bg-foreground/5 text-sm inset-shadow-black/50 dark:inset-shadow-white/50 inset-shadow-sm  "
        >
          <IoCodeSharp className="size-3" />
          Code
        </Link>
      </div>
    </article>
  );
};
