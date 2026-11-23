import type { Metadata } from "next";
import { IngestPanel } from "@/components/studio/upload/IngestPanel";
import { TopicInspector } from "@/components/studio/upload/TopicInspector";
import { UploadHeader } from "@/components/studio/upload/UploadHeader";
import { UploadStatCards } from "@/components/studio/upload/UploadStatCards";
import { VideoLibrary } from "@/components/studio/upload/VideoLibrary";
import { getStudioCourseTitle } from "@/lib/studio";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: "Video Upload & Transcode" };

export default async function UploadPage({ params }: PageProps) {
  const { id } = await params;
  const title = getStudioCourseTitle(id);

  return (
    <div className="flex flex-col w-full">
      <UploadHeader courseId={id} courseTitle={title} />
      <UploadStatCards />
      <div className="w-full px-4 sm:px-space-lg pb-space-2xl">
        <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row gap-space-lg items-start">
          <div className="w-full xl:w-[68%] flex flex-col gap-space-lg">
            <IngestPanel courseTitle={title} />
            <VideoLibrary />
          </div>
          <TopicInspector />
        </div>
      </div>
    </div>
  );
}
