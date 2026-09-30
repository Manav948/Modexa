import VideoEditingPage from "@/components/services/video-editing/VideoEditingPage";
import DigitalMarketingPage from "@/components/services/digital-marketing/DigitalMarketingPage";
import UIUXPage from "@/components/services/uiux/UIUXPage";
import WebDevelopmentPage from "@/components/services/web-development/WebDevelopmentPage";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}


const SERVICE_METADATA: Record<string, Pick<Metadata, "title" | "description">> = {
  "video-editing": {
    title: "Video Editing & Motion Design | MODEXA",
    description: "Cinematic video editing and motion design shaped into clear, memorable stories by MODEXA.",
  },
  "ui-ux-design": {
    title: "UI/UX Design Services | MODEXA",
    description: "Explore MODEXA UI/UX design work across digital products, web experiences, interfaces, and visual systems.",
  },
  "web-development": {
    title: "Web Development Services | MODEXA",
    description: "MODEXA builds responsive, high-performance websites with considered design, interaction, and engineering.",
  },
  "digital-marketing": {
    title: "Digital Marketing Services | MODEXA",
    description: "Explore MODEXA digital marketing services for campaign strategy, creative, and audience growth.",
  },
};

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return SERVICE_METADATA[slug] ?? {};
}
export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  if (slug === "video-editing") {
    return <VideoEditingPage />;
  }

  if (slug === "ui-ux-design") {
    return <UIUXPage />;
  }

  if (slug === "web-development") {
    return <WebDevelopmentPage />;
  }

  if (slug === "digital-marketing") {
    return <DigitalMarketingPage />;
  }

  notFound();
}
