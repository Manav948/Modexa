"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface FragmentState {
  el: HTMLElement | null;
  id: string;
  defaultRot: number;
  exX: number;
  exY: number;
  curX: number;
  curY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  currentRot: number;
  targetRot: number;
}

export default function HeroCreativeComposition() {
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const mouseRef = useRef({ x: 250, y: 250, inside: false });
  const statesRef = useRef<FragmentState[]>([]);
  const idleTimeRef = useRef(0);

  // Fragment definitions matching the Stitch design
  const fragments = [
    {
      id: "video",
      defaultRot: -2,
      exX: -45,
      exY: -50,
      style: { top: "14%", left: "8%", width: "52%" },
      content: (
        <div className="bg-[#fbf9f3] border border-[#e4e2dd] shadow-md p-1.5 hover:border-[#b6240f] hover:scale-[1.03] transition-all">
          <div className="relative w-full bg-[#f0eee8]" style={{ aspectRatio: "16/9" }}>
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(135deg, #1b1c18 0%, #30312d 50%, #1b1c18 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Cinematic film grain overlay */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[#e4e2dd] font-mono text-[8px] tracking-widest opacity-60 mb-1">
                    MOTION REEL
                  </div>
                  <div className="text-[#fbf9f3] font-mono text-[10px] font-bold tracking-tight">
                    2026.4
                  </div>
                </div>
              </div>
              <div className="absolute top-1 left-1.5 px-1.5 py-0.5 bg-[#fbf9f3]/90 font-mono text-[8px] text-[#1b1c18] tracking-widest">
                00:04:18
              </div>
              <div className="absolute bottom-1 right-1.5 w-4 h-4 rounded-full bg-[#b6240f] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[10px]">play_arrow</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-1 pt-1 font-mono text-[8px] text-[#747878]">
            <span className="text-[#b6240f] font-bold">MOTION / 01</span>
            <span>24.00 FPS</span>
          </div>
        </div>
      ),
    },
    {
      id: "ui",
      defaultRot: 2,
      exX: 50,
      exY: -25,
      style: { top: "22%", right: "7%", width: "44%" },
      content: (
        <div className="bg-[#fbf9f3] border border-[#e4e2dd] shadow-md p-2.5 hover:border-[#b6240f] hover:scale-[1.03] transition-all">
          <div className="flex items-center justify-between border-b border-[#e4e2dd] pb-1.5 mb-2 font-mono text-[8px]">
            <div className="flex items-center gap-1 text-[#747878]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b6240f]" />
              <span className="font-bold text-[#1b1c18]">SYS.V7</span>
            </div>
            <span className="text-[#747878] uppercase">DIGITAL / 02</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[8px] font-mono text-[#747878]">
              <span>TYPE SCALE</span>
              <span className="text-[#b6240f] font-mono">1.250</span>
            </div>
            <div className="w-full h-1 bg-[#f0eee8] overflow-hidden rounded-full">
              <div className="w-3/4 h-full bg-[#b6240f]" />
            </div>
            <div className="pt-1 flex items-center justify-between">
              <span
                className="text-[11px] leading-tight text-[#1b1c18]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Tectonic Grid
              </span>
              <span className="px-1.5 py-0.5 bg-[#1b1c18] text-white font-mono text-[7px] uppercase tracking-wider">
                APPLY
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "type",
      defaultRot: -3,
      exX: -55,
      exY: 18,
      style: { top: "48%", left: "10%", width: "38%" },
      content: (
        <div className="bg-[#1b1c18] text-white p-3 shadow-lg border border-[#e4e2dd]/30 hover:border-[#b6240f] hover:scale-[1.03] transition-all">
          <div className="font-mono text-[7px] text-[#b6240f] font-bold uppercase tracking-widest mb-1">
            TYPE / 03
          </div>
          <div
            className="leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 400 }}
          >
            MAKE
            <br />
            <span className="italic text-[#b6240f]">IT</span>
            <br />
            MOVE.
          </div>
          <div className="mt-2 pt-1 border-t border-white/20 flex items-center justify-between font-mono text-[7px] text-white/60">
            <span>NEWSREADER</span>
            <span>72PT</span>
          </div>
        </div>
      ),
    },
    {
      id: "photo",
      defaultRot: 1.5,
      exX: 48,
      exY: 40,
      style: { top: "45%", right: "12%", width: "40%" },
      content: (
        <div className="bg-[#fbf9f3] border border-[#e4e2dd] shadow-md p-1.5 hover:border-[#b6240f] hover:scale-[1.03] transition-all">
          <div className="relative w-full bg-[#e4e2dd]" style={{ aspectRatio: "3/4" }}>
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(160deg, #dcdad4 0%, #f0eee8 30%, #c4c7c7 70%, #30312d 100%)",
              }}
            >
              <div className="absolute inset-0 flex items-end">
                <div className="w-full h-2/3 bg-gradient-to-t from-[#1b1c18]/80 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Bust silhouette */}
                <svg viewBox="0 0 60 80" className="w-14 h-20 opacity-60" fill="none">
                  <ellipse cx="30" cy="25" rx="14" ry="16" fill="#dcdad4"/>
                  <path d="M16 41 Q10 55 8 70 L52 70 Q50 55 44 41" fill="#c4c7c7"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-[#fbf9f3]/90 font-mono text-[7px] text-[#b6240f] font-bold tracking-wider">
              IMAGE / 04
            </div>
          </div>
          <div className="pt-1 flex items-center justify-between font-mono text-[7px] text-[#747878]">
            <span>PLASTER & LINEN</span>
            <span>ISO 100</span>
          </div>
        </div>
      ),
    },
    {
      id: "code",
      defaultRot: -1.5,
      exX: -38,
      exY: 55,
      style: { bottom: "10%", left: "16%", width: "48%" },
      content: (
        <div className="bg-[#ffffff] border border-[#e4e2dd] shadow-md p-2 hover:border-[#b6240f] hover:scale-[1.03] transition-all font-mono">
          <div className="flex items-center justify-between border-b border-[#e4e2dd] pb-1 mb-1.5 text-[8px] text-[#747878]">
            <span className="text-[#b6240f] font-bold">CODE / 05</span>
            <span>ENGINE.GLSL</span>
          </div>
          <pre className="text-[8px] leading-relaxed text-[#1b1c18] font-mono overflow-hidden">
            <code>
              <span className="text-[#b6240f]">const</span>
              {" idea = create();\n"}
              {"idea "}
              <span className="text-[#b6240f]">→</span>
              {" experience;\n"}
              {"render({ latency: 0 });"}
            </code>
          </pre>
        </div>
      ),
    },
    {
      id: "brand",
      defaultRot: 3,
      exX: 35,
      exY: -58,
      style: { top: "10%", right: "18%", width: "22%" },
      content: (
        <div
          className="bg-[#fbf9f3] border border-[#e4e2dd] p-2 shadow-md flex flex-col items-center justify-between hover:border-[#b6240f] hover:scale-[1.04] transition-all"
          style={{ aspectRatio: "1/1" }}
        >
          <div className="w-full flex justify-between items-center text-[7px] font-mono text-[#747878]">
            <span className="text-[#b6240f] font-bold">06</span>
            <span>SEAL</span>
          </div>
          <div className="w-9 h-9 border border-[#1b1c18] flex items-center justify-center relative">
            <div className="w-4 h-4 bg-[#b6240f] rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-white font-bold pointer-events-none">
              D
            </div>
          </div>
          <span className="font-mono text-[6px] tracking-widest text-[#747878] uppercase">IDENTITY</span>
        </div>
      ),
    },
    {
      id: "card",
      defaultRot: -1,
      exX: 25,
      exY: 65,
      style: { bottom: "8%", right: "8%", width: "36%" },
      content: (
        <div className="bg-white border border-[#e4e2dd] p-2 shadow-sm hover:border-[#b6240f] hover:scale-[1.03] transition-all">
          <div className="font-mono text-[7px] text-[#b6240f] font-bold uppercase mb-0.5">
            ARTIFACT / 07
          </div>
          <div className="text-[9px] font-medium leading-tight text-[#1b1c18]" style={{ fontFamily: "'Inter', sans-serif" }}>
            PROJECT 07
          </div>
          <div className="font-mono text-[7px] text-[#747878] mt-0.5 tracking-wider">
            EXP. 2026 // 40.71° N
          </div>
        </div>
      ),
    },
    {
      id: "label",
      defaultRot: 0,
      exX: 0,
      exY: -10,
      style: { top: "32%", left: "47%" },
      content: (
        <div className="bg-[#fbf9f3] px-1.5 py-3 border border-[#b6240f] shadow-md hover:bg-[#b6240f] hover:text-white group/ribbon transition-all">
          <div
            className="font-mono text-[7px] text-[#b6240f] group-hover/ribbon:text-white font-bold tracking-widest uppercase"
            style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            CREATIVE DIRECTION [CONDUIT]
          </div>
        </div>
      ),
    },
  ];

  const initFragmentStates = useCallback(() => {
    if (!boxRef.current) return;
    const els = boxRef.current.querySelectorAll<HTMLElement>(".world-fragment");
    const states: FragmentState[] = [];

    els.forEach((el, i) => {
      const frag = fragments[i];
      states.push({
        el,
        id: frag.id,
        defaultRot: frag.defaultRot,
        exX: frag.exX,
        exY: frag.exY,
        curX: 0,
        curY: 0,
        targetX: 0,
        targetY: 0,
        vx: 0,
        vy: 0,
        currentRot: frag.defaultRot,
        targetRot: frag.defaultRot,
      });
    });

    statesRef.current = states;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initFragmentStates();
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const updateFragments = () => {
      idleTimeRef.current += 0.025;
      const center = { x: 250, y: 250 };

      statesRef.current.forEach((state) => {
        if (!state.el) return;

        const hovering = isHoveredRef.current;
        const baseTargetX = hovering ? state.exX : 0;
        const baseTargetY = hovering ? state.exY : 0;

        const idleOffsetX = Math.sin(idleTimeRef.current + state.exX) * 1.2;
        const idleOffsetY = Math.cos(idleTimeRef.current + state.exY) * 1.2;

        let magneticX = 0;
        let magneticY = 0;

        if (!isTouch && mouseRef.current.inside && hovering && boxRef.current) {
          const elRect = state.el.getBoundingClientRect();
          const boxRect = boxRef.current.getBoundingClientRect();
          const elCenterX = ((elRect.left + elRect.width / 2) - boxRect.left) * (500 / boxRect.width);
          const elCenterY = ((elRect.top + elRect.height / 2) - boxRect.top) * (500 / boxRect.height);
          const dx = mouseRef.current.x - elCenterX;
          const dy = mouseRef.current.y - elCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 1) {
            const force = (1 - dist / 180) * 12;
            magneticX = (dx / dist) * force;
            magneticY = (dy / dist) * force;
          }
        }

        state.targetX = baseTargetX + idleOffsetX + magneticX;
        state.targetY = baseTargetY + idleOffsetY + magneticY;

        const fx = (state.targetX - state.curX) * 0.12;
        const fy = (state.targetY - state.curY) * 0.12;
        state.vx = (state.vx + fx) * 0.78;
        state.vy = (state.vy + fy) * 0.78;
        state.curX += state.vx;
        state.curY += state.vy;

        state.targetRot = isHoveredRef.current
          ? state.defaultRot * 1.2
          : state.defaultRot;
        state.currentRot += (state.targetRot - state.currentRot) * 0.1;

        state.el.style.transform = `translate(${state.curX}px, ${state.curY}px) rotate(${state.currentRot}deg)`;

        // Update SVG thread
        const pathEl = document.getElementById(`thread-${state.id}`);
        if (pathEl && boxRef.current) {
          const boxRect = boxRef.current.getBoundingClientRect();
          const elRect = state.el.getBoundingClientRect();
          if (boxRect.width > 0) {
            const fx = ((elRect.left + elRect.width / 2) - boxRect.left) * (500 / boxRect.width);
            const fy = ((elRect.top + elRect.height / 2) - boxRect.top) * (500 / boxRect.height);

            if (isHoveredRef.current) {
              const midX = (center.x + fx) / 2;
              const midY = (center.y + fy) / 2;
              pathEl.setAttribute("d", `M ${center.x} ${center.y} Q ${midX} ${midY + (state.curY * 0.3)} ${fx} ${fy}`);
              pathEl.setAttribute("style", "opacity: 0.9");
            } else {
              pathEl.setAttribute("d", `M ${center.x} ${center.y} L ${center.x} ${center.y}`);
              pathEl.setAttribute("style", "opacity: 0.15");
            }
          }
        }
      });

      rafRef.current = requestAnimationFrame(updateFragments);
    };

    rafRef.current = requestAnimationFrame(updateFragments);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initFragmentStates]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
    if (captionRef.current) {
      captionRef.current.textContent = "INTERACTION: COLLAPSED WORLD UNFOLDED";
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    mouseRef.current.inside = false;
    if (captionRef.current) {
      captionRef.current.textContent = "INTERACTION: EXPLODE & TETHER";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 500,
      y: ((e.clientY - rect.top) / rect.height) * 500,
      inside: true,
    };
  };

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      const next = !isHoveredRef.current;
      isHoveredRef.current = next;
      setIsHovered(next);
    }
  };

  return (
    <div className="lg:col-span-5 flex flex-col items-center justify-center mt-12 lg:mt-0 relative select-none">
      {/* Installation header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 font-mono text-[9px] sm:text-[10px] text-[#747878]"
           style={{ fontFamily: "'DM Mono', monospace" }}>
        <span>FIG. 01 — COLLAPSED CREATIVE WORLD</span>
        <span className="text-[#b6240f] font-bold">[MULTI-DISCIPLINARY ASSEMBLY]</span>
      </div>

      {/* Interactive canvas box */}
      <div
        ref={boxRef}
        id="creative-world-box"
        className="relative w-full bg-[#f5f3ed] overflow-hidden border border-[#e4e2dd] shadow-sm cursor-crosshair aspect-square max-w-[500px]"
        style={{ maxWidth: "500px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {/* SVG Connecting Threads */}
        <svg
          ref={svgRef}
          id="world-threads-svg"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 500 500"
        >
          <path id="thread-video" d="M 250 250 L 250 250" fill="none" stroke="#E4E2DD" strokeDasharray="2,2" strokeWidth="1.2" />
          <path id="thread-ui" d="M 250 250 L 250 250" fill="none" stroke="#E4E2DD" strokeDasharray="2,2" strokeWidth="1.2" />
          <path id="thread-type" d="M 250 250 L 250 250" fill="none" stroke="#E7472E" strokeWidth="1.5" />
          <path id="thread-photo" d="M 250 250 L 250 250" fill="none" stroke="#E4E2DD" strokeDasharray="2,2" strokeWidth="1.2" />
          <path id="thread-code" d="M 250 250 L 250 250" fill="none" stroke="#E4E2DD" strokeDasharray="2,2" strokeWidth="1.2" />
          <path id="thread-brand" d="M 250 250 L 250 250" fill="none" stroke="#E4E2DD" strokeDasharray="2,2" strokeWidth="1.2" />
          <path id="thread-card" d="M 250 250 L 250 250" fill="none" stroke="#E4E2DD" strokeDasharray="2,2" strokeWidth="1.2" />
          <path id="thread-label" d="M 250 250 L 250 250" fill="none" stroke="#E4E2DD" strokeDasharray="2,2" strokeWidth="1.2" />
          {/* Central locus */}
          <circle cx="250" cy="250" r="3.5" fill="#E7472E" id="locus-dot" />
          <circle cx="250" cy="250" r="8" fill="none" stroke="#E7472E" strokeDasharray="2,2" strokeWidth="0.75" id="locus-ring" />
        </svg>

        {/* Fragment Elements */}
        {fragments.map((frag) => (
          <div
            key={frag.id}
            className="world-fragment absolute z-20 cursor-pointer"
            data-id={frag.id}
            style={{
              ...frag.style,
              transform: `rotate(${frag.defaultRot}deg)`,
            }}
          >
            {frag.content}
          </div>
        ))}

        {/* Corner reticles */}
        <div className="absolute top-2 left-2 font-mono text-[9px] text-[#747878] tracking-widest select-none pointer-events-none"
             style={{ fontFamily: "'DM Mono', monospace" }}>
          + 00.12
        </div>
        <div className="absolute top-2 right-2 font-mono text-[9px] text-[#747878] tracking-widest select-none pointer-events-none"
             style={{ fontFamily: "'DM Mono', monospace" }}>
          LOCUS: 250,250
        </div>
        <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#747878] tracking-widest select-none pointer-events-none"
             style={{ fontFamily: "'DM Mono', monospace" }}>
          INERTIA: SPRING
        </div>
        <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#b6240f] tracking-widest select-none pointer-events-none"
             style={{ fontFamily: "'DM Mono', monospace" }}>
          {isHovered ? "● UNFOLDED" : "• HOVER TO UNFOLD"}
        </div>
      </div>

      {/* Installation footer */}
      <div className="w-full pt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] sm:text-[10px] text-[#747878]"
           style={{ fontFamily: "'DM Mono', monospace" }}>
        <span ref={captionRef}>INTERACTION: EXPLODE &amp; TETHER</span>
        <span className="text-[#b6240f] font-medium">8 FRAGMENTS BOUND</span>
      </div>
    </div>
  );
}
