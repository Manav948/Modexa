"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import DMHero from "./DMHero";
import DMTicker from "./DMTicker";
import CampaignLaboratory from "./CampaignLaboratory";
import DMServicesIndex from "./DMServicesIndex";
import KineticTypeSection from "./KineticTypeSection";
import DMCampaignArchive from "./DMCampaignArchive";
import DMCTA from "./DMCTA";

export default function DigitalMarketingPage() {
  return (
    <>
      <ScrollRevealProvider />
      <div className="flex flex-col flex-1 min-h-screen" style={{ backgroundColor: "#f7f5ef" }}>
        <Navbar />
        <main className="w-full pt-20">
          {/* 01. Hero — ATTENTION / is not captured. / IT IS DESIGNED. */}
          <DMHero />

          {/* 02. Dark horizontal content ticker */}
          <DMTicker />

          {/* 03. Asymmetric campaign laboratory section */}
          <CampaignLaboratory />

          {/* 04. Services scope index */}
          <DMServicesIndex />

          {/* 05. Campaign archive table */}
          <DMCampaignArchive />

          {/* 06. Kinetic typography section */}
          <KineticTypeSection />

          {/* 07. CTA / Commission section */}
          <DMCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
