"use client";

import { motion } from "framer-motion";
import { SectionWrapper, sectionItemVariants } from "./section-wrapper";

/** Placeholder labels for "Trusted by" / partners - replace with real logos later */
const PLACEHOLDERS = [
  "Santa Rosa Open Data",
  "ArcGIS",
  "Community",
  "California",
  "Open Data",
  "Civic Tech",
];

export function LogoCloud() {
  return (
    <SectionWrapper className="py-16 bg-gray-50/80 dark:bg-neutral-900/50">
      <motion.p
        variants={sectionItemVariants}
        className="text-label text-center text-blue-600/80 dark:text-blue-400/80 mb-8"
      >
        Powered by official data
      </motion.p>
      <motion.div
        variants={sectionItemVariants}
        className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 max-w-4xl mx-auto px-4"
      >
        {PLACEHOLDERS.map((label) => (
          <span
            key={label}
            className="text-body-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {label}
          </span>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
