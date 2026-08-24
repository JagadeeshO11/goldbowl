import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  BarChart3,
  Package,
  Store,
  Users,
  Truck,
  Plus,
  ToggleLeft,
  ToggleRight,
  Search,
  Eye,
  FileText,
  MapPin,
  Smartphone,
  Check,
  X,
  CreditCard,
  Headphones,
  Phone,
  Mail,
  Navigation,
  Sparkles,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  Tag
} from 'lucide-react'
import { usePrototypeContext } from '../../context/PrototypeContext'
import {
  assignDelivery,
  updateOrderStatus,
  duplicateBranch,
  addProduct,
  updateProduct,
  toggleProductAvailability,
  addCategory,
  updateDeliveryVerification,
  createBranch
} from '../../services/prototypeStore'
import { NotificationPanel } from '../../components/notifications/NotificationPanel'
import { AdminReports } from './AdminReports'
import './admin-content.css'

const navTitles = {
  dashboard: 'Overview & Operations',
  orders: 'Orders Management',
  products: 'Products & Menu Catalog',
  categories: 'Food Categories',
  branches: 'Restaurant Branches',
  customers: 'Customer Base',
  delivery: 'Delivery Personnel',
  support: 'Support Team Oversight',
  reports: 'Sales & Analytics',
  notifications: 'System Notifications'
}

export function AdminPage() {
  const { pathname } = useLocation()
  const path = pathname.replace('/admin/', '') || 'dashboard'
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {path === 'dashboard' && <Dashboard />}
      {path === 'orders' && <Orders />}
      {path === 'products' && <Products />}
      {path === 'categories' && <Categories />}
      {path === 'branches' && <Branches />}
      {path === 'customers' && <Customers />}
      {path === 'delivery' && <Delivery />}
      {path === 'support' && <Support />}
      {path === 'reports' && <AdminReports />}
      {path === 'notifications' && <AdminNotifications />}
    </section>
  )
}

function Dashboard() {
  const { orders, branches, products } = usePrototypeContext()
  const sales = orders.reduce((s, o) => s + Number(o.total || 0), 0)
  const activeOrdersCount = orders.filter(o => o.status !== 'DELIVERED').length
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fffdf7 100%)', border: '1px solid #eee4d2', borderLeft: '4px solid #dfa500', borderRadius: 16, padding: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 11, color: '#78716c', fontWeight: 700 }}>Gross Sales</span>
          <strong style={{ fontSize: 20, color: '#1c1917', fontWeight: 900 }}>₹{sales.toLocaleString('en-IN')}</strong>
          <small style={{ color: '#16a34a', fontSize: 9.5, fontWeight: 700 }}>+12.8% vs last week</small>
        </div>
        <div style={{ background: '#f0f9ff', border: '1px solid #e2e8f0', borderLeft: '4px solid #0284c7', borderRadius: 16, padding: 14 }}>
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Live Orders</span>
          <strong style={{ display: 'block', fontSize: 20, color: '#0f172a', fontWeight: 900 }}>{orders.length}</strong>
          <small style={{ color: '#0284c7', fontSize: 9.5, fontWeight: 700 }}>{activeOrdersCount} active in kitchen</small>
        </div>
        <div style={{ background: '#f0fdf4', border: '1px solid #e2e8f0', borderLeft: '4px solid #16a34a', borderRadius: 16, padding: 14 }}>
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Customers</span>
          <strong style={{ display: 'block', fontSize: 20, color: '#0f172a', fontWeight: 900 }}>1,284</strong>
          <small style={{ color: '#16a34a', fontSize: 9.5, fontWeight: 700 }}>+42 signups today</small>
        </div>
        <div style={{ background: '#faf5ff', border: '1px solid #e2e8f0', borderLeft: '4px solid #9333ea', borderRadius: 16, padding: 14 }}>
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Delivery Fleet</span>
          <strong style={{ display: 'block', fontSize: 20, color: '#0f172a', fontWeight: 900 }}>32</strong>
          <small style={{ color: '#16a34a', fontSize: 9.5, fontWeight: 700 }}>98.4% On-time rate</small>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #1c1208 0%, #3a2610 100%)', color: '#ffffff', borderRadius: 18, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <span style={{ fontSize: 10, color: '#f5c518', fontWeight: 800, letterSpacing: 1 }}>⚡ DAILY PLATFORM GOAL</span>
          <h3 style={{ margin: '4px 0 0', fontSize: 16, color: '#fff', fontWeight: 800 }}>₹25,000 / ₹30,000 Goal Reached</h3>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#e2d8c8' }}>3 active branches serving Indiranagar, Koramangala &amp; MG Road.</p>
        </div>
        <div style={{ minWidth: 160 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#e2d8c8', marginBottom: 4, fontWeight: 700 }}><span>83% Achieved</span><span>₹5,000 Remaining</span></div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 10, overflow: 'hidden' }}><div style={{ width: '83%', height: '100%', background: 'linear-gradient(90deg, #dfa500, #f5c518)', borderRadius: 10 }} /></div>
        </div>
      </div>
      <Orders />
    </>
  )
}

function Orders() {
  const { orders } = usePrototypeContext()
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const filtered = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(filter.toLowerCase()) || o.customer.toLowerCase().includes(filter.toLowerCase()) || o.branch.toLowerCase().includes(filter.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter
    return matchesSearch && matchesStatus
  })
  return (
    <div className="admin-table-card">
      <div className="table-heading" style={{ flexWrap: 'wrap', gap: 10 }}>
        <div><h2 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Package size={18} style={{ color: '#b4811d' }} /> Live Orders Management</h2><span style={{ fontSize: 11, color: '#78716c' }}>{orders.length} Total Orders</span></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}><Search size={14} style={{ position: 'absolute', left: 8, color: '#988e7d' }} /><input placeholder="Search order, customer..." value={filter} onChange={e => setFilter(e.target.value)} style={{ paddingLeft: 28, height: 32, borderRadius: 8, border: '1px solid #e2d8c8', fontSize: 11 }} /></div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ height: 32, padding: '0 8px', borderRadius: 8, border: '1px solid #e2d8c8', fontSize: 11, background: '#fffdf9', fontWeight: 700 }}><option value="ALL">All Statuses</option><option value="CONFIRMED">Confirmed</option><option value="PREPARING">Preparing</option><option value="READY_FOR_PICKUP">Ready For Pickup</option><option value="ASSIGNED">Assigned</option><option value="PICKED_UP">Picked Up</option><option value="OUT_FOR_DELIVERY">Out For Delivery</option><option value="DELIVERED">Delivered</option></select>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}><table><thead><tr>{['Order ID', 'Branch', 'Customer', 'Amount', 'Status', 'Actions'].map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{filtered.map(o => <tr key={o.id}><td><strong>#{o.id}</strong></td><td>{o.branch}</td><td>{o.customer}</td><td><strong>₹{o.total}</strong></td><td><span className={`table-status ${o.status.toLowerCase()}`}>{o.status.replaceAll('_', ' ')}</span></td><td><div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><button type="button" style={{ padding: '4px 8px', border: '1px solid #e2d8c8', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={() => setSelectedOrder(o)} title="View Details"><Eye size={12} /> Details</button>{o.status !== 'DELIVERED' ? <button className="admin-action-btn" onClick={() => o.status === 'READY_FOR_PICKUP' ? assignDelivery(o.id, 'Rahul Kumar') : updateOrderStatus(o.id, nextStatus(o.status))}>{o.status === 'READY_FOR_PICKUP' ? 'Assign Delivery →' : 'Advance →'}</button> : <span style={{ fontSize: 10, color: '#16a34a', fontWeight: 800 }}>✓ Done</span>}</div></td></tr>)}</tbody></table></div>
      {selectedOrder && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'grid', placeItems: 'center', padding: 16 }} onClick={() => setSelectedOrder(null)}><div style={{ background: '#fff', borderRadius: 14, padding: 20, maxWidth: 520, width: '100%' }} onClick={e => e.stopPropagation()}><h3>Order #{selectedOrder.id}</h3><p>{selectedOrder.customer} • {selectedOrder.branch}</p><button className="secondary-btn" onClick={() => setSelectedOrder(null)}>Close</button></div></div>}
    </div>
  )
}

function Products() {
  const { products, categories } = usePrototypeContext()
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ name: '', category: '', price: '', calories: '', portion: '', description: '', image: '', available: true })
  const filtered = products.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase())
    const matchCategory = categoryFilter === 'ALL' || p.category === categoryFilter
    return matchQuery && matchCategory
  })
  const openCreate = () => { setEditingId(null); setDraft({ name: '', category: categories[0]?.id || '', price: '', calories: '', portion: '', description: '', image: '', available: true }); setShowForm(true) }
  const openEdit = p => { setEditingId(p.id); setDraft({ name: p.name || '', category: p.category || categories[0]?.id || '', price: p.price ?? '', calories: p.calories ?? '', portion: p.portion || '', description: p.description || '', image: p.image || '', available: p.available !== false }); setShowForm(true) }
  const save = e => {
    e.preventDefault()
    if (!draft.name.trim() || !draft.category || !draft.price) return
    const payload = { ...draft, name: draft.name.trim(), price: Number(draft.price), calories: Number(draft.calories || 0) }
    if (editingId) updateProduct(editingId, payload)
    else addProduct(payload)
    setShowForm(false)
  }
  const chooseImage = e => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => setDraft(d => ({ ...d, image: String(reader.result) })); reader.readAsDataURL(file) }
  return (
    <section className="admin-table-card">
      <div className="table-heading" style={{ flexWrap: 'wrap', gap: 10 }}>
        <div><h2 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Package size={18} style={{ color: '#b4811d' }} /> Products &amp; Menu Catalog</h2><span style={{ fontSize: 11, color: '#78716c' }}>{products.length} products</span></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}><Search size={14} style={{ position: 'absolute', left: 8, color: '#988e7d' }} /><input placeholder="Search products..." value={query} onChange={e => setQuery(e.target.value)} style={{ paddingLeft: 28, height: 32, borderRadius: 8, border: '1px solid #e2d8c8', fontSize: 11 }} /></div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ height: 32, padding: '0 8px', borderRadius: 8, border: '1px solid #e2d8c8', fontSize: 11, background: '#fffdf9', fontWeight: 700 }}><option value="ALL">All Categories</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          <button className="admin-action-btn" type="button" onClick={openCreate}><Plus size={14} /> Add Product</button>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}><table><thead><tr><th style={{ width: 64 }}>Image</th><th>Product</th><th>Category</th><th>Price</th><th>Details</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map(p => <tr key={p.id}><td><div style={{ width: 46, height: 46, borderRadius: 10, overflow: 'hidden', background: '#f7f2e9', display: 'grid', placeItems: 'center' }}>{p.image ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={18} color="#9a8c72" />}</div></td><td><strong>{p.name}</strong></td><td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 8px', borderRadius: 999, background: '#fff8e7', color: '#8a6312', fontSize: 10, fontWeight: 800 }}><Tag size={11} />{categories.find(c => c.id === p.category)?.name || 'Uncategorized'}</span></td><td><strong>₹{p.price}</strong></td><td>{p.portion || '-'} {p.calories ? `• ${p.calories} kcal` : ''}</td><td><button type="button" onClick={() => toggleProductAvailability(p.id)} style={{ border: 0, background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: p.available ? '#15803d' : '#b91c1c', fontSize: 11, fontWeight: 800 }}>{p.available ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}{p.available ? 'Active' : 'Hidden'}</button></td><td><button type="button" className="secondary-btn" onClick={() => openEdit(p)}>Edit</button></td></tr>)}</tbody></table></div>
      {showForm && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 120, display: 'grid', placeItems: 'center', padding: 16 }} onClick={() => setShowForm(false)}><form onSubmit={save} onClick={e => e.stopPropagation()} style={{ width: 'min(720px, 100%)', maxHeight: '90vh', overflow: 'auto', background: '#fffdf9', borderRadius: 18, padding: 22, boxShadow: '0 24px 80px rgba(0,0,0,.18)' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}><div><h2 style={{ margin: 0 }}>{editingId ? 'Edit Product' : 'Add Product'}</h2><p style={{ margin: '4px 0 0', fontSize: 12, color: '#78716c' }}>Add the product image and choose its menu category.</p></div><button type="button" onClick={() => setShowForm(false)} style={{ border: 0, background: 'transparent', cursor: 'pointer' }}><X /></button></div><div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(220px, .8fr)', gap: 16 }}><div style={{ display: 'grid', gap: 12 }}><label><span>Product name</span><input required value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} /></label><label><span>Category</span><select required value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })}>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><label><span>Price (₹)</span><input required type="number" min="0" value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} /></label><label><span>Calories</span><input type="number" min="0" value={draft.calories} onChange={e => setDraft({ ...draft, calories: e.target.value })} /></label></div><label><span>Portion</span><input value={draft.portion} onChange={e => setDraft({ ...draft, portion: e.target.value })} placeholder="450g" /></label><label><span>Description</span><textarea rows="3" value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} /></label></div><div><label style={{ display: 'block' }}><span>Product image</span><div style={{ marginTop: 8, border: '1px dashed #d9cdb9', borderRadius: 14, overflow: 'hidden', background: '#f7f2e9' }}>{draft.image ? <img src={draft.image} alt="Preview" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} /> : <div style={{ aspectRatio: '1', display: 'grid', placeItems: 'center', color: '#8c806c' }}><div style={{ textAlign: 'center' }}><ImageIcon size={32} /><div style={{ fontSize: 11, marginTop: 6 }}>Choose a product image</div></div></div>}<div style={{ padding: 10 }}><label style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '9px 10px', borderRadius: 9, background: '#1c1208', color: '#fff', cursor: 'pointer', fontSize: 11, fontWeight: 800 }}><Upload size={13} /> Upload image<input type="file" accept="image/*" onChange={chooseImage} style={{ display: 'none' }} /></label></div></div></label><label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 12 }}><input type="checkbox" checked={draft.available} onChange={e => setDraft({ ...draft, available: e.target.checked })} /> Product available for ordering</label></div></div><div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 18 }}><button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="admin-action-btn">{editingId ? 'Save Changes' : 'Create Product'}</button></div></form></div>}
    </section>
  )
}

function Categories() {
  const { categories, products } = usePrototypeContext()
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('🍲')
  return <section className="admin-table-card"><div className="table-heading"><div><h2><Tag size={18} style={{ color: '#b4811d' }} /> Food Categories</h2><span style={{ fontSize: 11, color: '#78716c' }}>{categories.length} categories</span></div></div><div style={{ padding: 14, display: 'flex', gap: 8, flexWrap: 'wrap', borderBottom: '1px solid #eee4d2' }}><input placeholder="Category name" value={name} onChange={e => setName(e.target.value)} /><input style={{ width: 72 }} value={icon} onChange={e => setIcon(e.target.value)} /><button className="admin-action-btn" type="button" onClick={() => { if (name.trim()) { addCategory({ name: name.trim(), icon }); setName('') } }}><Plus size={14} /> Add Category</button></div><div style={{ overflowX: 'auto' }}><table><thead><tr><th>Category</th><th>Products</th></tr></thead><tbody>{categories.map(c => <tr key={c.id}><td><strong>{c.icon} {c.name}</strong></td><td>{products.filter(p => p.category === c.id).length}</td></tr>)}</tbody></table></div></section>
}

function nextStatus(status) { const flow = { CONFIRMED: 'PREPARING', PREPARING: 'READY_FOR_PICKUP', READY_FOR_PICKUP: 'ASSIGNED', ASSIGNED: 'PICKED_UP', PICKED_UP: 'OUT_FOR_DELIVERY', OUT_FOR_DELIVERY: 'DELIVERED' }; return flow[status] }

function Branches() { const { branches } = usePrototypeContext(); return <section className="admin-table-card"><div className="table-heading"><h2><Store size={18} style={{ color: '#b4811d' }} /> Restaurant Branches</h2></div><div style={{ overflowX: 'auto' }}><table><thead><tr><th>Branch</th><th>Area</th><th>Distance</th><th>Status</th></tr></thead><tbody>{branches.map(b => <tr key={b.id}><td><strong>{b.name}</strong></td><td>{b.area}</td><td>{b.distance}</td><td>Open</td></tr>)}</tbody></table></div></section> }
function Customers() { return <section className="admin-table-card"><div className="table-heading"><h2><Users size={18} style={{ color: '#b4811d' }} /> Customer Base</h2></div><p style={{ padding: 16, margin: 0, color: '#78716c' }}>Customer records will appear here.</p></section> }
function Delivery() { return <section className="admin-table-card"><div className="table-heading"><h2><Truck size={18} style={{ color: '#b4811d' }} /> Delivery Personnel</h2></div><p style={{ padding: 16, margin: 0, color: '#78716c' }}>Delivery team management.</p></section> }
function Support() { return <section className="admin-table-card"><div className="table-heading"><h2><Headphones size={18} style={{ color: '#b4811d' }} /> Support Team Oversight</h2></div><p style={{ padding: 16, margin: 0, color: '#78716c' }}>Support workspace.</p></section> }
function AdminNotifications() { return <section className="admin-table-card"><div className="table-heading"><h2><FileText size={18} style={{ color: '#b4811d' }} /> Notifications</h2></div><NotificationPanel role="admin" /></section> }

export default AdminPage
