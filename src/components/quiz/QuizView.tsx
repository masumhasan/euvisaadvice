"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { QUIZ } from "@/constants/mock/quiz";
import { ROUTES } from "@/constants/routes";
import { QuizQuestionCard } from "./QuizQuestionCard";
import { QuizTrackPanel } from "./QuizTrackPanel";

export function QuizView({ courseSlug }: { courseSlug: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>(QUIZ.initialAnswers);
  const { header } = QUIZ;
  const allAnswered = QUIZ.questions.every((question) => answers[question.id] !== undefined);

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col xl:flex-row gap-space-xl items-start">
      <QuizTrackPanel courseSlug={courseSlug} track={QUIZ.track} />
      <div className="flex-1 w-full max-w-[820px] flex flex-col gap-space-xl">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">{header.kicker}</span>
            <span className="text-text-muted font-label-code text-[10px]">•</span>
            <span className="font-label-caps text-label-caps text-text-secondary tracking-widest uppercase">{header.type}</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-text-primary">{header.title}</h1>
        </div>

        <div className="bg-surface-level-2 p-space-lg rounded-xl flex items-start gap-space-md shadow-md relative overflow-hidden">
          <div className="w-1.5 absolute left-0 top-0 bottom-0 bg-primary" />
          <div className="w-10 h-10 rounded-lg bg-gold-subtle-fill flex items-center justify-center text-primary flex-shrink-0">
            <Icon className="text-[24px]" name="fact_check" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-title-card text-title-card text-text-primary">{header.introTitle}</span>
            <p className="font-body-default text-body-default text-on-surface-variant leading-relaxed">{header.intro}</p>
          </div>
        </div>

        {QUIZ.questions.map((question) => (
          <QuizQuestionCard
            key={question.id}
            onSelect={(option) => setAnswers((current) => ({ ...current, [question.id]: option }))}
            question={question}
            selected={answers[question.id]}
          />
        ))}

        <div className="p-space-md rounded-lg bg-surface-container-lowest text-text-muted flex items-start gap-space-sm">
          <Icon className="text-[18px] text-text-muted mt-0.5 flex-shrink-0" name="shield" />
          <p className="font-body-muted text-[0.75rem] leading-relaxed">
            <strong className="text-text-secondary">General informational guidance only.</strong> {QUIZ.disclaimer}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md pb-space-2xl">
          <Link
            className="inline-flex items-center gap-space-xs font-label-interactive text-label-interactive text-text-secondary hover:text-text-primary transition-colors py-space-sm px-space-md rounded-lg bg-surface-level-1"
            href={ROUTES.lesson(courseSlug, "0-2")}
          >
            <Icon className="text-[18px]" name="arrow_back" />
            <span>Previous: Lesson 3</span>
          </Link>
          <div className="flex items-center gap-space-lg w-full sm:w-auto justify-end">
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-label-code text-[0.75rem] text-text-secondary">Assessment Status</span>
              <span className="font-label-code text-label-code text-primary font-medium">
                {allAnswered ? "Ready for Validation" : "Answer all questions"}
              </span>
            </div>
            <Link
              aria-disabled={!allAnswered}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-space-sm bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-label-interactive font-bold py-space-sm px-space-lg rounded-lg shadow-xl transition-all duration-200 ${allAnswered ? "" : "opacity-50 pointer-events-none"}`}
              href={ROUTES.lesson(courseSlug, "1-1")}
              tabIndex={allAnswered ? undefined : -1}
            >
              <span>Submit Quiz &amp; Unlock Module 01</span>
              <Icon className="text-[18px]" name="arrow_forward" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
