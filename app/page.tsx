"use client";
import { Canvas } from "@react-three/fiber";
import FluidDistortionEffect from "@/components/home/FluidDistortionEffect";
import { Suspense } from "react";
import { useTheme } from "next-themes";
import FrontLayerContent from "@/components/home/FrontLayerContent";

const Home = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
     {/* front layer content */}
      <FrontLayerContent />
      {/* image reveal animation */}
      <div
        className="
          absolute
          inset-0
          z-0
          flex justify-center items-center
          pointer-events-none
        "
      >
        <div className="relative max-w-350 h-full w-full">
          <Canvas
            camera={{
              position: [0, 0, 1],
            }}
            gl={{
              antialias: true,
              alpha: false,
            }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <FluidDistortionEffect
                frontImage={
                  resolvedTheme === "dark"
                    ? "/images/portfolio/night-p1.png"
                    : "/images/portfolio/day-p2.webp"
                }
                backImage={
                  resolvedTheme === "dark"
                    ? "/images/portfolio/night2.png"
                    : "/images/portfolio/day1.webp"
                }
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
};
export default Home;
