"use client";

import { motion } from "motion/react";
import { fadeRise, stagger, viewportOnce } from "@/lib/motion";

/** Scroll-triggered entrance that plays once. */
export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={fadeRise}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({ children, className, gap = 0.07 }: { children: React.ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div className={className} variants={stagger(gap)} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeRise}>
      {children}
    </motion.div>
  );
}
