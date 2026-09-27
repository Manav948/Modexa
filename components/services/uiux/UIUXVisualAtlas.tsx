import Image from "next/image";

const STUDIES = [
  { file: "ui1.jpg", width: 2160, height: 11267, label: "Product interface" },
  { file: "ui2.png", width: 2880, height: 8496, label: "Wellness experience" },
  { file: "ui3.png", width: 3840, height: 14478, label: "Dark visual system" },
  { file: "ui4.jpg", width: 3840, height: 15766, label: "Editorial experience" },
  { file: "ui5.jpg", width: 2880, height: 13214, label: "Commerce interface" },
  { file: "ui6.jpg", width: 2880, height: 12144, label: "Wellness interface" },
  { file: "ui8.png", width: 1440, height: 5339, label: "Healthcare experience" },
  { file: "ui9.png", width: 3840, height: 13308, label: "Editorial system" },
  { file: "ui10.png", width: 3840, height: 16344, label: "Image-led experience" },
  { file: "ui11.png", width: 2880, height: 14702, label: "Lifestyle interface" },
  { file: "ui12.jpg", width: 2880, height: 11860, label: "Dark commerce system" },
  { file: "ui13.png", width: 3840, height: 14244, label: "Nature-led experience" },
  { file: "ui14.jpg", width: 3840, height: 19394, label: "Healthcare interface" },
];

export default function UIUXVisualAtlas() {
  return (
    <section
      id="uiux-visual-atlas"
      aria-labelledby="uiux-visual-atlas-title"
      className="w-full border-y py-16 md:py-20"
      style={{ backgroundColor: "#f0ede6", borderColor: "#E8E2D5" }}
    >
      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-widest text-[#E7472E] font-bold mb-2"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              03 / INTERFACE ATLAS
            </p>
            <h2
              id="uiux-visual-atlas-title"
              className="text-[#151515] leading-none tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              A wider view of the work.
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed text-[#55534E]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Page-length studies across products, wellness and visual systems.
            Scroll to explore each one at its natural proportions.
          </p>
        </div>

        <div
          role="region"
          aria-label="Scrollable gallery of full-page UI and UX design studies"
          tabIndex={0}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E]"
        >
          {STUDIES.map((study, index) => (
            <figure
              key={study.file}
              className="w-[min(62vw,15rem)] md:w-[15.5rem] shrink-0 snap-start"
            >
              <div className="border border-[#E8E2D5] bg-[#fbf9f3]">
                <Image
                  src={`/ui%26ux/${study.file}`}
                  alt={`${study.label}, full-page interface design study`}
                  width={study.width}
                  height={study.height}
                  sizes="(max-width: 767px) 62vw, 248px"
                  quality={65}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption
                className="flex items-center justify-between gap-3 pt-2 font-mono text-[9px] uppercase tracking-wider text-[#55534E]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span>{study.label}</span>
                <span className="text-[#E7472E]">{String(index + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p
          className="mt-3 font-mono text-[8px] uppercase tracking-widest text-[#77736C] md:hidden"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Swipe to explore →
        </p>
      </div>
    </section>
  );
}
