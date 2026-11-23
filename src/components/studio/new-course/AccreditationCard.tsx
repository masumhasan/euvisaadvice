"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Field, SelectField } from "../forms/Field";

const INSTRUCTORS = [
  "EUVisaAdvice Expert Team",
  "Dr. Elena Rostova (EU Mobility Specialist)",
  "Julian von Bernstorff (Schengen Visa Appeals)",
  "Claire Delacroix (European Relocation Advisor)",
];
const LEVELS = [
  "Advanced / Skilled Self-Filer",
  "Corporate Mobility HR & Counsel",
  "Standard First-Time Applicant",
  "Executive & Founder Relocation",
];
const STATS = [
  { label: "Course Modules", value: "6", unit: "Modules" },
  { label: "Total Lessons", value: "18", unit: "Chapters" },
  { label: "Video & Advisory Runtime", value: "3.5", unit: "Hours" },
];

export function AccreditationCard() {
  const [tags, setTags] = useState(["§ 20a AufenthG", "BAMF Scoring Grid 2026", "VwGO Consular Remonstrance"]);
  const [draft, setDraft] = useState("");

  function addTag() {
    const value = draft.trim();
    if (value && !tags.includes(value)) setTags([...tags, value]);
    setDraft("");
  }

  return (
    <div className="bg-surface-level-2 rounded-xl p-space-md sm:p-space-lg shadow-md">
      <div className="flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-2">
          <Icon className="text-primary text-[22px]" name="verified" />
          <h2 className="font-title-card text-title-card text-text-primary">Immigration Framework &amp; Course Accreditation</h2>
        </div>
        <span className="font-label-caps text-label-caps text-tertiary bg-tertiary-container/10 px-2.5 py-1 rounded-md uppercase font-semibold">
          BAMF Compliant
        </span>
      </div>
      <div className="space-y-space-md">
        <Field htmlFor="statute-input" label="Regulatory Authority &amp; Directives">
          <div className="flex flex-wrap items-center gap-2 p-2 bg-surface-level-1 rounded-lg">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high text-primary font-label-code text-label-code"
              >
                <span>{tag}</span>
                <button
                  aria-label={`Remove ${tag}`}
                  className="hover:text-status-danger transition-colors"
                  onClick={() => setTags(tags.filter((item) => item !== tag))}
                  type="button"
                >
                  <Icon className="text-[14px]" name="close" />
                </button>
              </span>
            ))}
            <input
              className="bg-transparent text-text-primary placeholder-text-muted px-2 py-1 font-label-code text-label-code focus:outline-none flex-1 min-w-[160px]"
              id="statute-input"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addTag();
                }
              }}
              placeholder="+ Add statute or regulation..."
              type="text"
              value={draft}
            />
          </div>
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <Field htmlFor="lead-instructor" label="Lead Instructor / Author" required>
            <SelectField icon="expand_more" id="lead-instructor" options={INSTRUCTORS} />
          </Field>
          <Field htmlFor="audience-level" label="Applicant Target Level">
            <SelectField icon="expand_more" id="audience-level" options={LEVELS} />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-space-sm pt-2">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-surface-level-1 rounded-lg p-3 flex flex-col gap-1">
              <span className="font-label-caps text-label-caps text-text-muted uppercase">{stat.label}</span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-sm text-headline-sm text-text-primary font-bold">{stat.value}</span>
                <span className="font-label-code text-label-code text-text-muted">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
