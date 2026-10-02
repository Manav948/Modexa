"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const email = "modexa1819@gmail.com";
  const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent("New Project Inquiry // Modexa")}`;

  const copyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="inquiry-station"
      ref={sectionRef}
      className="relative w-full border-t border-[#e4e2dd] bg-[#ffffff] px-5 py-20 sm:py-28 md:px-8 lg:px-12"
      aria-label="Contact and project initiation"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start"
        >
          {/* Left Column: Heading & Core Editorial Statement */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Editorial Label */}
            <div
              className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#E7472E] font-bold sm:mb-6 sm:text-xs"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span className="h-px w-4 bg-[#E7472E]" />
              <span className="text-[#747878]">HAVE SOMETHING IN MIND?</span>
            </div>

            {/* Main Editorial Headline */}
            <h2
              className="font-display text-[clamp(2.75rem,6.5vw,5.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em] text-[#1b1c18]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              LET&apos;S MAKE
              <br />
              <span className="font-normal italic text-[#747878]">SOMETHING</span>
              <br />
              GOOD.
            </h2>

            {/* Supporting Copy */}
            <p
              className="mt-6 max-w-xl font-sans text-base leading-relaxed text-[#747878] sm:mt-8 sm:text-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Tell us what you&apos;re working on. We&apos;ll take a look and figure out what the project needs.
            </p>
          </div>

          {/* Right Column: Direct Contact & Action Dispatch */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch pt-2 lg:pt-14">
            <div className="flex flex-col gap-6">
              {/* Direct Studio Email with Interactive Hover */}
              <div>
                <span
                  className="block font-mono text-[10px] uppercase tracking-widest text-[#747878] mb-2"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  GET IN TOUCH
                </span>
                <div className="flex flex-col items-start gap-2">
                  <a
                    href={mailtoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-lg sm:text-xl font-medium text-[#1b1c18] transition-colors hover:text-[#E7472E]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    <span>{email}</span>
                    <span
                      aria-hidden="true"
                      className="text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="font-mono text-[10px] uppercase tracking-wider text-[#747878] hover:text-[#1b1c18] transition-colors"
                  >
                    {copied ? "✓ EMAIL COPIED" : "[ COPY EMAIL ]"}
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-4">
                <a
                  href={mailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-none bg-[#E7472E] px-8 py-4 font-mono text-xs uppercase tracking-widest text-white shadow-[0_8px_24px_-4px_rgba(231,71,46,0.3)] transition-all duration-300 hover:bg-[#1b1c18] hover:shadow-[0_12px_28px_-4px_rgba(27,28,24,0.3)]"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  <span>START A PROJECT</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* Studio Availability Telemetry */}
            <div
              className="mt-12 border-t border-[#e4e2dd] pt-6 font-mono text-[10px] uppercase tracking-wider text-[#747878]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <div className="flex items-center justify-between py-1">
                <span>PROJECTS</span>
                <span className="text-[#1b1c18] font-semibold">TELL US YOUR IDEA</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>NEXT STEP</span>
                <span className="text-emerald-700 font-semibold">START A CONVERSATION</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
