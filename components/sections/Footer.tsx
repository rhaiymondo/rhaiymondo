"use client";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-black">
      <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">
          &copy; 2026 by Rhaymondo
        </span>
        <div className="h-4 w-px bg-white/20 hidden md:block" />
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-medium text-white/80 hover:text-white transition-all duration-200 cursor-pointer py-2 px-3 rounded-lg hover:bg-white/10 active:scale-95"
          aria-label="Back to top"
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}
