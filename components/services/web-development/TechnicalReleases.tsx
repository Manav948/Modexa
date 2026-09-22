"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechnicalReleases() {
  const sectionRef = useRef<HTMLElement>(null);
  const case1Ref = useRef<HTMLDivElement>(null);
  const case2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [case1Ref.current, case2Ref.current].forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 lg:py-28 px-5 md:px-10 lg:px-16 border-t"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-4 border-b border-[#e4e2dd]">
        <div>
          <span className="font-mono text-xs text-[#e7472e] uppercase tracking-widest block mb-2 font-medium">
            SECTION 05 // PRODUCTION ARCHIVE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#1b1c18]">
            TECHNICAL RELEASES
          </h2>
        </div>
        <span className="font-mono text-xs text-[#747878] uppercase tracking-wider mt-2 md:mt-0 font-medium">
          VERIFIED REPOSITORIES [2025–2026]
        </span>
      </div>

      {/* Case Studies Exhibition Grid */}
      <div className="flex flex-col gap-16 lg:gap-24">
        {/* Case 01: Horology WebGL Simulation */}
        <div
          ref={case1Ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-16 lg:pb-20 border-b border-[#e4e2dd]"
        >
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/10] bg-[#f0eee8] relative overflow-hidden group shadow-md border border-[#e4e2dd]">
              <Image
                src="/images/kronos_watch.png"
                alt="Kronos Haute Horlogerie 3D WebGL Dial simulation"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#151515] text-white px-3 py-1 font-mono text-[10px] md:text-[11px] uppercase tracking-wider">
                CASE 01 // WEBGL REALTIME
              </div>
              <div className="absolute bottom-4 right-4 bg-[#fbf9f3]/90 backdrop-blur-md px-3 py-1.5 font-mono text-[10px] md:text-[11px] text-[#1b1c18] border border-[#e4e2dd]">
                60 FPS SHADER DYNAMICS
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-mono text-xs text-[#e7472e] uppercase tracking-widest block mb-2 font-medium">
              CLIENT: KRONOS GENEVE // WATCH ARCHITECTURE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase text-[#1b1c18] leading-tight mb-4">
              KRONOS HAUTE HORLOGERIE
            </h3>
            <p className="font-sans text-sm md:text-base text-[#444748] mb-6 leading-relaxed">
              An interactive 3D digital flagship featuring custom WebGL shaders, camera path bezier trajectories bound to inertial scroll, and dynamic metallic anisotropic lighting simulations running at 60 FPS on mobile silicon.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-[11px] text-[#1b1c18] uppercase mb-8">
              <span className="bg-[#e4e2dd] px-2.5 py-1">THREE.JS</span>
              <span className="bg-[#e4e2dd] px-2.5 py-1">GLSL SHADERS</span>
              <span className="bg-[#e4e2dd] px-2.5 py-1">NEXT.JS APP ROUTER</span>
              <span className="bg-[#e4e2dd] px-2.5 py-1">LENIS VIRTUAL SCROLL</span>
            </div>

            <div>
              <a
                href="#inquiry-station"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#e7472e] uppercase tracking-widest hover:underline group font-bold"
              >
                <span>EXPLORE ARCHITECTURAL BREAKDOWN</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Case 02: Realtime OS Environment */}
        <div
          ref={case2Ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <span className="font-mono text-xs text-[#e7472e] uppercase tracking-widest block mb-2 font-medium">
              CLIENT: NEURA SYSTEMS // DISTRIBUTED OS
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase text-[#1b1c18] leading-tight mb-4">
              NEURA OPERATING ENVIRONMENT
            </h3>
            <p className="font-sans text-sm md:text-base text-[#444748] mb-6 leading-relaxed">
              A high-throughput browser workspace built for machine intelligence orchestration. Engineered with virtualized infinite tree hierarchies, custom Web Workers for background telemetry crunching, and sub-10ms keyboard-driven command palette execution.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-[11px] text-[#1b1c18] uppercase mb-8">
              <span className="bg-[#e4e2dd] px-2.5 py-1">TYPESCRIPT STRICT</span>
              <span className="bg-[#e4e2dd] px-2.5 py-1">WEB WORKERS</span>
              <span className="bg-[#e4e2dd] px-2.5 py-1">VIRTUALIZED DOM</span>
              <span className="bg-[#e4e2dd] px-2.5 py-1">WEBSOCKET MULTIPLEX</span>
            </div>

            <div>
              <a
                href="#inquiry-station"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#e7472e] uppercase tracking-widest hover:underline group font-bold"
              >
                <span>READ INFRASTRUCTURE AUDIT</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="w-full aspect-[16/10] bg-[#f0eee8] relative overflow-hidden group shadow-md border border-[#e4e2dd]">
              <Image
                src="/images/neura_os.png"
                alt="Neura Distributed Operating Environment desktop monitor interface"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#151515] text-white px-3 py-1 font-mono text-[10px] md:text-[11px] uppercase tracking-wider">
                CASE 02 // DISTRIBUTED WORKSPACE
              </div>
              <div className="absolute bottom-4 right-4 bg-[#fbf9f3]/90 backdrop-blur-md px-3 py-1.5 font-mono text-[10px] md:text-[11px] text-[#1b1c18] border border-[#e4e2dd]">
                SUB-10MS COMMAND PIPELINE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
