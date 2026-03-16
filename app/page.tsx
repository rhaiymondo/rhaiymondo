"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";

const GRADIENT_BG = `radial-gradient(at 72% 60%, hsla(185,69%,76%,1) 0px, transparent 50%),
  radial-gradient(at 37% 2%, hsla(333,88%,79%,1) 0px, transparent 50%),
  radial-gradient(at 3% 34%, hsla(70,74%,71%,1) 0px, transparent 50%),
  radial-gradient(at 72% 56%, hsla(128,77%,61%,1) 0px, transparent 50%),
  radial-gradient(at 24% 47%, hsla(354,87%,66%,1) 0px, transparent 50%),
  radial-gradient(at 81% 13%, hsla(100,72%,76%,1) 0px, transparent 50%),
  radial-gradient(at 50% 22%, hsla(103,75%,61%,1) 0px, transparent 50%),
  radial-gradient(at 60% 80%, hsla(220,95%,65%,1) 0px, transparent 50%),
  radial-gradient(at 10% 70%, hsla(210,90%,60%,1) 0px, transparent 50%)`;

const GRADIENT_TEXT_STYLE = {
  backgroundImage: GRADIENT_BG,
  backgroundColor: "#99ceff",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

const GRADIENT_BTN_STYLE = {
  backgroundImage: GRADIENT_BG,
  backgroundColor: "#99ceff",
};

export default function SplashPage() {
  const [active, setActive] = useState<"left" | "right" | null>(null);
  const [topPanel, setTopPanel] = useState<"left" | "right">("left");
  const [countdown, setCountdown] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();

  const startCountdown = useCallback((side: "left" | "right") => {
    setCountdown(3);
    let count = 3;
    countdownTimer.current = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(countdownTimer.current!);
        setCountdown(null);
        if (side === "left") {
          window.location.href = "https://rhaymondo.com";
        } else {
          router.push("/home");
        }
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [router]);

  const stopCountdown = useCallback(() => {
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    setCountdown(null);
  }, []);

  const handleEnter = (side: "left" | "right") => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(side);
    setTopPanel(side);
    startCountdown(side);
  };

  const handleLeave = () => {
    setActive(null);
    stopCountdown();
    leaveTimer.current = setTimeout(() => {
      setTopPanel((prev) => prev);
    }, 600);
  };

  const leftW = active === "left" ? "90vw" : "50vw";
  const rightW = active === "right" ? "90vw" : "50vw";

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ isolation: "isolate" }}>

      {/* LEFT PANEL */}
      <div
        onMouseEnter={() => handleEnter("left")}
        onMouseLeave={handleLeave}
        style={{
          width: leftW,
          minWidth: "50vw",
          transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          position: "absolute",
          top: 0, left: 0, height: "100%",
          zIndex: topPanel === "left" ? 10 : 1,
        }}
        className="relative bg-white overflow-hidden"
      >

        <div
          className="flex flex-col items-center justify-center gap-5 w-full text-center"
          style={{ position: "absolute", left: 0, width: active === "left" ? "100vw" : "50vw", top: "calc(50% + 60px)", transform: "translateY(-50%)", transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <BlurFade delay={0.25}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", margin: "0 auto" }}>
              <Image src="/angelo-human.jpg" alt="Rhaymondo" width={120} height={120} className="object-cover w-full h-full" style={{ objectPosition: "center 15%", transform: "scale(1.4)", transformOrigin: "center 15%" }} />
            </div>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p className="text-2xl md:text-3xl font-bold text-black">Rhaymondo</p>
          </BlurFade>
          {active === "left" && (
            <p
              key={active}
              className="text-lg font-semibold text-black/60"
              style={{ animation: "fadeUp 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards", opacity: 0 }}
            >
              {countdown !== null ? `Visiting in ${countdown}` : ""}
            </p>
          )}
          <BlurFade delay={0.4}>
            <p className="text-sm text-black/30">The human behind it.</p>
          </BlurFade>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        onMouseEnter={() => handleEnter("right")}
        onMouseLeave={handleLeave}
        style={{
          width: rightW,
          minWidth: "50vw",
          transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          position: "absolute",
          top: 0, right: 0, height: "100%",
          zIndex: topPanel === "right" ? 10 : 1,
        }}
        className="relative bg-[#0a0a0a] overflow-hidden"
      >

        <div
          className="flex flex-col items-center justify-center gap-5 w-full text-center"
          style={{ position: "absolute", right: 0, width: active === "right" ? "100vw" : "50vw", top: "calc(50% + 60px)", transform: "translateY(-50%)", transition: "width 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <BlurFade delay={0.2}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", margin: "0 auto" }}>
              <Image src="/angelo.jpg" alt="Rhaiymondo" width={120} height={120} className="object-cover w-full h-full" style={{ transform: "scale(1.1)", transformOrigin: "center center" }} />
            </div>
          </BlurFade>
          <BlurFade delay={0.25}>
            <p className="text-2xl md:text-3xl font-bold text-white">
              Rh<span style={GRADIENT_TEXT_STYLE}>ai</span>ymondo
            </p>
          </BlurFade>
          {active === "right" && (
            <p
              key={active}
              className="text-lg font-semibold text-white/60"
              style={{ animation: "fadeUp 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards", opacity: 0 }}
            >
              {countdown !== null ? `Visiting in ${countdown}` : ""}
            </p>
          )}
          <BlurFade delay={0.45}>
            <p className="text-sm text-white/30">The AI built from his work.</p>
          </BlurFade>
        </div>
      </div>

      {/* VERTICAL LABELS — shown on the 10vw strip of the non-active panel */}
      <div
        className="absolute top-0 right-0 h-full w-[10vw] flex items-center justify-center pointer-events-none z-30"
        style={{ opacity: active === "left" ? 1 : 0, transition: "opacity 300ms ease" }}
      >
        <span
          className="text-sm font-bold tracking-widest uppercase text-white"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Visit the AI
        </span>
      </div>
      <div
        className="absolute top-0 left-0 h-full w-[10vw] flex items-center justify-center pointer-events-none z-30"
        style={{ opacity: active === "right" ? 1 : 0, transition: "opacity 300ms ease" }}
      >
        <span
          className="text-sm font-bold tracking-widest uppercase text-black"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Visit the Human
        </span>
      </div>

      {/* HEADLINE — centered by default, moves to top on hover */}
      <div
        className="absolute inset-x-0 pointer-events-none z-20 flex flex-col items-center text-center gap-4 px-8"
        style={{
          mixBlendMode: "difference",
          top: "2rem",
        }}
      >
        <BlurFade delay={0.1}>
          <p className="text-xs tracking-widest uppercase font-semibold text-white">
            You&#39;ve reached a crossroads.
          </p>
        </BlurFade>
        <BlurFade delay={0.2}>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-xl text-white">
            Are you looking for the human or the AI?
          </h1>
        </BlurFade>
      </div>

      {/* BOTTOM CAPTION */}
      <div
        className="absolute inset-x-0 bottom-8 pointer-events-none z-20 flex justify-center"
        style={{ mixBlendMode: "difference" }}
      >
        <BlurFade delay={0.5}>
          <span className="text-sm font-medium text-white opacity-60">
            Same mind. Different form.
          </span>
        </BlurFade>
      </div>

    </div>
  );
}
