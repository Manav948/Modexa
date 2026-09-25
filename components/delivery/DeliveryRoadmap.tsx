"use client";

import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const PHASES = [
  {
    number: "01",
    title: "DISCOVER",
    body: "Understand the idea, audience and objective.",
    meta: "01 / CONTEXT",
  },
  {
    number: "02",
    title: "DEFINE",
    body: "Shape the direction, scope and creative approach.",
    meta: "02 / DIRECTION",
  },
  {
    number: "03",
    title: "CREATE",
    body: "Bring the right specialists and disciplines together.",
    meta: "03 / CRAFT",
  },
  {
    number: "04",
    title: "REFINE",
    body: "Review, iterate and sharpen the work.",
    meta: "04 / ITERATION",
  },
  {
    number: "05",
    title: "DELIVER",
    body: "Turn the final direction into something ready to use.",
    meta: "05 / OUTPUT",
  },
];

export default function DeliveryRoadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const railProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  return (
    <section
      id="delivery"
      ref={sectionRef}
      className="relative w-full px-5 md:px-8 lg:px-12 py-28 md:py-32 border-y"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              03 / DELIVERY
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#1b1c18] leading-[0.9]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(3.25rem, 8vw, 7.5rem)",
                fontWeight: 700,
              }}
            >
              FROM IDEA
              <br />
              <span className="text-[#b6240f]">TO OUTPUT.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 self-end max-w-lg font-body text-[0.9375rem] leading-7 text-[#747878]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The right creative team can change how an idea looks, feels and moves. We bring the right people and craft around one clear direction.
          </motion.p>
        </div>

        <div className="relative border-t" style={{ borderColor: "#e4e2dd" }}>
          <div
            className="absolute left-0 top-0 bottom-0 block w-px bg-[#e4e2dd]"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-[#b6240f]"
              style={{ scaleY: railProgress }}
              aria-hidden="true"
            />
          </div>
          {PHASES.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, x: -18 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.2 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-9 md:py-10 pl-6 md:pl-0 border-b transition-colors duration-300 hover:bg-[#f5f3ed]/50"
              style={{ borderColor: "#e4e2dd" }}
            >
              <div className="md:col-span-3 flex flex-col items-start gap-3 md:pl-6">
                <span
                  className="font-mono text-[10px] text-[#b6240f] font-bold tracking-wider"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  PHASE {phase.number}
                </span>
                <h3
                  className="text-[#1b1c18] leading-[0.95] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#b6240f]"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(1.05rem, 1.8vw, 1.5rem)",
                    fontWeight: 700,
                  }}
                >
                  {phase.title}
                </h3>
              </div>
              <p
                className="md:col-span-6 max-w-xl text-[#747878] text-[0.8125rem] leading-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {phase.body}
              </p>
              <span
                className="md:col-span-3 md:text-right self-start font-mono text-[9px] text-[#747878] uppercase tracking-wider leading-5"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {phase.meta}
              </span>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b6240f] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}