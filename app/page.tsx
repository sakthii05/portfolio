"use client";
import { Canvas } from "@react-three/fiber";
import FluidDistortionEffect from "@/components/home/FluidDistortionEffect";
import { Suspense } from "react";
import FrontLayerContent from "@/components/home/FrontLayerContent";
import { useThemeMode } from "@/hooks/useThemeMode";

const Home = () => {
  const {isDark} = useThemeMode();

  const frontImage = isDark
    ? "/images/portfolio/hero-night-sketch.webp"
    : "/images/portfolio/hero-day-sketch.webp";
  const backImage = isDark
    ? "/images/portfolio/hero-night.webp"
    : "/images/portfolio/hero-day.webp";

  return (
    <section className="relative w-full h-dvh flex justify-center items-center">
      {/* Front layer content */}
      <FrontLayerContent />
      {/* Hero Image reveal animation */}
      <div
        className="
          absolute
          inset-0
          z-0
          flex justify-center items-center
          pointer-events-none
          
        "
      >
        <div className="relative  h-full w-full bg-background overflow-hidden">
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
    </section>
  );
};
export default Home;
