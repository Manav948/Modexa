"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["DESIGN", "BUILD", "EDIT", "GROW"];

export default function KineticText() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cycleTicker = () => {
    setActiveIdx((prev) => (prev + 1) % WORDS.length);
  };

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(cycleTicker, 2600);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateY(-${activeIdx * 1.3}em)`;
    }
  }, [activeIdx]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const norm = (e.clientX - rect.left) / rect.width;
    const idx = Math.min(WORDS.length - 1, Math.max(0, Math.floor(norm * WORDS.length)));
    setActiveIdx(idx);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
      style={{
        fontFamily: "'Newsreader', Georgia, serif",
        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
        lineHeight: "2.75rem",
        letterSpacing: "-0.015em",
        fontWeight: 400,
        color: "#1b1c18",
      }}
    >
      <span style={{ color: "#747878" }}>WE</span>

      {/* Animated ticker slot */}
      <div
        ref={containerRef}
        id="kinetic-ticker"
        className="relative inline-block overflow-hidden align-middle cursor-pointer"
        style={{
          height: "1.3em",
          minWidth: "220px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        title="Scrub on mouseover"
      >
        <div
          ref={sliderRef}
          id="ticker-slider"
          className="flex flex-col"
          style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {WORDS.map((word) => (
            <span
              key={word}
              className="font-medium tracking-tight flex items-center"
              style={{
                color: "#b6240f",
                height: "1.3em",
                fontFamily: "'Newsreader', Georgia, serif",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <span>COHESIVELY.</span>
    </div>
  );
}
