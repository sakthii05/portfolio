"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LuPlay, LuTerminal } from "react-icons/lu";

interface PreviewProps {
  type: string;
}

export const PlaygroundPreview: React.FC<PreviewProps> = ({ type }) => {
  return (
    <div className="relative w-full h-44 sm:h-48 md:h-52 rounded-xl overflow-hidden bg-foreground/[0.02] dark:bg-foreground/[0.03] border border-foreground/10 flex flex-col justify-between p-3.5 sm:p-4 select-none group-hover:border-foreground/25 transition-colors duration-300">
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-foreground/30" />
          <div className="size-2 rounded-full bg-foreground/15" />
          <div className="size-2 rounded-full bg-foreground/10" />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80 px-2 py-0.5 rounded border border-foreground/10 bg-background/60">
          Interactive Lab
        </span>
      </div>

      <div className="my-auto w-full flex items-center justify-center relative py-2">
        {type === "fluid-distortion" && <FluidDistortionMini />}
        {type === "train-shutter" && <TrainShutterMini />}
        {type === "led-marquee" && <LedMarqueeMini />}
        {type === "monochrome-hero" && <MonochromeHeroMini />}
        {type === "spring-timeline" && <SpringTimelineMini />}
        {type === "magnetic-btn" && <MagneticBtnMini />}
        {type === "floating-dock" && <FloatingDockMini />}
        {type === "segmented-pill" && <SegmentedPillMini />}
        {type === "svg-sandbox" && <SvgSandboxMini />}
        {type === "token-stream" && <TokenStreamMini />}
        {type === "terminal-agent" && <TerminalAgentMini />}
        {type === "voice-spectrogram" && <VoiceSpectrogramMini />}
      </div>

      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono z-10 pt-2 border-t border-foreground/5">
        <span>{type.toUpperCase().replace("-", " ")}</span>
        <span className="text-foreground/70">CLICK TO TEST</span>
      </div>
    </div>
  );
};

// 1. Fluid Distortion Preview
const FluidDistortionMini = () => {
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      className="w-full max-w-[240px] h-28 relative rounded-lg border border-foreground/10 overflow-hidden bg-background/50 cursor-crosshair flex items-center justify-center"
    >
      <svg className="w-full h-full opacity-60">
        <defs>
          <radialGradient id="distortionGlow" cx={`${coords.x}%`} cy={`${coords.y}%`} r="35%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#distortionGlow)" className="text-foreground" />
        {/* Wireframe Grid */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 20}
            x2="240"
            y2={i * 20 + Math.sin((coords.x / 100) * Math.PI) * 4}
            stroke="currentColor"
            strokeWidth="0.7"
            className="text-foreground/20"
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 30 + Math.cos((coords.y / 100) * Math.PI) * 4}
            y1="0"
            x2={i * 30}
            y2="120"
            stroke="currentColor"
            strokeWidth="0.7"
            className="text-foreground/20"
          />
        ))}
      </svg>
      <div
        className="absolute size-4 rounded-full border border-foreground/60 pointer-events-none transition-transform duration-75 ease-out"
        style={{ left: `calc(${coords.x}% - 8px)`, top: `calc(${coords.y}% - 8px)` }}
      />
      <span className="absolute bottom-1 right-2 text-[8px] font-mono text-muted-foreground">
        UV: {coords.x.toFixed(0)}, {coords.y.toFixed(0)}
      </span>
    </div>
  );
};

// 2. Train Shutter Preview
const TrainShutterMini = () => {
  const [shutterOpen, setShutterOpen] = useState(false);
  return (
    <div
      onClick={() => setShutterOpen(!shutterOpen)}
      className="w-full max-w-[240px] h-28 rounded-lg border border-foreground/15 relative overflow-hidden cursor-pointer bg-background"
    >
      {/* Outside View (Day / Night Window) */}
      <div className="absolute inset-0 bg-neutral-900 flex flex-col justify-between p-3">
        <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400">
          <span>EXPRESS // COACH A1</span>
          <span className="text-amber-300">NIGHT SCENE</span>
        </div>
        <div className="flex gap-1 items-end justify-center">
          <div className="w-1.5 h-6 bg-neutral-700" />
          <div className="w-1.5 h-12 bg-neutral-600" />
          <div className="w-1.5 h-8 bg-neutral-700" />
          <div className="w-2 h-14 bg-neutral-500" />
          <div className="w-1.5 h-7 bg-neutral-700" />
        </div>
      </div>

      {/* Shutter Blade */}
      <motion.div
        animate={{ y: shutterOpen ? "-80%" : "0%" }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 border-b-2 border-foreground/40 flex flex-col justify-between p-2 shadow-md z-10"
      >
        <div className="space-y-1 opacity-40">
          <div className="h-1 w-full bg-foreground/20 rounded" />
          <div className="h-1 w-full bg-foreground/20 rounded" />
          <div className="h-1 w-full bg-foreground/20 rounded" />
          <div className="h-1 w-full bg-foreground/20 rounded" />
        </div>
        <div className="w-12 h-2.5 mx-auto rounded-full bg-foreground/30 flex items-center justify-center">
          <div className="w-4 h-1 bg-foreground/50 rounded-full" />
        </div>
      </motion.div>

      <span className="absolute bottom-1 right-2 text-[8px] font-mono text-white/80 z-20">
        {shutterOpen ? "PULL DOWN" : "PULL UP"}
      </span>
    </div>
  );
};

// 3. LED Marquee Preview
const LedMarqueeMini = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[240px] h-28 rounded-lg bg-black border border-foreground/20 p-2.5 flex flex-col justify-between overflow-hidden shadow-inner">
      <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 border-b border-neutral-800 pb-1">
        <span>TRACK 04</span>
        <span className="led-text tracking-widest">{time || "19:42:05"}</span>
      </div>

      <div className="relative overflow-hidden py-1">
        <div className="whitespace-nowrap font-mono text-xs tracking-wider led-text">
          CHENNAI EXP // ARRIVAL ON TIME // COACH S1-S8
        </div>
      </div>

      <div className="flex justify-between text-[8px] font-mono text-neutral-500 pt-1 border-t border-neutral-800">
        <span>SPEED: 110 KM/H</span>
        <span className="text-emerald-500">SYSTEM NORMAL</span>
      </div>
    </div>
  );
};

// 4. Monochrome Kinetic Hero Preview
const MonochromeHeroMini = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full max-w-[240px] h-28 rounded-lg border border-foreground/10 bg-background/50 relative overflow-hidden flex items-center justify-center p-3 cursor-pointer"
    >
      <motion.div
        animate={{ x: hovered ? -8 : 0, scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
        className="font-mono text-2xl tracking-tighter text-foreground/20 absolute"
      >
        FRONTEND
      </motion.div>
      <motion.div
        animate={{ x: hovered ? 8 : 0, y: hovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
        className="font-mono text-xl tracking-tight text-foreground font-semibold relative z-10"
      >
        ARCHITECT
      </motion.div>
      <span className="absolute bottom-1 left-2 text-[8px] font-mono text-muted-foreground">
        HOVER TO SHIFT
      </span>
    </div>
  );
};

// 5. Spring Timeline Preview
const SpringTimelineMini = () => {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <div className="w-full max-w-[240px] h-28 rounded-lg border border-foreground/10 bg-background/50 p-2.5 flex items-center justify-between">
      <div className="relative h-20 w-4 flex flex-col items-center justify-between">
        <div className="absolute top-2 bottom-2 w-0.5 bg-foreground/20" />
        <motion.div
          animate={{ top: `${(activeStep / 2) * 80}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="absolute size-2.5 rounded-full bg-foreground -translate-x-1/2 left-1/2 shadow-xs"
        />
        {[0, 1, 2].map((step) => (
          <button
            key={step}
            onClick={() => setActiveStep(step)}
            className={`size-2 rounded-full z-10 transition-colors ${
              activeStep === step ? "bg-transparent ring-2 ring-foreground" : "bg-foreground/40"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 pl-4 space-y-1">
        <div className="text-[11px] font-mono font-medium text-foreground">
          Step 0{activeStep + 1}: {["Explore", "Architecture", "Ship"][activeStep]}
        </div>
        <p className="text-[9px] text-muted-foreground leading-tight">
          Spring damping tracking active viewport position.
        </p>
        <div className="pt-1 flex gap-1">
          {[0, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setActiveStep(s)}
              className={`px-1.5 py-0.5 text-[8px] font-mono rounded border ${
                activeStep === s ? "border-foreground bg-foreground text-background" : "border-foreground/20 text-muted-foreground"
              }`}
            >
              0{s + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 6. Magnetic Button Preview
const MagneticBtnMini = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.35;
    const dy = (e.clientY - centerY) * 0.35;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[240px] h-28 rounded-lg border border-foreground/10 bg-background/50 flex flex-col items-center justify-center p-3 relative"
    >
      <motion.button
        animate={{ x: offset.x, y: offset.y, scale: clicked ? 0.95 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 300);
        }}
        className="px-4 py-1.5 rounded-full bg-foreground text-background text-xs font-mono tracking-wider shadow-sm cursor-pointer"
      >
        {clicked ? "TRIGGERED!" : "MAGNETIC"}
      </motion.button>
      <span className="text-[8px] font-mono text-muted-foreground mt-2">
        PULL: {offset.x.toFixed(0)}px, {offset.y.toFixed(0)}px
      </span>
    </div>
  );
};

// 7. Floating Dock Preview
const FloatingDockMini = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="w-full max-w-[240px] h-28 rounded-lg border border-foreground/10 bg-background/50 flex flex-col items-center justify-center p-2 relative">
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/20 bg-background/80 backdrop-blur-md shadow-xs">
        {["Home", "Work", "Play", "Logs"].map((item, idx) => (
          <button
            key={item}
            onClick={() => setActive(idx)}
            className={`px-2 py-1 rounded-full text-[9px] font-mono transition-all duration-200 ${
              active === idx
                ? "bg-foreground text-background scale-105"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <span className="text-[8px] font-mono text-muted-foreground mt-2">
        ACTIVE: {["Home", "Work", "Play", "Logs"][active]}
      </span>
    </div>
  );
};

// 8. Segmented Pill Preview
const SegmentedPillMini = () => {
  const [tab, setTab] = useState<"code" | "preview" | "ast">("code");
  return (
    <div className="w-full max-w-[240px] h-28 rounded-lg border border-foreground/10 bg-background/50 flex flex-col justify-center items-center p-3 gap-2">
      <div className="flex p-0.5 rounded-full bg-foreground/10 border border-foreground/15 relative">
        {(["code", "preview", "ast"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full transition-colors z-10 ${
              tab === t ? "text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === t && (
              <motion.div
                layoutId="miniPillActive"
                className="absolute inset-0 bg-foreground rounded-full -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {t}
          </button>
        ))}
      </div>
      <div className="text-[8px] font-mono text-muted-foreground">
        STATE: VIEWPORT_{tab.toUpperCase()}
      </div>
    </div>
  );
};

// 9. Prompt to SVG Sandbox Preview
const SvgSandboxMini = () => {
  const [shape, setShape] = useState<"cube" | "mesh" | "diamond">("cube");
  return (
    <div className="w-full max-w-[240px] h-28 rounded-lg border border-foreground/10 bg-background/50 flex items-center justify-between p-3">
      <svg viewBox="0 0 100 80" className="w-24 h-20 stroke-foreground fill-none">
        {shape === "cube" && (
          <g strokeWidth="1.2">
            <polygon points="50,15 80,30 50,45 20,30" className="stroke-foreground/80" />
            <polygon points="20,30 50,45 50,75 20,60" className="stroke-foreground/60" />
            <polygon points="80,30 50,45 50,75 80,60" className="stroke-foreground/70" />
          </g>
        )}
        {shape === "mesh" && (
          <g strokeWidth="1" strokeDasharray="3 2" className="stroke-foreground/70">
            <circle cx="50" cy="40" r="28" />
            <ellipse cx="50" cy="40" rx="28" ry="12" />
            <line x1="50" y1="12" x2="50" y2="68" />
          </g>
        )}
        {shape === "diamond" && (
          <g strokeWidth="1.2">
            <polygon points="50,12 82,40 50,68 18,40" className="stroke-foreground/80" />
            <line x1="18" y1="40" x2="82" y2="40" strokeDasharray="2 2" />
            <line x1="50" y1="12" x2="50" y2="68" strokeDasharray="2 2" />
          </g>
        )}
      </svg>
      <div className="flex flex-col gap-1">
        {(["cube", "mesh", "diamond"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`px-2 py-0.5 text-[8px] font-mono uppercase rounded border ${
              shape === s ? "border-foreground bg-foreground text-background" : "border-foreground/20 text-muted-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

// 10. Token Stream Profiler Preview
const TokenStreamMini = () => {
  const [tokens, setTokens] = useState<string[]>(["Generating", "optimized", "AST..."]);
  const [streaming, setStreaming] = useState(false);

  const startStream = () => {
    if (streaming) return;
    setStreaming(true);
    setTokens([]);
    const words = ["Analyzing", "AST", "structure", "=>", "zero", "layout", "shift", "verified."];
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        setTokens((prev) => [...prev, words[i]]);
        i++;
      } else {
        clearInterval(interval);
        setStreaming(false);
      }
    }, 140);
  };

  return (
    <div className="w-full max-w-[240px] h-28 rounded-lg border border-foreground/10 bg-background/50 p-2.5 flex flex-col justify-between font-mono text-[9px]">
      <div className="flex justify-between items-center text-muted-foreground border-b border-foreground/10 pb-1">
        <span>SPEED: 62 tok/s</span>
        <button
          onClick={startStream}
          disabled={streaming}
          className="flex items-center gap-1 text-foreground hover:underline cursor-pointer"
        >
          <LuPlay className="size-2.5" /> RUN
        </button>
      </div>
      <div className="flex flex-wrap gap-1 py-1 min-h-[40px] items-start">
        {tokens.map((t, idx) => (
          <span
            key={idx}
            className="px-1 py-0.5 rounded bg-foreground/10 text-foreground border border-foreground/15"
          >
            {t}
          </span>
        ))}
        {streaming && <span className="inline-block w-1.5 h-3 bg-foreground animate-pulse" />}
      </div>
      <div className="flex justify-between text-[8px] text-muted-foreground pt-1 border-t border-foreground/10">
        <span>TTFT: 128ms</span>
        <span className="text-emerald-500">{streaming ? "STREAMING" : "IDLE"}</span>
      </div>
    </div>
  );
};

// 11. Context-Aware Terminal Agent Preview
const TerminalAgentMini = () => {
  const [step, setStep] = useState(0);
  const steps = [
    "> analyzing repo AST",
    "> run: eslint --verify",
    "> status: clean (0 err)",
  ];

  return (
    <div
      onClick={() => setStep((s) => (s + 1) % steps.length)}
      className="w-full max-w-[240px] h-28 rounded-lg bg-black border border-neutral-800 p-2.5 flex flex-col justify-between font-mono text-[9px] cursor-pointer shadow-inner"
    >
      <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-1">
        <div className="flex items-center gap-1">
          <LuTerminal className="size-2.5" />
          <span>AGENT CONSOLE</span>
        </div>
        <span className="text-[8px] text-neutral-500">TAP STEP</span>
      </div>
      <div className="space-y-1 py-1">
        {steps.slice(0, step + 1).map((s, idx) => (
          <div
            key={idx}
            className={idx === step ? "text-emerald-400 font-semibold" : "text-neutral-500"}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="text-[8px] text-neutral-500 pt-1 border-t border-neutral-800 flex justify-between">
        <span>THREAD: A-49</span>
        <span className="text-emerald-500">READY</span>
      </div>
    </div>
  );
};

// 12. Voice Spectrogram Monitor Preview
const VoiceSpectrogramMini = () => {
  return (
    <div className="w-full max-w-[240px] h-28 rounded-lg border border-foreground/10 bg-background/50 p-2.5 flex flex-col justify-between">
      <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground border-b border-foreground/10 pb-1">
        <span>AUDIO STREAM</span>
        <span className="text-emerald-500 font-mono">48 kHz</span>
      </div>
      <div className="flex items-end justify-between gap-1 h-12 py-1">
        {[20, 55, 80, 40, 95, 60, 30, 85, 45, 70, 90, 35, 65, 25].map((val, idx) => (
          <motion.div
            key={idx}
            animate={{ height: [`${val * 0.4}%`, `${val}%`, `${val * 0.6}%`] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: idx * 0.08,
            }}
            className="flex-1 bg-foreground/60 rounded-t-xs"
          />
        ))}
      </div>
      <div className="flex justify-between text-[8px] font-mono text-muted-foreground pt-1 border-t border-foreground/10">
        <span>MIC INPUT: ACTIVE</span>
        <span>LATENCY: 12ms</span>
      </div>
    </div>
  );
};
