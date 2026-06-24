'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ScalesIcon,
  DocumentIcon,
  GlobeIcon,
  ShieldIcon,
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
function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left */}
        <div className="hero-left">
          <p className="hero-eyebrow">Consulting for Expats</p>

          <h1 className="hero-heading">
            Immigration &<br />
            Nomad Consulting <span className="gold">Made Simple</span>
          </h1>

          <p className="hero-sub">
            Expert consulting for immigrants in Germany or Digital nomads
            leaving Germany
          </p>

          <div className="hero-cta">
            <Link href="/legalchat" className="btn-primary">
              Get Advice Now
            </Link>
            <Link href="/client-chat" className="btn-outline">
              Existing Client Login
            </Link>
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

/* ─── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}

