import { useMemo, useState } from 'react'
import { BarChart3, TrendingUp, ShoppingBag, IndianRupee } from 'lucide-react'
import { usePrototypeContext } from '../../context/PrototypeContext'

export function AdminReports() {
  const { orders, branches } = usePrototypeContext()
  const [range, setRange] = useState('All time')
  const completed = orders.filter(o => o.status === 'DELIVERED')
  const revenue = completed.reduce((sum, o) => sum + Number(o.total || 0), 0)
  const gross = orders.reduce((sum, o) => sum + Number(o.total || 0), 0)
  const avg = orders.length ? Math.round(gross / orders.length) : 0
  const branchRows = useMemo(() => branches.map(branch => {
    const branchOrders = orders.filter(o => o.branch === branch.name)
    const branchRevenue = branchOrders.reduce((sum, o) => sum + Number(o.total || 0), 0)
    return { ...branch, count: branchOrders.length, revenue: branchRevenue }
  }), [branches, orders])
  const maxRevenue = Math.max(...branchRows.map(b => b.revenue), 1)

  return <section className="admin-reports">
    <div className="report-toolbar">
      <div><span className="eyebrow">BUSINESS INTELLIGENCE</span><h2>Sales & Reports</h2><p>Prototype performance overview across Bowl branches.</p></div>
      <select value={range} onChange={e => setRange(e.target.value)}><option>All time</option><option>Today</option><option>This week</option><option>This month</option></select>
    </div>
    <div className="report-stats">
      <article><IndianRupee/><strong>₹{revenue.toLocaleString('en-IN')}</strong><span>Delivered revenue</span></article>
      <article><ShoppingBag/><strong>{orders.length}</strong><span>Total orders</span></article>
      <article><TrendingUp/><strong>₹{avg.toLocaleString('en-IN')}</strong><span>Average order value</span></article>
      <article><BarChart3/><strong>{completed.length}</strong><span>Completed orders</span></article>
    </div>
    <div className="report-grid">
      <article className="report-card"><div className="table-heading"><h3>Branch performance</h3><span>{range}</span></div>{branchRows.map(b=><div className="report-bar-row" key={b.id}><div><strong>{b.name}</strong><span>{b.count} orders • ₹{b.revenue.toLocaleString('en-IN')}</span></div><div className="report-bar"><i style={{width:`${Math.max(5,(b.revenue/maxRevenue)*100)}%`}} /></div></div>)}</article>
      <article className="report-card"><div className="table-heading"><h3>Order status</h3></div>{['CONFIRMED','PREPARING','READY_FOR_PICKUP','ASSIGNED','PICKED_UP','OUT_FOR_DELIVERY','DELIVERED'].map(status => { const count=orders.filter(o=>o.status===status).length; return <div className="report-status-row" key={status}><span>{status.replaceAll('_',' ')}</span><b>{count}</b></div> })}</article>
    </div>
  </section>
}
