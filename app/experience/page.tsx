"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import WindowShutter from "@/components/experience/WindowShutter";
import TrainSeatInfo from "@/components/experience/TrainSeatInfo";

const ExperiencePage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? resolvedTheme === "dark" : false;
  useEffect(() => {
    setMounted(true);
  }, []);
  const desktopimage = isDark
    ? "/images/portfolio/train6.webp"
    : "/images/portfolio/train3.png";
  const mobileimage = isDark
    ? "/images/portfolio/train5.png"
    : "/images/portfolio/train4.png";
  return (
    <>
      <div className="relative w-full h-full max-w-250 overflow-hidden">
        {/* video */}
        <div
          className="absolute z-1
            bg-transparent 
           w-[80%] lg:w-[56%] 
                h-[55%] rounded-4xl overflow-hidden
                   top-[41%] lg:top-[39%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/portfolio/train-video2.mp4" type="video/mp4" />
          </video>
        </div>
        {/* content */}

        <WindowShutter />

        <div className="absolute h-25 w-full  bg-linear-to-t from-background to-transparent bottom-0 z-10"></div>
        <div className="hidden md:block absolute h-full w-35  bg-linear-to-r from-background from-25% z-10 to-transparent -left-2 "></div>
        <div className="hidden md:block absolute h-full w-35  bg-linear-to-l from-background  from-25% z-10 to-transparent -right-2  "></div>
        <div className="absolute inset-0 z-3 pointer-events-none">
          <TrainSeatInfo />
          <Image
            src={desktopimage}
            alt="exp"
            fill
            className="object-fit hidden lg:block relative z-3"
          />
          <Image
            src={mobileimage}
            alt="exp"
            fill
            className="object-fit lg:hidden relative z-3"
          />
        </div>
      </div>
    </>
  );
};

export default ExperiencePage;
