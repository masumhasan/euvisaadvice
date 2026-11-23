export type BookCategory = "all" | "work" | "chancenkarte" | "relocation" | "student" | "family";

export interface BookChapter {
  number: number;
  title: string;
  pages: string;
  summary: string;
}

export interface BookExhibit {
  name: string;
  format: "PDF" | "DOCX" | "XLSX";
  description: string;
}

export interface PdfBook {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  category: BookCategory;
  categoryLabel: string;
  reference: string;
  pageCount: number;
  fileSize: string;
  edition: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  highlights: string[];
  chapters: BookChapter[];
  exhibits: BookExhibit[];
  sampleExcerpt: {
    heading: string;
    subheading: string;
    paragraphs: string[];
    legalCallout: string;
  };
}
