'use client'

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

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { label: 'Overview', icon: <BarChartIcon />, href: '/dashboard' },
    { label: 'Chatbot', icon: <ChatBubbleIcon />, href: '/dashboard/chat' },
    { label: 'Inbox', icon: <InboxIcon />, href: '/dashboard/inbox' },
    { label: 'Payments', icon: <PaymentIcon />, href: '/dashboard/payments' },
    { label: 'Clients', icon: <UsersIcon />, href: '/dashboard/clients' },
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
            <span className="signin-brand">MS Advocate</span>
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

        <div className="chat-sidebar-footer" onClick={() => router.push('/profile')} style={{ cursor: 'pointer', marginTop: 'auto' }}>
          <div className="user-avatar" style={{ border: '2px solid rgba(255,255,255,0.1)' }}>MA</div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span className="user-name">Admin</span>
            <span style={{ fontSize: '10px', color: '#c9a84c', fontWeight: '600' }}>admin@ms.com</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)', display: 'flex' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </div>
        </div>
      </aside>
    </>
  )
}
