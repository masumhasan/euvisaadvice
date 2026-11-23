'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

interface ServiceData {
  name: string
  slug: string
  content: string
  updatedAt: string
}

export default function ServicePage() {
  const { slug } = useParams()
  const [service, setService] = useState<ServiceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    fetch(`${BACKEND}/api/services/${slug}`)
      .then(async r => {
        if (r.status === 404) { setNotFound(true); return }
        if (!r.ok) throw new Error('Failed to load')
        const data = await r.json()
        setService(data)
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f4ef' }}>
        <div style={{ color: 'rgba(0,0,0,0.3)', fontSize: 15 }}>Loading…</div>
      </div>
    )
  }

  if (notFound || !service) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f4ef' }}>
        <h1 style={{ color: '#1a1a2e', fontSize: '48px', margin: 0 }}>404</h1>
        <p style={{ color: '#888', marginTop: 12 }}>Page Not Found</p>
        <button onClick={() => window.location.href = '/'} className="btn-primary" style={{ marginTop: '20px' }}>Back Home</button>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#fcfcf9' }}>

        {/* Banner */}
        <div className="dynamic-banner" style={{
          height: '400px',
          background: 'linear-gradient(rgba(26, 26, 46, 0.7), rgba(26, 26, 46, 0.9)), url("/assets/img.jpg") center/cover no-repeat',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center', padding: '0 20px',
        }}>
          <div style={{ background: 'rgba(201, 168, 76, 0.2)', padding: '8px 20px', borderRadius: '40px', color: '#c9a84c', fontSize: '13px', fontWeight: '700', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Consulting Expertise
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '800', letterSpacing: '-0.02em', maxWidth: '800px', margin: 0 }}>
            {service.name}
          </h1>
        </div>

        {/* Content card */}
        <div style={{ maxWidth: '1000px', margin: '-80px auto 0', position: 'relative', zIndex: 10, padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
          <div className="svc-card">
            {service.content ? (
              <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: service.content }}
                style={{ lineHeight: '1.8', fontSize: '17px', color: '#333', wordBreak: 'break-word', overflowWrap: 'break-word' }}
              />
            ) : (
              <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: 15, textAlign: 'center', padding: '40px 0' }}>
                Content for this service has not been published yet.
              </p>
            )}

            {/* CTA */}
            <div className="svc-cta">
              <h3 className="svc-cta-title">Need assistance with this?</h3>
              <p className="svc-cta-desc">
                Our consultants are ready to guide you through the process.
              </p>
              <button
                onClick={() => window.location.href = '/legaljoin'}
                className="btn-primary svc-cta-btn"
              >
                Start Your Consultation
              </button>
            </div>
          </div>
        </div>

        <div style={{ height: '100px' }} />
      </main>

      <Footer />

      <style jsx global>{`
        .svc-card { background: #fff; padding: 60px 48px; border-radius: 32px; box-shadow: 0 30px 60px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.02); overflow: hidden; }
        .svc-cta { margin-top: 60px; padding: 40px; background: #f8f7f2; border-radius: 24px; border: 1px solid #eee; text-align: center; }
        .svc-cta-title { font-size: clamp(18px, 4vw, 24px); font-weight: 800; color: #1a1a2e; margin: 0 0 12px; }
        .svc-cta-desc { color: #666; max-width: 500px; margin: 0 auto 24px; font-size: clamp(14px, 3vw, 16px); }
        .svc-cta-btn { padding: 14px 40px !important; }

        .rich-text-content h1 { font-size: 36px; color: #1a1a2e; margin-bottom: 30px; font-weight: 800; letter-spacing: -0.02em; }
        .rich-text-content h2 { font-size: 28px; color: #1a1a2e; margin-top: 48px; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #f8f7f2; padding-bottom: 10px; }
        .rich-text-content h3 { font-size: 22px; color: #1a1a2e; margin-top: 36px; margin-bottom: 16px; font-weight: 700; }
        .rich-text-content p { margin-bottom: 24px; color: #444; }
        .rich-text-content ul, .rich-text-content ol { margin-bottom: 24px; padding-left: 24px; }
        .rich-text-content li { margin-bottom: 12px; color: #444; }
        .rich-text-content blockquote { border-left: 4px solid #c9a84c; padding-left: 24px; font-style: italic; color: #666; margin: 32px 0; }
        .rich-text-content img { max-width: 100%; height: auto; border-radius: 20px; margin: 40px 0; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .rich-text-content a { color: #c9a84c; font-weight: 700; text-decoration: none; border-bottom: 1px solid rgba(201,168,76,0.3); }
        .rich-text-content a:hover { border-bottom-color: #c9a84c; }

        @media (max-width: 768px) {
          .svc-card { padding: 32px 20px; border-radius: 24px; }
          .svc-cta { padding: 28px 16px; }
          .svc-cta-btn { padding: 13px 28px !important; font-size: 14px !important; }
          .rich-text-content { font-size: 15px !important; }
          .rich-text-content h1 { font-size: 26px; }
          .rich-text-content h2 { font-size: 20px; }
        }
      `}</style>
    </>
  )
}
