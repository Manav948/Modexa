import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import SectionIndicator from "@/components/layout/SectionIndicator";
import Hero from "@/components/hero/Hero";
import CrossingLines from "@/components/motion/CrossingLines";
import Services from "@/components/services/Services";
import Process from "@/components/process/Process";
import CreativeNetwork from "@/components/network/CreativeNetwork";
import Work from "@/components/work/Work";
import BubbleTransition from "@/components/motion/BubbleTransition";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <SmoothScrollProvider>
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

          {/* 02. Harmonic thread continuum */}
          <CrossingLines />

          {/* 03. Services */}
          <Services />

          {/* 04. Process / Doctrine */}
          <Process />

          {/* 05. Creative Network */}
          <CreativeNetwork />

          {/* 06. Portfolio / Work */}
          <Work />

          {/* 07. Bubble transition */}
          <BubbleTransition />

          {/* 08. Contact / Inquiry */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
