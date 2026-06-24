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
} from '@/components/Icons'
import { useSidebar } from '@/components/DashboardLayout'
import { clearAdminToken } from '@/lib/adminAuth'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

function initialsOf(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || '?'
}

function PolicyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function ServiceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  )
}

function AccordionButton({
  isActive, isOpen, icon, label, onClick,
}: {
  isActive: boolean; isOpen: boolean; icon: React.ReactNode; label: string; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', width: '100%',
        padding: isActive ? '14px 36px' : '14px 24px',
        background: isActive ? '#25232d' : 'transparent',
        border: 'none', borderRadius: isActive ? 0 : 8,
        margin: isActive ? '4px -16px' : '4px 0',
        borderLeft: isActive ? '4px solid #c9a84c' : '4px solid transparent',
        cursor: 'pointer', textAlign: 'left',
      }}
    >
      <div style={{ color: isActive ? '#c9a84c' : 'rgba(255,255,255,0.4)', width: 16, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, fontWeight: 500, fontSize: 15, color: isActive ? '#c9a84c' : 'rgba(255,255,255,0.7)', letterSpacing: '0.02em', marginLeft: 6 }}>{label}</div>
      <div style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 8 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points={isOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
        </svg>
      </div>
    </button>
  )
}

function SubnavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 16px', textDecoration: 'none',
        borderRadius: 8, margin: '2px 0',
        background: isActive ? 'rgba(201,168,76,0.12)' : 'transparent',
        borderLeft: isActive ? '3px solid #c9a84c' : '3px solid transparent',
      }}
    >
      <div style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, background: isActive ? '#c9a84c' : 'rgba(255,255,255,0.25)' }} />
      <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? '#c9a84c' : 'rgba(255,255,255,0.55)' }}>{label}</span>
    </Link>
  )
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { adminUser } = useSidebar()
  const [menuOpen, setMenuOpen] = useState(false)

  const isPolicyActive = pathname.startsWith('/dashboard/policy')
  const isServiceActive = pathname === '/dashboard/services'

  const [policyOpen, setPolicyOpen] = useState(isPolicyActive)
  const [serviceOpen, setServiceOpen] = useState(isServiceActive)

  function handleLogout() {
    clearAdminToken()
    router.push('/admin/login')
  }

  const navItems = [
    { label: 'Overview', icon: <BarChartIcon />, href: '/dashboard' },
    { label: 'Packages', icon: <ChatBubbleIcon />, href: '/dashboard/packages' },
    { label: 'Client Chats', icon: <InboxIcon />, href: '/dashboard/inbox' },
    { label: 'Payments', icon: <PaymentIcon />, href: '/dashboard/payments' },
    { label: 'All Members', icon: <UsersIcon />, href: '/dashboard/clients' },
  ]

  const policySubnav = [
    { label: 'Privacy Policy Manager', href: '/dashboard/policy/privacy' },
    { label: 'Terms Manager', href: '/dashboard/policy/terms' },
    { label: 'About Us Manager', href: '/dashboard/policy/about' },
    { label: 'Our Team Manager', href: '/dashboard/policy/team' },
  ]

  const close = () => setSidebarOpen(false)

  return (
    <>
      <div className={`chat-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={close} />

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
                onClick={close}
                style={{
                  textDecoration: 'none',
                  padding: '14px 24px',
                  borderRadius: isActive ? '0' : '8px',
                  margin: isActive ? '4px -16px' : '4px 0',
                  background: isActive ? '#25232d' : 'transparent',
                  borderLeft: isActive ? '4px solid #c9a84c' : '4px solid transparent',
                  paddingLeft: isActive ? '36px' : '24px',
                }}
              >
                <div style={{ color: isActive ? '#c9a84c' : 'rgba(255,255,255,0.4)', marginTop: '2px', width: '16px' }}>{item.icon}</div>
                <div style={{ flex: 1, fontWeight: '500', fontSize: '15px', color: isActive ? '#c9a84c' : 'rgba(255,255,255,0.7)', letterSpacing: '0.02em', marginLeft: '6px' }}>{item.label}</div>
              </Link>
            )
          })}

          {/* ── Service Manager ── */}
          <AccordionButton
            isActive={isServiceActive}
            isOpen={serviceOpen}
            icon={<ServiceIcon />}
            label="Service Manager"
            onClick={() => setServiceOpen(o => !o)}
          />
          {serviceOpen && (
            <div style={{ paddingLeft: 12 }}>
              <SubnavLink href="/dashboard/services" label="Manage Services" onClick={close} />
            </div>
          )}

          {/* ── Content Manager ── */}
          <AccordionButton
            isActive={isPolicyActive}
            isOpen={policyOpen}
            icon={<PolicyIcon />}
            label="Content Manager"
            onClick={() => setPolicyOpen(o => !o)}
          />
          {policyOpen && (
            <div style={{ paddingLeft: 12 }}>
              {policySubnav.map(sub => (
                <SubnavLink key={sub.href} href={sub.href} label={sub.label} onClick={close} />
              ))}
            </div>
          )}
        </div>

        <div style={{ position: 'relative', marginTop: 'auto' }}>
          {menuOpen && (
            <button
              onClick={handleLogout}
              style={{
                position: 'absolute', bottom: '100%', left: '16px', right: '16px', marginBottom: '8px',
                padding: '12px 16px', background: '#25232d', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px', color: '#e04848', fontSize: '13px', fontWeight: '600',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
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
          <div className="chat-sidebar-footer" onClick={() => setMenuOpen(o => !o)} style={{ cursor: 'pointer' }}>
            <div className="user-avatar" style={{ border: '2px solid rgba(255,255,255,0.1)' }}>
              {adminUser ? initialsOf(adminUser.firstName, adminUser.lastName) : '...'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span className="user-name">{adminUser ? `${adminUser.firstName} ${adminUser.lastName}`.trim() : 'Loading...'}</span>
              <span style={{ fontSize: '10px', color: '#c9a84c', fontWeight: '600' }}>{adminUser?.email ?? ''}</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', display: 'flex' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points={menuOpen ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
              </svg>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
