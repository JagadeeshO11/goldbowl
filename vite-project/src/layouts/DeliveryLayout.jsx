import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ClipboardList, MapPin, User, LogOut } from 'lucide-react'

const LOGO_URL = 'https://res.cloudinary.com/dwmjz9csc/image/upload/e_trim/fl_preserve_transparency/f_auto,q_auto/v1787060691/Golden_bowl_-removebg-preview_yxaxp1.png'
const deliveryLogoCss = `.delivery-mobile-brand{height:72px;min-height:72px;display:flex;align-items:center;gap:10px;padding:8px 16px;border-bottom:1px solid #eee5d5;background:#fff;box-sizing:border-box}.delivery-mobile-brand img{width:118px!important;height:48px!important;max-width:none!important;object-fit:contain!important;object-position:left center!important;display:block}.delivery-mobile-brand div{display:flex;flex-direction:column;line-height:1.05}.delivery-mobile-brand strong{font-size:12px;color:#29251f;font-weight:900}.delivery-mobile-brand small{font-size:7px;letter-spacing:1.5px;color:#9d731d;font-weight:800;margin-top:3px}`

export function DeliveryLayout() {
  const navigate = useNavigate()
  const links = [['dashboard', 'Dashboard', ClipboardList], ['orders', 'Orders', MapPin], ['profile', 'Profile', User]]
  const signOut = () => {
    localStorage.removeItem('bowlDeliveryOnboarding')
    localStorage.removeItem('bowlDeliveryLocation')
    sessionStorage.removeItem('bowlDeliveryMobile')
    navigate('/delivery/signin', { replace: true })
  }
  return <div className="mobile-prototype-frame"><style>{deliveryLogoCss}</style><div className="mobile-app-shell"><header className="delivery-mobile-brand"><img src={LOGO_URL} alt="Golden Food Bowl" /><div><small>DELIVERY</small></div></header><main className="mobile-route-content"><Outlet /></main><nav className="bottom-nav">{links.map(([to, label, Icon]) => <NavLink key={to} to={`/delivery/${to}`} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={20} /><span>{label}</span></NavLink>)}<button type="button" onClick={signOut} aria-label="Sign out"><LogOut size={20}/><span>Sign out</span></button></nav></div></div>
}
