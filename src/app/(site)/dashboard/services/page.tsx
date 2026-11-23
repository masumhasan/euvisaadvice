'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { PlusIcon, TrashIcon } from '@/components/Icons'
import { getAdminToken } from '@/lib/adminAuth'

const WysiwygEditor = dynamic(() => import('@/components/WysiwygEditor'), { ssr: false })

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

interface Service {
  _id: string
  name: string
  slug: string
  content: string
  order: number
  createdAt: string
}

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export default function ServicesManagerPage() {
  const [mounted, setMounted] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // form state
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [order, setOrder] = useState('0')
  const [slugTouched, setSlugTouched] = useState(false)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<{ text: string; ok: boolean } | null>(null)

  useEffect(() => { setMounted(true); fetchServices() }, [])

  async function fetchServices() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BACKEND}/api/admin/services`, {
        headers: { Authorization: `Bearer ${getAdminToken()}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load services')
      setServices(data.services)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  function openAdd() {
    setEditingId(null)
    setName(''); setSlug(''); setContent(''); setOrder('0')
    setSlugTouched(false); setFormError(''); setSaveMsg(null)
    setShowForm(true)
  }

  function openEdit(svc: Service) {
    setEditingId(svc._id)
    setName(svc.name); setSlug(svc.slug); setContent(svc.content); setOrder(String(svc.order))
    setSlugTouched(true); setFormError(''); setSaveMsg(null)
    setShowForm(true)
    setTimeout(() => document.getElementById('svc-form-top')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  function handleNameChange(val: string) {
    setName(val)
    if (!slugTouched) setSlug(slugify(val))
  }

  function resetForm() {
    setShowForm(false); setEditingId(null)
    setName(''); setSlug(''); setContent(''); setOrder('0')
    setFormError(''); setSaveMsg(null)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setFormError(''); setSaveMsg(null)
    const body = { name: name.trim(), slug: slug.trim(), content, order: parseInt(order) || 0 }
    try {
      const url = editingId
        ? `${BACKEND}/api/admin/services/${editingId}`
        : `${BACKEND}/api/admin/services`
      const res = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAdminToken()}` },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')
      setSaveMsg({ text: editingId ? 'Service updated.' : 'Service created.', ok: true })
      await fetchServices()
      if (!editingId) resetForm()
    } catch (e) {
      setFormError((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(svc: Service) {
    if (!confirm(`Delete "${svc.name}"? This cannot be undone.`)) return
    try {
      const res = await fetch(`${BACKEND}/api/admin/services/${svc._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAdminToken()}` },
      })
      if (!res.ok && res.status !== 204) throw new Error('Delete failed')
      setServices(prev => prev.filter(s => s._id !== svc._id))
      if (editingId === svc._id) resetForm()
    } catch (e) {
      alert((e as Error).message)
    }
  }

  if (!mounted) return null

  return (
    <div className="dash-page">
      <style>{`
        .dash-page { flex: 1; padding: 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 28px; }
        .svc-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
        .svc-form-grid { display: grid; grid-template-columns: 1fr 1fr 100px; gap: 16px; }
        .svc-list { display: flex; flex-direction: column; gap: 0; background: #fff; border-radius: 24px; overflow: hidden; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
        .svc-row { display: grid; grid-template-columns: 1fr 180px 60px 100px; align-items: center; padding: 16px 24px; gap: 16px; }
        .svc-row + .svc-row { border-top: 1px solid #f5f5f5; }
        .svc-thead { background: #1a1926; color: #fff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 24px 24px 0 0; }
        .svc-label { font-size: 11.5px; color: rgba(0,0,0,0.35); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; display: block; }
        .svc-input { width: 100%; padding: 11px 14px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.1); font-size: 14px; outline: none; color: #1a1a2e; box-sizing: border-box; font-family: inherit; }
        .svc-input:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.1); }
        .svc-slug-hint { font-size: 11px; color: rgba(0,0,0,0.35); margin-top: 4px; }
        @media (max-width: 768px) {
          .dash-page { padding: 20px 16px; }
          .svc-form-grid { grid-template-columns: 1fr; }
          .svc-row { grid-template-columns: 1fr auto; }
          .svc-row .hide-mobile { display: none; }
        }
      `}</style>

      <div className="svc-header" id="svc-form-top">
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Service Manager</h2>
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14, marginTop: 4 }}>
            Manage services shown in the footer and on individual service pages.
          </p>
        </div>
        <button
          onClick={() => showForm && !editingId ? resetForm() : openAdd()}
          style={{ background: '#1a1926', color: '#fff', border: 'none', padding: '11px 22px', borderRadius: 12, fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}
        >
          <PlusIcon style={{ width: 13, height: 13 }} />
          {showForm && !editingId ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {/* ── Form ── */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', margin: '0 0 20px' }}>
            {editingId ? 'Edit Service' : 'New Service'}
          </h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="svc-form-grid">
              <div>
                <label className="svc-label">Service Name</label>
                <input className="svc-input" value={name} onChange={e => handleNameChange(e.target.value)} placeholder="e.g. Immigration Consulting" required />
              </div>
              <div>
                <label className="svc-label">Slug (URL path)</label>
                <input
                  className="svc-input"
                  value={slug}
                  onChange={e => { setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')); setSlugTouched(true) }}
                  placeholder="immigration-consulting"
                  required
                  pattern="[a-z0-9-]+"
                />
                <div className="svc-slug-hint">Public URL: /{slug || 'your-slug'}</div>
              </div>
              <div>
                <label className="svc-label">Order</label>
                <input className="svc-input" type="number" value={order} onChange={e => setOrder(e.target.value)} placeholder="0" min="0" />
              </div>
            </div>

            <div>
              <label className="svc-label">Page Content</label>
              <WysiwygEditor value={content} onChange={setContent} minHeight={380} />
            </div>

            {formError && (
              <div style={{ padding: '11px 16px', borderRadius: 10, background: '#fff5f5', border: '1px solid #fca5a5', color: '#c53030', fontSize: 13 }}>
                {formError}
              </div>
            )}
            {saveMsg && (
              <div style={{ padding: '11px 16px', borderRadius: 10, background: saveMsg.ok ? '#f0fdf4' : '#fff5f5', border: `1px solid ${saveMsg.ok ? '#86efac' : '#fca5a5'}`, color: saveMsg.ok ? '#15803d' : '#c53030', fontSize: 13 }}>
                {saveMsg.text}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" disabled={saving} style={{ background: saving ? '#d4c07a' : '#c9a84c', color: '#1a1926', border: 'none', padding: '12px 28px', borderRadius: 11, fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving…' : editingId ? 'Update Service' : 'Save Service'}
              </button>
              <button type="button" onClick={resetForm} style={{ background: '#f5f5f5', color: '#666', border: 'none', padding: '12px 20px', borderRadius: 11, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div style={{ padding: '14px 20px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, color: '#ef4444', fontSize: 13 }}>{error}</div>
      )}

      {/* ── Service List ── */}
      <div className="svc-list">
        <div className="svc-row svc-thead">
          <div>Name / Slug</div>
          <div className="hide-mobile">URL</div>
          <div className="hide-mobile">Order</div>
          <div style={{ textAlign: 'right' }}>Actions</div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(0,0,0,0.35)', fontSize: 14 }}>Loading…</div>
        ) : services.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(0,0,0,0.35)', fontSize: 14 }}>
            No services yet. Click <strong>Add Service</strong> to create your first one.
          </div>
        ) : services.map((svc, i) => (
          <div key={svc._id} className="svc-row" style={{ background: i % 2 === 0 ? '#fff' : '#fcfcfb' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 14 }}>{svc.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)', marginTop: 2 }}>/{svc.slug}</div>
            </div>
            <div className="hide-mobile" style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>/{svc.slug}</div>
            <div className="hide-mobile" style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>{svc.order}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
              <button
                onClick={() => openEdit(svc)}
                style={{ background: 'rgba(201,168,76,0.1)', border: 'none', color: '#c9a84c', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(svc)}
                style={{ background: 'none', border: 'none', color: 'rgba(0,0,0,0.25)', cursor: 'pointer', padding: '7px 8px', display: 'flex', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.25)'}
              >
                <TrashIcon style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer style={{ paddingBottom: 10 }}>
        <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.2)', fontWeight: 600, textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} EUVisaAdvice. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
