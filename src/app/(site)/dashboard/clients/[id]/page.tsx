'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeftIcon, BanIcon, TrashIcon } from '@/components/Icons'
import { getAdminToken } from '@/lib/adminAuth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

type ClientDetail = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  banned: boolean
  conversationCount: number
  lastActive: string | null
  registeredAt: string
  phone?: string
  country?: string
  city?: string
  bio?: string
}

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  bio: string
}

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/)
  return { firstName: parts[0] ?? '', lastName: parts.slice(1).join(' ') }
}

function formatDateTime(iso: string | null): string {
  if (!iso) return 'Never'
  return new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function ClientDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const clientId = params.id

  const [mounted, setMounted] = useState(false)
  const [client, setClient] = useState<ClientDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(searchParams.get('edit') === '1')
  const [form, setForm] = useState<FormState | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    setMounted(true)

    const token = getAdminToken()
    fetch(`${BACKEND}/api/admin/legal-advice-clients/${clientId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load client')
        const data = await res.json()
        setClient(data.client)
        const { firstName, lastName } = splitName(data.client.name)
        setForm({
          firstName,
          lastName,
          email: data.client.email,
          phone: data.client.phone ?? '',
          country: data.client.country ?? '',
          city: data.client.city ?? '',
          bio: data.client.bio ?? '',
        })
      })
      .catch(() => setError('Could not load this client. They may have been deleted.'))
      .finally(() => setLoading(false))
  }, [clientId])

  async function handleSave() {
    if (!form) return
    setSaving(true)
    setSaveError('')
    const token = getAdminToken()
    try {
      const res = await fetch(`${BACKEND}/api/admin/legal-advice-clients/${clientId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to save changes')
      setClient(data.client)
      setEditing(false)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  async function handleToggleBan() {
    if (!client) return
    const action = client.banned ? 'unban' : 'ban'
    if (!window.confirm(`Are you sure you want to ${action} ${client.name}?`)) return

    const token = getAdminToken()
    try {
      const res = await fetch(`${BACKEND}/api/admin/legal-advice-clients/${clientId}/ban`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ banned: !client.banned }),
      })
      if (!res.ok) throw new Error('Failed to update ban status')
      const data = await res.json()
      setClient(data.client)
    } catch {
      setSaveError(`Could not ${action} this user. Please try again.`)
    }
  }

  async function handleDelete() {
    if (!client) return
    if (!window.confirm(`Are you sure you want to permanently delete ${client.name}'s account? This cannot be undone.`)) return

    const token = getAdminToken()
    try {
      const res = await fetch(`${BACKEND}/api/admin/legal-advice-clients/${clientId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete user')
      router.push('/dashboard/clients')
    } catch {
      setSaveError('Could not delete this user. Please try again.')
    }
  }

  if (!mounted) return null

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

      <button
        onClick={() => router.push('/dashboard/clients')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.5)', fontSize: '14px', fontWeight: '600', padding: 0, width: 'fit-content' }}
      >
        <ChevronLeftIcon style={{ width: 16, height: 16 }} />
        Back to clients
      </button>

      {loading ? (
        <div style={{ padding: '32px', textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>Loading...</div>
      ) : error || !client || !form ? (
        <div style={{ padding: '32px', textAlign: 'center', color: '#c53030', fontSize: '14px' }}>{error || 'Client not found.'}</div>
      ) : (
        <div style={{
          background: '#ffffff',
          borderRadius: '32px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.02)',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          maxWidth: '720px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>{client.name}</h2>
              <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', marginTop: '4px' }}>
                Registered {formatDateTime(client.registeredAt)} · {client.conversationCount} conversation{client.conversationCount === 1 ? '' : 's'} · Last active {formatDateTime(client.lastActive)}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', ...(client.emailVerified ? { backgroundColor: 'rgba(72, 187, 120, 0.1)', color: '#2f855a' } : { backgroundColor: 'rgba(236, 201, 75, 0.14)', color: '#b7791f' }) }}>
                  {client.emailVerified ? 'Verified' : 'Pending'}
                </span>
                {client.banned && (
                  <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', backgroundColor: 'rgba(229, 62, 62, 0.1)', color: '#c53030' }}>
                    Banned
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleToggleBan}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', border: '1px solid #f0f0f0', background: '#fdfdfc', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#b7791f' }}
              >
                <BanIcon style={{ width: 16, height: 16 }} />
                {client.banned ? 'Unban' : 'Ban'}
              </button>
              <button
                onClick={handleDelete}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', border: '1px solid #f0f0f0', background: '#fdfdfc', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#c53030' }}
              >
                <TrashIcon style={{ width: 16, height: 16 }} />
                Delete
              </button>
            </div>
          </div>

          {saveError && <div style={{ color: '#c53030', fontSize: '13px', fontWeight: '600' }}>{saveError}</div>}

          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="First name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
                <Field label="Last name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
              </div>
              <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Field label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
              </div>
              <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
              <Field label="Bio" value={form.bio} onChange={(v) => setForm({ ...form, bio: v })} multiline />

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', background: '#c9a84c', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}
                >
                  {saving ? 'Saving...' : 'Save changes'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid #f0f0f0', background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: 'rgba(0,0,0,0.6)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Detail label="Email" value={client.email} />
              <Detail label="Phone" value={client.phone || '—'} />
              <Detail label="Country" value={client.country || '—'} />
              <Detail label="City" value={client.city || '—'} />
              <Detail label="Bio" value={client.bio || '—'} />

              <button
                onClick={() => setEditing(true)}
                style={{ marginTop: '8px', padding: '12px 24px', borderRadius: '10px', border: 'none', background: '#c9a84c', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '700', width: 'fit-content' }}
              >
                Edit profile
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #f0f0f0', fontSize: '14px', color: '#1a1a2e', resize: 'vertical', fontFamily: 'inherit' }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #f0f0f0', fontSize: '14px', color: '#1a1a2e' }}
        />
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ fontSize: '15px', color: '#1a1a2e' }}>{value}</span>
    </div>
  )
}
