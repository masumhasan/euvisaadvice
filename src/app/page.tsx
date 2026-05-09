'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'
import {
  LogoIcon,
  ScalesIcon,
  DocumentIcon,
  GlobeIcon,
  ShieldIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from '@/components/Icons'

/* ─── Stat Card ─────────────────────────────────────────────── */
function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  )
}

/* ─── Hero ──────────────────────────────────────────────────── */
function Hero({ user }: { user: any }) {
  const ctaHref = user ? '/chat' : '/register'
  
  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left */}
        <div className="hero-left">
          <p className="hero-eyebrow">Legal Excellence for Expats</p>

          <h1 className="hero-heading">
            Immigration, Tax &amp;<br />
            Business Law <span className="gold">Made Simple</span>
          </h1>

          <p className="hero-sub">
            Expert legal guidance for immigrants in Germany or Digital nomads
            leaving Germany
          </p>

          <div className="hero-cta">
            <Link href={ctaHref} className="btn-primary">
              Get Legal Advice
            </Link>
            {!user && (
              <Link href="/login" className="btn-outline">
                Existing Client Login
              </Link>
            )}
            {user && (
              <Link href="/profile" className="btn-outline">
                View My Profile
              </Link>
            )}
          </div>
        </div>

        {/* Right – Stats */}
        <div className="hero-right">
          <div className="stat-box">
            <div className="stat-grid">
              <StatCard
                icon={<ScalesIcon style={{ width: 28, height: 28 }} />}
                label="Immigration Law"
                value="500+ Cases"
              />
              <StatCard
                icon={<DocumentIcon style={{ width: 28, height: 28 }} />}
                label="Tax Consulting"
                value="98% Success"
              />
              <StatCard
                icon={<GlobeIcon style={{ width: 28, height: 28 }} />}
                label="Business Formation"
                value="50+ Companies"
              />
              <StatCard
                icon={<ShieldIcon style={{ width: 28, height: 28 }} />}
                label="Verified Experts"
                value="Licensed Team"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ────────────────────────────────────────────────── */
const serviceLinks = [
  { label: 'Immigration Law', href: '/immigration-law' },
  { label: 'Tax Law', href: '/tax-law' },
  { label: 'Business Law', href: '/business-law' },
  { label: 'Legal Consultation', href: '/legal-consultation' }
]
const companyLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' }
]

/* ─── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    loadUser()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero user={user} />
      </main>
      <Footer user={user} />
    </>
  )
}

