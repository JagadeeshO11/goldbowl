import { Bell, CheckCircle2, Clock3, Truck } from 'lucide-react'

const roleLabels = {
  customer: 'Customer alerts',
  admin: 'Admin alerts',
  support: 'Support alerts',
  delivery: 'Delivery alerts',
}

export function NotificationPanel({ notifications = [], role = 'customer' }) {
  const items = notifications.filter((item) => item.role === role)
  return <section className="notification-panel">
    <div className="notification-intro"><span className="notification-icon"><Bell /></span><div><span className="eyebrow">{roleLabels[role] || 'Notifications'}</span><h2>Stay up to date</h2><p>Order, delivery and workflow updates appear here during the prototype.</p></div></div>
    {!items.length ? <div className="notification-empty"><Bell /><strong>No new updates</strong><span>You're all caught up.</span></div> : <div className="notification-list">{items.map((item) => <article key={item.id}><span className="notification-item-icon">{item.role === 'delivery' ? <Truck /> : item.title.toLowerCase().includes('updated') ? <CheckCircle2 /> : <Clock3 />}</span><div><strong>{item.title}</strong><p>{item.message}</p><small>{item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}</small></div></article>)}</div>}
  </section>
}
