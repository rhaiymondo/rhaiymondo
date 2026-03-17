"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  theme?: "dark" | "light"
}

export const TextReveal: FC<TextRevealProps> = ({ children, className, theme = "dark" }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")
  const coverage = 0.8 // words complete at 80% of scroll

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[300vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-screen max-w-4xl items-center bg-transparent px-4 py-20"
        }
      >
        <span
          className={cn(
            "flex flex-wrap p-5 text-2xl font-bold md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl leading-[1.35]",
            theme === "light" ? "text-black/20" : "text-white/20"
          )}
        >
          {words.map((word, i) => {
            const start = (i / words.length) * coverage
            const end = start + (1 / words.length) * coverage
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} theme={theme}>
                {word}
              </Word>
            )
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
  theme?: "dark" | "light"
}

const Word: FC<WordProps> = ({ children, progress, range, theme = "dark" }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={theme === "light" ? "text-black" : "text-white"}
      >
        {children}
      </motion.span>
    </span>
  )
}
