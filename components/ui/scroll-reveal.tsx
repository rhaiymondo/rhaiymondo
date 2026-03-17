"use client";

import { useRef } from "react";
import { motion, useScroll, useInView, useReducedMotion } from "motion/react";

const GRADIENT = "90deg, #99ceff, #ff99cc, #99ffcc, #ffcc99, #99ceff";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: `linear-gradient(${GRADIENT})`,
      }}
    />
  );
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reducedMotion = useReducedMotion();
  const x = reducedMotion ? 0 : direction === "left" ? -28 : direction === "right" ? 28 : 0;
  const y = reducedMotion ? 0 : direction === "up" ? 20 : 0;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
