"use client";

import Link from "next/link";

import StartProjectButton from "@/components/motion/StartProjectButton";

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
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] uppercase tracking-widest mb-4 font-bold line-reveal">
            <span>04 / START A PROJECT</span>
            <span className="w-4 h-px bg-[#b6240f]" />
            <span>GOT FOOTAGE?</span>
          </div>

          {/* Large-scale Editorial Headline matching Stitch specification */}
          <h2
            className="text-white uppercase leading-none tracking-tight mb-6 text-reveal"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
            }}
          >
            READY TO MAKE<br />
            <span
              className="italic font-normal text-[#fbf9f3] lowercase tracking-normal"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SOMETHING worth watching?
            </span>
          </h2>

          <p
            className="text-[#c4c7c7] max-w-2xl text-base md:text-lg leading-relaxed mb-8 text-reveal"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Bring us the footage, the idea or the first cut. We&apos;ll find the rhythm and shape the story.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16 font-mono text-[10px]">
            <StartProjectButton theme="dark" href="mailto:hello@company.com?subject=Video%20Editing%20Project" />
              <Link
                href="/#overview"
                className="px-6 py-4 border border-[#444748] hover:border-white text-white tracking-widest uppercase transition-colors"
              >
                <span>BACK TO SERVICES</span>
              </Link>
          </div>

          {/* Studio Technical Provenance Colophon Stamp */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#30312d] font-mono text-[10px] text-[#747878]">
            <div>
              <span className="text-white font-bold">CAPABILITY:</span>
              <p className="mt-1 leading-relaxed text-[#c4c7c7]">
                Short-form, long-form and motion-led storytelling.
              </p>
            </div>
            <div>
              <span className="text-white font-bold">FOCUS:</span>
              <p className="mt-1 leading-relaxed text-[#c4c7c7]">
                Rhythm, pacing, emotion and purpose.
              </p>
            </div>
            <div>
              <span className="text-white font-bold">OUTPUT:</span>
              <p className="mt-1 leading-relaxed text-[#c4c7c7]">
                Final work ready for its destination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
