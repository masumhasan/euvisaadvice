'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SearchIcon, EyeIcon, ChevronLeftIcon, ChevronRightIcon, MoreVerticalIcon, XIcon } from '@/components/Icons'

const leads = [
  { id: 1, name: 'Sarah Mitchell', initials: 'SM', color: '#ecc94b', email: 'sarah@email.com', date: 'Apr 10, 2026' },
  { id: 2, name: 'David Chen', initials: 'DC', color: '#4299e1', email: 'david@email.com', date: 'Apr 10, 2026' },
  { id: 3, name: 'Anna Kowalski', initials: 'AK', color: '#c9a84c', email: 'anna@email.com', date: 'Apr 09, 2026' },
  { id: 4, name: 'Marco Bianchi', initials: 'MB', color: '#ecc94b', email: 'marco@email.com', date: 'Apr 09, 2026' },
  { id: 5, name: 'Lisa Park', initials: 'LP', color: '#48bb78', email: 'lisa@email.com', date: 'Apr 08, 2026' },
  { id: 6, name: 'James Wright', initials: 'JW', color: '#ecc94b', email: 'james@email.com', date: 'Apr 08, 2026' },
]

const sampleConversation = [
  { role: 'user', text: 'Hello, I need legal advice regarding a property dispute.', time: '10:00 AM' },
  { role: 'ai', text: 'Hello! I can certainly help you with that. Could you please provide more details about the property dispute?', time: '10:01 AM' },
  { role: 'user', text: 'My neighbor is claiming that a portion of my backyard belongs to them based on a new survey.', time: '10:02 AM' },
  { role: 'ai', text: 'I understand. Boundary disputes can be complex. Have you already reviewed your original property deed and previous surveys?', time: '10:04 AM' },
  { role: 'user', text: 'Yes, I have them. What should be my next step?', time: '10:05 AM' },
  { role: 'ai', text: 'Based on your situation, I recommend scheduling a consultation with one of our property law experts. Would you like me to show you our available packages?', time: '10:06 AM' },
]

export default function InboxPage() {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedLead, setSelectedLead] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Page Title & Subtitle */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a2e', margin: 0 }}>Lead Inbox</h2>
        <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', marginTop: '4px' }}>Manage Clients</p>
      </div>

      {/* Search Bar */}
      <div style={{ 
        background: '#ffffff', 
        padding: '24px', 
        borderRadius: '24px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        border: '1px solid rgba(0,0,0,0.03)'
      }}>
        <div style={{ position: 'relative', width: '300px' }}>
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
      </div>

      {/* Inbox Table */}
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
          gridTemplateColumns: '1.5fr 2fr 1fr 0.5fr', 
          background: '#1a1926', 
          padding: '18px 40px',
          color: '#ffffff',
          fontWeight: '700',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          <div>CLIENT DETAILS</div>
          <div>EMAIL</div>
          <div>DATE</div>
          <div style={{ textAlign: 'right' }}>VIEW</div>
        </div>

        {/* Table Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {leads.map((lead, index) => (
            <div key={lead.id} style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.5fr 2fr 1fr 0.5fr', 
              padding: '20px 40px',
              alignItems: 'center',
              borderBottom: index === leads.length - 1 ? 'none' : '1px solid #f8f8f8',
              backgroundColor: index % 2 === 1 ? '#fcfcfb' : '#ffffff'
            }}>
              {/* Client Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  backgroundColor: lead.color, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#ffffff', 
                  fontWeight: '700', 
                  fontSize: '14px' 
                }}>
                  {lead.initials}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: '600', color: '#1a1a2e', fontSize: '15px' }}>{lead.name}</span>
                </div>
              </div>

              {/* Email */}
              <div style={{ color: '#434347', fontSize: '14px' }}>
                {lead.email}
              </div>

              {/* Date */}
              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: '14px', fontWeight: '500' }}>
                {lead.date}
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setSelectedLead(lead)}
                  style={{ 
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

      {/* Modal Overlay */}
      {selectedLead && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          backdropFilter: 'blur(8px)'
        }}>
          {/* Modal Content */}
          <div style={{
            background: '#ffffff',
            width: '700px',
            maxHeight: '90vh',
            borderRadius: '32px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(0,0,0,0.2)'
          }}>
            {/* Modal Header (Legal Consultation Design) */}
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>Legal Consultation</h3>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    border: '1px solid rgba(201, 168, 76, 0.4)',
                    background: 'rgba(201, 168, 76, 0.05)',
                    color: '#c9a84c',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em'
                  }}>
                    Verified
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#48bb78' }}></div>
                  <span style={{ fontSize: '13px', color: 'rgba(0,0,0,0.4)', fontWeight: '500' }}>AI Assistant active</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.3)', display: 'flex' }}>
                   <MoreVerticalIcon style={{ width: 20, height: 20 }} />
                </button>
                <div style={{ width: '1px', height: '24px', backgroundColor: '#f0f0f0' }}></div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a2e', display: 'flex' }}
                >
                  <XIcon style={{ width: 24, height: 24 }} />
                </button>
              </div>
            </div>

            {/* Conversation Body */}
            <div style={{ 
              padding: '32px', 
              flex: 1, 
              overflowY: 'auto', 
              backgroundColor: '#fdfdfc', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px' 
            }}>
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(0,0,0,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Conversation started with {selectedLead.name}
                </span>
              </div>

              {sampleConversation.map((msg, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '8px'
                }}>
                  <div style={{ 
                    maxWidth: '80%', 
                    padding: '16px 20px', 
                    borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    backgroundColor: msg.role === 'user' ? '#1a1926' : '#ffffff',
                    color: msg.role === 'user' ? '#ffffff' : '#1a1a2e',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    boxShadow: msg.role === 'user' ? '0 4px 15px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.03)',
                    border: msg.role === 'user' ? 'none' : '1px solid #f0f0f0',
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', fontWeight: '600', textTransform: 'uppercase', margin: '0 4px' }}>
                    {msg.role === 'user' ? 'You' : 'AI Assistant'} • {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '24px 32px', borderTop: '1px solid #f0f0f0', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
               <button 
                 onClick={() => setSelectedLead(null)}
                 style={{ 
                    width: '100%',
                    padding: '14px', 
                    backgroundColor: '#f5f5f5', 
                    color: '#1a1a2e', 
                    borderRadius: '16px', 
                    border: '1px solid #eeeeee', 
                    fontWeight: '700', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s'
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eeeeee'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
               >
                 Close Transcript
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '10px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.2)', fontWeight: '600', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} MS Advocate. All rights reserved.
        </p>
      </footer>

    </div>
  )
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
