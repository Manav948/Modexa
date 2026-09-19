"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  num: string;
  tagline: string;
  title: string;
  italicTitle?: string;
  category: string;
  specs: string;
  image: string;
  mobilePreview: string;
  overlayBadge?: string;
  overlaySubtext?: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    num: "01",
    tagline: "■ FEATURED COMMISSION // 01",
    title: "CODEVERSE",
    italicTitle: "PLATFORM Architecture",
    category: "Full Platform Architecture & Design System",
    specs: "DIGITAL PLATFORM • UI/UX • DEV | 2026",
    image: "/images/work_codeverse_platform_1789796324968.png",
    mobilePreview: "/images/work_codeverse_platform_1789796324968.png",
    overlayBadge: "DELIVERED: FULL PLATFORM ARCHITECTURE + DESIGN SYSTEM",
  },
  {
    id: "02",
    num: "02",
    tagline: "02 // KINETIC BRANDING",
    title: "MOTION",
    italicTitle: "STORIES Film System",
    category: "Kinetic Typography & Brand Films",
    specs: "VIDEO / SOCIAL | 2026",
    image: "/images/work_motion_stories_1789796354503.png",
    mobilePreview: "/images/work_motion_stories_1789796354503.png",
    overlayBadge: "VIDEO DIRECTION",
  },
  {
    id: "03",
    num: "03",
    tagline: "03 // IMMERSIVE ARCHITECTURE",
    title: "ARCLAB",
    italicTitle: "SPATIAL Pavilion",
    category: "3D Web Experience & Spatial Pavilion",
    specs: "WEB EXPERIENCE | 2026",
    image: "/images/work_arclab_spatial_1789796381832.png",
    mobilePreview: "/images/work_arclab_spatial_1789796381832.png",
    overlayBadge: "WEB EXPERIENCE",
  },
  {
    id: "04",
    num: "04",
    tagline: "CASE STUDY // 04",
    title: "VANGUARD",
    italicTitle: "HARDWARE OS",
    category: "Industrial Instrument Operating System",
    specs: "HARDWARE OS • TELEMETRY | 2026",
    image: "/images/work_vanguard_hardware_1789796410306.png",
    mobilePreview: "/images/work_vanguard_hardware_1789796410306.png",
    overlayBadge: "VANGUARD HARDWARE OS",
    overlaySubtext: "Industrial instrument operating system & composition dashboard",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const router = useRouter();

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const mousePos = useRef({ x: 0, y: 0 });
  const cardPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const openProject = (projectId: string) => {
    router.push(`/work/${projectId}`);
  };

  const handleProjectKeyDown = (event: React.KeyboardEvent, projectId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(projectId);
    }
  };

  // Ultra-smooth cursor follow centering & lerp
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateCard = () => {
      if (previewRef.current) {
        // Centered directly under mouse (width 280px, height 420px -> offset -140px, -210px)
        const targetX = mousePos.current.x - 140;
        const targetY = mousePos.current.y - 210;

        cardPos.current.x += (targetX - cardPos.current.x) * 0.12;
        cardPos.current.y += (targetY - cardPos.current.y) * 0.12;

        previewRef.current.style.transform = `translate3d(${cardPos.current.x}px, ${cardPos.current.y}px, 0px)`;
      }
      rafRef.current = requestAnimationFrame(updateCard);
    };
    rafRef.current = requestAnimationFrame(updateCard);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      onMouseLeave={() => setActiveProject(null)}
      className="relative w-full px-5 md:px-8 lg:px-12 py-24 border-t"
      style={{ backgroundColor: "#000000", borderColor: "#30312d" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
      {/* Header matching site-wide Newsreader serif typography */}
      <div
        className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b"
        style={{ borderColor: "#30312d" }}
      >
        <div>
          {/* Top Tagline mask reveal */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              [ SELECTED COMMISSIONS ]
            </motion.div>
          </div>

          {/* Main Title mask reveal in Newsreader serif */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-[#fbf9f3] tracking-tight leading-none"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 400,
              }}
            >
              CURATED WORK &amp;
              <br />
              <span className="italic font-normal text-[#b6240f]">COMMISSIONS.</span>
            </motion.h2>
          </div>
        </div>

        {/* Top Right Filter links */}
        <div className="overflow-hidden mt-4 md:mt-0">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex items-center gap-4 font-mono text-[11px] text-[#747878]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="uppercase tracking-wider">FILTERS:</span>
            {["ALL", "2024 — 2026"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`transition-colors uppercase tracking-widest ${
                  activeFilter === filter ? "text-[#b6240f] font-bold" : "hover:text-[#fbf9f3]"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Asymmetric Work Grid */}
      <div className="flex flex-col gap-16">
        {/* FEATURED COMMISSION // 01 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="group cursor-pointer flex flex-col gap-4"
          onMouseEnter={() => setActiveProject(PROJECTS[0])}
          onMouseLeave={() => setActiveProject(null)}
          onClick={() => openProject(PROJECTS[0].id)}
          onKeyDown={(event) => handleProjectKeyDown(event, PROJECTS[0].id)}
          role="link"
          tabIndex={0}
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

          {/* Title in Newsreader serif */}
          <div className="overflow-hidden">
            <h3
              className="text-[#fbf9f3] transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-[#b6240f]"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.015em",
                fontWeight: 400,
              }}
            >
              {PROJECTS[0].title}{" "}
              <span className="italic font-normal">{PROJECTS[0].italicTitle}</span>
            </h3>
          </div>

          {/* Large Image Container with internal parallax overflow-hidden */}
          <div
            className="relative w-full overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-2xl"
            style={{ aspectRatio: "16/9", borderColor: "#30312d" }}
          >
            <img
              src={PROJECTS[0].image}
              alt={PROJECTS[0].title}
              className="w-full h-[115%] -mt-[7.5%] object-cover object-center transition-all duration-700 ease-out"
            />

            {/* Dark Black Glass Blur Overlay on Hover */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

            {/* Bottom Left Overlay Badge */}
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-[#fbf9f3]/95 backdrop-blur border border-[#30312d] font-mono text-[10px] text-[#1b1c18] font-bold uppercase tracking-wider shadow-lg">
              {PROJECTS[0].overlayBadge}
            </div>
          </div>
        </motion.div>

        {/* ROW 2: TWO COLUMNS SIDE BY SIDE (02 & 03) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Item 02: MOTION STORIES */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="group cursor-pointer flex flex-col gap-3"
            onMouseEnter={() => setActiveProject(PROJECTS[1])}
            onMouseLeave={() => setActiveProject(null)}
            onClick={() => openProject(PROJECTS[1].id)}
            onKeyDown={(event) => handleProjectKeyDown(event, PROJECTS[1].id)}
            role="link"
            tabIndex={0}
          >
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

            <div className="overflow-hidden">
              <h3
                className="text-[#fbf9f3] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#b6240f]"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.015em",
                  fontWeight: 400,
                }}
              >
                {PROJECTS[1].title}{" "}
                <span className="italic font-normal">{PROJECTS[1].italicTitle}</span>
              </h3>
            </div>

            <div
              className="relative w-full overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-xl"
              style={{ aspectRatio: "4/3", borderColor: "#30312d" }}
            >
              <img
                src={PROJECTS[1].image}
                alt={PROJECTS[1].title}
                className="w-full h-[115%] -mt-[7.5%] object-cover object-center transition-all duration-700 ease-out"
              />
              {/* Dark Black Glass Blur Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <div className="absolute top-4 right-4 px-3 py-1 bg-[#30312d] text-[#fbf9f3] font-mono text-[9px] font-bold uppercase tracking-wider z-20">
                {PROJECTS[1].overlayBadge}
              </div>
            </div>
          </motion.div>

          {/* Item 03: ARCLAB SPATIAL */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="group cursor-pointer flex flex-col gap-3"
            onMouseEnter={() => setActiveProject(PROJECTS[2])}
            onMouseLeave={() => setActiveProject(null)}
            onClick={() => openProject(PROJECTS[2].id)}
            onKeyDown={(event) => handleProjectKeyDown(event, PROJECTS[2].id)}
            role="link"
            tabIndex={0}
          >
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

            <div className="overflow-hidden">
              <h3
                className="text-[#fbf9f3] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#b6240f]"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.015em",
                  fontWeight: 400,
                }}
              >
                {PROJECTS[2].title}{" "}
                <span className="italic font-normal">{PROJECTS[2].italicTitle}</span>
              </h3>
            </div>

            <div
              className="relative w-full overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-xl"
              style={{ aspectRatio: "4/3", borderColor: "#30312d" }}
            >
              <img
                src={PROJECTS[2].image}
                alt={PROJECTS[2].title}
                className="w-full h-[115%] -mt-[7.5%] object-cover object-center transition-all duration-700 ease-out"
              />
              {/* Dark Black Glass Blur Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <div className="absolute top-4 right-4 px-3 py-1 bg-[#30312d] text-[#fbf9f3] font-mono text-[9px] font-bold uppercase tracking-wider z-20">
                {PROJECTS[2].overlayBadge}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROW 3: FULL WIDTH CASE STUDY // 04 */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="group cursor-pointer flex flex-col gap-4 mt-4"
          onMouseEnter={() => setActiveProject(PROJECTS[3])}
          onMouseLeave={() => setActiveProject(null)}
          onClick={() => openProject(PROJECTS[3].id)}
          onKeyDown={(event) => handleProjectKeyDown(event, PROJECTS[3].id)}
          role="link"
          tabIndex={0}
        >
          <div
            className="relative w-full overflow-hidden border shadow-sm transition-all duration-500 group-hover:shadow-2xl"
            style={{ aspectRatio: "21/9", borderColor: "#30312d" }}
          >
            <img
              src={PROJECTS[3].image}
              alt={PROJECTS[3].title}
              className="w-full h-[115%] -mt-[7.5%] object-cover object-center transition-all duration-700 ease-out"
            />
            {/* Dark Black Glass Blur Overlay on Hover */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

            <div className="absolute bottom-6 left-6 p-4 bg-[#fbf9f3]/95 backdrop-blur border border-[#30312d] flex flex-col gap-1 max-w-md shadow-xl z-20">
              <span
                className="font-mono text-[9px] text-[#b6240f] font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {PROJECTS[3].tagline}
              </span>
              <h4
                className="text-[#1b1c18] text-xl leading-tight"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontWeight: 500,
                }}
              >
                {PROJECTS[3].title}{" "}
                <span className="italic font-normal text-[#b6240f]">
                  {PROJECTS[3].italicTitle}
                </span>
              </h4>
              <p
                className="text-[#747878] text-[12px] leading-snug"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {PROJECTS[3].overlaySubtext}
              </p>
            </div>
            <div className="absolute bottom-6 right-6 px-4 py-2 bg-[#30312d] text-[#fbf9f3] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg group-hover:bg-[#b6240f] transition-colors">
              <span>VIEW ARCHITECTURE</span>
              <span>▾</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ULTRA-SMOOTH SHARP FLOATING PREVIEW */}
      <div
        ref={previewRef}
        className="floating-preview fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          width: "280px",
          height: "420px",
          willChange: "transform",
          display: activeProject ? "block" : "none",
        }}
      >
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{ scale: 0.85, opacity: 0, y: 15, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 15, rotate: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="w-full h-full bg-[#1b1c18] border border-[#1b1c18] overflow-hidden flex flex-col shadow-2xl rounded-none"
              style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)" }}
            >
              {/* Top Studio Status Bar */}
              <div className="w-full px-4 py-2.5 bg-[#1b1c18] border-b border-[#30312d] flex items-center justify-between font-mono text-[9px] text-[#747878]">
                <div className="flex items-center gap-1.5 text-[#b6240f] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b6240f] animate-pulse" />
                  ARCHIVE PREVIEW
                </div>
                <span>[ {activeProject.num} // SPEC ]</span>
              </div>

              {/* Main Media Preview Container */}
              <div className="relative w-full flex-1 overflow-hidden">
                <img
                  src={activeProject.mobilePreview}
                  alt={activeProject.title}
                  className="w-full h-full object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c18] via-transparent to-black/30 opacity-90" />

                {/* Floating Play Indicator */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#1b1c18]/90 text-white flex items-center justify-center shadow-2xl border border-[#e4e2dd]/40 backdrop-blur">
                    <span className="font-mono text-base ml-0.5 text-[#b6240f]">▶</span>
                  </div>
                  <span
                    className="font-mono text-[9px] text-white font-bold tracking-widest uppercase bg-[#1b1c18]/90 px-3 py-1 border border-[#30312d]"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    PLAY REEL
                  </span>
                </div>

                {/* Bottom Info Overlay inside Box */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#1b1c18]/95 border border-[#30312d] flex flex-col gap-0.5">
                  <span
                    className="font-mono text-[8px] text-[#b6240f] font-bold uppercase tracking-wider"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {activeProject.tagline}
                  </span>
                  <div
                    className="text-white text-xs truncate"
                    style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                  >
                    {activeProject.title} {activeProject.italicTitle}
                  </div>
                </div>
              </div>

              {/* Bottom Specs Footer Bar */}
              <div className="w-full px-4 py-2 bg-[#1b1c18] border-t border-[#30312d] flex items-center justify-between font-mono text-[9px] text-[#747878]">
                <span>COMMISSION ARCHIVE</span>
                <span className="text-[#b6240f]">SELECT →</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </section>
  );
}
