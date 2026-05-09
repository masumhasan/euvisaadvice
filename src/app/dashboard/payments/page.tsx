'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DownloadIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'

const payments = [
  { id: 1, client: 'Sarah Mitchell', email: 'sarah@email.com', amount: '€89', status: 'Successful', date: 'Apr 9, 2026' },
  { id: 2, client: 'David Chen', email: 'david@email.com', amount: '€89', status: 'Successful', date: 'Apr 9, 2026' },
  { id: 3, client: 'Anna Kowalski', email: 'anna@email.com', amount: '€89', status: 'Refunded', date: 'Apr 8, 2026' },
  { id: 4, client: 'Marco Bianchi', email: 'marco@email.com', amount: '€89', status: 'Failed', date: 'Apr 8, 2026' },
  { id: 5, client: 'Lisa Park', email: 'lisa@email.com', amount: '€89', status: 'Successful', date: 'Apr 7, 2026' },
  { id: 6, client: 'James Wright', email: 'james@email.com', amount: '€89', status: 'Successful', date: 'Apr 7, 2026' },
  { id: 7, client: 'Nina Patel', email: 'nina@email.com', amount: '€89', status: 'Successful', date: 'Apr 6, 2026' },
  { id: 8, client: 'Tom Fischer', email: 'tom@email.com', amount: '€89', status: 'Refunded', date: 'Apr 6, 2026' },
]

export default function PaymentsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Page Title & Subtitle */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>Payments</h2>
        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', marginTop: '4px' }}>Transaction history and revenue</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {[
          { label: 'Total revenue', value: '€12,450' },
          { label: 'This month', value: '€4,260' },
          { label: 'Pending payouts', value: '€890' },
        ].map((card, i) => (
          <div key={i} style={{
            background: '#ffffff',
            padding: '28px',
            borderRadius: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            border: '1px solid rgba(0,0,0,0.03)',
            height: '140px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)', fontWeight: '600' }}>{card.label}</span>
            <div style={{ fontSize: '32px', fontWeight: '600', color: '#1a1a2e' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Actions Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Date range" 
            style={{ 
              padding: '10px 16px', 
              borderRadius: '10px', 
              border: '1px solid #f0f0f0', 
              fontSize: '13px', 
              width: '180px',
              outline: 'none',
              backgroundColor: '#ffffff'
            }}
          />
          <div style={{ width: '100px', height: '40px', background: '#ffffff', borderRadius: '10px', border: '1px solid #f0f0f0' }}></div>
        </div>
        <button style={{
          backgroundColor: '#ffffff',
          color: '#1a1a2e',
          border: '1px solid #f0f0f0',
          padding: '10px 20px',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <DownloadIcon style={{ width: 16, height: 16 }} />
          Export CSV
        </button>
      </div>

      {/* Payments Table */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '32px', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.02)',
        overflow: 'hidden'
      }}>
        {/* Table Header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '50px 2fr 2fr 1fr 1fr 1fr 100px', 
          background: '#1a1926', 
          padding: '18px 32px',
          color: '#ffffff',
          fontWeight: '700',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          <div>#</div>
          <div>CLIENT</div>
          <div>EMAIL</div>
          <div>AMOUNT</div>
          <div>STATUS</div>
          <div>DATE</div>
          <div style={{ textAlign: 'right' }}>ACTION</div>
        </div>

        {/* Table Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {payments.map((payment, index) => (
            <div key={payment.id} style={{ 
              display: 'grid', 
              gridTemplateColumns: '50px 2fr 2fr 1fr 1fr 1fr 100px', 
              padding: '18px 32px',
              alignItems: 'center',
              borderBottom: index === payments.length - 1 ? 'none' : '1px solid #f8f8f8',
              backgroundColor: index % 2 === 1 ? '#fcfcfb' : '#ffffff'
            }}>
              <div style={{ color: 'rgba(0,0,0,0.3)', fontWeight: '600', fontSize: '13px' }}>{payment.id}</div>
              <div style={{ fontWeight: '500', color: '#1a1a2e', fontSize: '14px' }}>{payment.client}</div>
              <div style={{ color: '#434347', fontSize: '14px' }}>{payment.email}</div>
              <div style={{ fontWeight: '600', color: '#1a1a2e', fontSize: '14px' }}>{payment.amount}</div>
              
              {/* Status Badge */}
              <div>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  ...getStatusStyle(payment.status)
                }}>
                  {payment.status}
                </span>
              </div>

              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: '13px' }}>{payment.date}</div>

              <div style={{ textAlign: 'right' }}>
                <Link href="#" style={{ color: '#c9a84c', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: 'auto', paddingBottom: '20px' }}>
        <button style={paginationBtnStyle}><ChevronLeftIcon style={{ width: 16, height: 16 }} /></button>
        <button style={{ ...paginationBtnStyle, backgroundColor: '#c9a84c', color: '#ffffff', border: 'none' }}>1</button>
        <button style={paginationBtnStyle}>2</button>
        <button style={paginationBtnStyle}>3</button>
        <button style={paginationBtnStyle}><ChevronRightIcon style={{ width: 16, height: 16 }} /></button>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '10px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: '600', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} MS Advocate. All rights reserved.
        </p>
      </footer>

    </div>
  )
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'Successful':
      return { backgroundColor: 'rgba(72, 187, 120, 0.1)', color: '#2f855a' }
    case 'Refunded':
      return { backgroundColor: 'rgba(236, 201, 75, 0.14)', color: '#b7791f' }
    case 'Failed':
      return { backgroundColor: 'rgba(245, 101, 101, 0.1)', color: '#c53030' }
    default:
      return { backgroundColor: '#f0f0f0', color: '#666666' }
  }
}

const paginationBtnStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  border: '1px solid #f0f0f0',
  background: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  fontWeight: '600',
  color: 'rgba(0,0,0,0.5)',
  cursor: 'pointer',
  transition: 'all 0.2s'
}
