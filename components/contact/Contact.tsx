"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const DISCIPLINES = [
  "VIDEO DIRECTION",
  "UI / UX ARCHITECTURE",
  "WEBGL & TECH",
  "BRANDING SYSTEM",
  "CAMPAIGN NARRATIVE",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleDiscipline = (d: string) => {
    setSelectedDisciplines((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="inquiry-station"
      ref={sectionRef}
      className="relative w-full px-5 md:px-8 lg:px-12 py-24"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Info */}
        <motion.div
          className="lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <div
              className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-widest mb-3"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              08 / INTAKE
            </div>
            <h2
              className="text-[#1b1c18] leading-tight mb-6"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                lineHeight: "2.75rem",
                letterSpacing: "-0.015em",
                fontWeight: 400,
              }}
            >
              INITIATE A DIRECT
              <br />
              <span className="italic">COMMISSION.</span>
            </h2>
            <p
              className="max-w-md mb-8"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.9375rem",
                lineHeight: "1.625rem",
                color: "#747878",
              }}
            >
              Tell us regarding your mandate, timeline constraints, and required
              disciplines. All initial correspondence is assessed personally by
              our Creative Director.
            </p>

            <div
              className="flex flex-col gap-3 font-mono text-[10px] text-[#747878] pb-8"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#b6240f]">
                  location_on
                </span>
                <span className="text-[#1b1c18]">NYC: 40.7128° N, 74.0060° W</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#b6240f]">
                  location_on
                </span>
                <span className="text-[#1b1c18]">PARIS: 48.8566° N, 2.3522° E</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#b6240f]">
                  verified
                </span>
                <span className="text-[#1b1c18]">DIRECTOR AVAILABILITY: CONFIRMED FOR Q3/Q4</span>
              </div>
            </div>

            {/* Direct email link */}
            <a
              href="mailto:hello@studiodirection.com"
              className="inline-flex items-center gap-3 group"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span
                className="font-mono text-[11px] tracking-wider uppercase text-[#1b1c18] group-hover:text-[#b6240f] transition-colors"
              >
                hello@studiodirection.com →
              </span>
            </a>
          </div>

          {/* Verification seal */}
          <div
            className="w-36 h-36 rounded-full border-2 border-dashed flex flex-col items-center justify-center p-3 text-center mt-8 select-none pointer-events-none"
            style={{
              borderColor: "rgba(182,36,15,0.4)",
              transform: "rotate(-6deg)",
            }}
          >
            <span
              className="font-mono text-[8px] tracking-widest text-[#b6240f] uppercase font-bold"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              DIRECTION VERIFIED
            </span>
            <span
              className="text-[#b6240f] leading-none py-1"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 500,
              }}
            >
              2026
            </span>
            <span
              className="font-mono text-[7px] tracking-wider text-[#b6240f] uppercase"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              ATELIER SEAL
            </span>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          className="lg:col-span-7 p-8 md:p-12 border shadow-sm"
          style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 py-16 text-center">
              <div
                className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-widest"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                TRANSMISSION RECEIVED
              </div>
              <h3
                className="text-[#1b1c18]"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                Director review within 24h.
              </h3>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.875rem",
                  color: "#747878",
                }}
              >
                Or reach us directly at{" "}
                <a href="mailto:hello@studiodirection.com" className="text-[#b6240f] underline">
                  hello@studiodirection.com
                </a>
              </p>
            </div>
          ) : (
            <form
              id="inquiry-form"
              className="space-y-8"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label
                    className="font-mono text-[10px] uppercase text-[#747878] font-bold mb-2"
                    htmlFor="name"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    01. PRINCIPAL IDENTIFIER / NAME
                  </label>
                  <input
                    className="bg-transparent border-b focus:outline-none py-2 transition-colors"
                    style={{
                      borderColor: "#747878",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.9375rem",
                      color: "#1b1c18",
                    }}
                    id="name"
                    placeholder="e.g. Helena Vance"
                    required
                    type="text"
                    onFocus={(e) => (e.target.style.borderColor = "#1b1c18")}
                    onBlur={(e) => (e.target.style.borderColor = "#747878")}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-mono text-[10px] uppercase text-[#747878] font-bold mb-2"
                    htmlFor="email"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    02. TRANSMISSION CHANNEL / EMAIL
                  </label>
                  <input
                    className="bg-transparent border-b focus:outline-none py-2 transition-colors"
                    style={{
                      borderColor: "#747878",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.9375rem",
                      color: "#1b1c18",
                    }}
                    id="email"
                    placeholder="e.g. hvance@studio.org"
                    required
                    type="email"
                    onFocus={(e) => (e.target.style.borderColor = "#1b1c18")}
                    onBlur={(e) => (e.target.style.borderColor = "#747878")}
                  />
                </div>
              </div>

              {/* Discipline chips */}
              <div className="flex flex-col">
                <label
                  className="font-mono text-[10px] uppercase text-[#747878] font-bold mb-3"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  03. REQUIRED DISCIPLINES (SELECT MULTIPLE)
                </label>
                <div className="flex flex-wrap gap-2">
                  {DISCIPLINES.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDiscipline(d)}
                      className="px-3 py-1.5 border font-mono text-[11px] uppercase tracking-wider transition-colors"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        backgroundColor: selectedDisciplines.includes(d)
                          ? "#b6240f"
                          : "#fbf9f3",
                        color: selectedDisciplines.includes(d)
                          ? "#ffffff"
                          : "#1b1c18",
                        borderColor: selectedDisciplines.includes(d)
                          ? "#b6240f"
                          : "#e4e2dd",
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label
                  className="font-mono text-[10px] uppercase text-[#747878] font-bold mb-2"
                  htmlFor="message"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  04. MANDATE SYNOPSIS & TARGET HORIZON
                </label>
                <textarea
                  className="bg-transparent border-b focus:outline-none py-2 transition-colors resize-none"
                  style={{
                    borderColor: "#747878",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.9375rem",
                    color: "#1b1c18",
                  }}
                  id="message"
                  placeholder="Describe project scale, target debut, and core creative friction..."
                  required
                  rows={4}
                  onFocus={(e) => (e.target.style.borderColor = "#1b1c18")}
                  onBlur={(e) => (e.target.style.borderColor = "#747878")}
                />
              </div>

              {/* Submit */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span
                  className="font-mono text-[10px] text-[#747878] uppercase tracking-wider"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  SECURE TRANSMISSION ENCRYPTED
                </span>
                <button
                  id="submit-btn"
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 font-mono text-[11px] tracking-widest uppercase transition-colors flex items-center justify-center gap-4 magnetic-btn"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    backgroundColor: "#1b1c18",
                    color: "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = "#b6240f";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = "#1b1c18";
                  }}
                >
                  <span>DISPATCH INQUIRY</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
