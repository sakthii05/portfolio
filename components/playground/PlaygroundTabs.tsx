"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlaygroundCategory, playgroundTabs } from "./playgroundData";

interface PlaygroundTabsProps {
  activeTab: PlaygroundCategory;
  onTabChange: (tab: PlaygroundCategory) => void;
}

export const PlaygroundTabs: React.FC<PlaygroundTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % playgroundTabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + playgroundTabs.length) % playgroundTabs.length;
    } else {
      return;
    }
    e.preventDefault();
    onTabChange(playgroundTabs[nextIndex].id);
    const nextBtn = document.getElementById(`playground-tab-${playgroundTabs[nextIndex].id}`);
    nextBtn?.focus();
  };

  return (
    <div className="w-full flex justify-center pt-2">
      <div
        role="tablist"
        aria-label="Playground Showcase Tabs"
        className="inline-flex items-center p-1 rounded-full border border-foreground/15 bg-foreground/[0.03] backdrop-blur-sm"
      >
        {playgroundTabs.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`playground-tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`playground-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`relative px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-mono tracking-wide rounded-full transition-colors duration-200 cursor-pointer select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground ${
                isActive
                  ? "text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePlaygroundTab"
                  className="absolute inset-0 bg-foreground rounded-full -z-10 shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] opacity-70 font-sans ${
                    isActive ? "text-background" : "text-muted-foreground"
                  }`}
                >
                  ({tab.count})
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
