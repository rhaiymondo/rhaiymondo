import Nav from "@/components/nav/Nav";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Approach from "@/components/sections/Approach";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { ScrollProgress } from "@/components/ui/scroll-reveal";

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
