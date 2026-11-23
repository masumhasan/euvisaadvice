import Link from "next/link";
import { MAIN_SITE_LINKS, ROUTES } from "@/constants/routes";
import { BrandLogo } from "./BrandLogo";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const COLUMNS: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Curriculum",
    links: [
      { label: "EU Blue Card Mastery", href: ROUTES.courses },
      { label: "Digital Nomad Visas (Spain & Portugal)", href: ROUTES.courses },
      { label: "German Chancenkarte Guide", href: ROUTES.course("german-national-visa-playbook") },
      { label: "Tax Residency & Cross-Border Law", href: ROUTES.courses },
      { label: "Student Learning Portal", href: ROUTES.myLearning },
    ],
  },
  {
    title: "Advisory Services",
    links: [
      { label: "AI Dossier Audit", href: MAIN_SITE_LINKS.aiVisaAdvice, external: true },
      { label: "Consular Interview Simulation", href: MAIN_SITE_LINKS.services, external: true },
      { label: "Corporate Relocation Advisory", href: MAIN_SITE_LINKS.services, external: true },
      { label: "Document Translation Verification", href: MAIN_SITE_LINKS.services, external: true },
      { label: "Apostille Support", href: MAIN_SITE_LINKS.services, external: true },
    ],
  },
  {
    title: "Legal & Regulatory",
    links: [
      { label: "Terms of Service", href: MAIN_SITE_LINKS.terms, external: true },
      { label: "Privacy & GDPR Disclosure", href: MAIN_SITE_LINKS.privacy, external: true },
      { label: "Educational Disclaimers", href: MAIN_SITE_LINKS.terms, external: true },
      { label: "Professional Standards", href: MAIN_SITE_LINKS.about, external: true },
      { label: "Security & Encryption Specs", href: MAIN_SITE_LINKS.privacy, external: true },
    ],
  },
];

const LINK_CLASS = "text-text-secondary hover:text-primary transition-colors";

export function AcademyFooter() {
  return (
    <footer className="w-full bg-surface-level-1 border-t border-[rgba(218,164,65,0.2)] mt-space-3xl">
      <div className="max-w-[1440px] mx-auto px-gutter py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-2xl">
          <div className="lg:col-span-2 pr-space-md">
            <div className="flex items-center gap-space-sm mb-space-md">
              <BrandLogo className="h-7" />
              <span className="font-title-card text-title-card text-text-primary tracking-tight">
                EUVisaAdvice{" "}
                <span className="text-primary font-body-legal text-[0.8125rem] tracking-wider uppercase font-semibold ml-1">
                  Academy
                </span>
              </span>
            </div>
            <p className="font-body-muted text-body-muted text-text-secondary mb-space-md max-w-sm">
              Authoritative educational courses, video masterclasses, and structured relocation playbooks for European residence, digital
              nomad visas, and skilled worker settlement. EUVisaAdvice Academy is an educational platform, not a law firm.
            </p>
            <div className="font-label-code text-[0.8125rem] text-text-muted space-y-1">
              <p>European Advisory Liaison: Berlin &amp; Frankfurt am Main, Germany</p>
              <p>Corporate Operations: 30 N Gould St, Sheridan, WY 82801, USA</p>
            </div>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="font-label-interactive text-label-interactive text-text-primary uppercase tracking-wider mb-space-md">
                {column.title}
              </h4>
              <ul className="space-y-space-xs font-body-muted text-body-muted">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a className={LINK_CLASS} href={link.href}>
                        {link.label}
                      </a>
                    ) : (
                      <Link className={LINK_CLASS} href={link.href}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-space-lg border-t border-border-neutral flex flex-col md:flex-row items-center justify-between gap-space-md text-text-muted font-body-muted text-[0.8125rem]">
          <p>
            © 2025 EUVisaAdvice Academy. All rights reserved. Not affiliated with the European Commission or
            official national consular divisions.
          </p>
          <p className="font-label-code text-[0.75rem]">Secured with 256-bit TLS Encryption</p>
        </div>
      </div>
    </footer>
  );
}
