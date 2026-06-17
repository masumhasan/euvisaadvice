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
  const initials = parts.slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('')
  return initials || '?'
}

function formatDate(iso: string | null): string {
  if (!iso) return 'Never'
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export default function ClientsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState<LegalAdviceClient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')

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
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
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
    if (!window.confirm(`Are you sure you want to permanently delete ${client.name}'s account? This cannot be undone.`)) return

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

  const visibleClients = clients.filter((c) =>
    `${c.name} ${c.email}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Page Title & Subtitle */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>All Members</h2>
        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', marginTop: '4px' }}>Users registered on the platform for legal advice via /legalchat</p>
      </div>

      {/* Actions Row */}
      <div style={{
        background: '#ffffff',
        padding: '24px',
        borderRadius: '24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        border: '1px solid rgba(0,0,0,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', width: '340px' }}>
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
        <div style={{ width: '80px', height: '40px', background: '#fdfdfc', borderRadius: '10px', border: '1px solid #f0f0f0' }}></div>
      </div>

      {actionError && (
        <div style={{ color: '#c53030', fontSize: '13px', fontWeight: '600' }}>{actionError}</div>
      )}

      {/* Clients Table */}
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
          gridTemplateColumns: 'minmax(250px, 2.5fr) minmax(200px, 2fr) 1fr 1.2fr 1.2fr 1.2fr 160px',
          background: '#1a1926',
          padding: '18px 32px',
          color: '#ffffff',
          fontWeight: '700',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          <div>CLIENT</div>
          <div>EMAIL</div>
          <div>ROLE</div>
          <div>VERIFICATION</div>
          <div>CONVERSATIONS</div>
          <div>LAST ACTIVE</div>
          <div style={{ textAlign: 'right' }}>ACTION</div>
        </div>

        {/* Table Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>Loading...</div>
          ) : error ? (
            <div style={{ padding: '32px', textAlign: 'center', color: '#c53030', fontSize: '14px' }}>{error}</div>
          ) : visibleClients.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>No registered users found.</div>
          ) : visibleClients.map((client, index) => (
            <div key={client.id} style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(250px, 2.5fr) minmax(200px, 2fr) 1fr 1.2fr 1.2fr 1.2fr 160px',
              padding: '18px 32px',
              alignItems: 'center',
              borderBottom: index === visibleClients.length - 1 ? 'none' : '1px solid #f8f8f8',
              backgroundColor: index % 2 === 1 ? '#fcfcfb' : '#ffffff'
            }}>
              {/* Client Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#c9a84c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '13px'
                }}>
                  {initialsOf(client.name)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: '600', color: '#1a1a2e', fontSize: '15px' }}>{client.name}</span>
                  <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)' }}>{client.email}</span>
                </div>
              </div>

              {/* Email */}
              <div style={{ color: '#434347', fontSize: '14px' }}>
                {client.email}
              </div>

              {/* Role */}
              <div>
                <span style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  ...getRoleStyle(client.role),
                }}>
                  {client.role}
                </span>
              </div>

              {/* Verification */}
              <div>
                <span style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  ...getVerificationStyle(client.emailVerified)
                }}>
                  {client.emailVerified ? 'Verified' : 'Pending'}
                </span>
                {client.banned && (
                  <span style={{
                    marginLeft: '6px',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor: 'rgba(229, 62, 62, 0.1)',
                    color: '#c53030',
                  }}>
                    Banned
                  </span>
                )}
              </div>

              {/* Conversations */}
              <div style={{ color: '#434347', fontSize: '14px', fontWeight: '600' }}>
                {client.conversationCount}
              </div>

              {/* Last Active */}
              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>
                {formatDate(client.lastActive)}
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                <button
                  title="View account"
                  onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                  style={actionBtnStyle}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}
                >
                  <EyeIcon style={{ width: 18, height: 18 }} />
                </button>
                <button
                  title="Edit account"
                  onClick={() => router.push(`/dashboard/clients/${client.id}?edit=1`)}
                  style={actionBtnStyle}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#3182ce'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}
                >
                  <EditIcon style={{ width: 18, height: 18 }} />
                </button>
                <button
                  title={client.banned ? 'Unban account' : 'Ban account'}
                  onClick={() => handleToggleBan(client)}
                  style={actionBtnStyle}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#b7791f'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}
                >
                  <BanIcon style={{ width: 18, height: 18 }} />
                </button>
                <button
                  title="Delete account"
                  onClick={() => handleDelete(client)}
                  style={actionBtnStyle}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c53030'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}
                >
                  <TrashIcon style={{ width: 18, height: 18 }} />
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

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '10px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: '600', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} EUVisaAdvice. All rights reserved.
        </p>
      </footer>

    </div>
  )
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
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '8px',
  color: 'rgba(0,0,0,0.3)',
  transition: 'color 0.2s',
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
