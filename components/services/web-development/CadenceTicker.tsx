"use client";

const CADENCE_ITEMS = [
  "COMPILE // RUNTIME",
  "INTERACTION CHOREOGRAPHY",
  "TYPESCRIPT ZERO-ANY",
  "DISTRIBUTED EDGE SSR",
  "RESPONSIVE CADENCE",
  "GPU SHADER PIPELINES",
  "ZERO FLUFF ARCHITECTURE",
  "HARDWARE ACCELERATION",
];

export default function CadenceTicker() {
  return (
    <div className="w-full bg-[#151515] text-white py-3 overflow-hidden border-y border-white/10 flex whitespace-nowrap select-none">
      <div className="flex items-center shrink-0 animate-marquee gap-8 md:gap-12 uppercase font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-white/80">
        {CADENCE_ITEMS.concat(CADENCE_ITEMS).map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 md:gap-12">
            <span>{item}</span>
            <span className="text-[#e7472e] text-[9px]">♦</span>
          </div>
        ))}
      </div>
      <div
        className="flex items-center shrink-0 animate-marquee gap-8 md:gap-12 uppercase font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-white/80"
        aria-hidden="true"
      >
        {CADENCE_ITEMS.concat(CADENCE_ITEMS).map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center gap-8 md:gap-12">
            <span>{item}</span>
            <span className="text-[#e7472e] text-[9px]">♦</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 24s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
