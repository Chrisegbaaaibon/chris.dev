"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const baseStyles =
    "relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 overflow-hidden group";

  const variants = {
    primary:
      "bg-white text-deep hover:bg-off-white shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    secondary:
      "border border-white/10 text-white hover:border-white/20 hover:bg-white/[0.03]",
    ghost: "text-silver-400 hover:text-white",
  };

  const content = (
    <motion.span
      className={cn(baseStyles, variants[variant], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Shine sweep on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} type={type} disabled={disabled}>
      {content}
    </button>
  );
}

export function CTAButton({
  children,
  href,
  showArrow = true,
}: {
  children: React.ReactNode;
  href: string;
  showArrow?: boolean;
}) {
  return (
    <MagneticButton href={href} variant="primary">
      {children}
      {showArrow && (
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </MagneticButton>
  );
}
