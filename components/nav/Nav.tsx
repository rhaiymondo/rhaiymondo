"use client";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#f5f5f0] border-b border-black/10 shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: LinkedIn icon */}
        <a href="https://linkedin.com/in/angelo-oliviero" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-black/60 hover:text-black transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>

        {/* Center: Wordmark */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 font-bold text-black text-xl tracking-tight" aria-label="Rhaymondo">
          Rhaymondo
        </a>

        {/* Right: nav links */}
        <nav className="flex items-center gap-6">
          <a href="#work" className="text-sm text-black/60 hover:text-black transition-colors relative group py-1">
            Work
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#about" className="text-sm text-black/60 hover:text-black transition-colors relative group py-1">
            About
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>
      </div>
    </header>
  );
}
