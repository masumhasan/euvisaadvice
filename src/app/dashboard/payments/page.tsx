'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'

const payments = [
  { id: 1, client: 'Sarah Mitchell', email: 'sarah@email.com', amount: '€89', status: 'Successful', date: 'Apr 9, 2026' },
  { id: 2, client: 'David Chen', email: 'david@email.com', amount: '€89', status: 'Successful', date: 'Apr 9, 2026' },
  { id: 3, client: 'Anna Kowalski', email: 'anna@email.com', amount: '€89', status: 'Refunded', date: 'Apr 8, 2026' },
  { id: 4, client: 'Marco Bianchi', email: 'marco@email.com', amount: '€89', status: 'Failed', date: 'Apr 8, 2026' },
  { id: 5, client: 'Lisa Park', email: 'lisa@email.com', amount: '€89', status: 'Successful', date: 'Apr 7, 2026' },
]

function getStatusStyle(status: string) {
  switch (status) {
    case 'Successful': return { backgroundColor: 'rgba(72,187,120,0.1)', color: '#2f855a' }
    case 'Refunded': return { backgroundColor: 'rgba(236,201,75,0.14)', color: '#b7791f' }
    case 'Failed': return { backgroundColor: 'rgba(245,101,101,0.1)', color: '#c53030' }
    default: return { backgroundColor: '#f0f0f0', color: '#666' }
  }
}

export default function PaymentsPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="dash-page">
      <style>{`
        .dash-page { flex: 1; padding: 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; }

        /* Summary cards */
        .pay-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        /* Desktop table */
        .pay-table { background: #fff; border-radius: 32px 32px 8px 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); overflow: hidden; }
        .pay-thead { display: grid; grid-template-columns: 36px 1.8fr 1.8fr 80px 90px 90px 70px; background: #1a1926; padding: 16px 24px; color: #fff; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 30px 30px 0 0; }
        .pay-row { display: grid; grid-template-columns: 36px 1.8fr 1.8fr 80px 90px 90px 70px; padding: 16px 24px; align-items: center; }
        .pay-row + .pay-row { border-top: 1px solid #f8f8f8; }

        /* Mobile cards */
        .pay-cards { display: none; flex-direction: column; gap: 10px; }
        .pay-card { background: #fff; border-radius: 16px; padding: 16px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
        .pay-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .pay-card-name { font-weight: 600; color: #1a1a2e; font-size: 15px; }
        .pay-card-email { font-size: 12px; color: rgba(0,0,0,0.4); margin-top: 2px; }
        .pay-card-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }

        @media (max-width: 768px) {
          .dash-page { padding: 20px 16px; gap: 20px; }
          .pay-summary { grid-template-columns: 1fr; gap: 12px; }
          .pay-table { display: none; }
          .pay-cards { display: flex; }
        }
        @media (max-width: 480px) {
          .dash-page { padding: 16px 12px; }
        }
      `}</style>

      <div>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Payments</h2>
        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 14, marginTop: 4 }}>Transaction history and revenue</p>
      </div>

      {/* Summary Cards */}
      <div className="pay-summary">
        {[
          { label: 'Total revenue', value: '€12,450' },
          { label: 'This month', value: '€4,260' },
          { label: 'Pending payouts', value: '€890' },
        ].map((card, i) => (
          <div key={i} style={{ background: '#fff', padding: 28, borderRadius: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)', fontWeight: 600 }}>{card.label}</span>
            <div style={{ fontSize: 32, fontWeight: 600, color: '#1a1a2e' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* ── Desktop Table ── */}
      <div className="pay-table">
        <div className="pay-thead">
          <div>#</div>
          <div>CLIENT</div>
          <div>EMAIL</div>
          <div>AMOUNT</div>
          <div>STATUS</div>
          <div>DATE</div>
          <div style={{ textAlign: 'right' }}>ACTION</div>
        </div>
        <div>
          {payments.map((p, index) => (
            <div key={p.id} className="pay-row" style={{ backgroundColor: index % 2 === 1 ? '#fcfcfb' : '#fff' }}>
              <div style={{ color: 'rgba(0,0,0,0.3)', fontWeight: 600, fontSize: 13 }}>{p.id}</div>
              <div style={{ fontWeight: 500, color: '#1a1a2e', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.client}</div>
              <div style={{ color: '#434347', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.email}</div>
              <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: 14 }}>{p.amount}</div>
              <div><span style={{ padding: '5px 11px', borderRadius: 20, fontSize: 11, fontWeight: 600, ...getStatusStyle(p.status) }}>{p.status}</span></div>
              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: 13 }}>{p.date}</div>
              <div style={{ textAlign: 'right' }}><Link href="#" style={{ color: '#c9a84c', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View</Link></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Cards ── */}
      <div className="pay-cards">
        {payments.map((p) => (
          <div key={p.id} className="pay-card">
            <div className="pay-card-top">
              <div>
                <div className="pay-card-name">{p.client}</div>
                <div className="pay-card-email">{p.email}</div>
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>{p.amount}</span>
            </div>
            <div className="pay-card-bottom">
              <span style={{ padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, ...getStatusStyle(p.status) }}>{p.status}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)' }}>{p.date}</span>
                <Link href="#" style={{ color: '#c9a84c', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <button style={paginationBtnStyle}><ChevronLeftIcon style={{ width: 16, height: 16 }} /></button>
        <button style={{ ...paginationBtnStyle, backgroundColor: '#c9a84c', color: '#fff', border: 'none' }}>1</button>
        <button style={paginationBtnStyle}>2</button>
        <button style={paginationBtnStyle}>3</button>
        <button style={paginationBtnStyle}><ChevronRightIcon style={{ width: 16, height: 16 }} /></button>
      </div>

      <footer style={{ paddingBottom: 10 }}>
        <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.2)', fontWeight: 600, textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} EUVisaAdvice. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

const paginationBtnStyle: React.CSSProperties = {
  width: 36, height: 36, borderRadius: 8, border: '1px solid #f0f0f0',
  background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.5)', cursor: 'pointer',
}
