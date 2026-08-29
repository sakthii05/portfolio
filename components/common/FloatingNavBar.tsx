"use client";
import React from "react";
import Link from "next/link";
import { LuHouse } from "react-icons/lu";
import { PiOfficeChair, PiSuitcaseSimpleLight } from "react-icons/pi";
import { BsFolder } from "react-icons/bs";
import { RiGeminiLine } from "react-icons/ri";
import { ThemeToggle } from "./ThemeToggle";
import ToolTip from "./ToolTip";
import { usePathname } from "next/navigation";

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
    icon: PiOfficeChair,
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
  const pathname = usePathname();
  console.log(pathname);
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
              <ToolTip>{linkItem.label}</ToolTip>
              {/* Nav Link Item */}
              <Link
                href={linkItem.href}
                target={linkItem.target}
                rel={linkItem.rel}
                className="flex size-10 hover:size-12 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 ease-out hover:bg-muted/80 hover:text-foreground active:scale-95"
                aria-label={linkItem.label}
              >
                <Icon
                  className={`size-5
                 ${
                   pathname === linkItem.href
                     ? "text-[#228B22] drop-shadow-[0px_0px_8px_#228B22]"
                     : ""
                 }
                transition-transform duration-200 ease-out group-hover:scale-125`}
                />
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
