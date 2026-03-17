"use client";
import { TextReveal } from "@/components/ui/text-reveal";

export default function About() {
  return (
    <section id="about" className="bg-[#f5f5f0]">
      <TextReveal>
        {"I'm a 33-year-old developer living a cozy life in the Netherlands. With a passion for creating dynamic and visually appealing user experiences, I specialize in React, Next.js, and Typescript. rhaymondo.com is where my projects live."}
      </TextReveal>
    </section>
  );
}
