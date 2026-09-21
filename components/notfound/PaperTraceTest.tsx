
"use client";

import React, { useRef, useState, useEffect } from "react";

export default function TracingInteraction() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSnappedOnTarget, setIsSnappedOnTarget] = useState(false);

  const dragStartRef = useRef({ pointerX: 0, pointerY: 0, posX: 0, posY: 0 });

  const draggableRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Shared Helper: Calculates exact target position & snaps to it
  const executeSnapToTarget = () => {
    if (!placeholderRef.current || !targetRef.current) return;

    const pRect = placeholderRef.current.getBoundingClientRect();
    const tRect = targetRef.current.getBoundingClientRect();

    setIsAnimating(true);
    setPosition({
      x: tRect.left - pRect.left,
      y: tRect.top - pRect.top,
    });
    setIsSnappedOnTarget(true); // Disables button
  };

  // Keep target snap position accurate during layout resizes
  useEffect(() => {
    const handleResize = () => {
      if (isSnappedOnTarget) {
        setIsAnimating(false);
        executeSnapToTarget();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSnappedOnTarget]);

  // Evaluates overlap percentage against standard 98% rule
  const checkOverlapAndSnap = () => {
    if (!draggableRef.current || !targetRef.current) return;

    // Measure live bounding boxes at the moment of release
    const r1 = draggableRef.current.getBoundingClientRect();
    const r2 = targetRef.current.getBoundingClientRect();

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

    // 98% Overlap threshold check
    if (targetArea > 0 && overlapArea / targetArea >= 0.78) {
      executeSnapToTarget();
    } else {
      setIsSnappedOnTarget(false); // Re-enables button if dragged away
    }
  };

  // Button Action: "Lay the paper to trace"
  const handleLayPaperClick = () => {
    executeSnapToTarget();
  };

  /* ----- Pointer Drag Controls (1:1 Cursor Tracking) ----- */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);

    setIsDragging(true);
    setIsAnimating(false); // Instantly remove transition for real-time movement

    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.pointerX;
    const deltaY = e.clientY - dragStartRef.current.pointerY;

    setPosition({
      x: dragStartRef.current.posX + deltaX,
      y: dragStartRef.current.posY + deltaY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);

    // Let the DOM update its bounds, then evaluate 98% overlap using standard layout rects
    requestAnimationFrame(() => {
      checkOverlapAndSnap();
    });
  };

  /* ----- Drawing logic inside <canvas> ----- */
  const [isDrawing, setIsDrawing] = useState(false);

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

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden p-8 bg-gray-50 gap-12 select-none">
      {/* Interaction Header */}
      <div className="text-center space-y-4 max-w-lg z-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Tracing Canvas Tool
        </h2>
        <p className="text-gray-600 text-sm">
          Drag the paper using its blue padding edges. Drop it on top of the
          target element or click the button below. You can drag it again
          anytime!
        </p>
        <button
          onClick={handleLayPaperClick}
          disabled={isSnappedOnTarget}
          className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
        >
          {isSnappedOnTarget
            ? "Paper placed on target"
            : "Lay the paper to trace"}
        </button>
      </div>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center z-20">
        {/* Placeholder / Starting Position */}
        <div
          ref={placeholderRef}
          className="relative w-72 h-72 lg:w-80 lg:h-80 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-100/50"
        >
          <span className="text-gray-400 font-medium text-sm">
            Starting Area
          </span>

          {/* Draggable Wrapper Element */}
          <div
            ref={draggableRef}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
            className={`absolute inset-0 z-20 flex w-full h-full rounded-xl shadow-lg ${
              isAnimating
                ? "transition-transform duration-300 ease-out"
                : "transition-none"
            }`}
          >
            {/* 4-sided Outer Padding / Border Handle (Draggable Area) */}
            <div
              className="w-full h-full p-6 bg-indigo-500 rounded-xl cursor-grab active:cursor-grabbing touch-none flex flex-col shadow-xl"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Inner Content: Canvas (Non-draggable area) */}
              <canvas
                ref={canvasRef}
                className="flex-1 w-full h-full bg-white rounded-sm shadow-inner cursor-crosshair touch-none"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  startDrawing(e);
                }}
                onPointerMove={(e) => {
                  e.stopPropagation();
                  draw(e);
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                  stopDrawing();
                }}
                onPointerLeave={(e) => {
                  e.stopPropagation();
                  stopDrawing();
                }}
              />
            </div>
          </div>
        </div>

        {/* Drop Target Element */}
        <div
          ref={targetRef}
          className="w-72 h-72 lg:w-80 lg:h-80 border-4 border-dashed border-gray-400 bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center text-gray-500"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40 text-center px-4">
            <svg
              className="w-16 h-16 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <span className="font-semibold text-lg">Drop Target</span>
          </div>
        </div>
      </div>
    </div>
  );
}
