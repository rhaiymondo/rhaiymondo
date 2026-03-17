import { Separator } from "@/components/ui/separator"

const gradientStyle: React.CSSProperties = {
  backgroundImage: `radial-gradient(at 72% 60%, hsla(185,69%,76%,1) 0px, transparent 50%),
    radial-gradient(at 37% 2%, hsla(333,88%,79%,1) 0px, transparent 50%),
    radial-gradient(at 3% 34%, hsla(70,74%,71%,1) 0px, transparent 50%),
    radial-gradient(at 72% 56%, hsla(128,77%,61%,1) 0px, transparent 50%),
    radial-gradient(at 24% 47%, hsla(354,87%,66%,1) 0px, transparent 50%),
    radial-gradient(at 81% 13%, hsla(100,72%,76%,1) 0px, transparent 50%),
    radial-gradient(at 50% 22%, hsla(103,75%,61%,1) 0px, transparent 50%),
    radial-gradient(at 60% 80%, hsla(220,95%,65%,1) 0px, transparent 50%),
    radial-gradient(at 10% 70%, hsla(210,90%,60%,1) 0px, transparent 50%)`,
  backgroundColor: "#99ceff",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

const ctaPrimaryStyle = "inline-block px-16 py-6 rounded-2xl bg-white text-black font-semibold text-xl hover:bg-white/90 transition-opacity w-full text-center"
const ctaOutlineStyle = "inline-block px-16 py-6 rounded-2xl border border-white/30 text-white font-semibold text-xl hover:border-white transition-colors w-full text-center"

export default function Contact() {
  return (
    <section id="contact" className="bg-[#0a0a0a] py-32">
      <div className="max-w-5xl mx-auto px-8">
        <h2
          className="text-4xl md:text-6xl font-bold text-white text-center mb-20"
          style={{ letterSpacing: "-0.03em" }}
        >
          Let&apos;s build something.
        </h2>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* Left block */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">Work with Rhaymondo</h3>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              The human behind it. Available for consulting, collaboration, and interesting problems.
            </p>
            <a href="https://rhaymondo.com" target="_blank" rel="noopener noreferrer" className={ctaPrimaryStyle}>
              rhaymondo.com ↗
            </a>
          </div>

          {/* Vertical separator — desktop only */}
          <div className="hidden md:flex self-stretch">
            <Separator orientation="vertical" className="bg-white/10 w-px" />
          </div>

          {/* Right block */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">
              Optimise with Rh<span style={gradientStyle}>ai</span>ymondo
            </h3>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Iterate faster and integrate AI in your products. Let&apos;s find your Rhaiymondo.
            </p>
            <a href="#" className={ctaOutlineStyle}>
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
