"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Marquee } from "@/components/ui/marquee";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" className="border-black/20 text-black/50 rounded-full text-xs px-3 font-light">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

const carouselProjects = [
  { title: "Bruiloft.cc", subline: "Wedding website platform. Built with Next.js.", image: "https://images.unsplash.com/photo-1738956952892-7553e0327906?q=80&w=2069&auto=format&fit=crop" },
  { title: "WeTransfer Marketing Site", subline: "Main marketing website for WeTransfer. Built with Next.js.", image: "/projects/web-ui.jpg" },
  { title: "WeTransfer Blog", subline: "Editorial blog platform for WeTransfer. Built with Next.js.", image: "/projects/ideas-blog.jpg" },
  { title: "Creative Hubs Index", subline: "Interactive index of the most creative cities worldwide. Built with Gatsby.", image: "/projects/creative-hubs.png" },
  { title: "Color Push", subline: "A creative escape during file transfers. Interactive color experience.", image: "/projects/color-push.jpg" },
  { title: "Ideas Reports", subline: "Annual creativity insights report for WeTransfer. Design-forward editorial.", image: "/projects/ideas-report.jpg" },
  { title: "More projects coming soon...", subline: "", image: "" },
];

export default function Work() {
  return (
    <section id="work" className="py-32 bg-[#f5f5f0]">
      <div className="max-w-5xl mx-auto px-8">
        <ScrollReveal>
          <p className="text-black/30 text-xs tracking-[0.3em] uppercase mb-16">
            / What I have built
          </p>
        </ScrollReveal>

        {/* Featured image */}
        <ScrollReveal delay={0.08}>
          <div className="mb-12 w-full rounded-2xl overflow-hidden relative aspect-[4/3]">
            <Image src="/projects/the-supporting-act.jpg" alt="The Supporting Act Foundation" fill className="object-cover" />
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-start">
          <ScrollReveal delay={0.12} className="flex-1 min-w-0">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-none tracking-tight">
              The Supporting Act Foundation
            </h2>
            <p className="text-black/45 mt-4 text-base font-light leading-relaxed">
              WeTransfer non-profit foundation website
            </p>
            <Tags tags={["NextJS", "React", "TypeScript", "Non-profit"]} />
          </ScrollReveal>

          <ScrollReveal delay={0.22} className="flex-1 min-w-0 md:pt-[3.5rem]">
            <p className="text-black/50 text-sm leading-relaxed">
              Non-profit org website for WeTransfer foundation. Built with Gatsby, React, TypeScript, SCSS and Contentful.
            </p>
            <a href="#" className="inline-block text-black/50 text-sm mt-6 border-b border-black/20 hover:text-black hover:border-black/60 transition-all duration-300">
              View project →
            </a>
          </ScrollReveal>
        </div>

        <div className="py-16">
          <Separator className="bg-black/[0.06]" />
        </div>
      </div>

      <ScrollReveal className="px-8 mb-12 max-w-5xl mx-auto">
        <p className="text-black/30 text-sm tracking-[0.3em] uppercase text-center">More projects</p>
      </ScrollReveal>
      <Marquee pauseOnHover repeat={3} className="[--duration:30s]">
        {carouselProjects.map((project) => (
          <div key={project.title} className="group snap-start min-w-[320px] md:min-w-[380px] shrink-0 mr-6 cursor-pointer">
            <div className="h-[260px] rounded-xl overflow-hidden relative ring-1 ring-black/0 transition-all duration-300 group-hover:ring-black/15">
              <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="mt-4 transition-transform duration-300 group-hover:-translate-y-0.5">
              <p className="font-semibold text-black text-lg">{project.title}</p>
              <p className="text-black/50 text-sm mt-1 max-w-[260px]">{project.subline}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
