"use client";

import { WinkCursor } from "wink-cursor";
import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import RhaiymondoHome from "@/components/sites/RhaiymondoHome";
import RhaymondoHome from "@/components/sites/RhaymondoHome";

// Hide default cursor for custom cursor experience
const CURSOR_HIDE_CSS = `
  * { cursor: none !important; }
  a, button { cursor: none !important; }
`;

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

const TYPEWRITER_TEXT = "Are you looking for the human or the AI?";

// Whether we're in local dev (NEXT_PUBLIC_SITE not set at build time)
const IS_LOCAL_DEV = !process.env.NEXT_PUBLIC_SITE;

function SplashPageInner() {
  const searchParams = useSearchParams();
  const bypass = searchParams.get("bypass") === "true";
  const siteParam = searchParams.get("site");

  // Bypass: skip splash and render the appropriate home directly
  if (bypass) {
    const site = process.env.NEXT_PUBLIC_SITE || siteParam;
    return site === "RHAYMONDO" ? <RhaymondoHome /> : <RhaiymondoHome />;
  }

  return <SplashAnimation />;
}

function SplashAnimation() {
  const [active, setActive] = useState<"left" | "right" | null>(null);
  const [topPanel, setTopPanel] = useState<"left" | "right">("left");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Panel entrance
  const [panelsVisible, setPanelsVisible] = useState(false);

  // Mount animation states
  const [crossroadsVisible, setCrossroadsVisible] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [captionVisible, setCaptionVisible] = useState(false);
  const [leftContentVisible, setLeftContentVisible] = useState(false);
  const [rightContentVisible, setRightContentVisible] = useState(false);
  const [leftImageUnblurred, setLeftImageUnblurred] = useState(false);
  const [rightImageUnblurred, setRightImageUnblurred] = useState(false);
  const [interactable, setInteractable] = useState(false);

  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1440);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Panel entrance: fade + slide in from sides
  useEffect(() => {
    const t = setTimeout(() => setPanelsVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Mount animation timeline
  useEffect(() => {
    const t1 = setTimeout(() => setCrossroadsVisible(true), 300);

    let charIndex = 0;
    let typewriterInterval: ReturnType<typeof setInterval>;

    const typewriterTimeout = setTimeout(() => {
      // Skip typewriter animation if reduced motion
      if (reducedMotion) {
        setTypewriterText(TYPEWRITER_TEXT);
        setTypewriterDone(true);
        return;
      }
      typewriterInterval = setInterval(() => {
        charIndex++;
        setTypewriterText(TYPEWRITER_TEXT.slice(0, charIndex));
        if (charIndex >= TYPEWRITER_TEXT.length) {
          clearInterval(typewriterInterval);
          setTypewriterDone(true);
        }
      }, 75);
    }, 1200);

    const t5 = setTimeout(() => {
      setRightContentVisible(true);
      setRightImageUnblurred(true);
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(typewriterTimeout);
      clearInterval(typewriterInterval);
      clearTimeout(t5);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!typewriterDone) return;
    const t1 = setTimeout(() => setCaptionVisible(true), 400);
    const t2 = setTimeout(() => { setLeftContentVisible(true); setLeftImageUnblurred(true); }, 700);
    const t3 = setTimeout(() => { setRightContentVisible(true); setRightImageUnblurred(true); }, 1400);
    const t4 = setTimeout(() => setInteractable(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [typewriterDone]);

  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const leftHref = IS_LOCAL_DEV ? "/?bypass=true&site=RHAYMONDO" : "https://rhaymondo.com/?bypass=true";
  const rightHref = IS_LOCAL_DEV ? "/?bypass=true&site=RHAIYMONDO" : "https://rhaiymondo.com/?bypass=true";

  const startCountdown = useCallback((side: "left" | "right") => {
    setCountdown(3);
    let count = 3;
    countdownTimer.current = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(countdownTimer.current!);
        setCountdown(null);
        window.location.href = side === "left" ? leftHref : rightHref;
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [leftHref, rightHref]);

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

  // Mobile: tap to select
  const handleTap = (side: "left" | "right") => {
    if (active === side) {
      window.location.href = side === "left" ? leftHref : rightHref;
    } else {
      handleEnter(side);
    }
  };

  const motion = reducedMotion ? "none" : undefined;

  const panelTransition = reducedMotion
    ? "none"
    : "width 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease, transform 500ms ease";

  const leftW = active === "left" ? "90vw" : "50vw";
  const rightW = active === "right" ? "90vw" : "50vw";

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ isolation: "isolate", pointerEvents: interactable ? "auto" : "none" }}
    >
      <WinkCursor />

      {/* LEFT PANEL */}
      <div
        onMouseEnter={() => handleEnter("left")}
        onMouseLeave={handleLeave}
        onClick={() => handleTap("left")}
        style={{
          width: leftW,
          minWidth: "50vw",
          transition: panelTransition,
          position: "absolute",
          top: 0, left: 0, height: "100%",
          zIndex: topPanel === "left" ? 10 : 1,
          opacity: panelsVisible ? 1 : 0,
          transform: panelsVisible ? "translateX(0)" : "translateX(-16px)",
        }}
        className="relative bg-white overflow-hidden cursor-pointer"
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            width: active === "left" ? "100vw" : "50vw",
            top: "50%",
            transform: "translateY(-50%)",
            transition: motion ?? "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            className="flex flex-col items-center justify-center gap-3 w-full text-center"
            style={{
              opacity: leftContentVisible ? 1 : 0,
              transition: motion ?? "opacity 600ms ease",
            }}
          >
            <div
              style={{
                width: 120, height: 120, borderRadius: "50%", overflow: "hidden", margin: "0 auto",
                filter: leftImageUnblurred ? "blur(0px)" : "blur(12px)",
                transform: active === "left" ? "scale(1.08)" : "scale(1)",
                transition: motion ?? "filter 800ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image src="/angelo-human.jpg" alt="Rhaymondo" width={120} height={120} className="object-cover w-full h-full" style={{ objectPosition: "center 15%", transform: "scale(1.4)", transformOrigin: "center 15%" }} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-black">Rhaymondo</p>
            <p
              className="text-lg font-semibold text-black/60 overflow-hidden"
              style={{
                opacity: active === "left" && countdown !== null ? 1 : 0,
                maxHeight: active === "left" && countdown !== null ? "2rem" : "0",
                transform: active === "left" && countdown !== null ? "translateY(0)" : "translateY(8px)",
                transition: motion ?? "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1), max-height 500ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {countdown !== null ? `Visiting in ${countdown}` : "\u00a0"}
            </p>
            <p className="text-sm text-black/30">The human behind it.</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        onMouseEnter={() => handleEnter("right")}
        onMouseLeave={handleLeave}
        onClick={() => handleTap("right")}
        style={{
          width: rightW,
          minWidth: "50vw",
          transition: panelTransition,
          position: "absolute",
          top: 0, right: 0, height: "100%",
          zIndex: topPanel === "right" ? 10 : 1,
          opacity: panelsVisible ? 1 : 0,
          transform: panelsVisible ? "translateX(0)" : "translateX(16px)",
        }}
        className="relative bg-[#0a0a0a] overflow-hidden cursor-pointer"
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            width: active === "right" ? "100vw" : "50vw",
            top: "50%",
            transform: "translateY(-50%)",
            transition: motion ?? "width 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            className="flex flex-col items-center justify-center gap-3 w-full text-center"
            style={{
              opacity: rightContentVisible ? 1 : 0,
              transition: motion ?? "opacity 600ms ease",
            }}
          >
            <div
              style={{
                width: 120, height: 120, borderRadius: "50%", overflow: "hidden", margin: "0 auto",
                filter: rightImageUnblurred ? "blur(0px)" : "blur(12px)",
                transform: active === "right" ? "scale(1.08)" : "scale(1)",
                transition: motion ?? "filter 800ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image src="/angelo.jpg" alt="Rhaiymondo" width={120} height={120} className="object-cover w-full h-full" style={{ transform: "scale(1.1)", transformOrigin: "center center" }} />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">
              Rh<span style={GRADIENT_TEXT_STYLE}>ai</span>ymondo
            </p>
            <p
              className="text-lg font-semibold text-white/60 overflow-hidden"
              style={{
                opacity: active === "right" && countdown !== null ? 1 : 0,
                maxHeight: active === "right" && countdown !== null ? "2rem" : "0",
                transform: active === "right" && countdown !== null ? "translateY(0)" : "translateY(8px)",
                transition: motion ?? "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1), max-height 500ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {countdown !== null ? `Visiting in ${countdown}` : "\u00a0"}
            </p>
            <p className="text-sm text-white/30">The AI built from his work.</p>
          </div>
        </div>
      </div>

      {/* VERTICAL LABELS — shown on the 10vw strip of the non-active panel */}
      <div
        className="absolute top-0 right-0 h-full w-[10vw] flex items-center justify-center pointer-events-none z-30"
        style={{ opacity: active === "left" ? 1 : 0, transition: motion ?? "opacity 300ms ease" }}
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
        style={{ opacity: active === "right" ? 1 : 0, transition: motion ?? "opacity 300ms ease" }}
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
          top: (active || (typewriterDone && !isLargeScreen)) ? "2rem" : "50%",
          transform: (active || (typewriterDone && !isLargeScreen)) ? "translateY(0)" : "translateY(-50%)",
          transition: motion ?? "top 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p
          className="text-xs tracking-widest uppercase font-semibold text-white"
          style={{
            opacity: crossroadsVisible ? 1 : 0,
            transform: crossroadsVisible ? "translateY(0)" : "translateY(-16px)",
            transition: motion ?? "opacity 600ms ease, transform 600ms ease",
          }}
        >
          You&#39;ve reached a crossroads.
        </p>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-xl text-white" style={{ minHeight: "1.2em" }}>
          {typewriterText}
          {typewriterText.length > 0 && typewriterText.length < TYPEWRITER_TEXT.length && (
            <span className="typewriter-cursor">|</span>
          )}
        </h1>
      </div>

      {/* BOTTOM CAPTION */}
      <div
        className="absolute inset-x-0 bottom-8 pointer-events-none z-20 flex justify-center"
        style={{ mixBlendMode: "difference" }}
      >
        <span
          className="text-sm font-medium text-white opacity-60"
          style={{
            opacity: captionVisible ? 0.6 : 0,
            transform: captionVisible ? "translateY(0)" : "translateY(16px)",
            transition: motion ?? "opacity 600ms ease, transform 600ms ease",
          }}
        >
          Same mind. Different form.
        </span>
      </div>

      <style>{`
        * { cursor: none !important; }
        a, button, input, textarea, select { cursor: none !important; }
        div[style*="z-index: 999999"] {
          mix-blend-mode: difference !important;
          filter: invert(1);
        }
        .typewriter-cursor {
          animation: blink 0.7s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .typewriter-cursor {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

    </div>
  );
}

export default function SplashPage() {
  return (
    <Suspense>
      <SplashPageInner />
    </Suspense>
  );
}
