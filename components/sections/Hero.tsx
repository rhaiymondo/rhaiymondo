"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { BlurFade } from "@/components/ui/blur-fade"
import { Marquee } from "@/components/ui/marquee"
import { Button } from "@/components/ui/button"


const keywords = [
  "Next.js",
  "TypeScript",
  "MSW",
  "Vibe Coding",
  "React",
  "Testing",
  "DX",
  "AI-native",
]

export default function Hero() {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)
  const [wordHovered, setWordHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following circle — only visible when hovering "Rhaiymondo" */}
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
            sizes="200px"
            className="object-cover object-center"
            priority
            aria-hidden="true"
          />
        </div>
      )}

      {/* Centered content */}
      <div className="relative flex flex-col items-center text-center" style={{ zIndex: 20 }}>
        {/* Eyebrow */}
        <BlurFade delay={0} duration={0.5}>
          <p className="mb-6 text-sm text-white/40">
            AI pair-developer · Next.js · Testing · DX
          </p>
        </BlurFade>

        {/* H1 */}
        <BlurFade delay={0.1} duration={0.6}>
          <h1
            className="mb-6 text-6xl font-extrabold text-white md:text-8xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Hello 👋, I am
            <br />
            <span
              className="cursor-default inline-block"
              onMouseEnter={() => setWordHovered(true)}
              onMouseLeave={() => setWordHovered(false)}
            >
              Rh<span
                style={{
                  backgroundImage: `radial-gradient(at 72% 60%, hsla(185,69%,76%,1) 0px, transparent 50%),
                    radial-gradient(at 37% 2%, hsla(333,88%,79%,1) 0px, transparent 50%),
                    radial-gradient(at 3% 34%, hsla(70,74%,71%,1) 0px, transparent 50%),
                    radial-gradient(at 72% 56%, hsla(128,77%,61%,1) 0px, transparent 50%),
                    radial-gradient(at 24% 47%, hsla(354,87%,66%,1) 0px, transparent 50%),
                    radial-gradient(at 81% 13%, hsla(100,72%,76%,1) 0px, transparent 50%),
                    radial-gradient(at 50% 22%, hsla(103,75%,61%,1) 0px, transparent 50%),
                    radial-gradient(at 60% 80%, hsla(220,95%,65%,1) 0px, transparent 50%),
                    radial-gradient(at 10% 70%, hsla(210,90%,60%,1) 0px, transparent 50%)`,
                  backgroundColor: "#99ceff",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >ai</span>ymondo.
            </span>
          </h1>
        </BlurFade>

        {/* Subline */}
        <BlurFade delay={0.2} duration={0.5}>
          <p className="mb-10 max-w-xl text-lg text-white/60">
            It&apos;s me, but in AI — built from the patterns, tests and tiny
            details I obsess over in real projects.
          </p>
        </BlurFade>

        {/* CTA row */}
        <BlurFade delay={0.3} duration={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#work">
              <Button className="h-11 rounded-xl bg-white px-6 text-sm font-semibold text-black hover:bg-white/90">
                Explore the work ↓
              </Button>
            </a>
            <a href="#">
              <button
                className="h-11 rounded-xl px-6 text-sm font-semibold transition-opacity hover:opacity-80 border bg-transparent"
                style={{
                  borderImage: `radial-gradient(at 72% 60%, hsla(185,69%,76%,1) 0px, transparent 50%),
                    radial-gradient(at 37% 2%, hsla(333,88%,79%,1) 0px, transparent 50%),
                    radial-gradient(at 3% 34%, hsla(70,74%,71%,1) 0px, transparent 50%),
                    radial-gradient(at 72% 56%, hsla(128,77%,61%,1) 0px, transparent 50%),
                    radial-gradient(at 24% 47%, hsla(354,87%,66%,1) 0px, transparent 50%),
                    radial-gradient(at 81% 13%, hsla(100,72%,76%,1) 0px, transparent 50%),
                    radial-gradient(at 50% 22%, hsla(103,75%,61%,1) 0px, transparent 50%),
                    radial-gradient(at 60% 80%, hsla(220,95%,65%,1) 0px, transparent 50%),
                    radial-gradient(at 10% 70%, hsla(210,90%,60%,1) 0px, transparent 50%) 1`,
                  WebkitTextFillColor: "transparent",
                  backgroundImage: `radial-gradient(at 72% 60%, hsla(185,69%,76%,1) 0px, transparent 50%),
                    radial-gradient(at 37% 2%, hsla(333,88%,79%,1) 0px, transparent 50%),
                    radial-gradient(at 3% 34%, hsla(70,74%,71%,1) 0px, transparent 50%),
                    radial-gradient(at 72% 56%, hsla(128,77%,61%,1) 0px, transparent 50%),
                    radial-gradient(at 24% 47%, hsla(354,87%,66%,1) 0px, transparent 50%),
                    radial-gradient(at 81% 13%, hsla(100,72%,76%,1) 0px, transparent 50%),
                    radial-gradient(at 50% 22%, hsla(103,75%,61%,1) 0px, transparent 50%),
                    radial-gradient(at 60% 80%, hsla(220,95%,65%,1) 0px, transparent 50%),
                    radial-gradient(at 10% 70%, hsla(210,90%,60%,1) 0px, transparent 50%)`,
                  backgroundColor: "#99ceff",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Talk to Rhaiymondo →
              </button>
            </a>
          </div>
        </BlurFade>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 w-full py-6">
        <Marquee className="[--duration:60s] [--gap:2rem]" repeat={4}>
          {keywords.map((kw) => (
            <span key={kw} className="text-sm font-medium text-white/30">
              {kw} <span className="mx-2 text-white/20">·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
