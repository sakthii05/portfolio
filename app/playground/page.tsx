"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaygroundTabs } from "@/components/playground/PlaygroundTabs";
import { PlaygroundCard } from "@/components/playground/PlaygroundCard";
import {
  PlaygroundCategory,
  playgroundItems,
  playgroundTabs,
} from "@/components/playground/playgroundData";

export default function PlayGroundPage() {
  const [activeTab, setActiveTab] = useState<PlaygroundCategory>("component");

  const filteredItems = playgroundItems.filter(
    (item) => item.category === activeTab,
  );

  const currentTabMeta = playgroundTabs.find((t) => t.id === activeTab);

  return (
    <div className="w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-12 py-10 md:py-20 ">
      <div className="w-full max-w-6xl space-y-10">
        {/* Hero Section */}
        <header className="space-y-3 w-full  flex  flex-col items-center justify-center">
          <h2 className="text-2xl font-mono font-semibold ">Playground</h2>
          <p className="font-medium text-center text-sm md:text-base text-foreground/80 leading-relaxed w-[85%] sm:w-[70%] md:w-[65%] lg:w-[60%]">
            A tactile archive of frontend experiments, interactive UI
            components, 3D elements, and AI-assisted apps.
          </p>
        </header>
        {/* Interactive Tabs */}
        <div className="space-y-6">
          <PlaygroundTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          <div className="flex items-center justify-between border-b border-foreground/10 pb-3 pt-2 text-xs  text-muted-foreground">
            <span>
              SHOWING:{" "}
              <strong className="text-foreground font-semibold font-mono tracking-wider uppercase">
                {currentTabMeta?.label}
              </strong>
              {(activeTab === "component" || activeTab === "hero") && (
                <span className="font-caveat pb-3 text-sm">{` (Hover to preview)`}</span>
              )}
            </span>
            <span>{filteredItems.length} Experiments</span>
          </div>
        </div>

        {/* Tab Panel Content Grid */}
        <section
          id={`playground-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`playground-tab-${activeTab}`}
          tabIndex={0}
          className="focus-visible:outline-hidden pb-20 "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredItems.map((item) => (
                <PlaygroundCard key={item.id} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
