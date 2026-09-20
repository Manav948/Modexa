import VideoEditingPage from "@/components/services/video-editing/VideoEditingPage";
import DetailPlaceholder from "@/components/layout/DetailPlaceholder";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  // Route 01 or video-editing to the Stitch Video Editing & Motion Direction page
  if (slug === "01" || slug === "video-editing") {
    return <VideoEditingPage />;
  }

  // Default fallback for other services
  return <VideoEditingPage />;
}
