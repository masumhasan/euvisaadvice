"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { CourseFaq } from "@/types/courseDetail";

export function FaqAccordion({ faqs }: { faqs: CourseFaq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="space-y-space-md">
      <div className="border-b border-border-neutral pb-space-sm">
        <h2 className="font-title-card text-title-card text-text-primary">Frequently Asked Questions</h2>
        <p className="font-body-muted text-body-muted text-text-secondary">
          Answers to common procedural inquiries regarding access, legal advisory, and scope.
        </p>
      </div>
      <div className="space-y-space-xs">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div key={faq.question} className="rounded-lg border border-border-neutral bg-surface-level-1 overflow-hidden">
              <button
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-space-md text-left transition-colors hover:bg-surface-level-2"
                onClick={() => setOpen(isOpen ? null : index)}
                type="button"
              >
                <span className="font-title-card text-[0.9375rem] text-text-primary">{faq.question}</span>
                <Icon
                  className={cn("text-text-secondary text-[20px] transition-transform duration-200", isOpen && "rotate-180")}
                  name={isOpen ? "remove" : "add"}
                />
              </button>
              {isOpen && (
                <div className="p-space-md pt-0 text-text-secondary font-body-default text-body-default border-t border-border-neutral/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
