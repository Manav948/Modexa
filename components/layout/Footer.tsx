"use client";

export default function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
    >
      <div className="w-full px-5 md:px-8 lg:px-12 flex flex-col gap-12 pt-12 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Tagline */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <p
              className="text-[#1b1c18] max-w-2xl leading-tight"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)",
                lineHeight: "2.75rem",
                letterSpacing: "-0.015em",
                fontWeight: 400,
              }}
            >
              MANY IDEAS. MANY SKILLS.
              <br />
              <span className="italic">ONE CREATIVE DIRECTION.</span>
            </p>
            <div
              className="mt-8 flex flex-wrap items-center gap-6 font-mono text-[10px] text-[#747878]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span>40.7128° N, 74.0060° W</span>
              <span>48.8566° N, 2.3522° E</span>
              <span>REF. ARCHIVE VOL. VI</span>
            </div>
          </div>

          {/* Right: Studio info + CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div
              className="flex flex-col gap-2 font-mono text-[11px] text-[#747878]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-wider text-[#1b1c18] font-semibold mb-1"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                Studio Colophon
              </span>
              <span>Independent Creative Atelier & Design Direction Practice.</span>
              <span>Typefaces set in Newsreader, Manrope & Space Mono.</span>
            </div>

            <a
              href="#inquiry-station"
              className="inline-flex items-center justify-between p-4 border transition-colors group"
              style={{
                backgroundColor: "#fbf9f3",
                borderColor: "#e4e2dd",
                fontFamily: "'Space Mono', monospace",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#b6240f";
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#fbf9f3";
                (e.currentTarget as HTMLAnchorElement).style.color = "#1b1c18";
              }}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase">
                INITIATE ENGAGEMENT
              </span>
              <span className="font-mono text-[10px]">→</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t font-mono text-[10px] text-[#747878]"
          style={{ borderColor: "#e4e2dd", fontFamily: "'Space Mono', monospace" }}
        >
          <span>© 2026 STUDIO DIRECTION. ALL ARCHIVAL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6 uppercase">
            <span className="cursor-pointer hover:text-[#1b1c18] transition-colors">Index Registry</span>
            <span className="cursor-pointer hover:text-[#1b1c18] transition-colors">Legal Notice</span>
            <a href="#overview" className="hover:text-[#b6240f] transition-colors">
              Back to Apex ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
