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

function BotMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p style={{ margin: '0 0 10px', lineHeight: 1.65, color: '#1a1a2e' }}>{children}</p>,
        strong: ({ children }) => <strong style={{ fontWeight: 700, color: '#1a1a2e' }}>{children}</strong>,
        em: ({ children }) => <em style={{ fontStyle: 'italic', color: '#444' }}>{children}</em>,
        h1: ({ children }) => <h1 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', margin: '14px 0 6px' }}>{children}</h1>,
        h2: ({ children }) => <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', margin: '12px 0 6px' }}>{children}</h2>,
        h3: ({ children }) => <h3 style={{ fontSize: 13, fontWeight: 700, color: '#c9a84c', margin: '10px 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{children}</h3>,
        ul: ({ children }) => <ul style={{ margin: '6px 0 10px', paddingLeft: 20, listStyleType: 'disc', color: '#1a1a2e' }}>{children}</ul>,
        ol: ({ children }) => <ol style={{ margin: '6px 0 10px', paddingLeft: 20, color: '#1a1a2e' }}>{children}</ol>,
        li: ({ children }) => <li style={{ marginBottom: 4, lineHeight: 1.6 }}>{children}</li>,
        code: ({ children, className }) => {
          const isBlock = className?.startsWith('language-')
          if (isBlock) return <pre style={{ background: '#f4f3ef', borderRadius: 8, padding: '12px 14px', overflowX: 'auto', margin: '8px 0' }}><code style={{ fontFamily: 'monospace', fontSize: 13, color: '#1a1a2e' }}>{children}</code></pre>
          return <code style={{ background: '#f4f3ef', borderRadius: 4, padding: '2px 6px', fontFamily: 'monospace', fontSize: 13, color: '#c9a84c' }}>{children}</code>
        },
        hr: () => <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '12px 0' }} />,
        blockquote: ({ children }) => <blockquote style={{ borderLeft: '3px solid #c9a84c', paddingLeft: 12, margin: '8px 0', color: '#666', fontStyle: 'italic' }}>{children}</blockquote>,
        a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#c9a84c', textDecoration: 'underline' }}>{children}</a>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

const PAGE_SIZE = 10

export default function InboxPage() {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState<ClientChatSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedClient, setSelectedClient] = useState<ClientChatDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [page, setPage] = useState(1)

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const visibleClients = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function goToPage(p: number) {
    setPage(Math.max(1, Math.min(p, totalPages)))
  }

  function buildPageNumbers(): (number | '...')[] {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '...')[] = [1]
    if (safePage > 3) pages.push('...')
    const start = Math.max(2, safePage - 1)
    const end = Math.min(totalPages - 1, safePage + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (safePage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }

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
    <div className="dash-page">
      <style>{`
        .dash-page { flex: 1; padding: 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; }
        .dash-search-box { background: #fff; padding: 20px 24px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.03); }
        .dash-search-wrap { position: relative; max-width: 360px; }
        .dash-search-wrap input { width: 100%; height: 44px; background: #fff; border: 1px solid #f0f0f0; border-radius: 12px; padding: 0 16px 0 44px; font-size: 14px; outline: none; color: #000; box-sizing: border-box; }
        .dash-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: rgba(0,0,0,0.3); display: flex; pointer-events: none; }

        /* Desktop table */
        .inbox-table { background: #fff; border-radius: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); overflow: hidden; }
        .inbox-thead { display: grid; grid-template-columns: 1.8fr 2fr 1fr 52px; background: #1a1926; padding: 16px 28px; color: #fff; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; }
        .inbox-row { display: grid; grid-template-columns: 1.8fr 2fr 1fr 52px; padding: 18px 28px; align-items: center; }
        .inbox-row + .inbox-row { border-top: 1px solid #f8f8f8; }

        /* Mobile cards */
        .inbox-cards { display: none; flex-direction: column; gap: 10px; }
        .inbox-card { background: #fff; border-radius: 16px; padding: 14px 16px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 2px 8px rgba(0,0,0,0.03); display: flex; align-items: center; gap: 12px; }
        .inbox-card-info { flex: 1; min-width: 0; }
        .inbox-card-name { font-weight: 600; color: #1a1a2e; font-size: 15px; }
        .inbox-card-email { font-size: 12px; color: rgba(0,0,0,0.4); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .inbox-card-date { font-size: 11px; color: rgba(0,0,0,0.35); white-space: nowrap; }

        /* Modal */
        .inbox-modal-box { background: #fff; width: 700px; max-width: calc(100vw - 32px); max-height: 90vh; border-radius: 32px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 80px rgba(0,0,0,0.2); }

        @media (max-width: 768px) {
          .dash-page { padding: 20px 16px; gap: 20px; }
          .dash-search-box { padding: 14px 16px; }
          .dash-search-wrap { max-width: 100%; }
          .inbox-table { display: none; }
          .inbox-cards { display: flex; }
          .inbox-modal-box { border-radius: 20px; }
        }
        @media (max-width: 480px) {
          .dash-page { padding: 16px 12px; }
          .inbox-modal-box { width: 100%; max-width: 100%; max-height: 100vh; border-radius: 0; }
        }
      `}</style>

      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Client Chats</h2>
        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14, marginTop: 4 }}>Manage Clients</p>
      </div>

      <div className="dash-search-box">
        <div className="dash-search-wrap">
          <div className="dash-search-icon"><SearchIcon style={{ width: 18, height: 18 }} /></div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div style={{ padding: '14px 20px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, color: '#ef4444', fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* ── Desktop Table ── */}
      <div className="inbox-table">
        <div className="inbox-thead">
          <div>CLIENT DETAILS</div>
          <div>EMAIL</div>
          <div>REGISTERED</div>
          <div style={{ textAlign: 'right' }}>VIEW</div>
        </div>
        <div>
          {loading && <div style={{ padding: 40, textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>Loading client chats…</div>}
          {!loading && filtered.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>No client chats yet.</div>}
          {visibleClients.map((client, index) => (
            <div key={client.id} className="inbox-row" style={{ backgroundColor: index % 2 === 1 ? '#fcfcfb' : '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: colorFor(client.id), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                  {initialsOf(client.name)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.name}</div>
                </div>
              </div>
              <div style={{ color: '#434347', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.email}</div>
              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: 13, fontWeight: 500 }}>{formatDate(client.registeredAt)}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => openTranscript(client.id)} disabled={detailLoading}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'rgba(0,0,0,0.3)' }}
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

      {/* ── Mobile Cards ── */}
      <div className="inbox-cards">
        {loading && <div style={{ padding: 32, textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>Loading…</div>}
        {!loading && filtered.length === 0 && <div style={{ padding: 32, textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>No client chats yet.</div>}
        {visibleClients.map((client) => (
          <div key={client.id} className="inbox-card">
            <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: colorFor(client.id), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
              {initialsOf(client.name)}
            </div>
            <div className="inbox-card-info">
              <div className="inbox-card-name">{client.name}</div>
              <div className="inbox-card-email">{client.email}</div>
              <div className="inbox-card-date">{formatDate(client.registeredAt)}</div>
            </div>
            <button onClick={() => openTranscript(client.id)} disabled={detailLoading}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'rgba(0,0,0,0.3)', flexShrink: 0 }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}
            >
              <EyeIcon style={{ width: 22, height: 22 }} />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!loading && !error && filtered.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              style={{ ...paginationBtnStyle, opacity: safePage === 1 ? 0.35 : 1, cursor: safePage === 1 ? 'default' : 'pointer' }}
            >
              <ChevronLeftIcon style={{ width: 16, height: 16 }} />
            </button>

            {buildPageNumbers().map((p, i) =>
              p === '...'
                ? <span key={`ellipsis-${i}`} style={{ padding: '0 4px', color: 'rgba(0,0,0,0.3)', fontSize: 13 }}>…</span>
                : <button
                    key={p}
                    onClick={() => goToPage(p as number)}
                    style={{
                      ...paginationBtnStyle,
                      ...(p === safePage ? { backgroundColor: '#c9a84c', color: '#fff', border: 'none' } : {}),
                    }}
                  >
                    {p}
                  </button>
            )}

            <button
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              style={{ ...paginationBtnStyle, opacity: safePage === totalPages ? 0.35 : 1, cursor: safePage === totalPages ? 'default' : 'pointer' }}
            >
              <ChevronRightIcon style={{ width: 16, height: 16 }} />
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)', margin: 0 }}>
            Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} clients
          </p>
        </div>
      )}

      {/* ── Transcript Modal ── */}
      {selectedClient && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(8px)', padding: '16px', boxSizing: 'border-box' }}>
          <div className="inbox-modal-box">
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', flexShrink: 0 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', margin: 0 }}>Full Conversation</h3>
                  {selectedClient.emailVerified && (
                    <span style={{ padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.05)', color: '#c9a84c', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Verified</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#48bb78' }}></div>
                  <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>AI Assistant active — {selectedClient.name}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.3)', display: 'flex' }}><MoreVerticalIcon style={{ width: 20, height: 20 }} /></button>
                <div style={{ width: 1, height: 24, backgroundColor: '#f0f0f0' }}></div>
                <button onClick={() => setSelectedClient(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a2e', display: 'flex' }}><XIcon style={{ width: 24, height: 24 }} /></button>
              </div>
            </div>

            {/* Conversation Body */}
            <div style={{ padding: '24px', flex: 1, overflowY: 'auto', backgroundColor: '#fdfdfc', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Conversation with {selectedClient.name}
                </span>
              </div>
              {(!selectedClient.conversation || selectedClient.conversation.messages.length === 0) && (
                <div style={{ textAlign: 'center', color: 'rgba(0,0,0,0.35)', fontSize: 14 }}>No messages yet.</div>
              )}
              {selectedClient.conversation?.messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 6 }}>
                  <div style={{ maxWidth: '82%', padding: '14px 18px', borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px', backgroundColor: msg.role === 'user' ? '#1a1926' : '#fff', color: msg.role === 'user' ? '#fff' : '#1a1a2e', fontSize: 14, lineHeight: 1.6, boxShadow: msg.role === 'user' ? '0 4px 15px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.03)', border: msg.role === 'user' ? 'none' : '1px solid #f0f0f0' }}>
                    {msg.role === 'assistant' ? <BotMessage content={msg.content} /> : msg.content}
                  </div>
                  <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.3)', fontWeight: 600, textTransform: 'uppercase', margin: '0 4px' }}>
                    {msg.role === 'user' ? selectedClient.name : 'AI Assistant'} • {formatTime(msg.timestamp)}
                  </span>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fff', flexShrink: 0 }}>
              <button onClick={() => setSelectedClient(null)} style={{ width: '100%', padding: '13px', backgroundColor: '#f5f5f5', color: '#1a1a2e', borderRadius: 14, border: '1px solid #eee', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eeeeee'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              >
                Close Transcript
              </button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ paddingBottom: 10 }}>
        <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.2)', fontWeight: 600, textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} EUVisaAdvice. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

const paginationBtnStyle: React.CSSProperties = {
  width: 36, height: 36, borderRadius: 8, border: '1px solid #f0f0f0',
  backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.5)', cursor: 'pointer',
}
