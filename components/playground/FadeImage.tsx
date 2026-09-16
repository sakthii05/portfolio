"use client";

import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionImage = motion.create(Image);

export function FadeImage({ onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <MotionImage
      {...(props as any)}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}

