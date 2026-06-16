'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ScalesIcon } from '@/components/Icons'
import { getToken, clearToken } from '@/lib/auth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'
/* ── Icons ── */
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}
function CreditCardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}
function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}
function EyeIcon({ open }: { open: boolean }) {
  if (open) return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 1.55-.12" /><line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [mounted, setMounted] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)

  // Profile data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    bio: '',
  })

  // Password
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [passMsg, setPassMsg] = useState('')
  const [passSaving, setPassSaving] = useState(false)

  // Notifications / alerts — no events recorded yet for this account
  const [alerts] = useState<{ id: string; message: string; created_at: string }[]>([])

  useEffect(() => {
    setMounted(true)

    const token = getToken()
    if (!token) {
      router.push('/login')
      return
    }

    fetch(`${BACKEND}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (!res.ok) throw new Error('Invalid session')
        const data = await res.json()
        setFormData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          country: data.user.country || '',
          city: data.user.city || '',
          bio: data.user.bio || '',
        })
        setAuthChecked(true)
      })
      .catch(() => {
        clearToken()
        router.push('/login')
      })
  }, [router])

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarUrl(URL.createObjectURL(file))
  }

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')

    try {
      const token = getToken()
      const res = await fetch(`${BACKEND}/api/auth/me`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          bio: formData.bio,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update profile')

      setSaveMsg('✅ Profile updated successfully!')
      setIsEditing(false)
    } catch (err) {
      setSaveMsg(`❌ ${err instanceof Error ? err.message : 'Failed to update profile'}`)
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(''), 4000)
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!passwords.current) { setPassMsg('❌ Please enter your current password'); return }
    if (passwords.new !== passwords.confirm) { setPassMsg('❌ Passwords do not match'); return }
    if (passwords.new.length < 8) { setPassMsg('❌ Password must be at least 8 characters'); return }
    if (passwords.current === passwords.new) { setPassMsg('❌ New password must be different from current'); return }

    setPassSaving(true)
    setPassMsg('')

    try {
      const token = getToken()
      const res = await fetch(`${BACKEND}/api/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.new }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update password')

      setPassMsg('✅ Password updated successfully!')
      setPasswords({ current: '', new: '', confirm: '' })
    } catch (err) {
      setPassMsg(`❌ ${err instanceof Error ? err.message : 'Failed to update password'}`)
    } finally {
      setPassSaving(false)
      setTimeout(() => setPassMsg(''), 4000)
    }
  }

  async function handleLogout() {
    setLoggingOut(true)
    try {
      const token = getToken()
      await fetch(`${BACKEND}/api/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch {
      // ignore network errors — clear the local session regardless
    } finally {
      clearToken()
      router.push('/login')
    }
  }

  const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase() || '?'

  if (!mounted || !authChecked) return null

  return (
    <div className="profile-root" suppressHydrationWarning>

      {/* ── Top Bar ── */}
      <nav className="profile-top-nav">
        <div className="profile-nav-container">
          <Link href="/" className="signin-left-logo text-left">
            <ScalesIcon style={{ width: 22, height: 22, color: '#c9a84c' }} />
            <span className="signin-brand">MS Advocate</span>
          </Link>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #c9a84c, #ab8c36)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', color: '#fff', flexShrink: 0, overflow: 'hidden' }}>
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initials}
          </div>
        </div>
      </nav>

      {/* ── Hero Header ── */}
      <div className="profile-header-area" style={{ background: 'linear-gradient(rgba(18, 18, 31, 0.8), rgba(18, 18, 31, 0.95)), url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600") center/cover no-repeat' }}>
        <div className="profile-header-content">
          <div className="profile-avatar-wrap">
            {avatarUrl
              ? <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '18px' }} />
              : <div className="profile-avatar-inner">{initials}</div>}
            <button className="profile-avatar-edit" onClick={() => fileInputRef.current?.click()} title="Change photo">
              <CameraIcon />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </div>

          <div className="profile-user-info">
            <div className="profile-name-row">
              <h1 className="profile-name">{formData.firstName} {formData.lastName}</h1>
            </div>
            <div className="profile-status">
              <span>Premium • Client Portal</span>
            </div>
          </div>

          <div className="profile-header-actions">
            <Link href="/" className="profile-btn-secondary">Back to Home</Link>
            <Link href="/client-chat" className="profile-btn-secondary">Assistant</Link>
            <button onClick={() => setIsEditing(!isEditing)} className="profile-btn-primary">
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button onClick={handleLogout} disabled={loggingOut} className="profile-btn-secondary">
              {loggingOut ? 'Logging out…' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="profile-container">

        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-sidebar-header">
            <span className="sidebar-subtitle">Dashboard</span>
            <h3 className="sidebar-title">Client Account</h3>
          </div>
          <nav className="profile-menu">
            {[
              { key: 'personal', label: 'Personal Profile', hint: 'Identity & bio', icon: <UserIcon /> },
              { key: 'security', label: 'Login & Safety', hint: 'Password & privacy', icon: <LockIcon /> },
              { key: 'billing', label: 'Billing & Pay', hint: 'Transactions', icon: <CreditCardIcon /> },
              { key: 'notifications', label: 'Alert Center', hint: 'Activity logs', icon: <BellIcon /> },
            ].map(item => (
              <button key={item.key} className={`profile-menu-item ${activeTab === item.key ? 'active' : ''}`} onClick={() => { setActiveTab(item.key); setIsEditing(false); }}>
                <div className="menu-icon-bg">{item.icon}</div>
                <div className="menu-text">
                  <span className="menu-label">{item.label}</span>
                  <span className="menu-hint">{item.hint}</span>
                </div>
              </button>
            ))}
          </nav>
          <div className="profile-sidebar-footer hide-mobile">
            <Link href="/client-chat" className="assistant-card">
              <div className="assistant-dot"></div>
              <div className="assistant-info">
                <strong>Legal AI</strong>
                <span>Online & Ready</span>
              </div>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="profile-content">

          {/* ── PERSONAL INFO ── */}
          {activeTab === 'personal' && (
            <div className="fade-in">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Personal Information</h2>
                {isEditing && <span className="edit-badge">Editing Mode</span>}
              </div>
              {saveMsg && (
                <div style={{ padding: '12px 16px', borderRadius: '10px', background: saveMsg.startsWith('✅') ? '#e6f4ea' : '#fef2f2', color: saveMsg.startsWith('✅') ? '#1e8e3e' : '#dc2626', fontSize: '14px', marginBottom: '20px', fontWeight: '500' }}>
                  {saveMsg}
                </div>
              )}
              <form onSubmit={handleProfileUpdate}>
                <div className="profile-grid">
                  {[
                    { label: 'First Name', key: 'firstName', type: 'text' },
                    { label: 'Last Name', key: 'lastName', type: 'text' },
                    { label: 'Email Address', key: 'email', type: 'email', disabled: true },
                    { label: 'Phone Number', key: 'phone', type: 'tel' },
                    { label: 'Country', key: 'country', type: 'text' },
                    { label: 'City', key: 'city', type: 'text' },
                  ].map(field => (
                    <div className="profile-field" key={field.key}>
                      <label className="profile-label">{field.label}</label>
                      {isEditing && !field.disabled ? (
                        <input
                          className="signin-input"
                          type={field.type}
                          value={(formData as any)[field.key]}
                          onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                        />
                      ) : (
                        <div className="profile-value">{(formData as any)[field.key] || '—'}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '24px' }}>
                  <label className="profile-label">Bio (Optional)</label>
                  {isEditing ? (
                    <textarea className="signin-input" style={{ minHeight: '100px', padding: '12px', color: '#1a1a2e', resize: 'vertical' }} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
                  ) : (
                    <div className="profile-value" style={{ minHeight: '80px' }}>{formData.bio || '—'}</div>
                  )}
                </div>

                {isEditing && (
                  <button type="submit" className="profile-btn-primary" disabled={saving} style={{ marginTop: '32px', width: '100%', padding: '14px', fontSize: '15px' }}>
                    {saving ? 'Saving...' : 'Save All Changes'}
                  </button>
                )}
              </form>
            </div>
          )}

          {/* ── SECURITY ── */}
          {activeTab === 'security' && (
            <div className="fade-in">
              <h2 className="profile-section-title">Login & Security</h2>
              <div style={{ background: 'linear-gradient(to right, #f8f9fa, #fff)', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', borderLeft: '4px solid #c9a84c', marginBottom: '32px', marginTop: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '6px' }}>Security Status</h3>
                <p style={{ fontSize: '14px', color: '#4a4a68', margin: 0 }}>Protect your account by updating your credentials regularly.</p>
              </div>
              {passMsg && (
                <div style={{ padding: '12px 16px', borderRadius: '10px', background: passMsg.startsWith('✅') ? '#e6f4ea' : '#fef2f2', color: passMsg.startsWith('✅') ? '#1e8e3e' : '#dc2626', fontSize: '14px', marginBottom: '20px', fontWeight: '500' }}>
                  {passMsg}
                </div>
              )}
              <form onSubmit={handlePasswordUpdate}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
                  <div className="profile-field">
                    <label className="profile-label">Current Password</label>
                    <div className="signin-input-wrap">
                      <input type={showPass ? 'text' : 'password'} className="signin-input signin-input-padded" required value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} placeholder="Enter your current password" />
                      <button type="button" className="signin-eye-btn" onClick={() => setShowPass(!showPass)}><EyeIcon open={showPass} /></button>
                    </div>
                  </div>
                  <div className="profile-field">
                    <label className="profile-label">New Password</label>
                    <div className="signin-input-wrap">
                      <input type={showPass ? 'text' : 'password'} className="signin-input signin-input-padded" required value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} placeholder="Min. 8 characters" />
                      <button type="button" className="signin-eye-btn" onClick={() => setShowPass(!showPass)}><EyeIcon open={showPass} /></button>
                    </div>
                  </div>
                  <div className="profile-field">
                    <label className="profile-label">Confirm New Password</label>
                    <input type={showPass ? 'text' : 'password'} className="signin-input" required value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} placeholder="Repeat new password" />
                    {passwords.new && passwords.confirm && passwords.new !== passwords.confirm && (
                      <span style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>Passwords do not match</span>
                    )}
                  </div>
                  <button type="submit" className="profile-btn-primary" disabled={passSaving} style={{ padding: '14px', fontSize: '15px' }}>
                    {passSaving ? 'Verifying & Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── BILLING ── */}
          {activeTab === 'billing' && (
            <div className="fade-in">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Billing & Transactions</h2>
              </div>
              <div style={{ background: 'linear-gradient(to right, #f8f9fa, #fff)', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', borderLeft: '4px solid #c9a84c', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '6px' }}>Payment History</h3>
                <p style={{ fontSize: '14px', color: '#4a4a68', margin: 0 }}>View your past transactions and billing details.</p>
              </div>
              <div style={{ padding: '40px', background: '#fff', borderRadius: '16px', border: '1px solid #eee', textAlign: 'center' }}>
                <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>No billing history yet. Subscriptions and payments are coming soon.</p>
              </div>
            </div>
          )}

          {/* ── ALERT CENTER ── */}
          {activeTab === 'notifications' && (
            <div className="fade-in">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Alert Center</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {alerts.length === 0 ? (
                  <p style={{ color: '#888', fontSize: '14px' }}>No alerts yet.</p>
                ) : alerts.map(alert => (
                  <div key={alert.id} style={{ padding: '16px 20px', background: '#fff', borderRadius: '14px', border: '1px solid #f0efeb', display: 'flex', alignItems: 'flex-start', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#c9a84c', marginTop: '5px', flexShrink: 0 }} />
                    <div>
                      <p style={{ margin: 0, fontSize: '15px', color: '#1a1a2e', fontWeight: '500' }}>{alert.message}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#888' }}>{new Date(alert.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
