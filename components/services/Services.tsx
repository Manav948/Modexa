"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ServiceItem {
  num: string;
  title: string;
  description: string;
  tags: string;
  image: string;
  spec: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "VIDEO EDITING & MOTION",
    description:
      "Dynamic cuts, color grading, spatial sound design, and promotional video assets designed to halt thumbs and communicate gravity.",
    tags: "COMMERCIAL • SOCIAL • PRODUCT",
    image: "/images/service_video_motion_1789796437874.png",
    spec: "ASPECT RATIO 16:9 // 4K 60FPS PRORES",
  },
  {
    num: "02",
    title: "UI / UX PRODUCT DESIGN",
    description:
      "High-utility interfaces, micro-interaction logic, comprehensive component libraries, and ergonomic mobile/desktop applications.",
    tags: "WEB APPS • MOBILE • DESIGN SYSTEMS",
    image: "/images/service_ui_ux_1789796467059.png",
    spec: "SYSTEM TOKENS // FIGMA & REACT",
  },
  {
    num: "03",
    title: "WEB & DIGITAL DEVELOPMENT",
    description:
      "Bespoke headless frontends, WebGL shaders, sub-second loading speeds, and robust CMS architectures built for scale.",
    tags: "TAILWIND • REACT • WEBGL • THREE",
    image: "/images/work_codeverse_platform_1789796324968.png",
    spec: "WEBGL CANVAS // TURBOPACK ENGINE",
  },
  {
    num: "04",
    title: "GRAPHIC DESIGN & BRANDING",
    description:
      "Distinctive identity systems, bespoke wordmarks, editorial packaging, and tactile collateral that command premium pricing.",
    tags: "IDENTITY • TYPOGRAPHY • PACKAGING",
    image: "/images/work_motion_stories_1789796354503.png",
    spec: "FOIL EMBOSS // VARIABLE TYPOGRAPHY",
  },
  {
    num: "05",
    title: "DIGITAL GROWTH & MARKETING",
    description:
      "Precision go-to-market engines, conversion-rate optimization, performance creative tests, and authentic community acquisition.",
    tags: "ACQUISITION • CRO • LAUNCH STRATEGY",
    image: "/images/work_vanguard_hardware_1789796410306.png",
    spec: "PERFORMANCE MODEL // METRICS DASH",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cardPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateCard = () => {
      if (previewRef.current) {
        // Smooth lerp follow
        cardPos.current.x += (mousePos.current.x + 220 - cardPos.current.x) * 0.12;
        cardPos.current.y += (mousePos.current.y - 140 - cardPos.current.y) * 0.12;
        previewRef.current.style.left = `${cardPos.current.x}px`;
        previewRef.current.style.top = `${cardPos.current.y}px`;
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
      className="relative w-full px-5 md:px-8 lg:px-12 py-24 border-t"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      {/* Section Header matching exact reference screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 items-start">
        <div className="lg:col-span-7">
          {/* Tagline mask reveal */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-widest"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              [ CAPABILITIES & RIGOR ]
            </motion.div>
          </div>

          {/* Main Title mask reveal */}
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
              SERVICES
            </motion.h2>
          </div>
        </div>

        {/* Right subhead quote */}
        <div className="lg:col-span-5 flex flex-col justify-end pt-2 lg:pt-0">
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="font-mono text-[11px] leading-relaxed uppercase text-[#747878] tracking-wider"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              NO PACKAGED COMMODITIES. EVERY ENGAGEMENT IS BESPOKE TO THE STRATEGIC GOAL.
            </motion.p>
          </div>
        </div>
      </div>

      {/* 5 Services List */}
      <div className="relative flex flex-col w-full border-t" style={{ borderColor: "#e4e2dd" }}>
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.num}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.1,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="service-row group relative py-10 border-b cursor-pointer transition-colors duration-300 hover:bg-[#f5f3ed]/60 px-3 md:px-4"
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
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {service.num}
                  </span>
                </div>

                {/* Title & Description with sleep-underneath mask */}
                <div className="flex flex-col gap-2">
                  <div className="overflow-hidden">
                    <h3
                      className="text-[#1b1c18] font-bold uppercase transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#b6240f]"
                      style={{
                        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                        fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                        lineHeight: "1.05",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <p
                    className="max-w-xl text-[#747878] transition-colors duration-300 group-hover:text-[#30312d]"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
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
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {service.tags}
                </span>

                {/* Circular Arrow Button matching reference screenshot */}
                <div
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:border-[#b6240f] group-hover:bg-[#b6240f] group-hover:text-white"
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
          </motion.div>
        ))}
      </div>

      {/* BIGGER Floating Cursor Preview Card with Distinct Images */}
      <div
        ref={previewRef}
        className="fixed pointer-events-none z-50 overflow-hidden border shadow-2xl transition-all duration-300 ease-out rounded-sm"
        style={{
          width: "420px",
          height: "270px",
          backgroundColor: "#1b1c18",
          borderColor: "#b6240f",
          opacity: activeService ? 1 : 0,
          transform: activeService ? "scale(1)" : "scale(0.85)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        }}
      >
        {activeService && (
          <div className="relative w-full h-full flex flex-col">
            {/* Image Preview Container */}
            <div className="relative w-full flex-1 overflow-hidden">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c18] via-transparent to-transparent opacity-80" />

              {/* Top Tag */}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1b1c18]/90 backdrop-blur border border-[#e4e2dd]/20 font-mono text-[9px] text-white uppercase tracking-widest">
                [ SPEC // {activeService.num} ]
              </div>

              {/* Live Pulsing Dot */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-[#b6240f] font-mono text-[9px] text-white uppercase tracking-widest font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE PREVIEW
              </div>
            </div>

            {/* Bottom Info Bar inside Card */}
            <div className="w-full px-4 py-3 bg-[#1b1c18] border-t border-[#30312d] flex items-center justify-between">
              <div>
                <div
                  className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-wider"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {activeService.title}
                </div>
                <div
                  className="font-mono text-[9px] text-[#747878] uppercase"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {activeService.spec}
                </div>
              </div>
              <span className="font-mono text-[11px] text-white">→</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
