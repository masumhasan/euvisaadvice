'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { usePathname } from 'next/navigation'
import { MenuIcon, BellIcon } from '@/components/Icons'

// ── Context ───────────────────────────────────────────────────────────────────

interface SidebarContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider')
  return context
}

// ── Layout Component ──────────────────────────────────────────────────────────

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard Overview'
    if (pathname === '/dashboard/chat') return 'Chatbot Packages'
    if (pathname === '/dashboard/inbox') return 'Message Inbox'
    if (pathname === '/dashboard/payments') return 'Payments & Billing'
    if (pathname === '/dashboard/clients') return 'Client Management'
    if (pathname === '/dashboard/pages') return 'Manage Dynamic Pages'
    return 'Dashboard'
  }

  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <div className="chat-root" suppressHydrationWarning>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="chat-main lg:ml-[300px]" style={{ backgroundColor: '#fcfbf9', minHeight: '100vh' }}>

        <header className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="chat-menu-toggle lg:hidden p-2" onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <MenuIcon style={{ width: 24, height: 24 }} />
            </button>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a2e', margin: 0, letterSpacing: '-0.02em' }}>
              {getPageTitle()}
            </h1>
          </div>

          <div className="hide-mobile" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {currentDate}
            </span>
            <div style={{ position: 'relative', cursor: 'pointer', display: 'flex' }}>
              <BellIcon style={{ width: 20, height: 20 }} />
              <div style={{ position: 'absolute', top: '0px', right: '2px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #ffffff' }}></div>
            </div>
          </div>
        </header>

        {children}

      </main>
    </div>
  )
}
