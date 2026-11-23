import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StudioShell } from "@/components/studio/StudioShell";

export const metadata: Metadata = {
  title: { default: "Studio", template: "%s | Academy Studio" },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return <StudioShell>{children}</StudioShell>;
}
