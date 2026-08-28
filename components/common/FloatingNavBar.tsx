"use client";
import React from "react";
import Link from "next/link";
import { LuHouse } from "react-icons/lu";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { BsFolder } from "react-icons/bs";
import { RiGeminiLine } from "react-icons/ri";
import { ThemeToggle } from "./ThemeToggle";

type NavLinkItem = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  target?: string;
  rel?: string;
};

type NavDivider = {
  type: "divider";
};

type NavItem = NavLinkItem | NavDivider;

const navItems: NavItem[] = [
  { href: "/", icon: LuHouse, label: "Home" },
  { type: "divider" },
  {
    href: "/experience",
    icon: PiSuitcaseSimpleLight,
    label: "Experience",
  },
  {
    href: "/projects",
    icon: BsFolder,
    label: "Projects",
  },
  {
    href: "/playground",
    icon: RiGeminiLine,
    label: "Playground",
  },
  { type: "divider" },
];

const FloatingNavbar = () => {
  return (
    <div className="fixed inset-x-0 bottom-5 z-70 pointer-events-none flex justify-center">
      <nav
        className="relative flex h-14 w-fit items-center justify-center gap-1.5 sm:gap-2 overflow-visible 
        rounded-full bg-background/90 px-3.5 py-2 shadow-[0_0_15px_1px] shadow-foreground/60 backdrop-blur-3xl pointer-events-auto transition-all duration-300 ease-out"
      >
        {navItems.map((item, index) => {
          if ("type" in item && item.type === "divider") {
            return (
              <div
                key={`divider-${index}`}
                className="my-auto h-6 w-px shrink-0 bg-muted-foreground/30 transition-all duration-300"
              />
            );
          }

          const linkItem = item as NavLinkItem;
          const Icon = linkItem.icon;
          return (
            <div
              key={linkItem.href}
              className="relative group flex items-center justify-center"
            >
              {/* Smooth Animated Tooltip */}
              <div
                className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none z-50
                opacity-0 translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                transition-all duration-200 ease-out flex flex-col items-center"
              >
                <div
                  className="rounded-full bg-background px-3 py-2 font-semibold tracking-wider 
                text-foreground shadow-lg  backdrop-blur-md whitespace-nowrap font-mono"
                >
                  {linkItem.label}
                </div>
                <div className="-mt-1 h-2 w-2 rotate-45 bg-background" />
              </div>

              {/* Nav Link Item */}
              <Link
                href={linkItem.href}
                target={linkItem.target}
                rel={linkItem.rel}
                className="flex size-10 hover:size-12 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 ease-out hover:bg-muted/80 hover:text-foreground active:scale-95"
                aria-label={linkItem.label}
              >
                <Icon className="size-5 transition-transform duration-200 ease-out group-hover:scale-125" />
              </Link>
            </div>
          );
        })}
        <ThemeToggle />
      </nav>
    </div>
  );
};

export default FloatingNavbar;
