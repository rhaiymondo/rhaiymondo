"use client";

export default function Footer() {
  return (
    <footer className="py-8 animated-gradient-footer">
      <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <span className="text-black/60">© {new Date().getFullYear()} by Rhaymondo</span>
          <span className="hidden md:block text-black/40">·</span>
          <span className="text-black/60">Proudly vibe coded by Rh<span style={{
            fontWeight: "700",
            color: "rgba(0,0,0,0.8)",
          }}>ai</span>ymondo</span>
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm text-black/50 hover:text-black transition-colors"
          aria-label="Back to top"
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}
