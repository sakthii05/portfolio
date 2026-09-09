"use client";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { useThemeMode } from "@/hooks/useThemeMode";
import { MdOutlineTrain } from "react-icons/md";

const SmoothTimeline = (props: {
  smoothProgress: MotionValue<number>;
  dotY: MotionValue<string>;
}) => {
  const { smoothProgress, dotY } = props;
  const {isDark} = useThemeMode()

  return (
    <>
      {/* LINE SYSTEM (Centered on desktop, Left-aligned on mobile) */}
      <div className="relative pointer-events-none">
        {/* 1. Base Dashed Line (Always visible) */}
        <div className="absolute inset-x-0 top-0 bottom-0 border-l-2 border-dashed border-foreground/20" />
        <div className="absolute  -top-8 -left-2.75 ">
          <MdOutlineTrain  className="size-6"/>
        </div>
        {/* 2. Active Solid Fill Line (Grows on Scroll) */}
        <motion.div
          style={{
            scaleY: smoothProgress,
            originY: 0, // Ensures it scales downwards from the top
          }}
          className="absolute inset-x-0 top-0 bottom-0 w-0.5 bg-foreground/75 rounded-full "
        />

        {/* 3. Moving Tracer Dot */}
        <motion.div
          style={{ top: dotY }}
          className="absolute -left-1.75  w-4 h-4 rounded-full bg-foreground/80   z-10"
        >
          {/* <Image
            src={isDark ? "/images/portfolio/train-white.png" : "/images/portfolio/train-black.png"}
            alt="train-icon"
            width={200}
            height={200}
            
          /> */}
        </motion.div>
      </div>
    </>
  );
};
export default SmoothTimeline;
