'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChatIcon, EuroIcon, FolderIcon, ShieldIcon } from '@/components/Icons'
import { getAdminToken } from '@/lib/adminAuth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

type ActivityItem = {
  id: string
  action: string
  timestamp: string
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

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [activityLoading, setActivityLoading] = useState(true)
  const [activityError, setActivityError] = useState('')

  useEffect(() => {
    setMounted(true)

    const token = getAdminToken()
    fetch(`${BACKEND}/api/admin/activity`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load activity')
        const data = await res.json()
        setActivities(data.activity)
      })
      .catch(() => setActivityError('Could not load recent activity. Please try again later.'))
      .finally(() => setActivityLoading(false))
  }, [])

  if (!mounted) return null

  const stats = [
    { label: 'TOTAL CHATS TODAY', value: '24', icon: <ChatIcon className="text-[#c9a84c]" /> },
    { label: 'MONTHLY REVENUE', value: '€4,260', icon: <EuroIcon className="text-[#c9a84c]" /> },
    { label: 'ACTIVE CASES', value: '38', icon: <FolderIcon className="text-[#c9a84c]" /> },
    { label: 'PENDING VERIFICATIONS', value: '7', icon: <ShieldIcon className="text-[#c9a84c]" /> },
  ]

  return (
    <div className="dash-page">
      <style>{`
        .dash-page { flex: 1; padding: 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; }
        .dash-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }
        .dash-activity { background: #fff; border-radius: 32px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.03); padding: 40px; flex-shrink: 0; }
        .dash-activity-row { display: flex; justify-content: space-between; align-items: center; font-size: 14.5px; gap: 12px; }
        @media (max-width: 768px) {
          .dash-page { padding: 20px 16px; gap: 20px; }
          .dash-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .dash-activity { padding: 24px; }
          .dash-activity-row { flex-direction: column; align-items: flex-start; gap: 4px; }
        }
        @media (max-width: 480px) {
          .dash-page { padding: 16px 12px; }
          .dash-stats-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Top 4 Stats Boxes */}
      <div className="dash-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: '#ffffff',
            padding: '28px',
            borderRadius: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            border: '1px solid rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            height: '160px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{ fontSize: '11.5px', color: 'rgba(0,0,0,0.35)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {stat.label}
              </span>
              <div style={{ display: 'flex' }}>{stat.icon}</div>
            </div>
            <div style={{ fontSize: '42px', fontWeight: '600', color: '#1a1a2e', marginTop: 'auto', lineHeight: '1', letterSpacing: '-0.02em' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="dash-activity">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '20px', marginBottom: '20px', gap: 12 }}>
          <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a2e', margin: 0 }}>Recent Activity</h2>
          <Link href="/activity" style={{ fontSize: '11px', fontWeight: '500', color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            VIEW ALL
          </Link>
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