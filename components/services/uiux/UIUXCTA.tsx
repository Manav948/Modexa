"use client";

export default function UIUXCTA() {
  return (
    <section
      id="uiux-mandate"
      className="relative w-full border-t py-28 overflow-hidden"
      style={{ backgroundColor: "#151515", borderColor: "#2a2a2a" }}
    >
      {/* Background imagery */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src="/images/service_ui_ux_1789796467059.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(100%)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #151515 30%, rgba(21,21,21,0.6))" }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-14">
        <div>
          {/* Label */}
          <div
            className="font-mono text-[9px] uppercase tracking-widest text-[#E7472E] font-bold mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            06 / START A PROJECT
          </div>

          {/* Heading */}
          <h2
            className="text-white leading-none tracking-tight mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            HAVE AN EXPERIENCE<br />
            <span
              className="italic font-normal tracking-normal"
              style={{ fontFamily: "'Newsreader', Georgia, serif", color: "#f7f5ef", fontSize: "0.85em" }}
            >
              worth designing?
            </span>
          </h2>

          <p
            className="text-[rgba(255,255,255,0.6)] max-w-xl text-base leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Bring the experience you&apos;re trying to shape. We&apos;ll design the system, map the interactions and make the next action clear.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16 font-mono text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>
            <a
              href="mailto:hello@company.com?subject=UI%2FUX%20Design%20Project"
              className="px-8 py-4 text-white tracking-widest uppercase inline-flex items-center gap-3 font-bold shadow-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#E7472E" }}
            >
              START A PROJECT
              <span>→</span>
            </a>
            <a
              href="/#services"
              className="px-6 py-4 border text-white tracking-widest uppercase transition-colors hover:border-white"
              style={{ borderColor: "#444" }}
            >
              BACK TO SERVICES
            </a>
          </div>

          {/* Colophon */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t font-mono text-[9px] uppercase"
            style={{ borderColor: "#2a2a2a", fontFamily: "'DM Mono', monospace" }}
          >
            <div>
                <span className="text-white font-bold">FOCUS:</span>
              <p className="mt-1 leading-relaxed text-[rgba(255,255,255,0.5)]">
                Clarity, structure and interaction from the first screen.
              </p>
            </div>
            <div>
                <span className="text-white font-bold">DELIVERABLES:</span>
              <p className="mt-1 leading-relaxed text-[rgba(255,255,255,0.5)]">
                Flows, screens, systems and prototypes ready to explore.
              </p>
            </div>
            <div>
                <span className="text-white font-bold">DIRECTION:</span>
              <p className="mt-1 leading-relaxed text-[rgba(255,255,255,0.5)]">
                A clear visual and interaction language for the product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
