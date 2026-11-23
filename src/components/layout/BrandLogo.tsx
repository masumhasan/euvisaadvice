import { cn } from "@/lib/cn";

interface BrandLogoProps {
  className?: string;
}

/**
 * EUVisaAdvice mark + wordmark. The original Stitch logo asset is not
 * publicly downloadable, so this is an SVG approximation of it.
 */
export function BrandLogo({ className }: BrandLogoProps) {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    return { cx: 16 + Math.cos(angle) * 11, cy: 16 + Math.sin(angle) * 11 };
  });
  return (
    <svg
      aria-label="EUVisaAdvice Academy & Immigration"
      className={cn("w-auto object-contain", className)}
      role="img"
      viewBox="0 0 132 32"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} fill="#D9A441" r={i % 3 === 0 ? 1.8 : 1.2} />
      ))}
      <circle cx="16" cy="16" fill="#D9A441" r="2.4" />
      <text fill="#FFFFFF" fontFamily="inherit" fontSize="11" fontWeight="800" x="38" y="15">
        EU<tspan fill="#D9A441">VISA</tspan>ADVICE
      </text>
      <text fill="#A1A7B4" fontFamily="inherit" fontSize="4.6" fontWeight="600" letterSpacing="1.2" x="38" y="23">
        ACADEMY &amp; IMMIGRATION
      </text>
    </svg>
  );
}
