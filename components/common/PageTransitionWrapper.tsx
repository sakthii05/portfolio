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
          duration: 0.5,
          ease: "power2.inOut",
        }).to(
          svgPathRef.current,
          {
            drawSVG: "100%",
            strokeWidth: 300,
            duration: 1.5,
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
          duration: 1,
          ease: "power2.inOut",
        })
          .to(
            transitionOverlayRef.current,
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            },
            1,
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
        className="fixed inset-0 pointer-events-none z-999 flex items-center justify-center opacity-0"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1316 664"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full scale-130 h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* <path
            ref={svgPathRef}
            d="M13.4746 291.27C13.4746 291.27 100.646 -18.6724 255.617 16.8418C410.588 52.356 61.0296 431.197 233.017 546.326C431.659 679.299 444.494 21.0125 652.73 100.784C860.967 180.556 468.663 430.709 617.216 546.326C765.769 661.944 819.097 48.2722 988.501 120.156C1174.21 198.957 809.424 543.841 988.501 636.726C1189.37 740.915 1301.67 149.213 1301.67 149.213"
            // stroke={
            //   resolvedTheme === "dark"
            //     ? "#ffff"
            //     : "#0a0a0a"
            // }
            stroke="#0a0a0a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          /> */}

          {/* <path
            ref={svgPathRef}
            d="M0 350 L65 130 L130 350 L195 570 L260 350 L325 130 L390 350 L455 570 L520 350 L585 130 L650 350 L715 570 L780 350 L845 130 L910 350 L975 570 L1040 350 L1105 130 L1170 350 L1235 570 L1300 350"
            stroke="var(--foreground)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          /> */}
          {/* spiral */}
          <path
            ref={svgPathRef}
            d="M650 350 C650 300 700 280 720 320 C740 360 710 410 660 400 C610 390 580 320 620 270 C660 220 750 210 790 270 C830 330 810 440 740 470 C670 500 560 450 540 370 C520 290 570 180 670 160 C770 140 880 210 910 320 C940 430 870 560 750 590 C630 620 490 530 460 400 C430 270 520 120 670 90 C820 60 990 170 1030 330 C1070 490 960 670 780 700 L1300 700"
            stroke="var(--foreground)"
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
