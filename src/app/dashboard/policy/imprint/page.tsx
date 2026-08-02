'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { getAdminToken } from '@/lib/adminAuth'

const WysiwygEditor = dynamic(() => import('@/components/WysiwygEditor'), { ssr: false })

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

export default function ImprintManagerPage() {
  const [content, setContent] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  useEffect(() => {
    const token = getAdminToken()
    const p1 = fetch(`${BACKEND}/api/admin/pages/imprint`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json())

    const p2 = fetch(`${BACKEND}/api/admin/contact-info`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json())

    Promise.all([p1, p2])
      .then(([pageData, contactData]) => {
        setContent(pageData.content ?? '')
        if (pageData.updatedAt) setLastSaved(new Date(pageData.updatedAt).toLocaleString())
        setAddress(contactData.address ?? '')
        setEmail(contactData.email ?? '')
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaveMsg(null)
    const token = getAdminToken()
    try {
      // Save imprint page contents
      const resPage = await fetch(`${BACKEND}/api/admin/pages/imprint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      })
      const pageData = await resPage.json()
      if (!resPage.ok) throw new Error(pageData.error || 'Failed to save Imprint page contents.')

      // Save contact info
      const resContact = await fetch(`${BACKEND}/api/admin/contact-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address, email }),
      })
      const contactData = await resContact.json()
      if (!resContact.ok) throw new Error(contactData.error || 'Failed to save Contact Info.')

      setLastSaved(new Date(pageData.updatedAt).toLocaleString())
      setSaveMsg({ text: 'Imprint page and footer settings saved successfully.', ok: true })
    } catch (err) {
      setSaveMsg({ text: (err as Error).message, ok: false })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="dash-page">
      <style>{`
        .dash-page { flex: 1; padding: 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; }
        .imprint-section-title { font-size: 14px; font-weight: 700; color: #1a1a2e; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 8px; }
        .card { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 20px rgba(0,0,0,0.02); }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .form-label { font-size: 11.5px; color: rgba(0,0,0,0.45); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
        .form-input { width: 100%; padding: 11px 14px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.1); font-size: 14px; outline: none; color: #1a1a2e; box-sizing: border-box; font-family: inherit; }
        .form-input:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.1); }
        .form-textarea { width: 100%; min-height: 100px; padding: 11px 14px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.1); font-size: 14px; outline: none; color: #1a1a2e; box-sizing: border-box; font-family: inherit; resize: vertical; }
        .form-textarea:focus { border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201,168,76,0.1); }
        @media (max-width: 768px) { .dash-page { padding: 20px 16px; } }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Imprint Management</h2>
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14, marginTop: 4 }}>
            Edit the footer contact info and content displayed on <strong>/imprint</strong>.
            {lastSaved && <span style={{ marginLeft: 8, color: 'rgba(0,0,0,0.3)' }}>Last saved: {lastSaved}</span>}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          style={{
            background: saving ? '#d4c07a' : '#c9a84c',
            color: '#1a1926', border: 'none', padding: '12px 28px',
            borderRadius: 12, fontWeight: 700, fontSize: 14,
            cursor: saving ? 'not-allowed' : 'pointer', flexShrink: 0,
          }}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {saveMsg && (
        <div style={{
          padding: '12px 16px', borderRadius: 10, fontSize: 14,
          background: saveMsg.ok ? '#f0fdf4' : '#fff5f5',
          border: `1px solid ${saveMsg.ok ? '#86efac' : '#fca5a5'}`,
          color: saveMsg.ok ? '#15803d' : '#c53030',
        }}>
          {saveMsg.text}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'rgba(0,0,0,0.3)' }}>Loading…</div>
      ) : (
        <>
          {/* Footer settings card */}
          <div className="card">
            <h3 className="imprint-section-title">Footer settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flexWrap: 'wrap' }}>
              <div className="form-group">
                <label className="form-label">Footer Address</label>
                <textarea
                  className="form-textarea"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="30 N Gould St, Ste N&#10;Sheridan, WY 82801 USA"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Footer Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="supporteuvisa@gmail.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Imprint Page Contents card */}
          <div className="card">
            <h3 className="imprint-section-title">Imprint Page Contents</h3>
            <WysiwygEditor value={content} onChange={setContent} minHeight={400} />
          </div>
        </>
      )}
    </div>
  )
}
