"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextReveal } from "@/components/ui/text-reveal";

// ─── Gradient shared by nav wordmark & hero name ─────────────────────────────

const GRADIENT_BG = `
  radial-gradient(at 72% 60%, hsla(185,69%,76%,1) 0px, transparent 50%),
  radial-gradient(at 37% 2%,  hsla(333,88%,79%,1) 0px, transparent 50%),
  radial-gradient(at 3%  34%, hsla(70,74%,71%,1)  0px, transparent 50%),
  radial-gradient(at 72% 56%, hsla(128,77%,61%,1) 0px, transparent 50%),
  radial-gradient(at 24% 47%, hsla(354,87%,66%,1) 0px, transparent 50%),
  radial-gradient(at 81% 13%, hsla(100,72%,76%,1) 0px, transparent 50%),
  radial-gradient(at 50% 22%, hsla(103,75%,61%,1) 0px, transparent 50%),
  radial-gradient(at 60% 80%, hsla(220,95%,65%,1) 0px, transparent 50%),
  radial-gradient(at 10% 70%, hsla(210,90%,60%,1) 0px, transparent 50%)
`;

const GRADIENT_TEXT: React.CSSProperties = {
  backgroundImage: GRADIENT_BG,
  backgroundColor: "#99ceff",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const GRADIENT_BTN: React.CSSProperties = {
  backgroundImage: GRADIENT_BG,
  backgroundColor: "#99ceff",
};

// ─── Nav ─────────────────────────────────────────────────────────────────────

function DarkNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a] border-b border-white/10 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: LinkedIn */}
        <a
          href="https://linkedin.com/in/angelo-oliviero"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-white/50 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>

        {/* Center: Wordmark */}
        <a
          href="/home"
          className="absolute left-1/2 -translate-x-1/2 font-bold text-xl tracking-tight"
          aria-label="Rhaiymondo"
        >
          Rh<span style={GRADIENT_TEXT}>ai</span>ymondo
        </a>

        {/* Right: nav + CTA */}
        <nav className="flex items-center gap-6">
          <a href="#work" className="text-sm text-white/50 hover:text-white transition-colors">
            Work
          </a>
          <a href="#about" className="text-sm text-white/50 hover:text-white transition-colors">
            About
          </a>
          <a
            href="mailto:hi@rhaiymondo.com"
            className="text-sm font-semibold px-4 py-2 rounded-lg"
            style={gradientTextStyle}
          >
            Talk to Rh<span className="opacity-0 text-[0px]">ai</span>aiymondo
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const TICKER = [
  "AI-native development patterns from real production codebases",
  "Built from Next.js, TypeScript, and testing expertise",
  "MSW Manager ships developer tooling to 80k+ weekly downloads",
  "Distilled from years of frontend engineering at scale",
];

function DarkHero() {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [wordHovered, setWordHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following photo */}
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
            src="/angelo.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ transform: "scale(1.1)", transformOrigin: "center center" }}
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="relative flex flex-col items-center text-center" style={{ zIndex: 20 }}>
        <BlurFade delay={0} duration={0.5}>
          <p className="mb-6 text-sm text-white/40">
            Developer · React · Next.js · TypeScript
          </p>
        </BlurFade>

        <BlurFade delay={0.1} duration={0.6}>
          <h1
            className="mb-6 text-6xl font-extrabold text-white md:text-8xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Hello <span className="wave-emoji">👋</span>, I am
            <br />
            <span
              className="cursor-default inline-block"
              onMouseEnter={() => setWordHovered(true)}
              onMouseLeave={() => setWordHovered(false)}
            >
              Rh<span style={GRADIENT_TEXT}>ai</span>ymondo.
            </span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} duration={0.5}>
          <p className="mb-10 max-w-xl text-lg text-white/60 leading-relaxed">
            I&apos;m the AI distillation of Rhaymondo — a senior Next.js engineer. Built from real
            patterns in testing, DX, and AI-native development.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} duration={0.5}>
          <a
            href="#work"
            className="h-12 rounded-xl px-8 text-sm font-semibold inline-flex items-center"
            style={gradientTextStyle}
          >
            See the work →
          </a>
        </BlurFade>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full py-4 border-t border-b border-white/10">
        <Marquee className="[--duration:40s] [--gap:3rem]" repeat={4}>
          {TICKER.map((item, i) => (
            <span key={i} className="text-xs font-medium text-white/40 mx-4">
              {item} <span className="mx-3 text-white/20">·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="border-white/20 text-white/40 rounded-full text-xs px-3 font-light"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

const aiCarouselProjects = [
  { title: "AI Code Assistant", subline: "Intelligent coding companion powered by LLMs. Context-aware suggestions.", image: "https://placehold.co/800x600/1a1a1a/666666?text=AI+Code+Assistant" },
  { title: "Neural Search", subline: "Semantic search engine using embeddings. Find anything, not just keywords.", image: "https://placehold.co/800x600/1a1a1a/666666?text=Neural+Search" },
  { title: "Data Pipeline Orchestrator", subline: "ML model training automation. From raw data to production models.", image: "https://placehold.co/800x600/1a1a1a/666666?text=Data+Pipeline" },
  { title: "Chatbot Framework", subline: "Build conversational AI at scale. Multi-agent orchestration.", image: "https://placehold.co/800x600/1a1a1a/666666?text=Chatbot+Framework" },
  { title: "Analytics Dashboard", subline: "Real-time metrics for AI systems. Monitor, debug, optimize.", image: "https://placehold.co/800x600/1a1a1a/666666?text=Analytics+Dashboard" },
];

function DarkWork() {
  return (
    <section id="work" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-8">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-16">
          / What I have built
        </p>

        {/* Featured project */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-start">
          <div className="flex-1 min-w-0">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-none tracking-tight">
              MSW Manager
            </h2>
            <p className="text-white/40 mt-4 text-base font-light leading-relaxed">
              Developer tooling for Mock Service Worker
            </p>
            <Tags tags={["TypeScript", "MSW", "Testing", "DX", "Open Source"]} />
          </div>

          <div className="flex-1 min-w-0 md:pt-[3.5rem]">
            <p className="text-white/50 text-sm leading-relaxed">
              A toolkit for managing MSW (Mock Service Worker) handler scenarios in development and
              testing environments. Ships a browser devtools panel, scenario switching, and
              persistent state — trusted by 80k+ weekly npm downloads.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white/40 text-sm mt-6 border-b border-white/20 hover:text-white hover:border-white/60 transition-all duration-300"
            >
              View project →
            </a>
          </div>
        </div>

        <div className="py-16">
          <Separator className="bg-white/[0.06]" />
        </div>
      </div>

      <div className="px-8 mb-12 max-w-5xl mx-auto">
        <p className="text-white/30 text-sm tracking-[0.3em] uppercase text-center">More projects</p>
      </div>
      <Marquee pauseOnHover repeat={3} className="[--duration:30s]">
        {aiCarouselProjects.map((project) => (
          <div key={project.title} className="snap-start min-w-[320px] md:min-w-[380px] shrink-0 mr-6">
            <div className="h-[260px] rounded-xl overflow-hidden relative bg-white/5">
              <Image src={project.image} alt={project.title} fill className="object-cover opacity-80" />
            </div>
            <div className="mt-4">
              <p className="font-semibold text-white text-lg">{project.title}</p>
              <p className="text-white/40 text-sm mt-1 max-w-[260px]">{project.subline}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function DarkAbout() {
  return (
    <section id="about" className="bg-[#0a0a0a]">
      <TextReveal>
        {"Angelo is a senior Next.js engineer at Bol.com, building data-driven dashboards. rhaymondo.com is where his real projects live. rhaiymondo.com is what they became."}
      </TextReveal>
    </section>
  );
}

// ─── Approach ─────────────────────────────────────────────────────────────────

const statements = [
  { num: "01", text: "Good code reads like good prose. Write for the next developer." },
  { num: "02", text: "Performance is a feature. Seconds cost users." },
  { num: "03", text: "Design and engineering are the same discipline." },
  { num: "04", text: "Ship it. Iterate. Don't wait for perfect." },
];

function DarkApproach() {
  return (
    <section id="approach" className="bg-[#111] py-32">
      <div className="max-w-5xl mx-auto px-8">
        <p className="text-xs tracking-widest uppercase text-white/40 mb-16">/ How I think</p>
        <div>
          {statements.map(({ num, text }) => (
            <div key={num} className="flex items-start gap-8 border-t border-white/10 py-8">
              <span className="text-sm font-normal text-white/20 min-w-[3rem]">{num}</span>
              <p className="text-2xl md:text-3xl font-semibold text-white flex-1">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

const ctaPrimaryStyle = "inline-block px-16 py-6 rounded-2xl bg-white text-black font-semibold text-xl hover:bg-white/90 transition-opacity w-full text-center"
const GRADIENT_BORDER = "relative inline-block px-16 py-6 rounded-2xl font-semibold text-xl w-full text-center border-2 border-transparent"
const gradientBorderStyle: React.CSSProperties = {
  background: "linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(90deg, #99ceff, #ff99cc, #99ffcc, #ffcc99) border-box",
}

const gradientTextStyle: React.CSSProperties = {
  ...GRADIENT_TEXT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
}

function DarkContact() {
  return (
    <section id="contact" className="bg-[#0a0a0a] py-32">
      <div className="max-w-5xl mx-auto px-8">
        <h2
          className="text-4xl md:text-6xl font-bold text-white text-center mb-20"
          style={{ letterSpacing: "-0.03em" }}
        >
          Let&apos;s build something.
        </h2>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* Left block */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">Work with Rhaymondo</h3>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              The human behind it. Available for consulting, collaboration, and interesting problems.
            </p>
            <a href="https://rhaymondo.com" target="_blank" rel="noopener noreferrer" className={ctaPrimaryStyle}>
              rhaymondo.com ↗
            </a>
          </div>

          {/* Vertical separator */}
          <div className="hidden md:flex self-stretch">
            <div className="w-px bg-white/10" />
          </div>

          {/* Right block */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">
              Optimise with Rh<span style={GRADIENT_TEXT}>ai</span>ymondo
            </h3>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Iterate faster and integrate AI in your products. Let&apos;s find your Rhaiymondo.
            </p>
            <a href="#" className={GRADIENT_BORDER} style={gradientBorderStyle}>
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function DarkFooter() {
  return (
    <footer className="py-8 bg-[#0a0a0a] border-t border-white/10 pb-14">
      <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-white/40">
          {"© " + new Date().getFullYear() + " Angelo · rhaiymondo.com"}
        </span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm text-white/40 hover:text-white transition-colors"
          aria-label="Back to top"
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RhaiymondoHome() {
  return (
    <>
      <DarkNav />
      <main className="bg-[#0a0a0a]">
        <DarkHero />
        <DarkWork />
        <DarkAbout />
        <DarkApproach />
        <DarkContact />
      </main>
      <DarkFooter />
    </>
  );
}
