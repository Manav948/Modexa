"use client";

import Link from "next/link";

import StartProjectButton from "@/components/motion/StartProjectButton";

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
            <span>05 / START A PROJECT</span>
            <span className="w-4 h-px bg-[#E7472E]" />
            <span>DIGITAL MARKETING</span>
          </div>

          {/* Headline */}
          <h2
            className="text-white uppercase leading-none tracking-tight mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
            }}
          >
            HAVE SOMETHING<br />
            <span
              className="italic font-normal text-[#f7f5ef] lowercase tracking-normal"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              worth saying?
            </span>
          </h2>

          <p
            className="text-[rgba(255,255,255,0.6)] max-w-2xl text-base md:text-lg leading-relaxed mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Tell us what you want people to notice. We&apos;ll shape the strategy, content and campaign around it.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16 font-mono text-[10px]" style={{ fontFamily: "'DM Mono', monospace" }}>
            <StartProjectButton theme="dark" href="mailto:hello@company.com?subject=Digital%20Marketing%20Project" />
            <Link
              href="/#services"
              className="px-6 py-4 border text-white tracking-widest uppercase transition-colors hover:border-white"
              style={{ borderColor: "#444" }}
            >
              BACK TO SERVICES
            </Link>
          </div>

          {/* Colophon */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t font-mono text-[10px]"
            style={{ borderColor: "#2a2a2a", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace" }}
          >
            <div>
              <span className="text-white font-bold">CAPABILITY:</span>
              <p className="mt-1 leading-relaxed text-[rgba(255,255,255,0.6)]">
                Strategy, content and creative direction.
              </p>
            </div>
            <div>
              <span className="text-white font-bold">FOCUS:</span>
              <p className="mt-1 leading-relaxed text-[rgba(255,255,255,0.6)]">
                Attention, connection and distribution.
              </p>
            </div>
            <div>
              <span className="text-white font-bold">OUTPUT:</span>
              <p className="mt-1 leading-relaxed text-[rgba(255,255,255,0.6)]">
                Content and campaigns ready for the right places.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
