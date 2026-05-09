'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChatIcon, EuroIcon, FolderIcon, ShieldIcon } from '@/components/Icons'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const stats = [
    { label: 'TOTAL CHATS TODAY', value: '24', icon: <ChatIcon className="text-[#c9a84c]" /> },
    { label: 'MONTHLY REVENUE', value: '€4,260', icon: <EuroIcon className="text-[#c9a84c]" /> },
    { label: 'ACTIVE CASES', value: '38', icon: <FolderIcon className="text-[#c9a84c]" /> },
    { label: 'PENDING VERIFICATIONS', value: '7', icon: <ShieldIcon className="text-[#c9a84c]" /> },
  ]

  const activities = [
    { id: 1, action: 'started legal consultation', time: '2M AGO' },
    { id: 2, action: 'case update viewed', time: '15M AGO' },
    { id: 3, action: 'New verification pending', time: '32M AGO' },
    { id: 4, action: 'received €89', time: '1H AGO' },
    { id: 5, action: 'existing client login', time: '2H AGO' },
    { id: 6, action: 'legal advice purchased', time: '3H AGO' },
    { id: 7, action: 'case update viewed', time: '4H AGO' },
    { id: 8, action: 'verification approved', time: '5H AGO' },
  ]

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Top 4 Stats Boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
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
      <div style={{
        background: '#ffffff',
        borderRadius: '32px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        border: '1px solid rgba(0,0,0,0.03)',
        padding: '40px',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '20px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a2e', margin: 0 }}>Recent Activity</h2>
          <Link href="/activity" style={{ fontSize: '11px', fontWeight: '500', color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none' }}>
            VIEW ALL ACTIVITY
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '32px' }}>
          {activities.map((activity) => (
            <div key={activity.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14.5px' }}>
              <span style={{ color: '#434347ff', fontWeight: '500' }}>{activity.action}</span>
              <span style={{ color: 'rgba(0,0,0,0.3)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '11px' }}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer inside content area */}
      <footer style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '10px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: '600', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} MS Advocate. All rights reserved.
        </p>
      </footer>

    </div>
  )
}