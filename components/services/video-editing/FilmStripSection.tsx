"use client";

import { motion } from "framer-motion";

const STRIP_FRAMES = [
  {
    frameNum: "FRAME 01",
    timecode: "00:01:12",
    title: "MOTION RHYTHM & LOGGING",
    desc: "Tactile sub-bass cut of speed.",
    image: "/images/work_motion_stories_1789796354503.png",
    aspect: "aspect-video",
  },
  {
    frameNum: "FRAME 02",
    timecode: "00:02:45",
    title: "CHROMA STRUCTURAL PASS",
    desc: "Acoustic grading of raw daylight.",
    image: "/images/work_arclab_spatial_1789796381832.png",
    aspect: "aspect-video",
  },
  {
    frameNum: "FRAME 03",
    timecode: "00:04:18",
    title: "VISCOELASTIC FINISHING PASS",
    desc: "Pacing master audio stems.",
    image: "/images/work_codeverse_platform_1789796324968.png",
    aspect: "aspect-video",
    badge: "MATCH CUT APPROVED",
  },
];

export default function FilmStripSection() {
  return (
    <section
      id="film-strip"
      className="w-full px-5 md:px-8 lg:px-12 py-20 border-t border-b border-dashed select-none"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#c4c7c7" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#e4e2dd] gap-4">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] uppercase tracking-widest mb-1.5 font-bold line-reveal">
              <span>03 / DIRECTORIAL HORIZON</span>
              <span className="w-4 h-px bg-[#b6240f]" />
              <span>PANORAMIC TIMELINE</span>
            </div>
            <h2
              className="text-[#1b1c18] uppercase tracking-tight text-reveal"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 700,
              }}
            >
              THE FILM STRIP
            </h2>
          </div>
          <div className="font-mono text-[10px] text-[#747878] uppercase tracking-widest line-reveal">
            <span>DRAG OR SCROLL HORIZONTALLY →</span>
          </div>
        </div>

        {/* Panoramic Horizontal Film Strip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STRIP_FRAMES.map((item) => (
            <motion.div
              key={item.frameNum}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col p-4 bg-[#fbf9f3] border border-[#e4e2dd] group cursor-pointer hover:border-[#1b1c18] transition-colors shadow-sm"
            >
              {/* Frame Meta Header */}
              <div className="flex items-center justify-between font-mono text-[9px] text-[#747878] mb-2 pb-1 border-b border-[#e4e2dd]">
                <span className="text-[#b6240f] font-bold">[{item.frameNum}]</span>
                <span>TIME CODE: {item.timecode}</span>
              </div>

              {/* Frame Media */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#1b1c18] mb-3 border border-[#e4e2dd]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />

                {item.badge && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#b6240f] text-white font-mono text-[8px] font-bold uppercase">
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <h3
                className="text-[#1b1c18] group-hover:text-[#b6240f] uppercase text-base md:text-lg font-bold transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item.title}
              </h3>
              <p
                className="text-[#747878] text-xs leading-snug mt-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
