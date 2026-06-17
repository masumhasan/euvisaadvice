'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LogoIcon } from './Icons'

const navLinks = [
  { label: 'Services', href: '/legal-consultation' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about-us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav-root">
      <div className="nav-inner">

        {/* Logo */}
        <Link href="/" className="nav-logo">
          <LogoIcon style={{ width: 32, height: 32 }} />
          <div>
            <div className="nav-logo-name"><span style={{ color: '#ffffff' }}>EU</span><span style={{ color: '#c9a84c' }}>VISA</span><span style={{ color: '#ffffff' }}>ADVICE</span></div>
            <div className="nav-logo-since">SINCE 2026</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="nav-link">{label}</Link>
          ))}
          <Link href="/legalchat" className="btn-sm">Get Advice</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile${open ? ' open' : ''}`}>
        <div className="nav-mobile-inner">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="nav-mobile-link" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/legalchat" className="btn-primary" style={{ marginTop: 8, textAlign: 'center' }} onClick={() => setOpen(false)}>
            Get Advice
          </Link>
        </div>
      </div>
    </nav>
  )
}
