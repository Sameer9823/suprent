"use client";

import { motion } from "motion/react";

/** Two slow, soft light patches behind dark call-to-action panels. Ambient only; frozen under reduced motion. */
export function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-24 -top-24 size-96 rounded-full bg-emerald-400/20 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 right-0 size-[28rem] rounded-full bg-lime-300/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
