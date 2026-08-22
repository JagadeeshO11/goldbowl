import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Home, ClipboardList, ShoppingCart, Tag, Menu, MapPin, ChevronDown, UserRound, Check, X, Wifi, BatteryCharging, LogIn } from 'lucide-react'
import { branches as mockBranches } from '../data/mockData'
import '../styles/customer-polish.css'
import '../customer-panel-enhancements.css'

const BOWL_LOGO = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787120716/image-removebg-preview_e1wfil.png'

export function MobileStatusBar() {
  const currentTime = '9:41'
  return (
    <div className="mobile-status-bar">
      <div className="status-bar-left"><span>{currentTime}</span></div>
      <div className="status-bar-right"><span className="network-type">5G</span><Wifi size={12} /><div className="battery-indicator"><BatteryCharging size={13} className="charging-icon" /><span>85%</span></div></div>
    </div>
  )
}

export function CustomerLayout() {
  const navigate = useNavigate()
  const links = [['home','Home',Home],['orders','Orders',ClipboardList],['cart','Cart',ShoppingCart],['offers','Offers',Tag],['profile','More',Menu]]
  return (
    <div className="mobile-prototype-frame customer-prototype-frame">
      <div className="mobile-app-shell customer-app-shell">
        <CustomerHeader onProfile={() => navigate('/customer/profile')} />
        <main className="mobile-route-content customer-route-content"><Outlet /></main>
        <nav className="customer-bottom-nav" aria-label="Customer navigation">
          {links.map(([to,label,Icon]) => <NavLink key={to} to={`/customer/${to}`} className={({isActive}) => isActive ? 'active' : ''}><Icon size={23} strokeWidth={2.2}/><span>{label}</span></NavLink>)}
        </nav>
      </div>
    </div>
  )
}

export function CustomerHeader({ onProfile }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(() => {
    try { const stored = sessionStorage.getItem('bowlCustomerBranch'); return stored ? JSON.parse(stored) : mockBranches[0] } catch { return mockBranches[0] }
  })
  const isLoggedIn = sessionStorage.getItem('bowlCustomerAuth') === '1'
  const handleSelectBranch = (b) => { setSelectedBranch(b); sessionStorage.setItem('bowlCustomerBranch', JSON.stringify(b)); setOpen(false) }

  return (
    <>
      <div className="goldbowl-top-header-group">
        <MobileStatusBar />
        <header className="goldbowl-customer-header">
          <NavLink to="/customer/home" className="goldbowl-brand" aria-label="Golden Food Bowl home"><img src={BOWL_LOGO} alt="Golden Food Bowl"/><div className="brand-title-wrap"><strong className="header-company-name">GOLDEN FOOD BOWL</strong><span className="header-company-tagline">Fresh • Tasty • Fast</span></div></NavLink>
          <div className="goldbowl-header-actions">
            <button type="button" className="branch-picker" aria-label="Select branch" onClick={() => setOpen(true)}><MapPin size={16} fill="currentColor"/><span>{selectedBranch?.name?.replace(' Bowl', '') || 'Select Branch'}</span><ChevronDown size={15}/></button>
            {!isLoggedIn ? (
              <button type="button" className="customer-login-button" aria-label="Customer sign in" onClick={() => navigate('/customer/signin')}><LogIn size={17}/><span>Login</span></button>
            ) : (
              <button type="button" className="profile-button" aria-label="Profile" onClick={onProfile}><UserRound size={23}/></button>
            )}
          </div>
        </header>
      </div>
      {open && (
        <div className="branch-modal-overlay" onClick={() => setOpen(false)}>
          <div className="branch-modal" onClick={e => e.stopPropagation()}>
            <div className="branch-modal-head"><div><span className="eyebrow">STORE SELECTOR</span><h3>Select Branch</h3></div><button type="button" className="close-btn" onClick={() => setOpen(false)}><X size={18}/></button></div>
            <div className="branch-modal-list">
              {mockBranches.map(b => <button key={b.id} type="button" className={`branch-option ${selectedBranch.id === b.id ? 'selected' : ''}`} onClick={() => handleSelectBranch(b)}><MapPin size={18} className="pin-icon"/><div className="branch-meta"><strong>{b.name}</strong><span>{b.area} • {b.distance} • Open now</span></div>{selectedBranch.id === b.id && <Check size={18} className="check-icon"/>}</button>)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
