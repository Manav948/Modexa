"use client";

import { motion } from "framer-motion";

const CAPABILITIES = [
  {
    num: "01",
    title: "Reels & Short Form",
    desc: "High-velocity pacing, retention hooks, platform-native 9:16 aspect ratio framing, visual rhythm.",
    badge: "TIKTOK / REELS / SHORTS",
  },
  {
    num: "02",
    title: "YouTube & Series Content",
    desc: "Paced storytelling, narrative retention engineering, chapter titles, custom graphical maps.",
    badge: "LONG FORM 4K",
  },
  {
    num: "03",
    title: "Podcasts & Multi-Camera Dialogues",
    desc: "Organic speaker switching, audio stem de-noising & leveling, dynamic cutaways and proof inserts.",
    badge: "MULTICAM AUDIO/VIDEO",
  },
  {
    num: "04",
    title: "In-Depth Interviews & Documentaries",
    desc: "Subtle emotional arcs, archival asset montages, textural sound beds, and respectful tempo.",
    badge: "NARRATIVE ARCHIVE",
  },
  {
    num: "05",
    title: "Motion Graphics & Kinetic Typography",
    desc: "Vector animations, bespoke title design, typographic overlays, lower-thirds with physical inertia.",
    badge: "AFTER EFFECTS & KINETICS",
  },
  {
    num: "06",
    title: "Content Repurposing & Omnichannel Slicing",
    desc: "Extracting 10+ high-engagement micro-stories from flagship keynote & podcast recordings.",
    badge: "CROSS-PLATFORM VALUE",
  },
  {
    num: "07",
    title: "Bespoke Captions & Spatial Sound Design",
    desc: "Sub-bass riser integration, mechanical foley, word-by-word kinetic typography with zero template feel.",
    badge: "AUDIO MASTERING",
  },
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
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] uppercase tracking-widest mb-2 font-bold">
              <span>04 / SCOPE OF DISCIPLINE</span>
              <span className="w-4 h-px bg-[#b6240f]" />
              <span>CAPABILITIES DIRECTORY</span>
            </div>
            <h2
              className="text-[#1b1c18] uppercase tracking-tight"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 400,
              }}
            >
              What I Edit
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#747878] uppercase tracking-wider font-bold">
            [FULL SPECTRUM MOTION CRAFT]
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
