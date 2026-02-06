"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/landing-page/useLogin";
import { HeroIllustration } from "./hero-illustration";

const HERO_TABS = [
  { id: "map", label: "Map", description: "Explore incidents" },
  { id: "community", label: "Community", description: "Discussion & posts" },
  { id: "insights", label: "Insights", description: "Charts & trends" },
];

export function HeroSection() {
  const router = useRouter();
  const { handleGuestLogin } = useLogin();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-20 bg-white dark:bg-neutral-950"
    >
      {/* Subtle gradient: white with a hint of blue (Glean-style accent) */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white dark:from-blue-950/20 dark:via-neutral-950 dark:to-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* Left: headline, subtext, tabs, CTAs */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left flex-1 lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-label inline-flex items-center gap-2 rounded-full bg-gray-100/90 dark:bg-neutral-800/80 border border-gray-200/80 dark:border-neutral-700 px-4 py-1.5 text-gray-600 dark:text-gray-400 mb-6 normal-case tracking-wide"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500/80 dark:bg-blue-400/90" />
              </span>
              Santa Rosa open data · Community‑powered
            </motion.div>

            <motion.h1
              className="text-display mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Unlock{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600 dark:text-blue-400">
                  meaningful data
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-100 dark:bg-blue-900/40 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ originX: 0 }}
                />
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">insights that matter</span>
            </motion.h1>

            <motion.p
              className="text-body mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              See what’s happening in your neighborhood. Maps, trends, and community discussions—all in one place.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {HERO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className="text-body-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200"
                  aria-label={tab.label}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={handleGuestLogin}
                className="text-sm sm:text-base px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
              >
                Explore as guest
              </button>
              <button
                onClick={() => router.push("/login")}
                className="text-sm sm:text-base px-8 py-3.5 rounded-xl bg-white dark:bg-neutral-800 border-2 border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 font-semibold hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 w-full sm:w-auto"
              >
                Sign up
              </button>
            </motion.div>
          </div>

          {/* Right: hero illustration — equal spacing from left block */}
          <motion.div
            className="flex-1 min-w-0 flex items-center justify-center"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-full max-w-[480px] p-[2px] rounded-2xl hero-image-border shadow-xl shadow-blue-200/20 dark:shadow-blue-950/30 bg-white/80 dark:bg-neutral-900/80">
              <div className="rounded-[14px] overflow-hidden bg-gradient-to-b from-blue-50/30 to-white dark:from-blue-950/20 dark:to-neutral-950">
                <HeroIllustration />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
