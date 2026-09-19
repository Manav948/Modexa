"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import KineticText from "@/components/motion/KineticText";
import MagneticButton from "@/components/motion/MagneticButton";
import HeroCreativeComposition from "./HeroCreativeComposition";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative w-full px-5 md:px-8 lg:px-12 pt-12 pb-24 overflow-hidden"
      style={{ backgroundColor: "#fbf9f3" }}
    >
      <div className="max-w-[1350px] mx-auto w-full">
      {/* Top metadata header strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 mb-12 border-b"
        style={{ borderColor: "#e4e2dd" }}
      >
        <div className="flex items-center gap-4">
          <span
            className="font-mono text-[10px] tracking-widest uppercase text-[#b6240f] font-bold"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            [ARCHIVE INDEX 2026.4]
          </span>
          <span
            className="hidden sm:inline font-mono text-[10px] text-[#747878]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            / ATELIER SPECIFICATION VOL. VII
          </span>
        </div>
        <div
          className="flex items-center gap-2 font-mono text-[10px] text-[#747878]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#b6240f]" />
          <span className="tracking-wider">TACTILE DIRECTION PRACTICES</span>
        </div>
      </motion.div>

      {/* Main editorial grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: typographic stack */}
        <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-8">
          <div>
            {/* Discipline badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f0eee8] font-mono text-[10px] text-[#747878] mb-6 uppercase tracking-widest"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span>DISCIPLINE COMBINATORIAL</span>
              <span className="text-[#b6240f]">•</span>
              <span>SINGLE STEWARD</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[#1b1c18] tracking-tight leading-[0.95] mb-8"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(3rem, 7vw, 5.25rem)",
                lineHeight: "0.95",
                fontWeight: 400,
              }}
            >
              ONE CREATIVE DIRECTION.
              <br />
              <span className="italic font-normal text-[#b6240f]">MANY WAYS TO BUILD.</span>
            </motion.h1>

            {/* Kinetic typography */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-8"
            >
              <KineticText />
            </motion.div>

            {/* Body text */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-xl mb-12"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: "1.875rem",
                letterSpacing: "-0.01em",
                color: "#747878",
              }}
            >
              One Creative Director coordinating a specialized network of video directors,
              UI/UX architects, WebGL engineers, graphic designers, and marketing strategists—binding
              motion, code, and editorial typography into one clear physical cadence.
            </motion.p>
          </div>

          {/* CTA area */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-6 pt-4"
          >
            <MagneticButton href="#inquiry-station" id="hero-cta-btn">
              <span className="relative z-10 font-bold">START A PROJECT</span>
              <span className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </MagneticButton>

            <div
              className="hidden sm:flex flex-col font-mono text-[10px] text-[#747878]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span>AVG RESPONSE &lt; 24H</span>
              <span>DIRECTOR REVIEW</span>
            </div>
          </motion.div>
        </div>

        {/* Right column: Interactive creative installation */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <HeroCreativeComposition />
        </motion.div>
      </div>
      </div>
    </section>
  );
}
