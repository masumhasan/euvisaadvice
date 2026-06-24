'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LogoIcon, MapPinIcon, MailIcon } from './Icons'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3005'

const companyLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Team', href: '/our-team' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
]

interface ServiceLink {
  id: string
  name: string
  slug: string
}

export default function Footer() {
  const [serviceLinks, setServiceLinks] = useState<ServiceLink[]>([])

  useEffect(() => {
    fetch(`${BACKEND}/api/services`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data.services)) setServiceLinks(data.services) })
      .catch(() => {})
  }, [])

  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Brand */}
        <div>
          <div className="footer-brand-logo">
            <LogoIcon style={{ width: 32, height: 32 }} />
            <div>
              <div className="nav-logo-name">
                <span style={{ color: '#ffffff' }}>EU</span><span style={{ color: '#c9a84c' }}>VISA</span><span style={{ color: '#ffffff' }}>ADVICE</span>
              </div>
              <div className="nav-logo-since">SINCE 2026</div>
            </div>
          </div>
          <p className="footer-brand-desc">
            Expert consulting services for expats and remote workers in Germany.
          </p>
          <Link href="/legalchat" className="btn-sm">
            Start Consultation
          </Link>
        </div>

        {/* Services — dynamic */}
        <div>
          <h3 className="footer-col-title">Services</h3>
          <div className="footer-col-links">
            {serviceLinks.length > 0
              ? serviceLinks.map(s => (
                  <Link key={s.id} href={`/${s.slug}`}>{s.name}</Link>
                ))
              : (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>No services yet</span>
              )
            }
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="footer-col-title">Company</h3>
          <div className="footer-col-links">
            {companyLinks.map(item => (
              <Link key={item.label} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-col-title">Contact</h3>
          <div className="footer-contact-list">
            <div className="footer-contact-item">
              <MapPinIcon style={{ width: 17, height: 17, flexShrink: 0, marginTop: 2 }} />
              <span>
                30 N Gould St, Ste N<br />
                Sheridan, WY 82801 USA
              </span>
            </div>
            <div className="footer-contact-item">
              <MailIcon style={{ width: 17, height: 17, flexShrink: 0 }} />
              <a href="mailto:supporteuvisa@gmail.com">supporteuvisa@gmail.com</a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© 2026 EUVisaAdvice. All rights reserved.</p>
      </div>
    </footer>
  )
}
