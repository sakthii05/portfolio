import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa6";
import ToolTip from "../common/ToolTip";
import CTAButton from "../common/CTAButton";

const FrontLayerContent = () => {
  return (
    <div
      className="
          relative
          z-10
          max-w-350
          w-full
          h-full
          pointer-events-none
          text-foreground
        "
    >
      <div className="absolute h-40 w-full  bg-linear-to-t from-background to-transparent bottom-0 "></div>
      <div className="hidden md:block absolute h-full w-60  bg-linear-to-r from-background  to-transparent -left-1 "></div>
      <div className="hidden md:block absolute h-full w-60  bg-linear-to-l from-background to-transparent -right-1  "></div>
      <div className="absolute pt-15 md:pt-20 md:px-20 px-5 space-y-4">
        <h2 className=" text-4xl font-semibold font-mono ">
          Frontend Developer
        </h2>
        <p className="w-[90%] md:w-[50%] md:text-lg text-base text-muted-foreground">
          Hey, I'm{" "}
          <span className="font-mono fonr-bold text-foreground tracking-wide">
            Sakthivel
          </span>
          .I design and build interfaces where creativity meets serious frontend
          engineering. From pixel-level details to AI-powered workflows, I care
          about how it looks, feels, and works.
        </p>
        <div className="pointer-events-auto flex space-x-4 items-center">
          <CTAButton/>
          <div className="relative group">
            <Link
              href={"https://github.com/sakthii05"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground
              tracking-wider
              cursor-pointer
              transition-transform
              duration-200
              hover:scale-120
              active:scale-100
              text-4xl
            "
            >
              <FaGithub />
            </Link>
            <ToolTip>Github</ToolTip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontLayerContent;
