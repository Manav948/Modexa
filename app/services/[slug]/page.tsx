import VideoEditingPage from "@/components/services/video-editing/VideoEditingPage";
import DigitalMarketingPage from "@/components/services/digital-marketing/DigitalMarketingPage";
import UIUXPage from "@/components/services/uiux/UIUXPage";

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

  // Route 05 or digital-marketing to the Digital Marketing page
  if (slug === "05" || slug === "digital-marketing") {
    return <DigitalMarketingPage />;
  }

  // Default fallback
  return <VideoEditingPage />;
}
