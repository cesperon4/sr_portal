"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const defaultVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  /** Delay before animation starts when in view (seconds) */
  delay?: number;
  /** Stagger delay for children (seconds). If set, children should be motion.div with custom. */
  staggerChildren?: number;
}

export function SectionWrapper({
  children,
  className = "",
  delay = 0,
  staggerChildren,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: staggerChildren
          ? {
              transition: {
                staggerChildren: staggerChildren ?? 0.1,
                delayChildren: delay,
              },
            }
          : {
              transition: {
                delay: delay,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
              },
            },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Single element that fades and slides up when a parent SectionWrapper is in view */
export const sectionItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};
