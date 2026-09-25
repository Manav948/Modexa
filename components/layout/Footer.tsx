"use client";

import StartProjectButton from "@/components/motion/StartProjectButton";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer
      className="w-full border-t"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-12 flex flex-col gap-12 pt-12 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Tagline */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <p
              className="text-[#1b1c18] max-w-2xl leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)",
                lineHeight: "2.75rem",
                letterSpacing: "-0.015em",
                fontWeight: 400,
              }}
            >
              DESIGN. CONTENT.
              <br />
              <span className="italic">TECHNOLOGY. DIGITAL.</span>
            </p>
            <div
              className="mt-8 flex flex-wrap items-center gap-6 font-mono text-[10px] text-[#747878]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span>ONE CREATIVE DIRECTION.</span>
              <span>THE RIGHT SPECIALISTS FOR THE WORK.</span>
            </div>
          </div>

          {/* Right: Studio info + CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div
              className="flex flex-col gap-2 font-mono text-[11px] text-[#747878]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-wider text-[#1b1c18] font-semibold mb-1"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Modexa
              </span>
              <span>One creative direction. The right specialists for the work.</span>
              <span>VIDEO / DESIGN / MARKETING / DEVELOPMENT</span>
            </div>

            <StartProjectButton theme="dark" href={isHomePage ? "#inquiry-station" : "/#inquiry-station"} />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t font-mono text-[10px] text-[#747878]"
          style={{ borderColor: "#e4e2dd", fontFamily: "'DM Mono', monospace" }}
        >
          <span className="text-center sm:text-left">© 2026 MODEXA. ALL ARCHIVAL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6 uppercase">
            <span className="cursor-pointer hover:text-[#1b1c18] transition-colors">Index Registry</span>
            <span className="cursor-pointer hover:text-[#1b1c18] transition-colors">Legal Notice</span>
            <a href={isHomePage ? "#overview" : "/"} className="hover:text-[#b6240f] transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
