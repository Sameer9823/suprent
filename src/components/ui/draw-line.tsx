"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** A hairline that draws itself once when scrolled into view. Used for the "how it works" path. */
export function DrawLine({ axis = "x", className }: { axis?: "x" | "y"; className?: string }) {
  const hidden = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const shown = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };
  return (
    <motion.div
      aria-hidden
      className={cn(axis === "x" ? "origin-left" : "origin-top", className)}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    />
  );
}
