import Nav from "@/components/nav/Nav";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Approach from "@/components/sections/Approach";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ui/scroll-reveal";

function EmploymentPill() {
  return (
    <div className="fixed bottom-20 left-4 z-40 flex flex-col gap-1.5 px-4 py-3 rounded-2xl bg-white border border-black/10 shadow-md">
      <p className="text-[10px] tracking-widest uppercase text-black/30">Currently working at</p>
      <div className="flex items-center gap-2.5">
        {/* Axxes */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-[#1a1a2e] flex items-center justify-center shrink-0">
            <span className="text-white text-[8px] font-bold">AX</span>
          </div>
          <span className="text-xs font-semibold text-black">Axxes</span>
        </div>

        <span className="text-[10px] text-black/25">→</span>

        {/* Bol */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-[#0000a4] flex items-center justify-center shrink-0">
            <span className="text-white text-[8px] font-bold">bol</span>
          </div>
          <span className="text-xs font-semibold text-black">Bol</span>
        </div>
      </div>
    </div>
  );
}

function SiteSwitcher() {
  return (
    <a
      href="https://rhaiymondo.com"
      aria-label="Visit Rhaiymondo — the AI"
      className="fixed right-0 top-1/2 z-40 flex flex-col items-center py-5 px-[10px] rounded-l-xl bg-black text-white/50 hover:text-white translate-x-[4px] hover:translate-x-0 -translate-y-1/2 transition-all duration-300 cursor-pointer"
    >
      <span
        className="text-[10px] font-semibold tracking-widest uppercase"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Visit the AI
      </span>
    </a>
  );
}

export default function RhaymondoHome() {
  return (
    <>
      <ScrollProgress />
      <EmploymentPill />
      <SiteSwitcher />
      <Nav />
      <Footer />
      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Approach />
        <Contact />
      </main>
      <div className="h-[56px]" />
    </>
  );
}
