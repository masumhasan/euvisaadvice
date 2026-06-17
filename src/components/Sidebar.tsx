'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ScalesIcon,
  BarChartIcon,
  ChatBubbleIcon,
  InboxIcon,
  PaymentIcon,
  UsersIcon,
  DocumentIcon
} from '@/components/Icons'
import { useSidebar } from '@/components/DashboardLayout'
import { clearAdminToken } from '@/lib/adminAuth'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

function initialsOf(firstName: string, lastName: string): string {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  return initials || '?'
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { adminUser } = useSidebar()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    clearAdminToken()
    router.push('/admin/login')
  }

  const navItems = [
    { label: 'Overview', icon: <BarChartIcon />, href: '/dashboard' },
    { label: 'Packages', icon: <ChatBubbleIcon />, href: '/dashboard/chat' },
    { label: 'Client Chats', icon: <InboxIcon />, href: '/dashboard/inbox' },
    { label: 'Payments', icon: <PaymentIcon />, href: '/dashboard/payments' },
    { label: 'All Members', icon: <UsersIcon />, href: '/dashboard/clients' },
    { label: 'Manage Pages', icon: <DocumentIcon />, href: '/dashboard/pages' },
  ]

  return (
    <>
      <div
        className={`chat-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`chat-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="chat-sidebar-header">
          <div className="signin-left-logo text-left" style={{ marginBottom: '28px' }}>
            <ScalesIcon style={{ width: 22, height: 22 }} />
            <span className="signin-brand">EUVisaAdvice</span>
          </div>
        </div>

        <div className="chat-history">
          <div style={{ padding: '12px 16px 8px', fontSize: '10px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
            Main Menu
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`history-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
                style={{
                  textDecoration: 'none',
                  padding: '14px 24px',
                  borderRadius: isActive ? '0' : '8px',
                  margin: isActive ? '4px -16px' : '4px 0',
                  background: isActive ? '#25232d' : 'transparent',
                  borderLeft: isActive ? '4px solid #c9a84c' : '4px solid transparent',
                  paddingLeft: isActive ? '36px' : '24px'
                }}
              >
                <div style={{ color: isActive ? '#c9a84c' : 'rgba(255,255,255,0.4)', marginTop: '2px', width: "16px" }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, fontWeight: '500', fontSize: '15px', color: isActive ? '#c9a84c' : 'rgba(255,255,255,0.7)', letterSpacing: '0.02em', marginLeft: '6px' }}>
                  {item.label}
                </div>
              </Link>
            )
          })}
        </div>

        <div style={{ position: 'relative', marginTop: 'auto' }}>
          {menuOpen && (
            <button
              onClick={handleLogout}
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '16px',
                right: '16px',
                marginBottom: '8px',
                padding: '12px 16px',
                background: '#25232d',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                color: '#e04848',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          )}
          <div className="chat-sidebar-footer" onClick={() => setMenuOpen((open) => !open)} style={{ cursor: 'pointer' }}>
            <div className="user-avatar" style={{ border: '2px solid rgba(255,255,255,0.1)' }}>
              {adminUser ? initialsOf(adminUser.firstName, adminUser.lastName) : '...'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span className="user-name">{adminUser ? `${adminUser.firstName} ${adminUser.lastName}`.trim() : 'Loading...'}</span>
              <span style={{ fontSize: '10px', color: '#c9a84c', fontWeight: '600' }}>{adminUser?.email ?? ''}</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', display: 'flex' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points={menuOpen ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} /></svg>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
