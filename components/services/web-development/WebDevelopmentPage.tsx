"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import WebDevHero from "./WebDevHero";
import CadenceTicker from "./CadenceTicker";
import EngineeringStack from "./EngineeringStack";
import LivingSyntaxArtifact from "./LivingSyntaxArtifact";
import TactileFidelity from "./TactileFidelity";
import EngineeringCapabilities from "./EngineeringCapabilities";
import PerformanceMandate from "./PerformanceMandate";
import TechnicalReleases from "./TechnicalReleases";
import MethodologyProtocol from "./MethodologyProtocol";
import SpecificationLedger from "./SpecificationLedger";
import CommissionGateway from "./CommissionGateway";

export default function WebDevelopmentPage() {
  return (
    <>
      <ScrollRevealProvider />
      <div className="flex flex-col flex-1 min-h-screen max-md:min-h-0" style={{ backgroundColor: "#fbf9f3" }}>
        {/* Navigation Bar */}
        <Navbar />

        <main className="w-full">
          {/* 01. Dark Cinematic Hero — WE BUILD WHAT PEOPLE interact WITH. */}
          <WebDevHero />

          {/* 02. Engineering Stack — editorial technology index */}
          <EngineeringStack />

          {/* Existing cadence ticker */}
          <CadenceTicker />

          {/* 04. Living Code Workspace — SYNTAX AS AN EDITORIAL ARTIFACT */}
          <LivingSyntaxArtifact />

          {/* 05. Tactile Fidelity — 4-Quadrant Laboratory Grid */}
          <TactileFidelity />

          {/* 05. Engineering Capabilities */}
          <EngineeringCapabilities />

          {/* 06. Performance Mandate — FAST IS A feature. */}
          <PerformanceMandate />

          {/* 07. Technical Releases — Verified Production Showcases */}
          <TechnicalReleases />

          {/* 08. Sequential Engineering Protocol — 6-Phase Pipeline */}
          <MethodologyProtocol />

          {/* 09. Specification Ledger — Capabilities Index */}
          <SpecificationLedger />

          {/* 10. Commission Gateway — HAVE A SYSTEM WORTH BUILDING? */}
          <CommissionGateway />
        </main>

        <Footer />
      </div>
    </>
  );
}
