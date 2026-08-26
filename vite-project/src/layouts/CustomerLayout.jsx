import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, ClipboardList, ShoppingCart, Tag, Menu, UserRound, MapPin, LocateFixed } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import '../styles/customer-polish.css'
import '../customer-panel-enhancements.css'
import '../customer-mobile-final.css'
import '../customer-header-mobile.css'
import '../customer-layout-final.css'

const BOWL_LOGO = 'https://res.cloudinary.com/dwmjz9csc/image/upload/v1787120716/image-removebg-preview_e1wfil.png'

export function MobileStatusBar() {
  return null
}

function HeaderLocation() {
  const [location, setLocation] = useState(() => localStorage.getItem('goldbowl_current_location') || 'Detecting...')
  const [loading, setLoading] = useState(false)

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation('Unavailable')
      return
    }
    setLoading(true)
    setLocation('Detecting...')
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`)
        const data = await response.json()
        const a = data.address || {}
        const place = a.suburb || a.neighbourhood || a.city_district || a.city || a.town || a.village || 'Current location'
        const area = a.city || a.town || a.village
        const label = area && area !== place ? `${place}, ${area}` : place
        setLocation(label)
        localStorage.setItem('goldbowl_current_location', label)
      } catch {
        const label = `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`
        setLocation(label)
        localStorage.setItem('goldbowl_current_location', label)
      } finally {
        setLoading(false)
      }
    }, () => {
      setLocation('Unable to detect')
      setLoading(false)
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 })
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('goldbowl_current_location')) detectLocation()
  }, [detectLocation])

  return (
    <div className="customer-header-location" title={location}>
      <MapPin size={16} fill="currentColor" />
      <div className="customer-header-location-copy">
        <span>Present Location</span>
        <strong>{location}</strong>
      </div>
      <button type="button" onClick={detectLocation} disabled={loading} aria-label="Detect present location">
        <LocateFixed size={15} />
      </button>
    </div>
  )
}

export function CustomerLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isCheckout = location.pathname === '/customer/checkout'
  const links = [['home','Home',Home],['orders','Orders',ClipboardList],['cart','Cart',ShoppingCart],['offers','Offers',Tag],['profile','More',Menu]]
  const handleProfile = () => {
    const authenticated = sessionStorage.getItem('bowlCustomerAuth') === '1'
    navigate(authenticated ? '/customer/profile' : '/customer/signin')
  }
  return (
    <div className={`mobile-prototype-frame customer-prototype-frame ${isCheckout ? 'checkout-page' : ''}`}>
      <div className="mobile-app-shell customer-app-shell">
        <CustomerHeader onProfile={handleProfile} />
        <main className="mobile-route-content customer-route-content"><Outlet /></main>
        <nav className="customer-bottom-nav" aria-label="Customer navigation">
          {links.map(([to,label,Icon]) => <NavLink key={to} to={`/customer/${to}`} className={({isActive}) => isActive ? 'active' : ''}><Icon size={23} strokeWidth={2.2}/><span>{label}</span></NavLink>)}
        </nav>
      </div>
    </div>
  )
}

export function CustomerHeader({ onProfile }) {
  return (
    <div className="goldbowl-top-header-group">
      <header className="goldbowl-customer-header">
        <NavLink to="/customer/home" className="goldbowl-brand" aria-label="Golden Food Bowl home">
          <img src={BOWL_LOGO} alt="Golden Food Bowl"/>
          <div className="brand-title-wrap">
            <strong className="header-company-name" aria-label="Golden Food Bowl">
              <span className="brand-word brand-word-golden">Golden</span>
              <span className="brand-word brand-word-food">Food</span>
              <span className="brand-word brand-word-bowl">Bowl</span>
            </strong>
            <span className="header-company-tagline">Fresh • Tasty • Fast</span>
          </div>
        </NavLink>
        <HeaderLocation />
        <button type="button" className="profile-button" aria-label="Profile or sign in" onClick={onProfile}>
          <UserRound size={23}/>
        </button>
      </header>
    </div>
  )
}