"use client";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const switchRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    // View Transition API isn't available in every browser.
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      const button = switchRef.current;

      if (!button) return;

      const { top, left, width, height } = button.getBoundingClientRect();

      // Start from the center of the toggle.
      const x = left + width / 2;
      const y = top + height / 2;

      const right = window.innerWidth - x;
      const bottom = window.innerHeight - y;

      const maxRadius = Math.hypot(Math.max(x, right), Math.max(y, bottom));

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <div className="relative group flex items-center justify-center">
      {/* Animated Tooltip */}
      <button
        ref={switchRef}
        type="button"
        onClick={toggleTheme}
        // aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        // aria-pressed={isDark}
        className={
          className ||
          "relative flex size-10 hover:size-12 items-center cursor-pointer justify-center rounded-full text-muted-foreground transition-all duration-200 ease-out hover:bg-muted/80 hover:text-foreground active:scale-95"
        }
      >
        {mounted ? (
          <div className="relative flex items-center justify-center size-5">
            <LuMoon
              className={`size-5 transition-all duration-300 group-hover:scale-125 ${
                isDark
                  ? "rotate-90 scale-0 opacity-0 pointer-events-none absolute"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <LuSun
              className={`size-5 transition-all duration-300 group-hover:scale-125 ${
                isDark
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0 pointer-events-none absolute"
              }`}
            />
          </div>
        ) : (
          <div className="size-5" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}

