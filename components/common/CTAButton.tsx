"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
const CTAButton = () => {
  const [showTooltip, setShowToolTip] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          setShowToolTip(!showTooltip);
        }}
        onBlur={() => {
          setShowToolTip(false);
        }}
        type="button"
        className="
              px-4
              py-2
              bg-foreground
              text-background
              tracking-wider
              cursor-pointer
              transition-transform
              duration-200
              hover:scale-105
              active:scale-95
              rounded-3xl
              font-mono
              text-lg
            "
      >
        Let's Talk
      </button>

      <div
        className={`absolute -top-14 left-1/2 -translate-x-1/2 z-50
                opacity-0 translate-y-2 scale-90
                ${showTooltip && "opacity-100 translate-y-0 scale-100"}
                transition-all duration-200 ease-out flex flex-col items-center`}
      >
        <div
          className="rounded-full bg-background dark:bg-foreground px-3 py-2 font-semibold tracking-wider 
                text-foreground text-base shadow-lg  backdrop-blur-md whitespace-nowrap font-mono"
        >
          <div className="flex gap-4 items-center  text-2xl">
            <Link
              href={"https://x.com/sakthi_ld"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#000000] hover:scale-110 transition-transform duration-200 ease-out "
            >
              <BsTwitterX />
            </Link>
            <Link
              href={"https://wa.me/917338870791"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:scale-110 transition-transform duration-200 ease-out"
            >
              <SiWhatsapp />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/sakthivel-2022-webdev/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A66C2] hover:scale-110 transition-transform duration-200 ease-out"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
        <div className="-mt-1 h-2 w-2 rotate-45 bg-background dark:bg-foreground" />
      </div>
    </div>
  );
};

export default CTAButton;
