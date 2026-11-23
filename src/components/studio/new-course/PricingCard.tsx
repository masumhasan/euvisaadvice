import { Icon } from "@/components/ui/Icon";
import { Field, INPUT_CLASS, SelectField } from "../forms/Field";

const CURRENCIES = ["EUR (€) - Primary EU Account", "USD ($) - Global Wire", "GBP (£) - UK & Commonwealth"];
const VAT_CATEGORIES = [
  "Standard EU Digital Services (German 19% MwSt auto-calculated via recipient country)",
  "B2B Reverse Charge / Corporate Tax ID Validation (0% MwSt)",
  "Exempt Educational Directive (§ 4 Nr. 21 UStG)",
];

export function PricingCard() {
  return (
    <div className="bg-surface-level-2 rounded-xl p-space-md sm:p-space-lg shadow-md">
      <div className="flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-2">
          <Icon className="text-primary text-[22px]" name="payments" />
          <h2 className="font-title-card text-title-card text-text-primary">Payoneer Global Settlement &amp; Tuition Tiers</h2>
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary bg-surface-level-1 px-2.5 py-1 rounded-md">
          <span className="w-2 h-2 rounded-full bg-status-success" />
          <span className="font-label-code text-label-code">Payoneer Rail: Connected</span>
        </div>
      </div>
      <div className="space-y-space-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
          <Field htmlFor="currency" label="Settlement Currency">
            <SelectField id="currency" options={CURRENCIES} />
          </Field>
          <Field htmlFor="tuition-price" label="Tuition Fee (€)" required>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary font-semibold">€</span>
              <input
                className={`${INPUT_CLASS} pl-8 font-headline-sm text-headline-sm font-semibold`}
                defaultValue="189.00"
                id="tuition-price"
                inputMode="decimal"
                type="text"
              />
            </div>
          </Field>
          <Field htmlFor="compare-price" label="Compare-At Price (€)">
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">€</span>
              <input
                className={`${INPUT_CLASS} pl-8 text-text-muted line-through font-headline-sm text-headline-sm`}
                defaultValue="299.00"
                id="compare-price"
                inputMode="decimal"
                type="text"
              />
            </div>
          </Field>
        </div>
        <Field htmlFor="vat-tax" label="EU VAT One Stop Shop (OSS) Statutory Category">
          <SelectField id="vat-tax" options={VAT_CATEGORIES} />
        </Field>

      </div>
    </div>
  );
}
