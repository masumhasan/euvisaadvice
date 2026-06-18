'use client'

import { useState, useEffect, useRef, type MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { ScalesIcon } from '@/components/Icons'
import { getToken, clearToken } from '@/lib/auth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

/* ── Chat Icons ───────────────────────────────────── */
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

/* ── Types ────────────────────────────────────────── */
type Message = {
  id: string
  text: string
  sender: 'bot' | 'user'
  timestamp: string
}

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

type Conversation = {
  id: string
  title: string
  updatedAt: string
}

function formatHistoryTimestamp(iso: string): string {
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric' })
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  text: "Welcome to EUVisaAdvice. I am your specialized AI legal assistant. I can help you analyze documents, explain legal precedents, or guide you through case filing. How may I assist you today?",
  sender: 'bot',
  timestamp: 'Today',
}

export default function ChatPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [loadingConversation, setLoadingConversation] = useState(false)

  const [isTyping, setIsTyping] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const authHeader = () => ({ Authorization: `Bearer ${getToken()}` })

  const loadConversations = async () => {
    try {
      const res = await fetch(`${BACKEND}/api/legal-chat/conversations`, { headers: authHeader() })
      if (!res.ok) return
      const data = await res.json()
      setConversations(data.conversations)
    } catch {
      // sidebar history is non-critical — fail silently
    }
  }

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
        if (data.user?.role === 'client') {
          clearToken()
          router.push('/client-chat')
          return
        }
        const fullName = `${data.user?.firstName ?? ''} ${data.user?.lastName ?? ''}`.trim()
        setUserName(fullName || data.user?.email || '')
        setUserEmail(data.user?.email || '')
        setAuthChecked(true)
        return loadConversations()
      })
      .catch(() => {
        clearToken()
        router.push('/login')
      })
  }, [router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  if (!mounted || !authChecked) return null

  const handleNewConsultation = async () => {
    try {
      const res = await fetch(`${BACKEND}/api/legal-chat/conversations`, {
        method: 'POST',
        headers: authHeader(),
      })
      if (!res.ok) return
      const data = await res.json()
      setConversations(prev => [data.conversation, ...prev])
      setActiveConversationId(data.conversation.id)
      setMessages([WELCOME_MESSAGE])
      setSidebarOpen(false)
    } catch {
      // ignore — user can just keep chatting in the current conversation
    }
  }

  const handleSelectConversation = async (id: string) => {
    if (id === activeConversationId) return
    setLoadingConversation(true)
    try {
      const res = await fetch(`${BACKEND}/api/legal-chat/conversations/${id}`, { headers: authHeader() })
      if (!res.ok) throw new Error('Failed to load conversation')
      const data = await res.json()
      const loaded: Message[] = data.conversation.messages.map((m: { role: string; content: string; timestamp: string }, idx: number) => ({
        id: `${id}-${idx}`,
        text: m.content,
        sender: m.role === 'assistant' ? 'bot' : 'user',
        timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }))
      setMessages(loaded.length ? loaded : [WELCOME_MESSAGE])
      setActiveConversationId(id)
      setSidebarOpen(false)
    } catch {
      // keep the current view if loading fails
    } finally {
      setLoadingConversation(false)
    }
  }

  const handleDeleteConversation = async (id: string, e: MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm('Delete this conversation? This cannot be undone.')) return
    try {
      const res = await fetch(`${BACKEND}/api/legal-chat/conversations/${id}`, {
        method: 'DELETE',
        headers: authHeader(),
      })
      if (!res.ok && res.status !== 404) return
      setConversations(prev => prev.filter(c => c.id !== id))
      if (id === activeConversationId) {
        setActiveConversationId(null)
        setMessages([WELCOME_MESSAGE])
      }
    } catch {
      // ignore — user can retry
    }
  }

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return

    const userText = inputText
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    try {
      let conversationId = activeConversationId
      if (!conversationId) {
        const createRes = await fetch(`${BACKEND}/api/legal-chat/conversations`, {
          method: 'POST',
          headers: authHeader(),
        })
        if (!createRes.ok) throw new Error('Failed to start conversation')
        const createData = await createRes.json()
        conversationId = createData.conversation.id
        setActiveConversationId(conversationId)
        setConversations(prev => [createData.conversation, ...prev])
      }

      const res = await fetch(`${BACKEND}/api/legal-chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ message: userText }),
      })

      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMsg])

      setConversations(prev => {
        const updated = prev.map(c => c.id === conversationId ? { ...c, title: data.title, updatedAt: data.updatedAt } : c)
        const moved = updated.find(c => c.id === conversationId)
        return moved ? [moved, ...updated.filter(c => c.id !== conversationId)] : updated
      })
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="chat-root" suppressHydrationWarning>
      
      {/* ── Sidebar Overlay (Mobile) ── */}
      <div className={`chat-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* ── Sidebar ── */}
      <aside className={`chat-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="chat-sidebar-header">
          <div className="signin-left-logo text-left" style={{ marginBottom: '28px' }}>
            <ScalesIcon style={{ width: 22, height: 22, color: '#c9a84c' }} />
            <span className="signin-brand">EUVisaAdvice</span>
          </div>
          
          <button className="new-chat-btn" onClick={handleNewConsultation}>
            <PlusIcon />
            <span>New Consultation</span>
          </button>

          <div style={{ marginTop: '20px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, display: 'flex' }}>
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Search conversations..." 
              style={{ width: '100%', height: '36px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', padding: '0 12px 0 36px', fontSize: '12px', color: '#fff', outline: 'none' }}
            />
          </div>
        </div>

        <div className="chat-history">
          <div style={{ padding: '12px 16px 8px', fontSize: '10px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
            Recent History
          </div>
          {conversations.length === 0 ? (
            <div style={{ padding: '12px 16px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
              No consultations yet.
            </div>
          ) : conversations.map((item) => (
            <div
              key={item.id}
              className={`history-item ${item.id === activeConversationId ? 'active' : ''}`}
              onClick={() => handleSelectConversation(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <ClockIcon />
              <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{formatHistoryTimestamp(item.updatedAt)}</div>
              <button
                type="button"
                onClick={(e) => handleDeleteConversation(item.id, e)}
                title="Delete conversation"
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b6b')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>

        {/* PROFILE SECTION - CLICKABLE */}
        <div className="chat-sidebar-footer" onClick={() => router.push('/profile')} style={{ cursor: 'pointer' }}>
          <div className="user-avatar" style={{ border: '2px solid rgba(255,255,255,0.1)' }}>
            {userName ? userName.charAt(0).toUpperCase() : '?'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span className="user-name">{userName || 'Account'}</span>
            <span style={{ fontSize: '10px', color: '#c9a84c', fontWeight: '600' }}>{userEmail}</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)', display: 'flex' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      </aside>

      {/* ── Main Chat Area ── */}
      <main className="chat-main">
        
        {/* Header */}
        <header className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="chat-menu-toggle" onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </button>
            <div className="chat-bot-info">
              <div className="chat-bot-avatar" style={{ width: 44, height: 44, borderRadius: '12px', background: '#f8f9fa', border: '1px solid #eee' }}>
                <ScalesIcon style={{ width: 22, height: 22 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="chat-bot-name" style={{ fontSize: '15px' }}>Legal AI Assistant</div>
                <div className="chat-bot-status">
                  <span className="status-dot" />
                  <span>Verified Legal Agent</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hide-mobile" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: '600', textDecoration: 'none', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '8px' }}>
              Exit
            </Link>
          </div>
        </header>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div className={`message-bubble ${msg.sender === 'bot' ? 'message-bot' : 'message-user'}`} style={{
                border: msg.sender === 'bot' ? '1px solid #eee' : 'none',
              }}>
                {msg.sender === 'bot' ? <BotMessage content={msg.text} /> : <div>{msg.text}</div>}
              </div>
              <div style={{ fontSize: '10px', marginTop: '6px', color: '#999', padding: '0 4px' }}>
                {msg.timestamp}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="message-bubble message-bot" style={{ border: '1px solid #eee' }}>
                <span style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '2px 0' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: '#c9a84c',
                      display: 'inline-block',
                      animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="chat-input-container">
          <div className="chat-input-wrap">
            <input 
              type="text" 
              placeholder="Ask me anything about your case..." 
              className="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="chat-btn btn-send" onClick={handleSend}>
              <SendIcon />
            </button>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#bbb', marginTop: '16px', letterSpacing: '0.01em' }}>
            Powered by EUVisaAdvice AI. Secure & Confidential.
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.2; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}
