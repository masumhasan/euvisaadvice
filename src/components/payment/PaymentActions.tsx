import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { PAYMENT } from "@/constants/mock/payment";
import { ROUTES } from "@/constants/routes";

export function PaymentActions() {
  const { trust } = PAYMENT;

  return (
    <>
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-space-md pt-space-md">
        <Link
          className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm bg-primary-container hover:bg-gold-hover text-on-primary-container px-space-xl py-space-sm rounded-lg font-label-interactive text-label-interactive shadow-[0_4px_20px_rgba(217,164,65,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          href={PAYMENT.startHref}
        >
          <span>Start Course Now</span>
          <Icon className="text-[20px]" name="arrow_forward" />
        </Link>
        <Link
          className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm bg-surface-level-2 hover:bg-surface-elevated text-text-primary border border-gold-hairline hover:border-gold-hairline-bright px-space-xl py-space-sm rounded-lg font-label-interactive text-label-interactive transition-all"
          href={ROUTES.myLearning}
        >
          <Icon className="text-text-muted text-[18px]" name="space_dashboard" />
          <span>Go to Student Dashboard</span>
        </Link>
      </div>
      <div className="relative z-10 text-center mt-space-2xl pt-space-md border-t border-border-neutral/60">
        <div className="inline-flex items-center gap-space-lg text-text-muted font-body-muted text-[12px] flex-wrap justify-center">
          <span className="flex items-center gap-1">
            <Icon className="text-[15px] text-tertiary" name="lock" /> {trust.tls}
          </span>
          <span className="text-border-neutral">•</span>
          <span className="flex items-center gap-1">
            <Icon className="text-[15px] text-gold-highlight" name="account_balance" /> {trust.bar}
          </span>
          <span className="text-border-neutral">•</span>
          <span>{trust.ledger}</span>
        </div>
      </div>
    </>
  );
}
