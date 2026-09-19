"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  id: string;
  num: string;
  tagline: string;
  title: string;
  category: string;
  specs: string;
  image: string;
  overlayBadge?: string;
  overlaySubtext?: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    num: "01",
    tagline: "■ FEATURED COMMISSION // 01",
    title: "CODEVERSE PLATFORM",
    category: "Full Platform Architecture & Design System",
    specs: "DIGITAL PLATFORM • UI/UX • DEV | 2026",
    image: "/images/work_codeverse_platform_1789796324968.png",
    overlayBadge: "DELIVERED: FULL PLATFORM ARCHITECTURE + DESIGN SYSTEM",
  },
  {
    id: "02",
    num: "02",
    tagline: "02 // KINETIC BRANDING",
    title: "MOTION STORIES",
    category: "Kinetic Typography & Brand Films",
    specs: "VIDEO / SOCIAL | 2026",
    image: "/images/work_motion_stories_1789796354503.png",
    overlayBadge: "VIDEO DIRECTION",
  },
  {
    id: "03",
    num: "03",
    tagline: "03 // IMMERSIVE ARCHITECTURE",
    title: "ARCLAB SPATIAL",
    category: "3D Web Experience & Spatial Pavilion",
    specs: "WEB EXPERIENCE | 2026",
    image: "/images/work_arclab_spatial_1789796381832.png",
    overlayBadge: "WEB EXPERIENCE",
  },
  {
    id: "04",
    num: "04",
    tagline: "CASE STUDY // 04",
    title: "VANGUARD HARDWARE OS",
    category: "Industrial Instrument Operating System",
    specs: "HARDWARE OS • TELEMETRY | 2026",
    image: "/images/work_vanguard_hardware_1789796410306.png",
    overlayBadge: "VANGUARD HARDWARE OS",
    overlaySubtext: "Industrial instrument operating system & composition dashboard",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative w-full px-5 md:px-8 lg:px-12 py-24 border-t"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
    >
      {/* Header matching reference screenshot 1 */}
      <div
        className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b"
        style={{ borderColor: "#e4e2dd" }}
      >
        <div>
          {/* Top Tagline with sleeping-underneath mask reveal */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              [ SELECTED COMMISSIONS ]
            </motion.div>
          </div>

          {/* Main Title with sleeping-underneath mask reveal */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-[#1b1c18] font-bold tracking-tight uppercase"
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: "0.95",
              }}
            >
              CURATED WORK
            </motion.h2>
          </div>
        </div>

        {/* Top Right Filter links */}
        <div className="overflow-hidden mt-4 md:mt-0">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex items-center gap-4 font-mono text-[11px] text-[#747878]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="uppercase tracking-wider">FILTERS:</span>
            {["ALL", "2024 — 2026"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`transition-colors uppercase tracking-widest ${
                  activeFilter === filter ? "text-[#b6240f] font-bold" : "hover:text-[#1b1c18]"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Grid Layout matching reference screenshot */}
      <div className="flex flex-col gap-16">
        {/* ========================================================
            FEATURED COMMISSION // 01 (Large Top Showcase)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="group cursor-pointer flex flex-col gap-4"
          onMouseEnter={() => setHoveredProject("01")}
          onMouseLeave={() => setHoveredProject(null)}
        >
          {/* Top metadata strip */}
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span
              className="text-[#b6240f] font-bold tracking-wider uppercase"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {PROJECTS[0].tagline}
            </span>
            <span
              className="text-[#747878] tracking-widest uppercase"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {PROJECTS[0].specs}
            </span>
          </div>

          {/* Title sleeping-underneath reveal */}
          <div className="overflow-hidden">
            <h3
              className="text-[#1b1c18] font-bold uppercase transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-[#b6240f]"
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: "1.0",
                letterSpacing: "-0.02em",
              }}
            >
              {PROJECTS[0].title}
            </h3>
          </div>

          {/* Large Image / Video Media Container */}
          <div
            className="relative w-full overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-2xl"
            style={{ aspectRatio: "16/9", borderColor: "#e4e2dd" }}
          >
            <img
              src={PROJECTS[0].image}
              alt={PROJECTS[0].title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Hover Video / Motion Simulation Overlay */}
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 flex items-center justify-center ${
                hoveredProject === "01" ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Animated scanline / pulse effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-70" />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-[#b6240f] text-white shadow-xl animate-bounce">
                  <span className="font-mono text-xl">▶</span>
                </div>
                <span
                  className="font-mono text-[11px] text-white uppercase tracking-widest font-bold bg-[#1b1c18] px-3 py-1"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  PLAY MOTION PREVIEW
                </span>
              </div>
            </div>

            {/* Bottom Left Overlay Badge matching screenshot */}
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/95 backdrop-blur border border-[#e4e2dd] font-mono text-[10px] text-[#1b1c18] font-bold uppercase tracking-wider shadow-lg">
              {PROJECTS[0].overlayBadge}
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            ROW 2: TWO COLUMNS SIDE BY SIDE (02 & 03)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Item 02: MOTION STORIES */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="group cursor-pointer flex flex-col gap-3"
            onMouseEnter={() => setHoveredProject("02")}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span
                className="text-[#747878] font-bold tracking-wider uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {PROJECTS[1].tagline}
              </span>
              <span
                className="text-[#747878] tracking-wider uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {PROJECTS[1].specs}
              </span>
            </div>

            {/* Title sleeping-underneath reveal */}
            <div className="overflow-hidden">
              <h3
                className="text-[#1b1c18] font-bold uppercase transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#b6240f]"
                style={{
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.01em",
                }}
              >
                {PROJECTS[1].title}
              </h3>
            </div>

            {/* Media Box */}
            <div
              className="relative w-full overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-xl"
              style={{ aspectRatio: "4/3", borderColor: "#e4e2dd" }}
            >
              <img
                src={PROJECTS[1].image}
                alt={PROJECTS[1].title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover Video Simulation */}
              <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 flex items-center justify-center ${
                  hoveredProject === "02" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#b6240f] text-white flex items-center justify-center shadow-lg">
                  <span className="font-mono text-lg">▶</span>
                </div>
              </div>

              {/* Top Right Overlay Badge matching reference image */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#1b1c18] text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                {PROJECTS[1].overlayBadge}
              </div>
            </div>
          </motion.div>

          {/* Item 03: ARCLAB SPATIAL */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="group cursor-pointer flex flex-col gap-3"
            onMouseEnter={() => setHoveredProject("03")}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span
                className="text-[#747878] font-bold tracking-wider uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {PROJECTS[2].tagline}
              </span>
              <span
                className="text-[#747878] tracking-wider uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {PROJECTS[2].specs}
              </span>
            </div>

            {/* Title sleeping-underneath reveal */}
            <div className="overflow-hidden">
              <h3
                className="text-[#1b1c18] font-bold uppercase transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#b6240f]"
                style={{
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.01em",
                }}
              >
                {PROJECTS[2].title}
              </h3>
            </div>

            {/* Media Box */}
            <div
              className="relative w-full overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-xl"
              style={{ aspectRatio: "4/3", borderColor: "#e4e2dd" }}
            >
              <img
                src={PROJECTS[2].image}
                alt={PROJECTS[2].title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover Video Simulation */}
              <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 flex items-center justify-center ${
                  hoveredProject === "03" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#b6240f] text-white flex items-center justify-center shadow-lg">
                  <span className="font-mono text-lg">▶</span>
                </div>
              </div>

              {/* Top Right Overlay Badge matching reference image */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-[#1b1c18] text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                {PROJECTS[2].overlayBadge}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================
            ROW 3: FULL WIDTH CASE STUDY // 04 (VANGUARD HARDWARE OS)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="group cursor-pointer flex flex-col gap-4 mt-4"
          onMouseEnter={() => setHoveredProject("04")}
          onMouseLeave={() => setHoveredProject(null)}
        >
          {/* Media Box with Overlay Badge matching reference image 1 */}
          <div
            className="relative w-full overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-2xl"
            style={{ aspectRatio: "21/9", borderColor: "#e4e2dd" }}
          >
            <img
              src={PROJECTS[3].image}
              alt={PROJECTS[3].title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Hover Video Simulation Scanline */}
            <div
              className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-500 flex items-center justify-center ${
                hoveredProject === "04" ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-[#b6240f] text-white flex items-center justify-center shadow-lg">
                  <span className="font-mono text-xl">▶</span>
                </div>
                <span
                  className="font-mono text-[10px] text-white uppercase tracking-widest font-bold"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  LIVE TELEMETRY FEED
                </span>
              </div>
            </div>

            {/* Bottom Left Overlay Card matching reference image 1 */}
            <div className="absolute bottom-6 left-6 p-4 bg-white/95 backdrop-blur border border-[#e4e2dd] flex flex-col gap-1 max-w-md shadow-xl">
              <span
                className="font-mono text-[9px] text-[#b6240f] font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {PROJECTS[3].tagline}
              </span>
              <h4
                className="text-[#1b1c18] font-bold uppercase text-lg leading-tight"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                {PROJECTS[3].overlayBadge}
              </h4>
              <p
                className="text-[#747878] text-[12px] leading-snug"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {PROJECTS[3].overlaySubtext}
              </p>
            </div>

            {/* Bottom Right Button matching reference image 1 */}
            <div className="absolute bottom-6 right-6 px-4 py-2 bg-[#1b1c18] text-white font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg group-hover:bg-[#b6240f] transition-colors">
              <span>VIEW ARCHITECTURE</span>
              <span>▾</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
