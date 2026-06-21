'use client'

import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { ScalesIcon } from '@/components/Icons'
import { getClientToken, setClientToken, clearClientToken } from '@/lib/clientChatAuth'

/* ── Types ───────────────────────────────────────────────── */
type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

type Stage =
  | { kind: 'loading' }
  | { kind: 'register' }
  | { kind: 'login'; notice?: string }
  | { kind: 'verify'; email: string; devOtp?: string }
  | { kind: 'chat' }

/* ── API ─────────────────────────────────────────────────── */
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

async function apiRequest<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string | null } = {},
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (options.token) headers.Authorization = `Bearer ${options.token}`

  const res = await fetch(`${BACKEND}${path}`, {
    method: options.method ?? (options.body ? 'POST' : 'GET'),
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `Request failed: ${res.status}`)
  return data as T
}

/* ── Icons ───────────────────────────────────────────────── */
function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

/* ── Rich Markdown Renderer (bot messages only) ─────────── */
function BotMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p style={{ margin: '0 0 10px', lineHeight: 1.65, color: '#1a1a2e' }}>{children}</p>
        ),
        strong: ({ children }) => (
          <strong style={{ fontWeight: '700', color: '#1a1a2e' }}>{children}</strong>
        ),
        em: ({ children }) => (
          <em style={{ fontStyle: 'italic', color: '#444' }}>{children}</em>
        ),
        h1: ({ children }) => (
          <h1 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e', margin: '14px 0 6px', letterSpacing: '-0.01em' }}>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a2e', margin: '12px 0 6px', letterSpacing: '-0.01em' }}>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#c9a84c', margin: '10px 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{children}</h3>
        ),
        ul: ({ children }) => (
          <ul style={{ margin: '6px 0 10px', paddingLeft: '20px', listStyleType: 'disc', color: '#1a1a2e' }}>{children}</ul>
        ),
        ol: ({ children }) => (
          <ol style={{ margin: '6px 0 10px', paddingLeft: '20px', color: '#1a1a2e' }}>{children}</ol>
        ),
        li: ({ children }) => (
          <li style={{ marginBottom: '4px', lineHeight: 1.6 }}>{children}</li>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.startsWith('language-')
          if (isBlock) {
            return (
              <pre style={{ background: '#f4f3ef', borderRadius: '8px', padding: '12px 14px', overflowX: 'auto', margin: '8px 0' }}>
                <code style={{ fontFamily: 'monospace', fontSize: '13px', color: '#1a1a2e' }}>{children}</code>
              </pre>
            )
          }
          return (
            <code style={{ background: '#f4f3ef', borderRadius: '4px', padding: '2px 6px', fontFamily: 'monospace', fontSize: '13px', color: '#c9a84c' }}>{children}</code>
          )
        },
        hr: () => (
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '12px 0' }} />
        ),
        blockquote: ({ children }) => (
          <blockquote style={{ borderLeft: '3px solid #c9a84c', paddingLeft: '12px', margin: '8px 0', color: '#666', fontStyle: 'italic' }}>{children}</blockquote>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#c9a84c', textDecoration: 'underline' }}>{children}</a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

/* ── Shared auth card shell ──────────────────────────────── */
function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#fff',
        borderRadius: '20px',
        border: '1px solid #eee',
        boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
        padding: '40px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a2e', margin: 0, letterSpacing: '-0.02em' }}>
            {title}
          </h2>
          <p style={{ fontSize: '14px', color: '#888', margin: 0, lineHeight: 1.5 }}>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  height: '46px',
  borderRadius: '12px',
  border: `1.5px solid ${hasError ? '#ef4444' : '#e0e0e0'}`,
  padding: '0 16px',
  fontSize: '15px',
  outline: 'none',
  color: '#1a1a2e',
  width: '100%',
  background: '#fff',
})

const labelStyle: React.CSSProperties = { fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '6px', display: 'block' }

const submitBtnStyle = (disabled: boolean): React.CSSProperties => ({
  height: '48px',
  borderRadius: '12px',
  background: disabled ? '#e0e0e0' : '#1a1a2e',
  color: disabled ? '#999' : '#fff',
  border: 'none',
  fontSize: '15px',
  fontWeight: '600',
  cursor: disabled ? 'not-allowed' : 'pointer',
  letterSpacing: '0.01em',
})

/* ── Register Form ───────────────────────────────────────── */
function RegisterForm({
  onRegistered,
  onShowLogin,
}: {
  onRegistered: (email: string, devOtp?: string) => void
  onShowLogin: () => void
}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const data = await apiRequest<{ email: string; otp?: string }>('/api/auth/register', {
        body: { email, password, firstName, lastName, role: 'client' },
      })
      onRegistered(data.email, data.otp)
    } catch (err) {
      setError((err as Error).message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Client Portal" subtitle="Register to access your case chat with Mathias's office.">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>First Name</label>
            <input style={inputStyle(false)} required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Last Name</label>
            <input style={inputStyle(false)} required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input type="email" style={inputStyle(false)} required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input type="password" style={inputStyle(false)} required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <div>
          <label style={labelStyle}>Confirm Password</label>
          <input type="password" style={inputStyle(false)} required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" />
        </div>
        {error && <p role="alert" style={{ fontSize: '13px', color: '#ef4444', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading} style={submitBtnStyle(loading)}>
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>
      <p style={{ fontSize: '13px', color: '#888', margin: 0, textAlign: 'center' }}>
        Already registered? <button type="button" onClick={onShowLogin} style={{ background: 'none', border: 'none', color: '#c9a84c', fontWeight: 600, cursor: 'pointer' }}>Sign in</button>
      </p>
    </AuthCard>
  )
}

/* ── Login Form ───────────────────────────────────────────── */
function LoginForm({
  notice,
  onLoggedIn,
  onShowRegister,
}: {
  notice?: string
  onLoggedIn: (token: string) => void
  onShowRegister: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await apiRequest<{ token: string; user: { role: string } }>('/api/auth/login', {
        body: { email, password },
      })
      if (data.user.role === 'user') {
        router.push('/legalchat')
        return
      }
      if (data.user.role !== 'client') {
        throw new Error('Access denied. This portal is for registered clients only.')
      }
      onLoggedIn(data.token)
    } catch (err) {
      setError((err as Error).message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Welcome Back" subtitle="Sign in to continue your conversation.">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {notice && <p style={{ fontSize: '13px', color: '#0a7d3c', margin: 0 }}>{notice}</p>}
        <div>
          <label style={labelStyle}>Email Address</label>
          <input type="email" style={inputStyle(false)} required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <input type="password" style={inputStyle(false)} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        {error && <p role="alert" style={{ fontSize: '13px', color: '#ef4444', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading} style={submitBtnStyle(loading)}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
      <p style={{ fontSize: '13px', color: '#888', margin: 0, textAlign: 'center' }}>
        New client? <button type="button" onClick={onShowRegister} style={{ background: 'none', border: 'none', color: '#c9a84c', fontWeight: 600, cursor: 'pointer' }}>Create an account</button>
      </p>
    </AuthCard>
  )
}

/* ── OTP Verify Form ──────────────────────────────────────── */
function VerifyForm({
  email,
  onVerified,
}: {
  email: string
  onVerified: (token: string) => void
}) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  const handleOtpInput = (index: number, val: string) => {
    if (val.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)
    if (val && index < 5) {
      const nextInput = document.getElementById(`client-otp-${index + 1}`)
      if (nextInput) (nextInput as HTMLInputElement).focus()
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await apiRequest<{ token: string }>('/api/auth/verify-otp', {
        body: { email, otp: otp.join('') },
      })
      onVerified(data.token)
    } catch (err) {
      setError((err as Error).message || 'Verification failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setResendMessage('')
    try {
      const data = await apiRequest<{ message: string }>('/api/auth/resend-otp', {
        body: { email },
      })
      setResendMessage(data.message)
    } catch (err) {
      setResendMessage((err as Error).message || 'Failed to resend code.')
    } finally {
      setResending(false)
    }
  }

  return (
    <AuthCard title="Verify Your Email" subtitle={`Enter the 6-digit code sent to ${email}`}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {otp.map((d, i) => (
            <input
              key={i}
              id={`client-otp-${i}`}
              type="text"
              maxLength={1}
              value={d}
              onChange={(e) => handleOtpInput(i, e.target.value)}
              style={{ ...inputStyle(false), width: '44px', textAlign: 'center', fontWeight: 'bold', padding: 0 }}
            />
          ))}
        </div>

        {error && <p role="alert" style={{ fontSize: '13px', color: '#ef4444', margin: 0, textAlign: 'center' }}>{error}</p>}
        {resendMessage && <p style={{ fontSize: '13px', color: '#666', margin: 0, textAlign: 'center' }}>{resendMessage}</p>}

        <button type="submit" disabled={loading} style={submitBtnStyle(loading)}>
          {loading ? 'Verifying…' : 'Verify Email'}
        </button>

        <p style={{ fontSize: '13px', color: '#888', margin: 0, textAlign: 'center' }}>
          Didn&apos;t get the code?{' '}
          <button type="button" disabled={resending} onClick={handleResend} style={{ background: 'none', border: 'none', color: '#c9a84c', fontWeight: 600, cursor: 'pointer' }}>
            {resending ? 'Resending…' : 'Resend OTP'}
          </button>
        </p>
      </form>
    </AuthCard>
  )
}

/* ── Thinking Indicator ──────────────────────────────────── */
const THINKING_STEPS = [
  'Scanning for new events…',
  'Isolating your communications…',
  'Searching database with your email…',
  'Retrieving data from server…',
  'Analyzing case history…',
  'Processing email context…',
  'Reviewing correspondence timeline…',
  'Preparing your response…',
]

function ThinkingIndicator() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % THINKING_STEPS.length), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div
        className="message-bubble message-bot"
        style={{
          border: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '14px 20px',
          minWidth: '260px',
        }}
      >
        {/* Radar pulse */}
        <div style={{ position: 'relative', width: '20px', height: '20px', flexShrink: 0 }}>
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            border: '2px solid #c9a84c',
            animation: 'radarRing 1.6s ease-out infinite',
          }} />
          <div style={{
            position: 'absolute', inset: '5px',
            borderRadius: '50%',
            background: '#c9a84c',
          }} />
        </div>

        {/* Cycling status text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{
            fontSize: '10px', fontWeight: '700', color: '#c9a84c',
            textTransform: 'uppercase', letterSpacing: '0.09em',
          }}>
            Working
          </span>
          <span
            key={step}
            style={{
              fontSize: '13px', color: '#555',
              animation: 'fadeSlideIn 0.35s ease-out forwards',
            }}
          >
            {THINKING_STEPS[step]}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Chat Area ───────────────────────────────────────────── */
function ChatArea({ token, onSignOut }: { token: string; onSignOut: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [initializing, setInitializing] = useState(true)
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    let cancelled = false
    apiRequest<{ conversation: { messages: ChatMessage[] } }>('/api/client-chat/conversation', { token })
      .then((data) => {
        if (cancelled) return
        if (data.conversation.messages.length > 0) {
          setMessages(data.conversation.messages)
        } else {
          setMessages([
            {
              role: 'assistant',
              content: 'Hello! I have access to the email records associated with your case. How can I help you today?',
              timestamp: new Date().toISOString(),
            },
          ])
        }
      })
      .catch((err) => setError((err as Error).message || 'Failed to load your conversation.'))
      .finally(() => { if (!cancelled) setInitializing(false) })
    return () => { cancelled = true }
  }, [token])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async () => {
    const text = inputText.trim()
    if (!text || loading) return

    setMessages(prev => [...prev, { role: 'user', content: text, timestamp: new Date().toISOString() }])
    setInputText('')
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest<{ response: string }>('/api/client-chat/messages', {
        token,
        body: { message: text },
      })
      setMessages(prev => [...prev, { role: 'assistant', content: data.response, timestamp: new Date().toISOString() }])
    } catch (err) {
      setError((err as Error).message || 'Failed to get a response. Please try again.')
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  if (initializing) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '14px' }}>
        Loading your conversation…
      </div>
    )
  }

  return (
    <>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              className={`message-bubble ${msg.role === 'assistant' ? 'message-bot' : 'message-user'}`}
              style={{ border: msg.role === 'assistant' ? '1px solid #eee' : 'none' }}
            >
              {msg.role === 'assistant' ? <BotMessage content={msg.content} /> : msg.content}
            </div>
            <div style={{ fontSize: '10px', marginTop: '6px', color: '#999', padding: '0 4px' }}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}

        {loading && <ThinkingIndicator />}

        {error && (
          <div role="alert" style={{
            margin: '0 auto',
            padding: '10px 16px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '10px',
            fontSize: '13px',
            color: '#ef4444',
            maxWidth: '480px',
            width: '100%',
          }}>
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your case… (Enter to send, Shift+Enter for new line)"
            disabled={loading}
            rows={2}
            maxLength={2000}
            aria-label="Message input"
            style={{
              flex: 1,
              resize: 'none',
              borderRadius: '14px',
              border: '1.5px solid #e0e0e0',
              padding: '12px 16px',
              fontSize: '14px',
              color: '#1a1a2e',
              outline: 'none',
              fontFamily: 'inherit',
              lineHeight: 1.5,
              background: loading ? '#fafafa' : '#fff',
            }}
          />
          <button
            className="chat-btn btn-send"
            onClick={() => { void handleSend() }}
            disabled={loading || !inputText.trim()}
            style={{ flexShrink: 0, alignSelf: 'flex-end' }}
          >
            <SendIcon />
          </button>
        </div>
        <div style={{ marginTop: '12px' }}>
          <span style={{ fontSize: '11px', color: '#bbb', letterSpacing: '0.01em' }}>
            Powered by EUVisaAdvice AI. Secure & Confidential.
          </span>
        </div>
      </div>

      <style>{`
        @keyframes radarRing {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

/* ── Page ────────────────────────────────────────────────── */
export default function ExternalChatPage() {
  const [mounted, setMounted] = useState(false)
  const [stage, setStage] = useState<Stage>({ kind: 'loading' })
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const existing = getClientToken()
    if (!existing) {
      setStage({ kind: 'register' })
      return
    }
    apiRequest<{ user: { role: string } }>('/api/auth/me', { token: existing })
      .then((data) => {
        if (data.user.role === 'client') {
          setToken(existing)
          setStage({ kind: 'chat' })
        } else if (data.user.role === 'user') {
          clearClientToken()
          router.push('/legalchat')
        } else {
          clearClientToken()
          setStage({ kind: 'register' })
        }
      })
      .catch(() => {
        clearClientToken()
        setStage({ kind: 'register' })
      })
  }, [router])

  if (!mounted) return null

  const handleSignOut = () => {
    clearClientToken()
    setToken(null)
    setStage({ kind: 'login' })
  }

  return (
    <div className="chat-root" suppressHydrationWarning>
      <main className="chat-main" style={{ marginLeft: 0, display: 'flex', flexDirection: 'column' }}>

        <header className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="chat-bot-info">
              <div className="chat-bot-avatar" style={{ width: 44, height: 44, borderRadius: '12px', background: '#f8f9fa', border: '1px solid #eee' }}>
                <ScalesIcon style={{ width: 22, height: 22 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="chat-bot-name" style={{ fontSize: '15px' }}>Legal AI Assistant</div>
                <div className="chat-bot-status">
                  <span className="status-dot" />
                  <span>{stage.kind === 'chat' ? 'Verified Client' : 'Client Portal'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hide-mobile" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {stage.kind === 'chat' && (
              <button
                onClick={handleSignOut}
                style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: '600', background: 'none', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
              >
                Sign out
              </button>
            )}
            <Link href="/" style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: '600', textDecoration: 'none', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '8px' }}>
              Exit
            </Link>
          </div>
        </header>

        <div className="client-chat-body">
          {stage.kind === 'loading' && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '14px' }}>
              Loading…
            </div>
          )}

          {stage.kind === 'register' && (
            <RegisterForm
              onRegistered={(email, devOtp) => setStage({ kind: 'verify', email, devOtp })}
              onShowLogin={() => setStage({ kind: 'login' })}
            />
          )}

          {stage.kind === 'login' && (
            <LoginForm
              notice={stage.notice}
              onLoggedIn={(tok) => { setClientToken(tok); setToken(tok); setStage({ kind: 'chat' }) }}
              onShowRegister={() => setStage({ kind: 'register' })}
            />
          )}

          {stage.kind === 'verify' && (
            <VerifyForm
              email={stage.email}
              onVerified={(tok) => { setClientToken(tok); setToken(tok); setStage({ kind: 'chat' }) }}
            />
          )}

          {stage.kind === 'chat' && token && (
            <ChatArea token={token} onSignOut={handleSignOut} />
          )}
        </div>

      </main>
    </div>
  )
}
