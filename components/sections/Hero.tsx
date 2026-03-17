"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";

const TICKER = [
  "WeTransfer is acquired by Bending Spoons",
  "Code is like humor. When you have to explain it, it's bad.",
  "This year I visited Dubai, South Africa, Turkey, and Namibia",
  "Lodi is spelled backwards Idol",
];

const PROJECT_URLS = [
  "https://wetransfer.com",
  "https://blog.wetransfer.com",
  "https://thesupportingact.org",
  "https://wetransfer.com/ideas",
  "https://wetransfer.com",
];

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Hero() {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [wordHovered, setWordHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleRandomSite = () => {
    window.open(pickRandom(PROJECT_URLS), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#f5f5f0] px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following circle — only on hover of "Rhaymondo" */}
      {cursor && (
        <div
          className="pointer-events-none absolute"
          style={{
            left: cursor.x,
            top: cursor.y,
            width: 200,
            height: 200,
            borderRadius: "50%",
            overflow: "hidden",
            opacity: wordHovered ? 1 : 0,
            transform: `translate(-50%, -50%) translateY(${wordHovered ? "0px" : "24px"}) scale(${wordHovered ? 1 : 0.85})`,
            transition: "opacity 400ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 50,
          }}
        >
          <Image
            src="/angelo-human.jpg"
            alt=""
            fill
            className="object-cover w-full h-full"
            style={{ objectPosition: "center 15%", transform: "scale(1.4)", transformOrigin: "center 15%" }}
            priority
          />
        </div>
      )}

      {/* Centered content */}
      <div className="relative flex flex-col items-center text-center" style={{ zIndex: 20 }}>
        {/* Eyebrow */}
        <BlurFade delay={0} duration={0.5}>
          <p className="mb-6 text-sm text-black/40">
            Developer · React · Next.js · TypeScript
          </p>
        </BlurFade>

        {/* H1 */}
        <BlurFade delay={0.1} duration={0.6}>
          <h1
            className="mb-6 text-6xl font-extrabold text-black md:text-8xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Hi <span className="wave-emoji">✌️</span>, I am
            <br />
            <span
              className="cursor-default inline-block"
              onMouseEnter={() => setWordHovered(true)}
              onMouseLeave={() => setWordHovered(false)}
            >
              Rhaymondo.
            </span>
          </h1>
        </BlurFade>

        {/* Subline */}
        <BlurFade delay={0.2} duration={0.5}>
          <p className="mb-10 max-w-xl text-lg text-black/60 leading-relaxed">
            I&apos;m a 33-year-old developer living a cozy life in the Netherlands. With a passion for creating dynamic and visually appealing user experiences, I specialize in React, Next.js, and Typescript.
          </p>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.3} duration={0.5}>
          <button
            type="button"
            onClick={handleRandomSite}
            className="h-12 rounded-xl bg-black px-8 text-sm font-semibold text-white hover:bg-black/80 transition-colors"
          >
            Visit a random site →
          </button>
        </BlurFade>
      </div>
      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full py-4 border-t border-b border-black/10">
        <Marquee className="[--duration:40s] [--gap:3rem]" repeat={4}>
          {TICKER.map((item, i) => (
            <span key={i} className="text-xs font-medium text-black/50 mx-4">
              {item} <span className="mx-3 text-black/20">·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
