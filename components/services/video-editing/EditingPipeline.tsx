"use client";

const STAGES = [
  {
    num: "STAGE 01",
    title: "Understand",
    desc: "Ingesting raw footage, transcribing key dialogue, deciphering the brand mandate, core emotional cadence, and audience retention horizon.",
    tag: "• FOOTAGE AUDIT & LOGGING",
    highlight: true,
  },
  {
    num: "STAGE 02",
    title: "Structure",
    desc: "Assembling the narrative spine through a ruthless radio-edit pass. Eliminating filler, testing alternative hooks, and establishing macro rhythm.",
    tag: "• ASSEMBLY & RADIO CUT",
    highlight: false,
  },
  {
    num: "STAGE 03",
    title: "Refine",
    desc: "Micro-cutting frames, viscoelastic match cuts, bespoke foley integration, kinetic motion overlays, and precision DaVinci color grading.",
    tag: "• SOUND DESIGN & GRADE",
    highlight: false,
  },
  {
    num: "STAGE 04",
    title: "Deliver",
    desc: "High-fidelity ProRes 422 masters, platform-ready crops (9:16, 16:9, 1:1, 4:5), and an organized archival folder with all clean assets.",
    tag: "• MULTI-ASPECT MASTER PACK",
    highlight: true,
  },
];

export default function EditingPipeline() {
  return (
    <section
      id="pipeline"
      className="w-full px-5 md:px-8 lg:px-12 py-24 border-t"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#e4e2dd] gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] uppercase tracking-widest mb-2 font-bold line-reveal">
              <span>05 / THE EDIT PIPELINE</span>
              <span className="w-4 h-px bg-[#b6240f]" />
              <span>DISCIPLINED PROCESS</span>
            </div>
            <h2
              className="text-[#1b1c18] uppercase tracking-tight text-reveal"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 400,
              }}
            >
              From raw footage to final frame.
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#747878] uppercase tracking-wider font-bold line-reveal">
            EST. TURNAROUND: 48–72H COMMISSIONS
          </span>
        </div>

        {/* 4 Chronological Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((stage) => (
            <div
              key={stage.num}
              className={`flex flex-col p-6 bg-[#f5f3ed] border border-[#e4e2dd] ${
                stage.highlight ? "border-t-4 border-t-[#b6240f]" : "border-t-4 border-t-[#1b1c18]"
              }`}
            >
              <span
                className={`font-mono text-[10px] font-bold ${
                  stage.highlight ? "text-[#b6240f]" : "text-[#747878]"
                }`}
              >
                {stage.num}
              </span>
              <h3
                className="text-[#1b1c18] uppercase mt-2 mb-3 text-2xl"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                {stage.title}
              </h3>
              <p
                className="text-[#747878] text-xs leading-relaxed mb-6"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {stage.desc}
              </p>
              <div className="mt-auto pt-3 border-t border-[#e4e2dd] font-mono text-[9px] text-[#747878] uppercase font-bold">
                {stage.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
