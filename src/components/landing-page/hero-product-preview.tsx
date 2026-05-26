"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export type HeroPreviewId = "map" | "insights" | "data";

const PREVIEWS: Record<
  HeroPreviewId,
  { src: string; alt: string; label: string }
> = {
  map: {
    src: "/landing2.png",
    alt: "Interactive map with incident clusters across Santa Rosa",
    label: "Map",
  },
  insights: {
    src: "/landing1.png",
    alt: "Data insights dashboard with arrest analytics and charts",
    label: "Insights",
  },
  data: {
    src: "/landing3.png",
    alt: "Searchable arrest logs table with filters and pagination",
    label: "Arrest logs",
  },
};

type HeroProductPreviewProps = {
  activeId: HeroPreviewId;
};

export function HeroProductPreview({ activeId }: HeroProductPreviewProps) {
  const preview = PREVIEWS[activeId];

  return (
    <div className="relative w-full aspect-[16/10] min-h-[240px] sm:min-h-[320px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={preview.src}
            alt={preview.alt}
            fill
            unoptimized
            priority={activeId === "map"}
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-gray-200/80 dark:border-neutral-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 shadow-sm">
        {preview.label}
      </div>
    </div>
  );
}

export const HERO_PREVIEW_TABS: {
  id: HeroPreviewId;
  label: string;
  description: string;
}[] = [
  { id: "map", label: "Map", description: "Explore incidents" },
  { id: "insights", label: "Insights", description: "Charts & trends" },
  { id: "data", label: "Arrest logs", description: "Search & filter" },
];
