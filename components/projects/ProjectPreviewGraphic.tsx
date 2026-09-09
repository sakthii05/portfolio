"use client";

import React from "react";

interface ProjectPreviewGraphicProps {
  type: "architecture" | "ecommerce" | "telemetry" | "cms" | "analytics" | "canvas" | "editorial";
  title: string;
}

export const ProjectPreviewGraphic: React.FC<ProjectPreviewGraphicProps> = ({ type, title }) => {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-60 rounded-xl overflow-hidden bg-foreground/[0.02] dark:bg-foreground/[0.03] border border-foreground/10 flex flex-col justify-between p-4 sm:p-5 select-none transition-colors duration-300 group-hover:border-foreground/25">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-foreground/20 group-hover:bg-foreground/40 transition-colors" />
          <div className="size-2 rounded-full bg-foreground/15" />
          <div className="size-2 rounded-full bg-foreground/10" />
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80 px-2 py-0.5 rounded border border-foreground/10 bg-background/50 backdrop-blur-sm">
          {type}
        </div>
      </div>

      {/* Graphic Center Content based on type */}
      <div className="my-auto flex items-center justify-center w-full py-3 relative">
        {type === "architecture" && (
          <div className="w-full max-w-[240px] aspect-4/3 relative flex items-center justify-center">
            {/* Isometric architectural floorplan wireframe */}
            <svg viewBox="0 0 200 150" className="w-full h-full stroke-foreground/40 fill-none transition-transform duration-500 group-hover:scale-105">
              <rect x="20" y="20" width="160" height="110" strokeWidth="1" strokeDasharray="4 2" className="opacity-40" />
              <rect x="35" y="35" width="80" height="80" strokeWidth="1.5" />
              <rect x="125" y="35" width="40" height="50" strokeWidth="1.2" />
              <line x1="35" y1="75" x2="115" y2="75" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="75" y1="35" x2="75" y2="115" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="75" cy="75" r="14" strokeWidth="1.2" className="stroke-foreground/60" />
              <circle cx="75" cy="75" r="2" className="fill-foreground" />
              <path d="M125 100 L165 100" strokeWidth="1.2" />
              {/* Coordinate markings */}
              <text x="38" y="48" className="fill-foreground/40 text-[7px] font-mono">AXIS-01</text>
              <text x="128" y="48" className="fill-foreground/40 text-[7px] font-mono">Z: +12.4m</text>
            </svg>
          </div>
        )}

        {type === "ecommerce" && (
          <div className="w-full max-w-[240px] aspect-4/3 relative flex flex-col justify-center gap-2 p-3 border border-foreground/10 rounded-lg bg-background/40 transition-transform duration-500 group-hover:scale-105">
            <div className="flex justify-between items-baseline border-b border-foreground/10 pb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-foreground">KN-09 HEAVY TEE</span>
              <span className="font-mono text-xs text-muted-foreground">$94.00</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 py-1">
              {["S", "M", "L", "XL"].map((size, idx) => (
                <div
                  key={size}
                  className={`text-center py-1 text-[10px] font-mono border rounded ${
                    idx === 1 ? "border-foreground bg-foreground text-background" : "border-foreground/20 text-muted-foreground"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-1">
              <span>STOCK: AVAILABLE</span>
              <span className="font-mono uppercase">HEAVY COTTON 360GSM</span>
            </div>
          </div>
        )}

        {type === "telemetry" && (
          <div className="w-full max-w-[250px] flex flex-col gap-2 p-3 border border-foreground/10 rounded-lg bg-background/40 transition-transform duration-500 group-hover:scale-105">
            <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground border-b border-foreground/10 pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>TELEMETRY FEED</span>
              </div>
              <span className="text-foreground/90">FREQ: 120Hz</span>
            </div>
            <svg viewBox="0 0 160 40" className="w-full h-10 stroke-foreground/70 fill-none">
              <path
                d="M0 20 L25 20 L30 10 L35 30 L40 18 L45 22 L60 20 L75 20 L80 5 L85 35 L90 15 L95 24 L110 20 L135 20 L140 12 L145 28 L150 20 L160 20"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="grid grid-cols-3 text-[8px] font-mono text-muted-foreground border-t border-foreground/10 pt-1 text-center">
              <div>LATENCY: 4ms</div>
              <div>LOSS: 0.0%</div>
              <div>NODES: 1,024</div>
            </div>
          </div>
        )}

        {type === "cms" && (
          <div className="w-full max-w-[240px] flex flex-col gap-1.5 p-3 border border-foreground/10 rounded-lg bg-background/40 transition-transform duration-500 group-hover:scale-105">
            <div className="h-2 w-3/4 bg-foreground/20 rounded-xs" />
            <div className="h-1.5 w-full bg-foreground/10 rounded-xs mt-1" />
            <div className="h-1.5 w-5/6 bg-foreground/10 rounded-xs" />
            <div className="h-1.5 w-2/3 bg-foreground/10 rounded-xs" />
            <div className="flex gap-2 pt-2 border-t border-foreground/10 mt-1">
              <div className="h-4 w-12 rounded border border-foreground/20 flex items-center justify-center text-[7px] font-mono text-muted-foreground">
                MARKDOWN
              </div>
              <div className="h-4 w-14 rounded border border-foreground/20 flex items-center justify-center text-[7px] font-mono text-muted-foreground">
                4 MIN READ
              </div>
            </div>
          </div>
        )}

        {type === "analytics" && (
          <div className="w-full max-w-[250px] flex flex-col gap-2 p-3 border border-foreground/10 rounded-lg bg-background/40 transition-transform duration-500 group-hover:scale-105">
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className="text-muted-foreground">EVENT PIPELINE</span>
              <span className="text-emerald-500 font-semibold">+34.8%</span>
            </div>
            <div className="flex items-end justify-between gap-1.5 h-12 pt-2">
              {[28, 45, 32, 60, 48, 72, 65, 88, 78, 95].map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-foreground/20 hover:bg-foreground/50 rounded-t-xs transition-colors"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[8px] font-mono text-muted-foreground pt-1 border-t border-foreground/10">
              <span>Q1-2023</span>
              <span>1.2M EVENTS/SEC</span>
              <span>Q4-2024</span>
            </div>
          </div>
        )}

        {(type === "editorial" || type === "canvas") && (
          <div className="w-full max-w-[240px] aspect-4/3 flex flex-col justify-center items-center gap-2 p-3 border border-foreground/10 rounded-lg bg-background/40 transition-transform duration-500 group-hover:scale-105">
            <span className="font-mono text-lg text-foreground/80 tracking-wide text-center">
              SYSTEM DESIGN
            </span>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded border border-foreground/30 flex items-center justify-center text-[9px] font-mono">
                UI
              </div>
              <div className="w-6 h-6 rounded border border-foreground/30 flex items-center justify-center text-[9px] font-mono">
                TS
              </div>
              <div className="w-6 h-6 rounded border border-foreground/30 flex items-center justify-center text-[9px] font-mono">
                A11Y
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Subtext */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground/70 font-mono z-10 pt-2 border-t border-foreground/5">
        <span className="truncate max-w-[200px]">{title}</span>
        <span className="text-[9px] uppercase tracking-wider">PREVIEW</span>
      </div>
    </div>
  );
};
