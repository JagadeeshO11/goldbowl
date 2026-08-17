import { NavLink, Outlet } from 'react-router-dom'
import { ClipboardList, MapPin, User } from 'lucide-react'

export function DeliveryLayout() {
  const links = [['dashboard', 'Dashboard', ClipboardList], ['orders', 'Orders', MapPin], ['profile', 'Profile', User]]
  return <div className="mobile-prototype-frame"><div className="mobile-app-shell"><main className="mobile-route-content"><Outlet /></main><nav className="bottom-nav">{links.map(([to, label, Icon]) => <NavLink key={to} to={`/delivery/${to}`} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={20} /><span>{label}</span></NavLink>)}</nav></div></div>
}
