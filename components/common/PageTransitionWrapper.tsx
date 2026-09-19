"use client";
import { TransitionRouter } from "next-transition-router";
import React, { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useTheme } from "next-themes";

gsap.registerPlugin(DrawSVGPlugin);

const PageTransitionWrapper = ({ children }: { children: ReactNode }) => {
  const transitionOverlayRef = useRef(null);
  const svgPathRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (svgPathRef.current) {
      gsap.set(svgPathRef.current, {
        drawSVG: "0%",
        strokeWidth: 2,
      });
    }
  }, []);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        const tl = gsap.timeline({ onComplete: next });

        tl.to(transitionOverlayRef.current, {
          opacity: 1,
        }).to(
          svgPathRef.current,
          {
            drawSVG: "100%",
            strokeWidth: 600,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0,
        );

        return () => tl.kill();
      }}
      enter={(next) => {
        const tl = gsap.timeline({ onComplete: next });

        tl.to(svgPathRef.current, {
          drawSVG: "100% 100%",
          strokeWidth: 2,
          duration: 0.8,
          ease: "power2.inOut",
        })
          .to(
            transitionOverlayRef.current,
            {
              opacity: 0,
              duration: 0.4,
              ease: "power2.inOut",
            },
            "-=0.2",
          )
          .set(svgPathRef.current, {
            drawSVG: "0%",
            strokeWidth: 2,
          });

        return () => tl.kill();
      }}
    >
      <div
        ref={transitionOverlayRef}
        className="fixed inset-0 pointer-events-none z-999 flex items-center justify-center opacity-0 overflow-hidden will-change-transform"
      >
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[120vw] h-[120vh] min-w-[120vw] min-h-[120vh] pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Extended multi-loop spiral centered at (500, 500) */}
          <path
            ref={svgPathRef}
            d="M 500 500
               C 500 470, 530 470, 530 500
               C 530 545, 455 545, 455 500
               C 455 425, 575 425, 575 500
               C 575 605, 395 605, 395 500
               C 395 365, 635 365, 635 500
               C 635 665, 335 665, 335 500
               C 335 305, 695 305, 695 500
               C 695 725, 275 725, 275 500
               C 275 245, 755 245, 755 500
               C 755 785, 215 785, 215 500
               C 215 185, 815 185, 815 500
               C 815 845, 155 845, 155 500
               C 155 125, 875 125, 875 500
               C 875 905, 95 905, 95 500
               C 95 65, 935 65, 935 500
               C 935 965, 35 965, 35 500
               C 35 5, 995 5, 995 500
               C 995 1025, -25 1025, -25 500"
            stroke="var(--stroke-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      {children}
    </TransitionRouter>
  );
};

export default PageTransitionWrapper;
