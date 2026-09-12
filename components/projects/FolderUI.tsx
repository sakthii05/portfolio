"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect,useState } from "react";
import { onsiteProjects, OnsiteProjectType } from "./data";
import Image from "next/image";


const FolderUI = () => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<null | OnsiteProjectType>(null);



  // Lock body scroll when a stamp is active
  useEffect(() => {
    if (activeProject) {
      const origBody = document.body.style.overflow;
      const origHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origBody;
        document.documentElement.style.overflow = origHtml;
      };
    }
  }, [activeProject]);

  return (
    <div className="flex justify-center pb-40 pt-20 font-prime">
      {/* =========================================
          BACKDROP (blur overlay)
      ========================================== */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            key="backdrop"
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-999 bg-black/45 backdrop-blur-[10px] flex justify-center items-center cursor-pointer touch-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative text-foreground/90 dark:text-background/90 w-[90%] sm:w-[75%] md:w-[65%] lg:w-[45%] xl:w-[35%] h-[90%] md:h-[80%]">
              <Image
                src={"/images/project/paper.webp"}
                alt="image"
                fill
                className="object-fill"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute space-y-5 inset-0  py-5 px-5 lg:px-10 overflow-y-scroll scrollbar-hide ">
                <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold py-5 lg:py-10  ">
                  {activeProject.title}
                </h2>
                <h4>
                  <span className="font-semibold">SUBJECT:</span>{" "}
                  {activeProject.subject}
                </h4>
                <p>{activeProject.subtext}</p>
                <div className=" space-y-2 p-0 lg:p-5 xl:p-10">
                  {activeProject.content.map((points, i) => (
                    <p key={i} className="">
                      {i + 1}. {points}
                    </p>
                  ))}
                </div>
              </div>
            </div>
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
              onClick={() => {
                setActiveProject(project);
              }}
              key={project.id}
              style={{
                translateX: isFolderOpen
                  ? project.positionStyle.translateX
                  : "0px",
                rotate: isFolderOpen ? project.positionStyle.rotate : "0deg",
                zIndex: project.positionStyle.zindex,
              }}
              className={`absolute inset-0  p-2 text-center scale-90  text-foreground dark:text-background hover:-translate-y-4  cursor-pointer transition-all duration-500 delay-200
                `}
            >
              <Image
                src={"/images/project/paper.webp"}
                alt="image"
                fill
                className="object-fill"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="w-full h-full flex justify-end items-end ">
                <div className="flex h-full w-12 items-center justify-center">
                  <span className="-rotate-90 whitespace-nowrap font-medium text-sm">
                    {project.title} - {project.id}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* file front */}
          <motion.div
            style={{ transformOrigin: "5px" }}
            className={`absolute  text-foreground dark:text-background  z-10 p-4 inset-0 rounded-r-2xl rounded-l-lg bg-[#D9843B] inset-shadow-xs  transition-all duration-700 
              ${isFolderOpen || activeProject ? "-rotate-y-50  translate-z-6" : ""}`}
          >
            <div className=""></div>
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

export default FolderUI;

