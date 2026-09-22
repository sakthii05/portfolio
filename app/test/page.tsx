"use client";
import CustomButton from "@/components/common/CustomButton";
import PaperTrace from "@/components/pagenotfound/PaperTrace";

const Test = () => {
  return (
    <div className="relative h-dvh min-h-fit gap-7 w-full flex flex-col items-center  px-5 sm:px-8 md:px-12 py-10 md:py-20">
      <div className="text-center space-y-1">
        <h2 className="font-mono text-2xl font-semibold">
          404 — Off the Track
        </h2>
        <p className="text-muted-foreground text-sm">
          Looks like this route doesn't exist. Trace your way back and keep
          exploring.
        </p>
      </div>
      <div className="flex justify-center gap-5">
        <CustomButton label="Explore Playground" href="/playground" />
      </div>
      <PaperTrace />
    </div>
  );
};

export default Test;
// "use client";

// import React, { useRef, useState, useEffect } from "react";

// export default function InkCanvas() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const contextRef = useRef<CanvasRenderingContext2D | null>(null);

//   // Track previous positions to calculate velocity (ink flows heavier when moving slower)
//   const lastX = useRef(0);
//   const lastY = useRef(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     canvas.width = 600;
//     canvas.height = 400;
//     canvas.style.width = "600px";
//     canvas.style.height = "400px";

//     const context = canvas.getContext("2d");
//     if (!context) return;

//     // --- CORE INK STYLING CONFIGURATION ---
//     context.lineCap = "round";
//     context.lineJoin = "round";

//     // Deep iron-gall or navy ink color with 85% opacity to show paper texture underneath
//     context.strokeStyle = "rgba(20, 24, 38, 0.85)";
//     context.lineWidth = 4;

//     // The Secret: Shadow blur acts as the "bleeding edge" into paper fibers
//     context.shadowColor = "rgba(20, 24, 38, 0.35)";
//     context.shadowBlur = 2.5; // Controls the rate of ink bleed absorption

//     contextRef.current = context;
//   }, []);

//   const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas || !contextRef.current) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     contextRef.current.beginPath();
//     contextRef.current.moveTo(x, y);

//     lastX.current = x;
//     lastY.current = y;
//     setIsDrawing(true);
//   };

//   const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !canvasRef.current || !contextRef.current) return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     const ctx = contextRef.current;

//     // Calculate distance/velocity to dynamically alter line weight
//     const dx = x - lastX.current;
//     const dy = y - lastY.current;
//     const distance = Math.sqrt(dx * dx + dy * dy);

//     // Dynamic brush sizing: Moving faster makes a thinner, drier line. Moving slower leaves more ink.
//     const targetWidth = Math.max(1.5, 5 - distance * 0.15);
//     ctx.lineWidth = ctx.lineWidth * 0.6 + targetWidth * 0.4; // Smooth out transition

//     ctx.lineTo(x, y);
//     ctx.stroke();

//     // Secondary micro-bleed layer to simulate uneven paper fibers
//     if (Math.random() > 0.4) {
//       ctx.shadowBlur = Math.random() * 3 + 1;
//     }

//     lastX.current = x;
//     lastY.current = y;
//   };

//   const stopDrawing = () => {
//     if (!contextRef.current) return;
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-4 bg-amber-50 h-screen">

//       {/* Container with a subtle parchment paper texture overlay via Tailwind */}
//       <div className="relative shadow-inner border border-stone-300 rounded bg-[#fcfaf2]" >
//         <canvas
//           ref={canvasRef}
//           onMouseDown={startDrawing}
//           onMouseMove={draw}
//           onMouseUp={stopDrawing}
//           onMouseLeave={stopDrawing}
//           className="cursor-crosshair mix-blend-multiply" // Allows ink layers to blend organically
//         />
//       </div>
//     </div>
//   );
// }
