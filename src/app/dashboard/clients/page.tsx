'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SearchIcon, EyeIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'

const clients = [
  { id: 1, name: 'Sarah Mitchell', initials: 'SM', color: '#ecc94b', email: 'sarah@email.com', caseStatus: 'Active', verification: 'Verified', lastActive: 'Today' },
  { id: 2, name: 'David Chen', initials: 'DC', color: '#4299e1', email: 'david@email.com', caseStatus: 'Pending', verification: 'Verified', lastActive: 'Yesterday' },
  { id: 3, name: 'Anna Kowalski', initials: 'AK', color: '#c9a84c', email: 'anna@email.com', caseStatus: 'Active', verification: 'Pending', lastActive: 'Apr 8' },
  { id: 4, name: 'Marco Bianchi', initials: 'MB', color: '#ecc94b', email: 'marco@email.com', caseStatus: 'Closed', verification: 'Verified', lastActive: 'Apr 7' },
  { id: 5, name: 'Lisa Park', initials: 'LP', color: '#48bb78', email: 'lisa@email.com', caseStatus: 'Active', verification: 'Rejected', lastActive: 'Apr 6' },
  { id: 6, name: 'James Wright', initials: 'JW', color: '#ecc94b', email: 'james@email.com', caseStatus: 'Pending', verification: 'Pending', lastActive: 'Apr 5' },
]

export default function ClientsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('Existing Clients')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Page Title & Subtitle */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>Clients</h2>
        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', marginTop: '4px' }}>Manage existing and new clients</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #f0f0f0', paddingBottom: '2px' }}>
        {['Existing Clients', 'New Users'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 4px',
              fontSize: '14px',
              fontWeight: '600',
              color: activeTab === tab ? '#c9a84c' : 'rgba(0,0,0,0.35)',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s'
            }}
          >
            {tab}
            {activeTab === tab && (
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: '#c9a84c',
                borderRadius: '2px'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Actions Row */}
      <div style={{ 
        background: '#ffffff', 
        padding: '24px', 
        borderRadius: '24px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        border: '1px solid rgba(0,0,0,0.03)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', width: '340px' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.3)', display: 'flex' }}>
            <SearchIcon style={{ width: 18, height: 18 }} />
          </div>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              width: '100%', 
              height: '44px', 
              background: '#ffffff', 
              border: '1px solid #f0f0f0', 
              borderRadius: '12px', 
              padding: '0 16px 0 44px', 
              fontSize: '14px', 
              outline: 'none',
              color: '#000000'
            }}
          />
        </div>
        <div style={{ width: '80px', height: '40px', background: '#fdfdfc', borderRadius: '10px', border: '1px solid #f0f0f0' }}></div>
      </div>

      {/* Clients Table */}
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
          gridTemplateColumns: 'minmax(250px, 2.5fr) minmax(200px, 2fr) 1.2fr 1.2fr 1.2fr 80px', 
          background: '#1a1926', 
          padding: '18px 32px',
          color: '#ffffff',
          fontWeight: '700',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          <div>CLIENT</div>
          <div>EMAIL</div>
          <div>CASE STATUS</div>
          <div>VERIFICATION</div>
          <div>LAST ACTIVE</div>
          <div style={{ textAlign: 'right' }}>ACTION</div>
        </div>

        {/* Table Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {clients.map((client, index) => (
            <div key={client.id} style={{ 
              display: 'grid', 
              gridTemplateColumns: 'minmax(250px, 2.5fr) minmax(200px, 2fr) 1.2fr 1.2fr 1.2fr 80px', 
              padding: '18px 32px',
              alignItems: 'center',
              borderBottom: index === clients.length - 1 ? 'none' : '1px solid #f8f8f8',
              backgroundColor: index % 2 === 1 ? '#fcfcfb' : '#ffffff'
            }}>
              {/* Client Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: client.color, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#ffffff', 
                  fontWeight: '700', 
                  fontSize: '13px' 
                }}>
                  {client.initials}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: '600', color: '#1a1a2e', fontSize: '15px' }}>{client.name}</span>
                  <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.3)' }}>{client.email}</span>
                </div>
              </div>

              {/* Email (Hidden partially or separate col) */}
              <div style={{ color: '#434347', fontSize: '14px' }}>
                {client.email}
              </div>

              {/* Case Status */}
              <div>
                <span style={{ 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '11px', 
                  fontWeight: '600',
                  ...getCaseStatusStyle(client.caseStatus)
                }}>
                  {client.caseStatus}
                </span>
              </div>

              {/* Verification */}
              <div>
                <span style={{ 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '11px', 
                  fontWeight: '600',
                  ...getVerificationStyle(client.verification)
                }}>
                  {client.verification}
                </span>
              </div>

              {/* Last Active */}
              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px' }}>
                {client.lastActive}
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: '8px', 
                  color: 'rgba(0,0,0,0.3)',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0,0,0,0.3)'}
                >
                  <EyeIcon style={{ width: 18, height: 18 }} />
                </button>
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

function getCaseStatusStyle(status: string) {
  switch (status) {
    case 'Active':
      return { backgroundColor: 'rgba(72, 187, 120, 0.1)', color: '#2f855a' }
    case 'Pending':
      return { backgroundColor: 'rgba(236, 201, 75, 0.14)', color: '#b7791f' }
    case 'Closed':
      return { backgroundColor: 'rgba(0, 0, 0, 0.05)', color: '#4a5568' }
    default:
      return { backgroundColor: '#f0f0f0', color: '#666666' }
  }
}

function getVerificationStyle(status: string) {
  switch (status) {
    case 'Verified':
      return { backgroundColor: 'rgba(72, 187, 120, 0.1)', color: '#2f855a' }
    case 'Pending':
      return { backgroundColor: 'rgba(236, 201, 75, 0.14)', color: '#b7791f' }
    case 'Rejected':
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
