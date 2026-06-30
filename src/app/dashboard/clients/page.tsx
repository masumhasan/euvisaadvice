'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon, EyeIcon, EditIcon, BanIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'
import { getAdminToken } from '@/lib/adminAuth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

type LegalAdviceClient = {
  id: string
  name: string
  email: string
  role: 'user' | 'client'
  emailVerified: boolean
  banned: boolean
  conversationCount: number
  lastActive: string | null
  registeredAt: string
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/)
  return parts.slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('') || '?'
}

function formatDate(iso: string | null): string {
  if (!iso) return 'Never'
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function getRoleStyle(role: 'user' | 'client') {
  return role === 'client'
    ? { backgroundColor: 'rgba(159, 122, 234, 0.12)', color: '#6b46c1' }
    : { backgroundColor: 'rgba(66, 153, 225, 0.12)', color: '#2b6cb0' }
}

function getVerificationStyle(verified: boolean) {
  return verified
    ? { backgroundColor: 'rgba(72, 187, 120, 0.1)', color: '#2f855a' }
    : { backgroundColor: 'rgba(236, 201, 75, 0.14)', color: '#b7791f' }
}

const actionBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  padding: '8px', color: 'rgba(0,0,0,0.3)', transition: 'color 0.2s',
}

const badgeStyle: React.CSSProperties = {
  padding: '4px 10px', borderRadius: '20px',
  fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap',
}

const PAGE_SIZE = 10

export default function ClientsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState<LegalAdviceClient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setMounted(true)
    const token = getAdminToken()
    fetch(`${BACKEND}/api/admin/legal-advice-clients`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load clients')
        const data = await res.json()
        setClients(data.clients)
      })
      .catch(() => setError('Could not load registered users. Please try again later.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleToggleBan(client: LegalAdviceClient) {
    const action = client.banned ? 'unban' : 'ban'
    if (!window.confirm(`Are you sure you want to ${action} ${client.name}?`)) return
    setActionError('')
    const token = getAdminToken()
    try {
      const res = await fetch(`${BACKEND}/api/admin/legal-advice-clients/${client.id}/ban`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ banned: !client.banned }),
      })
      if (!res.ok) throw new Error('Failed to update ban status')
      const data = await res.json()
      setClients((prev) => prev.map((c) => (c.id === client.id ? { ...c, banned: data.client.banned } : c)))
    } catch {
      setActionError(`Could not ${action} this user. Please try again.`)
    }
  }

  async function handleDelete(client: LegalAdviceClient) {
    if (!window.confirm(`Permanently delete ${client.name}'s account? This cannot be undone.`)) return
    setActionError('')
    const token = getAdminToken()
    try {
      const res = await fetch(`${BACKEND}/api/admin/legal-advice-clients/${client.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete user')
      setClients((prev) => prev.filter((c) => c.id !== client.id))
    } catch {
      setActionError('Could not delete this user. Please try again.')
    }
  }

  if (!mounted) return null

  const filteredClients = clients.filter((c) =>
    `${c.name} ${c.email}`.toLowerCase().includes(search.toLowerCase()),
  )
  const totalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const visibleClients = filteredClients.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function goToPage(p: number) {
    setPage(Math.max(1, Math.min(p, totalPages)))
  }

  // Build page number list (max 5 visible, with ellipsis logic)
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

  return (
    <div className="dash-page">
      <style>{`
        .dash-page { flex: 1; padding: 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; }
        .dash-search-row { background: #fff; padding: 20px 24px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.03); display: flex; align-items: center; gap: 12px; }
        .dash-search-wrap { position: relative; flex: 1; }
        .dash-search-wrap input { width: 100%; height: 44px; background: #fff; border: 1px solid #f0f0f0; border-radius: 12px; padding: 0 16px 0 44px; font-size: 14px; outline: none; color: #000; box-sizing: border-box; }
        .dash-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: rgba(0,0,0,0.3); display: flex; }

        /* Desktop table */
        .members-table { background: #fff; border-radius: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); overflow: hidden; }
        .members-thead { display: grid; grid-template-columns: minmax(160px,2fr) minmax(130px,1.5fr) 70px 80px 80px 80px 120px; background: #1a1926; padding: 16px 24px; color: #fff; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; }
        .members-row { display: grid; grid-template-columns: minmax(160px,2fr) minmax(130px,1.5fr) 70px 80px 80px 80px 120px; padding: 16px 24px; align-items: center; }
        .members-row-even { background: #fff; }
        .members-row-odd { background: #fcfcfb; }
        .members-row + .members-row { border-top: 1px solid #f8f8f8; }
        .members-actions { display: flex; justify-content: flex-end; gap: 2px; }

        /* Mobile cards */
        .members-cards { display: none; flex-direction: column; gap: 12px; }
        .member-card { background: #fff; border-radius: 16px; padding: 16px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
        .member-card-top { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .member-card-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
        .member-card-meta { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: rgba(0,0,0,0.4); }
        .member-card-actions { display: flex; gap: 4px; }

        @media (max-width: 768px) {
          .dash-page { padding: 20px 16px; gap: 20px; }
          .members-table { display: none; }
          .members-cards { display: flex; }
          .dash-search-row { padding: 14px 16px; }
        }
        @media (max-width: 480px) {
          .dash-page { padding: 16px 12px; }
        }
      `}</style>

      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>All Members</h2>
        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14, marginTop: 4 }}>Users registered on the platform for legal advice via /legalchat</p>
      </div>

      <div className="dash-search-row">
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

      {actionError && (
        <div style={{ color: '#c53030', fontSize: 13, fontWeight: 600 }}>{actionError}</div>
      )}

      {/* ── Desktop Table ── */}
      <div className="members-table">
        <div className="members-thead">
          <div>CLIENT</div>
          <div>EMAIL</div>
          <div>ROLE</div>
          <div>VERIFY</div>
          <div>CHATS</div>
          <div>ACTIVE</div>
          <div style={{ textAlign: 'right' }}>ACTION</div>
        </div>
        <div>
          {loading ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>Loading...</div>
          ) : error ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#c53030', fontSize: 14 }}>{error}</div>
          ) : visibleClients.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>No registered users found.</div>
          ) : visibleClients.map((client, index) => (
            <div key={client.id} className={`members-row ${index % 2 === 0 ? 'members-row-even' : 'members-row-odd'}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                  {initialsOf(client.name)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.email}</div>
                </div>
              </div>
              <div style={{ color: '#434347', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.email}</div>
              <div><span style={{ ...badgeStyle, ...getRoleStyle(client.role) }}>{client.role}</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ ...badgeStyle, ...getVerificationStyle(client.emailVerified) }}>{client.emailVerified ? 'Verified' : 'Pending'}</span>
                {client.banned && <span style={{ ...badgeStyle, backgroundColor: 'rgba(229,62,62,0.1)', color: '#c53030' }}>Banned</span>}
              </div>
              <div style={{ color: '#434347', fontSize: 14, fontWeight: 600 }}>{client.conversationCount}</div>
              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: 13 }}>{formatDate(client.lastActive)}</div>
              <div className="members-actions">
                <button title="View" onClick={() => router.push(`/dashboard/clients/${client.id}`)} style={actionBtnStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}><EyeIcon style={{ width: 16, height: 16 }} /></button>
                <button title="Edit" onClick={() => router.push(`/dashboard/clients/${client.id}?edit=1`)} style={actionBtnStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#3182ce'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}><EditIcon style={{ width: 16, height: 16 }} /></button>
                <button title={client.banned ? 'Unban' : 'Ban'} onClick={() => handleToggleBan(client)} style={actionBtnStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#b7791f'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}><BanIcon style={{ width: 16, height: 16 }} /></button>
                <button title="Delete" onClick={() => handleDelete(client)} style={actionBtnStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#c53030'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}><TrashIcon style={{ width: 16, height: 16 }} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="members-cards">
        {loading ? (
          <div style={{ textAlign: 'center', padding: 32, color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: 32, color: '#c53030', fontSize: 14 }}>{error}</div>
        ) : visibleClients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 32, color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>No registered users found.</div>
        ) : visibleClients.map((client) => (
          <div key={client.id} className="member-card">
            <div className="member-card-top">
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                {initialsOf(client.name)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 15 }}>{client.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.email}</div>
              </div>
              <div className="member-card-actions">
                <button title="View" onClick={() => router.push(`/dashboard/clients/${client.id}`)} style={actionBtnStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}><EyeIcon style={{ width: 18, height: 18 }} /></button>
                <button title="Edit" onClick={() => router.push(`/dashboard/clients/${client.id}?edit=1`)} style={actionBtnStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#3182ce'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}><EditIcon style={{ width: 18, height: 18 }} /></button>
                <button title={client.banned ? 'Unban' : 'Ban'} onClick={() => handleToggleBan(client)} style={actionBtnStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#b7791f'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}><BanIcon style={{ width: 18, height: 18 }} /></button>
                <button title="Delete" onClick={() => handleDelete(client)} style={actionBtnStyle} onMouseEnter={(e) => e.currentTarget.style.color = '#c53030'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}><TrashIcon style={{ width: 18, height: 18 }} /></button>
              </div>
            </div>
            <div className="member-card-badges">
              <span style={{ ...badgeStyle, ...getRoleStyle(client.role) }}>{client.role}</span>
              <span style={{ ...badgeStyle, ...getVerificationStyle(client.emailVerified) }}>{client.emailVerified ? 'Verified' : 'Pending'}</span>
              {client.banned && <span style={{ ...badgeStyle, backgroundColor: 'rgba(229,62,62,0.1)', color: '#c53030' }}>Banned</span>}
            </div>
            <div className="member-card-meta">
              <span>{client.conversationCount} conversation{client.conversationCount !== 1 ? 's' : ''}</span>
              <span>Active: {formatDate(client.lastActive)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!loading && !error && filteredClients.length > 0 && (
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
            Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filteredClients.length)} of {filteredClients.length} members
          </p>
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
