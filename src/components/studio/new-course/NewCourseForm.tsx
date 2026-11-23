"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import { AccreditationCard } from "./AccreditationCard";
import { DEFAULT_SLUG, IdentificationCard } from "./IdentificationCard";
import { PricingCard } from "./PricingCard";
import { BadgesCard, StatusCard, VisualAssetCard } from "./SidePanels";
import { WizardSteps } from "./WizardSteps";

export function NewCourseForm() {
  const router = useRouter();
  const [slug, setSlug] = useState(DEFAULT_SLUG);
  const [savedAt, setSavedAt] = useState("14:28 CET");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(ROUTES.studio.curriculum(slug || DEFAULT_SLUG));
  }

  function saveDraft() {
    const now = new Date();
    setSavedAt(`${now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} CET`);
  }

  return (
    <div className="flex flex-col w-full px-space-md sm:px-space-lg lg:px-space-xl py-space-lg max-w-[1440px] mx-auto text-on-surface">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg">
        <div className="flex flex-col gap-1.5 min-w-0">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-caps text-label-caps tracking-widest uppercase text-text-muted">
            <Link className="hover:text-primary transition-colors" href={ROUTES.courses}>
              Courses
            </Link>
            <span className="text-secondary/40 text-[10px]">/</span>
            <Link className="hover:text-primary transition-colors" href={ROUTES.studio.courses}>
              Course Management
            </Link>
            <span className="text-secondary/40 text-[10px]">/</span>
            <span className="text-primary font-semibold">Create New Course</span>
          </nav>
          <h1 className="font-headline-md text-headline-md sm:font-headline-lg sm:text-headline-lg text-text-primary tracking-tight">
            Create New Legal Masterclass &amp; Course
          </h1>
          <p className="font-body-muted text-body-muted text-text-secondary max-w-3xl">
            Configure procedural details, statutory accreditation under German and EU migration law, syllabus frameworks,
            and automated Payoneer settlement tiers.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          <button
            className="px-space-md py-2.5 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-text-primary font-label-interactive text-label-interactive shadow-sm hover:shadow transition-all flex items-center gap-2"
            onClick={saveDraft}
            type="button"
          >
            <Icon className="text-[18px] text-text-secondary" name="save" />
            <span>Save as Draft</span>
          </button>
          <Link
            className="px-space-lg py-2.5 rounded-lg bg-primary-container hover:bg-gold-hover text-on-primary font-label-interactive text-label-interactive shadow-md hover:shadow-xl transition-all flex items-center gap-2 font-semibold"
            href={ROUTES.studio.courses}
          >
            <Icon className="text-[18px]" name="publish" />
            <span>Publish Masterclass</span>
          </Link>
        </div>
      </div>
      <WizardSteps />
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start" onSubmit={handleSubmit}>
        <div className="lg:col-span-8 flex flex-col gap-space-lg min-w-0">
          <IdentificationCard onSlugChange={setSlug} />
          <AccreditationCard />
          <PricingCard />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-space-lg min-w-0">
          <VisualAssetCard />
          <BadgesCard />
          <StatusCard />
          <div className="bg-surface-level-1 rounded-xl p-space-md shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-text-muted font-label-code">
              <span>Auto-Save: {savedAt}</span>
              <span className="text-tertiary">All Changes Stored</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="w-full py-3 rounded-lg bg-primary-container hover:bg-gold-hover text-on-primary font-label-interactive text-label-interactive font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                <Icon className="text-[18px]" name="save" />
                <span>Create Masterclass &amp; Advance to Step 2</span>
              </button>
              <Link
                className="w-full py-2 text-center text-text-muted hover:text-text-primary font-label-interactive text-label-interactive transition-colors"
                href={ROUTES.studio.courses}
              >
                Discard and Return to Catalog
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
