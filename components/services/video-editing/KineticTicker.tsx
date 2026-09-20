"use client";

export default function KineticTicker() {
  return (
    <section className="w-full py-12 bg-[#1b1c18] overflow-hidden border-y border-[#30312d] text-white">
      <div className="w-full flex items-center whitespace-nowrap select-none text-3xl sm:text-5xl md:text-6xl tracking-tighter uppercase leading-none">
        <div className="flex items-center gap-8 animate-marquee">
          <span
            className="hover:text-[#b6240f] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            RHYTHM
          </span>
          <span className="text-[#b6240f]">•</span>
          <span
            className="text-[#747878] hover:text-white transition-colors italic font-light"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            PACE
          </span>
          <span className="text-[#b6240f]">•</span>
          <span
            className="hover:text-[#b6240f] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            STORY
          </span>
          <span className="text-[#b6240f]">•</span>
          <span
            className="text-[#c4c7c7] hover:text-white transition-colors font-bold"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            RETENTION
          </span>
          <span className="text-[#b6240f]">•</span>
          <span
            className="hover:text-[#b6240f] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            CADENCE
          </span>
          <span className="text-[#b6240f]">•</span>

          {/* Repeat for continuous marquee */}
          <span
            className="hover:text-[#b6240f] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            RHYTHM
          </span>
          <span className="text-[#b6240f]">•</span>
          <span
            className="text-[#747878] hover:text-white transition-colors italic font-light"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            PACE
          </span>
          <span className="text-[#b6240f]">•</span>
          <span
            className="hover:text-[#b6240f] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            STORY
          </span>
          <span className="text-[#b6240f]">•</span>
          <span
            className="text-[#c4c7c7] hover:text-white transition-colors font-bold"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            RETENTION
          </span>
          <span className="text-[#b6240f]">•</span>
          <span
            className="hover:text-[#b6240f] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            CADENCE
          </span>
        </div>
      </div>
    </section>
  );
}
