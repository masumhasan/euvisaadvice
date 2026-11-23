"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { PdfBook } from "@/types/book";

interface BookCardProps {
  book: PdfBook;
  onPreview: (book: PdfBook) => void;
  onBuy: (book: PdfBook) => void;
}

export function BookCard({ book, onPreview, onBuy }: BookCardProps) {
  const discountPercent = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div className="group bg-surface-level-2 border border-gold-hairline hover:border-gold-hairline-bright rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(217,164,65,0.2)]">
      <div>
        {/* Book Visual Presentation */}
        <div
          className="relative block w-full bg-surface-elevated/70 p-6 flex items-center justify-center cursor-pointer overflow-hidden border-b border-border-neutral"
          onClick={() => onPreview(book)}
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* 3D Styled Hardcover Book Mockup */}
          <div className="relative w-44 sm:w-48 aspect-[3/4] rounded-md overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.85)] border border-gold-hairline transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
            <Image
              alt={book.title}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              src={book.image}
            />
            {/* Spine Shadow on Left Edge */}
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />
            {/* Book Spine Highlight */}
            <div className="absolute inset-y-0 left-3 w-[1px] bg-white/20 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-label-code font-bold bg-surface-base/90 text-primary border border-gold-hairline backdrop-blur-md">
                {book.badge}
              </span>
            </div>

            {/* Bottom Pages Tag */}
            <div className="absolute bottom-2.5 right-2.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-label-code bg-black/80 text-white backdrop-blur-sm">
                {book.pageCount} Pages • PDF
              </span>
            </div>
          </div>

          {/* Quick Preview Hover Trigger */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-base/95 text-primary border border-gold-hairline text-xs font-label-interactive shadow-lg backdrop-blur-md">
              <Icon className="text-[14px]" name="visibility" />
              <span>Click to Preview Book</span>
            </span>
          </div>
        </div>

        {/* Book Details */}
        <div className="p-space-md sm:p-space-lg flex flex-col gap-2">
          {/* Statutory Reference & Rating */}
          <div className="flex items-center justify-between text-xs font-label-code">
            <span className="text-primary truncate font-medium">{book.reference}</span>
            <div className="flex items-center gap-1 text-gold-highlight flex-shrink-0">
              <Icon className="text-[14px]" filled name="star" />
              <span className="text-text-primary font-bold">{book.rating}</span>
              <span className="text-text-muted text-[11px]">({book.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h4
            className="font-title-card text-title-card text-text-primary group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
            onClick={() => onPreview(book)}
          >
            {book.title}
          </h4>

          {/* Subtitle / Description */}
          <p className="font-body-muted text-xs text-text-secondary line-clamp-2">{book.subtitle}</p>

          {/* Included Features Checklist */}
          <div className="pt-3 mt-1 border-t border-border-neutral/80 space-y-1.5">
            {book.highlights.slice(0, 3).map((item) => (
              <div key={item} className="flex items-start text-xs text-text-muted gap-2">
                <Icon className="text-primary text-[15px] mt-0.5 flex-shrink-0" name="check_circle" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Call-to-Actions */}
      <div className="p-space-md sm:p-space-lg pt-0 border-t border-border-neutral/60 mt-2">
        <div className="flex items-baseline justify-between mb-3 pt-3">
          <div>
            <div className="text-[10px] text-text-muted font-label-code uppercase tracking-wider">Instant Download</div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-sm font-bold text-text-primary">€{book.price}</span>
              <span className="text-text-muted line-through text-xs font-label-code">€{book.originalPrice}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-label-code font-bold bg-status-success-bg border border-status-success/30 text-status-success">
                -{discountPercent}%
              </span>
            </div>
          </div>
          <span className="text-[11px] font-label-code text-text-muted">{book.fileSize} • Watermarked</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-level-1 hover:bg-surface-elevated text-text-secondary hover:text-text-primary border border-border-neutral hover:border-gold-hairline font-label-interactive text-xs transition-colors"
            onClick={() => onPreview(book)}
            type="button"
          >
            <Icon className="text-[15px]" name="menu_book" />
            <span>Preview</span>
          </button>
          <button
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-xs font-semibold transition-colors shadow-sm"
            onClick={() => onBuy(book)}
            type="button"
          >
            <Icon className="text-[15px]" name="lock_open" />
            <span>Buy PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
