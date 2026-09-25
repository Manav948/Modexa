"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import StartProjectButton from "@/components/motion/StartProjectButton";

const SERVICES = [
  { number: "01", label: "VIDEO EDITING", meta: "Motion direction / Film", href: "/services/video-editing", image: "/images/service_video_motion_1789796437874.png" },
  { number: "02", label: "UI / UX DESIGN", meta: "Digital products / Web", href: "/services/ui-ux-design", image: "/images/service_ui_ux_1789796467059.png" },
  { number: "03", label: "DIGITAL MARKETING", meta: "Content / Campaigns", href: "/services/digital-marketing", image: "/images/work_vanguard_hardware_1789796410306.png" },
  { number: "04", label: "WEB DEVELOPMENT", meta: "Interactive / Systems", href: "/services/web-development", image: "/images/work_codeverse_platform_1789796324968.png" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [preview, setPreview] = useState(SERVICES[0]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const isHomepage = pathname === "/";
  const isDarkHero = pathname === "/services/video-editing" || pathname === "/services/web-development";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMenuOpen(false);
      setServicesOpen(false);
      setMobileServicesOpen(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => menuPanelRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const homeHref = (hash: string) => (isHomepage ? hash : `/${hash}`);
  const closeMenus = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHomepage) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const textColor = isDarkHero && !scrolled ? "text-white" : "text-[#151515]";
  const mutedColor = isDarkHero && !scrolled ? "text-white/65" : "text-[#55534E]";
  const surface = isDarkHero && !scrolled ? "bg-[#080808]/55" : "bg-[#f7f5ef]/92";
  const borderColor = isDarkHero && !scrolled ? "border-white/15" : "border-[#E8E2D5]";

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "h-16" : "h-[76px]"} ${surface} backdrop-blur-md`}
      style={{ borderBottom: scrolled ? "1px solid" : "1px solid transparent" }}
    >
      <div className={`mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-6 px-5 md:px-8 lg:px-12 ${borderColor}`}>
        <Link href="/" onClick={handleLogoClick} className={`group flex min-h-11 items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${textColor}`} style={{ fontFamily: "'DM Mono', monospace" }} aria-label="MODEXA home">
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5">MODEXA</span>
          <span className="hidden text-[8px] font-normal tracking-[0.12em] opacity-50 sm:inline">/ STUDIO</span>
        </Link>

        <nav className={`hidden items-center gap-7 font-mono text-[10px] uppercase tracking-[0.12em] md:flex ${mutedColor}`} aria-label="Primary navigation">
          <Link href={homeHref("#works")} onClick={closeMenus} className="group relative py-3 transition-colors hover:text-[#E7472E]">WORK<span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-[#E7472E] transition-transform duration-300 group-hover:scale-x-100" /></Link>
          <div className="relative">
            <button type="button" aria-expanded={servicesOpen} aria-haspopup="true" onClick={() => setServicesOpen((open) => !open)} className="group flex min-h-11 items-center gap-2 py-3 transition-colors hover:text-[#E7472E]">SERVICES <span className={`text-[9px] transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}>↓</span></button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="absolute right-0 top-full w-[min(560px,calc(100vw-40px))] border border-[#E8E2D5] bg-[#f7f5ef] p-3 text-[#151515] shadow-2xl" role="menu">
                  <div className="mb-3 flex items-center justify-between border-b border-[#E8E2D5] px-2 pb-2 font-mono text-[9px] uppercase tracking-widest text-[#55534E]"><span>CAPABILITIES INDEX</span><span className="text-[#E7472E]">04 DISCIPLINES</span></div>
                  <div className="grid grid-cols-2 gap-1">
                    {SERVICES.map((service) => (
                      <Link key={service.href} href={service.href} role="menuitem" onMouseEnter={() => setPreview(service)} onFocus={() => setPreview(service)} onClick={closeMenus} className="group flex min-h-20 items-start gap-3 border border-transparent p-3 transition-colors hover:border-[#E8E2D5] hover:bg-white">
                        <span className="pt-0.5 font-mono text-[9px] font-bold text-[#E7472E]">{service.number}</span>
                        <span className="min-w-0"><span className="block font-display text-sm leading-tight text-[#151515] transition-colors group-hover:text-[#E7472E]">{service.label}</span><span className="mt-1 block font-mono text-[8px] uppercase tracking-wider text-[#55534E]">{service.meta}</span></span>
                        <span className="ml-auto text-[#E7472E] opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-3 border-t border-[#E8E2D5] pt-3"><Image src={preview.image} alt="" width={56} height={40} className="h-10 w-14 object-cover grayscale" /><span className="font-mono text-[8px] uppercase tracking-wider text-[#55534E]">{preview.label} / SELECTED DIRECTION</span></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href={homeHref("#philosophy")} onClick={closeMenus} className="group relative py-3 transition-colors hover:text-[#E7472E]">ABOUT<span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-[#E7472E] transition-transform duration-300 group-hover:scale-x-100" /></Link>
        </nav>

        <div className="flex items-center gap-3">
          <StartProjectButton href={homeHref("#inquiry-station")} onClick={closeMenus} className="hidden sm:inline-flex" />
          <button ref={menuButtonRef} type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className={`flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 border md:hidden ${borderColor} ${textColor}`}>
            <span className={`h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} /><span className={`h-px w-5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} /><span className={`h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-navigation" ref={menuPanelRef} tabIndex={-1} initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.8 }} animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }} exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0.8 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-x-0 top-full max-h-[calc(100dvh-76px)] overflow-y-auto border-b border-[#E8E2D5] bg-[#f7f5ef] px-5 py-8 text-[#151515] shadow-2xl md:hidden">
            <div className="mb-8 flex items-center justify-between border-b border-[#E8E2D5] pb-3 font-mono text-[9px] uppercase tracking-widest text-[#55534E]"><span>MODEXA / NAVIGATION</span><span className="text-[#E7472E]">INDEX 2026.4</span></div>
            <nav className="flex flex-col" aria-label="Mobile navigation">
              <Link href={homeHref("#works")} onClick={closeMenus} className="flex min-h-14 items-center border-b border-[#E8E2D5] font-display text-3xl tracking-tight transition-colors hover:text-[#E7472E]">WORK</Link>
              <button type="button" aria-expanded={mobileServicesOpen} onClick={() => setMobileServicesOpen((open) => !open)} className="flex min-h-14 items-center justify-between border-b border-[#E8E2D5] text-left font-display text-3xl tracking-tight transition-colors hover:text-[#E7472E]">SERVICES <span className={`font-mono text-sm transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}>↓</span></button>
              <AnimatePresence initial={false}>{mobileServicesOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-[#E8E2D5]">{SERVICES.map((service) => <Link key={service.href} href={service.href} onClick={closeMenus} className="flex min-h-14 items-center gap-4 border-b border-[#E8E2D5] py-3 last:border-b-0"><span className="font-mono text-[10px] font-bold text-[#E7472E]">{service.number}</span><span><span className="block font-display text-lg">{service.label}</span><span className="block font-mono text-[8px] uppercase tracking-wider text-[#55534E]">{service.meta}</span></span></Link>)}</motion.div>}</AnimatePresence>
              <Link href={homeHref("#philosophy")} onClick={closeMenus} className="flex min-h-14 items-center border-b border-[#E8E2D5] font-display text-3xl tracking-tight transition-colors hover:text-[#E7472E]">ABOUT</Link>
            </nav>
            <StartProjectButton href={homeHref("#inquiry-station")} onClick={closeMenus} className="mt-8 flex w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
