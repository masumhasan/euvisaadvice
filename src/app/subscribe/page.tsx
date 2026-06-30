'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getToken, clearToken } from '@/lib/auth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

interface Package {
  id: string
  name: string
  price: number
  description: string
  tier: 'silver' | 'gold' | 'platinum'
}

/* ── Icons ──────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

/* ── Tier config ─────────────────────────────────────────── */
const TIER_ORDER: Record<string, number> = { silver: 0, gold: 1, platinum: 2 }

const TIER_META: Record<string, { badge: string; accent: string; glow: string; features: string[] }> = {
  silver: {
    badge: 'Silver',
    accent: '#9ca3af',
    glow: 'rgba(156,163,175,0.18)',
    features: ['Up to 3 consultations', 'AI legal assistant', 'Case status updates', 'Email thread analysis'],
  },
  gold: {
    badge: 'Gold',
    accent: '#c9a84c',
    glow: 'rgba(201,168,76,0.18)',
    features: ['Up to 10 consultations', 'Everything in Silver', 'Priority case tracking', 'Detailed event timeline'],
  },
  platinum: {
    badge: 'Platinum',
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.18)',
    features: ['Unlimited consultations', 'Everything in Gold', 'Direct attorney booking', 'Calendly appointment access'],
  },
}

/* ── Notification banner ─────────────────────────────────── */
function SuccessBanner({ plan, onDismiss }: { plan: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000)
    return () => clearTimeout(t)
  }, [onDismiss])

  const meta = TIER_META[plan]
  return (
    <div style={{
      position: 'fixed', top: 28, left: '50%', transform: 'translateX(-50%)',
      background: '#0d1117', border: `1.5px solid ${meta?.accent ?? '#c9a84c'}`,
      borderRadius: 14, padding: '14px 28px', zIndex: 999,
      boxShadow: `0 4px 32px ${meta?.glow ?? 'rgba(201,168,76,0.25)'}`,
      display: 'flex', alignItems: 'center', gap: 12,
      animation: 'fadeDown 0.35s ease',
    }}>
      <span style={{ color: meta?.accent ?? '#c9a84c', display: 'flex' }}><CheckIcon /></span>
      <span style={{ color: '#f0f0f0', fontWeight: 600, fontSize: 15 }}>
        {meta?.badge ?? plan} subscription activated!
      </span>
    </div>
  )
}

/* ── Platinum booking screen ─────────────────────────────── */
function PlatinumBooking({ onBack }: { onBack: () => void }) {
  const router = useRouter()
  return (
    <div style={{
      minHeight: '100vh', background: '#06090f',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: 480, width: '100%', textAlign: 'center',
        background: 'linear-gradient(160deg,#12172a,#0d1117)',
        border: '1.5px solid #a78bfa', borderRadius: 24,
        padding: '52px 40px',
        boxShadow: '0 0 60px rgba(167,139,250,0.15)',
      }}>
        <div style={{ color: '#a78bfa', marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
          <CalendarIcon />
        </div>
        <h2 style={{ color: '#f0f0f0', fontSize: 26, fontWeight: 700, margin: '0 0 12px' }}>
          Book Your Appointment
        </h2>
        <p style={{ color: '#8b929e', fontSize: 15, lineHeight: 1.6, margin: '0 0 36px' }}>
          Your Platinum subscription is active. Schedule a direct consultation with Attorney Schulze at a time that suits you.
        </p>
        <a
          href="https://calendly.com/mathiasschulze-uito/folgetermin-fur-kunden"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block', width: '100%',
            background: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
            color: '#fff', fontWeight: 700, fontSize: 16,
            padding: '15px 0', borderRadius: 12, textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(167,139,250,0.3)',
            transition: 'opacity 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          Book Appointment
        </a>
        <button
          onClick={() => router.push('/legalchat')}
          style={{
            marginTop: 16, background: 'none', border: 'none',
            color: '#6b7280', fontSize: 14, cursor: 'pointer', textDecoration: 'underline',
          }}
        >
          Go to Legal Chat
        </button>
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ── Main page ───────────────────────────────────────────── */
export default function SubscribePage() {
  return (
    <Suspense>
      <SubscribePageInner />
    </Suspense>
  )
}

function SubscribePageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [packages, setPackages] = useState<Package[]>([])
  const [currentPlan, setCurrentPlan] = useState<string>('none')
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('none')
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selecting, setSelecting] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [successPlan, setSuccessPlan] = useState<string | null>(null)
  const [showPlatinumBooking, setShowPlatinumBooking] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = getToken()
    if (!token) { router.push('/legal-login'); return }

    // Handle Stripe redirect back
    const payment = searchParams.get('payment')
    if (payment === 'success') {
      const tier = searchParams.get('tier') ?? ''
      const sessionId = searchParams.get('session_id') ?? ''
      setSuccessPlan(tier)

      // Verify the completed checkout session with Stripe and update the user DB.
      // Retry a few times to handle any brief Stripe propagation delay.
      const verifyAndRedirect = async () => {
        for (let i = 0; i < 6; i++) {
          try {
            const r = await fetch(`${BACKEND}/api/stripe/verify-session`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ sessionId, tier }),
            })
            const d = await r.json()
            if (d.synced) break
            console.warn(`[Stripe] verify-session attempt ${i + 1}: synced=${d.synced} reason=${d.reason}`)
          } catch (e) {
            console.warn(`[Stripe] verify-session attempt ${i + 1} failed:`, e)
          }
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
        router.push('/legalchat')
      }

      verifyAndRedirect()
    }

    Promise.all([
      fetch(`${BACKEND}/api/admin/public-packages`).then(r => r.json()),
      fetch(`${BACKEND}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([pkgData, userData]) => {
      const sorted = (pkgData.packages ?? []).sort(
        (a: Package, b: Package) => (TIER_ORDER[a.tier] ?? 0) - (TIER_ORDER[b.tier] ?? 0),
      )
      setPackages(sorted)
      const user = userData.user ?? {}
      setCurrentPlan(user.subscriptionPlan ?? 'none')
      setSubscriptionStatus(user.subscriptionStatus ?? 'none')
      setCancelAtPeriodEnd(user.cancelAtPeriodEnd ?? false)
    }).catch(() => {
      setError('Failed to load subscription plans.')
    }).finally(() => setLoading(false))
  }, [router, searchParams])

  const handleSelect = async (pkg: Package) => {
    setError('')
    setSelecting(pkg.id)
    try {
      const res = await fetch(`${BACKEND}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ tier: pkg.tier }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not start checkout.')

      // Redirect to Stripe Checkout (or Customer Portal if already subscribed)
      window.location.href = data.url
    } catch (err) {
      setError((err as Error).message)
      setSelecting(null)
    }
  }

  const handleManage = async () => {
    try {
      const res = await fetch(`${BACKEND}/api/stripe/customer-portal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ returnUrl: window.location.href }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not open billing portal.')
      window.location.href = data.url
    } catch (err) {
      setError((err as Error).message)
    }
  }

  if (!mounted || loading) return null
  if (showPlatinumBooking) return <PlatinumBooking onBack={() => setShowPlatinumBooking(false)} />

  return (
    <div style={{
      minHeight: '100vh', background: '#06090f',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '60px 20px 80px',
    }}>
      {successPlan && <SuccessBanner plan={successPlan} onDismiss={() => setSuccessPlan(null)} />}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ color: '#c9a84c' }}><StarIcon /></span>
          <span style={{ color: '#c9a84c', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
            Choose Your Plan
          </span>
          <span style={{ color: '#c9a84c' }}><StarIcon /></span>
        </div>
        <h1 style={{ color: '#f0f0f0', fontSize: 36, fontWeight: 800, margin: '0 0 14px', letterSpacing: -0.5 }}>
          EU<span style={{ color: '#c9a84c' }}>VISA</span>ADVICE
        </h1>
        <p style={{ color: '#8b929e', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          {currentPlan !== 'none'
            ? cancelAtPeriodEnd
              ? `Your ${TIER_META[currentPlan]?.badge ?? currentPlan} plan is scheduled to cancel at the end of the billing period.`
              : `You are on the ${TIER_META[currentPlan]?.badge ?? currentPlan} plan. Upgrade or manage your subscription below.`
            : 'Select a subscription plan to start your legal consultation. Upgrade anytime as your needs grow.'}
        </p>
        {/* Manage subscription button for existing subscribers */}
        {currentPlan !== 'none' && subscriptionStatus === 'active' && (
          <button
            onClick={handleManage}
            style={{
              marginTop: 20, background: 'none',
              border: '1.5px solid rgba(255,255,255,0.15)',
              color: '#9ca3af', padding: '10px 24px', borderRadius: 10,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLElement).style.color = '#f0f0f0' }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = '#9ca3af' }}
          >
            Manage / Cancel Subscription →
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: '#1a0a0a', border: '1px solid #ef4444', borderRadius: 10,
          color: '#ef4444', padding: '10px 18px', marginBottom: 28, fontSize: 14,
        }}>
          {error}
        </div>
      )}

      {/* Cards */}
      {packages.length === 0 && !loading && (
        <p style={{ color: '#6b7280', fontSize: 15 }}>No subscription plans available yet. Please check back later.</p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 28, width: '100%', maxWidth: 960,
      }}>
        {packages.map((pkg) => {
          const meta = TIER_META[pkg.tier] ?? TIER_META.silver
          const isGold = pkg.tier === 'gold'
          const isSelecting = selecting === pkg.id
          const isCurrent = pkg.tier === currentPlan
          const isLower = (TIER_ORDER[pkg.tier] ?? 0) < (TIER_ORDER[currentPlan] ?? -1)
          const isDisabled = isCurrent || !!selecting

          return (
            <div
              key={pkg.id}
              style={{
                position: 'relative',
                background: isCurrent
                  ? `linear-gradient(160deg,${meta.accent}0d,#0d1117)`
                  : isGold
                    ? 'linear-gradient(160deg,#1a1608,#0d1117)'
                    : 'linear-gradient(160deg,#111827,#0d1117)',
                border: `1.5px solid ${isCurrent ? meta.accent : isGold ? meta.accent : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 20,
                padding: '36px 32px 32px',
                boxShadow: isCurrent ? `0 0 32px ${meta.glow}` : isGold ? `0 0 48px ${meta.glow}` : 'none',
                transition: 'box-shadow 0.3s, border-color 0.3s',
                display: 'flex', flexDirection: 'column',
                opacity: isLower ? 0.45 : 1,
              }}
              onMouseOver={e => {
                if (!isLower) {
                  (e.currentTarget as HTMLElement).style.borderColor = meta.accent
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 36px ${meta.glow}`
                }
              }}
              onMouseOut={e => {
                if (isCurrent) {
                  (e.currentTarget as HTMLElement).style.borderColor = meta.accent
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${meta.glow}`
                } else if (!isGold) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                } else {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 48px ${meta.glow}`
                }
              }}
            >
              {/* Current plan badge */}
              {isCurrent && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: `linear-gradient(90deg,${meta.accent},${meta.accent}cc)`,
                  color: '#0d1117', fontSize: 11, fontWeight: 800, letterSpacing: 2,
                  textTransform: 'uppercase', padding: '4px 18px', borderRadius: 20,
                  whiteSpace: 'nowrap',
                }}>
                  Current Plan
                </div>
              )}

              {/* Most Popular badge (only if not current) */}
              {isGold && !isCurrent && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg,#c9a84c,#e6c96a)',
                  color: '#0d1117', fontSize: 11, fontWeight: 800, letterSpacing: 2,
                  textTransform: 'uppercase', padding: '4px 18px', borderRadius: 20,
                  whiteSpace: 'nowrap',
                }}>
                  Most Popular
                </div>
              )}

              {/* Tier badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: `${meta.accent}18`, borderRadius: 8,
                padding: '4px 12px', marginBottom: 20, alignSelf: 'flex-start',
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: meta.accent, display: 'inline-block', flexShrink: 0,
                }} />
                <span style={{ color: meta.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  {meta.badge}
                </span>
              </div>

              {/* Name & price */}
              <h3 style={{ color: '#f0f0f0', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>{pkg.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
                <span style={{ color: meta.accent, fontSize: 34, fontWeight: 800 }}>
                  €{pkg.price}
                </span>
                <span style={{ color: '#6b7280', fontSize: 14 }}>/month</span>
              </div>

              {/* Description */}
              <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>
                {pkg.description}
              </p>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {meta.features.map((feat) => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#d1d5db', fontSize: 14 }}>
                    <span style={{ color: meta.accent, flexShrink: 0 }}><CheckIcon /></span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleSelect(pkg)}
                disabled={isDisabled}
                style={{
                  width: '100%', padding: '14px 0', borderRadius: 12,
                  border: isCurrent
                    ? `1.5px solid ${meta.accent}`
                    : isGold && !isLower
                      ? 'none'
                      : `1.5px solid ${meta.accent}`,
                  background: isCurrent
                    ? `${meta.accent}18`
                    : isGold && !isLower
                      ? 'linear-gradient(135deg,#b8882a,#e6c96a)'
                      : `${meta.accent}22`,
                  color: isCurrent
                    ? meta.accent
                    : isGold && !isLower
                      ? '#0d1117'
                      : meta.accent,
                  fontWeight: 700, fontSize: 15,
                  cursor: isDisabled ? 'default' : 'pointer',
                  opacity: (selecting && !isSelecting) || isLower ? 0.5 : 1,
                  transition: 'opacity 0.2s, transform 0.15s',
                }}
                onMouseOver={e => { if (!isDisabled) (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)' }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
              >
                {isSelecting
                  ? 'Redirecting to Stripe…'
                  : isCurrent
                    ? 'Current Plan'
                    : isLower
                      ? 'Downgrade via Portal'
                      : `Subscribe — ${meta.badge}`}
              </button>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <p style={{ color: '#4b5563', fontSize: 13, marginTop: 48, textAlign: 'center' }}>
        Payments are processed securely by Stripe. Cancel anytime from your profile.
      </p>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}
