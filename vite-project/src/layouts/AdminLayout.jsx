import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, Package, Boxes, Store, Users, Truck, Headphones, Bell } from 'lucide-react'

const LOGO_URL = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787120716/image-removebg-preview_e1wfil.png'
const adminLogoCss = `.desktop-brand{display:flex;align-items:center;justify-content:flex-start;padding:18px 18px 30px;min-height:122px;box-sizing:border-box}.desktop-brand .brand-logo-wrap{display:flex;flex-direction:column;align-items:flex-start;gap:6px;width:100%}.desktop-brand img{width:178px!important;height:62px!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:left center!important;display:block!important}.desktop-brand small{font-size:9px;line-height:1;letter-spacing:2.2px;color:#c99b31;font-weight:800;padding-left:4px}`

export function AdminLayout() {
  const links = [['dashboard','Dashboard',BarChart3],['orders','Orders',Package],['products','Products',Boxes],['categories','Categories',Boxes],['branches','Branches',Store],['customers','Customers',Users],['delivery','Delivery',Truck],['support','Support',Headphones],['reports','Reports',BarChart3],['notifications','Notifications',Bell]]
  return <div className="desktop-dashboard"><style>{adminLogoCss}</style><aside className="desktop-sidebar"><div className="desktop-brand"><div className="brand-logo-wrap"><img src={LOGO_URL} alt="Golden Food Bowl" /><small>BOWL ADMIN</small></div></div>{links.map(([to,label,Icon]) => <NavLink key={to} to={`/admin/${to}`} className={({isActive}) => isActive ? 'active' : ''}><Icon size={19}/><span>{label}</span></NavLink>)}</aside><main className="desktop-main"><Outlet /></main></div>
}
