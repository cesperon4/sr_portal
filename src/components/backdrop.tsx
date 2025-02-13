"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface BackdropProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Backdrop({ children, onClick }: BackdropProps) {
  return (
    <motion.div
      className="backdrop top-0 left-0 w-full h-full bg-opaq-black flex items-center justify-center z-50 fixed"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
