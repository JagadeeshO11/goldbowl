import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Home, ClipboardList, ShoppingCart, Tag, Menu, MapPin, ChevronDown, UserRound } from 'lucide-react'

const BOWL_LOGO = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787120716/image-removebg-preview_e1wfil.png'

export function CustomerLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/customer' || pathname === '/customer/home'
  const links = [
    ['home', 'Home', Home],
    ['orders', 'Orders', ClipboardList],
    ['cart', 'Cart', ShoppingCart],
    ['offers', 'Offers', Tag],
    ['profile', 'More', Menu],
  ]

  return (
    <div className="mobile-prototype-frame customer-prototype-frame">
      <div className="mobile-app-shell customer-app-shell">
        <main className="mobile-route-content customer-route-content">
          <Outlet />
        </main>
        <nav className="customer-bottom-nav">
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={`/customer/${to}`} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon size={23} strokeWidth={2.2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function CustomerHeader({ onProfile }) {
  return (
    <header className="goldbowl-customer-header">
      <NavLink to="/customer/home" className="goldbowl-brand" aria-label="Golden Food Bowl home">
        <img src={BOWL_LOGO} alt="Golden Food Bowl" />
        <span><strong>Golden Food Bowl</strong><small>Fresh • Tasty • Delivered</small></span>
      </NavLink>
      <div className="goldbowl-header-actions">
        <button type="button" className="branch-picker" aria-label="Select branch">
          <MapPin size={20} fill="currentColor" /><span>Select Branch</span><ChevronDown size={19}/>
        </button>
        <button type="button" className="profile-button" aria-label="Profile" onClick={onProfile}><UserRound size={24}/></button>
      </div>
    </header>
  )
}
