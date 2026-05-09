'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import 'react-quill-new/dist/quill.snow.css'

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
}

export default function ManagePages() {
  const [pages, setPages] = useState<any[]>([])
  const [selectedPage, setSelectedPage] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchPages()
  }, [])

  async function fetchPages() {
    setLoading(true)
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('title', { ascending: true })

    if (error) console.error('Error fetching pages:', error)
    else setPages(data || [])
    setLoading(false)
  }

  const handleEdit = (page: any) => {
    setSelectedPage(page)
    setTitle(page.title)
    setContent(page.content_html)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = async () => {
    if (!selectedPage) return
    setSaving(true)

    const { error } = await supabase
      .from('pages')
      .update({
        title: title,
        content_html: content,
        updated_at: new Date().toISOString()
      })
      .eq('id', selectedPage.id)

    if (error) {
      alert('Error updating page: ' + error.message)
    } else {
      fetchPages()
      setSelectedPage(null)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}>
        <div className="loader-dots">Loading Dynamic Content...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {!selectedPage ? (
        /* ── Page List View ── */
        <div className="fade-in">
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a2e', letterSpacing: '-0.02em' }}>Dynamic Site Pages</h2>
            <p style={{ color: '#666', marginTop: '4px' }}>Select a page to edit its content and visual information.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {pages.map(page => (
              <div 
                key={page.id} 
                className="page-admin-card"
                style={{ 
                  background: '#fff', 
                  padding: '30px', 
                  borderRadius: '24px', 
                  border: '1px solid #eee', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => handleEdit(page)}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#c9a84c' }}></div>
                
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e', marginBottom: '10px' }}>{page.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '12px', background: '#f8f7f2', padding: '4px 10px', borderRadius: '6px', color: '#888', fontWeight: '600' }}>
                    /{page.slug}
                  </span>
                  <span style={{ fontSize: '11px', color: '#c9a84c', fontWeight: '700', textTransform: 'uppercase' }}>Active</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>
                    Last updated: {new Date(page.updated_at).toLocaleDateString()}
                  </div>
                  <button className="edit-circle-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 12h4"/><path d="M10 16h4"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── Editor View ── */
        <div className="fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <button 
                onClick={() => setSelectedPage(null)} 
                style={{ background: 'none', border: 'none', color: '#c9a84c', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back to list
              </button>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a2e' }}>Edit {selectedPage.title}</h2>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={`/${selectedPage.slug}`} target="_blank" className="btn-outline" style={{ padding: '12px 24px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
                View Live Page
              </a>
              <button 
                onClick={handleSave} 
                disabled={saving} 
                className="btn-primary" 
                style={{ padding: '12px 32px', fontSize: '14px', boxShadow: '0 10px 20px rgba(201, 168, 76, 0.2)' }}
              >
                {saving ? 'Saving...' : 'Publish Changes'}
              </button>
            </div>
          </div>

          <div style={{ background: '#fff', padding: '40px', borderRadius: '32px', border: '1px solid #eee', boxShadow: '0 20px 60px rgba(0,0,0,0.03)' }}>
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Page Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '1.5px solid #f0efeb', outline: 'none', fontSize: '18px', fontWeight: '600', color: '#1a1a2e', background: '#fcfcfc' }}
                placeholder="Enter page title..."
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#c9a84c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Rich Content Editor</label>
              <div className="quill-editor-wrap" style={{ minHeight: '500px' }}>
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  modules={quillModules}
                  style={{ height: '450px', marginBottom: '60px' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .page-admin-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06) !important;
          border-color: #c9a84c !important;
        }
        .edit-circle-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f8f7f2;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a2e;
          transition: all 0.2s;
        }
        .page-admin-card:hover .edit-circle-btn {
          background: #c9a84c;
          color: #fff;
        }
        .ql-container {
          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 14px;
          font-family: inherit !important;
          font-size: 16px !important;
        }
        .ql-toolbar {
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
          background: #fcfcfc;
          border-color: #f0efeb !important;
        }
        .ql-container {
          border-color: #f0efeb !important;
        }
      `}</style>
    </div>
  )
}
