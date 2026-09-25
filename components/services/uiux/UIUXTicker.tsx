"use client";

const ITEMS = [
  "INTERFACES",
  "CLARITY",
  "STRUCTURE",
  "INTERACTION",
  "VISUAL SYSTEMS",
  "RESPONSIVE TOPOLOGY",
  "GRID SYSTEMS",
  "SPATIAL DESIGN",
  "MICRO-MOTION",
  "TYPE HIERARCHY",
];

export default function UIUXTicker() {
  const track = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <section
      className="w-full overflow-hidden border-y select-none"
      style={{ backgroundColor: "#f0ede6", borderColor: "#E8E2D5" }}
    >
      <style jsx global>{`
        @keyframes uiuxTickerScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33333%, 0, 0); }
        }
        .uiux-ticker-track {
          animation: uiuxTickerScroll 40s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="w-full flex items-center py-3 whitespace-nowrap">
        <div className="flex items-center w-max uiux-ticker-track">
          {track.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span
                className="font-mono text-[10px] uppercase tracking-widest px-5"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: idx % 5 === 2 ? "#E7472E" : "#55534E",
                  fontWeight: idx % 5 === 2 ? 700 : 400,
                }}
              >
                {item}
              </span>
              <span className="font-mono text-[10px] text-[#E8E2D5]">{"//"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
