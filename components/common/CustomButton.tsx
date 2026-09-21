"use client";
import Link from "next/link";
import React from "react";

const CustomButton = (props: {
  label: string;
  onBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  target?: string;
  disabled?:boolean
}) => {
  const {label,href,target,onBtnClick,disabled} = props
  const className = `transform-3d px-4 py-2 text-[#ffffff] ${disabled ? "bg-[#0a0a0a]/50 cursor-not-allowed" : "cursor-pointer bg-[#0a0a0a]"}   hover:scale-105 rounded-3xl 0 inline-flex items-center gap-2  active:-translate-z-3 transition-all duration-200 text-sm inset-shadow-white/60 inset-shadow-sm  `;
  return (
    <div className=" perspective-midrange">
      {href ? (
        <Link href={href} target={target} className={className}>
          {label}
        </Link>
      ) : (
        <button className={className} onClick={onBtnClick} disabled={disabled}>
          {label}
        </button>
      )}
    </div>
  );
};

export default CustomButton;
