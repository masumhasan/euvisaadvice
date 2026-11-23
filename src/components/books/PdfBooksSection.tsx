"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { BOOK_CATEGORIES, PDF_BOOKS } from "@/constants/mock/books";
import type { BookCategory, PdfBook } from "@/types/book";
import { BookCard } from "./BookCard";
import { BookCheckoutModal } from "./BookCheckoutModal";
import { BookPreviewModal } from "./BookPreviewModal";

const GUARANTEES = [
  {
    icon: "file_download",
    title: "Instant Digital Delivery",
    desc: "Download high-res PDF and ePub editions directly upon checkout.",
  },
  {
    icon: "verified",
    title: "2026 Ordinance Compliance",
    desc: "Authored and certified by registered German immigration lawyers.",
  },
  {
    icon: "inventory_2",
    title: "Editable Dossier Exhibits",
    desc: "Includes customizable Word (.docx) and Excel (.xlsx) templates.",
  },
  {
    icon: "receipt_long",
    title: "Tax Deductible Relocation Expense",
    desc: "Official VAT receipt issued for professional tax write-offs.",
  },
];

export function PdfBooksSection() {
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewBook, setPreviewBook] = useState<PdfBook | null>(null);
  const [checkoutBook, setCheckoutBook] = useState<PdfBook | null>(null);

  const filteredBooks = useMemo(() => {
    return PDF_BOOKS.filter((book) => {
      const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.reference.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Special bundle book object for the all-access bundle checkout
  const bundleBook: PdfBook = {
    slug: "complete-immigration-library-bundle",
    title: "All-Access 2026 Immigration Library Bundle (All 6 PDF Books)",
    subtitle: "Complete collection of field manuals, point calculators, and consular dossier kits.",
    badge: "Ultimate Bundle",
    category: "all",
    categoryLabel: "Master Bundle",
    reference: "All AufenthG Directives • 2026 Revisions",
    pageCount: 746,
    fileSize: "143 MB",
    edition: "2026 Complete Bundle Edition",
    rating: 4.99,
    reviewCount: 650,
    price: 119,
    originalPrice: 222,
    image: "/images/books/book_chancenkarte.jpg",
    description: "Includes all 6 official PDF manuals, 18 customizable exhibits, and free lifetime ordinance updates.",
    highlights: [
      "All 6 Complete PDF & ePub Immigration Books (746 Pages)",
      "18 Editable Checklists, Scoring Sheets, & Cover Letters",
      "Instant watermarked offline downloads for all titles",
      "Save 46% compared to purchasing individual guides",
    ],
    chapters: [],
    exhibits: [],
    sampleExcerpt: { heading: "", subheading: "", paragraphs: [], legalCallout: "" },
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-gutter mb-space-3xl" id="pdf-books">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-space-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-gold-hairline text-primary font-label-code text-xs mb-2">
            <Icon className="text-[15px]" name="menu_book" />
            <span>OFFICIAL PUBLISHING • LEGAL FIELD MANUALS &amp; E-BOOKS</span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-text-primary">
            Immigration PDF Books &amp; Dossier Toolkits
          </h3>
          <p className="font-body-muted text-body-muted text-text-secondary mt-1 max-w-2xl">
            Lawyer-annotated, printable PDF books and submission-ready filing toolkits. Download instantly with
            filled-out form exhibits, bilingual templates, and statutory calculators.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-72">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]" name="search" />
          <input
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-level-1 border border-border-neutral text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PDF books or statutes..."
            type="text"
            value={searchQuery}
          />
          {searchQuery && (
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              onClick={() => setSearchQuery("")}
              type="button"
            >
              <Icon className="text-[16px]" name="close" />
            </button>
          )}
        </div>
      </div>

      {/* Guarantees Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-space-lg">
        {GUARANTEES.map((g) => (
          <div
            key={g.title}
            className="p-3 rounded-xl bg-surface-level-1/80 border border-border-neutral flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gold-subtle-fill border border-gold-hairline flex items-center justify-center text-primary flex-shrink-0">
              <Icon className="text-[18px]" name={g.icon} />
            </div>
            <div className="min-w-0">
              <span className="font-label-code text-xs font-semibold text-text-primary block truncate">{g.title}</span>
              <span className="text-[11px] text-text-secondary truncate block">{g.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-space-lg scrollbar-none">
        {BOOK_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-label-interactive whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                  : "bg-surface-level-1 text-text-secondary hover:text-text-primary border border-border-neutral hover:border-gold-hairline"
              }`}
              onClick={() => setSelectedCategory(cat.key)}
              type="button"
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg mb-space-xl">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.slug}
              book={book}
              onBuy={(b) => setCheckoutBook(b)}
              onPreview={(b) => setPreviewBook(b)}
            />
          ))}
        </div>
      ) : (
        <div className="p-space-2xl text-center bg-surface-level-1 rounded-2xl border border-border-neutral mb-space-xl">
          <Icon className="text-text-muted text-[36px] mb-2" name="menu_book" />
          <p className="font-body-default text-text-muted">No PDF books match your search or category filter.</p>
          <button
            className="mt-3 text-xs text-primary font-label-interactive hover:underline"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            type="button"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* All-Access Bundle Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-surface-level-2 via-surface-elevated to-surface-level-1 border border-gold-hairline p-space-lg sm:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-label-code font-bold bg-primary/15 text-primary border border-primary/30 uppercase tracking-wider mb-2">
            <Icon className="text-[14px]" name="auto_awesome" />
            <span>Complete Library Bundle • Save 46%</span>
          </div>
          <h4 className="font-headline-md text-headline-md text-text-primary font-bold">
            All-Access 2026 German Relocation &amp; Immigration Library
          </h4>
          <p className="font-body-muted text-xs sm:text-sm text-text-secondary mt-1.5">
            Get instant offline access to all <strong>6 PDF Books</strong> (746 pages total) plus all 18 editable
            checklists, bilingual embassy cover letters, and scoring audit spreadsheets.
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-text-muted font-label-code">
            <span className="flex items-center gap-1">
              <Icon className="text-primary text-[15px]" name="check" />
              <span>Free lifetime updates</span>
            </span>
            <span className="flex items-center gap-1">
              <Icon className="text-primary text-[15px]" name="check" />
              <span>Multi-device watermarked PDF</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
          <div className="text-center sm:text-right">
            <div className="text-[10px] text-text-muted font-label-code uppercase tracking-wider">Bundle Price</div>
            <div className="flex items-baseline justify-center sm:justify-end gap-2">
              <span className="font-headline-lg text-2xl sm:text-3xl font-bold text-text-primary">€119</span>
              <span className="text-text-muted line-through text-xs font-label-code">€222</span>
            </div>
          </div>
          <button
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-xs sm:text-sm font-semibold shadow-[0_4px_24px_rgba(217,164,65,0.35)] transition-all"
            onClick={() => setCheckoutBook(bundleBook)}
            type="button"
          >
            <Icon className="text-[18px]" name="download" />
            <span>Claim Complete Library</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {previewBook && (
        <BookPreviewModal
          book={previewBook}
          onBuy={() => {
            const b = previewBook;
            setPreviewBook(null);
            setCheckoutBook(b);
          }}
          onClose={() => setPreviewBook(null)}
        />
      )}

      {checkoutBook && <BookCheckoutModal book={checkoutBook} onClose={() => setCheckoutBook(null)} />}
    </section>
  );
}
