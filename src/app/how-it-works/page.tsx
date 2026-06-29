'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

export default function HowItWorksPage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${BACKEND}/api/pages/how-it-works`)
      .then(r => r.json())
      .then(data => {
        setContent(data.content ?? '')
        setUpdatedAt(data.updatedAt ?? null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#fcfcf9' }}>

        {/* Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1926 0%, #25233a 60%, #1a1926 100%)',
          padding: '120px 20px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(201,168,76,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'rgba(201,168,76,0.04)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 18px', borderRadius: 40, color: '#c9a84c', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              The Process
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.1 }}>
              How It Works
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(15px, 2vw, 18px)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              A simple, guided process to get you the expert advice you need.
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 900, margin: '-60px auto 0', position: 'relative', zIndex: 10, padding: '0 20px 100px', boxSizing: 'border-box' }}>
          <div style={{ background: '#fff', padding: '60px 56px', borderRadius: 32, boxShadow: '0 30px 60px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.02)' }}>

            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[100, 80, 90, 70, 85].map((w, i) => (
                  <div key={i} style={{ height: 16, width: `${w}%`, background: '#f5f5f2', borderRadius: 8, animation: 'pulse 1.5s ease-in-out infinite' }} />
                ))}
              </div>
            )}

            {!loading && !content && (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
                <h2 style={{ color: '#1a1a2e', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Content not published yet</h2>
                <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 15 }}>Check back soon — this page is being set up.</p>
              </div>
            )}

            {!loading && content && (
              <>
                <div
                  className="rich-text-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                  style={{ lineHeight: '1.8', fontSize: '17px', color: '#333', wordBreak: 'break-word', overflowWrap: 'break-word' }}
                />
                {updatedAt && (
                  <p style={{ marginTop: 48, fontSize: 12, color: 'rgba(0,0,0,0.2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Last updated {new Date(updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </>
            )}
          </div>

          {/* CTA */}
          {!loading && (
            <div style={{ marginTop: 40, background: 'linear-gradient(135deg, #1a1926, #25233a)', borderRadius: 28, padding: '48px 40px', textAlign: 'center' }}>
              <h2 style={{ color: '#fff', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
                Ready to get started?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 28, fontSize: 15, maxWidth: 420, margin: '0 auto 28px' }}>
                Our consultants are available to guide you through every step.
              </p>
              <Link href="/legalchat" style={{ display: 'inline-block', background: '#c9a84c', color: '#1a1926', padding: '14px 40px', borderRadius: 50, fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                Start Consultation
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .rich-text-content h1 { font-size: 36px; color: #1a1a2e; margin-bottom: 30px; font-weight: 800; letter-spacing: -0.02em; }
        .rich-text-content h2 { font-size: 26px; color: #1a1a2e; margin-top: 48px; margin-bottom: 18px; font-weight: 700; border-bottom: 2px solid #f8f7f2; padding-bottom: 10px; }
        .rich-text-content h3 { font-size: 20px; color: #1a1a2e; margin-top: 36px; margin-bottom: 14px; font-weight: 700; }
        .rich-text-content p { margin-bottom: 22px; color: #444; }
        .rich-text-content ul, .rich-text-content ol { margin-bottom: 22px; padding-left: 24px; }
        .rich-text-content li { margin-bottom: 10px; color: #444; }
        .rich-text-content blockquote { border-left: 4px solid #c9a84c; padding-left: 24px; font-style: italic; color: #666; margin: 32px 0; }
        .rich-text-content a { color: #c9a84c; font-weight: 700; text-decoration: none; border-bottom: 1px solid rgba(201,168,76,0.3); }
        .rich-text-content a:hover { border-bottom-color: #c9a84c; }
        @media (max-width: 768px) {
          .rich-text-content { font-size: 15px !important; }
          .rich-text-content h1 { font-size: 24px; }
          .rich-text-content h2 { font-size: 20px; }
        }
      `}</style>
    </>
  )
}
