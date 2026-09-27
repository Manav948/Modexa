"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import UIUXHero from "./UIUXHero";
import UIUXTicker from "./UIUXTicker";
import UIUXSelectedWork from "./UIUXSelectedWork";
import UIUXProjectProvider from "./UIUXProjectProvider";
import InteractionLab from "./InteractionLab";
import NeuraArchive from "./NeuraArchive";
import UIUXCapabilities from "./UIUXCapabilities";
import UIUXCTA from "./UIUXCTA";

export default function UIUXPage() {
  return (
    <>
      <ScrollRevealProvider />
      <div className="flex min-h-screen flex-1 flex-col max-md:min-h-0" style={{ backgroundColor: "#f7f5ef" }}>
        <Navbar />
        <main className="w-full pt-[60px]">
          <UIUXProjectProvider>
            <UIUXHero />
            <UIUXTicker />
            <UIUXSelectedWork />
            <InteractionLab />
            <NeuraArchive />
            <UIUXCapabilities />
            <UIUXCTA />
          </UIUXProjectProvider>
        </main>
        <Footer />
      </div>
    </>
  );
}
