import { useLocation } from 'react-router-dom'
import { Package, Boxes, Headphones, BarChart3 } from 'lucide-react'
import { usePrototypeContext } from '../../context/PrototypeContext'
import { updateOrderStatus } from '../../services/prototypeStore'
import { NotificationPanel } from '../../components/notifications/NotificationPanel'

const nextStatus = { CONFIRMED: 'PREPARING', PREPARING: 'READY_FOR_PICKUP', READY_FOR_PICKUP: 'ASSIGNED' }

export function SupportPageV3(){
  const { pathname } = useLocation()
  const path = pathname.replace('/support/','') || 'dashboard'
  const state = usePrototypeContext()
  const title = { dashboard:'Support Overview', orders:'Incoming Orders', products:'Product Management', issues:'Customer Issues', notifications:'Notifications' }[path] || 'Support'
  return <section><div className="dashboard-top"><div><span className="eyebrow">GOLDEN FOOD BOWL</span><h1>{title}</h1></div><button>Support Agent ▾</button></div>{path==='dashboard'&&<Dashboard state={state}/>} {path==='products'&&<Table title="Menu Products" columns={['Product','Category','Price','Availability','Actions']}/>} {path==='orders'&&<Orders orders={state.orders}/>} {path==='issues'&&<Issues orders={state.orders}/>} {path==='notifications'&&<NotificationPanel notifications={state.notifications} role="support"/>}</section>
}
function Dashboard({state}){const open=state.orders.filter(o=>o.status!=='DELIVERED').length;return <><div className="admin-stats"><div><Package/><strong>{open}</strong><span>Open orders</span></div><div><Boxes/><strong>{state.products.length}</strong><span>Products</span></div><div><Headphones/><strong>7</strong><span>Open issues</span></div><div><BarChart3/><strong>94%</strong><span>Resolved today</span></div></div><Orders orders={state.orders.slice(0,6)}/></>}
function Orders({orders}){return <div className="admin-table-card"><div className="table-heading"><h2>Orders Requiring Attention</h2><span>{orders.length} orders</span></div><table><thead><tr><th>Order</th><th>Customer</th><th>Branch</th><th>Status</th><th>Action</th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td><strong>#{o.id}</strong></td><td>{o.customer}</td><td>{o.branch}</td><td><span className="table-status">{o.status.replaceAll('_',' ')}</span></td><td>{nextStatus[o.status]?<button onClick={()=>updateOrderStatus(o.id,nextStatus[o.status])}>Update</button>:<span>Monitoring</span>}</td></tr>)}</tbody></table></div>}
function Issues({orders}){return <div className="admin-table-card"><div className="table-heading"><h2>Customer Issues</h2><span>{Math.min(orders.length,4)} open</span></div><table><thead><tr><th>Reference</th><th>Customer</th><th>Issue</th><th>Priority</th><th>Status</th></tr></thead><tbody>{orders.slice(0,4).map((o,i)=><tr key={o.id}><td><strong>#{o.id}</strong></td><td>{o.customer}</td><td>{i%2?'Delivery update requested':'Order status enquiry'}</td><td>{i===0?'High':'Normal'}</td><td><span className="table-status">Open</span></td></tr>)}</tbody></table></div>}
function Table({title,columns}){return <div className="admin-table-card"><div className="table-heading"><h2>{title}</h2><button>+ Add</button></div><table><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{[1,2,3,4].map(i=><tr key={i}>{columns.map((c,j)=><td key={c}>{j===0?<strong>#{10300+i}</strong>:j===columns.length-1?<span className="table-status">Active</span>:j===3?'₹1,249':'Golden Food Bowl'}</td>)}</tr>)}</tbody></table></div>}
