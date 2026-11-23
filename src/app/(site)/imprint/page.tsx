'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MapPinIcon, MailIcon } from '@/components/Icons'
import { fixBrokenLinks } from '@/lib/fixBrokenLinks'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

export default function ImprintPage() {
  const [content, setContent] = useState('')
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [contactInfo, setContactInfo] = useState({
    address: '30 N Gould St, Ste N\nSheridan, WY 82801 USA',
    email: 'supporteuvisa@gmail.com',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const p1 = fetch(`${BACKEND}/api/pages/imprint`).then(r => r.json())
    const p2 = fetch(`${BACKEND}/api/pages/contact-info`).then(r => r.json())

    Promise.all([p1, p2])
      .then(([pageData, contactData]) => {
        setContent(pageData.content ?? '')
        if (pageData.updatedAt) {
          setUpdatedAt(new Date(pageData.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }))
        }
        if (contactData && contactData.address && contactData.email) {
          setContactInfo({ address: contactData.address, email: contactData.email })
        }
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fc' }}>
      <Navbar />

      <main className="imprint-main">
        {/* Header Section */}
        <div className="imprint-header">
          <div className="imprint-badge">Legal Information</div>
          <h1 className="imprint-title">Imprint</h1>
          {updatedAt && <p className="imprint-update-date">Last updated: {updatedAt}</p>}
        </div>

        <div className="imprint-divider" />

        {/* Content Layout Grid */}
        <div className="imprint-grid">
          {/* Main Content Area */}
          <div className="imprint-content-card">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(0,0,0,0.3)', fontSize: 15 }}>
                Loading Imprint…
              </div>
            ) : content ? (
              <div className="page-content" dangerouslySetInnerHTML={{ __html: fixBrokenLinks(content) }} />
            ) : (
              <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 15, textAlign: 'center', padding: '40px 0', margin: 0 }}>
                Imprint content has not been published yet.
              </p>
            )}
          </div>

          {/* Sidebar Contact Info Card */}
          <div className="imprint-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Official Representatives</h3>
              
              {/* Address Row */}
              <div className="contact-row">
                <div className="contact-icon-wrapper">
                  <MapPinIcon style={{ width: 20, height: 20, color: '#c9a84c' }} />
                </div>
                <div className="contact-detail">
                  <span className="contact-label">Postal Address</span>
                  <span className="contact-value" style={{ whiteSpace: 'pre-wrap' }}>
                    {contactInfo.address}
                  </span>
                </div>
              </div>

              {/* Email Row */}
              <div className="contact-row">
                <div className="contact-icon-wrapper">
                  <MailIcon style={{ width: 20, height: 20, color: '#c9a84c' }} />
                </div>
                <div className="contact-detail">
                  <span className="contact-label">E-Mail Address</span>
                  <a href={`mailto:${contactInfo.email}`} className="contact-value email-link">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .imprint-main {
          flex: 1;
          width: 100%;
          max-w: 1200px;
          margin: 0 auto;
          padding: 60px 24px 80px;
          box-sizing: border-box;
        }
        .imprint-header {
          margin-bottom: 32px;
        }
        .imprint-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 12px;
          background: rgba(201, 168, 76, 0.08);
          padding: 4px 12px;
          border-radius: 6px;
        }
        .imprint-title {
          font-size: 40px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 0 0 10px;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }
        .imprint-update-date {
          color: rgba(26, 26, 46, 0.45);
          font-size: 14px;
          margin: 0;
        }
        .imprint-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.3) 0%, rgba(201,168,76,0.05) 100%);
          margin-bottom: 40px;
        }
        .imprint-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .imprint-content-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.04);
          padding: 48px;
          box-shadow: 0 8px 30px rgba(26, 26, 46, 0.02);
        }
        .imprint-sidebar {
          position: sticky;
          top: 100px;
        }
        .sidebar-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.04);
          padding: 32px;
          box-shadow: 0 8px 30px rgba(26, 26, 46, 0.02);
        }
        .sidebar-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 24px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-bottom: 12px;
        }
        .contact-row {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          align-items: flex-start;
        }
        .contact-row:last-child {
          margin-bottom: 0;
        }
        .contact-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(201, 168, 76, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .contact-label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(26, 26, 46, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .contact-value {
          font-size: 14.5px;
          color: #1a1a2e;
          line-height: 1.5;
          font-weight: 500;
        }
        .email-link {
          color: #c9a84c;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .email-link:hover {
          color: #b3923b;
          text-decoration: underline;
        }
        
        /* Rich Text Editor Content Styling */
        .page-content {
          font-size: 15px;
          line-height: 1.8;
          color: #2e2e42;
        }
        .page-content h1, .page-content h2, .page-content h3 {
          color: #1a1a2e;
          font-weight: 700;
        }
        .page-content h1 { font-size: 26px; margin: 32px 0 16px; }
        .page-content h2 { font-size: 20px; margin: 28px 0 14px; }
        .page-content h3 { font-size: 16px; margin: 22px 0 12px; }
        .page-content p { margin: 0 0 16px; }
        .page-content ul, .page-content ol { padding-left: 20px; margin: 0 0 16px; }
        .page-content li { margin-bottom: 6px; }
        .page-content a {
          color: #c9a84c;
          text-decoration: none;
          border-bottom: 1px solid rgba(201, 168, 76, 0.3);
          transition: all 0.15s ease;
        }
        .page-content a:hover {
          color: #b3923b;
          border-bottom-color: #b3923b;
        }

        @media (max-width: 991px) {
          .imprint-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .imprint-sidebar {
            position: static;
          }
        }
        @media (max-width: 600px) {
          .imprint-main { padding: 40px 16px 60px; }
          .imprint-content-card { padding: 32px 20px; }
          .sidebar-card { padding: 24px 20px; }
          .imprint-title { font-size: 32px; }
        }
      `}</style>
    </div>
  )
}
