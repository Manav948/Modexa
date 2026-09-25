"use client";

const PHASES = [
  { phase: "PHASE // 01", title: "Discover", description: "Understand the product, audience and goal." },
  { phase: "PHASE // 02", title: "Structure", description: "Define the experience, architecture and technical direction." },
  { phase: "PHASE // 03", title: "Build", description: "Turn the design into a working digital experience." },
  { phase: "PHASE // 04", title: "Integrate", description: "Connect the systems, data and interactions." },
  { phase: "PHASE // 05", title: "Refine", description: "Improve the details, performance and behavior." },
  { phase: "PHASE // 06", title: "Deploy", description: "Take the finished experience into production." },
];

export default function MethodologyProtocol() {
  return (
    <section
      className="w-full pt-20 pb-10 lg:pt-28 lg:pb-12 px-5 md:px-10 lg:px-16 border-t"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
    >
      <div className="mb-14">
        <span className="font-mono text-xs text-[#e7472e] uppercase tracking-widest block mb-2 font-medium">
          SECTION 08 // PROCESS
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#1b1c18]">
          FROM IDEA TO DEPLOYMENT
        </h2>
        <p className="font-sans text-sm md:text-base text-[#444748] max-w-xl mt-3 leading-relaxed">
          A clear path from product idea to working digital experience.
        </p>
      </div>

      {/* 6-Stage Timeline Chain */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PHASES.map((p) => (
          <div
            key={p.phase}
            className="phase-card p-6 md:p-8 bg-[#fbf9f3] border border-[#e4e2dd] flex flex-col justify-between relative hover:border-[#e7472e]/50 hover:bg-white transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-xs text-[#e7472e] uppercase font-bold tracking-wider">
                {p.phase}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e7472e]" />
            </div>
            <h3 className="font-display text-lg uppercase text-[#1b1c18] group-hover:text-[#e7472e] transition-colors mb-3">
              {p.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#444748] leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-16 overflow-x-clip sm:mt-20 lg:mt-24 lg:pb-2">
        <div
          className="mb-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#747878] sm:text-[11px]"
        >
          <span>
            PROCESS / 05 <span className="px-1.5 text-[#E7472E]">{"//"}</span> IDEA → DESIGN → CODE → TEST → DEPLOY
          </span>
          <span className="text-[#55534E]">SYSTEM / DIGITAL EXPERIENCE</span>
        </div>

        <div className="relative lg:ml-[7%] lg:w-[93%]">
          <div
            className="relative aspect-[16/9] origin-center overflow-hidden border border-[#E8E2D5] bg-[#151515] sm:aspect-[21/9]"
          >
            <img
              src="/images/process_deployment_workspace.jpg"
              alt="Close-up of a dual-monitor engineering interface with source code"
              className="absolute inset-[-8%] h-[116%] w-full object-cover object-center grayscale-[0.35] contrast-[1.05]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/20" />
            <span className="absolute left-3 top-3 border border-white/20 bg-[#151515]/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/85 sm:left-4 sm:top-4 sm:text-[10px]">
              IDEA → INTERFACE → CODE → DEPLOY
            </span>
          </div>

          <aside
              className="relative z-10 mt-4 max-w-[34rem] border border-[#E8E2D5] bg-[#F7F5EF] p-5 sm:p-6 lg:absolute lg:-left-[7.5%] lg:bottom-8 lg:mt-0 lg:max-w-[22.5rem]"
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#E7472E]">
              BUILD STATUS / PRODUCTION
            </p>
            <h3
              className="font-display text-2xl uppercase leading-[0.95] tracking-[-0.04em] text-[#151515] sm:text-3xl"
            >
              FROM CONCEPT TO PRODUCTION.
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-[#55534E]">
              Design, interaction and engineering come together to turn an idea into something people can actually use.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
