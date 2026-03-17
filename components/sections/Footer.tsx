"use client";

export default function Footer() {
  return (
    <footer className="py-8 animated-gradient-footer pb-14">
      <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-black/60">
          {"© " + new Date().getFullYear() + " Angelo · rhaymondo.com"}
        </span>
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
