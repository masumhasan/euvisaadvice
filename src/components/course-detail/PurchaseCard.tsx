"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { MAIN_SITE_LINKS, ROUTES } from "@/constants/routes";
import type { CourseDetail } from "@/types/courseDetail";
import { PreviewModal } from "./PreviewModal";

const PREVIEW_LESSON_ID = "0-1";

export function PurchaseCard({ course }: { course: CourseDetail }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const { purchase } = course;
  const previewLesson = course.modules[0]?.lessons?.[0];

  return (
    <aside className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-space-md" id="preview">
      <div className="rounded-xl bg-surface-level-1 border border-gold-hairline shadow-2xl overflow-hidden backdrop-blur-sm">
        <button
          aria-label="Play preview lesson"
          className="relative block w-full aspect-[16/9] group overflow-hidden bg-surface-level-2"
          onClick={() => setPreviewOpen(true)}
          type="button"
        >
          <Image
            alt={`${course.title} preview`}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(min-width: 1280px) 30vw, 100vw"
            src={purchase.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-surface-base/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary/95 text-on-primary flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gold-hover transition-all">
              <Icon className="text-[28px] translate-x-0.5" filled name="play_arrow" />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded bg-surface-base/90 border border-gold-hairline text-primary font-label-code text-[11px] backdrop-blur-md">
              {purchase.previewLabel}
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-base/80 text-text-secondary font-label-code text-[11px]">
              1080p Full HD Stream
            </span>
          </div>
        </button>

        <div className="p-space-lg space-y-space-md">
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-headline-lg text-[2.25rem] font-bold text-text-primary tracking-tight">
                €{purchase.price}
              </span>
              <span className="font-headline-sm text-text-muted line-through text-[1.25rem]">€{purchase.listPrice}</span>
              <span className="px-2 py-0.5 rounded bg-status-success-bg border border-status-success/30 text-status-success font-label-code text-[11px] font-semibold">
                {purchase.discountLabel}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-primary font-label-code text-[12px]">
              <Icon className="text-[14px]" name="folder_special" />
              <span>{purchase.kitNote}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link
              className="w-full py-3.5 px-space-md rounded-lg bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-label-interactive tracking-wide uppercase transition-all shadow-[0_4px_20px_rgba(217,164,65,0.25)] hover:shadow-[0_4px_24px_rgba(217,164,65,0.4)] flex items-center justify-center gap-2"
              href={ROUTES.paymentSuccess}
            >
              <Icon className="text-[20px]" name="lock_open" />
              <span>Buy Course — Instant Access</span>
            </Link>
            <div className="text-center">
              <a
                className="font-body-muted text-[0.8125rem] text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-1"
                href={MAIN_SITE_LINKS.services}
              >
                <span>Or included with EUVisaAdvice Premium Advisory</span>
                <Icon className="text-[14px]" name="arrow_forward" />
              </a>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-level-2/60 border border-border-neutral text-center font-label-code text-[11px] text-text-muted space-y-0.5">
            <div className="flex items-center justify-center gap-1.5 text-text-secondary">
              <Icon className="text-primary text-[14px]" name="verified" />
              <span>{purchase.guarantee}</span>
            </div>
            <p>Lifetime access • Includes all upcoming 2026 curriculum updates</p>
          </div>

          <div className="space-y-space-sm pt-2 border-t border-border-neutral">
            <h4 className="font-label-interactive text-label-interactive text-text-primary text-[0.8125rem] uppercase tracking-wider">
              This Masterclass Includes:
            </h4>
            <ul className="space-y-2.5 font-body-muted text-[0.8125rem] text-text-secondary">
              {purchase.features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-2.5">
                  <Icon className="text-primary text-[16px] mt-0.5" filled name="check_circle" />
                  <span>
                    {feature.strong && <strong>{feature.strong}</strong>}
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-border-neutral/60 flex items-center justify-between text-text-muted font-label-code text-[11px]">
            <span className="flex items-center gap-1">
              <Icon className="text-status-success text-[14px]" name="lock" />
              <span>Secure 256-bit Checkout</span>
            </span>
            <span className="text-text-muted">EU / VAT Compliant Invoicing</span>
          </div>
        </div>
      </div>

      <div className="p-space-md rounded-xl bg-surface-level-1 border border-border-neutral flex items-center gap-space-sm">
        <div className="p-2.5 rounded-lg bg-surface-level-2 text-primary border border-gold-hairline">
          <Icon className="text-[20px]" name="corporate_fare" />
        </div>
        <div className="text-[0.8125rem]">
          <span className="font-title-card text-text-primary block">Corporate or Team Relocation?</span>
          <a className="text-primary hover:text-gold-hover transition-colors font-medium" href={MAIN_SITE_LINKS.services}>
            Inquire for multi-candidate corporate licenses →
          </a>
        </div>
      </div>

      {previewOpen && (
        <PreviewModal
          image={purchase.image}
          lessonHref={ROUTES.lesson(course.slug, PREVIEW_LESSON_ID)}
          onClose={() => setPreviewOpen(false)}
          title={previewLesson?.title ?? course.title}
        />
      )}
    </aside>
  );
}
