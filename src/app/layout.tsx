import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmartLoader from "@/components/SmartLoader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EUVisaAdvice",
  description: "AI-powered EU visa advice platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} antialiased h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
