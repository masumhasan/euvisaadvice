'use client'

import { useState, useEffect } from 'react'
import { getAdminToken } from '@/lib/adminAuth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

type ActivityItem = {
  id: string
  action: string
  timestamp: string
}

interface RevenueStats {
  totalRevenue: number
  thisMonthRevenue: number
  totalSubscribers: number
}

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'JUST NOW'
  if (minutes < 60) return `${minutes}M AGO`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}H AGO`
  const days = Math.floor(hours / 24)
  return `${days}D AGO`
}

function formatCurrency(n: number): string {
  return `€${n.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [activityLoading, setActivityLoading] = useState(true)
  const [activityError, setActivityError] = useState('')
  const [stats, setStats] = useState<RevenueStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const token = getAdminToken()
    const headers = token ? { Authorization: `Bearer ${token}` } : {} as Record<string, string>

    fetch(`${BACKEND}/api/admin/activity`, { headers })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load activity')
        const data = await res.json()
        setActivities(data.activity)
      })
      .catch(() => setActivityError('Could not load recent activity. Please try again later.'))
      .finally(() => setActivityLoading(false))

    fetch(`${BACKEND}/api/admin/stripe/revenue-stats`, { headers })
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => {/* stats fail silently */})
      .finally(() => setStatsLoading(false))
  }, [])

  if (!mounted) return null

  const statCards = [
    { label: 'Total Revenue',        value: statsLoading ? '—' : stats ? formatCurrency(stats.totalRevenue) : '—' },
    { label: 'This Month',           value: statsLoading ? '—' : stats ? formatCurrency(stats.thisMonthRevenue) : '—' },
    { label: 'Active Subscriptions', value: statsLoading ? '—' : stats ? stats.totalSubscribers.toString() : '—' },
  ]

  return (
    <div className="dash-page">
      <style>{`
        .dash-page { flex: 1; padding: 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; }
        .dash-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .dash-activity { background: #fff; border-radius: 32px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.03); padding: 40px; flex-shrink: 0; }
        .dash-activity-row { display: flex; justify-content: space-between; align-items: center; font-size: 14.5px; gap: 12px; }
        @media (max-width: 900px) { .dash-stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .dash-page { padding: 20px 16px; gap: 20px; }
          .dash-stats-grid { grid-template-columns: 1fr; gap: 12px; }
          .dash-activity { padding: 24px; }
          .dash-activity-row { flex-direction: column; align-items: flex-start; gap: 4px; }
        }
        @media (max-width: 480px) { .dash-page { padding: 16px 12px; } }
      `}</style>

      {/* Top Stats */}
      <div className="dash-stats-grid">
        {statCards.map((card, i) => (
          <div key={i} style={{
            background: '#ffffff',
            padding: '28px',
            borderRadius: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            border: '1px solid rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)', fontWeight: '600' }}>
              {card.label}
            </span>
            <div style={{ fontSize: '32px', fontWeight: '600', color: '#1a1a2e', lineHeight: 1 }}>
              {statsLoading
                ? <span style={{ color: '#ccc', fontSize: 24 }}>Loading…</span>
                : card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="dash-activity">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '20px', marginBottom: '20px', gap: 12 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a2e', margin: 0 }}>Recent Activity</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          {activityLoading ? (
            <div style={{ textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>Loading...</div>
          ) : activityError ? (
            <div style={{ textAlign: 'center', color: '#c53030', fontSize: '14px' }}>{activityError}</div>
          ) : activities.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>No recent activity.</div>
          ) : activities.map((activity) => (
            <div key={activity.id} className="dash-activity-row">
              <span style={{ color: '#434347ff', fontWeight: '500' }}>{activity.action}</span>
              <span style={{ color: 'rgba(0,0,0,0.3)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '11px', flexShrink: 0 }}>
                {formatRelativeTime(activity.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer inside content area */}
      <footer style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '10px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: '600', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} EUVisaAdvice. All rights reserved.
        </p>
      </footer>

    </div>
  )
}