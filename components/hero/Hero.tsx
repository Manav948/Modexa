"use client";

import { motion } from "framer-motion";
import KineticText from "@/components/motion/KineticText";
import StartProjectButton from "@/components/motion/StartProjectButton";
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
    <section id="overview" className="relative w-full px-5 md:px-8 lg:px-12 pt-12 pb-24 overflow-hidden" style={{ backgroundColor: "#fbf9f3" }}>
      <div className="max-w-[1350px] mx-auto w-full">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 mb-12 border-b" style={{ borderColor: "#e4e2dd" }}>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#747878]" style={{ fontFamily: "'DM Mono', monospace" }}>
            <span className="inline-block w-2 h-2 rounded-full bg-[#b6240f]" />
            <span className="tracking-wider">DESIGN / CONTENT / DEVELOPMENT / MARKETING</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-8">
            <div>
              <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f0eee8] font-mono text-[10px] text-[#747878] mb-6 uppercase tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
                <span>CREATIVE STUDIO</span><span className="text-[#b6240f]">•</span><span>01</span>
              </motion.div>

              <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} className="text-[#1b1c18] tracking-tight leading-[0.95] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 7vw, 5.25rem)", lineHeight: "0.95", fontWeight: 400 }}>
                WE MAKE
                <br />
                <span className="italic font-normal text-[#b6240f]">DIGITAL WORK MOVE.</span>
              </motion.h1>

              <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mb-8"><KineticText /></motion.div>

              <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp} className="max-w-xl mb-12" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem", lineHeight: "1.875rem", letterSpacing: "-0.01em", color: "#747878" }}>
                We bring design, content, technology and strategy together to create work that gets noticed and remembered.
              </motion.p>
            </div>

            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-6 pt-4">
              <StartProjectButton />
              <a href="#works" className="font-mono text-[10px] uppercase tracking-widest text-[#1b1c18] transition-colors hover:text-[#b6240f]" style={{ fontFamily: "'DM Mono', monospace" }}>EXPLORE OUR WORK →</a>
              <div className="hidden sm:flex flex-col font-mono text-[10px] text-[#747878]" style={{ fontFamily: "'DM Mono', monospace" }}><span>DESIGN / CONTENT / DEVELOPMENT</span><span>MARKETING</span></div>
            </motion.div>
          </div>

          <motion.div className="lg:col-span-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}><HeroCreativeComposition /></motion.div>
        </div>
      </div>
    </section>
  );
}
