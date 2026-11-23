import { Icon } from "@/components/ui/Icon";
import { PAYMENT } from "@/constants/mock/payment";

export function PaymentHero() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center mt-space-lg mb-space-2xl">
      <div className="inline-flex items-center gap-space-xs bg-surface-level-2/90 border border-gold-hairline-bright px-space-md py-space-xs rounded-full shadow-lg mb-space-lg backdrop-blur-md">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-status-success-bg text-status-success">
          <Icon className="text-[15px]" filled name="check_circle" />
        </span>
        <span className="font-label-caps text-label-caps text-gold-highlight tracking-widest uppercase">
          {PAYMENT.gatewayLabel}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-tertiary animate-pulse" />
      </div>
      <h1 className="font-headline-lg text-headline-lg md:text-[2.75rem] text-text-primary tracking-tight max-w-3xl leading-[1.15] mb-space-sm">
        {PAYMENT.headline.lead}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-highlight via-primary to-amber-200">
          {PAYMENT.headline.accent}
        </span>
      </h1>
      <p className="font-body-legal text-body-legal text-text-secondary max-w-2xl">{PAYMENT.intro}</p>
      <div className="mt-space-md inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-lg bg-surface-level-1/80 border border-border-neutral text-body-muted font-body-muted text-on-surface-variant">
        <Icon className="text-gold-highlight text-[18px]" name="mark_email_read" />
        <span>
          A confirmation dispatch and verified VAT invoice have been sent to{" "}
          <strong className="text-text-primary font-medium">{PAYMENT.email}</strong>
        </span>
      </div>
    </div>
  );
}
