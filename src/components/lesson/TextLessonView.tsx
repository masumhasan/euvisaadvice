import Link from "next/link";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import { TEXT_LESSON } from "@/constants/mock/textLesson";
import { AudioPlayerCard } from "./AudioPlayerCard";
import { LessonArtifacts } from "./LessonArtifacts";
import { OperationalRealities } from "./OperationalRealities";
import { PowerLayers } from "./PowerLayers";
import { PrerequisiteCheckpoint } from "./PrerequisiteCheckpoint";
import { TextLessonSyllabus } from "./TextLessonSyllabus";

interface TextLessonViewProps {
  courseSlug: string;
  nextHref: string;
}

export function TextLessonView({ courseSlug, nextHref }: TextLessonViewProps) {
  const { header, audio, warning } = TEXT_LESSON;
  return (
    <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start pb-space-3xl">
      <TextLessonSyllabus courseSlug={courseSlug} syllabus={TEXT_LESSON.syllabus} />
      <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-space-xl">
        <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-xs">
          <div className="flex items-center gap-space-xs text-primary font-label-caps text-label-caps tracking-widest uppercase">
            <span>{header.module}</span>
            <span className="text-text-muted">•</span>
            <span>{header.moduleTitle}</span>
            <span className="text-text-muted">•</span>
            <span className="text-text-secondary">{header.position}</span>
          </div>
          <div className="flex items-center gap-2 font-label-code text-[12px] bg-surface-level-1 px-3 py-1 rounded-full text-on-surface-variant shadow-sm">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span>{header.status}</span>
          </div>
        </div>

        <div className="space-y-space-xs">
          <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">{header.title}</h1>
          <p className="font-body-legal text-body-legal text-text-secondary max-w-3xl">{header.summary}</p>
        </div>

        <AudioPlayerCard audio={audio} />

        <div className="p-space-lg rounded-xl bg-surface-level-1 shadow-lg relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
          <div className="pl-2 space-y-1">
            <p className="font-label-caps text-label-caps text-primary uppercase">Core Principle</p>
            <p className="font-headline-sm text-[1.125rem] text-text-primary font-semibold leading-relaxed">
              {TEXT_LESSON.principle}
            </p>
          </div>
        </div>

        <PowerLayers layers={TEXT_LESSON.layers} />
        <OperationalRealities realities={TEXT_LESSON.realities} />

        <div className="p-space-lg rounded-xl bg-status-danger-bg shadow-md relative overflow-hidden">
          <div className="flex items-start gap-space-md">
            <Icon className="text-status-danger text-[26px] mt-0.5" filled name="warning" />
            <div className="space-y-1.5">
              <p className="font-label-caps text-label-caps text-status-danger tracking-wider uppercase">
                {warning.kicker}
              </p>
              <h4 className="font-headline-sm text-[1.125rem] text-text-primary font-semibold">{warning.title}</h4>
              <p className="font-body-legal text-[0.875rem] text-on-surface-variant leading-relaxed">
                <HighlightedText highlightClassName="text-text-primary font-semibold" text={warning.text} />
              </p>
            </div>
          </div>
        </div>

        <PrerequisiteCheckpoint checkpoint={TEXT_LESSON.checkpoint} />
        <LessonArtifacts artifacts={TEXT_LESSON.artifacts} sources={TEXT_LESSON.sources} />

        <div className="p-space-md rounded-xl bg-surface-level-2 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-space-md sticky bottom-4 z-20">
          <Link
            className="flex items-center gap-1.5 font-label-interactive text-label-interactive text-text-secondary hover:text-text-primary transition-colors py-2 px-space-sm rounded-lg hover:bg-surface-level-1"
            href={ROUTES.courseOverview(courseSlug)}
          >
            <Icon className="text-[18px]" name="arrow_back" />
            <span>Previous: Course Overview</span>
          </Link>
          <div className="flex items-center gap-space-md">
            <span className="font-label-code text-[12px] text-text-muted hidden md:inline-block">Lesson 1 of 27 Complete</span>
            <Link
              className="px-space-lg py-2.5 rounded-lg bg-primary text-on-primary font-label-interactive text-label-interactive flex items-center gap-2 hover:bg-gold-hover transition-all shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
              href={nextHref}
            >
              <span>Mark Done &amp; Continue</span>
              <Icon className="text-[18px]" name="arrow_forward" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
