"use client";

import { motion } from "framer-motion";
import { SectionWrapper, sectionItemVariants } from "./section-wrapper";

/** Placeholder stats — replace with real data or remove. */
const STATS = [
  { value: "Open", label: "Data source" },
  { value: "100%", label: "Community‑focused" },
  { value: "Free", label: "To explore" },
];

export function StatsBar() {
  return (
    <SectionWrapper className="py-12 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900/50">
      <motion.div
        variants={sectionItemVariants}
        className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-12 sm:gap-16"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-heading text-blue-600 dark:text-blue-400">
              {stat.value}
            </div>
            <div className="text-caption mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
