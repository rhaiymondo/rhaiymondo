import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Marquee } from "@/components/ui/marquee";

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="border-white/[0.12] text-white/40 rounded-full text-xs px-3 font-light"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

const carouselProjects = [
  {
    title: "Pulse",
    subline: "Real-time analytics dashboard. Built to make invisible bugs visible.",
  },
  {
    title: "Typeform Clone",
    subline: "AI-assisted form builder. Every input is a conversation.",
  },
  {
    title: "Scaffold",
    subline: "Next.js CLI tool. Opinionated defaults, five minutes to first commit.",
  },
  {
    title: "Relay",
    subline: "Slack bot that bridges GitHub PRs to team decisions.",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-8">
        {/* Section label */}
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-16">
          / What shaped me
        </p>

        {/* ── Featured: MSW Manager — two-column editorial ── */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-start">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-none tracking-tight">
              MSW Manager
            </h2>
            <p className="text-white/45 mt-4 text-base font-light leading-relaxed">
              Visual GUI for Mock Service Worker
            </p>
            <Tags tags={["AI-assisted", "Developer Tool", "MSW"]} />
            <div className="flex gap-12 mt-10">
              <div>
                <p className="text-white text-3xl font-bold tabular-nums">~80%</p>
                <p className="text-white/30 text-[10px] mt-1 uppercase tracking-widest">
                  time saved
                </p>
              </div>
              <div>
                <p className="text-white text-3xl font-bold tabular-nums">100%</p>
                <p className="text-white/30 text-[10px] mt-1 uppercase tracking-widest">
                  vibe coded
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 min-w-0 md:pt-[3.5rem]">
            <p className="text-white/50 text-sm leading-relaxed">
              This project is why rhaiymondo treats mock infrastructure as
              first-class. No more hand-editing JSON fixtures — visual,
              toggleable mocks over buried config files.
            </p>
            <a
              href="#"
              className="inline-block text-white/50 text-sm mt-6 border-b border-white/20 hover:text-white hover:border-white/60 transition-all duration-300"
            >
              View project →
            </a>
          </div>
        </div>

        {/* Visual placeholder — full width, below two-column block */}
        <div className="mt-12 h-[260px] w-full rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
          <span className="text-white/20 text-xs tracking-[0.25em] uppercase font-light">
            Project visual
          </span>
        </div>

        {/* Separator */}
        <div className="py-16">
          <Separator className="bg-white/[0.06]" />
        </div>

      </div>

      {/* ── Carousel — full bleed ── */}
      <div className="px-8 mb-12 max-w-5xl mx-auto">
        <p className="text-white/30 text-sm tracking-[0.3em] uppercase text-center">
          More projects
        </p>
      </div>
      <Marquee pauseOnHover repeat={3} className="[--duration:30s]">
        {carouselProjects.map((project) => (
          <div
            key={project.title}
            className="snap-start min-w-[320px] md:min-w-[380px] shrink-0 mr-6"
          >
            <div className="h-[260px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
              <span className="text-white/20 text-xs tracking-[0.25em] uppercase font-light">
                Visual
              </span>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-white text-lg">{project.title}</p>
              <p className="text-white/50 text-sm mt-1 max-w-[260px]">{project.subline}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
