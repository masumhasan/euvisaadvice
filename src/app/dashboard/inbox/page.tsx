'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { SearchIcon, EyeIcon, ChevronLeftIcon, ChevronRightIcon, MoreVerticalIcon, XIcon } from '@/components/Icons'
import { getAdminToken } from '@/lib/adminAuth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

const AVATAR_COLORS = ['#ecc94b', '#4299e1', '#c9a84c', '#48bb78', '#9f7aea', '#ed64a6']

interface ClientChatSummary {
  id: string
  name: string
  email: string
  emailVerified: boolean
  banned: boolean
  registeredAt: string
  lastMessageAt: string | null
  lastMessagePreview: string | null
}

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ClientChatDetail extends ClientChatSummary {
  conversation: { id: string; updatedAt: string; messages: ConversationMessage[] } | null
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || '?'
}

function colorFor(id: string): string {
  let hash = 0
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) % AVATAR_COLORS.length
  return AVATAR_COLORS[hash]
}

function formatDate(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

function formatTime(value: string): string {
  return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/* ── Rich text renderer for AI assistant messages ──────────── */
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

export default function InboxPage() {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState<ClientChatSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedClient, setSelectedClient] = useState<ClientChatDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = getAdminToken()
    fetch(`${BACKEND}/api/admin/client-chats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load client chats')
        setClients(data.clients)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load client chats'))
      .finally(() => setLoading(false))
  }, [])

  if (!mounted) return null

  const filtered = clients.filter((c) =>
    !search.trim() ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()),
  )

  const openTranscript = async (id: string) => {
    setDetailLoading(true)
    try {
      const token = getAdminToken()
      const res = await fetch(`${BACKEND}/api/admin/client-chats/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load conversation')
      setSelectedClient(data.client)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversation')
    } finally {
      setDetailLoading(false)
    }
  }

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Page Title & Subtitle */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>Client Chats</h2>
        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', marginTop: '4px' }}>Manage Clients</p>
      </div>

      {/* Search Bar */}
      <div style={{
        background: '#ffffff',
        padding: '24px',
        borderRadius: '24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        border: '1px solid rgba(0,0,0,0.03)'
      }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.3)', display: 'flex' }}>
            <SearchIcon style={{ width: 18, height: 18 }} />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              height: '44px',
              background: '#ffffff',
              border: '1px solid #f0f0f0',
              borderRadius: '12px',
              padding: '0 16px 0 44px',
              fontSize: '14px',
              outline: 'none',
              color: '#000000'
            }}
          />
        </div>
      </div>

      {error && (
        <div style={{ padding: '14px 20px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', color: '#ef4444', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {/* Inbox Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '32px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.02)',
        overflow: 'hidden'
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 2fr 1fr 0.5fr',
          background: '#1a1926',
          padding: '18px 40px',
          color: '#ffffff',
          fontWeight: '700',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          <div>CLIENT DETAILS</div>
          <div>EMAIL</div>
          <div>REGISTERED</div>
          <div style={{ textAlign: 'right' }}>VIEW</div>
        </div>

        {/* Table Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {loading && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>
              Loading client chats…
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>
              No client chats yet.
            </div>
          )}

          {filtered.map((client, index) => (
            <div key={client.id} style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 2fr 1fr 0.5fr',
              padding: '20px 40px',
              alignItems: 'center',
              borderBottom: index === filtered.length - 1 ? 'none' : '1px solid #f8f8f8',
              backgroundColor: index % 2 === 1 ? '#fcfcfb' : '#ffffff'
            }}>
              {/* Client Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: colorFor(client.id),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>
                  {initialsOf(client.name)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: '600', color: '#1a1a2e', fontSize: '15px' }}>{client.name}</span>
                </div>
              </div>

              {/* Email */}
              <div style={{ color: '#434347', fontSize: '14px' }}>
                {client.email}
              </div>

              {/* Date */}
              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', fontWeight: '500' }}>
                {formatDate(client.registeredAt)}
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => openTranscript(client.id)}
                  disabled={detailLoading}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    color: 'rgba(0,0,0,0.3)',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}
                >
                  <EyeIcon style={{ width: 18, height: 18 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: 'auto', paddingBottom: '20px' }}>
        <button style={paginationBtnStyle}><ChevronLeftIcon style={{ width: 16, height: 16 }} /></button>
        <button style={{ ...paginationBtnStyle, backgroundColor: '#c9a84c', color: '#ffffff', border: 'none' }}>1</button>
        <button style={paginationBtnStyle}><ChevronRightIcon style={{ width: 16, height: 16 }} /></button>
      </div>

      {/* Modal Overlay */}
      {selectedClient && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          backdropFilter: 'blur(8px)'
        }}>
          {/* Modal Content */}
          <div style={{
            background: '#ffffff',
            width: '700px',
            maxHeight: '90vh',
            borderRadius: '32px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(0,0,0,0.2)'
          }}>
            {/* Modal Header (Legal Consultation Design) */}
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>Full Conversation</h3>
                  {selectedClient.emailVerified && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      border: '1px solid rgba(201, 168, 76, 0.4)',
                      background: 'rgba(201, 168, 76, 0.05)',
                      color: '#c9a84c',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}>
                      Verified
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#48bb78' }}></div>
                  <span style={{ fontSize: '13px', color: 'rgba(0,0,0,0.4)', fontWeight: '500' }}>AI Assistant active</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.3)', display: 'flex' }}>
                   <MoreVerticalIcon style={{ width: 20, height: 20 }} />
                </button>
                <div style={{ width: '1px', height: '24px', backgroundColor: '#f0f0f0' }}></div>
                <button
                  onClick={() => setSelectedClient(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a2e', display: 'flex' }}
                >
                  <XIcon style={{ width: 24, height: 24 }} />
                </button>
              </div>
            </div>

            {/* Conversation Body */}
            <div style={{
              padding: '32px',
              flex: 1,
              overflowY: 'auto',
              backgroundColor: '#fdfdfc',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(0,0,0,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Conversation started with {selectedClient.name}
                </span>
              </div>

              {(!selectedClient.conversation || selectedClient.conversation.messages.length === 0) && (
                <div style={{ textAlign: 'center', color: 'rgba(0,0,0,0.35)', fontSize: '14px' }}>
                  No messages yet.
                </div>
              )}

              {selectedClient.conversation?.messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '8px'
                }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '16px 20px',
                    borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    backgroundColor: msg.role === 'user' ? '#1a1926' : '#ffffff',
                    color: msg.role === 'user' ? '#ffffff' : '#1a1a2e',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    boxShadow: msg.role === 'user' ? '0 4px 15px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.03)',
                    border: msg.role === 'user' ? 'none' : '1px solid #f0f0f0',
                  }}>
                    {msg.role === 'assistant' ? <BotMessage content={msg.content} /> : msg.content}
                  </div>
                  <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', fontWeight: '600', textTransform: 'uppercase', margin: '0 4px' }}>
                    {msg.role === 'user' ? selectedClient.name : 'AI Assistant'} • {formatTime(msg.timestamp)}
                  </span>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '24px 32px', borderTop: '1px solid #f0f0f0', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
               <button
                 onClick={() => setSelectedClient(null)}
                 style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#f5f5f5',
                    color: '#1a1a2e',
                    borderRadius: '16px',
                    border: '1px solid #eeeeee',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s'
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eeeeee'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
               >
                 Close Transcript
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '10px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: '600', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} EUVisaAdvice. All rights reserved.
        </p>
      </footer>

    </div>
  )
}

const paginationBtnStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  fontWeight: '600',
  color: 'rgba(0,0,0,0.5)',
  cursor: 'pointer',
  transition: 'all 0.2s'
}
