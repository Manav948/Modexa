"use client";

import { useEffect, useState } from "react";

const SECTIONS = ["01", "02", "03", "04", "05", "06"];
const SECTION_IDS = ["overview", "services", "philosophy", "network", "works", "inquiry-station"];

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTION_IDS.indexOf(entry.target.id);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside aria-label="Page sections" className="hidden md:flex fixed right-3 xl:right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center py-3 px-2 border border-[#d2ccbd] bg-[#fbf9f3]/95 shadow-sm">
      <div
        className="flex flex-col items-center gap-1.5 font-mono text-xs"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {SECTIONS.map((num, i) => (
          <div key={num} className="flex flex-col items-center">
            <button
              type="button"
              aria-label={`Go to section ${num}`}
              aria-current={activeSection === i ? "location" : undefined}
              onClick={() => {
                const el = document.getElementById(SECTION_IDS[i]);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`transition-all cursor-pointer font-bold px-1 py-0.5 ${
                activeSection === i
                  ? "text-[#b6240f] scale-110"
                  : "text-[#55534E] hover:text-[#1b1c18]"
              }`}
            >
              {num}
            </button>
            {i < SECTIONS.length - 1 && (
                <div
                className="w-0.5"
                style={{
                  height: activeSection === i ? "32px" : "14px",
                  backgroundColor: activeSection === i ? "#b6240f" : "#e4e2dd",
                  transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease",
                  margin: "2px 0",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
