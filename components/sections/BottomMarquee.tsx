import { Marquee } from "@/components/ui/marquee";

const items = [
  "WeTransfer is acquired by Bending Spoons",
  "Code is like humor. When you have to explain it, it's bad.",
  "This year I visited Dubai, South Africa, Turkey, and Namibia",
  "Lodi is spelled backwards Idol",
];

export default function BottomMarquee() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black py-2 border-t border-white/10">
      <Marquee className="[--duration:40s] [--gap:3rem]" repeat={4}>
        {items.map((item, i) => (
          <span key={i} className="text-xs font-medium text-white/70 mx-4">
            {item} <span className="mx-3 text-white/30">·</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
