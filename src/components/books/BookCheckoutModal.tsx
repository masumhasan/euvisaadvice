"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { PdfBook } from "@/types/book";

interface BookCheckoutModalProps {
  book: PdfBook;
  onClose: () => void;
}

export function BookCheckoutModal({ book, onClose }: BookCheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "paypal">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-surface-level-1 border border-gold-hairline rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-space-md sm:p-space-lg border-b border-border-neutral bg-surface-level-2/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-gold-hairline flex items-center justify-center text-primary">
              <Icon className="text-[18px]" name="shopping_bag" />
            </div>
            <div>
              <span className="font-label-code text-[11px] text-primary uppercase font-semibold">
                Instant Digital Checkout
              </span>
              <h3 className="font-title-card text-title-card text-text-primary">
                {isSuccess ? "Purchase Complete" : "Buy Official PDF Guide"}
              </h3>
            </div>
          </div>
          <button
            aria-label="Close checkout"
            className="w-8 h-8 rounded-lg bg-surface-level-1 border border-border-neutral text-text-muted hover:text-text-primary flex items-center justify-center transition-colors"
            onClick={onClose}
            type="button"
          >
            <Icon className="text-[18px]" name="close" />
          </button>
        </div>

        {/* Content */}
        {!isSuccess ? (
          <form className="p-space-md sm:p-space-lg space-y-4" onSubmit={handleSubmit}>
            {/* Book Summary Card */}
            <div className="p-3 rounded-xl bg-surface-level-2/70 border border-border-neutral flex items-center gap-3">
              <div className="relative w-14 aspect-[3/4] rounded-md overflow-hidden border border-gold-hairline flex-shrink-0">
                <Image alt={book.title} className="object-cover" fill sizes="60px" src={book.image} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-title-card text-xs text-text-primary font-semibold line-clamp-1">{book.title}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-text-muted font-label-code">
                  <span>{book.pageCount} Pages</span>
                  <span>•</span>
                  <span>PDF + ePub</span>
                  <span>•</span>
                  <span className="text-primary font-semibold">{book.edition}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-headline-sm text-sm font-bold text-text-primary">€{book.price}</span>
                <span className="block text-[10px] text-text-muted line-through">€{book.originalPrice}</span>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-label-code text-text-secondary" htmlFor="checkout-email">
                Delivery Email Address <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-level-2 border border-border-neutral text-text-primary text-xs focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted"
                  id="checkout-email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  type="email"
                  value={email}
                />
              </div>
              <p className="text-[11px] text-text-muted">
                Your watermarked PDF download link and tax invoice will be sent here immediately.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="block text-xs font-label-code text-text-secondary">Select Payment Method</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`p-2.5 rounded-lg border text-xs font-label-code flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border-neutral bg-surface-level-2/50 text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                  type="button"
                >
                  <Icon className="text-[18px]" name="credit_card" />
                  <span>Card / Stripe</span>
                </button>
                <button
                  className={`p-2.5 rounded-lg border text-xs font-label-code flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === "apple"
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border-neutral bg-surface-level-2/50 text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() => setPaymentMethod("apple")}
                  type="button"
                >
                  <Icon className="text-[18px]" name="phone_iphone" />
                  <span>Apple / Google</span>
                </button>
                <button
                  className={`p-2.5 rounded-lg border text-xs font-label-code flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === "paypal"
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border-neutral bg-surface-level-2/50 text-text-secondary hover:text-text-primary"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                  type="button"
                >
                  <Icon className="text-[18px]" name="account_balance_wallet" />
                  <span>PayPal / SEPA</span>
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="p-3 rounded-lg bg-surface-level-2/40 border border-border-neutral space-y-1 text-xs">
              <div className="flex items-center justify-between text-text-muted">
                <span>Subtotal</span>
                <span>€{(book.price * 0.81).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-text-muted">
                <span>19% German VAT (MwSt.)</span>
                <span>€{(book.price * 0.19).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-text-primary font-bold pt-1 border-t border-border-neutral">
                <span>Total Due</span>
                <span className="text-primary font-headline-sm">€{book.price}.00</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-xs font-semibold shadow-[0_4px_20px_rgba(217,164,65,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              type="submit"
            >
              {isProcessing ? (
                <>
                  <Icon className="text-[18px] animate-spin" name="progress_activity" />
                  <span>Processing Secure Checkout...</span>
                </>
              ) : (
                <>
                  <Icon className="text-[18px]" name="lock" />
                  <span>Pay €{book.price}.00 &amp; Download PDF</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-3 text-[11px] text-text-muted font-label-code">
              <span className="flex items-center gap-1">
                <Icon className="text-status-success text-[14px]" name="verified" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span>•</span>
              <span>Instant Offline Access</span>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-space-lg text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-status-success/15 border border-status-success text-status-success flex items-center justify-center shadow-lg">
              <Icon className="text-[32px]" name="check" />
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-text-primary font-bold">Your Book is Ready!</h4>
              <p className="font-body-muted text-xs text-text-secondary mt-1">
                A receipt and backup download link have been sent to <strong className="text-text-primary">{email}</strong>.
              </p>
            </div>

            {/* Download Card */}
            <div className="p-4 rounded-xl bg-surface-level-2 border border-gold-hairline text-left space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="text-primary text-[20px]" name="picture_as_pdf" />
                  <span className="font-label-code text-xs font-semibold text-text-primary truncate">
                    {book.slug}.pdf
                  </span>
                </div>
                <span className="text-[11px] text-text-muted font-label-code">{book.fileSize}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  className="flex-1 py-2.5 px-3 rounded-lg bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  download
                  href={book.image}
                >
                  <Icon className="text-[16px]" name="file_download" />
                  <span>Download PDF Edition</span>
                </a>
                <button
                  className="py-2.5 px-3 rounded-lg border border-border-neutral text-text-secondary hover:text-text-primary text-xs font-label-interactive transition-colors"
                  onClick={onClose}
                  type="button"
                >
                  Done
                </button>
              </div>
            </div>

            <p className="text-[11px] text-text-muted">
              Includes lifetime digital access and all upcoming 2026 legal ordinance revisions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
