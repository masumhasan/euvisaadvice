"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { Field, INPUT_CLASS, SelectField } from "../forms/Field";

const LANGUAGES = ["English", "Deutsch", "Français"];
const CATEGORIES = [
  "Points-Based Jobseeker ( 20a AufenthG)",
  "EU Blue Card ( 18g AufenthG)",
  "Skilled Academic & Vocational ( 18a/b AufenthG)",
  "Family Reunification & Spousal Visas ( 27-36)",
  "ICT Intra-Corporate Transfer Directive (2014/66/EU)",
];
const FORMATS = [
  { id: "video", label: "Video Masterclass", icon: "play_circle", hint: "Video modules + assets" },
  { id: "ebook", label: "E-Book / PDF Course", icon: "auto_stories", hint: "Downloadable PDF playbook" },
  { id: "bundle", label: "Complete Bundle", icon: "all_inclusive", hint: "Video + companion E-Book" },
];

const TOOLBAR = [
  { icon: "format_bold", title: "Bold" },
  { icon: "format_italic", title: "Italic" },
  null,
  { icon: "format_list_bulleted", title: "Bullet List" },
  { icon: "format_list_numbered", title: "Numbered List" },
  { icon: "format_quote", title: "Insert Official Quote" },
  { icon: "link", title: "Link Reference" },
  null,
  { icon: "code", title: "Reference Code" },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const DEFAULT_SLUG = "chancenkarte-opportunity-card";

export function IdentificationCard({ onSlugChange }: { onSlugChange: (slug: string) => void }) {
  const [slug, setSlug] = useState(DEFAULT_SLUG);
  const [language, setLanguage] = useState("English");
  const [format, setFormat] = useState("video");

  function updateSlug(next: string) {
    setSlug(next);
    onSlugChange(next);
  }

  return (
    <div className="bg-surface-level-2 rounded-xl p-space-md sm:p-space-lg shadow-md relative overflow-hidden">
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-2">
          <Icon className="text-primary text-[22px]" name="domain_verification" />
          <h2 className="font-title-card text-title-card text-text-primary">Course Identification &amp; Overview</h2>
        </div>
        <span className="font-label-code text-label-code text-primary bg-surface-level-1 px-2.5 py-1 rounded-md">
          ID: MSTR-2026-ACAD
        </span>
      </div>
      <div className="space-y-space-md">
        <Field hint="Choose whether you are offering video lessons, a standalone e-book guide, or both" label="Course Delivery Format" required>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {FORMATS.map((item) => {
              const active = item.id === format;
              return (
                <button
                  key={item.id}
                  className={cn(
                    "flex flex-col text-left p-3 rounded-lg border transition-all text-xs",
                    active
                      ? "bg-primary-container/20 border-primary text-primary"
                      : "bg-surface-level-1 border-transparent hover:bg-surface-elevated text-text-secondary"
                  )}
                  onClick={() => setFormat(item.id)}
                  type="button"
                >
                  <div className="flex items-center gap-1.5 font-label-interactive text-label-interactive font-medium">
                    <Icon className="text-[18px]" name={item.icon} />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-body-muted text-[11px] text-text-muted mt-1">{item.hint}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field hint="Official public title as registered in academy registry & marketplace" htmlFor="course-title" label="Masterclass Title" required>
          <input
            className={INPUT_CLASS}
            defaultValue="Germany Opportunity Card (Chancenkarte) Masterclass"
            id="course-title"
            onChange={(event) => {
              const generated = slugify(event.target.value);
              if (generated) updateSlug(generated);
            }}
            placeholder="e.g. EU Blue Card Fast-Track Application Architecture"
            type="text"
          />
        </Field>
        <Field htmlFor="course-tagline" label="Subtitle & Procedural Tagline" required>
          <input
            className={INPUT_CLASS}
            defaultValue="Complete procedural blueprint for point-based jobseeker immigration (§ 20a AufenthG)"
            id="course-tagline"
            placeholder="Concise statutory benefit or immigration objective"
            type="text"
          />
        </Field>
        <Field htmlFor="course-slug" label="Canonical URL & Slug">
          <div className="flex items-center rounded-lg bg-surface-level-1 overflow-hidden focus-within:bg-surface-container-high">
            <span className="pl-space-md pr-2 py-2.5 font-label-code text-label-code text-text-muted bg-surface-container-low select-none">
              euvisaadvice.com/courses/
            </span>
            <input
              className="w-full bg-transparent text-primary font-label-code text-label-code px-2 py-2.5 focus:outline-none"
              id="course-slug"
              onChange={(event) => updateSlug(event.target.value)}
              type="text"
              value={slug}
            />
            <button
              aria-label="Copy slug"
              className="px-3 text-text-muted hover:text-text-primary transition-colors"
              onClick={() => navigator.clipboard?.writeText(slug)}
              type="button"
            >
              <Icon className="text-[18px]" name="content_copy" />
            </button>
          </div>
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-1">
          <Field htmlFor="legal-category" label="Category / Legal Domain" required>
            <SelectField id="legal-category" options={CATEGORIES} />
          </Field>
          <Field label="Primary Language of Instruction">
            <div className="grid grid-cols-3 gap-2" role="radiogroup">
              {LANGUAGES.map((item) => {
                const active = item === language;
                return (
                  <button
                    key={item}
                    aria-checked={active}
                    className={cn(
                      "flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg transition-all",
                      active
                        ? "bg-primary-container/20 text-primary"
                        : "bg-surface-level-1 hover:bg-surface-elevated text-text-secondary",
                    )}
                    onClick={() => setLanguage(item)}
                    role="radio"
                    type="button"
                  >
                    <span className={cn("font-label-interactive text-label-interactive", active && "font-medium")}>{item}</span>
                    {active && <Icon className="text-[16px]" name="check_circle" />}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <label className="font-label-interactive text-label-interactive text-text-primary" htmlFor="course-syllabus">
              Procedural Syllabus &amp; Applicant Blueprint
            </label>
            <span className="font-label-code text-label-code text-text-muted">Markdown Supported</span>
          </div>
          <div className="bg-surface-level-1 rounded-lg overflow-hidden">
            <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-surface-container-low text-text-secondary">
              {TOOLBAR.map((tool, index) =>
                tool ? (
                  <button
                    key={tool.title}
                    aria-label={tool.title}
                    className="p-1 rounded hover:bg-surface-level-2 text-text-primary transition-colors"
                    title={tool.title}
                    type="button"
                  >
                    <Icon className="text-[16px]" name={tool.icon} />
                  </button>
                ) : (
                  <div key={`sep-${index}`} className="h-4 w-px bg-surface-variant/40 mx-1" />
                ),
              )}
            </div>
            <textarea
              className="w-full bg-transparent text-on-surface p-space-md font-body-default text-body-default focus:outline-none resize-y"
              defaultValue="This intensive masterclass equips international applicants with an end-to-end procedural filing framework under the newly reformed § 20a AufenthG (Opportunity Card / Chancenkarte). Advisor-led modules cover: 1. Preliminary points computation across age, language proficiency (Goethe/TestDaF), and recognized academic credentials (ZAB / anabin). 2. Blocking account setups (Sperrkonto) matching subsistence thresholds (€1,027/mo). 3. Vetting of supplementary part-time work rights and trial employment protocols (§ 20a Abs. 4)."
              id="course-syllabus"
              placeholder="Detail what applicants will accomplish, document checklist guidelines, proof of funds mechanics, and consular preparation strategies..."
              rows={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
