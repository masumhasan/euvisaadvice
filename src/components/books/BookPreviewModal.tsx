"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { PdfBook } from "@/types/book";

interface BookPreviewModalProps {
  book: PdfBook;
  onClose: () => void;
  onBuy: () => void;
}

export function BookPreviewModal({ book, onClose, onBuy }: BookPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<"contents" | "excerpt" | "exhibits">("contents");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-surface-level-1 border border-gold-hairline rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-space-md sm:p-space-lg border-b border-border-neutral bg-surface-level-2/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-gold-hairline flex items-center justify-center text-primary">
              <Icon className="text-[20px]" name="menu_book" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-code text-[11px] text-primary uppercase font-semibold">
                  Sample Preview &amp; Index
                </span>
                <span className="text-text-muted text-xs">•</span>
                <span className="text-xs text-text-muted font-label-code">{book.edition}</span>
              </div>
              <h3 className="font-title-card text-title-card text-text-primary line-clamp-1">{book.title}</h3>
            </div>
          </div>
          <button
            aria-label="Close preview"
            className="w-8 h-8 rounded-lg bg-surface-level-1 border border-border-neutral text-text-muted hover:text-text-primary flex items-center justify-center transition-colors"
            onClick={onClose}
            type="button"
          >
            <Icon className="text-[20px]" name="close" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-space-md sm:p-space-lg grid grid-cols-1 md:grid-cols-12 gap-space-lg">
          {/* Left: Book Cover & Quick Meta */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="relative w-44 sm:w-56 aspect-[3/4] rounded-lg overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.8)] border border-gold-hairline group">
              <Image alt={book.title} className="object-cover" fill sizes="(max-width: 768px) 220px, 260px" src={book.image} />
              {/* 3D spine shadow */}
              <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-label-code bg-black/75 text-primary border border-gold-hairline backdrop-blur-sm">
                PDF + ePub
              </div>
            </div>

            <div className="mt-4 w-full bg-surface-level-2/60 border border-border-neutral rounded-xl p-3 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between text-text-muted">
                <span>Page Count:</span>
                <strong className="text-text-primary font-label-code">{book.pageCount} Pages</strong>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>File Size:</span>
                <strong className="text-text-primary font-label-code">{book.fileSize} (Instant Download)</strong>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Legal Authority:</span>
                <strong className="text-primary font-label-code">{book.reference}</strong>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>Publishing Board:</span>
                <span className="text-text-secondary">EUVisaAdvice Legal Press</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Tabs & Content */}
          <div className="md:col-span-7 flex flex-col min-w-0">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-border-neutral pb-2 mb-4">
              <button
                className={`px-3 py-1.5 rounded-lg text-xs font-label-interactive transition-colors ${
                  activeTab === "contents"
                    ? "bg-primary text-on-primary font-semibold shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-level-2"
                }`}
                onClick={() => setActiveTab("contents")}
                type="button"
              >
                Table of Contents ({book.chapters.length})
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg text-xs font-label-interactive transition-colors ${
                  activeTab === "excerpt"
                    ? "bg-primary text-on-primary font-semibold shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-level-2"
                }`}
                onClick={() => setActiveTab("excerpt")}
                type="button"
              >
                Sample Excerpt
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg text-xs font-label-interactive transition-colors ${
                  activeTab === "exhibits"
                    ? "bg-primary text-on-primary font-semibold shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-level-2"
                }`}
                onClick={() => setActiveTab("exhibits")}
                type="button"
              >
                Included Exhibits ({book.exhibits.length})
              </button>
            </div>

            {/* Tab 1: Table of Contents */}
            {activeTab === "contents" && (
              <div className="space-y-2.5 overflow-y-auto max-h-[340px] pr-1">
                {book.chapters.map((ch) => (
                  <div
                    key={ch.number}
                    className="p-3 rounded-lg bg-surface-level-2/50 border border-border-neutral/80 hover:border-gold-hairline transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-label-code text-[11px] text-primary font-semibold">
                        Chapter 0{ch.number}
                      </span>
                      <span className="font-label-code text-[11px] text-text-muted">{ch.pages}</span>
                    </div>
                    <h5 className="font-title-card text-xs font-semibold text-text-primary">{ch.title}</h5>
                    <p className="font-body-muted text-xs text-text-secondary mt-1">{ch.summary}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Sample Excerpt */}
            {activeTab === "excerpt" && (
              <div className="space-y-3 overflow-y-auto max-h-[340px] pr-1">
                <div className="border-b border-border-neutral pb-2">
                  <h4 className="font-title-card text-sm text-text-primary font-bold">{book.sampleExcerpt.heading}</h4>
                  <span className="text-xs text-primary font-label-code">{book.sampleExcerpt.subheading}</span>
                </div>
                {book.sampleExcerpt.paragraphs.map((p, index) => (
                  <p key={index} className="text-xs leading-relaxed text-text-secondary">
                    {p}
                  </p>
                ))}
                <div className="p-3 rounded-lg bg-gold-subtle-fill border border-gold-hairline text-xs text-text-primary">
                  <div className="flex items-center gap-1.5 text-primary font-semibold mb-1">
                    <Icon className="text-[16px]" name="verified" />
                    <span>Statutory Note</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{book.sampleExcerpt.legalCallout}</p>
                </div>
              </div>
            )}

            {/* Tab 3: Included Exhibits */}
            {activeTab === "exhibits" && (
              <div className="space-y-2.5 overflow-y-auto max-h-[340px] pr-1">
                <p className="text-xs text-text-muted mb-2">
                  When you purchase this PDF book, you receive immediate access to the full handbook plus the following
                  editable templates:
                </p>
                {book.exhibits.map((ex) => (
                  <div
                    key={ex.name}
                    className="p-3 rounded-lg bg-surface-level-2/50 border border-border-neutral flex items-start gap-3"
                  >
                    <div className="px-2 py-1 rounded bg-primary/10 border border-primary/30 text-primary font-label-code text-[10px] font-bold">
                      {ex.format}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-label-code text-xs font-semibold text-text-primary truncate">{ex.name}</div>
                      <p className="text-xs text-text-secondary mt-0.5">{ex.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer / Purchase Bar */}
        <div className="p-space-md sm:p-space-lg border-t border-border-neutral bg-surface-level-2/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-baseline gap-2.5">
            <span className="font-headline-sm text-headline-sm font-bold text-text-primary">€{book.price}</span>
            <span className="text-text-muted line-through text-xs">€{book.originalPrice}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-label-code font-bold bg-status-success-bg border border-status-success/30 text-status-success">
              Save {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-border-neutral text-text-secondary hover:text-text-primary text-xs font-label-interactive transition-colors"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
            <button
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-xs font-semibold shadow-[0_4px_16px_rgba(217,164,65,0.3)] transition-all"
              onClick={() => {
                onClose();
                onBuy();
              }}
              type="button"
            >
              <Icon className="text-[16px]" name="lock_open" />
              <span>Buy PDF — Instant Access</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
