"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { onsiteProjects, OnsiteProjectType } from "./data";
const easeOut = [0.22, 1, 0.36, 1] as const;
const File = () => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<null | string>(null);

  const paperRefs = useRef<HTMLButtonElement | null>(null);

  const filePaperHandler = (value: boolean) => {
    // setIsProjectFileOpen(value);
    if (value === false) {
      // Deactivate — animate back to resting position

      return;
    }

    // Compute offset from resting position to viewport target
    const el = paperRefs.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const stampCenterX = rect.left + rect.width / 2;
      const stampCenterY = rect.top + rect.height / 2;

      const targetX = window.innerWidth / 2;
      const targetY = window.innerHeight * 0.3;
    }
  };

  // Lock body scroll when a stamp is active
  useEffect(() => {
    if (false) {
      const origBody = document.body.style.overflow;
      const origHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origBody;
        document.documentElement.style.overflow = origHtml;
      };
    }
  }, []);

  console.log(isFolderOpen);
  return (
    <div className="flex justify-center pb-40 pt-20">
      {/* =========================================
          BACKDROP (blur overlay)
      ========================================== */}
      <AnimatePresence>
        {false && (
          <motion.div
            key="backdrop"
            onClick={() => filePaperHandler(false)}
            className="fixed inset-0 z-999 bg-black/45 backdrop-blur-[10px] flex justify-center items-center cursor-pointer touch-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: easeOut }}
          >
            <div className="w-[50%] h-[60%] bg-white rounded-2xl"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="perspective-midrange  drop-shadow-lg ">
        {/* file */}
        <div
          className="relative h-60 w-50 transform-3d group"
          onMouseOver={() => {
            setIsFolderOpen(true);
          }}
          onMouseLeave={() => {
            setIsFolderOpen(false);
          }}
          onClick={() => {
            setIsFolderOpen((prev) => !prev);
          }}
        >
          {/* file back */}
          <div className="absolute inset-0 rounded-r-2xl rounded-l-lg bg-[#F28444]" />

          {/* paper inside file */}
          {onsiteProjects.map((project: OnsiteProjectType) => (
            <motion.div
              key={project.id}
              style={{
                translateX: isFolderOpen
                  ? project.positionStyle.translateX
                  : "0px",
                rotate: isFolderOpen ? project.positionStyle.rotate : "0deg",
                zIndex: project.positionStyle.zindex
              }}
              className={`absolute inset-0  p-2 text-center scale-90  hover:-translate-y-4  bg-white shadow-lg cursor-pointer transition-all duration-500 delay-200
                `}
            >
              <div className="border border-2 border-black w-full h-full  "></div>
            </motion.div>
          ))}

          {/* file front */}
          <motion.div
            style={{ transformOrigin: "5px" }}
            className={`absolute font-digital text-[#282828]  z-10 p-4 inset-0 rounded-r-2xl rounded-l-lg bg-[#D9843B] inset-shadow-2xs  transition-all duration-700 
              ${isFolderOpen ? "-rotate-y-50  translate-z-6" : ""}`}
          >
            <div className=" w-fit "> 23/2025 </div>
            <div className=" flex flex-col justify-end items-end  h-full space-y-2 pb-5">
              <div className="text-center border-2 uppercase px-1 font-semibold">
                Confidential
              </div>
              <p className="text-center  text-sm">Project Insights</p>
              <p className="md:hidden text-xs">(Tap to Open)</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default File;
//  group-hover:rotate-z-6 group-hover:translate-x-6 group-hover:drop-shadow-md transition-all duration-500  delay-200 scale-90
// group-hover:-rotate-y-25  group-hover:translate-z-16 transition-all duration-500
