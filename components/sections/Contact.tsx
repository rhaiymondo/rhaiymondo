"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#f5f5f0] py-32">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6" style={{ letterSpacing: "-0.03em" }}>
            {"Let's work together."}
          </h2>
          <p className="text-black/50 text-lg mb-12 leading-relaxed">
            Available for consulting, collaboration, and interesting problems.
          </p>
        </ScrollReveal>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ScrollReveal direction="left" delay={0.1}>
            <a href="mailto:angelo@rhaymondo.nl" className="inline-block px-10 py-4 rounded-xl bg-black text-white font-semibold text-base hover:bg-black/80 transition-colors">
              angelo@rhaymondo.nl
            </a>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <a href="https://linkedin.com/in/angelo-oliviero" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 rounded-xl border border-black/20 text-black font-semibold text-base hover:border-black/60 transition-colors">
              LinkedIn ↗
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
