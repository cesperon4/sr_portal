"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SectionWrapper, sectionItemVariants } from "./section-wrapper";

export function CtaSection() {
  const router = useRouter();

  return (
    <SectionWrapper className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-neutral-950">
      {/* Subtle blue accent band (Glean-style) */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white dark:from-blue-950/30 dark:via-neutral-950 dark:to-neutral-950" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent" />

      <motion.div
        variants={sectionItemVariants}
        className="relative max-w-3xl mx-auto text-center"
      >
        <h2 className="text-display text-center mb-4">
          Built for your community
        </h2>
        <p className="text-body text-center mb-10 max-w-xl mx-auto">
          Join your neighbors. Stay informed with maps, trends, and discussions—backed by official Santa Rosa data.
        </p>
        <motion.div
          variants={sectionItemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => router.push("/login")}
            className="text-sm sm:text-base px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Get started
          </button>
          <button
            onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm sm:text-base px-8 py-3.5 rounded-xl bg-white dark:bg-neutral-800 border-2 border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 font-semibold hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
          >
            Learn more
          </button>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
