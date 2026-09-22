"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PerformanceMandate() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 lg:py-32 px-5 md:px-10 lg:px-16 text-white border-y border-white/10 relative overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Subtle background ambient blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#e7472e]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Monumental Type Block */}
          <div className="lg:col-span-6">
            <span className="font-mono text-xs text-[#ffdad4] uppercase tracking-widest block mb-4 font-medium">
              ENGINEERING PRINCIPLE 01
            </span>
            <h2
              ref={headlineRef}
              className="font-display text-4xl sm:text-6xl md:text-7xl uppercase leading-[0.9] tracking-tighter text-white"
            >
              FAST
              <br />
              IS A
              <br />
              <span
                className="text-[#e7472e] italic font-editorial lowercase font-normal pr-2"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                feature.
              </span>
            </h2>
            <div className="w-24 h-1 bg-[#e7472e] mt-8" />
          </div>

          {/* Right Column: Editorial Argument & Pillars */}
          <div ref={contentRef} className="lg:col-span-6 flex flex-col gap-6 pt-2">
            <p className="font-display text-xl sm:text-2xl text-white/95 leading-snug">
              &ldquo;We reject JavaScript obesity, third-party script pollution, and lazy abstractions. Every byte is justified; every render loop is profiled.&rdquo;
            </p>
            <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed">
              Speed is not an afterthought benchmark score to patch before launch—it is the foundational aesthetic of respect for the user. When an interface responds instantaneously, cognitive load evaporates, and brand authority becomes undeniable.
            </p>

            {/* 3 Architectural Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/15 mt-2">
              <div>
                <span className="font-mono text-xs text-[#ffdad4] uppercase block font-semibold">
                  CLS &lt; 0.01
                </span>
                <h4 className="font-display text-sm uppercase text-white mt-1.5 font-bold">
                  Zero Layout Shift
                </h4>
                <p className="font-sans text-xs text-white/60 mt-1 leading-relaxed">
                  Containers enforce strict aspect ratios prior to asset delivery.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-[#ffdad4] uppercase block font-semibold">
                  TTFB &lt; 48MS
                </span>
                <h4 className="font-display text-sm uppercase text-white mt-1.5 font-bold">
                  Edge Dispatch
                </h4>
                <p className="font-sans text-xs text-white/60 mt-1 leading-relaxed">
                  Static caching and edge middleware deployed across 300+ PoPs.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-[#ffdad4] uppercase block font-semibold">
                  LCP &lt; 0.8S
                </span>
                <h4 className="font-display text-sm uppercase text-white mt-1.5 font-bold">
                  Asset Austerity
                </h4>
                <p className="font-sans text-xs text-white/60 mt-1 leading-relaxed">
                  AVIF picture sets with automated responsive resolution clipping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
