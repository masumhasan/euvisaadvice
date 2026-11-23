import type { Metadata } from "next";
import { EnrolledCourseCard } from "@/components/payment/EnrolledCourseCard";
import { NextStepsGrid } from "@/components/payment/NextStepsGrid";
import { OrderReceipt } from "@/components/payment/OrderReceipt";
import { PaymentActions } from "@/components/payment/PaymentActions";
import { PaymentHero } from "@/components/payment/PaymentHero";

export const metadata: Metadata = { title: "Payment Confirmed" };

export default function PaymentSuccessPage() {
  return (
    <div className="relative w-full max-w-[1240px] mx-auto px-gutter-sm sm:px-gutter md:px-gutter-lg pb-space-3xl">
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-primary/10 via-tertiary/5 to-transparent blur-3xl opacity-60" />
      <div className="pointer-events-none absolute top-40 right-10 w-[300px] h-[300px] bg-gold-highlight/5 rounded-full blur-2xl" />
      <PaymentHero />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg relative z-10 mb-space-2xl">
        <EnrolledCourseCard />
        <OrderReceipt />
      </div>
      <NextStepsGrid />
      <PaymentActions />
    </div>
  );
}
