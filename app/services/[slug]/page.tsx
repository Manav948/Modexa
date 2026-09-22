import VideoEditingPage from "@/components/services/video-editing/VideoEditingPage";
import DigitalMarketingPage from "@/components/services/digital-marketing/DigitalMarketingPage";
import UIUXPage from "@/components/services/uiux/UIUXPage";
import WebDevelopmentPage from "@/components/services/web-development/WebDevelopmentPage";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  // Route 01 or video-editing to the Video Editing & Motion Direction page
  if (slug === "01" || slug === "video-editing") {
    return <VideoEditingPage />;
  }

  // Route 02 or ui-ux-design to the UI/UX Design page
  if (slug === "02" || slug === "ui-ux-design") {
    return <UIUXPage />;
  }

  // Route 03 or web-development to the Web Development page
  if (slug === "03" || slug === "web-development" || slug === "web-and-digital-development") {
    return <WebDevelopmentPage />;
  }

  // Route 05 or digital-marketing to the Digital Marketing page
  if (slug === "05" || slug === "digital-marketing") {
    return <DigitalMarketingPage />;
  }

  // Default fallback
  return <VideoEditingPage />;
}
