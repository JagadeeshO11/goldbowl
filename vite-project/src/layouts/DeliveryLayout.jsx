import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ClipboardList, MapPin, User, LogOut } from 'lucide-react'

export function DeliveryLayout() {
  const navigate = useNavigate()
  const links = [['dashboard', 'Dashboard', ClipboardList], ['orders', 'Orders', MapPin], ['profile', 'Profile', User]]
  const signOut = () => {
    localStorage.removeItem('bowlDeliveryOnboarding')
    localStorage.removeItem('bowlDeliveryLocation')
    sessionStorage.removeItem('bowlDeliveryMobile')
    navigate('/delivery/signin', { replace: true })
  }
  return <div className="mobile-prototype-frame"><div className="mobile-app-shell"><main className="mobile-route-content"><Outlet /></main><nav className="bottom-nav">{links.map(([to, label, Icon]) => <NavLink key={to} to={`/delivery/${to}`} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={20} /><span>{label}</span></NavLink>)}<button type="button" onClick={signOut} aria-label="Sign out"><LogOut size={20}/><span>Sign out</span></button></nav></div></div>
}
