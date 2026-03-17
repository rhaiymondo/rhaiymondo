"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const statements = [
  { num: "01", text: "Good code reads like good prose. Write for the next developer." },
  { num: "02", text: "Performance is a feature. Seconds cost users." },
  { num: "03", text: "Design and engineering are the same discipline." },
  { num: "04", text: "Ship it. Iterate. Don't wait for perfect." },
];

function ApproachRow({ num, text, index }: { num: string; text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-8 border-t border-black/10 py-8 group cursor-default"
      initial={{ opacity: 0, x: reducedMotion ? 0 : -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-sm font-normal text-black/20 min-w-[3rem] transition-colors duration-200 group-hover:text-black/50">
        {num}
      </span>
      <p className="text-2xl md:text-3xl font-semibold text-black flex-1 transition-transform duration-200 group-hover:translate-x-1.5">
        {text}
      </p>
    </motion.div>
  );
}

export default function Approach() {
  return (
    <section id="approach" className="bg-white py-32">
      <div className="max-w-5xl mx-auto px-8">
        <ScrollReveal>
          <p className="text-xs tracking-widest uppercase text-black/40 mb-16">/ How I think</p>
        </ScrollReveal>
        <div>
          {statements.map(({ num, text }, i) => (
            <ApproachRow key={num} num={num} text={text} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
