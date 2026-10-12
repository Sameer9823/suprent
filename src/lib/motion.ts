import type { Variants } from "motion/react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Shared entrance variants. Short, small offsets so content is never kept waiting. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease } },
};

export const stagger = (gap = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const viewportOnce = { once: true, margin: "-60px" } as const;
