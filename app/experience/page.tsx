"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

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
      <div className="relative w-full h-full max-w-250">
        <div
          className="absolute z-1
           bg-green-400 
           w-[80%] lg:w-[56%] 
                h-[55%] rounded-4xl 
                   top-[41%] lg:top-[39%] left-1/2 -translate-x-1/2 -translate-y-1/2 "
        ></div>
        <div className="absolute h-40 w-full  bg-linear-to-t from-background to-transparent bottom-0 z-10"></div>
        <div className="hidden md:block absolute h-full w-30  bg-linear-to-r from-background z-10 to-transparent -left-1 "></div>
        <div className="hidden md:block absolute h-full w-30  bg-linear-to-l from-background z-10 to-transparent -right-1  "></div>
        <Image
          src={desktopimage}
          alt="exp"
          fill
          className="object-fit hidden lg:block relative z-2"
        />
        <Image
          src={mobileimage}
          alt="exp"
          fill
          className="object-fit lg:hidden relative z-2"
        />
      </div>
    </>
  );
};

export default ExperiencePage;
