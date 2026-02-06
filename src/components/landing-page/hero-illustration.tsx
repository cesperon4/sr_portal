"use client";

import { motion } from "framer-motion";

const BUBBLES = [
  { size: 24, x: "18%", y: "22%", delay: 0, duration: 4 },
  { size: 16, x: "78%", y: "28%", delay: 0.5, duration: 5 },
  { size: 20, x: "82%", y: "55%", delay: 1, duration: 4.5 },
  { size: 14, x: "22%", y: "62%", delay: 0.3, duration: 5.5 },
  { size: 18, x: "75%", y: "68%", delay: 0.8, duration: 4 },
  { size: 12, x: "25%", y: "35%", delay: 0.2, duration: 5 },
];

const CARDS = [
  { id: "map", label: "Map", sublabel: "Explore incidents", y: "12%", color: "from-blue-400/90 to-cyan-400/90" },
  { id: "community", label: "Community", sublabel: "Discussion & posts", y: "36%", color: "from-violet-400/90 to-purple-400/90" },
  { id: "insights", label: "Insights", sublabel: "Charts & trends", y: "58%", color: "from-amber-400/90 to-orange-400/90" },
];

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[1.4] min-h-[320px] sm:min-h-[380px]">
      {/* Subtle gradient backdrop for illustration */}
      <div
        className="absolute inset-0 rounded-2xl opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 55% 45%, rgba(147,197,253,0.15), transparent 50%), radial-gradient(ellipse 60% 50% at 30% 50%, rgba(196,181,253,0.08), transparent 45%)",
        }}
      />

      {/* Floating bubbles */}
      {BUBBLES.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-blue-300/40 to-violet-400/30 dark:from-blue-400/30 dark:to-violet-500/20 backdrop-blur-sm border border-white/30"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
          }}
          animate={{
            y: [0, -12, 0],
            x: [0, 4, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Connector lines behind cards: end at card edges so they don't overlap */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(147, 197, 253)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <g stroke="url(#lineGrad)" strokeWidth="0.65" strokeDasharray="2.5 2.5" strokeLinecap="round" fill="none">
          <motion.path d="M 50 50 L 28 46" initial={{ pathLength: 0, opacity: 0.5 }} animate={{ pathLength: 1, opacity: 0.8, strokeDashoffset: [0, -15] }} transition={{ pathLength: { duration: 1, delay: 0.3 }, opacity: { duration: 1, delay: 0.3 }, strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" } }} />
          <motion.path d="M 50 50 L 68 16" initial={{ pathLength: 0, opacity: 0.5 }} animate={{ pathLength: 1, opacity: 0.8, strokeDashoffset: [0, -15] }} transition={{ pathLength: { duration: 1, delay: 0.4 }, opacity: { duration: 1, delay: 0.4 }, strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" } }} />
          <motion.path d="M 50 50 L 68 38" initial={{ pathLength: 0, opacity: 0.5 }} animate={{ pathLength: 1, opacity: 0.8, strokeDashoffset: [0, -15] }} transition={{ pathLength: { duration: 1, delay: 0.5 }, opacity: { duration: 1, delay: 0.5 }, strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" } }} />
          <motion.path d="M 50 50 L 68 60" initial={{ pathLength: 0, opacity: 0.5 }} animate={{ pathLength: 1, opacity: 0.8, strokeDashoffset: [0, -15] }} transition={{ pathLength: { duration: 1, delay: 0.6 }, opacity: { duration: 1, delay: 0.6 }, strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" } }} />
          <motion.path d="M 50 50 L 50 76" initial={{ pathLength: 0, opacity: 0.5 }} animate={{ pathLength: 1, opacity: 0.8, strokeDashoffset: [0, -15] }} transition={{ pathLength: { duration: 1, delay: 0.7 }, opacity: { duration: 1, delay: 0.7 }, strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" } }} />
        </g>
      </svg>

      {/* Left: "Explore data" query-style card */}
      <motion.div
        className="absolute left-[4%] top-[38%] w-[36%] max-w-[200px] rounded-2xl border-2 border-blue-200/80 dark:border-blue-800/60 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm p-4 shadow-lg shadow-blue-100/50 dark:shadow-blue-950/30 z-[2]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded-full bg-gradient-to-r from-blue-400 to-violet-400 px-2.5 py-0.5 text-xs font-semibold text-white">
            SR Portal
          </span>
        </div>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
          Explore local data
        </p>
        <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <li className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-blue-500" />
            Map & incidents
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-blue-500" />
            Community feed
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-blue-500" />
            Insights & logs
          </li>
        </ul>
      </motion.div>

      {/* Central cartoon robot character */}
      <motion.div
        className="absolute left-[44%] top-[42%] w-[22%] aspect-square max-w-[140px] -translate-x-1/2 -translate-y-1/2 z-[2]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-lg"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="robotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" />
              <stop offset="50%" stopColor="rgb(99, 102, 241)" />
              <stop offset="100%" stopColor="rgb(139, 92, 246)" />
            </linearGradient>
            <filter id="robotShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.25" />
            </filter>
          </defs>
          {/* Robot body (rounded box) */}
          <rect x="22" y="48" width="76" height="52" rx="12" ry="12" fill="url(#robotGrad)" filter="url(#robotShadow)" />
          <rect x="22" y="48" width="76" height="52" rx="12" ry="12" fill="url(#robotGrad)" opacity="0.95" />
          {/* Body panel line */}
          <rect x="42" y="58" width="36" height="2" rx="1" fill="rgba(255,255,255,0.25)" />
          {/* Bolts on body */}
          <circle cx="28" cy="58" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="92" cy="58" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="28" cy="90" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="92" cy="90" r="3" fill="rgba(255,255,255,0.4)" />

          {/* Robot head (rounded box) */}
          <rect x="28" y="14" width="64" height="38" rx="10" ry="10" fill="url(#robotGrad)" />
          <rect x="28" y="14" width="64" height="38" rx="10" ry="10" fill="url(#robotGrad)" opacity="0.95" />
          {/* Head bolts */}
          <circle cx="34" cy="22" r="2.5" fill="rgba(255,255,255,0.5)" />
          <circle cx="86" cy="22" r="2.5" fill="rgba(255,255,255,0.5)" />

          {/* Visor eyes (rectangular with scan line) */}
          <rect x="38" y="22" width="18" height="14" rx="4" fill="rgb(30, 58, 138)" />
          <rect x="64" y="22" width="18" height="14" rx="4" fill="rgb(30, 58, 138)" />
          <motion.rect
            x="40" y="26" width="14" height="2" rx="1"
            fill="rgb(147, 197, 253)"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect
            x="66" y="26" width="14" height="2" rx="1"
            fill="rgb(147, 197, 253)"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          {/* Small lens highlight */}
          <circle cx="44" cy="29" r="1.5" fill="rgba(255,255,255,0.6)" />
          <circle cx="72" cy="29" r="1.5" fill="rgba(255,255,255,0.6)" />

          {/* Speaker grille mouth */}
          <rect x="44" y="72" width="4" height="3" rx="1" fill="rgba(255,255,255,0.7)" />
          <rect x="52" y="72" width="4" height="3" rx="1" fill="rgba(255,255,255,0.7)" />
          <rect x="60" y="72" width="4" height="3" rx="1" fill="rgba(255,255,255,0.7)" />
          <rect x="68" y="72" width="4" height="3" rx="1" fill="rgba(255,255,255,0.7)" />
          <rect x="76" y="72" width="4" height="3" rx="1" fill="rgba(255,255,255,0.7)" />

          {/* Antennae (robot style) */}
          <path d="M 48 14 L 48 4" fill="none" stroke="rgb(147, 197, 253)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 72 14 L 72 4" fill="none" stroke="rgb(147, 197, 253)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="48" cy="4" r="4" fill="rgb(147, 197, 253)" />
          <circle cx="72" cy="4" r="4" fill="rgb(147, 197, 253)" />
          <motion.circle
            cx="48" cy="4" r="2"
            fill="white"
            animate={{ opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="72" cy="4" r="2"
            fill="white"
            animate={{ opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Simple arms (rounded bars) */}
          <rect x="14" y="62" width="12" height="6" rx="3" fill="url(#robotGrad)" opacity="0.9" />
          <rect x="94" y="62" width="12" height="6" rx="3" fill="url(#robotGrad)" opacity="0.9" />
        </motion.svg>
      </motion.div>

      {/* Right: Product cards stack — spaced so Insights doesn't overlap Data & Search */}
      {CARDS.map((card, i) => (
        <motion.div
          key={card.id}
          className="absolute right-0 w-[40%] max-w-[160px] rounded-xl border-2 border-white/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-3 shadow-xl hero-card-glow z-[2]"
          style={{
            top: card.y,
            right: "4%",
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
        >
          <div className={`inline-block rounded-lg bg-gradient-to-r ${card.color} px-2 py-0.5 text-xs font-semibold text-white mb-1.5`}>
            {card.label}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{card.sublabel}</p>
        </motion.div>
      ))}

      {/* Bottom: "Data & Search" card — clear gap below Insights */}
      <motion.div
        className="absolute bottom-[6%] left-1/2 -translate-x-1/2 rounded-xl border-2 border-blue-200/80 dark:border-blue-800/60 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm px-4 py-2.5 shadow-lg flex items-center gap-2 hero-card-glow z-[2]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Data & Search</span>
        <span className="text-gray-400 dark:text-gray-500 text-xs">Open data · Filters</span>
      </motion.div>
    </div>
  );
}
