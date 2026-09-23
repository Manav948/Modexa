"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ARCHIVE = [
  { ref: "01", title: "SOCIAL MEDIA", format: "Content / Platform Direction", year: "01", status: "SOCIAL" },
  { ref: "02", title: "CONTENT STRATEGY", format: "Editorial Direction / Planning", year: "02", status: "STRATEGY" },
  { ref: "03", title: "CAMPAIGN CREATIVE", format: "Concept / Visual Campaign", year: "03", status: "CAMPAIGN" },
  { ref: "04", title: "DIGITAL STRATEGY", format: "Audience / Content / Distribution", year: "04", status: "STRATEGY" },
  { ref: "05", title: "DISTRIBUTION", format: "Right Content / Right Places", year: "05", status: "REACH" },
];

export default function DMCampaignArchive() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".archive-row",
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: ".archive-row", start: "top 85%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dm-archive"
      className="w-full px-5 md:px-8 lg:px-14 py-24 border-t"
      style={{ backgroundColor: "#f0ede6", borderColor: "#E8E2D5" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E8E2D5]">
          <div
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#151515]"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className="text-[#E7472E] font-bold">06 / DIGITAL INDEX</span>
            <span className="text-[#55534E]">— SELECTED DIRECTIONS</span>
          </div>
          <span
            className="font-mono text-[10px] text-[#55534E] uppercase"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            ATTENTION / CONTENT / CONNECTION
          </span>
        </div>

        {/* Archival table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
            <thead>
              <tr className="text-[#55534E] border-b border-[#E8E2D5]">
                <th className="py-3 font-normal">REF.</th>
                <th className="py-3 font-normal">CAMPAIGN NAME</th>
                <th className="py-3 font-normal">DISCIPLINE & FORMAT</th>
                <th className="py-3 font-normal">YEAR</th>
                <th className="py-3 font-normal text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D5]">
              {ARCHIVE.map((row) => (
                <tr key={row.ref} className="archive-row hover:bg-[#f7f5ef] cursor-pointer group transition-colors">
                  <td className="py-4 text-[#E7472E] font-bold">[{row.ref}]</td>
                  <td className="py-4 text-[#151515] font-semibold group-hover:text-[#E7472E] transition-colors uppercase">
                    {row.title}
                  </td>
                  <td className="py-4 text-[#55534E]">{row.format}</td>
                  <td className="py-4 text-[#151515]">{row.year}</td>
                  <td className={`py-4 text-right font-bold ${row.status === "DELIVERED" ? "text-[#E7472E]" : "text-[#55534E]"}`}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
