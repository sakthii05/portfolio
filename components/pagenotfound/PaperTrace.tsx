"use client";
import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { LuRedo, LuUndo } from "react-icons/lu";
import { MdOutlineFiberNew } from "react-icons/md";

interface Point {
  x: number;
  y: number;
  pressure: number;
  timestamp: number;
}

interface Stroke {
  points: Point[];
  color: string;
}

const COLORS = ["#111827", "#DC2626", "#2563EB", "#16A34A", "#9333EA"];

const HANDLE_SIZE = 40;

const PaperTrace = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const traceContainerRef = useRef<HTMLDivElement>(null);
  const paperContainerRef = useRef<HTMLDivElement>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragArea, setIsDragArea] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnappedOnTarget, setIsSnappedOnTarget] = useState(false);

  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [history, setHistory] = useState<Stroke[]>([]);
  const [redoHistory, setRedoHistory] = useState<Stroke[]>([]);
  const currentStrokeRef = useRef<Point[]>([]);
  const historyRef = useRef<Stroke[]>([]);

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

  // Synchronize dynamic history changes to ref for resize redraw reference
  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  // Redraw complete paths from stack
  const redrawCanvas = (strokesList: Stroke[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokesList.forEach((stroke) => {
      if (stroke.points.length === 0) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);

    // Begin stroke tracking
    currentStrokeRef.current = [
      { x, y, pressure: e.pressure, timestamp: Date.now() },
    ];

    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = selectedColor;
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Track active mouse coordinate trajectory
    currentStrokeRef.current.push({
      x,
      y,
      pressure: e.pressure,
      timestamp: Date.now(),
    });

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = selectedColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const dragControls = useDragControls();

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
      setIsDrawing(false);
      activePointerIdRef.current = null;
      setIsDragArea(true);
      dragControls.start(e);
      return;
    }
    // Drawing area
    activePointerIdRef.current = e.pointerId;
    setIsDrawing(true);
    // Keep receiving pointer events even outside canvas
    canvas.setPointerCapture(e.pointerId);
    setIsDragArea(false);
    startDrawing(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    checkOverlapAndSnap();
    // Update cursor when not drawing
    if (!isDrawing) {
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
      setIsDrawing(false);
      activePointerIdRef.current = null;

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }

      // Save complete raw stroke to stack history
      if (currentStrokeRef.current.length > 0) {
        const newStroke: Stroke = {
          points: [...currentStrokeRef.current],
          color: selectedColor,
        };
        setHistory((prev) => [...prev, newStroke]);
        setRedoHistory([]); // Reset Redo stack after a new action
        currentStrokeRef.current = [];
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
    if (targetArea > 0 && overlapArea / targetArea >= 0.85 && !isDragging) {
      executeSnapToTarget();
    } else {
      setIsSnappedOnTarget(false); // Re-enables button if dragged away
    }
  };

  // Undo features
  const handleUndo = () => {
    if (history.length === 0) return;
    const newHistory = history.slice(0, -1);
    const lastStroke = history[history.length - 1];

    setHistory(newHistory);
    setRedoHistory((prev) => [lastStroke, ...prev]);
    redrawCanvas(newHistory);
  };

  // Redo features
  const handleRedo = () => {
    if (redoHistory.length === 0) return;
    const strokeToRestore = redoHistory[0];
    const newRedoHistory = redoHistory.slice(1);
    const newHistory = [...history, strokeToRestore];

    setHistory(newHistory);
    setRedoHistory(newRedoHistory);
    redrawCanvas(newHistory);
  };

  // Reset Canvas Paper features
  const handleNewPaper = () => {
    setHistory([]);
    setRedoHistory([]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const ToolBarBtn = (props: {
    label: ReactNode;
    onBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
  }) => {
    const { label, onBtnClick, disabled } = props;
    return (
      <button
        onClick={onBtnClick}
        disabled={disabled}
        className={`px-2 py-1 text-xs rounded-lg ${disabled ? "cursor-not-allowed opacity-30 " : "cursor-pointer active:translate-y-0.5"} bg-foreground/5 dark:bg-foreground/40 inset-shadow-sm inset-shadow-black/20 dark:inset-shadow-white/20  transition-all duration-75`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className=" flex flex-col items-center justify-center pt-3 gap-1 ">
      <div className="h-10 w-full flex justify-between items-center">
        <ToolBarBtn
          label="Lay the Paper"
          onBtnClick={() => executeSnapToTarget()}
          disabled={isSnappedOnTarget}
        />
        <div className="flex gap-3 items-center">
          {/* Color Swatch Selectors */}
          <div className="flex gap-1.5 items-center px-2 py-1 rounded-lg bg-foreground/5 dark:bg-foreground/40 border border-neutral-200 dark:border-neutral-800 shadow-inner">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: color }}
                className={`size-5 rounded-full cursor-pointer transition-all border ${
                  selectedColor === color
                    ? "ring-2 ring-indigo-500 scale-110 border-white"
                    : "border-transparent hover:scale-105"
                }`}
                title={`Set stroke color to ${color}`}
              />
            ))}
          </div>
          <ToolBarBtn
            label={<LuUndo className="size-5" />}
            onBtnClick={() => handleUndo()}
            disabled={history.length === 0}
          />
          <ToolBarBtn
            label={<LuRedo className="size-5" />}
            onBtnClick={() => handleRedo()}
            disabled={redoHistory.length === 0}
          />
          <ToolBarBtn
            label={<MdOutlineFiberNew className="size-5" />}
            onBtnClick={() => handleNewPaper()}
          />
        </div>
      </div>

      <div className="relative h-130 md:h-144 aspect-4/5  ">
        <div ref={traceContainerRef} className="absolute inset-0 z-0 border">
          <Image
            src="/images/trace-image.png"
            alt="trace-image"
            fill
            className="object-contain"
          />
        </div>
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
          className={`absolute inset-0 z-10 ${isDragging ? "shadow-lg" : "shadow-sm"} bg-gray-100/50`}
        >
          <div className="pointer-events-none absolute transition-all duration-75 left-0 top-0 z-20 h-5  w-full border-t-2 border-transparent px-2 py-1 text-sm font-prime font-medium">
            Paper - {isSnappedOnTarget ? "Ready To Trace" : "Loose"}
          </div>
          <canvas
            ref={canvasRef}
            className={`absolute inset-0  mix-blend-multiply block w-full h-full rounded-sm shadow-inner touch-none ${isDragArea ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair"}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PaperTrace;
