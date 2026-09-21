"use client";

export default function DMCTA() {
  return (
    <section
      id="dm-initiation"
      className="relative w-full py-28 border-t overflow-hidden"
      style={{ backgroundColor: "#151515", borderColor: "#2a2a2a" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          src="/images/work_vanguard_hardware_1789796410306.png"
          alt=""
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/70 to-[#151515]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-14">
        <div className="max-w-4xl">
          {/* Sub-tag */}
          <div
            className="flex items-center gap-3 font-mono text-[10px] text-[#E7472E] uppercase tracking-widest mb-4 font-bold"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span>07 / MANDATE INITIATION</span>
            <span className="w-4 h-px bg-[#E7472E]" />
            <span>DIRECT COMMISSIONS</span>
          </div>

          {/* Headline */}
          <h2
            className="text-white uppercase leading-none tracking-tight mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
            }}
          >
            READY TO MAKE<br />
            <span
              className="italic font-normal text-[#f7f5ef] lowercase tracking-normal"
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            >
              something impossible to scroll past?
            </span>
          </h2>

          <p
            className="text-[rgba(255,255,255,0.6)] max-w-2xl text-base md:text-lg leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Bring the brief, the brand, or simply the ambition. We architect the strategy,
            produce the content, and deliver the campaigns that make your audience stop, watch, and act.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16 font-mono text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>
            <a
              href="mailto:hello@studiodirection.com?subject=Digital%20Marketing%20Commission"
              className="px-8 py-4 text-white tracking-widest uppercase inline-flex items-center gap-3 font-bold shadow-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#E7472E" }}
            >
              <span>START A CAMPAIGN</span>
              <span>→</span>
            </a>
            <a
              href="/#services"
              className="px-6 py-4 border text-white tracking-widest uppercase transition-colors hover:border-white"
              style={{ borderColor: "#444" }}
            >
              RETURN TO SERVICES
            </a>
          </div>

          {/* Colophon */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t font-mono text-[10px]"
            style={{ borderColor: "#2a2a2a", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace" }}
          >
            <div>
              <span className="text-white font-bold">TURNAROUND SLA:</span>
              <p className="mt-1 leading-relaxed text-[rgba(255,255,255,0.6)]">
                Strategy delivered within 5–7 business days of brief sign-off.
              </p>
            </div>
            <div>
              <span className="text-white font-bold">AVAILABILITY:</span>
              <p className="mt-1 leading-relaxed text-[rgba(255,255,255,0.6)]">
                Accepting 2 selective retainer accounts for Q3/Q4.
              </p>
            </div>
            <div>
              <span className="text-white font-bold">CONFIDENTIALITY:</span>
              <p className="mt-1 leading-relaxed text-[rgba(255,255,255,0.6)]">
                Full NDA compliance and secure brand asset management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
