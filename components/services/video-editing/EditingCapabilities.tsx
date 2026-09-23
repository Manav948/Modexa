"use client";

import { motion } from "framer-motion";

const CAPABILITIES = [
  { num: "01", title: "Short-Form", desc: "Reels, social clips and fast-moving content built to hold attention.", badge: "SOCIAL / MOTION" },
  { num: "02", title: "Long-Form", desc: "YouTube, branded content and longer narratives shaped around structure and pacing.", badge: "NARRATIVE / SERIES" },
  { num: "03", title: "Motion", desc: "Titles, transitions and visual movement that support the story rather than distract from it.", badge: "TYPE / MOVEMENT" },
  { num: "04", title: "Storytelling", desc: "Cuts that create rhythm, emotion and a reason to keep watching.", badge: "RHYTHM / PURPOSE" },
];

export default function EditingCapabilities() {
  return (
    <section
      id="capabilities"
      className="w-full px-5 md:px-8 lg:px-12 py-24 border-t"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#e4e2dd] gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] uppercase tracking-widest mb-2 font-bold line-reveal">
              <span>02 / CAPABILITIES</span>
              <span className="w-4 h-px bg-[#b6240f]" />
              <span>VIDEO EDITING</span>
            </div>
            <h2
              className="text-[#1b1c18] uppercase tracking-tight text-reveal"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 400,
              }}
            >
              What We Edit
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#747878] uppercase tracking-wider font-bold line-reveal">
            [RHYTHM / PACING / STORY]
          </span>
        </div>

        {/* Interactive Tabular Directory */}
        <div className="flex flex-col border-b border-[#e4e2dd]">
          {CAPABILITIES.map((item) => (
            <motion.div
              key={item.num}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
              className="group py-6 border-t border-[#e4e2dd] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#fbf9f3] transition-colors px-4 cursor-pointer"
            >
              <div className="flex items-start md:items-center gap-6">
                <span className="font-mono text-[12px] text-[#b6240f] font-bold">
                  {item.num}
                </span>
                <div>
                  <h3
                    className="text-[#1b1c18] group-hover:text-[#b6240f] uppercase transition-colors text-xl md:text-2xl"
                    style={{ fontFamily: "'Newsreader', Georgia, serif", fontWeight: 400 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#747878] text-sm mt-1"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 md:pt-0">
                <span className="font-mono text-[10px] text-[#747878] uppercase tracking-widest hidden lg:inline font-semibold">
                  {item.badge}
                </span>
                <span className="font-mono text-[14px] text-[#b6240f] group-hover:translate-x-2 transition-transform font-bold">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
