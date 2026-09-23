import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import SectionIndicator from "@/components/layout/SectionIndicator";
import Hero from "@/components/hero/Hero";
import CreativeStatement from "@/components/statement/CreativeStatement";
import Services from "@/components/services/Services";
import Process from "@/components/process/Process";
import CreativeNetwork from "@/components/network/CreativeNetwork";
import Work from "@/components/work/Work";
import DeliveryRoadmap from "@/components/delivery/DeliveryRoadmap";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <ScrollRevealProvider />
      <div className="flex flex-col flex-1 bg-[#fbf9f3]">
        {/* Fixed navigation */}
        <Navbar />

        {/* Side section indicator */}
        <SectionIndicator />

        {/* Main content */}
        <main className="w-full pt-20 bg-[#fbf9f3]">
          {/* 01. Hero */}
          <Hero />

          {/* 02. Operating Manifesto Statement */}
          <CreativeStatement />

          {/* 03. Services */}
          <Services />

          {/* 04. Process / Doctrine */}
          <Process />

          {/* 05. Creative Network Topology */}
          <CreativeNetwork />

          {/* 06. Portfolio / Work */}
          <Work />

          {/* 07. Delivery roadmap */}
          <DeliveryRoadmap />

          {/* 08. Contact / Intake */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
