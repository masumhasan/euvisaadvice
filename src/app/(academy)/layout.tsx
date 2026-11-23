import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "@/styles/globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EUVisaAdvice Academy",
    template: "%s | EUVisaAdvice Academy",
  },
  description:
    "Authoritative legal training and structured compliance curriculums for European visas, residence, and cross-border relocation.",
};

const MATERIAL_SYMBOLS_URL =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`dark ${plusJakarta.variable} ${jetbrainsMono.variable}`} lang="en">
      <head>
        <link href={MATERIAL_SYMBOLS_URL} rel="stylesheet" />
      </head>
      <body className="bg-surface-base font-body-default text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
