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
  const [activeTab, setActiveTab] = useState<PlaygroundCategory>("hero");

  const filteredItems = playgroundItems.filter(
    (item) => item.category === activeTab
  );

  const currentTabMeta = playgroundTabs.find((t) => t.id === activeTab);

  return (
    <div className="w-full flex flex-col items-center px-5 sm:px-8 md:px-12 pt-16 md:pt-24 pb-32">
      <div className="w-full max-w-5xl space-y-12 md:space-y-16">
        {/* Typography-focused Hero */}
        <header className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Interactive Lab
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-normal tracking-tight text-foreground">
            Playground
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A tactile archive of frontend experiments, interactive UI components, WebGL shaders, and AI-assisted interface paradigms.
          </p>
        </header>

        {/* Interactive Tabs */}
        <div className="space-y-6">
          <PlaygroundTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          <div className="flex items-center justify-between border-b border-foreground/10 pb-3 pt-2 text-xs font-mono text-muted-foreground">
            <span>
              SHOWING:{" "}
              <strong className="text-foreground font-medium uppercase">
                {currentTabMeta?.label}
              </strong>
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
          className="focus-visible:outline-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
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