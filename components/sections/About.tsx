"use client";

import { TextReveal } from "@/components/ui/text-reveal";

export default function About() {
  return (
    <section id="about" className="bg-[#0a0a0a]">
      <TextReveal>
        {"Angelo is a senior Next.js engineer at Bol.com, building data-driven dashboards. rhaymondo.com is where his real projects live. rhaiymondo.com is what they became."}
      </TextReveal>
      <div className="max-w-3xl mx-auto px-8 pb-32 flex justify-center">
        <a
          href="https://rhaymondo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 text-lg underline-offset-4 hover:underline hover:text-white/60 transition-colors"
        >
          Visit rhaymondo.com ↗
        </a>
      </div>
    </section>
  );
}
