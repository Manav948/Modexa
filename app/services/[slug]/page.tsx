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
    description: "We turn raw footage into videos with a clear story, strong pacing and a reason to keep watching.",
  },
  "ui-ux-design": {
    title: "UI/UX Design Services | MODEXA",
    description: "We design websites and digital products that are clear, useful and easy to use.",
  },
  "web-development": {
    title: "Web Development Services | MODEXA",
    description: "We build fast, responsive websites and digital products where good design meets solid technology.",
  },
  "digital-marketing": {
    title: "Digital Marketing Services | MODEXA",
    description: "We turn ideas into content and campaigns that reach the right people and give them a reason to care.",
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
