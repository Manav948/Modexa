"use client";

import StartProjectButton from "@/components/motion/StartProjectButton";

export default function CommissionGateway() {
  return (
    <section
      id="inquiry-station"
      className="w-full py-24 lg:py-32 px-5 md:px-10 lg:px-16 text-white border-t border-white/10 relative overflow-hidden select-none"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Ambient atmospheric glow */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#e7472e]/12 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-start gap-8 relative z-10">
        <div className="flex items-center gap-2.5 font-mono text-xs text-[#ffdad4] uppercase tracking-widest font-medium">
          <span className="w-2 h-2 rounded-full bg-[#e7472e] animate-ping" />
          <span>04 / START A PROJECT</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase text-white leading-tight">
          HAVE SOMETHING<br />
          <span
            className="font-editorial italic lowercase font-normal text-[#f0eee8] pr-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            worth building?
          </span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
          Websites and digital products built where design, interaction and technology meet.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
          <StartProjectButton theme="dark" href="mailto:hello@company.com?subject=PROJECT%20INITIATION%20//%20STUDIO%20DIRECTION" />
          <a
            href="mailto:tech@company.com?subject=TECHNICAL%20INQUIRY"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/25 text-white font-mono text-xs uppercase tracking-wider hover:border-white hover:bg-white/10 transition-colors duration-200"
          >
            EXPLORE WORK
          </a>
        </div>

        {/* Studio Technical Provenance Metadata */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 font-mono text-xs uppercase tracking-wider text-white/50 mt-4">
          <div>
            <span className="block opacity-40 text-[10px] mb-1">CAPABILITY</span>
            <span className="text-white font-medium">WEB DEVELOPMENT</span>
          </div>
          <div>
            <span className="block opacity-40 text-[10px] mb-1">APPROACH</span>
            <span className="text-white font-medium">DESIGN + CODE</span>
          </div>
          <div>
            <span className="block opacity-40 text-[10px] mb-1">FOCUS</span>
            <span className="text-white font-medium">INTERACTION</span>
          </div>
          <div>
            <span className="block opacity-40 text-[10px] mb-1">OUTPUT</span>
            <span className="text-white font-medium">PRODUCTION READY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
