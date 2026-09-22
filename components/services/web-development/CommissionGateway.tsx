"use client";

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
          <span>COMMISSION TRANSMISSION GATE // 2026</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase text-white leading-tight">
          HAVE A SYSTEM WORTH BUILDING?<br />
          <span
            className="font-editorial italic lowercase font-normal text-[#f0eee8] pr-2"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            let&apos;s write
          </span>
          THE CODE.
        </h2>

        <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
          Whether you are staging a monumental interactive product reveal or re-architecting a sluggish digital infrastructure, our engineering studio turns your creative ambition into an unyielding reality.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
          <a
            href="mailto:hello@company.com?subject=PROJECT%20INITIATION%20//%20STUDIO%20DIRECTION"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#e7472e] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#b6240f] transition-all duration-300 shadow-[0_0_25px_rgba(231,71,46,0.35)]"
          >
            START A PROJECT →
          </a>
          <a
            href="mailto:tech@company.com?subject=TECHNICAL%20INQUIRY"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/25 text-white font-mono text-xs uppercase tracking-wider hover:border-white hover:bg-white/10 transition-colors duration-200"
          >
            DIRECT TO LEAD ENGINEER
          </a>
        </div>

        {/* Studio Technical Provenance Metadata */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 font-mono text-xs uppercase tracking-wider text-white/50 mt-4">
          <div>
            <span className="block opacity-40 text-[10px] mb-1">COMMISSION PIPELINE</span>
            <span className="text-white font-medium">OPEN FOR COMMISSIONS</span>
          </div>
          <div>
            <span className="block opacity-40 text-[10px] mb-1">PRIMARY DESPATCH</span>
            <span className="text-white font-medium">PARIS // NYC</span>
          </div>
          <div>
            <span className="block opacity-40 text-[10px] mb-1">DEPLOY ENCRYPTION</span>
            <span className="text-white font-medium">TLS 1.3 / ED25519</span>
          </div>
          <div>
            <span className="block opacity-40 text-[10px] mb-1">CODE LICENSE</span>
            <span className="text-white font-medium">PROPRIETARY CLIENT IP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
