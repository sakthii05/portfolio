"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

interface Point {
  x: number;
  y: number;
  pressure: number;
  timestamp: number;
}

interface Stroke {
  points: Point[];
  color: string;
  size: number;
  opacity: number;
  style: "ink" | "brush" | "pen" | "marker";
}

interface DrawingCanvasProps {
  width?: number;
  height?: number;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width = 900,
  height = 600,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);

  // Style controls
  const [strokeColor, setStrokeColor] = useState("#1a1a2e");
  const [strokeSize, setStrokeSize] = useState(3);
  const [strokeOpacity, setStrokeOpacity] = useState(0.85);
  const [strokeStyle, setStrokeStyle] = useState<Stroke["style"]>("ink");

  // ---- INK STYLE RENDERING ENGINE ----

  const getStrokeWidth = useCallback(
    (
      point: Point,
      prevPoint: Point | null,
      baseSize: number,
      style: Stroke["style"],
    ): number => {
      if (!prevPoint) return baseSize;

      const dx = point.x - prevPoint.x;
      const dy = point.y - prevPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const dt = point.timestamp - prevPoint.timestamp || 1;
      const speed = distance / dt;

      switch (style) {
        case "ink": {
          // Real ink: thin on fast strokes, thick on slow
          const speedFactor = Math.max(0.3, 1 - speed * 0.05);
          const pressureFactor = point.pressure;
          return baseSize * speedFactor * pressureFactor * 1.5;
        }
        case "brush": {
          // Brush: more variation, softer
          const speedFactor = Math.max(0.2, 1 - speed * 0.03);
          return baseSize * speedFactor * point.pressure * 2.5;
        }
        case "pen": {
          // Pen: consistent width, slight pressure sensitivity
          return baseSize * (0.7 + point.pressure * 0.3);
        }
        case "marker": {
          // Marker: thick, flat
          return baseSize * 2.5;
        }
        default:
          return baseSize;
      }
    },
    [],
  );

  const drawInkSegment = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      points: Point[],
      color: string,
      baseSize: number,
      opacity: number,
      style: Stroke["style"],
    ) => {
      if (points.length < 2) return;

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (style === "marker") {
        ctx.globalCompositeOperation = "multiply";
        ctx.globalAlpha = 0.4;
      } else if (style === "brush") {
        ctx.globalAlpha = opacity * 0.7;
      } else {
        ctx.globalAlpha = opacity;
      }

      // Draw stroke with variable width using multiple segments
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const width = getStrokeWidth(curr, prev, baseSize, style);

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;

        if (i >= 2) {
          // Use quadratic curves for smoothness
          const prevPrev = points[i - 2];
          const midX1 = (prevPrev.x + prev.x) / 2;
          const midY1 = (prevPrev.y + prev.y) / 2;
          const midX2 = (prev.x + curr.x) / 2;
          const midY2 = (prev.y + curr.y) / 2;

          ctx.moveTo(midX1, midY1);
          ctx.quadraticCurveTo(prev.x, prev.y, midX2, midY2);
        } else {
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
        }

        ctx.stroke();

        // Ink splatter effect for 'ink' style
        if (style === "ink" && width > baseSize * 0.8) {
          drawInkSplatter(ctx, curr, color, width, opacity);
        }

        // Brush texture for 'brush' style
        if (style === "brush") {
          drawBrushTexture(ctx, prev, curr, color, width, opacity);
        }
      }

      ctx.restore();
    },
    [getStrokeWidth],
  );

  const drawInkSplatter = (
    ctx: CanvasRenderingContext2D,
    point: Point,
    color: string,
    width: number,
    opacity: number,
  ) => {
    const splatterCount = Math.floor(Math.random() * 3);
    for (let i = 0; i < splatterCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = width * (0.5 + Math.random() * 1.5);
      const size = Math.random() * 1.5;

      ctx.beginPath();
      ctx.globalAlpha = opacity * 0.3 * Math.random();
      ctx.fillStyle = color;
      ctx.arc(
        point.x + Math.cos(angle) * distance,
        point.y + Math.sin(angle) * distance,
        size,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
  };

  const drawBrushTexture = (
    ctx: CanvasRenderingContext2D,
    prev: Point,
    curr: Point,
    color: string,
    width: number,
    opacity: number,
  ) => {
    // Add bristle-like lines
    const bristleCount = Math.floor(width / 2);
    for (let i = 0; i < bristleCount; i++) {
      const offset = (i / bristleCount - 0.5) * width;
      const angle = Math.atan2(curr.y - prev.y, curr.x - prev.x) + Math.PI / 2;

      ctx.beginPath();
      ctx.globalAlpha = opacity * (0.1 + Math.random() * 0.2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.moveTo(
        prev.x + Math.cos(angle) * offset,
        prev.y + Math.sin(angle) * offset,
      );
      ctx.lineTo(
        curr.x + Math.cos(angle) * offset + (Math.random() - 0.5),
        curr.y + Math.sin(angle) * offset + (Math.random() - 0.5),
      );
      ctx.stroke();
    }
  };

  // ---- REDRAW ALL STROKES ----

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paper texture
    drawPaperTexture(ctx, canvas.width, canvas.height);

    // Draw all completed strokes
    strokes.forEach((stroke) => {
      drawInkSegment(
        ctx,
        stroke.points,
        stroke.color,
        stroke.size,
        stroke.opacity,
        stroke.style,
      );
    });
  }, [strokes, drawInkSegment]);

  const drawPaperTexture = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
  ) => {
    ctx.save();
    ctx.fillStyle = "#faf8f5";
    ctx.fillRect(0, 0, w, h);

    // Subtle paper grain
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.02})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    }
    ctx.restore();
  };

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // ---- MOUSE/TOUCH HANDLERS ----

  const getPosition = (
    e: React.MouseEvent | React.TouchEvent,
  ): { x: number; y: number; pressure: number } => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
        pressure: (touch as any).force || 0.5,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      pressure: (e as any).pressure || 0.5,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const { x, y, pressure } = getPosition(e);
    const point: Point = {
      x,
      y,
      pressure: Math.max(pressure, 0.3),
      timestamp: Date.now(),
    };

    setIsDrawing(true);
    setCurrentStroke([point]);
    setRedoStack([]); // Clear redo on new stroke
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    const { x, y, pressure } = getPosition(e);
    const point: Point = {
      x,
      y,
      pressure: Math.max(pressure, 0.3),
      timestamp: Date.now(),
    };

    setCurrentStroke((prev) => {
      const newPoints = [...prev, point];

      // Draw current stroke on overlay canvas
      const overlay = overlayCanvasRef.current;
      if (overlay) {
        const ctx = overlay.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, overlay.width, overlay.height);
          drawInkSegment(
            ctx,
            newPoints,
            strokeColor,
            strokeSize,
            strokeOpacity,
            strokeStyle,
          );
        }
      }

      return newPoints;
    });
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStroke.length > 1) {
      const newStroke: Stroke = {
        points: currentStroke,
        color: strokeColor,
        size: strokeSize,
        opacity: strokeOpacity,
        style: strokeStyle,
      };
      setStrokes((prev) => [...prev, newStroke]);
    }

    setCurrentStroke([]);

    // Clear overlay
    const overlay = overlayCanvasRef.current;
    if (overlay) {
      const ctx = overlay.getContext("2d");
      ctx?.clearRect(0, 0, overlay.width, overlay.height);
    }
  };

  // ---- UNDO / REDO ----

  const undo = useCallback(() => {
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setRedoStack((redo) => [...redo, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const redo = useCallback(() => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setStrokes((s) => [...s, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const clearAll = () => {
    setStrokes([]);
    setRedoStack([]);
  };

  // ---- KEYBOARD SHORTCUTS ----

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  // ---- EXPORT ----

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  // ---- RENDER ----

  const colors = [
    "#1a1a2e",
    "#e94560",
    "#0f3460",
    "#16213e",
    "#533483",
    "#e07c24",
    "#2d6a4f",
    "#d62828",
  ];

  return (
    <div className="flex flex-col items-center gap-4 p-6 select-none">
      <h2 className="text-2xl font-bold text-gray-800">
        ✒️ Ink Drawing Canvas
      </h2>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Stroke Style */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Style
          </label>
          <div className="flex gap-1">
            {(["ink", "brush", "pen", "marker"] as const).map((style) => (
              <button
                key={style}
                onClick={() => setStrokeStyle(style)}
                className={`px-3 py-1.5 text-sm rounded-lg capitalize transition-all ${
                  strokeStyle === style
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-200" />

        {/* Colors */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Color
          </label>
          <div className="flex gap-1.5">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setStrokeColor(color)}
                className={`w-7 h-7 rounded-full transition-all border-2 ${
                  strokeColor === color
                    ? "border-gray-400 scale-110 shadow-md"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-7 h-7 rounded-full cursor-pointer border-0"
            />
          </div>
        </div>

        <div className="w-px h-10 bg-gray-200" />

        {/* Size */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Size: {strokeSize}px
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={strokeSize}
            onChange={(e) => setStrokeSize(Number(e.target.value))}
            className="w-24 accent-gray-800"
          />
        </div>

        {/* Opacity */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Opacity: {Math.round(strokeOpacity * 100)}%
          </label>
          <input
            type="range"
            min={10}
            max={100}
            value={strokeOpacity * 100}
            onChange={(e) => setStrokeOpacity(Number(e.target.value) / 100)}
            className="w-24 accent-gray-800"
          />
        </div>

        <div className="w-px h-10 bg-gray-200" />

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={strokes.length === 0}
            className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-30 transition-all"
            title="Undo (Ctrl+Z)"
          >
            ↩️ Undo
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-30 transition-all"
            title="Redo (Ctrl+Shift+Z)"
          >
            ↪️ Redo
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
          >
            🗑️ Clear
          </button>
          <button
            onClick={exportImage}
            className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
          >
            💾 Export
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div
        className="relative rounded-xl shadow-2xl overflow-hidden border border-gray-200"
        style={{ width, height }}
      >
        {/* Main canvas (completed strokes) */}
        <canvas
          ref={canvasRef}
          width={width * 2}
          height={height * 2}
          className="absolute inset-0"
          style={{ width, height }}
        />

        {/* Overlay canvas (current stroke) */}
        <canvas
          ref={overlayCanvasRef}
          width={width * 2}
          height={height * 2}
          className="absolute inset-0 cursor-crosshair"
          style={{ width, height }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      </div>

      {/* Status */}
      <p className="text-sm text-gray-400">
        {strokes.length} stroke{strokes.length !== 1 ? "s" : ""} •
        {redoStack.length} in redo stack • Ctrl+Z / Ctrl+Shift+Z for undo/redo
      </p>
    </div>
  );
};

export default DrawingCanvas;

// "use client";

// import React, { useRef, useState, useEffect } from "react";

// export default function TracingInteraction() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [isSnappedOnTarget, setIsSnappedOnTarget] = useState(false);

//   const dragStartRef = useRef({ pointerX: 0, pointerY: 0, posX: 0, posY: 0 });

//   const draggableRef = useRef<HTMLDivElement>(null);
//   const placeholderRef = useRef<HTMLDivElement>(null);
//   const targetRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // Initialize Canvas resolution matching CSS bounds
//   useEffect(() => {
//     const initCanvas = () => {
//       if (canvasRef.current) {
//         const rect = canvasRef.current.getBoundingClientRect();
//         canvasRef.current.width = rect.width;
//         canvasRef.current.height = rect.height;
//       }
//     };
//     initCanvas();
//     window.addEventListener("resize", initCanvas);
//     return () => window.removeEventListener("resize", initCanvas);
//   }, []);

//   // Shared Helper: Calculates exact target position & snaps to it
//   const executeSnapToTarget = () => {
//     if (!placeholderRef.current || !targetRef.current) return;

//     const pRect = placeholderRef.current.getBoundingClientRect();
//     const tRect = targetRef.current.getBoundingClientRect();

//     setIsAnimating(true);
//     setPosition({
//       x: tRect.left - pRect.left,
//       y: tRect.top - pRect.top,
//     });
//     setIsSnappedOnTarget(true); // Disables button
//   };

//   // Keep target snap position accurate during layout resizes
//   useEffect(() => {
//     const handleResize = () => {
//       if (isSnappedOnTarget) {
//         setIsAnimating(false);
//         executeSnapToTarget();
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [isSnappedOnTarget]);

//   // Evaluates overlap percentage against standard 98% rule
//   const checkOverlapAndSnap = () => {
//     if (!draggableRef.current || !targetRef.current) return;

//     // Measure live bounding boxes at the moment of release
//     const r1 = draggableRef.current.getBoundingClientRect();
//     const r2 = targetRef.current.getBoundingClientRect();

//     // Calculate 2D plane intersection
//     const overlapW = Math.max(
//       0,
//       Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left),
//     );
//     const overlapH = Math.max(
//       0,
//       Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top),
//     );
//     const overlapArea = overlapW * overlapH;
//     const targetArea = r2.width * r2.height;

//     // 98% Overlap threshold check
//     if (targetArea > 0 && overlapArea / targetArea >= 0.78) {
//       executeSnapToTarget();
//     } else {
//       setIsSnappedOnTarget(false); // Re-enables button if dragged away
//     }
//   };

//   // Button Action: "Lay the paper to trace"
//   const handleLayPaperClick = () => {
//     executeSnapToTarget();
//   };

//   /* ----- Pointer Drag Controls (1:1 Cursor Tracking) ----- */
//   const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
//     e.currentTarget.setPointerCapture(e.pointerId);

//     setIsDragging(true);
//     setIsAnimating(false); // Instantly remove transition for real-time movement

//     dragStartRef.current = {
//       pointerX: e.clientX,
//       pointerY: e.clientY,
//       posX: position.x,
//       posY: position.y,
//     };
//   };

//   const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
//     if (!isDragging) return;

//     const deltaX = e.clientX - dragStartRef.current.pointerX;
//     const deltaY = e.clientY - dragStartRef.current.pointerY;

//     setPosition({
//       x: dragStartRef.current.posX + deltaX,
//       y: dragStartRef.current.posY + deltaY,
//     });
//   };

//   const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
//     if (!isDragging) return;

//     e.currentTarget.releasePointerCapture(e.pointerId);
//     setIsDragging(false);

//     // Let the DOM update its bounds, then evaluate 98% overlap using standard layout rects
//     requestAnimationFrame(() => {
//       checkOverlapAndSnap();
//     });
//   };

//   /* ----- Drawing logic inside <canvas> ----- */
//   const [isDrawing, setIsDrawing] = useState(false);

//   const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     setIsDrawing(true);
//     draw(e);
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     canvasRef.current?.getContext("2d")?.beginPath();
//   };

//   const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     if (!ctx) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     ctx.lineWidth = 3;
//     ctx.lineCap = "round";
//     ctx.strokeStyle = "#374151";
//     ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden p-8 bg-gray-50 gap-12 select-none">
//       {/* Interaction Header */}
//       <div className="text-center space-y-4 max-w-lg z-10">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Tracing Canvas Tool
//         </h2>
//         <p className="text-gray-600 text-sm">
//           Drag the paper using its blue padding edges. Drop it on top of the
//           target element or click the button below. You can drag it again
//           anytime!
//         </p>
//         <button
//           onClick={handleLayPaperClick}
//           disabled={isSnappedOnTarget}
//           className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
//         >
//           {isSnappedOnTarget
//             ? "Paper placed on target"
//             : "Lay the paper to trace"}
//         </button>
//       </div>

//       {/* Main Container */}
//       <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center z-20">
//         {/* Placeholder / Starting Position */}
//         <div
//           ref={placeholderRef}
//           className="relative w-72 h-72 lg:w-80 lg:h-80 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-100/50"
//         >
//           <span className="text-gray-400 font-medium text-sm">
//             Starting Area
//           </span>

//           {/* Draggable Wrapper Element */}
//           <div
//             ref={draggableRef}
//             style={{
//               transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
//             }}
//             className={`absolute inset-0 z-20 flex w-full h-full rounded-xl shadow-lg ${
//               isAnimating
//                 ? "transition-transform duration-300 ease-out"
//                 : "transition-none"
//             }`}
//           >
//             {/* 4-sided Outer Padding / Border Handle (Draggable Area) */}
//             <div
//               className="w-full h-full p-6 bg-indigo-500 rounded-xl cursor-grab active:cursor-grabbing touch-none flex flex-col shadow-xl"
//               onPointerDown={handlePointerDown}
//               onPointerMove={handlePointerMove}
//               onPointerUp={handlePointerUp}
//               onPointerCancel={handlePointerUp}
//             >
//               {/* Inner Content: Canvas (Non-draggable area) */}
//               <canvas
//                 ref={canvasRef}
//                 className="flex-1 w-full h-full bg-white rounded-sm shadow-inner cursor-crosshair touch-none"
//                 onPointerDown={(e) => {
//                   e.stopPropagation();
//                   startDrawing(e);
//                 }}
//                 onPointerMove={(e) => {
//                   e.stopPropagation();
//                   draw(e);
//                 }}
//                 onPointerUp={(e) => {
//                   e.stopPropagation();
//                   stopDrawing();
//                 }}
//                 onPointerLeave={(e) => {
//                   e.stopPropagation();
//                   stopDrawing();
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Drop Target Element */}
//         <div
//           ref={targetRef}
//           className="w-72 h-72 lg:w-80 lg:h-80 border-4 border-dashed border-gray-400 bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center text-gray-500"
//         >
//           <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40 text-center px-4">
//             <svg
//               className="w-16 h-16 mb-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
//               />
//             </svg>
//             <span className="font-semibold text-lg">Drop Target</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
