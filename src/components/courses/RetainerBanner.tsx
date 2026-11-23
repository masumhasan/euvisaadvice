import { Button } from "@/components/ui/Button";
import { MAIN_SITE_LINKS } from "@/constants/routes";

export function RetainerBanner() {
  return (
    <div className="max-w-[1440px] mx-auto px-gutter w-full mb-space-xl">
      <div className="relative rounded-2xl bg-gradient-to-r from-surface-level-2 via-surface-elevated to-surface-level-1 border border-gold-hairline p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-xl">
        <div className="max-w-2xl">
          <span className="font-label-code text-xs text-primary font-semibold tracking-wider uppercase">
            Retainer Client Benefit
          </span>
          <h3 className="font-headline-md text-headline-md text-text-primary mt-1">
            Full Legal Retainer includes Complete Course Access
          </h3>
          <p className="font-body-muted text-body-muted text-text-secondary mt-1">
            Are you working directly with our Frankfurt or Berlin legal liaison? All Academy curriculum playbooks and
            digital templates are unlocked at no additional cost.
          </p>
        </div>
        <div className="flex items-center gap-space-md flex-shrink-0">
          <Button
            className="shadow-[0_4px_16px_rgba(217,164,65,0.25)]"
            external
            href={MAIN_SITE_LINKS.services}
            size="lg"
          >
            Claim Retainer Access
          </Button>
        </div>
      </div>
    </div>
  );
}
