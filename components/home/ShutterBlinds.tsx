// components/ShutterBlinds.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";

const BLIND_COUNT = 8;

const ShutterBlinds = ({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={trigger}>
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          {[...Array(BLIND_COUNT)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-foreground h-full"
              style={{
                width: `${100 / BLIND_COUNT}%`,
                transformOrigin: "top",
              }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </div>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ShutterBlinds;
