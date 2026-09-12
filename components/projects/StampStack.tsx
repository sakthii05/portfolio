"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { StampType,stamps } from "./data";



// Default scale for stamps in their resting state
const RESTING_SCALE = 0.9;
// Scale for the active (zoomed) stamp
const ACTIVE_SCALE = 1.9;
// Target position: 20% from top of viewport, centered horizontally
const ACTIVE_TOP_VH = 0.3;

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function StampStack() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const stampRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Pixel offset to move the active stamp from its resting position
  // to the viewport center target
  const [activeOffset, setActiveOffset] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [zIndexes, setZIndexes] = useState<Record<string, number>>(
    Object.fromEntries(stamps.map((stamp, index) => [stamp.id, 10 + index])),
  );
  const [topZ, setTopZ] = useState(20);

  const activeStamp = stamps.find((s) => s.id === activeId);

  // Lock body scroll when a stamp is active
  useEffect(() => {
    if (activeStamp) {
      const origBody = document.body.style.overflow;
      const origHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origBody;
        document.documentElement.style.overflow = origHtml;
      };
    }
  }, [activeStamp]);

  const handleStampClick = useCallback(
    (stamp: StampType) => {
      const newZ = topZ + 1;
      setTopZ(newZ);
      setZIndexes((prev) => ({ ...prev, [stamp.id]: newZ }));

      if (activeId === stamp.id) {
        // Deactivate — animate back to resting position
        setActiveOffset(null);
        setActiveId(null);
        return;
      }

      // Compute offset from resting position to viewport target
      const el = stampRefs.current[stamp.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        const stampCenterX = rect.left + rect.width / 2;
        const stampCenterY = rect.top + rect.height / 2;

        const targetX = window.innerWidth / 2;
        const targetY = window.innerHeight * ACTIVE_TOP_VH;

        setActiveOffset({
          x: targetX - stampCenterX,
          y: targetY - stampCenterY,
        });
      }

      setActiveId(stamp.id);
    },
    [activeId, topZ],
  );

  // Close on backdrop click
  const handleBackdropClick = useCallback(() => {
    if (activeStamp) {
      handleStampClick(activeStamp);
    }
  }, [activeStamp, handleStampClick]);

  return (
    <main ref={containerRef} className="relative h-91 w-full">
      {/* =========================================
          BACKGROUND GRID
      ========================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.07]
          bg-[linear-gradient(to_right,var(--foreground)_2px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_2px,transparent_1px)]
          bg-size-[60px_60px]
        "
      >
        <div className="absolute left-0 h-full w-10 bg-linear-to-r from-25% from-background to-transparent" />
        <div className="absolute right-0 h-full w-10 bg-linear-to-l from-25% from-background to-transparent" />
      </div>

      {/* =========================================
          BACKDROP (blur overlay)
      ========================================== */}
      <AnimatePresence>
        {activeStamp && (
          <motion.div
            key="backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 z-999 bg-black/45 backdrop-blur-[10px] cursor-pointer touch-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
          />
        )}
      </AnimatePresence>

      {/* =========================================
          STAMP STACK — one element per stamp
      ========================================== */}
      <section className="absolute inset-0">
        {stamps.map((stamp) => {
          const isActive = activeId === stamp.id;

          return (
            <motion.button
              key={stamp.id}
              ref={(el) => {
                stampRefs.current[stamp.id] = el;
              }}
              type="button"
              onClick={() => handleStampClick(stamp)}
              className="
                absolute
                block
                cursor-pointer
                appearance-none
                border-0
                bg-transparent
                p-0
                outline-none
                select-none
                [-webkit-user-drag:none]
                -translate-x-1/2
                -translate-y-1/2
              "
              style={{
                left: `${stamp.x}%`,
                top: `${stamp.y}%`,
                width: 150,
                transformOrigin: "center center",
                zIndex: isActive ? 1000 : zIndexes[stamp.id],
              }}
              animate={{
                x: isActive && activeOffset ? activeOffset.x : 0,
                y: isActive && activeOffset ? activeOffset.y : 0,
                rotate: isActive ? 0 : stamp.rotate,
                scale: isActive ? ACTIVE_SCALE : RESTING_SCALE,
              }}
              whileHover={
                !isActive ? { scale: RESTING_SCALE + 0.025 } : undefined
              }
              whileTap={{
                scale: isActive ? ACTIVE_SCALE - 0.1 : RESTING_SCALE - 0.015,
              }}
              transition={{
                duration: 0.72,
                ease: easeOut,
              }}
              draggable={false}
            >
              <Image
                src={"/images/project/stamp-base.webp"}
                alt={stamp.title}
                width={150}
                height={221}
                draggable={false}
                loading="eager"
                className="
                  block
                  h-auto
                  w-full
                  select-none
                  pointer-events-none
                  [-webkit-user-drag:none]
                  drop-shadow-md
                "
              />
              <div
                className={`absolute inset-0 m-3 border-[0.5px] ${stamp.classname.parent} flex flex-col items-center`}
              >
                <Image
                  src={stamp.image}
                  width={200}
                  height={200}
                  alt={stamp.title}
                />
                <div className="h-1"></div>
                <div
                  className={`${stamp.classname.child}  border-t w-full p-1 space-y-1`}
                >
                  <h4 className="text-start text-xs font-mono font-semibold">
                    {stamp.title}
                  </h4>
                  <p className=" text-[6px] text-[#282828] text-start line-clamp-3">
                    {stamp.subtext}
                  </p>
                  <div className="flex justify-between text-[8px] font-mono font-semibold">
                    <div>{stamp.year}</div>
                    <div className="uppercase">{stamp.series}</div>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </section>

      {/* =========================================
          ACTIVE INFO (below the stamp)
      ========================================== */}
      <AnimatePresence>
        {activeStamp && (
          <motion.div
            key={`info-${activeStamp.id}`}
            className="
              fixed
              z-1001
              w-[90%] md:w-[40%] lg:w-[30%]
              text-left
             
            "
            style={{
              left: "50%",
              top: `calc(${ACTIVE_TOP_VH * 100}vh + 240px)`,
              translateX: "-50%",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              delay: 0,
              duration: 0.25,
              ease: easeOut,
            }}
          >
            <div className="h-3 w-full"></div>
           

            <h2
              className="
                text-[21px] font-medium
                tracking-wide text-white uppercase
              "
            >
              {activeStamp.title}
            </h2>

            <p
              className="
                mt-3 text-sm
                leading-[1.55] text-white/70 font-normal
              "
            >
              {activeStamp.description}
            </p>

            <div
              className="
                mt-4 grid grid-cols-3
                border-t border-white/10 pt-3
                text-sm
                text-white/70
              "
            >
              <span className="font-medium ">{activeStamp.year}</span>
              <span className="text-center uppercase ">
                {activeStamp.series}
              </span>

              <Link
                className="text-right hover:underline hover:underline-offset-4 text-white flex gap-3 justify-end items-center"
                href={activeStamp.projectLink}
                target="_blank"
              >
                visit site
                <FiExternalLink className="size-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
