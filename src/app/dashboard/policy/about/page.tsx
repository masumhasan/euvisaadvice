'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { getAdminToken } from '@/lib/adminAuth'

const WysiwygEditor = dynamic(() => import('@/components/WysiwygEditor'), { ssr: false })

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

export default function AboutUsManagerPage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${BACKEND}/api/admin/pages/about-us`, {
      headers: { Authorization: `Bearer ${getAdminToken()}` },
    })
      .then(r => r.json())
      .then(data => {
        setContent(data.content ?? '')
        if (data.updatedAt) setLastSaved(new Date(data.updatedAt).toLocaleString())
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaveMsg(null)
    try {
      const res = await fetch(`${BACKEND}/api/admin/pages/about-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({ content }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')
      setLastSaved(new Date(data.updatedAt).toLocaleString())
      setSaveMsg({ text: 'About Us page saved successfully.', ok: true })
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
        @media (max-width: 768px) { .dash-page { padding: 20px 16px; } }
        @media (max-width: 480px) { .dash-page { padding: 16px 12px; } }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>About Us Manager</h2>
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14, marginTop: 4 }}>
            Edit the content displayed on <strong>/about-us</strong>.
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
        <WysiwygEditor value={content} onChange={setContent} minHeight={500} />
      )}
    </div>
  )
}
