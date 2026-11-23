'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { fixBrokenLinks } from '@/lib/fixBrokenLinks'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState('')
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BACKEND}/api/pages/privacy-policy`)
      .then(r => r.json())
      .then(data => {
        setContent(data.content ?? '')
        if (data.updatedAt) setUpdatedAt(new Date(data.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9f9fb' }}>
      <Navbar />

      <main style={{ flex: 1, width: '100%', maxWidth: 860, margin: '0 auto', padding: '60px 24px 80px' }}>
        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            display: 'inline-block', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#c9a84c', marginBottom: 12,
          }}>
            Legal
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1a1a2e', margin: '0 0 12px', lineHeight: 1.2 }}>
            Privacy Policy
          </h1>
          {updatedAt && (
            <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: 14, margin: 0 }}>
              Last updated: {updatedAt}
            </p>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, #c9a84c 0%, transparent 100%)', marginBottom: 40, borderRadius: 2 }} />

        {/* Content */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.06)',
            padding: '40px 48px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(0,0,0,0.3)', fontSize: 15 }}>
              Loading…
            </div>
          ) : content ? (
            <div
              className="policy-content"
              dangerouslySetInnerHTML={{ __html: fixBrokenLinks(content) }}
            />
          ) : (
            <p style={{ color: 'rgba(0,0,0,0.3)', fontSize: 15, textAlign: 'center', padding: '40px 0' }}>
              Privacy Policy content has not been published yet.
            </p>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        .policy-content { font-size: 15px; line-height: 1.75; color: #1a1a2e; }
        .policy-content h1 { font-size: 28px; font-weight: 700; margin: 32px 0 12px; color: #1a1a2e; }
        .policy-content h2 { font-size: 22px; font-weight: 700; margin: 28px 0 10px; color: #1a1a2e; }
        .policy-content h3 { font-size: 18px; font-weight: 600; margin: 22px 0 8px; color: #1a1a2e; }
        .policy-content p { margin: 0 0 14px; }
        .policy-content ul, .policy-content ol { padding-left: 24px; margin: 0 0 14px; }
        .policy-content li { margin-bottom: 6px; }
        .policy-content strong { font-weight: 700; }
        .policy-content em { font-style: italic; }
        .policy-content u { text-decoration: underline; }
        .policy-content s { text-decoration: line-through; }
        .policy-content a { color: #c9a84c; text-decoration: underline; }
        @media (max-width: 600px) {
          .policy-content { font-size: 14px; }
        }
      `}</style>
    </div>
  )
}
