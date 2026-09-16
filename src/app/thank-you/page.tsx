'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getToken } from '@/lib/auth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? ''

interface OrderDetails {
  sessionId: string
  subscriptionId: string
  tier: 'silver' | 'gold' | 'platinum' | string
  tierName: string
  amount: number
  currency: string
  customerEmail: string
  customerName: string
  status: string
  interval: string
  date: string
}

const TIER_THEME: Record<string, { badge: string; accent: string; glow: string }> = {
  silver: {
    badge: 'Silver',
    accent: '#9ca3af',
    glow: 'rgba(156,163,175,0.18)',
  },
  gold: {
    badge: 'Gold',
    accent: '#c9a84c',
    glow: 'rgba(201,168,76,0.22)',
  },
  platinum: {
    badge: 'Platinum',
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.22)',
  },
}

/* ── TikTok Pixel Helper ────────────────────────────────────────── */
function triggerTikTokConversion(order: OrderDetails) {
  if (typeof window === 'undefined') return

  // Prevent duplicate firing on page refresh
  const storageKey = `ttq_tracked_${order.sessionId}`
  if (sessionStorage.getItem(storageKey)) {
    console.log('[TikTok Pixel] Conversion already tracked for session:', order.sessionId)
    return
  }

  const trackEvent = () => {
    const ttq = (window as unknown as { ttq?: { track: (event: string, params: Record<string, unknown>) => void } }).ttq
    if (ttq && typeof ttq.track === 'function') {
      try {
        ttq.track('CompletePayment', {
          content_id: order.tier,
          content_type: 'product',
          content_name: order.tierName,
          quantity: 1,
          price: order.amount,
          value: order.amount,
          currency: order.currency || 'EUR',
        })
        ttq.track('PlaceAnOrder', {
          content_id: order.tier,
          content_type: 'product',
          content_name: order.tierName,
          quantity: 1,
          price: order.amount,
          value: order.amount,
          currency: order.currency || 'EUR',
        })
        sessionStorage.setItem(storageKey, 'true')
        console.log('[TikTok Pixel] Successfully fired CompletePayment & PlaceAnOrder events for', order.tierName)
      } catch (e) {
        console.error('[TikTok Pixel] Error firing event:', e)
      }
    }
  }

  // If ttq is already available, trigger immediately
  const existingTtq = (window as unknown as { ttq?: unknown }).ttq
  if (existingTtq) {
    trackEvent()
    return
  }

  // If pixel ID is provided in env, dynamically inject the official TikTok Pixel script
  if (TIKTOK_PIXEL_ID && !document.getElementById('tiktok-pixel-script')) {
    const script = document.createElement('script')
    script.id = 'tiktok-pixel-script'
    script.innerHTML = `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
        var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
        ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
        ttq.load('${TIKTOK_PIXEL_ID}');
        ttq.page();
      }(window, document, 'ttq');
    `
    document.head.appendChild(script)
    setTimeout(trackEvent, 500)
  }
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#06090f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
        Loading confirmation...
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}

function ThankYouContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [copied, setCopied] = useState(false)

  const sessionId = searchParams.get('session_id')
  const tierHint = searchParams.get('tier') ?? ''

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push('/legal-login')
      return
    }

    // Guard: Only load after a real purchase session ID is present
    if (!sessionId) {
      setError('No completed purchase session was detected. If you need to purchase a plan, please visit our subscription page.')
      setLoading(false)
      return
    }

    let isMounted = true

    const verifyPurchase = async () => {
      // Retry loop up to 6 attempts to handle any brief Stripe webhook/sync delay
      for (let attempt = 1; attempt <= 6; attempt++) {
        try {
          const res = await fetch(`${BACKEND}/api/stripe/verify-session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ sessionId, tier: tierHint }),
          })

          const data = await res.json()

          if (data.synced && data.order) {
            if (isMounted) {
              setOrder(data.order)
              setLoading(false)
              triggerTikTokConversion(data.order)
            }
            return
          }

          if (data.reason === 'payment_not_complete') {
            if (isMounted) {
              setError('Your payment was not completed or was cancelled. No charge was made.')
              setLoading(false)
            }
            return
          }
        } catch (e) {
          console.warn(`[Verify Purchase] Attempt ${attempt} failed:`, e)
        }

        if (attempt < 6) {
          await new Promise(r => setTimeout(r, 1000))
        }
      }

      if (isMounted) {
        setError('We could not verify your purchase session. Please check your account profile or contact support.')
        setLoading(false)
      }
    }

    verifyPurchase()

    return () => {
      isMounted = false
    }
  }, [sessionId, tierHint, router])

  const copySessionId = () => {
    if (!order?.sessionId) return
    navigator.clipboard.writeText(order.sessionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const theme = order?.tier ? (TIER_THEME[order.tier] ?? TIER_THEME.silver) : TIER_THEME.gold

  return (
    <div style={{
      minHeight: '100vh',
      background: '#06090f',
      color: '#f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Hidden semantic element for Tag Managers & crawler detection */}
      {order && (
        <div
          id="tiktok-conversion-data"
          data-order-id={order.sessionId}
          data-order-value={order.amount}
          data-order-currency={order.currency}
          data-order-tier={order.tier}
          data-order-name={order.tierName}
          style={{ display: 'none' }}
        />
      )}

      {/* Main card */}
      <div style={{
        maxWidth: 580,
        width: '100%',
        background: 'linear-gradient(165deg, #111827 0%, #0d1117 100%)',
        border: `1.5px solid ${theme.accent}40`,
        borderRadius: 24,
        padding: '48px 36px',
        boxShadow: `0 12px 48px ${theme.glow}`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative ambient gradient */}
        <div style={{
          position: 'absolute',
          top: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 220,
          height: 160,
          borderRadius: '50%',
          background: theme.glow,
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }} />

        {/* Loading State */}
        {loading && (
          <div style={{ padding: '40px 0' }}>
            <div style={{
              width: 54, height: 54,
              border: `3px solid ${theme.accent}30`,
              borderTopColor: theme.accent,
              borderRadius: '50%',
              margin: '0 auto 24px',
              animation: 'spin 1s linear infinite',
            }} />
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#f0f0f0', margin: '0 0 8px' }}>
              Confirming Your Purchase…
            </h2>
            <p style={{ fontSize: 14, color: '#8b929e', margin: 0 }}>
              Verifying your payment with Stripe. This takes just a moment.
            </p>
          </div>
        )}

        {/* Error / Cancelled State */}
        {!loading && error && (
          <div style={{ padding: '10px 0' }}>
            <div style={{
              width: 68, height: 68,
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1.5px solid #ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: '#ef4444',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f0f0f0', margin: '0 0 12px' }}>
              Verification Not Completed
            </h2>
            <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6, margin: '0 0 32px' }}>
              {error}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link
                href="/subscribe"
                style={{
                  background: '#c9a84c',
                  color: '#0d1117',
                  padding: '12px 24px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                View Plans
              </Link>
              <Link
                href="/legalchat"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#f0f0f0',
                  padding: '12px 24px',
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                Return to Chat
              </Link>
            </div>
          </div>
        )}

        {/* Success / Order Confirmation */}
        {!loading && order && (
          <div>
            {/* Success Icon */}
            <div style={{
              width: 72, height: 72,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accent}10)`,
              border: `2px solid ${theme.accent}`,
              boxShadow: `0 0 28px ${theme.glow}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: theme.accent,
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Header Text */}
            <div style={{
              display: 'inline-block',
              background: `${theme.accent}18`,
              color: theme.accent,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              padding: '4px 14px',
              borderRadius: 20,
              marginBottom: 12,
            }}>
              Payment Confirmed
            </div>

            <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', letterSpacing: -0.5 }}>
              Thank you for your purchase!
            </h1>
            <p style={{ fontSize: 14, color: '#8b929e', lineHeight: 1.6, margin: '0 0 28px' }}>
              Your subscription is active. A receipt has been sent to <span style={{ color: '#f0f0f0', fontWeight: 600 }}>{order.customerEmail}</span>.
            </p>

            {/* Receipt Summary Card */}
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '20px 24px',
              textAlign: 'left',
              marginBottom: 28,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Package</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#f0f0f0', marginTop: 2 }}>{order.tierName}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Amount Paid</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: theme.accent, marginTop: 2 }}>
                    €{order.amount.toFixed(2)} <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>/{order.interval}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, paddingTop: 14, fontSize: 13 }}>
                <div>
                  <span style={{ color: '#6b7280', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Status</span>
                  <span style={{ color: '#34d399', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
                    Active & Verified
                  </span>
                </div>
                <div>
                  <span style={{ color: '#6b7280', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Date</span>
                  <span style={{ color: '#d1d5db', fontWeight: 500, marginTop: 2, display: 'block' }}>
                    {new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#6b7280', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Order Reference</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <code style={{ fontSize: 11, color: '#9ca3af', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 6, wordBreak: 'break-all', flex: 1 }}>
                      {order.sessionId}
                    </code>
                    <button
                      onClick={copySessionId}
                      style={{
                        background: 'none',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: copied ? theme.accent : '#9ca3af',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: 11,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Platinum Special CTA */}
            {order.tier === 'platinum' && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(124,58,237,0.15))',
                border: '1.5px solid #a78bfa',
                borderRadius: 16,
                padding: '18px 20px',
                marginBottom: 24,
                textAlign: 'left',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a78bfa', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Platinum Perk: 30-Min Attorney Call
                </div>
                <p style={{ fontSize: 13, color: '#c4b5fd', margin: '0 0 12px', lineHeight: 1.5 }}>
                  Schedule your direct consultation call with Attorney Mathias Schulze at your convenience.
                </p>
                <a
                  href="https://calendly.com/mathiasschulze-uito/folgetermin-fur-kunden"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: '#a78bfa',
                    color: '#0d1117',
                    fontWeight: 700,
                    fontSize: 13,
                    padding: '8px 18px',
                    borderRadius: 8,
                    textDecoration: 'none',
                  }}
                >
                  Schedule Appointment →
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link
                href="/legalchat"
                style={{
                  width: '100%',
                  padding: '14px 0',
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
                  color: order.tier === 'platinum' ? '#fff' : '#0d1117',
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'block',
                  boxShadow: `0 4px 20px ${theme.glow}`,
                  transition: 'opacity 0.2s',
                }}
              >
                Go to Legal Chat →
              </Link>
              <Link
                href="/profile"
                style={{
                  color: '#6b7280',
                  fontSize: 13,
                  textDecoration: 'underline',
                  padding: '6px 0',
                  display: 'inline-block',
                }}
              >
                Manage Subscription & Profile
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
