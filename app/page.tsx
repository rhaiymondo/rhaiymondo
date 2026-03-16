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
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const startCountdown = useCallback(
    (side: "left" | "right") => {
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
    },
    [router]
  );

  const stopCountdown = useCallback(() => {
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    setCountdown(null);
  }, []);

  const handleEnter = (side: "left" | "right") => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(side);
    startCountdown(side);
  };

  const handleLeave = () => {
    setActive(null);
    stopCountdown();
  };

  const handleMobileTap = (side: "left" | "right") => {
    if (side === "left") {
      window.location.href = "https://rhaymondo.com";
    } else {
      router.push("/home");
    }
  };

  // ── MOBILE LAYOUT ────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div
        className="relative h-screen w-screen overflow-hidden flex flex-col items-center"
        style={{ background: "#0a0a0a", isolation: "isolate" }}
      >
        {/* Headline */}
        <div
          className="pt-16 px-6 text-center z-20 pointer-events-none flex flex-col gap-3"
          style={{ mixBlendMode: "difference" }}
        >
          <BlurFade delay={0.1}>
            <p className="text-xs tracking-widest uppercase font-semibold text-white">
              You've reached a crossroads.
            </p>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 className="text-2xl font-bold tracking-tight leading-tight text-white">
              Are you looking for the human or the AI?
            </h1>
          </BlurFade>
        </div>

        {/* Stacked panels */}
        <div className="flex flex-col w-full mt-8 gap-3">
          {/* Top panel — white, Rhaymondo (human) */}
          <div
            className="bg-white w-full flex items-center justify-center cursor-pointer"
            style={{ height: "38vh" }}
            onClick={() => handleMobileTap("left")}
          >
            <div className="flex flex-col items-center gap-5 text-center">
              <BlurFade delay={0.25}>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                >
                  <Image
                    src="/angelo-human.jpg"
                    alt="Rhaymondo"
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                    style={{
                      objectPosition: "center 15%",
                      transform: "scale(1.4)",
                      transformOrigin: "center 15%",
                    }}
                  />
                </div>
              </BlurFade>
              <BlurFade delay={0.3}>
                <p className="text-2xl font-bold text-black">Rhaymondo</p>
              </BlurFade>
              <BlurFade delay={0.35}>
                <div className="inline-block px-10 py-4 rounded-xl text-lg font-semibold border-2 border-black text-black min-w-[160px] text-center">
                  Enter
                </div>
              </BlurFade>
              <BlurFade delay={0.4}>
                <p className="text-sm text-black/30">The human behind it.</p>
              </BlurFade>
            </div>
          </div>

          {/* Bottom panel — dark, Rhaiymondo (AI) */}
          <div
            className="bg-[#0a0a0a] w-full flex items-center justify-center cursor-pointer"
            style={{ height: "38vh" }}
            onClick={() => handleMobileTap("right")}
          >
            <div className="flex flex-col items-center gap-5 text-center">
              <BlurFade delay={0.2}>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                >
                  <Image
                    src="/angelo.jpg"
                    alt="Rhaiymondo"
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                    style={{ transform: "scale(1.1)", transformOrigin: "center center" }}
                  />
                </div>
              </BlurFade>
              <BlurFade delay={0.25}>
                <p className="text-2xl font-bold text-white">
                  Rh<span style={GRADIENT_TEXT_STYLE}>ai</span>ymondo
                </p>
              </BlurFade>
              <BlurFade delay={0.35}>
                <div className="inline-block p-[2px] rounded-xl" style={GRADIENT_BTN_STYLE}>
                  <span className="block px-10 py-4 rounded-[10px] bg-[#0a0a0a] text-lg font-semibold text-white min-w-[160px] text-center">
                    Enter
                  </span>
                </div>
              </BlurFade>
              <BlurFade delay={0.45}>
                <p className="text-sm text-white/30">The AI built from his work.</p>
              </BlurFade>
            </div>
          </div>
        </div>

        {/* Bottom caption */}
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

  // ── DESKTOP LAYOUT ───────────────────────────────────────────────────────────
  // Grid columns animate on hover: default 1fr 1fr, hover-left 9fr 1fr, hover-right 1fr 9fr
  const gridCols =
    active === "left" ? "9fr 1fr" : active === "right" ? "1fr 9fr" : "1fr 1fr";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: gridCols,
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        transition: "grid-template-columns 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        isolation: "isolate",
      }}
    >
      {/* ROW 1: Headline — spans both columns */}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "3rem 2rem",
          pointerEvents: "none",
          zIndex: 20,
          mixBlendMode: "difference",
        }}
      >
        <BlurFade delay={0.1}>
          <p className="text-xs tracking-widest uppercase font-semibold text-white mb-3">
            You've reached a crossroads.
          </p>
        </BlurFade>
        <BlurFade delay={0.2}>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-xl text-white">
            Are you looking for the human or the AI?
          </h1>
        </BlurFade>
      </div>

      {/* ROW 2, COL 1: Left panel — white, Rhaymondo (human) */}
      <div
        onMouseEnter={() => handleEnter("left")}
        onMouseLeave={handleLeave}
        className="bg-white cursor-pointer overflow-hidden"
        style={{
          gridRow: 2,
          gridColumn: 1,
          position: "relative",
        }}
      >
        {/* Main content — pinned to left half so it stays centered during expansion */}
        <div
          className="flex flex-col items-center gap-5 text-center"
          style={{
            width: "50vw",
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <BlurFade delay={0.25}>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto",
              }}
            >
              <Image
                src="/angelo-human.jpg"
                alt="Rhaymondo"
                width={120}
                height={120}
                className="object-cover w-full h-full"
                style={{
                  objectPosition: "center 15%",
                  transform: "scale(1.4)",
                  transformOrigin: "center 15%",
                }}
              />
            </div>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p className="text-2xl md:text-3xl font-bold text-black">Rhaymondo</p>
          </BlurFade>
          <BlurFade delay={0.35}>
            <div className="inline-block px-10 py-4 rounded-xl text-lg font-semibold border-2 border-black text-black min-w-[160px] text-center">
              {active === "left" && countdown !== null ? `Visiting in ${countdown}` : "Enter"}
            </div>
          </BlurFade>
          <BlurFade delay={0.4}>
            <p className="text-sm text-black/30">The human behind it.</p>
          </BlurFade>
        </div>

        {/* Vertical label — visible in the narrow strip when right panel is expanded */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: active === "right" ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        >
          <span
            className="text-sm font-bold tracking-widest uppercase text-black"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Visit the Human
          </span>
        </div>
      </div>

      {/* ROW 2, COL 2: Right panel — dark, Rhaiymondo (AI) */}
      <div
        onMouseEnter={() => handleEnter("right")}
        onMouseLeave={handleLeave}
        className="bg-[#0a0a0a] cursor-pointer overflow-hidden"
        style={{
          gridRow: 2,
          gridColumn: 2,
          position: "relative",
        }}
      >
        {/* Main content — pinned to right half so it stays centered during expansion */}
        <div
          className="flex flex-col items-center gap-5 text-center"
          style={{
            width: "50vw",
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <BlurFade delay={0.2}>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto",
              }}
            >
              <Image
                src="/angelo.jpg"
                alt="Rhaiymondo"
                width={120}
                height={120}
                className="object-cover w-full h-full"
                style={{ transform: "scale(1.1)", transformOrigin: "center center" }}
              />
            </div>
          </BlurFade>
          <BlurFade delay={0.25}>
            <p className="text-2xl md:text-3xl font-bold text-white">
              Rh<span style={GRADIENT_TEXT_STYLE}>ai</span>ymondo
            </p>
          </BlurFade>
          <BlurFade delay={0.35}>
            <div className="inline-block p-[2px] rounded-xl" style={GRADIENT_BTN_STYLE}>
              <span className="block px-10 py-4 rounded-[10px] bg-[#0a0a0a] text-lg font-semibold text-white min-w-[160px] text-center">
                {active === "right" && countdown !== null
                  ? `Visiting in ${countdown}`
                  : "Enter"}
              </span>
            </div>
          </BlurFade>
          <BlurFade delay={0.45}>
            <p className="text-sm text-white/30">The AI built from his work.</p>
          </BlurFade>
        </div>

        {/* Vertical label — visible in the narrow strip when left panel is expanded */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: active === "left" ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        >
          <span
            className="text-sm font-bold tracking-widest uppercase text-white"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Visit the AI
          </span>
        </div>
      </div>

      {/* ROW 3: Caption — spans both columns */}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "2rem",
          pointerEvents: "none",
          zIndex: 20,
          mixBlendMode: "difference",
        }}
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
