const statements = [
  { num: "01", text: "Good code reads like good prose. Write for the next developer." },
  { num: "02", text: "Performance is a feature. Seconds cost users." },
  { num: "03", text: "Design and engineering are the same discipline." },
  { num: "04", text: "Ship it. Iterate. Don't wait for perfect." },
];

export default function Approach() {
  return (
    <section id="approach" className="bg-white py-32">
      <div className="max-w-5xl mx-auto px-8">
        <p className="text-xs tracking-widest uppercase text-black/40 mb-16">/ How I think</p>
        <div>
          {statements.map(({ num, text }) => (
            <div key={num} className="flex items-start gap-8 border-t border-black/10 py-8">
              <span className="text-sm font-normal text-black/20 min-w-[3rem]">{num}</span>
              <p className="text-2xl md:text-3xl font-semibold text-black flex-1">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
