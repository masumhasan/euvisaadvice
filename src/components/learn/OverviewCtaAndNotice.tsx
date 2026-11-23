import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";

export function FirstModuleCta({ courseSlug }: { courseSlug: string }) {
  return (
    <div className="bg-surface-level-2 p-space-xl rounded-2xl shadow-xl text-center relative overflow-hidden">
      <div className="max-w-xl mx-auto space-y-space-md relative z-10">
        <span className="w-8 h-1 bg-primary mx-auto block rounded-full" />
        <h3 className="font-headline-md text-headline-md text-text-primary">Take the first module now</h3>
        <p className="font-body-default text-body-muted text-text-secondary leading-relaxed">
          Module 00 explains the machinery in 22 minutes, and everything after it immediately makes sense.
        </p>
        <div className="pt-2">
          <Button
            className="gap-space-xs px-space-xl bg-primary-container shadow-md"
            href={ROUTES.lesson(courseSlug, "0-1")}
            size="lg"
          >
            <span>Begin Module 00</span>
            <Icon className="text-[18px]" name="play_arrow" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CounselNotice() {
  return (
    <div className="p-space-lg rounded-xl bg-surface-level-1 text-text-muted shadow-sm">
      <div className="flex items-start gap-space-sm">
        <Icon className="text-[20px] text-text-muted shrink-0 mt-0.5" name="policy" />
        <div className="space-y-1">
          <p className="font-label-interactive text-[0.8125rem] text-text-secondary">
            Educational Advisory &amp; Compliance Notice
          </p>
          <p className="font-body-muted text-[0.75rem] text-text-muted leading-relaxed">
            <strong className="text-text-secondary">Educational platform:</strong> EUVisaAdvice Academy is an educational
            platform that provides structured relocation courses, video masterclasses, and practical filing playbooks.
            It is not a law firm, does not provide legal representation, and cannot replace individual legal counsel.
            Embassy jurisdiction rules, required fees, and processing waiting lists are determined by official consular
            authorities and subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}
