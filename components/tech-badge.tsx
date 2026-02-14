"use client";

import { motion } from "framer-motion";

interface TechBadgeProps {
  name: string;
  delay?: number;
}

export function TechBadge({ name, delay = 0 }: TechBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.05 }}
      className="relative inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg 
                 bg-white/[0.03] border border-white/[0.06] text-silver-300
                 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300
                 overflow-hidden group cursor-default"
    >
      {/* Metal shine sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <span className="relative z-10">{name}</span>
    </motion.span>
  );
}
