"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import UIUXHero from "./UIUXHero";
import UIUXTicker from "./UIUXTicker";
import UIUXVisualAtlas from "./UIUXVisualAtlas";
import InteractionLab from "./InteractionLab";
import NeuraArchive from "./NeuraArchive";
import UIUXCapabilities from "./UIUXCapabilities";
import UIUXCTA from "./UIUXCTA";

export default function UIUXPage() {
  return (
    <>
      <ScrollRevealProvider />
      <div className="flex flex-col flex-1 min-h-screen max-md:min-h-0" style={{ backgroundColor: "#f7f5ef" }}>
        <Navbar />
        <main className="w-full pt-[60px]">
          {/* 01. Hero — WHERE STRUCTURE meets INTERACTION. */}
          <UIUXHero />

          {/* 02. Ticker — INTERFACES // CLARITY // STRUCTURE // INTERACTION... */}
          <UIUXTicker />

          {/* 03. Full-page interface studies */}
          <UIUXVisualAtlas />

          {/* 04. Interaction Laboratory — 4-column pillar section */}
          <InteractionLab />

          {/* 05. NEURA ARCHIVE — project showcase */}
          <NeuraArchive />

          {/* 06. Capabilities index */}
          <UIUXCapabilities />

          {/* 07. CTA / Commission section */}
          <UIUXCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
