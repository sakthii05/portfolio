"use client";

import React from "react";
import { PlaygroundItem } from "./playgroundData";
import { PlaygroundPreview } from "./PlaygroundPreviews";
import Link from "next/link";
import { IoCodeSharp } from "react-icons/io5";
import Image from "next/image";
import { FadeImage } from "./FadeImage";
import { LuSparkles } from "react-icons/lu";

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
        <div className="aspect-video w-full bg-background  relative ">
          <div className=" absolute inset-0 z-10 inset-shadow-black/50  inset-shadow-sm rounded-xl pointer-events-none"></div>
          {item.previewSrc.type === "Img" ? (
            <FadeImage
              src={item.previewSrc.src}
              fill
              alt={item.title}
              className="object-contain rounded-xl "
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw "
            />
          ) : (
            item.previewSrc.type === "Video" && (
              <video
                src={item.previewSrc.src}
                autoPlay
                muted
                loop
                className="object-contain rounded-xl"
              />
            )
          )}
        </div>
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
            {item.title}{" "}
            {item.tag.show && (
              <span className="px-2 ml-2 py-1 rounded-full text-xs font-sans border border-foreground/50">
                {item.tag.lable}
              </span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
      {/* Footer: Tech Stack Badges */}
      <div className=" perspective-midrange p-3 mt-5 flex justify-end gap-2">
        <Link
          href={item.codeLink}
          target="_blank"
          className=" transform-3d px-3 py-1 text-[#ffffff] bg-[#0a0a0a]  hover:scale-105 rounded-3xl 0 inline-flex items-center gap-2  active:-translate-z-3 transition-all duration-200 text-sm inset-shadow-white/60 inset-shadow-sm  "
        >
          <IoCodeSharp className="size-3" />
          Code
        </Link>
        <Link
          href={item.liveLink}
          target="_blank"
          className="  transform-3d px-3 py-1 text-[#ffffff] bg-[#0a0a0a]  hover:scale-105 rounded-3xl 0 inline-flex items-center gap-2  active:-translate-z-3 transition-all duration-200 text-sm inset-shadow-white/60 inset-shadow-sm   "
        >
          <IoCodeSharp className="size-3" />
          View
        </Link>
      </div>
    </article>
  );
};
