"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import VideoEditingHero from "./VideoEditingHero";
import SelectedReels from "./SelectedReels";
import FilmStripSection from "./FilmStripSection";
import KineticTicker from "./KineticTicker";
import LongFormArchive from "./LongFormArchive";
import EditingCapabilities from "./EditingCapabilities";
import EditingPipeline from "./EditingPipeline";
import ProvenanceArchive from "./ProvenanceArchive";
import InitiationCTA from "./InitiationCTA";

export default function VideoEditingPage() {
  return (
    <>
      <ScrollRevealProvider />
      <div className="flex flex-col flex-1 bg-[#fbf9f3] text-[#1b1c18] min-h-screen">
        {/* Navigation bar */}
        <Navbar />

        {/* Main Content */}
        <main className="w-full pt-20">
          {/* 01. Hero */}
          <VideoEditingHero />

          {/* 02. Selected Reels & Short Form Matrix */}
          <SelectedReels />

          {/* 03. Panoramic Film Strip Section */}
          <FilmStripSection />

          {/* 04. Kinetic Typography Banner */}
          <KineticTicker />

          {/* 05. Long-Form Narrative Archive */}
          <LongFormArchive />

          {/* 06. Scope of Discipline - What I Edit */}
          <EditingCapabilities />

          {/* 07. The Edit Pipeline */}
          <EditingPipeline />

          {/* 08. Provenance Index Registry */}
          <ProvenanceArchive />

          {/* 09. Direct Commission Initiation CTA */}
          <InitiationCTA />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
