'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'
import { getAdminToken } from '@/lib/adminAuth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'
const PAGE_SIZE = 10

interface Subscriber {
  id: string
  name: string
  email: string
  plan: string
  status: string
  amount: number | null
  subscribedAt: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

interface RevenueStats {
  totalRevenue: number
  thisMonthRevenue: number
  totalSubscribers: number
}

function formatCurrency(n: number): string {
  return `€${n.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function PlanBadge({ plan }: { plan: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    silver:   { bg: 'rgba(156,163,175,0.15)', color: '#6b7280' },
    gold:     { bg: 'rgba(201,168,76,0.15)',  color: '#b7791f' },
    platinum: { bg: 'rgba(139,92,246,0.15)',  color: '#6d28d9' },
  }
  const style = colors[plan] ?? { bg: '#f0f0f0', color: '#666' }
  return (
    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, backgroundColor: style.bg, color: style.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {plan}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    active:     { bg: 'rgba(72,187,120,0.1)',   color: '#2f855a' },
    trialing:   { bg: 'rgba(66,153,225,0.1)',   color: '#2b6cb0' },
    past_due:   { bg: 'rgba(237,137,54,0.12)',  color: '#c05621' },
    canceled:   { bg: 'rgba(245,101,101,0.1)',  color: '#c53030' },
    incomplete: { bg: 'rgba(160,174,192,0.15)', color: '#4a5568' },
    none:       { bg: 'rgba(160,174,192,0.15)', color: '#4a5568' },
  }
  const s = styles[status] ?? styles.none
  const label = status === 'past_due' ? 'Past Due' : capitalize(status)
  return (
    <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, backgroundColor: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
      {label}
    </span>
  )
}

const paginationBtnStyle: React.CSSProperties = {
  width: 36, height: 36, borderRadius: 8, border: '1px solid #f0f0f0',
  backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.5)', cursor: 'pointer',
}

export default function PaymentsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [stats, setStats] = useState<RevenueStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setMounted(true)
    const token = getAdminToken()
    const headers = { Authorization: `Bearer ${token}` }

    // Load subscribers list
    fetch(`${BACKEND}/api/admin/subscribers`, { headers })
      .then(r => r.json())
      .then(d => setSubscribers(d.subscribers ?? []))
      .catch(() => setError('Could not load subscribers.'))
      .finally(() => setLoading(false))

    // Load Stripe revenue stats
    fetch(`${BACKEND}/api/admin/stripe/revenue-stats`, { headers })
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => {/* stats fail silently */})
      .finally(() => setStatsLoading(false))
  }, [])

  if (!mounted) return null

  const filtered = subscribers.filter(s =>
    !search.trim() ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function handleSearch(v: string) { setSearch(v); setPage(1) }
  function goToPage(p: number) { setPage(Math.max(1, Math.min(p, totalPages))) }

  function buildPageNumbers(): (number | '...')[] {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '...')[] = [1]
    if (safePage > 3) pages.push('...')
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) pages.push(i)
    if (safePage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  const summaryCards = [
    {
      label: 'Total Revenue',
      value: statsLoading ? '—' : stats ? formatCurrency(stats.totalRevenue) : '—',
    },
    {
      label: 'This Month',
      value: statsLoading ? '—' : stats ? formatCurrency(stats.thisMonthRevenue) : '—',
    },
    {
      label: 'Active Subscriptions',
      value: statsLoading ? '—' : stats ? stats.totalSubscribers.toString() : '—',
    },
  ]

  return (
    <div className="dash-page">
      <style>{`
        .dash-page { flex: 1; padding: 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; min-height: 0; }
        .dash-page > * { flex-shrink: 0; }
        .pay-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .pay-search { background: #fff; padding: 20px 24px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.03); }
        .pay-search input { width: 100%; max-width: 360px; height: 44px; background: #fff; border: 1px solid #f0f0f0; border-radius: 12px; padding: 0 16px; font-size: 14px; outline: none; color: #000; box-sizing: border-box; }
        .pay-table { background: #fff; border-radius: 32px 32px 8px 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); overflow: hidden; }
        .pay-thead { display: grid; grid-template-columns: 36px 1.6fr 1.8fr 110px 90px 110px 100px 60px; background: #1a1926; padding: 16px 24px; color: #fff; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; }
        .pay-row { display: grid; grid-template-columns: 36px 1.6fr 1.8fr 110px 90px 110px 100px 60px; padding: 16px 24px; align-items: center; }
        .pay-row + .pay-row { border-top: 1px solid #f8f8f8; }
        .pay-cards { display: none; flex-direction: column; gap: 10px; }
        .pay-card { background: #fff; border-radius: 16px; padding: 16px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
        .pay-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .pay-card-name { font-weight: 600; color: #1a1a2e; font-size: 15px; }
        .pay-card-email { font-size: 12px; color: rgba(0,0,0,0.4); margin-top: 2px; }
        .pay-card-row { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; flex-wrap: wrap; gap: 6px; }
        @media (max-width: 900px) {
          .pay-thead { display: none; }
          .pay-row { display: none; }
          .pay-table .pay-empty { display: block; }
          .pay-cards { display: flex; }
        }
        @media (max-width: 768px) {
          .dash-page { padding: 20px 16px; gap: 20px; }
          .pay-summary { grid-template-columns: 1fr; gap: 12px; }
          .pay-table { display: none; }
          .pay-cards { display: flex; }
        }
        @media (max-width: 480px) { .dash-page { padding: 16px 12px; } }
      `}</style>

      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Payments</h2>
        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14, marginTop: 4 }}>Transaction history and revenue</p>
      </div>

      {/* Summary Cards */}
      <div className="pay-summary">
        {summaryCards.map((card, i) => (
          <div key={i} style={{ background: '#fff', padding: 28, borderRadius: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)', fontWeight: 600 }}>{card.label}</span>
            <div style={{ fontSize: 32, fontWeight: 600, color: '#1a1a2e' }}>
              {statsLoading ? <span style={{ color: '#ccc', fontSize: 24 }}>Loading…</span> : card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="pay-search">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>

      {error && (
        <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, color: '#ef4444', fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* ── Desktop Table ── */}
      <div className="pay-table">
        <div className="pay-thead">
          <div>#</div>
          <div>CLIENT</div>
          <div>EMAIL</div>
          <div>PLAN</div>
          <div>AMOUNT</div>
          <div>STATUS</div>
          <div>DATE</div>
          <div style={{ textAlign: 'right' }}>VIEW</div>
        </div>
        <div>
          {loading && (
            <div style={{ padding: 40, textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>Loading…</div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="pay-empty" style={{ padding: 40, textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>
              {search ? 'No results match your search.' : 'No subscribers yet.'}
            </div>
          )}
          {visible.map((s, index) => (
            <div key={s.id} className="pay-row" style={{ backgroundColor: index % 2 === 1 ? '#fcfcfb' : '#fff' }}>
              <div style={{ color: 'rgba(0,0,0,0.3)', fontWeight: 600, fontSize: 13 }}>
                {(safePage - 1) * PAGE_SIZE + index + 1}
              </div>
              <div style={{ fontWeight: 500, color: '#1a1a2e', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.name || '—'}
              </div>
              <div style={{ color: '#434347', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.email}
              </div>
              <div><PlanBadge plan={s.plan} /></div>
              <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 14 }}>
                {s.amount != null ? `€${s.amount}` : '—'}
              </div>
              <div><StatusBadge status={s.status} /></div>
              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: 13 }}>{formatDate(s.subscribedAt)}</div>
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={() => router.push(`/dashboard/clients/${s.id}`)}
                  style={{ background: 'none', border: 'none', color: '#c9a84c', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="pay-cards">
        {loading && <div style={{ textAlign: 'center', padding: 32, color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>Loading…</div>}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>
            {search ? 'No results match your search.' : 'No subscribers yet.'}
          </div>
        )}
        {visible.map((s) => (
          <div key={s.id} className="pay-card">
            <div className="pay-card-top">
              <div>
                <div className="pay-card-name">{s.name || '—'}</div>
                <div className="pay-card-email">{s.email}</div>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>
                {s.amount != null ? `€${s.amount}` : '—'}
              </span>
            </div>
            <div className="pay-card-row">
              <PlanBadge plan={s.plan} />
              <StatusBadge status={s.status} />
              <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)' }}>{formatDate(s.subscribedAt)}</span>
              <button
                onClick={() => router.push(`/dashboard/clients/${s.id}`)}
                style={{ background: 'none', border: 'none', color: '#c9a84c', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!loading && !error && filtered.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              style={{ ...paginationBtnStyle, opacity: safePage === 1 ? 0.35 : 1, cursor: safePage === 1 ? 'default' : 'pointer' }}
            >
              <ChevronLeftIcon style={{ width: 16, height: 16 }} />
            </button>

            {buildPageNumbers().map((p, i) =>
              p === '...'
                ? <span key={`el-${i}`} style={{ padding: '0 4px', color: 'rgba(0,0,0,0.3)', fontSize: 13 }}>…</span>
                : <button
                    key={p}
                    onClick={() => goToPage(p as number)}
                    style={{ ...paginationBtnStyle, ...(p === safePage ? { backgroundColor: '#c9a84c', color: '#fff', border: 'none' } : {}) }}
                  >
                    {p}
                  </button>
            )}

            <button
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              style={{ ...paginationBtnStyle, opacity: safePage === totalPages ? 0.35 : 1, cursor: safePage === totalPages ? 'default' : 'pointer' }}
            >
              <ChevronRightIcon style={{ width: 16, height: 16 }} />
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)', margin: 0 }}>
            Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} subscribers
          </p>
        </div>
      )}

      <footer style={{ paddingBottom: 10 }}>
        <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.2)', fontWeight: 600, textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} EUVisaAdvice. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
