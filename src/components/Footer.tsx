'use client'

import Link from 'next/link'
import { LogoIcon, MapPinIcon, PhoneIcon, MailIcon } from './Icons'

const serviceLinks = [
  { label: 'Immigration Consulting', href: '/immigration-consulting' },
  { label: 'Digital Nomad Consulting', href: '/digital-nomad-consulting' }
]
const companyLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Team', href: '/our-team' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' }
]

export default function Footer() {
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
            Expert consultung services for expats and remote workers in Germany.
          </p>
          <Link href="/legalchat" className="btn-sm">
            Start Consultation
          </Link>
        </div>

        {/* Services */}
        <div>
          <h3 className="footer-col-title">Services</h3>
          <div className="footer-col-links">
            {serviceLinks.map((item) => (
              <Link key={item.label} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="footer-col-title">Company</h3>
          <div className="footer-col-links">
            {companyLinks.map((item) => (
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
