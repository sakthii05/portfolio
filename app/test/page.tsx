"use client";
import CustomButton from "@/components/common/CustomButton";
import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const Test = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const traceContainerRef = useRef<HTMLDivElement>(null);
  const paperContainerRef = useRef<HTMLDivElement>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const isDrawingRef = useRef(false);
  /* ----- Drawing logic inside <canvas> ----- */
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragArea, setIsDragArea] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnappedOnTarget, setIsSnappedOnTarget] = useState(false);
  const [position, setPosition] = useState({ x: 150, y: 10 });

  // Initialize Canvas resolution matching CSS bounds
  useEffect(() => {
    const initCanvas = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, []);

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    canvasRef.current?.getContext("2d")?.beginPath();
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#374151";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const dragControls = useDragControls();

  const HANDLE_SIZE = 40;

  const isOnDragHandle = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    return (
      x <= HANDLE_SIZE ||
      x >= width - HANDLE_SIZE ||
      y <= HANDLE_SIZE ||
      y >= height - HANDLE_SIZE
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    const canvas = e.currentTarget;

    // Drag area
    if (isOnDragHandle(e)) {
      canvas.releasePointerCapture?.(e.pointerId);

      isDrawingRef.current = false;
      activePointerIdRef.current = null;

      setIsDragArea(true);
      //  canvas.style.cursor = "grabbing";

      dragControls.start(e);
      return;
    }

    // Drawing area
    activePointerIdRef.current = e.pointerId;
    isDrawingRef.current = true;

    // Keep receiving pointer events even outside canvas
    canvas.setPointerCapture(e.pointerId);

    setIsDragArea(false);

    startDrawing(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;

    // Update cursor when not drawing
    if (!isDrawingRef.current) {
      // canvas.style.cursor = isOnDragHandle(e) ? "grab" : "crosshair";
      setIsDragArea(isOnDragHandle(e));

      return;
    }

    // Continue drawing
    draw(e);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Let the DOM update its bounds, then evaluate 98% overlap using standard layout rects
    requestAnimationFrame(() => {
      checkOverlapAndSnap();
    });
    if (activePointerIdRef.current === e.pointerId) {
      isDrawingRef.current = false;
      activePointerIdRef.current = null;

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }

      stopDrawing();
    }
  };

  const x = useMotionValue(150);
  const y = useMotionValue(10);

  // Shared Helper: Calculates exact target position & snaps to it
  const executeSnapToTarget = () => {
    if (!paperContainerRef.current || !traceContainerRef.current) {
      return;
    }

    const paper = paperContainerRef.current.getBoundingClientRect();
    const target = traceContainerRef.current.getBoundingClientRect();

    const dx = target.left - paper.left;
    const dy = target.top - paper.top;

    animate(x, x.get() + dx, {
      type: "spring",
      stiffness: 500,
      damping: 35,
    });

    animate(y, y.get() + dy, {
      type: "spring",
      stiffness: 500,
      damping: 35,
    });

    setIsSnappedOnTarget(true);
  };

  // Evaluates overlap percentage against standard 98% rule
  const checkOverlapAndSnap = () => {
    if (!paperContainerRef.current || !traceContainerRef.current) return;

    // Measure live bounding boxes at the moment of release
    const r1 = paperContainerRef.current.getBoundingClientRect();
    const r2 = traceContainerRef.current.getBoundingClientRect();

    // Calculate 2D plane intersection
    const overlapW = Math.max(
      0,
      Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left),
    );
    const overlapH = Math.max(
      0,
      Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top),
    );
    const overlapArea = overlapW * overlapH;
    const targetArea = r2.width * r2.height;

    // 85% Overlap threshold check
    if (targetArea > 0 && overlapArea / targetArea >= 0.85) {
      executeSnapToTarget();
    } else {
      setIsSnappedOnTarget(false); // Re-enables button if dragged away
    }
  };

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
        <CustomButton
          label="Lay the Paper to trace"
          onBtnClick={() => {
            executeSnapToTarget();
          }}
          disabled={isSnappedOnTarget}
        />
      </div>
      <div className=" flex flex-col items-center justify-center pt-7 gap-2 ">
        <div className="h-10 w-full bg-amber-400">Toolbar</div>

        {/* <div className="absolute inset-0 bg-gray-400 z-0"></div> */}
        <div className="relative h-[55vh] md:h-[60vh] aspect-4/5  ">
          <div
            ref={traceContainerRef}
            className="bg-neutral-500 absolute inset-0 z-0"
          ></div>
          <motion.div
            ref={paperContainerRef}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => {
              setIsDragging(true);
            }}
            onDragEnd={() => {
              setIsDragging(false);
            }}
            style={{ x, y }}
            className={`absolute inset-0 z-10 ${isDragging && "shadow-lg"} bg-gray-100/50`}
          >
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 block w-full h-full rounded-sm shadow-inner touch-none ${isDragArea ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair"}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
          </motion.div>
        </div>
      </div>
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
