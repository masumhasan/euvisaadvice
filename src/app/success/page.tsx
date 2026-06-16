'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/client-chat')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ background: '#fff', padding: '60px 40px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', maxWidth: '480px', width: '100%', border: '1px solid rgba(0,0,0,0.05)' }}>
        
        {/* Success Icon */}
        <div style={{ width: '88px', height: '88px', background: 'linear-gradient(135deg, #c9a84c 0%, #ab8c36 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 10px 20px rgba(201, 168, 76, 0.2)' }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a2e', marginBottom: '16px', letterSpacing: '-0.02em' }}>Payment Successful!</h1>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '32px' }}>
          Your registration is complete and your payment has been processed securely. Welcome to MS Advocate.
        </p>
        
        <div style={{ background: 'rgba(201, 168, 76, 0.06)', padding: '16px', borderRadius: '16px', marginBottom: '32px', border: '1px solid rgba(201, 168, 76, 0.15)' }}>
          <p style={{ fontSize: '15px', color: '#1a1a2e', margin: 0, fontWeight: '500' }}>
            Redirecting to your secure chat in <span style={{ color: '#c9a84c', fontWeight: '700', fontSize: '18px' }}>{countdown}</span> seconds...
          </p>
        </div>

        <button onClick={() => router.push('/client-chat')} style={{ padding: '16px 32px', background: '#1a1a2e', color: '#fff', borderRadius: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', width: '100%', fontSize: '16px', transition: 'all 0.2s ease', boxShadow: '0 8px 16px rgba(26, 26, 46, 0.15)' }}>
          Go to Chat Now
        </button>
      </div>
    </div>
  )
}
