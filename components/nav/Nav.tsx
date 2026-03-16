"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a] border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: branding */}
        <a href="/home" className="flex flex-col leading-tight" aria-label="Rhaiymondo — back to top">
          <span className="font-bold text-white text-xl tracking-tight">
            Rhaiymondo
          </span>
        </a>

        {/* Right: nav links + CTA */}
        <nav className="flex items-center gap-6">
          <a
            href="/home#work"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Work
          </a>
          <a
            href="/home#about"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="/home#approach"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Approach
          </a>
          <Button
            type="button"
            variant="outline"
            className="text-sm border-blue-500/60 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-400 bg-transparent"
            aria-label="Talk to Rhaiymondo (coming soon)"
          >
            Talk to Rhaiymondo
          </Button>
        </nav>
      </div>
    </header>
  );
}
