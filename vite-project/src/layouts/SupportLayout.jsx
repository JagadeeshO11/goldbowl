import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, Package, Boxes, Headphones, Bell } from 'lucide-react'
import { MobileStatusBar } from './CustomerLayout'

// Keep the Support logo identical to the logo used in the Customer header.
const BOWL_LOGO = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787120716/image-removebg-preview_e1wfil.png'

export function SupportLayout() {
  const links = [
    ['dashboard','Dashboard',BarChart3],
    ['orders','Orders',Package],
    ['products','Products',Boxes],
    ['issues','Customer Issues',Headphones],
    ['notifications','Alerts',Bell]
  ]
  return (
    <div className="mobile-prototype-frame">
      <div className="mobile-app-shell">
        <MobileStatusBar />
        <header className="admin-mobile-header">
          <img src={BOWL_LOGO} alt="Golden Food Bowl" />
          <div>
            <strong>BOWL SUPPORT</strong>
            <small>SUPPORT TEAM</small>
          </div>
        </header>
        <nav className="admin-mobile-nav">
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={`/support/${to}`} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon size={14} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <main className="mobile-route-content admin-mobile-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
