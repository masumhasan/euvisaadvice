'use client'

import { useState, useEffect } from 'react'

import { PlusIcon, TrashIcon } from '@/components/Icons'
import { getAdminToken } from '@/lib/adminAuth'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

// ── Types ───────────────────────────────────────────────────────────────────────

interface Package {
  id: string
  name: string
  price: number
  description: string
  tier: 'silver' | 'gold' | 'platinum'
  createdAt: string
}

const TIER_COLORS: Record<string, string> = { silver: '#9ca3af', gold: '#c9a84c', platinum: '#a78bfa' }

// ── Page Component ──────────────────────────────────────────────────────────────

export default function ChatbotPackagesPage() {
  const [mounted, setMounted] = useState(false)

  // Package Management State
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form State
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [tier, setTier] = useState<'silver' | 'gold' | 'platinum'>('silver')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  useEffect(() => {
    setMounted(true)
    fetchPackages()
  }, [])

  async function fetchPackages() {
    setLoading(true)
    setError(null)
    try {
      const token = getAdminToken()
      const res = await fetch(`${BACKEND}/api/admin/packages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to load packages')
      const data = await res.json()
      setPackages(data.packages)
    } catch {
      setError('Could not load packages. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSavePackage(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    const body = { name, price: parseFloat(price), description, tier }
    const token = getAdminToken()

    try {
      if (editingId) {
        const res = await fetch(`${BACKEND}/api/admin/packages/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to update package')
        const data = await res.json()
        setPackages(packages.map(p => p.id === editingId ? data.package : p))
      } else {
        const res = await fetch(`${BACKEND}/api/admin/packages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error('Failed to create package')
        const data = await res.json()
        setPackages([data.package, ...packages])
      }
      resetForm()
    } catch {
      setFormError('Could not save package. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function resetForm() {
    setName('')
    setPrice('')
    setDescription('')
    setTier('silver')
    setEditingId(null)
    setShowAddForm(false)
    setFormError(null)
  }

  function handleEditClick(pkg: Package) {
    setEditingId(pkg.id)
    setName(pkg.name)
    setPrice(pkg.price.toString())
    setDescription(pkg.description)
    setTier(pkg.tier)
    setShowAddForm(true)
  }

  async function handleStripeSync() {
    setSyncing(true)
    setSyncMsg(null)
    try {
      const res = await fetch(`${BACKEND}/api/admin/stripe/sync`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getAdminToken()}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Sync failed.')
      setSyncMsg({ type: 'ok', text: `✅ Synced ${data.synced} package(s) to Stripe.` })
    } catch (err) {
      setSyncMsg({ type: 'err', text: `❌ ${(err as Error).message}` })
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncMsg(null), 6000)
    }
  }

  async function handleDeletePackage(id: string) {
    if (!confirm('Are you sure you want to delete this package?')) return
    const token = getAdminToken()
    try {
      const res = await fetch(`${BACKEND}/api/admin/packages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to delete package')
      setPackages(packages.filter(p => p.id !== id))
    } catch {
      alert('Could not delete package. Please try again.')
    }
  }

  if (!mounted) return null

  return (
    <div className="dash-page">
      <style>{`
        .dash-page { flex: 1; padding: 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; }
        .pkg-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
        .pkg-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .pkg-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
        @media (max-width: 768px) {
          .dash-page { padding: 20px 16px; gap: 20px; }
          .pkg-form-grid { grid-template-columns: 1fr; gap: 16px; }
          .pkg-cards { grid-template-columns: 1fr; gap: 16px; }
        }
        @media (max-width: 480px) {
          .dash-page { padding: 16px 12px; }
        }
      `}</style>

      {syncMsg && (
        <div style={{ padding: '12px 16px', borderRadius: '10px', background: syncMsg.type === 'ok' ? '#e6f4ea' : '#fef2f2', color: syncMsg.type === 'ok' ? '#1e8e3e' : '#dc2626', fontSize: '14px', fontWeight: 500 }}>
          {syncMsg.text}
        </div>
      )}

      <div className="pkg-header">
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a2e', margin: 0 }}>Manage Packages</h2>
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', marginTop: '4px' }}>Create and update your chatbot pricing tiers.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleStripeSync}
            disabled={syncing}
            style={{
              backgroundColor: '#1a472a', color: '#ffffff', border: 'none',
              padding: '12px 20px', borderRadius: '12px', fontWeight: '600',
              display: 'flex', alignItems: 'center', gap: '8px', cursor: syncing ? 'default' : 'pointer',
              transition: 'all 0.2s ease', fontSize: '12px', whiteSpace: 'nowrap',
              opacity: syncing ? 0.7 : 1,
            }}
          >
            {syncing ? 'Syncing…' : 'Sync to Stripe'}
          </button>
        <button
          onClick={() => {
            if (showAddForm) resetForm()
            else setShowAddForm(true)
          }}
          onMouseEnter={(e) => {
            ; (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2a2936'
              ; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            ; (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1a1926'
              ; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
          }}
          style={{
            backgroundColor: '#1a1926',
            color: '#ffffff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: "12px",
            whiteSpace: 'nowrap',
            width: "auto",
            flexShrink: 0,
          }}
        >
          <PlusIcon style={{ width: "12px", height: "12px" }} />
          {showAddForm ? 'Cancel' : 'Add Package'}
        </button>
        </div>
      </div>

      {showAddForm && (
        <div style={{
          background: '#ffffff',
          padding: '32px',
          borderRadius: '24px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <form onSubmit={handleSavePackage} style={{ display: 'grid', gap: '24px' }}>
            <div className="pkg-form-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11.5px', color: 'rgba(0,0,0,0.35)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Package Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Basic Consultation"
                  required
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '15px', outline: 'none', color: '#000000' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11.5px', color: 'rgba(0,0,0,0.35)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Price (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 49.99"
                  required
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '15px', outline: 'none', color: '#000000' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11.5px', color: 'rgba(0,0,0,0.35)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Subscription Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as 'silver' | 'gold' | 'platinum')}
                required
                style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '15px', outline: 'none', color: '#000000', background: '#fff' }}
              >
                <option value="silver">Silver — up to 3 conversations</option>
                <option value="gold">Gold — up to 10 conversations</option>
                <option value="platinum">Platinum — unlimited + booking</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11.5px', color: 'rgba(0,0,0,0.35)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what's included..."
                rows={4}
                required
                style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', fontSize: '15px', resize: 'none', outline: 'none', color: '#000000' }}
              />
            </div>
            {formError && (
              <div style={{ padding: '12px 16px', background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '10px', color: '#c53030', fontSize: '14px' }}>
                {formError}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: '#c9a84c',
                color: '#1a1926',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Saving...' : (editingId ? 'Update Package' : 'Save Package')}
            </button>
          </form>
        </div>
      )}

      {error && (
        <div style={{ padding: '16px', background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: '12px', color: '#c53030', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(0,0,0,0.3)' }}>Loading packages...</div>
      ) : (
        <div className="pkg-cards">
          {packages.map((pkg) => (
            <div key={pkg.id} style={{
              background: '#ffffff',
              padding: '28px',
              borderRadius: '24px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
              border: '1px solid rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span style={{
                    display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: 1.5,
                    textTransform: 'uppercase', color: TIER_COLORS[pkg.tier] ?? '#9ca3af',
                    background: `${TIER_COLORS[pkg.tier] ?? '#9ca3af'}18`,
                    borderRadius: 6, padding: '2px 8px', marginBottom: 6,
                  }}>
                    {pkg.tier}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>{pkg.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEditClick(pkg)} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', padding: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </button>
                  <button onClick={() => handleDeletePackage(pkg.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                    <TrashIcon style={{ width: "16px" }} />
                  </button>
                </div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '600', color: '#1a1a2e', marginBottom: '12px' }}>
                €{pkg.price}
              </div>
              <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px', lineHeight: '1.6', margin: 0, flex: 1 }}>
                {pkg.description}
              </p>
              <div style={{ marginTop: '24px', fontSize: '10px', color: 'rgba(0,0,0,0.3)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                CREATED ON {new Date(pkg.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer inside content area */}
      <footer style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '10px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: '600', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} EUVisaAdvice. All rights reserved.
        </p>
      </footer>

    </div>
  )
}
