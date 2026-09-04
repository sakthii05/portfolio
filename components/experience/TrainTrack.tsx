"use client";
import { useEffect, useRef, useState } from "react";

interface TrainTrackProps {
  width?: number;
  color?: string;
  tieSpacing?: number;
  className?: string;
  height: number;
}

export default function TrainTrack({
  width = 40,
  color = "#3f3f46",
  tieSpacing = 20,
  className = "",
  height = 0,
}: TrainTrackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  

  // Calculate how many ties fit
  const tieCount = Math.floor(height / tieSpacing);
  const railInset = 7;
  const tieHeight = 2;
  const tieRadius = 2;

  return (
    <div ref={wrapperRef} className={` ${className}`} style={{ width }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        {/* ── Railroad ties (horizontal bars) ── */}
        {Array.from({ length: tieCount }).map((_, i) => (
          <rect
            key={i}
            x="2"
            y={i * tieSpacing + tieSpacing / 2 - tieHeight / 2}
            width={width - 4}
            height={tieHeight}
            rx={tieRadius}
            ry={tieRadius}
            fill={color}
            opacity="1"
          />
        ))}

        {/* ── Left rail ── */}
        <line
          x1={railInset}
          y1="4"
          x2={railInset}
          y2={height - 4}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* ── Right rail ── */}
        <line
          x1={width - railInset}
          y1="4"
          x2={width - railInset}
          y2={height - 4}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
