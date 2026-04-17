"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useInView, useReducedMotion } from "motion/react";
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


// ─── Gradient button ──────────────────────────────────────────────────────────

const GRADIENT_COLORS = "90deg, #99ceff, #ff99cc, #99ffcc, #ffcc99, #99ceff";

// ─── Scroll progress bar ──────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: `linear-gradient(${GRADIENT_COLORS})`,
      }}
    />
  );
}

// ─── Scroll reveal wrapper ────────────────────────────────────────────────────

function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reducedMotion = useReducedMotion();
  const x = reducedMotion ? 0 : direction === "left" ? -28 : direction === "right" ? 28 : 0;
  const y = reducedMotion ? 0 : direction === "up" ? 20 : 0;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GradientButton({
  href,
  className,
  children,
  target,
  rel,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState(50);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(((e.clientX - rect.left) / rect.width) * 100);
  };

  const onMouseLeave = () => setPos(50);

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      style={{
        background: `linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(${GRADIENT_COLORS}) border-box`,
        backgroundSize: "200% 100%",
        backgroundPosition: `${pos}% 0%`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      target={target}
      rel={rel}
    >
      <span
        style={{
          background: `linear-gradient(${GRADIENT_COLORS})`,
          backgroundSize: "200% 100%",
          backgroundPosition: `${pos}% 0%`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {children}
      </span>
    </a>
  );
}

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
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-bold text-xl tracking-tight"
          aria-label="Rhaiymondo"
        >
          Rh<span style={GRADIENT_TEXT}>ai</span>ymondo
        </a>

        {/* Right: nav + CTA */}
        <nav className="flex items-center gap-6">
          <a href="#work" className="text-sm text-white/50 hover:text-white transition-colors relative group py-1">
            Work
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#about" className="text-sm text-white/50 hover:text-white transition-colors relative group py-1">
            About
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </a>
          <GradientButton href="mailto:hi@rhaiymondo.com" className="text-sm font-semibold px-4 py-2 rounded-lg border-2 border-transparent">
            Talk to Rh<span className="opacity-0" style={{ fontSize: 0 }}>ai</span>aiymondo
          </GradientButton>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const TICKER = [
  "More projects coming soon...",
  "More projects coming soon...",
  "More projects coming soon...",
  "More projects coming soon...",
  "More projects coming soon...",
  "More projects coming soon...",
  "More projects coming soon...",
  "More projects coming soon...",
  "MSW Manager ships developer tooling to 80k+ weekly downloads",
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
          <GradientButton href="#work" className="h-12 rounded-xl px-8 text-sm font-semibold inline-flex items-center border-2 border-transparent">
            See the work →
          </GradientButton>
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
  { title: "MSW Manager", subline: "Developer tooling for Mock Service Worker. 80k+ weekly downloads.", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", link: "" },
];

function DarkWork() {
  return (
    <section id="work" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-8">
        <ScrollReveal>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-16">
            / What I have built
          </p>
        </ScrollReveal>

        {/* Featured project */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-start">
          <ScrollReveal delay={0.1} className="flex-1 min-w-0">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-none tracking-tight">
              Bruiloft.cc
            </h2>
            <p className="text-white/40 mt-4 text-base font-light leading-relaxed">
              Wedding website platform
            </p>
            <Tags tags={["Next.js", "React", "TypeScript", "Platform"]} />
          </ScrollReveal>

          <ScrollReveal delay={0.22} className="flex-1 min-w-0 md:pt-[3.5rem]">
            <p className="text-white/50 text-sm leading-relaxed">
              A modern wedding website platform that allows couples to create beautiful, personalized 
              wedding websites. Features include RSVP management, photo galleries, and customizable templates.
            </p>
          </ScrollReveal>
        </div>

        {/* Featured image */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 w-full rounded-2xl overflow-hidden relative aspect-[4/3]">
            <Image 
              src="https://images.unsplash.com/photo-1738956952892-7553e0327906?q=80&w=2069&auto=format&fit=crop" 
              alt="Bruiloft.cc" 
              fill 
              className="object-cover" 
            />
          </div>
        </ScrollReveal>

        <div className="py-16">
          <Separator className="bg-white/[0.06]" />
        </div>
      </div>

      <ScrollReveal className="px-8 mb-12 max-w-5xl mx-auto">
        <p className="text-white/30 text-sm tracking-[0.3em] uppercase text-center">More projects</p>
      </ScrollReveal>
      <Marquee pauseOnHover repeat={3} className="[--duration:30s]">
        {aiCarouselProjects.map((project) => (
          <div key={project.title} className="group snap-start min-w-[320px] md:min-w-[380px] shrink-0 mr-6 cursor-pointer">
            <div
              className="h-[260px] rounded-xl overflow-hidden relative ring-1 ring-white/0 transition-all duration-300 group-hover:ring-white/20"
              style={{ background: project.gradient }}
            />
            <div className="mt-4 transition-transform duration-300 group-hover:-translate-y-0.5">
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

function ApproachRow({ num, text, index }: { num: string; text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-8 border-t border-white/10 py-8 group cursor-default"
      initial={{ opacity: 0, x: reducedMotion ? 0 : -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-sm font-normal text-white/20 min-w-[3rem] transition-colors duration-200 group-hover:text-white/50">
        {num}
      </span>
      <p className="text-2xl md:text-3xl font-semibold text-white flex-1 transition-transform duration-200 group-hover:translate-x-1.5">
        {text}
      </p>
    </motion.div>
  );
}

function DarkApproach() {
  return (
    <section id="approach" className="bg-[#111] py-32">
      <div className="max-w-5xl mx-auto px-8">
        <ScrollReveal>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-16">/ How I think</p>
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

// ─── Contact ──────────────────────────────────────────────────────────────────

const ctaPrimaryStyle = "inline-block px-16 py-6 rounded-2xl bg-white text-black font-semibold text-xl hover:bg-white/90 transition-opacity w-full text-center"
const GRADIENT_BORDER = "relative inline-block px-16 py-6 rounded-2xl font-semibold text-xl w-full text-center border-2 border-transparent"


function DarkContact() {
  return (
    <section id="contact" className="bg-[#0a0a0a] py-32">
      <div className="max-w-5xl mx-auto px-8">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-6xl font-bold text-white text-center mb-20"
            style={{ letterSpacing: "-0.03em" }}
          >
            Let&apos;s build something.
          </h2>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* Left block */}
          <ScrollReveal direction="left" delay={0.1} className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">Work with Rhaymondo</h3>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              The human behind it. Available for consulting, collaboration, and interesting problems.
            </p>
            <a href="https://www.rhaymondo.com/?bypass=true&site=RHAYMONDO" target="_blank" rel="noopener noreferrer" className={ctaPrimaryStyle}>
              rhaymondo.com ↗
            </a>
          </ScrollReveal>

          {/* Vertical separator */}
          <div className="hidden md:flex self-stretch">
            <div className="w-px bg-white/10" />
          </div>

          {/* Right block */}
          <ScrollReveal direction="right" delay={0.1} className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">
              Optimise with Rh<span style={GRADIENT_TEXT}>ai</span>ymondo
            </h3>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Iterate faster and integrate AI in your products. Let&apos;s find your Rhaiymondo.
            </p>
            <GradientButton href="#" className={GRADIENT_BORDER}>
              Get in touch →
            </GradientButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Site switcher ────────────────────────────────────────────────────────────

function SiteSwitcher() {
  return (
    <a
      href="https://www.rhaymondo.com/?bypass=true&site=RHAYMONDO"
      aria-label="Visit Rhaymondo — the human"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center py-5 px-[10px] rounded-r-xl bg-[#0a0a0a] border-r border-t border-b border-white/10 text-white/30 hover:text-white/70 hover:translate-x-1 transition-all duration-300 cursor-pointer"
    >
      <span
        className="text-[10px] font-semibold tracking-widest uppercase"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Visit the human
      </span>
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function DarkFooter() {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState(50);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(((e.clientX - rect.left) / rect.width) * 100);
  };

  const onMouseLeave = () => setPos(50);

  return (
    <footer
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="fixed bottom-0 left-0 right-0 z-0"
      style={{
        background: `linear-gradient(${GRADIENT_COLORS})`,
        backgroundSize: "200% 100%",
        backgroundPosition: `${pos}% 0%`,
        transition: "background-position 0.1s ease",
      }}
    >
      <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
        <span className="text-sm font-medium text-black/80">
          &copy; 2026 by Rhaymondo
        </span>

        <div className="h-4 w-px bg-black/20 hidden md:block" />

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-medium text-black/80 hover:text-black transition-all duration-200 cursor-pointer py-2 px-3 rounded-lg hover:bg-black/10 active:scale-95"
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
      <ScrollProgress />
      <SiteSwitcher />
      <DarkNav />
      <DarkFooter />
      <main className="relative z-10">
        <DarkHero />
        <DarkWork />
        <DarkAbout />
        <DarkApproach />
        <DarkContact />
      </main>
      <div className="h-[72px]" />
    </>
  );
}
