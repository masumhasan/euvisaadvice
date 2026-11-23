"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Phase = "idle" | "generating" | "done";

/** Mock invoice download: shows the generating / downloaded states from the design. */
export function InvoiceDownloadButton({ size }: { size: string }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function start() {
    setPhase("generating");
    timers.current.push(
      setTimeout(() => {
        setPhase("done");
        timers.current.push(setTimeout(() => setPhase("idle"), 3000));
      }, 900),
    );
  }

  return (
    <button
      className={cn(
        "w-full flex items-center justify-center gap-space-sm bg-surface-level-1 hover:bg-surface-elevated text-text-primary border border-gold-hairline hover:border-gold-hairline-bright py-space-sm px-space-md rounded-lg font-label-interactive text-label-interactive transition-all duration-200 group cursor-pointer",
        phase !== "idle" && "opacity-80 pointer-events-none",
      )}
      onClick={start}
      type="button"
    >
      {phase === "idle" && (
        <>
          <Icon
            className="text-gold-highlight text-[20px] group-hover:-translate-y-0.5 transition-transform"
            name="receipt_long"
          />
          <span>Download Official Tax Invoice (PDF)</span>
          <span className="font-label-code text-[11px] text-text-muted">{size}</span>
        </>
      )}
      {phase === "generating" && (
        <>
          <Icon className="text-tertiary text-[20px] animate-spin" name="sync" />
          <span>Generating Verified VAT Receipt...</span>
        </>
      )}
      {phase === "done" && (
        <>
          <Icon className="text-status-success text-[20px]" name="check" />
          <span>PDF Downloaded (Invoice #EUA-8841X)</span>
        </>
      )}
    </button>
  );
}
