"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { LuLoader } from "react-icons/lu";

interface PreviewVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
  title?: string;
  autoResetOnLeave?: boolean;
}

export const PreviewVideo: React.FC<PreviewVideoProps> = ({
  src,
  className = "",
  containerClassName = "",
  title,
  autoResetOnLeave = true,
  ...restProps
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    }
  }, []);

  // Pause playback when video scrolls out of viewport
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !videoElement.paused) {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Safe play helper to avoid AbortError promise rejections
  const safePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      setIsLoading(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.debug("Video play prevented:", err);
      }
      setIsLoading(false);
    }
  }, []);

  // Safe pause helper
  const safePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);
    setIsLoading(false);

    if (autoResetOnLeave) {
      video.currentTime = 0;
    }
  }, [autoResetOnLeave]);

  // Desktop Hover Handlers
  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
    safePlay();
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
    safePause();
  };

  // Mobile / Touch Click / Tap Toggle Handler
  const handleTogglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      safePlay();
    } else {
      safePause();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isTouchDevice ? handleTogglePlay : undefined}
      className={`relative aspect-video  flex items-center justify-center rounded-xl group/video cursor-pointer select-none ${containerClassName}`}
      aria-label={title ? `${title} video preview` : "Video preview"}
    >
      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        muted
        loop
        playsInline
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
          setIsLoading(false);
        }}
        onCanPlay={() => setIsLoading(false)}
        className={`object-contain rounded-xl transition-all duration-300 ${className}`}
        {...restProps}
      />

      {/* Loading Spinner during buffering on hover/play */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[2px] transition-opacity duration-200 z-10 pointer-events-none">
          <LuLoader className="size-6 text-foreground animate-spin opacity-80" />
        </div>
      )}

   
    </div>
  );
};

export default PreviewVideo;