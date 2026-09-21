"use client";

const ITEMS = [
  "SHORT FORM",
  "CONTENT STRATEGY",
  "ORGANIC REACH",
  "DISTRIBUTION CADENCE",
  "BRAND CULTURE",
  "AUDIENCE ARCHITECTURE",
  "ALMOST TRUST BUILT",
  "CONVERSION ARCHITECTURE",
  "CREATIVE DIRECTION",
  "ENGAGEMENT DESIGN",
];

export default function DMTicker() {
  const track = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <section
      className="w-full overflow-hidden border-y select-none"
      style={{ backgroundColor: "#151515", borderColor: "#2a2a2a" }}
    >
      <style jsx global>{`
        @keyframes dmTickerScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33333%, 0, 0); }
        }
        .dm-ticker-track {
          animation: dmTickerScroll 32s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="w-full flex items-center py-4 whitespace-nowrap">
        <div className="flex items-center gap-0 w-max dm-ticker-track">
          {track.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span
                className="font-mono text-[11px] uppercase tracking-widest px-5"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: idx % 4 === 2 ? "#E7472E" : "rgba(255,255,255,0.6)",
                  fontWeight: idx % 4 === 2 ? 700 : 400,
                }}
              >
                {item}
              </span>
              <span
                className="font-mono text-[11px]"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                //
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
