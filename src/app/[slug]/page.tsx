'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DynamicPage() {
  const { slug } = useParams()
  const [pageData, setPageData] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Backend removed: Setting mock page data based on slug
    setPageData({
      title: slug ? String(slug).replace(/-/g, ' ').toUpperCase() : 'Legal Services',
      content_html: '<p>This is a mock page because the backend has been removed. Please set up a Node.js backend to serve actual content.</p>'
    })
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f4ef' }}>
        <div className="loader">Loading...</div>
      </div>
    )
  }

  if (!pageData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f4ef' }}>
        <h1 style={{ color: '#1a1a2e', fontSize: '48px' }}>404</h1>
        <p style={{ color: '#888' }}>Page Not Found</p>
        <button onClick={() => window.location.href = '/'} className="btn-primary" style={{ marginTop: '20px' }}>Back Home</button>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#fcfcf9' }}>
        {/* Banner Section */}
        <div className="dynamic-banner" style={{ 
          height: '400px', 
          background: 'linear-gradient(rgba(26, 26, 46, 0.7), rgba(26, 26, 46, 0.9)), url("/assets/img.jpg") center/cover no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          <div style={{ background: 'rgba(201, 168, 76, 0.2)', padding: '8px 20px', borderRadius: '40px', color: '#c9a84c', fontSize: '14px', fontWeight: '700', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
             Consulting Expertise
          </div>
          <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: '800', letterSpacing: '-0.02em', maxWidth: '800px' }}>
            {pageData.title}
          </h1>
        </div>

        {/* Main Content Area */}
        <div className="dynamic-content-wrap" style={{ maxWidth: '1000px', margin: '-80px auto 0', position: 'relative', zIndex: 10, padding: '0 20px', width: '100%' }}>
          <div className="dynamic-content-card" style={{ background: '#fff', padding: '60px 40px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div 
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: pageData.content_html }} 
              style={{ 
                lineHeight: '1.8', 
                fontSize: '17px', 
                color: '#333',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            />
            
            {/* CTA Box at bottom of content */}
            <div className="content-cta-box" style={{ marginTop: '60px', padding: '40px', background: '#f8f7f2', borderRadius: '24px', border: '1px solid #eee', textAlign: 'center' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a2e', marginBottom: '12px' }}>Need assistance with this?</h3>
              <p style={{ color: '#666', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>Our consultants are ready to guide you through the complexities of German law.</p>
              <button 
                onClick={() => window.location.href = user ? '/legalchat' : '/legaljoin'} 
                className="btn-primary content-cta-btn"
                style={{ padding: '14px 40px' }}
              >
                {user ? 'Get Instant Legal Advice' : 'Start Your Consultation'}
              </button>
            </div>
          </div>
        </div>

        {/* Empty space before footer */}
        <div style={{ height: '100px' }}></div>
      </main>
      
      <Footer />
      
      <style jsx global>{`
        .rich-text-content h1 { font-size: 36px; color: #1a1a2e; margin-bottom: 30px; font-weight: 800; letter-spacing: -0.02em; }
        .rich-text-content h2 { font-size: 28px; color: #1a1a2e; margin-top: 48px; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #f8f7f2; padding-bottom: 10px; }
        .rich-text-content h3 { font-size: 22px; color: #1a1a2e; margin-top: 36px; margin-bottom: 16px; font-weight: 700; }
        .rich-text-content p { margin-bottom: 24px; color: #444; }
        .rich-text-content ul, .rich-text-content ol { margin-bottom: 24px; padding-left: 24px; }
        .rich-text-content li { margin-bottom: 12px; color: #444; }
        .rich-text-content blockquote { border-left: 4px solid #c9a84c; padding-left: 24px; font-style: italic; color: #666; margin: 32px 0; }
        .rich-text-content img { max-width: 100%; height: auto; border-radius: 20px; margin: 40px 0; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .rich-text-content a { color: #c9a84c; font-weight: 700; text-decoration: none; border-bottom: 1px solid rgba(201,168,76,0.3); transition: all 0.2s; }
        .rich-text-content a:hover { border-bottom-color: #c9a84c; background: rgba(201,168,76,0.05); }
        
        @media (max-width: 768px) {
          .rich-text-content { padding: 30px !important; }
          .rich-text-content h1 { font-size: 28px; }
          .rich-text-content h2 { font-size: 22px; }
        }
      `}</style>
    </>
  )
}
