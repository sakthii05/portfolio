"use client";
import { Canvas } from "@react-three/fiber";
import FluidDistortionEffect from "@/components/home/FluidDistortionEffect";
import { Suspense, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import FrontLayerContent from "@/components/home/FrontLayerContent";

const Home = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const frontImage = isDark
    ? "/images/portfolio/hero-night-sketch.webp"
    : "/images/portfolio/hero-day-sketch.webp";
  const backImage = isDark
    ? "/images/portfolio/hero-night.webp"
    : "/images/portfolio/hero-day.webp";

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
          bg-background
        "
      >
        <div className="relative max-w-350 h-full w-full bg-background overflow-hidden">
          <Canvas
            camera={{
              position: [0, 0, 1],
            }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <FluidDistortionEffect
                frontImage={frontImage}
                backImage={backImage}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
};
export default Home;

