import { NavLink, Outlet } from 'react-router-dom'
import { Home, Search, Package, User } from 'lucide-react'

const BOWL_LOGO = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787120716/image-removebg-preview_e1wfil.png'

export function CustomerLayout() {
  const links = [['home', 'Home', Home], ['search', 'Search', Search], ['orders', 'Orders', Package], ['profile', 'Profile', User]]
  return <div className="mobile-prototype-frame"><style>{`.customer-header-logo{display:flex!important;align-items:center!important;justify-content:flex-start!important;width:150px!important;height:58px!important;flex:0 0 150px!important;overflow:visible!important}.customer-header-logo img{display:block!important;width:145px!important;height:52px!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:left center!important}.route-mobile-header.home-header{min-height:68px!important;height:68px!important;padding:5px 12px!important;gap:6px!important;box-sizing:border-box!important}.route-mobile-header.home-header>strong{display:none!important}.route-mobile-header.home-header>a:last-child{margin-left:auto!important;flex:0 0 auto!important}`}</style><div className="mobile-app-shell"><main className="mobile-route-content"><Outlet /></main><nav className="bottom-nav">{links.map(([to, label, Icon]) => <NavLink key={to} to={`/customer/${to}`} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={20} /><span>{label}</span></NavLink>)}</nav></div></div>
}
