"use client";

const WORDS = [
  { text: "RHYTHM", font: "'Space Grotesk', sans-serif", style: "normal", color: "hover:text-[#b6240f]" },
  { text: "PACE", font: "'Newsreader', Georgia, serif", style: "italic font-light text-[#747878]", color: "hover:text-white" },
  { text: "STORY", font: "'Space Grotesk', sans-serif", style: "normal", color: "hover:text-[#b6240f]" },
  { text: "RETENTION", font: "'Manrope', sans-serif", style: "font-bold text-[#c4c7c7]", color: "hover:text-white" },
  { text: "CADENCE", font: "'Space Grotesk', sans-serif", style: "normal", color: "hover:text-[#b6240f]" },
];

export default function KineticTicker() {
  const fullWordList = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

  return (
    <section className="w-full py-14 bg-[#1b1c18] overflow-hidden border-y border-[#30312d] text-white select-none relative">
      <div className="w-full flex items-center whitespace-nowrap text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase leading-none">
        <div className="flex items-center gap-8 md:gap-12 w-max animate-reel-marquee">
          {fullWordList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-12 inline-block">
              <span
                className={`inline-block transition-colors duration-300 ${item.style} ${item.color}`}
                style={{ fontFamily: item.font }}
              >
                {item.text}
              </span>
              <span className="text-[#b6240f] text-3xl md:text-5xl select-none">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
