import VideoEditingPage from "@/components/services/video-editing/VideoEditingPage";
import DigitalMarketingPage from "@/components/services/digital-marketing/DigitalMarketingPage";
import UIUXPage from "@/components/services/uiux/UIUXPage";
import WebDevelopmentPage from "@/components/services/web-development/WebDevelopmentPage";
import { notFound } from "next/navigation";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
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
