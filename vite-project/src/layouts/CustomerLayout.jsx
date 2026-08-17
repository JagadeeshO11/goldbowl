import { NavLink, Outlet } from 'react-router-dom'
import { Home, Search, Package, User } from 'lucide-react'

export function CustomerLayout() {
  const links = [['home', 'Home', Home], ['search', 'Search', Search], ['orders', 'Orders', Package], ['profile', 'Profile', User]]
  return <div className="mobile-prototype-frame"><div className="mobile-app-shell"><main className="mobile-route-content"><Outlet /></main><nav className="bottom-nav">{links.map(([to, label, Icon]) => <NavLink key={to} to={`/customer/${to}`} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={20} /><span>{label}</span></NavLink>)}</nav></div></div>
}
