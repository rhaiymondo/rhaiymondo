"use client";

export default function Footer() {
  return (
    <footer className="py-8 bg-black pb-14">
      <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-white/60">
          {"© " + new Date().getFullYear() + " Angelo · rhaymondo.com"}
        </span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm text-white/50 hover:text-white transition-colors"
          aria-label="Back to top"
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}
