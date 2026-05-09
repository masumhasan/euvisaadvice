'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ScalesIcon } from '@/components/Icons'
import { createClient } from '@/lib/supabase/client'

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
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [userId, setUserId] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [avatarUploading, setAvatarUploading] = useState(false)

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

  // Notifications / alerts (fetched from auth events)
  const [alerts, setAlerts] = useState<{ id: string; message: string; created_at: string }[]>([])

  useEffect(() => {
    setMounted(true)
    loadUser()
  }, [])

  async function loadUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) { router.push('/login'); return }

    setUserId(user.id)

    // Always set email from auth
    const meta = user.user_metadata || {}
    setFormData(prev => ({
      ...prev,
      email: user.email || '',
      firstName: meta.first_name || meta.full_name?.split(' ')[0] || '',
      lastName: meta.last_name || meta.full_name?.split(' ')[1] || '',
      phone: meta.phone || '',
      country: meta.country || '',
      city: meta.city || '',
      bio: meta.bio || '',
    }))

    // Try to fetch from profiles table (may not exist yet)
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profileError && profile) {
        setFormData({
          firstName: profile.first_name || meta.first_name || '',
          lastName: profile.last_name || meta.last_name || '',
          email: user.email || '',
          phone: profile.phone || meta.phone || '',
          country: profile.country || meta.country || '',
          city: profile.city || meta.city || '',
          bio: profile.bio || meta.bio || '',
        })
        if (profile.avatar_url) setAvatarUrl(profile.avatar_url)
      }
    } catch (_) {
      // profiles table not created yet — using auth metadata fallback
    }

    setAlerts([
      { id: '1', message: 'Login detected from new session.', created_at: new Date().toISOString() },
      { id: '2', message: 'Profile created successfully.', created_at: user.created_at },
    ])
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !userId) return
    setAvatarUploading(true)

    try {
      const ext = file.name.split('.').pop()
      const path = `${userId}/avatar.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })

      if (uploadError) {
        alert('Avatar upload failed: ' + uploadError.message)
        setAvatarUploading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
      await supabase.from('profiles').upsert({ id: userId, avatar_url: publicUrl })
      setAvatarUrl(publicUrl + `?t=${Date.now()}`)
    } catch (err: any) {
      alert('Upload error: ' + (err.message || 'Please run the SQL setup script first.'))
    }
    setAvatarUploading(false)
  }

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')

    try {
      const { error } = await supabase.from('profiles').upsert({
        id: userId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        bio: formData.bio,
        updated_at: new Date().toISOString(),
      })
      setSaving(false)
      if (error) {
        if (error.message.includes('schema cache') || error.message.includes('does not exist')) {
          setSaveMsg('❌ Database not ready. Please run the SQL setup script in your Supabase dashboard first.')
        } else {
          setSaveMsg('❌ ' + error.message)
        }
      } else {
        setSaveMsg('✅ Profile updated successfully!')
        setIsEditing(false)
        setTimeout(() => setSaveMsg(''), 3000)
      }
    } catch (err: any) {
      setSaving(false)
      setSaveMsg('❌ ' + (err.message || 'Something went wrong.'))
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!passwords.current) { setPassMsg('❌ Please enter your current password'); return }
    if (passwords.new !== passwords.confirm) { setPassMsg('❌ Passwords do not match'); return }
    if (passwords.new.length < 6) { setPassMsg('❌ Password must be at least 6 characters'); return }
    if (passwords.current === passwords.new) { setPassMsg('❌ New password must be different from current'); return }

    setPassSaving(true)
    setPassMsg('')

    // Step 1: Verify current password
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: passwords.current,
    })

    if (verifyError) {
      setPassSaving(false)
      setPassMsg('❌ Current password is incorrect')
      return
    }

    // Step 2: Update to new password
    const { error } = await supabase.auth.updateUser({ password: passwords.new })
    setPassSaving(false)
    if (error) {
      setPassMsg('❌ ' + error.message)
    } else {
      setPassMsg('✅ Password updated successfully!')
      setPasswords({ current: '', new: '', confirm: '' })
      setTimeout(() => setPassMsg(''), 4000)
    }
  }

  const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase() || '?'

  if (!mounted) return null

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
            <button className="profile-avatar-edit" onClick={() => fileInputRef.current?.click()} disabled={avatarUploading} title="Change photo">
              {avatarUploading ? '...' : <CameraIcon />}
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
            <Link href="/chat" className="profile-btn-secondary">Assistant</Link>
            <button onClick={() => setIsEditing(!isEditing)} className="profile-btn-primary">
              {isEditing ? 'Cancel' : 'Edit Profile'}
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
            <Link href="/chat" className="assistant-card">
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
                      <input type={showPass ? 'text' : 'password'} className="signin-input signin-input-padded" required value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} placeholder="Min. 6 characters" />
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
              <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                      {['Date', 'Invoice ID', 'Package / Plan', 'Amount', 'Status'].map(h => (
                        <th key={h} style={{ padding: '16px', fontSize: '14px', color: '#666', fontWeight: '600' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '16px', fontSize: '15px', color: '#1a1a2e', fontWeight: '500', whiteSpace: 'nowrap' }}>May 09, 2026</td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#666', whiteSpace: 'nowrap' }}>#INV-2026-001</td>
                      <td style={{ padding: '16px', fontSize: '15px', color: '#1a1a2e', fontWeight: '500' }}>Premium Consultation</td>
                      <td style={{ padding: '16px', fontSize: '15px', color: '#1a1a2e', fontWeight: '600' }}>$49.00</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ display: 'inline-block', padding: '4px 12px', background: '#e6f4ea', color: '#1e8e3e', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>Paid</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
