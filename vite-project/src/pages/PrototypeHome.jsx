import { Link } from 'react-router-dom'
import { Smartphone, Monitor } from 'lucide-react'

export function PrototypeHome() {
  return <div className="prototype-launcher"><div className="launcher-card"><div className="launcher-logo">🥣</div><span className="eyebrow">CODTECH • SOW PROTOTYPE</span><h1>Golden Food Bowl</h1><p>Choose a role to explore the connected food ordering ecosystem.</p><div className="role-grid"><Link to="/customer/home"><Smartphone/><strong>Customer</strong><small>Mobile ordering experience</small></Link><Link to="/delivery/dashboard"><Smartphone/><strong>Delivery</strong><small>Mobile delivery workflow</small></Link><Link to="/admin/dashboard"><Monitor/><strong>Admin</strong><small>Desktop operations</small></Link><Link to="/support/dashboard"><Monitor/><strong>Support</strong><small>Desktop support desk</small></Link></div></div></div>
}
