'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

interface Service {
  id: string
  name: string
  slug: string
}

interface ServiceDetail extends Service {
  content: string
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function excerpt(html: string, maxLen = 130): string {
  const text = stripHtml(html)
  return text.length > maxLen ? text.slice(0, maxLen).replace(/\s\S*$/, '') + '…' : text
}

const CARD_ICONS = [
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="4" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  <svg key="5" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /></svg>,
]

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    fetch(`${BACKEND}/api/services`)
      .then(r => r.json())
      .then(async (data) => {
        const list: Service[] = data.services ?? []
        if (list.length === 0) { setEmpty(true); setLoading(false); return }

        const details = await Promise.all(
          list.map(s =>
            fetch(`${BACKEND}/api/services/${s.slug}`)
              .then(r => r.json())
              .then(d => ({ ...s, content: d.content ?? '' }))
              .catch(() => ({ ...s, content: '' }))
          )
        )
        setServices(details)
        setLoading(false)
      })
      .catch(() => { setEmpty(true); setLoading(false) })
  }, [])

  return (
    <>
      <Navbar />

      <main style={{ minHeight: '100vh', background: '#fcfcf9' }}>

        {/* ── Hero Banner ── */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1926 0%, #25233a 60%, #1a1926 100%)',
          padding: '120px 20px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* decorative blobs */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(201,168,76,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'rgba(201,168,76,0.04)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 18px', borderRadius: 40, color: '#c9a84c', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              What We Offer
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.1 }}>
              Our Services
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(15px, 2vw, 18px)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
               Expert consulting services for expats and remote workers in Germany and worldwide
            </p>
            <Link href="/legalchat" style={{ display: 'inline-block', background: '#c9a84c', color: '#1a1926', padding: '14px 36px', borderRadius: 50, fontWeight: 800, fontSize: 15, textDecoration: 'none', letterSpacing: '0.02em' }}>
              Get a Consultation
            </Link>
          </div>
        </div>

        {/* ── Cards Section ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 20px 100px' }}>

          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ background: '#fff', borderRadius: 28, padding: 36, border: '1px solid #f0f0ec', height: 280, animation: 'pulse 1.5s ease-in-out infinite' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#f5f5f2', marginBottom: 24 }} />
                  <div style={{ width: '60%', height: 20, background: '#f5f5f2', borderRadius: 8, marginBottom: 16 }} />
                  <div style={{ width: '100%', height: 12, background: '#f5f5f2', borderRadius: 6, marginBottom: 10 }} />
                  <div style={{ width: '85%', height: 12, background: '#f5f5f2', borderRadius: 6 }} />
                </div>
              ))}
            </div>
          )}

          {!loading && empty && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛠️</div>
              <h2 style={{ color: '#1a1a2e', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Services coming soon</h2>
              <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 16 }}>We&apos;re setting up our service catalogue. Check back shortly.</p>
            </div>
          )}

          {!loading && services.length > 0 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
                {services.map((svc, i) => (
                  <ServiceCard key={svc.id} svc={svc} icon={CARD_ICONS[i % CARD_ICONS.length]} index={i} />
                ))}
              </div>

              {/* Bottom CTA strip */}
              <div style={{ marginTop: 80, background: 'linear-gradient(135deg, #1a1926, #25233a)', borderRadius: 32, padding: '60px 40px', textAlign: 'center' }}>
                <h2 style={{ color: '#fff', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.02em' }}>
                  Not sure which service you need?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 28, fontSize: 16, maxWidth: 480, margin: '0 auto 28px' }}>
                  Talk to one of our consultants — we&apos;ll point you in the right direction.
                </p>
                <Link href="/legalchat" style={{ display: 'inline-block', background: '#c9a84c', color: '#1a1926', padding: '14px 40px', borderRadius: 50, fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                  Start Chat
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  )
}

function ServiceCard({ svc, icon, index }: { svc: ServiceDetail; icon: React.ReactNode; index: number }) {
  const [hovered, setHovered] = useState(false)
  const desc = excerpt(svc.content)
  const hasContent = svc.content.trim().length > 0

  return (
    <Link
      href={`/${svc.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: hovered ? '#1a1926' : '#fff',
        border: `1px solid ${hovered ? 'transparent' : '#f0f0ec'}`,
        borderRadius: 28,
        padding: '36px 32px',
        textDecoration: 'none',
        boxShadow: hovered ? '0 24px 60px rgba(26,25,38,0.18)' : '0 2px 12px rgba(0,0,0,0.03)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        minHeight: 280,
      }}
    >
      {/* Icon badge */}
      <div style={{
        width: 60, height: 60, borderRadius: 18,
        background: hovered ? 'rgba(201,168,76,0.15)' : '#f8f7f2',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#c9a84c',
        marginBottom: 28,
        transition: 'background 0.25s',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Number */}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: hovered ? 'rgba(201,168,76,0.5)' : 'rgba(0,0,0,0.2)', textTransform: 'uppercase', marginBottom: 8 }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Name */}
      <h3 style={{ fontSize: 20, fontWeight: 800, color: hovered ? '#fff' : '#1a1a2e', letterSpacing: '-0.02em', margin: '0 0 14px', lineHeight: 1.25 }}>
        {svc.name}
      </h3>

      {/* Excerpt */}
      <p style={{ fontSize: 14, lineHeight: 1.7, color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)', margin: 0, flex: 1 }}>
        {hasContent ? desc : 'Detailed information about this service will be available soon.'}
      </p>

      {/* Arrow CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 28, color: '#c9a84c', fontWeight: 700, fontSize: 13 }}>
        Learn more
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.2s' }}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </Link>
  )
}
