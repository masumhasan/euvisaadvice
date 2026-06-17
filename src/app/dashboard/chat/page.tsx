'use client'

import { useState, useEffect } from 'react'

import { PlusIcon, TrashIcon } from '@/components/Icons'

// ── Types ───────────────────────────────────────────────────────────────────────

interface Package {
  id: string
  name: string
  price: number
  description: string
  created_at: string
}

// ── Page Component ──────────────────────────────────────────────────────────────

export default function ChatbotPackagesPage() {
  const [mounted, setMounted] = useState(false)

  // Package Management State
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form State
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchPackages()
  }, [])

  async function fetchPackages() {
    setLoading(true)
    setPackages([]) // Mock empty array
    setLoading(false)
  }

  async function handleSavePackage(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    if (editingId) {
      const newPkg = { id: editingId, name, price: parseFloat(price), description, created_at: new Date().toISOString() }
      setPackages(packages.map(p => p.id === editingId ? newPkg : p))
      resetForm()
    } else {
      const newPkg = { id: Math.random().toString(), name, price: parseFloat(price), description, created_at: new Date().toISOString() }
      setPackages([newPkg, ...packages])
      resetForm()
    }
    setIsSubmitting(false)
  }

  function resetForm() {
    setName('')
    setPrice('')
    setDescription('')
    setEditingId(null)
    setShowAddForm(false)
  }

  function handleEditClick(pkg: Package) {
    setEditingId(pkg.id)
    setName(pkg.name)
    setPrice(pkg.price.toString())
    setDescription(pkg.description)
    setShowAddForm(true)
  }

  async function handleDeletePackage(id: string) {
    if (!confirm('Are you sure you want to delete this package?')) return
    setPackages(packages.filter(p => p.id !== id))
  }

  if (!mounted) return null

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#1a1a2e', margin: 0 }}>Manage Packages</h2>
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', marginTop: '4px' }}>Create and update your chatbot pricing tiers.</p>
        </div>
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

      {showAddForm && (
        <div style={{
          background: '#ffffff',
          padding: '32px',
          borderRadius: '24px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <form onSubmit={handleSavePackage} style={{ display: 'grid', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(0,0,0,0.3)' }}>Loading packages...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
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
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>{pkg.name}</h3>
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
                CREATED ON {new Date(pkg.created_at).toLocaleDateString()}
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
