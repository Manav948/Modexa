"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ServiceItem {
  num: string;
  slug: string;
  title: string;
  italicTitle?: string;
  description: string;
  tags: string;
  image: string;
  spec: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    slug: "video-editing",
    title: "VIDEO",
    italicTitle: "EDITING",
    description:
      "Short-form, long-form and motion-led storytelling built around rhythm, pacing and purpose.",
    tags: "SHORT-FORM • LONG-FORM • MOTION",
    image: "/images/service_video_motion_1789796437874.png",
    spec: "RHYTHM // PACING // PURPOSE",
  },
  {
    num: "02",
    slug: "ui-ux-design",
    title: "UI/UX",
    italicTitle: "DESIGN",
    description:
      "Interfaces and digital experiences designed around clarity, interaction and visual language.",
    tags: "PRODUCTS • WEB • SYSTEMS",
    image: "/images/service_ui_ux_1789796467059.png",
    spec: "CLARITY // INTERACTION // SYSTEMS",
  },
  {
    num: "03",
    slug: "digital-marketing",
    title: "DIGITAL",
    italicTitle: "MARKETING",
    description:
      "Content, campaigns and digital strategy designed to earn attention and keep it.",
    tags: "CONTENT • CAMPAIGNS • DISTRIBUTION",
    image: "/images/work_vanguard_hardware_1789796410306.png",
    spec: "ATTENTION // CONNECTION // REACH",
  },
  {
    num: "04",
    slug: "web-development",
    title: "WEB",
    italicTitle: "DEVELOPMENT",
    description:
      "Fast, interactive and thoughtful digital experiences built from design to deployment.",
    tags: "INTERACTIVE • PERFORMANCE • DEPLOYMENT",
    image: "/images/work_codeverse_platform_1789796324968.png",
    spec: "DESIGN // CODE // DELIVERY",
  },
];

const MotionLink = motion.create(Link);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cardPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Ultra-smooth cursor follow centering & lerp
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateCard = () => {
      if (previewRef.current) {
        // Centered directly under mouse (width 400px, height 250px -> offset -200px, -125px)
        const targetX = mousePos.current.x - 200;
        const targetY = mousePos.current.y - 125;

        cardPos.current.x += (targetX - cardPos.current.x) * 0.14;
        cardPos.current.y += (targetY - cardPos.current.y) * 0.14;

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
      id="services"
      ref={sectionRef}
      onMouseLeave={() => setActiveService(null)}
      className="relative w-full px-5 md:px-8 lg:px-12 py-24 border-t"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-350 mx-auto w-full">
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 items-start">
        <div className="lg:col-span-7">
          {/* Tagline mask reveal */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-widest"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              [ WHAT WE DO ]
            </motion.div>
          </div>

          {/* Main title reveal */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-[#1b1c18] tracking-tight leading-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 400,
              }}
            >
              WHAT WE
              <br />
              <span className="italic font-normal text-[#b6240f]">DO.</span>
            </motion.h2>
          </div>
        </div>

        {/* Right subhead quote */}
        <div className="lg:col-span-5 flex flex-col justify-end pt-2 lg:pt-0">
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-mono text-[11px] leading-relaxed uppercase text-[#747878] tracking-wider"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              CREATIVE AND DIGITAL CAPABILITIES BROUGHT TOGETHER AROUND ONE CLEAR DIRECTION.
            </motion.p>
          </div>
        </div>
      </div>

      {/* 5 Services List */}
      <div className="relative flex flex-col w-full border-t" style={{ borderColor: "#e4e2dd" }}>
        {SERVICES.map((service, i) => (
          <MotionLink
            key={service.num}
            href={`/services/${service.slug}`}
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.0,
              delay: 0.15 + i * 0.12,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="service-row group relative py-10 border-b cursor-pointer transition-colors duration-300 hover:bg-[#f5f3ed]/70 px-3 md:px-4"
            style={{ borderColor: "#e4e2dd" }}
            onMouseEnter={() => setActiveService(service)}
            onMouseLeave={() => setActiveService(null)}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Left Column: Number & Title & Paragraph */}
              <div className="md:col-span-8 flex items-start gap-4 md:gap-8">
                {/* Number */}
                <div className="overflow-hidden pt-1">
                  <span
                    className="font-mono text-[12px] text-[#747878] group-hover:text-[#b6240f] transition-colors duration-300 font-bold block"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {service.num}
                  </span>
                </div>

                {/* Service title and description */}
                <div className="flex flex-col gap-2">
                  <div className="overflow-hidden">
                    <h3
                      className="text-[#1b1c18] transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-[#b6240f]"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                        lineHeight: "1.1",
                        letterSpacing: "-0.015em",
                        fontWeight: 400,
                      }}
                    >
                      {service.title}{" "}
                      <span className="italic font-normal">{service.italicTitle}</span>
                    </h3>
                  </div>

                  <p
                    className="max-w-xl text-[#747878] transition-colors duration-300 group-hover:text-[#1b1c18]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      lineHeight: "1.5rem",
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Tags & Arrow Button */}
              <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0">
                <span
                  className="font-mono text-[10px] text-[#747878] uppercase tracking-widest group-hover:text-[#1b1c18] transition-colors"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {service.tags}
                </span>

                {/* Circular Arrow Button */}
                <div
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:border-[#b6240f] group-hover:bg-[#b6240f] group-hover:text-white shadow-sm"
                  style={{ borderColor: "#1b1c18", color: "#1b1c18" }}
                >
                  <span className="font-mono text-[14px] transition-transform duration-300 group-hover:rotate-45">
                    →
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom active line highlight */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#b6240f] transition-all duration-500 group-hover:w-full" />
          </MotionLink>
        ))}
      </div>

      {/* ULTRA-SMOOTH HOVER CURSOR FLOATING PREVIEW */}
      <div
        ref={previewRef}
        className="floating-preview fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          width: "400px",
          height: "250px",
          willChange: "transform",
          display: activeService ? "block" : "none",
        }}
      >
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div
              key={activeService.num}
              initial={{ scale: 0.85, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full h-full bg-[#1b1c18] border border-[#1b1c18] shadow-2xl rounded-none overflow-hidden flex flex-col"
              style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)" }}
            >
              {/* Image Preview Container */}
              <div className="relative w-full flex-1 overflow-hidden">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c18] via-transparent to-transparent opacity-80" />

                {/* Top Tag */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 bg-[#1b1c18]/90 backdrop-blur border border-[#e4e2dd]/20 font-mono text-[9px] text-white uppercase tracking-widest"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  [ SPEC // {activeService.num} ]
                </div>

                {/* Live Pulsing Dot */}
                <div
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-[#b6240f] font-mono text-[9px] text-white uppercase tracking-widest font-bold"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE PREVIEW
                </div>
              </div>

              {/* Bottom Info Bar inside Card */}
              <div className="w-full px-4 py-3 bg-[#1b1c18] border-t border-[#30312d] flex items-center justify-between">
                <div>
                  <div
                    className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-wider"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {activeService.title} {activeService.italicTitle}
                  </div>
                  <div
                    className="font-mono text-[9px] text-[#747878] uppercase"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {activeService.spec}
                  </div>
                </div>
                <span className="font-mono text-[11px] text-white">→</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </section>
  );
}
