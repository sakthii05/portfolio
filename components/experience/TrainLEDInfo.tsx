"use client";
const TrainLEDInfo = () => {
  const date = new Date();

  return (
    <div className="relative w-40 h-10 rounded-2xl border-3 bg-neutral-900 overflow-hidden shadow-inner">
      {/* LED dot matrix background pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,0,0,0.15) 1px, transparent 1px)`,
          backgroundSize: "3px 3px",
        }}
      />

      {/* Inner glow / vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(255,0,0,0.4)] rounded-2xl pointer-events-none" />

      {/* Scrolling text track */}
      <div className="relative h-full flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-led-scroll hover:[animation-play-state:paused] font-digital">
          <span className="px-3 text-red-500 text-xs  tracking-widest led-text">
            FUJI MOUNTAIN, JP • Time -{" "}
            {date.getHours().toString().padStart(2, "0")} :{" "}
            {date.getMinutes().toString().padStart(2, "0")} •
          </span>
          <span className="px-3 text-red-500 text-xs  tracking-widest led-text ">
            FUJI MOUNTAIN, JP • Time -{" "}
            {date.getHours().toString().padStart(2, "0")} :{" "}
            {date.getMinutes().toString().padStart(2, "0")} •
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrainLEDInfo;
