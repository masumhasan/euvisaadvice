'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ScalesIcon } from '@/components/Icons'
/* ── Eye icon ─────────────────────────────────────── */
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

/* ── Check circle icon ────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

const features = [
  'Instant case updates',
  'Secure client portal',
  'Direct attorney communication',
]

export default function LoginPage() {
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Backend removed: Simulating login
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/chat'
    }, 1000)
  }

  if (!mounted) return null

  return (
    <div className="signin-root" suppressHydrationWarning>

      {/* ════════ LEFT PANEL ════════ */}
      <div className="signin-left">
        <div className="signin-left-content">
          <div className="signin-left-logo text-left">
            <ScalesIcon style={{ width: 26, height: 26 }} />
            <span className="signin-brand">MS Advocate</span>
          </div>
          <div>
            <div className="signin-shield-icon">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            <h1 className="signin-welcome-heading">Welcome Back</h1>
            <p className="signin-welcome-sub">
              Access your case updates and stay informed about your legal matters
            </p>

            <ul className="signin-features">
              {features.map((f) => (
                <li key={f} className="signin-feature-item">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom link – pinned */}
          <div className="signin-left-bottom">
            <span>Don&apos;t have an account?</span>
            <Link href="/register" className="signin-gold-link">
              Get legal advice →
            </Link>
          </div>
        </div>
      </div>

      {/* ════════ RIGHT PANEL ════════ */}
      <div className="signin-right">
        <div className="signin-form-wrap">
          {/* Mobile-only logo */}
          <div className="signin-mobile-logo">
            <ScalesIcon style={{ width: 24, height: 24 }} />
            <span className="signin-brand" style={{ color: '#1a1a2e' }}>MS Advocate</span>
          </div>

          <h2 className="signin-form-heading">Sign in to your account</h2>
          <p className="signin-form-sub">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="signin-form" noValidate>

            {/* Email */}
            <div className="signin-field">
              <label htmlFor="email" className="signin-label">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signin-input"
              />
            </div>

            {/* Password */}
            <div className="signin-field">
              <label htmlFor="password" className="signin-label">Password</label>
              <div className="signin-input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="signin-input signin-input-padded"
                />
                <button
                  type="button"
                  className="signin-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              <div className="signin-forgot-row">
                <Link href="#" className="signin-forgot">Forgot password?</Link>
              </div>
            </div>

            {/* Submit */}
            {error && <p style={{ color: '#ff4d4d', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}
            <button
              type="submit"
              className={`signin-submit-btn${loading ? ' loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="signin-divider">
            <div className="signin-divider-line" />
            <span className="signin-divider-text">or</span>
            <div className="signin-divider-line" />
          </div>

          {/* New client */}
          <p className="signin-new-client">
            <span>New client?</span>
            <Link href="/register" className="signin-gold-link">Get legal advice →</Link>
          </p>
        </div>
      </div>

    </div>
  )
}
