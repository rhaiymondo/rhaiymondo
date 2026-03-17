"use client";

import { BlurFade } from "@/components/ui/blur-fade";

const PROJECT_URLS = [
  "https://wetransfer.com",
  "https://blog.wetransfer.com",
  "https://thesupportingact.org",
  "https://wetransfer.com/ideas",
  "https://wetransfer.com",
  "https://wetransfer.com",
];

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Hero() {
  const handleRandomSite = () => {
    window.open(pickRandom(PROJECT_URLS), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-[#f5f5f0] px-6">
      <div className="relative flex flex-col items-center text-center" style={{ zIndex: 20 }}>
        <BlurFade delay={0.1} duration={0.6}>
          <h1
            className="mb-8 text-6xl font-extrabold text-black md:text-8xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {"Hi "}
            <span
              className="inline-block"
              style={{
                animation: "wave 1.5s ease-in-out infinite",
                animationDelay: "0.5s",
                transformOrigin: "70% 70%",
              }}
            >
              ✌️
            </span>
            {", I'm Angelo."}
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} duration={0.5}>
          <p className="mb-10 max-w-xl text-lg text-black/60 leading-relaxed">
            {"I'm a 33-year-old developer living a cozy life in the Netherlands. With a passion for creating dynamic and visually appealing user experiences, I specialize in React, Next.js, and Typescript."}
          </p>
        </BlurFade>

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

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-20deg); }
          40% { transform: rotate(12deg); }
          60% { transform: rotate(-15deg); }
          80% { transform: rotate(10deg); }
        }
      `}</style>
    </section>
  );
}
