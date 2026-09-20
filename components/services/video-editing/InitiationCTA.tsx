"use client";

export default function InitiationCTA() {
  return (
    <section
      id="initiation"
      className="relative w-full py-28 bg-[#1b1c18] text-[#fbf9f3] overflow-hidden border-t border-[#30312d]"
    >
      {/* Background Dark Cinematic Film Still Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="/images/service_video_motion_1789796437874.png"
          alt="Cinematic background still"
          className="w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c18] via-[#1b1c18]/80 to-[#1b1c18]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Section Sub-Tag */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] uppercase tracking-widest mb-4 font-bold">
            <span>07 / MANDATE INITIATION</span>
            <span className="w-4 h-px bg-[#b6240f]" />
            <span>DIRECT COMMISSIONS</span>
          </div>

          {/* Large-scale Editorial Headline matching Stitch specification */}
          <h2
            className="text-white uppercase leading-none tracking-tight mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
            }}
          >
            READY TO MAKE<br />
            <span
              className="italic font-normal text-[#fbf9f3] lowercase tracking-normal"
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            >
              SOMETHING worth watching?
            </span>
          </h2>

          <p
            className="text-[#c4c7c7] max-w-2xl text-base md:text-lg leading-relaxed mb-8"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Bring the raw material, the rushed rushes, or simply the vision. Our editorial direction unifies cadence, sound design, and retention into an unforgettable cinematic artifact.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16 font-mono text-[10px]">
            <a
              href="mailto:hello@studiodirection.com?subject=Video%20Editing%20Direct%20Commission"
              className="px-8 py-4 bg-[#b6240f] text-white tracking-widest uppercase hover:bg-[#fe573c] transition-colors inline-flex items-center gap-3 font-bold shadow-lg"
            >
              <span>START A PROJECT</span>
              <span>→</span>
            </a>
            <a
              href="/#overview"
              className="px-6 py-4 border border-[#444748] hover:border-white text-white tracking-widest uppercase transition-colors"
            >
              RETURN TO MAIN ATELIER
            </a>
          </div>

          {/* Studio Technical Provenance Colophon Stamp */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#30312d] font-mono text-[10px] text-[#747878]">
            <div>
              <span className="text-white font-bold">TURNAROUND SLA:</span>
              <p className="mt-1 leading-relaxed text-[#c4c7c7]">
                Initial rough cut delivered within 48–72 hours of complete footage ingest.
              </p>
            </div>
            <div>
              <span className="text-white font-bold">AVAILABILITY:</span>
              <p className="mt-1 leading-relaxed text-[#c4c7c7]">
                Accepting 2 selective flagship retainer accounts for Q3/Q4.
              </p>
            </div>
            <div>
              <span className="text-white font-bold">SECURITY:</span>
              <p className="mt-1 leading-relaxed text-[#c4c7c7]">
                Strict NDA compliance, encrypted storage, and local off-grid archive backups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
