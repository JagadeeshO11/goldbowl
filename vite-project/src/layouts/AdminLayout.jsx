import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, Package, Boxes, Store, Users, Truck, Headphones, Bell } from 'lucide-react'

const LOGO_URL = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787060691/Golden_bowl_-removebg-preview_yxaxp1.png'
const adminLogoCss = `.desktop-brand{display:flex;align-items:center;gap:14px;padding:8px 12px 30px}.desktop-brand img{width:72px;height:72px;object-fit:contain;display:block;flex:0 0 72px}.desktop-brand div{display:flex;flex-direction:column}.desktop-brand strong{font-size:14px}.desktop-brand small{font-size:8px;letter-spacing:1.6px;margin-top:4px}`

export function AdminLayout() {
  const links = [['dashboard','Dashboard',BarChart3],['orders','Orders',Package],['products','Products',Boxes],['categories','Categories',Boxes],['branches','Branches',Store],['customers','Customers',Users],['delivery','Delivery',Truck],['support','Support',Headphones],['reports','Reports',BarChart3],['notifications','Notifications',Bell]]
  return <div className="desktop-dashboard"><style>{adminLogoCss}</style><aside className="desktop-sidebar"><div className="desktop-brand"><img src={LOGO_URL} alt="Golden Bowl" /><div><strong>Golden Food</strong><small>BOWL ADMIN</small></div></div>{links.map(([to,label,Icon]) => <NavLink key={to} to={`/admin/${to}`} className={({isActive}) => isActive ? 'active' : ''}><Icon size={19}/><span>{label}</span></NavLink>)}</aside><main className="desktop-main"><Outlet /></main></div>
}