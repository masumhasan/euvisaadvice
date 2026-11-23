import type { ReactNode } from "react";
import { AcademyFooter } from "./AcademyFooter";
import { AcademyNavbar } from "./AcademyNavbar";

/** Public/student chrome: fixed top navbar, content area, footer. */
export function AcademyShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AcademyNavbar />
      <main className="w-full pt-20 bg-surface-base min-h-screen">{children}</main>
      <AcademyFooter />
    </>
  );
}
