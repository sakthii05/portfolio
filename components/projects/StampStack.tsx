"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Stamp = {
  id: string;
  image: string;

  // Initial position relative to the parent viewport
  x: number;
  y: number;

  // Initial visual state
  rotate: number;
  scale?: number;

  // Optional width
  width?: number;

  title: string;
  description: string;

  code: string;
  year: string;
  series: string;
};

const stamps: Stamp[] = [
  {
    id: "japan",
    image: "images/project/stamp-base.webp",
    x: 37,
    y: 45,
    rotate: -17,
    scale: 0.9,
    width: 230,
    title: "JAPAN",
    description:
      "Ancient temples, quiet gardens, and landscapes shaped through centuries.",
    code: "JP - 001",
    year: "2026",
    series: "RED SERIES",
  },

  {
    id: "usa",
    image: "images/project/stamp-base.webp",
    x: 53,
    y: 48,
    rotate: -4,
    scale: 0.9,
    width: 225,
    title: "USA",
    description:
      "A journey through iconic places, cities, and landscapes across America.",
    code: "USA - 003",
    year: "2026",
    series: "GREEN SERIES",
  },

  {
    id: "italy",
    image: "images/project/stamp-base.webp",
    x: 43,
    y: 58,
    rotate: 22,
    scale: 0.9,
    width: 235,
    title: "ITALY",
    description:
      "Architecture, art, and timeless landscapes shaped by generations.",
    code: "ITA - 002",
    year: "2026",
    series: "PURPLE SERIES",
  },

  {
    id: "india",
    image: "images/project/stamp-base.webp",
    x: 49,
    y: 40,
    rotate: 4,
    scale: 0.9,
    width: 230,
    title: "INDIA",
    description: "Where tradition blooms, and every moment feels timeless.",
    code: "IN - 001",
    year: "2026",
    series: "BLUE SERIES",
  },
];

export default function StampStack() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // This guarantees that the most recently clicked stamp
  // is always above all previously clicked stamps.
  const [zIndexes, setZIndexes] = useState<Record<string, number>>(
    Object.fromEntries(stamps.map((stamp, index) => [stamp.id, 10 + index])),
  );

  const [topZ, setTopZ] = useState(20);

  const activeStamp = stamps.find((stamp) => stamp.id === activeId);

  const handleStampClick = (stamp: Stamp) => {
    const newZ = topZ + 1;

    setTopZ(newZ);

    setZIndexes((previous) => ({
      ...previous,
      [stamp.id]: newZ,
    }));

    // Same stamp clicked again -> return home
    if (activeId === stamp.id) {
      setActiveId(null);
      return;
    }

    // Open clicked stamp
    setActiveId(stamp.id);
  };

  return (
    <main className="relative h-100 w-full bg-black ">
      {/* =========================================
          BACKGROUND GRID
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.07]
          bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          bg-size-[64px_64px]
        "
      />

      {/* =========================================
          BLURRED BACKGROUND
      ========================================== */}

      <AnimatePresence>
        {activeStamp && (
          <motion.div
            key="backdrop"
            className="fixed h-screen w-full inset-0 z-[100] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Enlarged blurred stamp */}
            <motion.div
              className="absolute inset-[-20%]"
              initial={{
                opacity: 0,
                scale: 1.08,
              }}
              animate={{
                opacity: 0.7,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.08,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                backgroundImage: `url(${activeStamp.image})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "420px",
                filter: "blur(35px)",
              }}
            />

            {/* Additional glass blur */}
            <div className="absolute inset-0 backdrop-blur-[10px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          STAMP STACK
      ========================================== */}

      <section className="absolute inset-0">
        {stamps.map((stamp) => {
          const isActive = activeId === stamp.id;

          return (
            <motion.div
              key={stamp.id}
              className="absolute left-0 top-0"
              style={{
                zIndex: isActive ? 1000 : zIndexes[stamp.id],
              }}
              initial={false}
              animate={{
                left: isActive ? "50%" : `${stamp.x}%`,
                top: isActive ? "50%" : `${stamp.y}%`,
              }}
              transition={{
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* ---------------------------------
                  POSITIONING WRAPPER
              ---------------------------------- */}

              <div
                className="
                  relative
                  -translate-x-1/2
                  -translate-y-1/2
                "
              >
                {/* ---------------------------------
                    STAMP
                ---------------------------------- */}

                <motion.button
                  type="button"
                  onClick={() => handleStampClick(stamp)}
                  className="
                    relative
                    block
                    cursor-pointer
                    appearance-none
                    border-0
                    bg-transparent
                    p-0
                    outline-none
                    select-none
                    [-webkit-user-drag:none]
                  "
                  animate={{
                    rotate: isActive ? 0 : stamp.rotate,
                    scale: isActive ? 1.35 : (stamp.scale ?? 1),
                  }}
                  transition={{
                    duration: 0.72,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={
                    !isActive
                      ? {
                          scale: (stamp.scale ?? 1) + 0.025,
                        }
                      : undefined
                  }
                  whileTap={{
                    scale: isActive ? 1.32 : (stamp.scale ?? 1) - 0.015,
                  }}
                  style={{
                    width: stamp.width,
                    transformOrigin: "center center",
                  }}
                  draggable={false}
                >
                  <img
                    src={stamp.image}
                    alt={stamp.title}
                    draggable={false}
                    className="
                      block
                      h-auto
                      w-full
                      select-none
                      pointer-events-none
                      [-webkit-user-drag:none]
                    "
                  />

                  {/* Subtle shadow */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      -z-10
                      rounded-sm
                      bg-black/40
                      blur-xl
                    "
                  />
                </motion.button>

                {/* ---------------------------------
                    ACTIVE INFO
                ---------------------------------- */}

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="
                        absolute
                        left-1/2
                        top-[calc(100%+35px)]
                        w-[260px]
                        -translate-x-1/2
                        text-left
                      "
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                      }}
                      transition={{
                        delay: 0.15,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Zoom */}
                      <div className="mb-5 flex justify-center">
                        <span
                          className="
                            flex
                            items-center
                            gap-1.5
                            text-[12px]
                            font-medium
                            text-white/70
                          "
                        >
                          <span className="text-[15px]">⊕</span>
                          Zoom
                        </span>
                      </div>

                      <h2
                        className="
                          text-[21px]
                          font-medium
                          tracking-wide
                          text-white
                        "
                      >
                        {stamp.title}
                      </h2>

                      <p
                        className="
                          mt-3
                          text-[12px]
                          leading-[1.55]
                          text-white/45
                        "
                      >
                        {stamp.description}
                      </p>

                      <div
                        className="
                          mt-4
                          grid
                          grid-cols-3
                          border-t
                          border-white/10
                          pt-3
                        "
                      >
                        <span className="text-[11px] font-medium text-white/80">
                          {stamp.code}
                        </span>

                        <span className="text-center text-[11px] text-white/70">
                          {stamp.year}
                        </span>

                        <span className="text-right text-[11px] text-white/70">
                          {stamp.series}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </section>
    </main>
  );
}
