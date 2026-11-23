import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { PAYMENT } from "@/constants/mock/payment";

export function NextStepsGrid() {
  return (
    <div className="mb-space-2xl relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md">
        <div>
          <span className="font-label-caps text-label-caps text-gold-highlight uppercase tracking-wider">
            Immediate Onboarding
          </span>
          <h2 className="font-headline-sm text-headline-sm text-text-primary">Next Steps for Immediate Activation</h2>
        </div>
        <div className="flex items-center gap-2 text-text-muted font-label-code text-label-code">
          <span className="inline-block w-2 h-2 rounded-full bg-tertiary" /> PORTAL REPOSITORY READY
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {PAYMENT.nextSteps.map((step) => (
          <div
            key={step.number}
            className="bg-surface-level-2 rounded-xl border border-gold-hairline p-space-lg relative flex flex-col justify-between hover:border-gold-hairline-bright transition-all group shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-label-code text-headline-sm font-bold text-gold-highlight/40 group-hover:text-gold-highlight transition-colors">
                  {step.number}
                </span>
                <Icon className={`${step.iconClass} text-[28px]`} name={step.icon} />
              </div>
              <h3 className="font-title-card text-title-card text-text-primary mb-space-xs">{step.title}</h3>
              <p className="font-body-muted text-body-muted text-text-secondary mb-space-md">
                {step.lead && <strong className="text-text-primary">{step.lead}</strong>}
                {step.body}
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-space-xs font-label-interactive text-label-interactive text-primary hover:text-gold-hover transition-colors pt-space-xs"
              href={step.href}
            >
              <span>{step.cta}</span>
              <Icon className="text-[16px]" name={step.ctaIcon} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
