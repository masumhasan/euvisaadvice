'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ScalesIcon } from '@/components/Icons'
import { setToken } from '@/lib/auth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'
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

type Mode = 'login' | 'verify' | 'forgot' | 'reset'

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mode, setMode] = useState<Mode>('login')

  useEffect(() => {
    setMounted(true)
  }, [])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${BACKEND}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.code === 'EMAIL_NOT_VERIFIED') {
          setMode('verify')
          setError('')
          await handleResendOtp()
          return
        }
        throw new Error(data.error || 'Login failed')
      }

      setToken(data.token)
      router.push('/legalchat')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpInput = (index: number, val: string) => {
    if (val.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) (nextInput as HTMLInputElement).focus()
    }
  }

  const handleResendOtp = async () => {
    setResending(true)
    setResendMessage('')
    try {
      const res = await fetch(`${BACKEND}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to resend code')
      setResendMessage('A verification code has been sent to your email.')
    } catch (err) {
      setResendMessage(err instanceof Error ? err.message : 'Failed to resend code')
    } finally {
      setResending(false)
    }
  }

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${BACKEND}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otp.join('') }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Verification failed')

      setToken(data.token)
      router.push('/legalchat')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${BACKEND}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send reset code')

      setOtp(['', '', '', '', '', ''])
      setMode('reset')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset code')
    } finally {
      setLoading(false)
    }
  }

  const handleResendResetOtp = async () => {
    setResending(true)
    setResendMessage('')
    try {
      const res = await fetch(`${BACKEND}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to resend code')
      setResendMessage('A new reset code has been sent to your email.')
    } catch (err) {
      setResendMessage(err instanceof Error ? err.message : 'Failed to resend code')
    } finally {
      setResending(false)
    }
  }

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otp.join(''), newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to reset password')

      setToken(data.token)
      router.push('/legalchat')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    } finally {
      setLoading(false)
    }
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

          {mode === 'login' && (
            <>
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
                    <button
                      type="button"
                      className="signin-forgot"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      onClick={() => { setError(''); setMode('forgot') }}
                    >
                      Forgot password?
                    </button>
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
            </>
          )}

          {mode === 'verify' && (
            <>
              <h2 className="signin-form-heading">Verify Your Email</h2>
              <p className="signin-form-sub">Enter the 6-digit code sent to {email}</p>

              <form onSubmit={handleVerifySubmit} className="signin-form">
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      className="signin-input"
                      style={{ width: '44px', textAlign: 'center', fontWeight: 'bold' }}
                      value={d}
                      onChange={(e) => handleOtpInput(i, e.target.value)}
                    />
                  ))}
                </div>
                {error && <p style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
                {resendMessage && <p style={{ color: '#666', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>{resendMessage}</p>}
                <button
                  type="submit"
                  className={`signin-submit-btn${loading ? ' loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Verifying…' : 'Verify Email'}
                </button>
                <p className="signin-new-client" style={{ marginTop: '16px' }}>
                  Didn&apos;t get the code? <button type="button" disabled={resending} className="signin-gold-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={handleResendOtp}>
                    {resending ? 'Resending...' : 'Resend OTP'}
                  </button>
                </p>
              </form>
              <p className="signin-new-client" style={{ marginTop: '8px' }}>
                <span>Don&apos;t have an account?</span>
                <Link href="/register" className="signin-gold-link">Get legal advice →</Link>
              </p>
            </>
          )}

          {mode === 'forgot' && (
            <>
              <h2 className="signin-form-heading">Reset Your Password</h2>
              <p className="signin-form-sub">Enter your account email and we&apos;ll send you a reset code</p>

              <form onSubmit={handleForgotPasswordSubmit} className="signin-form" noValidate>
                <div className="signin-field">
                  <label htmlFor="forgot-email" className="signin-label">Email address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signin-input"
                  />
                </div>

                {error && <p style={{ color: '#ff4d4d', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}
                <button
                  type="submit"
                  className={`signin-submit-btn${loading ? ' loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Sending…' : 'Send Reset Code'}
                </button>
                <p className="signin-new-client" style={{ marginTop: '16px' }}>
                  <button type="button" className="signin-gold-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => { setError(''); setMode('login') }}>
                    ← Back to sign in
                  </button>
                </p>
              </form>
              <p className="signin-new-client" style={{ marginTop: '8px' }}>
                <span>Don&apos;t have an account?</span>
                <Link href="/register" className="signin-gold-link">Get legal advice →</Link>
              </p>
            </>
          )}

          {mode === 'reset' && (
            <>
              <h2 className="signin-form-heading">Enter Reset Code</h2>
              <p className="signin-form-sub">Enter the 6-digit code sent to {email} and choose a new password</p>

              <form onSubmit={handleResetPasswordSubmit} className="signin-form">
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      className="signin-input"
                      style={{ width: '44px', textAlign: 'center', fontWeight: 'bold' }}
                      value={d}
                      onChange={(e) => handleOtpInput(i, e.target.value)}
                    />
                  ))}
                </div>

                <div className="signin-field">
                  <label htmlFor="new-password" className="signin-label">New Password</label>
                  <input
                    id="new-password"
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="signin-input"
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div className="signin-field">
                  <label htmlFor="confirm-new-password" className="signin-label">Confirm New Password</label>
                  <input
                    id="confirm-new-password"
                    type="password"
                    required
                    minLength={8}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="signin-input"
                  />
                </div>

                {error && <p style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
                {resendMessage && <p style={{ color: '#666', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>{resendMessage}</p>}
                <button
                  type="submit"
                  className={`signin-submit-btn${loading ? ' loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Resetting…' : 'Reset Password'}
                </button>
                <p className="signin-new-client" style={{ marginTop: '16px' }}>
                  Didn&apos;t get the code? <button type="button" disabled={resending} className="signin-gold-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={handleResendResetOtp}>
                    {resending ? 'Resending...' : 'Resend Code'}
                  </button>
                </p>
              </form>
              <p className="signin-new-client" style={{ marginTop: '8px' }}>
                <span>Don&apos;t have an account?</span>
                <Link href="/register" className="signin-gold-link">Get legal advice →</Link>
              </p>
            </>
          )}
        </div>
      </div>

    </div>
  )
}
