import React from "react";

const ToolTip = (props: { children: React.ReactNode }) => {
  return (
    <div
      className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none z-50
                opacity-0 translate-y-2 scale-90
                group-hover:opacity-100 
                group-hover:translate-y-0 
                group-hover:scale-100
                transition-all duration-200 ease-out flex flex-col items-center"
    >
      <div
        className="rounded-full bg-background px-3 py-2 font-semibold tracking-wider 
                text-foreground text-base shadow-lg  backdrop-blur-md whitespace-nowrap font-mono"
      >
        {props.children}
      </div>
      <div className="-mt-1 h-2 w-2 rotate-45 bg-background" />
    </div>
  );
};

export default ToolTip;
