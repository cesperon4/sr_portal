"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, LucideIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { SectionWrapper, sectionItemVariants } from "./section-wrapper";

type ImageFeature = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  className: string;
};

type IconFeature = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  className: string;
  gradient: string;
};

type Feature = ImageFeature | IconFeature;

const FEATURES: Feature[] = [
  {
    id: "map",
    title: "Interactive map",
    description:
      "See incidents and posts on a map. Filter by type and date to explore what’s happening near you.",
    image: "/landing2.png",
    imageAlt: "Interactive map with incident clusters",
    className: "md:col-span-2",
  },
  {
    id: "community",
    icon: MessageCircle,
    title: "Community feed",
    description:
      "Read and join discussions. Share context and stay in the loop with your neighborhood.",
    className: "md:col-span-1",
    gradient:
      "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20",
  },
  {
    id: "insights",
    title: "Insights & trends",
    description:
      "Charts and patterns in local activity. Spot trends quickly and understand the big picture.",
    image: "/landing1.png",
    imageAlt: "Data insights dashboard with charts",
    className: "md:col-span-1",
  },
  {
    id: "data",
    title: "Arrest logs & data",
    description:
      "Search and filter official logs in a table. Export and dig into the details that matter to you.",
    image: "/landing3.png",
    imageAlt: "Arrest logs table with search and filters",
    className: "md:col-span-2",
  },
];

function isImageFeature(feature: Feature): feature is ImageFeature {
  return "image" in feature;
}

export function FeaturesBento() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.h2
        variants={sectionItemVariants}
        className="text-heading text-center mb-4"
      >
        One place for local data
      </motion.h2>
      <motion.p
        variants={sectionItemVariants}
        className="text-body text-center max-w-2xl mx-auto mb-12"
      >
        Map, community, insights, and official records—all in one place for
        Santa Rosa.
      </motion.p>

      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
          },
        }}
      >
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.id}
            variants={sectionItemVariants}
            className={`group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 overflow-hidden hover:border-blue-200 dark:hover:border-blue-800/70 transition-all duration-300 hover:shadow-lg ${feature.className}`}
          >
            {isImageFeature(feature) ? (
              <>
                <div className="relative aspect-[16/10] w-full border-b border-gray-100 dark:border-neutral-800">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    unoptimized
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-subheading mb-2">{feature.title}</h3>
                  <p className="text-body-sm mb-4">{feature.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  aria-hidden
                />
                <div className="relative p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-4 border border-blue-100/80 dark:border-blue-900/50">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-subheading mb-2">{feature.title}</h3>
                  <p className="text-body-sm mb-4">{feature.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
