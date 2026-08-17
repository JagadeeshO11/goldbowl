import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, Package, Boxes, Headphones, Bell } from 'lucide-react'

export function SupportLayout() {
  const links = [['dashboard','Dashboard',BarChart3],['orders','Orders',Package],['products','Products',Boxes],['issues','Customer Issues',Headphones],['notifications','Notifications',Bell]]
  return <div className="desktop-dashboard"><aside className="desktop-sidebar"><div className="desktop-brand"><span>🥣</span><div><strong>Golden Food</strong><small>SUPPORT TEAM</small></div></div>{links.map(([to,label,Icon]) => <NavLink key={to} to={`/support/${to}`} className={({isActive}) => isActive ? 'active' : ''}><Icon size={19}/><span>{label}</span></NavLink>)}</aside><main className="desktop-main"><Outlet /></main></div>
}
