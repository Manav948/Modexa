"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BackToTop from "./BackToTop";

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const homeHref = (hash: string) => (isHomePage ? hash : `/${hash}`);
  const mailtoUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=modexa1819@gmail.com&su=Project%20Inquiry%20%2F%2F%20Modexa";

  return (
    <footer
      className="w-full border-t"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
      aria-label="Site footer"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-5 pt-10 pb-6 md:px-8 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* Left: Studio Identity & Editorial Statement */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#1b1c18] mb-3"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                MODEXA <span className="font-normal text-[#747878]">/ STUDIO</span>
              </div>
              <p
                className="text-[#1b1c18] max-w-sm leading-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.25rem, 2.2vw, 1.85rem)",
                  lineHeight: "1.2",
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                DESIGN. CONTENT.
                <br />
                <span className="italic text-[#747878]">TECHNOLOGY. DIGITAL.</span>
              </p>
              <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-[#747878]">
                One creative direction. The right people for the work.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
            <span className="text-[#747878] font-bold mb-1">NAVIGATION</span>
            <Link href={homeHref("#works")} className="text-[#1b1c18] hover:text-[#E7472E] transition-colors py-0.5">
              WORK
            </Link>
            <Link href={homeHref("#services")} className="text-[#1b1c18] hover:text-[#E7472E] transition-colors py-0.5">
              SERVICES
            </Link>
            <Link href={homeHref("#philosophy")} className="text-[#1b1c18] hover:text-[#E7472E] transition-colors py-0.5">
              ABOUT
            </Link>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
            <span className="text-[#747878] font-bold mb-1">SERVICES</span>
            <Link href="/services/video-editing" className="text-[#1b1c18] hover:text-[#E7472E] transition-colors py-0.5">
              VIDEO EDITING
            </Link>
            <Link href="/services/ui-ux-design" className="text-[#1b1c18] hover:text-[#E7472E] transition-colors py-0.5">
              UI/UX DESIGN
            </Link>
            <Link href="/services/digital-marketing" className="text-[#1b1c18] hover:text-[#E7472E] transition-colors py-0.5">
              DIGITAL MARKETING
            </Link>
            <Link href="/services/web-development" className="text-[#1b1c18] hover:text-[#E7472E] transition-colors py-0.5">
              WEB DEVELOPMENT
            </Link>
          </div>

          {/* Column 4: Contact & Primary Action */}
          <div className="lg:col-span-3 flex flex-col items-start gap-3 font-mono text-[10px] uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
            <span className="text-[#747878] font-bold mb-1">INQUIRY</span>
            <a
              href={mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#1b1c18] hover:text-[#E7472E] transition-colors"
            >
              modexa1819@gmail.com
            </a>
            <div className="pt-2">
              <a
                href={mailtoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-none bg-[#1b1c18] px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-white transition-all hover:bg-[#E7472E]"
              >
                <span>START A PROJECT</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t font-mono text-[10px] text-[#747878]"
          style={{ borderColor: "#e4e2dd", fontFamily: "'DM Mono', monospace" }}
        >
          <span>© 2026 MODEXA. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
