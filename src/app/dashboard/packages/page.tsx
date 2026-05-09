'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Package = {
  id: string
  name: string
  description: string
  price: number
}

export default function ManagePackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const supabase = createClient()

  const fetchPackages = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('packages').select('*').order('price', { ascending: true })
    if (data) setPackages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      const { error } = await supabase.from('packages').update({ name, description, price: parseFloat(price) }).eq('id', editingId)
      if (!error) {
        setEditingId(null)
      }
    } else {
      const { error } = await supabase.from('packages').insert({ name, description, price: parseFloat(price) })
    }
    
    setName('')
    setDescription('')
    setPrice('')
    fetchPackages()
  }

  const handleEdit = (pkg: Package) => {
    setEditingId(pkg.id)
    setName(pkg.name)
    setDescription(pkg.description || '')
    setPrice(pkg.price.toString())
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      await supabase.from('packages').delete().eq('id', id)
      fetchPackages()
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px', color: '#1a1a2e' }}>Manage Packages</h1>
      
      <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px' }}>{editingId ? 'Edit Package' : 'Add New Package'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#666' }}>Package Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <div style={{ flex: '2 1 300px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#666' }}>Description</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <div style={{ flex: '1 1 100px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: '#666' }}>Price ($)</label>
            <input required type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <button type="submit" style={{ padding: '10px 24px', background: '#1a1a2e', color: '#fff', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer' }}>
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setName(''); setDescription(''); setPrice('') }} style={{ padding: '10px 24px', background: '#f5f5f5', color: '#333', borderRadius: '8px', fontWeight: '500', border: 'none', cursor: 'pointer', marginLeft: '8px' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9f9fa', borderBottom: '1px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '16px 24px', fontSize: '14px', color: '#666', fontWeight: '500' }}>Name</th>
              <th style={{ padding: '16px 24px', fontSize: '14px', color: '#666', fontWeight: '500' }}>Description</th>
              <th style={{ padding: '16px 24px', fontSize: '14px', color: '#666', fontWeight: '500' }}>Price</th>
              <th style={{ padding: '16px 24px', fontSize: '14px', color: '#666', fontWeight: '500', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#999' }}>Loading packages...</td></tr>
            ) : packages.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#999' }}>No packages found. Add one above.</td></tr>
            ) : packages.map(pkg => (
              <tr key={pkg.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#1a1a2e' }}>{pkg.name}</td>
                <td style={{ padding: '16px 24px', color: '#666' }}>{pkg.description}</td>
                <td style={{ padding: '16px 24px', fontWeight: '500', color: '#c9a84c' }}>${pkg.price.toFixed(2)}</td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button onClick={() => handleEdit(pkg)} style={{ background: 'none', border: 'none', color: '#4a90e2', cursor: 'pointer', marginRight: '16px', fontWeight: '500' }}>Edit</button>
                  <button onClick={() => handleDelete(pkg.id)} style={{ background: 'none', border: 'none', color: '#e24a4a', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
