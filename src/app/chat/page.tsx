'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ScalesIcon } from '@/components/Icons'

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

/* ── Types ────────────────────────────────────────── */
type Message = {
  id: string
  text: string
  sender: 'bot' | 'user'
  timestamp: string
}

const mockHistory = [
  "New Case Discussion",
  "Family Law Consultation",
  "Business Contract Query",
  "IP Rights Investigation",
]

export default function ChatPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to MS Advocate. I am your specialized AI legal assistant. I can help you analyze documents, explain legal precedents, or guide you through case filing. How may I assist you today?",
      sender: 'bot',
      timestamp: 'Today, 2:45 PM'
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!mounted) return null

  const handleSend = () => {
    if (!inputText.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Understood. Our legal database shows several relevant precedents for this matter. I recommend gathering all related documents while I draft a summary for your attorney.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMsg])
    }, 1200)
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
            <span className="signin-brand">MS Advocate</span>
          </div>
          
          <button className="new-chat-btn">
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
          {mockHistory.map((item, idx) => (
            <div key={idx} className={`history-item ${idx === 0 ? 'active' : ''}`}>
              <ClockIcon />
              <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item}</div>
            </div>
          ))}
        </div>

        {/* PROFILE SECTION - CLICKABLE */}
        <div className="chat-sidebar-footer" onClick={() => router.push('/profile')} style={{ cursor: 'pointer' }}>
          <div className="user-avatar" style={{ border: '2px solid rgba(255,255,255,0.1)' }}>JD</div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span className="user-name">John Doe</span>
            <span style={{ fontSize: '10px', color: '#c9a84c', fontWeight: '600' }}>Premium Client</span>
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
            <button style={{ background: 'none', border: 'none', color: '#666', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Export Chat
            </button>
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
                <div>{msg.text}</div>
              </div>
              <div style={{ fontSize: '10px', marginTop: '6px', color: '#999', padding: '0 4px' }}>
                {msg.timestamp}
              </div>
            </div>
          ))}
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
            Powered by MS Advocate Legal AI. Secure & Confidential.
          </div>
        </div>
      </main>

    </div>
  )
}
