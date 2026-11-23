import type { Metadata } from "next";
import { ActiveTrackCard } from "@/components/dashboard/ActiveTrackCard";
import { CourseListPanel } from "@/components/dashboard/CourseListPanel";
import { LiveCohortBanner } from "@/components/dashboard/LiveCohortBanner";
import { StatCards } from "@/components/dashboard/StatCards";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";

export const metadata: Metadata = { title: "My Learning" };

export default function MyLearningPage() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-gutter py-space-xl text-on-surface">
      <WelcomeBanner />
      <StatCards />
      <ActiveTrackCard />
      <div className="flex flex-col gap-space-xl">
        <CourseListPanel />
        <LiveCohortBanner />
      </div>
    </div>
  );
}
