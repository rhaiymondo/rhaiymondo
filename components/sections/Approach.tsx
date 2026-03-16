const statements = [
  {
    num: "01",
    text: "Tests are documentation. Write them like someone's reading.",
  },
  {
    num: "02",
    text: "Types are not overhead — they are the contract.",
  },
  {
    num: "03",
    text: "The best AI tools disappear into the workflow. That's the goal.",
  },
  {
    num: "04",
    text: "Speed from AI. Direction from Rhaymondo.",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="bg-white py-32">
      <div className="max-w-5xl mx-auto px-8">
        <p className="text-xs tracking-widest uppercase text-black/40 mb-16">
          / How Rhaiymondo thinks
        </p>

        <div>
          {statements.map(({ num, text }) => (
            <div
              key={num}
              className="flex items-start gap-8 border-t border-black/10 py-8"
            >
              <span className="text-sm font-normal text-black/20 min-w-[3rem]">
                {num}
              </span>
              <p className="text-2xl md:text-3xl font-semibold text-black flex-1">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
