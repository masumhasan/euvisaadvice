'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from './Icons'
import { createClient } from '@/lib/supabase/client'

const navLinks = [
  { label: 'Services', href: '/legal-consultation' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about-us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [initials, setInitials] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadUser()

    // Close dropdown on outside click
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function loadUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    setUser(user)

    // Check admin role from metadata
    const role = user.user_metadata?.role || ''
    setIsAdmin(role === 'admin')

    // Get initials
    const firstName = user.user_metadata?.first_name || ''
    const lastName = user.user_metadata?.last_name || ''
    setInitials(`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.email?.charAt(0).toUpperCase() || '?')

    // Try to get avatar from profiles table
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url, first_name, last_name')
        .eq('id', user.id)
        .single()

      if (profile?.avatar_url) setAvatarUrl(profile.avatar_url)
      if (profile?.first_name || profile?.last_name) {
        setInitials(`${(profile.first_name || '').charAt(0)}${(profile.last_name || '').charAt(0)}`.toUpperCase() || '?')
      }
    } catch (_) {}
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
    setDropdownOpen(false)
    router.push('/')
    router.refresh()
  }

  const profileHref = isAdmin ? '/dashboard' : '/profile'

  return (
    <nav className="nav-root">
      <div className="nav-inner">

        {/* Logo */}
        <Link href="/" className="nav-logo">
          <LogoIcon style={{ width: 32, height: 32 }} />
          <div>
            <div className="nav-logo-name">MS ADVOC<span>ATE</span></div>
            <div className="nav-logo-since">SINCE 2023</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="nav-link">{label}</Link>
          ))}

          {user ? (
            /* ── Logged-in: Avatar + Dropdown ── */
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #c9a84c, #ab8c36)',
                  border: '2px solid rgba(201,168,76,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', fontSize: '14px', color: '#fff',
                  cursor: 'pointer', overflow: 'hidden', padding: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: dropdownOpen ? '0 0 0 3px rgba(201,168,76,0.25)' : 'none',
                }}
              >
                {avatarUrl
                  ? <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : initials}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                  background: '#fff', borderRadius: '16px', minWidth: '200px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)',
                  padding: '8px', zIndex: 1000, animation: 'fadeIn 0.15s ease',
                }}>
                  {/* User info header */}
                  <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid #f0f0f0', marginBottom: '6px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>
                      {user.user_metadata?.first_name || user.email?.split('@')[0]}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{user.email}</div>
                    {isAdmin && (
                      <span style={{ display: 'inline-block', marginTop: '6px', padding: '2px 8px', background: 'rgba(201,168,76,0.1)', color: '#c9a84c', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                        Admin
                      </span>
                    )}
                  </div>

                  {/* Menu items */}
                  <Link
                    href={profileHref}
                    onClick={() => setDropdownOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', color: '#1a1a2e', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8f7f2')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    {isAdmin ? 'Dashboard' : 'My Profile'}
                  </Link>

                  <Link
                    href="/chat"
                    onClick={() => setDropdownOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', color: '#1a1a2e', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8f7f2')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    AI Assistant
                  </Link>

                  <div style={{ borderTop: '1px solid #f0f0f0', margin: '6px 0' }} />

                  <button
                    onClick={handleSignOut}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '10px', color: '#ef4444', background: 'none', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fef2f2')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── Not logged in: Contact button ── */
            <Link href="/login" className="btn-sm">Contact</Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile${open ? ' open' : ''}`}>
        <div className="nav-mobile-inner">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="nav-mobile-link" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}

          {user ? (
            <>
              <Link href={profileHref} className="nav-mobile-link" onClick={() => setOpen(false)}>
                {isAdmin ? '⚙️ Dashboard' : '👤 My Profile'}
              </Link>
              <Link href="/chat" className="nav-mobile-link" onClick={() => setOpen(false)}>
                💬 AI Assistant
              </Link>
              <button
                onClick={() => { handleSignOut(); setOpen(false) }}
                className="btn-primary"
                style={{ marginTop: 8, textAlign: 'center', background: '#ef4444', border: 'none', cursor: 'pointer', width: '100%' }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary" style={{ marginTop: 8, textAlign: 'center' }} onClick={() => setOpen(false)}>
              Contact
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
