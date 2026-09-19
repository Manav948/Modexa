"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic button effect for CTA
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${relX * 0.2}px, ${relY * 0.2}px)`;
    };

    const handleMouseLeave = () => {
      btn.style.transform = "translate(0px, 0px)";
      btn.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
    };

    const handleMouseEnter = () => {
      btn.style.transition = "transform 0.15s ease-out";
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    btn.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
      btn.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const navLinks = [
    { label: "OVERVIEW", href: "#overview", id: "overview" },
    { label: "PHILOSOPHY", href: "#philosophy", id: "philosophy" },
    { label: "SERVICES", href: "#services", id: "services" },
    { label: "NETWORK", href: "#network", id: "network" },
    { label: "WORKS", href: "#works", id: "works" },
    { label: "INQUIRY", href: "#inquiry-station", id: "inquiry" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fbf9f3]/98 shadow-sm h-16"
          : "bg-[#fbf9f3]/90 backdrop-blur-sm h-20"
      }`}
      style={{ borderBottom: scrolled ? "1px solid #e4e2dd" : "none" }}
    >
      <div className="h-full max-w-[1350px] mx-auto w-full px-5 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: Logo + meta */}
        <div className="flex items-baseline gap-6">
          <a
            href="#overview"
            className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-[#1b1c18] hover:text-[#b6240f] transition-colors duration-200"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            MODEXA
          </a>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-6 font-mono text-[10px] uppercase tracking-wider"
             style={{ fontFamily: "'Space Mono', monospace" }}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setActiveSection(link.id)}
              className={`relative transition-colors duration-200 group ${
                activeSection === link.id
                  ? "text-[#b6240f] font-bold"
                  : "text-[#747878] hover:text-[#1b1c18]"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#b6240f] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: CTA + avatar */}
        <div className="flex items-center gap-3">
          <a
            ref={btnRef}
            href="#inquiry-station"
            id="nav-cta-btn"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-[#b6240f] text-white font-mono text-[10px] tracking-wider uppercase hover:bg-[#900e00] transition-colors duration-200 magnetic-btn"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            START A PROJECT →
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[#1b1c18] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-px bg-[#1b1c18] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-[#1b1c18] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-[#fbf9f3] border-t border-[#e4e2dd] px-5 py-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => { setActiveSection(link.id); setMenuOpen(false); }}
              className="font-mono text-[11px] uppercase tracking-wider text-[#1b1c18] hover:text-[#b6240f] transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#inquiry-station"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center px-4 py-3 bg-[#1b1c18] text-white font-mono text-[11px] uppercase tracking-wider mt-2"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            START A PROJECT →
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
