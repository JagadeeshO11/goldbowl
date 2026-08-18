import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, Package, Boxes, Store, Users, Truck, Headphones, Bell } from 'lucide-react'

const LOGO_URL = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787060691/Golden_bowl_-removebg-preview_yxaxp1.png'
const adminLogoCss = `.desktop-brand{display:flex;align-items:center;gap:16px;padding:14px 14px 32px;min-height:112px;box-sizing:border-box}.desktop-brand img{width:92px!important;height:92px!important;max-width:none!important;max-height:none!important;object-fit:contain!important;display:block!important;flex:0 0 92px!important}.desktop-brand div{display:flex;flex-direction:column;min-width:0}.desktop-brand strong{font-size:15px;line-height:1.15}.desktop-brand small{font-size:8px;letter-spacing:1.7px;margin-top:5px}`

export function AdminLayout() {
  const links = [['dashboard','Dashboard',BarChart3],['orders','Orders',Package],['products','Products',Boxes],['categories','Categories',Boxes],['branches','Branches',Store],['customers','Customers',Users],['delivery','Delivery',Truck],['support','Support',Headphones],['reports','Reports',BarChart3],['notifications','Notifications',Bell]]
  return <div className="desktop-dashboard"><style>{adminLogoCss}</style><aside className="desktop-sidebar"><div className="desktop-brand"><img src={LOGO_URL} alt="Golden Bowl" /><div><strong>Golden Food</strong><small>BOWL ADMIN</small></div></div>{links.map(([to,label,Icon]) => <NavLink key={to} to={`/admin/${to}`} className={({isActive}) => isActive ? 'active' : ''}><Icon size={19}/><span>{label}</span></NavLink>)}</aside><main className="desktop-main"><Outlet /></main></div>
}