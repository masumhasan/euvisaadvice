'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ScalesIcon } from '@/components/Icons'
import { setToken } from '@/lib/auth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

/* ── Step Icons ───────────────────────────────────── */
function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function CheckSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function StepMark({ active, completed, icon }: { active: boolean, completed: boolean, icon: React.ReactNode }) {
  return (
    <div className={`step-dot ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}>
      {completed ? <CheckSmall /> : icon}
    </div>
  )
}

/* ── Eye icon ─────────────────────────────────────── */
function EyeIcon({ open }: { open: boolean }) {
  return (
    open ? (
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
  'Expert legal consultation',
  'Transparent fee structure',
  'Encrypted document vault',
]

type Step = 'account' | 'verify'

export default function RegisterPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>('account')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordCon, setShowPasswordCon] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  if (!mounted) return null

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)

    try {
      const res = await fetch(`${BACKEND}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName, phone, country }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')

      setStep('verify')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
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
      router.push('/subscribe')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setLoading(false)
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
      setResendMessage('A new code has been sent to your email.')
    } catch (err) {
      setResendMessage(err instanceof Error ? err.message : 'Failed to resend code')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="signin-root" suppressHydrationWarning>
      <div className="signin-left">
        <div className="signin-left-content">
          <div className="signin-left-logo text-left">
            <ScalesIcon style={{ width: 26, height: 26 }} />
            <span className="signin-brand">EUVisaAdvice</span>
          </div>
          <div>
            <div className="signin-shield-icon">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h1 className="signin-welcome-heading">Welcome Back</h1>
            <p className="signin-welcome-sub">Access your case updates and stay informed about your legal matters</p>
            <ul className="signin-features">
              {features.map((f) => (
                <li key={f} className="signin-feature-item">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="signin-left-bottom">
            <span>Already have an account?</span>
            <Link href="/legal-login" className="signin-gold-link">Sign in instead →</Link>
          </div>
        </div>
      </div>

      <div className="signin-right">
        <div className="signin-form-wrap">
          <div className="register-stepper-horiz hide-mobile">
            <div className={`step-item-horiz ${step === 'account' ? 'active' : ''} ${step !== 'account' ? 'completed' : ''}`}>
              <StepMark active={step === 'account'} completed={step !== 'account'} icon={<UserIcon />} />
              <div className="step-label-horiz"><span className="step-num-horiz">Step 01</span><span className="step-title-horiz">Account</span></div>
            </div>
            <div className="step-connector" />
            <div className={`step-item-horiz ${step === 'verify' ? 'active' : ''}`}>
              <StepMark active={step === 'verify'} completed={false} icon={<ShieldCheckIcon />} />
              <div className="step-label-horiz"><span className="step-num-horiz">Step 02</span><span className="step-title-horiz">Verify</span></div>
            </div>
          </div>

          <div className="signin-mobile-logo">
            <ScalesIcon style={{ width: 24, height: 24 }} />
            <span className="signin-brand" style={{ color: '#1a1a2e' }}>EUVisaAdvice</span>
          </div>

          {step === 'account' && (
            <div className="fade-in">
              <h2 className="signin-form-heading">Create Account</h2>
              <p className="signin-form-sub">Provide your details to register with EUVisaAdvice</p>
              <form className="signin-form" onSubmit={handleAccountSubmit}>
                <div className="signin-grid">
                  <div className="signin-field">
                    <label className="signin-label">First Name</label>
                    <input type="text" required placeholder="John" className="signin-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="signin-field">
                    <label className="signin-label">Last Name</label>
                    <input type="text" required placeholder="Doe" className="signin-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="signin-field">
                  <label className="signin-label">Email Address</label>
                  <input type="email" required placeholder="name@example.com" className="signin-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="signin-field">
                  <label className="signin-label">Phone Number (optional)</label>
                  <input type="tel" placeholder="+1 234 567 890" className="signin-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="signin-field">
                  <label className="signin-label">Country (optional)</label>
                  <input type="text" placeholder="Germany" className="signin-input" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className="signin-field">
                  <label className="signin-label">Password</label>
                  <div className="signin-input-wrap">
                    <input type={showPassword ? 'text' : 'password'} required minLength={8} placeholder="••••••••" className="signin-input signin-input-padded" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" className="signin-eye-btn" onClick={() => setShowPassword(!showPassword)}><EyeIcon open={showPassword} /></button>
                  </div>
                </div>
                <div className="signin-field">
                  <label className="signin-label">Confirm Password</label>
                  <div className="signin-input-wrap">
                    <input type={showPasswordCon ? 'text' : 'password'} required minLength={8} placeholder="••••••••" className="signin-input signin-input-padded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="button" className="signin-eye-btn" onClick={() => setShowPasswordCon(!showPasswordCon)}><EyeIcon open={showPasswordCon} /></button>
                  </div>
                </div>
                {error && <p style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '-10px' }}>{error}</p>}
                <button type="submit" className={`signin-submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>{loading ? 'Processing...' : 'Create Account'}</button>
              </form>
            </div>
          )}

          {step === 'verify' && (
            <div className="fade-in">
              <h2 className="signin-form-heading">Verify OTP</h2>
              <p className="signin-form-sub">Enter the 6-digit code sent to {email}</p>
              <form className="signin-form" onSubmit={handleVerifySubmit}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
                  {otp.map((d, i) => (
                    <input key={i} id={`otp-${i}`} type="text" maxLength={1} className="signin-input" style={{ width: '44px', textAlign: 'center', fontWeight: 'bold' }} value={d} onChange={(e) => handleOtpInput(i, e.target.value)} />
                  ))}
                </div>
                {error &&<p style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
                {resendMessage && <p style={{ color: '#666', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>{resendMessage}</p>}
                <button type="submit" className={`signin-submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>{loading ? 'Verifying...' : 'Verify Email'}</button>
                <p className="signin-new-client" style={{ marginTop: '16px' }}>
                  Didn&apos;t get the code? <button type="button" disabled={resending} className="signin-gold-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={handleResendOtp}>
                    {resending ? 'Resending...' : 'Resend OTP'}
                  </button>
                </p>
              </form>
            </div>
          )}

          <div className="signin-divider" style={{ marginTop: '32px' }}>
            <div className="signin-divider-line" />
            <div style={{ display: 'flex', gap: '8px', padding: '0 12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: step === 'account' ? '#c9a84c' : '#ddd' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: step === 'verify' ? '#c9a84c' : '#ddd' }} />
            </div>
            <div className="signin-divider-line" />
          </div>
        </div>
      </div>

    </div>
  )
}
