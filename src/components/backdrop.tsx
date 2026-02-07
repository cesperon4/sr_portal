"use client";

import { motion } from "framer-motion";
import * as React from "react";

interface BackdropProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Backdrop({ children, onClick }: BackdropProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
