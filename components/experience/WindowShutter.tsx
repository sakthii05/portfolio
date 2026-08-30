"use client";

// "absolute z-4 bg-transparent w-[80%] lg:w-[56%] h-[55%] rounded-4xl top-[41%] lg:top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2"

"use client";

import {
  motion,
  useMotionValue,
  useDragControls,
  PanInfo,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// Adjust this value (in pixels) to control how far down the shutter stops at the top
const TOP_OFFSET = 50;

export default function WindowShutter() {
  const parentRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstLayout = useRef(true);

  const [height, setHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // 1. Initial State set to Open
  const [hasInteracted, setHasInteracted] = useState(false);

  const y = useMotionValue(0);
  const dragControls = useDragControls();

  // The maximum upward position (slightly down from top based on TOP_OFFSET)
  const topLimit = -(height - TOP_OFFSET);

  /*
   * Measure responsive parent height and set starting position to Open
   */
  useEffect(() => {
    if (!parentRef.current) return;

    const observer = new ResizeObserver(() => {
      const rect = parentRef.current?.getBoundingClientRect();
      if (rect) {
        setHeight(rect.height);

        // On first render, immediately place the shutter in the open position
        // if (isFirstLayout.current) {
        //   const initialTopLimit = -(rect.height - TOP_OFFSET);
        //   y.set(initialTopLimit);
        //   isFirstLayout.current = false;
        // }
      }
    });

    observer.observe(parentRef.current);
    return () => observer.disconnect();
  }, [y]);

  /*
   * Smooth tween animation - clean hard stop, no bounce.
   */
  const animateTo = useCallback(
    (target: number) => {
      animate(y, target, {
        type: "tween",
        ease: [0.32, 0.72, 0, 1], // Smooth ease-out
        duration: 0.45,
      });
    },
    [y],
  );

  // const autoAnimateTo = useCallback(
  //   (target: number) => {
  //     animate(y, target, {
  //       type: "tween",
  //       ease: [0.32, 0.72, 0, 1], // Smooth ease-out
  //       duration: 2,
  //     });
  //   },
  //   [y],
  // );
  // Helper function to safely play audio files from your /public folder
const playSound = (soundPath: string) => {
  if (typeof window !== "undefined") {
    const audio = new Audio(soundPath);
    audio.volume = 0.5; // adjust volume (0.0 to 1.0)
    audio.play().catch(() => {}); // Prevents browser autoplay policy errors
  }
};

  const open = useCallback(() => {
    setIsOpen(true);
    animateTo(topLimit);
     playSound("/images/portfolio/shutter-sound.m4a"); 
  }, [topLimit, animateTo]);

  const close = useCallback(() => {
    setIsOpen(false);
    animateTo(0);
    playSound("/images/portfolio/shutter-sound.m4a"); 
  }, [animateTo]);

  // const autoClose = useCallback(() => {
  //   setIsOpen(false);
  //   autoAnimateTo(0);
  // }, [autoAnimateTo]);

  /*
   * 2. Auto-close after 6 seconds of no interaction
   */
  // useEffect(() => {
  //   if (height > 0 && !hasInteracted) {
  //     timerRef.current = setTimeout(() => {
  //       autoClose();
  //     }, 6000); // 6 seconds
  //   }

  //   return () => {
  //     if (timerRef.current) clearTimeout(timerRef.current);
  //   };
  // }, [height, hasInteracted, close]);

  // Cancel the timer immediately on first drag/pointer interaction
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  /*
   * Drag end logic using customized active travel distance
   */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (!height) return;

    const currentY = y.get();
    const velocity = info.velocity.y;

    // Total physical area the shutter can travel
    const activeTravelDistance = height - TOP_OFFSET;
    const threshold = activeTravelDistance * 0.4; // 40%

    if (!isOpen) {
      // Closed state - dragging up
      const draggedDistance = Math.abs(currentY);

      if (draggedDistance >= threshold || velocity < -700) {
        open();
      } else {
        close();
      }
    } else {
      // Open state - dragging down (relative to topLimit)
      const draggedDownDistance = currentY - topLimit;

      if (draggedDownDistance >= threshold || velocity > 700) {
        close();
      } else {
        open();
      }
    }
  };

  return (
    <div
      ref={parentRef}
      className="
        absolute z-3 bg-transparent
        w-[80%] lg:w-[56%]
        h-[55%]
        rounded-4xl
        top-[41%] lg:top-[38%]
        left-1/2 -translate-x-1/2 -translate-y-1/2
        overflow-hidden
      "
    >
      <motion.div
        className="
          absolute inset-0
          h-full w-full
          bg-red-700
          rounded-4xl
          select-none
          flex flex-col
        "
        style={{ y }}
        drag="y"
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={{
          top: topLimit, // Stops slightly down from top
          bottom: 0,
        }}
        dragElastic={0} // No elastic overshoot beyond limits
        dragMomentum={false} // No momentum bounce
        onDragStart={handleInteraction}
        onDragEnd={handleDragEnd}
      >
        {/* Shutter Main Content (Not draggable) */}
        <div className="flex-1 p-6 text-white">
          <h2 className="text-2xl font-bold">Shutter Content</h2>
          <p className="mt-2 opacity-80">
            This starts in the open position. If not touched, it will
            automatically close in 6 seconds.
          </p>
        </div>

        {/* ===== Drag Handle Area ===== */}
        <div
          onPointerDown={(e) => {
            handleInteraction();
            dragControls.start(e);
          }}
          className="
            w-full py-5
            flex flex-col items-center justify-center
            cursor-grab active:cursor-grabbing
            touch-none
          "
          style={{ touchAction: "none" }}
        >
          <div className="w-14 h-1.5 rounded-full bg-white/70" />
          <span className="mt-2 text-xs text-white/70 tracking-wide">
            DRAG TO CLOSE
          </span>
        </div>
      </motion.div>
    </div>
  );
}
