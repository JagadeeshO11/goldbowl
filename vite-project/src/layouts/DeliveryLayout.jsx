import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ClipboardList, MapPin, User, LogOut } from 'lucide-react'

const LOGO_URL = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787060691/Golden_bowl_-removebg-preview_yxaxp1.png'

export function DeliveryLayout() {
  const navigate = useNavigate()
  const links = [['dashboard', 'Dashboard', ClipboardList], ['orders', 'Orders', MapPin], ['profile', 'Profile', User]]
  const signOut = () => {
    localStorage.removeItem('bowlDeliveryOnboarding')
    localStorage.removeItem('bowlDeliveryLocation')
    sessionStorage.removeItem('bowlDeliveryMobile')
    navigate('/delivery/signin', { replace: true })
  }
  return <div className="mobile-prototype-frame"><div className="mobile-app-shell"><header className="mobile-role-header"><img src={LOGO_URL} alt="Golden Bowl" /><div><strong>Golden Food</strong><small>DELIVERY</small></div></header><main className="mobile-route-content"><Outlet /></main><nav className="bottom-nav">{links.map(([to, label, Icon]) => <NavLink key={to} to={`/delivery/${to}`} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={20} /><span>{label}</span></NavLink>)}<button type="button" onClick={signOut} aria-label="Sign out"><LogOut size={20}/><span>Sign out</span></button></nav></div></div>
}
