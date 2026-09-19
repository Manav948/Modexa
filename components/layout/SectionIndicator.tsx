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
      { threshold: 0.4 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden xl:flex fixed right-12 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-2 font-mono text-[10px]"
           style={{ fontFamily: "'Space Mono', monospace" }}>
        {SECTIONS.map((num, i) => (
          <div key={num} className="flex flex-col items-center">
            <button
              onClick={() => {
                const el = document.getElementById(SECTION_IDS[i]);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`transition-colors cursor-pointer font-bold ${
                activeSection === i
                  ? "text-[#b6240f]"
                  : "text-[#747878] hover:text-[#1b1c18]"
              }`}
            >
              {num}
            </button>
            {i < SECTIONS.length - 1 && (
              <div
                className="w-px"
                style={{
                  height: activeSection === i ? "48px" : "24px",
                  backgroundColor: activeSection === i ? "#b6240f" : "#e4e2dd",
                  transition: "height 0.3s ease, background-color 0.3s ease",
                  margin: "4px 0",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
